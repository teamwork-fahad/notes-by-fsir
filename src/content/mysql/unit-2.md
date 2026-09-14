---
title: 'Database Backup and CSV Handling'
description: 'Use the SQLite command-line tool for dumps and CSV import/export.'
---

## 2.1 SQLite Dump

The SQLite command-line tool uses dot commands for backup and export. These commands are run in the `sqlite3` terminal, not inside a normal SQL query editor.

Open a database:

```bash
sqlite3 school.db
```

Dump one table as SQL:

```text
.output students.sql
.dump students
.output stdout
```

Dump only a table's structure:

```text
.schema students
```

Dump the complete database:

```text
.output full_backup.sql
.dump
.output stdout
```

Dump data from selected tables:

```text
.mode insert students
.output students_data.sql
SELECT * FROM students;
.output stdout
```

Restore a dump into a new database:

```bash
sqlite3 restored.db < full_backup.sql
```

## 2.2 CSV Import

Create a table before importing CSV data. The CSV header should match the selected columns.

```sql
CREATE TABLE attendance (
  student_id INTEGER,
  attendance_date TEXT,
  present INTEGER
);
```

In the SQLite shell:

```text
.mode csv
.import --skip 1 attendance.csv attendance
```

For a CSV file with a header, `--skip 1` prevents the header row from becoming data. Check the imported rows:

```sql
SELECT * FROM attendance;
```

## 2.3 CSV Export

Export a query or table from the SQLite shell:

```text
.headers on
.mode csv
.output students.csv
SELECT student_id, student_name, city FROM students ORDER BY student_name;
.output stdout
```

You can also export a filtered report:

```text
.output completed_courses.csv
SELECT s.student_name, c.course_name, e.score
FROM enrollments AS e
JOIN students AS s ON s.student_id = e.student_id
JOIN courses AS c ON c.course_id = e.course_id
WHERE e.status = 'Completed';
.output stdout
```

## 2.4 SQLite Shell Practice

This section focuses on using SQLite shell commands for dumps and CSV export. For the full student database exercise in Python using `sqlite3`, see the SQLite + Python chapter.

### Practice

1. Create a complete backup of the practice database.
2. Export only delivered orders to a CSV file.
3. Import a CSV of attendance records and count present students by date.
4. Restore the dump into a new database and verify the row counts.
