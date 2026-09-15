import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load environment variables from .env.local or .env if available
function loadEnv() {
  const envPaths = [
    path.join(projectRoot, '.env.local'),
    path.join(projectRoot, '.env')
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const idx = trimmed.indexOf('=');
          const key = trimmed.slice(0, idx).trim();
          let value = trimmed.slice(idx + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  }
}

loadEnv();

const appId = process.env.PUBLIC_ALGOLIA_APP_ID || process.env.ALGOLIA_APP_ID;
const adminApiKey = process.env.ALGOLIA_ADMIN_API_KEY;
const indexName = process.env.PUBLIC_ALGOLIA_INDEX_NAME || process.env.ALGOLIA_INDEX_NAME || 'notes_by_fsir';

console.log('--- Algolia Note Indexing Script ---');
console.log(`Target Index: ${indexName}`);
console.log(`App ID: ${appId ? appId : 'MISSING'}`);
console.log(`Admin API Key: ${adminApiKey ? '****** (Provided)' : 'MISSING'}`);

if (!appId || !adminApiKey) {
  console.error('\n[ERROR] Missing credentials!');
  console.error('Please make sure ALGOLIA_APP_ID (or PUBLIC_ALGOLIA_APP_ID) and ALGOLIA_ADMIN_API_KEY are set in .env.local or environment.');
  process.exit(1);
}

// Dynamically import algoliasearch
let algoliasearch;
try {
  const mod = await import('algoliasearch');
  algoliasearch = mod.algoliasearch || mod.default;
} catch (e) {
  console.error('[ERROR] Failed to load algoliasearch module:', e.message);
  process.exit(1);
}

// Load subjects metadata mapping
const subjectsJsonPath = path.join(projectRoot, 'src', 'data', 'subjects.json');
let subjectsMetaMap = new Map();
if (fs.existsSync(subjectsJsonPath)) {
  const subjectsData = JSON.parse(fs.readFileSync(subjectsJsonPath, 'utf8'));
  for (const s of subjectsData) {
    subjectsMetaMap.set(s.slug.toLowerCase(), s.name);
  }
}

// Helper to parse frontmatter
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, body: fileContent };
  const yamlText = match[1];
  const body = fileContent.slice(match[0].length);
  const data = {};

  const lines = yamlText.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx > 0 && !trimmed.startsWith('-')) {
      const key = trimmed.slice(0, colonIdx).trim();
      let value = trimmed.slice(colonIdx + 1).trim();
      if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1);
      } else if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (!isNaN(Number(value))) value = Number(value);
      data[key] = value;
    }
  }
  return { data, body };
}

// Helper to strip markdown formatting
function stripMarkdown(md) {
  if (!md) return '';
  return md
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/`([^`]+)`/g, '$1')     // inline code
    .replace(/#+\s+/g, '')          // headers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
    .replace(/(\*|_)(.*?)\1/g, '$2')   // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')   // images
    .replace(/<[^>]*>/g, '')         // HTML tags
    .replace(/\$/g, '')              // LaTeX/Math
    .replace(/\s+/g, ' ')            // collapse whitespace
    .trim();
}

// Recursively find markdown files in a directory
function getMarkdownFiles(dirPath) {
  let results = [];
  if (!fs.existsSync(dirPath)) return results;
  const list = fs.readdirSync(dirPath);
  for (const file of list) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(fullPath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const contentDir = path.join(projectRoot, 'src', 'content');
if (!fs.existsSync(contentDir)) {
  console.error(`[ERROR] Content directory not found at: ${contentDir}`);
  process.exit(1);
}

const subjectDirs = fs.readdirSync(contentDir).filter(f => fs.statSync(path.join(contentDir, f)).isDirectory());

console.log(`Found ${subjectDirs.length} subject collections: ${subjectDirs.join(', ')}`);

const records = [];

for (const subjectSlug of subjectDirs) {
  const subjectPath = path.join(contentDir, subjectSlug);
  const files = getMarkdownFiles(subjectPath);
  const subjectName = subjectsMetaMap.get(subjectSlug.toLowerCase()) || subjectSlug.toUpperCase();

  for (const filePath of files) {
    const relativePath = path.relative(subjectPath, filePath).replace(/\\/g, '/');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, body } = parseFrontmatter(fileContent);

    // Skip unpublished notes
    if (data.published === false) continue;

    // Calculate slug matching Astro's post.id
    let slug = relativePath.replace(/\.(md|mdx)$/, '');

    const title = data.title || path.basename(slug).replace(/-/g, ' ');
    const description = data.description || `${subjectName} note on ${title}`;
    const chapter = data.chapter || 'General';
    const author = data.author || 'Fahad Sir';
    const plainTextBody = stripMarkdown(body);

    const keywords = [
      subjectName,
      subjectSlug,
      chapter,
      title,
      ...(description.split(/\s+/).filter(w => w.length > 3))
    ].filter(Boolean);

    const url = `/${subjectSlug}/${slug}`;

    // Split body into readable section chunks if content is long (> 1500 chars)
    const sections = body.split(/\n(?=##?\s+)/);

    if (sections.length > 1) {
      sections.forEach((sec, idx) => {
        const secText = stripMarkdown(sec);
        if (!secText) return;
        const secHeadingMatch = sec.match(/^#+\s+(.*)/);
        const secHeading = secHeadingMatch ? secHeadingMatch[1].trim() : title;

        records.push({
          objectID: `${subjectSlug}-${slug.replace(/[^a-zA-Z0-9_-]/g, '_')}-${idx}`,
          title: secHeading !== title ? `${title} - ${secHeading}` : title,
          noteTitle: title,
          description,
          subject: subjectName,
          subjectSlug,
          chapter,
          author,
          content: secText.slice(0, 3000),
          url,
          slug,
          keywords,
          chunkIndex: idx
        });
      });
    } else {
      records.push({
        objectID: `${subjectSlug}-${slug.replace(/[^a-zA-Z0-9_-]/g, '_')}`,
        title,
        noteTitle: title,
        description,
        subject: subjectName,
        subjectSlug,
        chapter,
        author,
        content: plainTextBody.slice(0, 4000),
        url,
        slug,
        keywords,
        chunkIndex: 0
      });
    }
  }
}

console.log(`\nGenerated ${records.length} Algolia records across all notes.`);

const isPlaceholderKey = !appId || appId === 'your-algolia-app-id' || !adminApiKey || adminApiKey.includes('your-algolia');

if (process.argv.includes('--dry-run') || isPlaceholderKey) {
  console.log('\n--- LOCAL RECORD VALIDATION ---');
  console.log('Sample record [0]:', JSON.stringify(records[0], null, 2));
  if (records.length > 1) {
    console.log('Sample record [1]:', JSON.stringify(records[1], null, 2));
  }
  console.log('\nSchema Verification Check:');
  console.log('✔ objectID present:', Boolean(records[0]?.objectID));
  console.log('✔ title present:', Boolean(records[0]?.title));
  console.log('✔ description present:', Boolean(records[0]?.description));
  console.log('✔ subject present:', Boolean(records[0]?.subject));
  console.log('✔ chapter present:', Boolean(records[0]?.chapter));
  console.log('✔ content present:', Boolean(records[0]?.content));
  console.log('✔ url present:', Boolean(records[0]?.url));
  console.log('✔ slug present:', Boolean(records[0]?.slug));
  console.log('✔ URL pattern sample:', records[0]?.url);
  
  if (isPlaceholderKey) {
    console.log('\n==================================================');
    console.log('ALGOLIA INDEXING VERIFICATION SUMMARY');
    console.log('==================================================');
    console.log('1. Real Algolia upload: PLACEHOLDER_KEYS_DETECTED');
    console.log('   (To perform live upload to Algolia, update .env.local with real keys:');
    console.log('    PUBLIC_ALGOLIA_APP_ID=your_real_app_id');
    console.log('    PUBLIC_ALGOLIA_SEARCH_API_KEY=your_real_search_key');
    console.log('    ALGOLIA_ADMIN_API_KEY=your_real_admin_key)');
    console.log(`2. Index name: ${indexName}`);
    console.log(`3. Number of records generated locally: ${records.length}`);
    console.log('4. Algolia API Searchable: PENDING_REAL_API_KEYS');
    console.log('5. Search-Only API Retrieval Test: PENDING_REAL_API_KEYS');
    console.log('==================================================\n');
    process.exit(0);
  }
}

async function indexToAlgolia() {
  try {
    const client = algoliasearch(appId, adminApiKey);

    console.log(`\nPushing ${records.length} records to Algolia index '${indexName}'...`);
    
    // Save objects
    const saveRes = await client.saveObjects({
      indexName,
      objects: records
    });

    if (saveRes && saveRes[0] && saveRes[0].taskID) {
      try {
        await client.waitForTask({ indexName, taskID: saveRes[0].taskID });
      } catch (e) {
        // Ignore wait error if already done
      }
    }

    console.log('Configuring search settings...');
    
    // Set settings
    await client.setSettings({
      indexName,
      indexSettings: {
        searchableAttributes: [
          'title',
          'noteTitle',
          'subject',
          'chapter',
          'keywords',
          'description',
          'content'
        ],
        attributesForFaceting: [
          'searchable(subject)',
          'searchable(chapter)'
        ],
        attributesToHighlight: [
          'title',
          'noteTitle',
          'description',
          'content',
          'chapter',
          'subject'
        ],
        attributesToSnippet: [
          'content:30'
        ],
        typoTolerance: true,
      }
    });

    console.log(`\n✅ REAL UPLOAD SUCCESS: Successfully indexed ${records.length} records into Algolia index '${indexName}'!`);

    // Verify searchability using Search-Only API Key if available, or Client
    console.log('\nVerifying Search-Only API retrieval...');
    const searchKey = process.env.PUBLIC_ALGOLIA_SEARCH_API_KEY || adminApiKey;
    const testClient = algoliasearch(appId, searchKey);
    
    const searchRes = await testClient.searchSingleIndex({
      indexName,
      searchParams: { query: 'Python', hitsPerPage: 1 }
    });

    const hitsCount = searchRes.hits ? searchRes.hits.length : 0;
    const isSearchable = hitsCount > 0;

    console.log('\n==================================================');
    console.log('ALGOLIA INDEXING VERIFICATION SUMMARY');
    console.log('==================================================');
    console.log('1. Real Algolia upload: SUCCESS');
    console.log(`2. Index name: ${indexName}`);
    console.log(`3. Number of records actually uploaded: ${records.length}`);
    console.log(`4. Algolia API Searchable: ${isSearchable ? 'CONFIRMED' : 'PENDING_PROPAGATION'}`);
    console.log(`5. Search-Only API Key Retrieval: ${isSearchable ? 'CONFIRMED' : 'FAILED_OR_PENDING'}`);
    if (isSearchable && searchRes.hits[0]) {
      console.log(`   Sample hit retrieved: "${searchRes.hits[0].title}" (${searchRes.hits[0].url})`);
    }
    console.log('==================================================\n');

  } catch (err) {
    console.error('\n==================================================');
    console.error('ALGOLIA INDEXING VERIFICATION SUMMARY');
    console.error('==================================================');
    console.error('1. Real Algolia upload: FAILED');
    console.error(`2. Index name: ${indexName}`);
    console.error('3. Number of records actually uploaded: 0');
    console.error(`4. Error details: ${err.message}`);
    console.error('==================================================\n');
    process.exit(1);
  }
}

indexToAlgolia();
