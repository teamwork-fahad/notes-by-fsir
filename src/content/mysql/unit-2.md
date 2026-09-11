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
