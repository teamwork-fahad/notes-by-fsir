---
title: 'Python Interaction with SQLite'
description: 'Use Python modules and sqlite3 to create, read, update, and delete database records.'
---

## 3.1 Modules, Namespaces, and Packages

A module is a Python file containing reusable code. A package is a directory of related modules, usually identified by `__init__.py`. A namespace controls where a name can be accessed, and scope controls how long that name is available.

```python
# project/database_tools.py
DEFAULT_LIMIT = 10

# app.py
import sys
from database_tools import DEFAULT_LIMIT

print(sys.path)
print(DEFAULT_LIMIT)
```

`PYTHONPATH` can add module search locations. Prefer a virtual environment and package installation for real projects rather than changing it globally.

## 3.2 Connecting to SQLite

Python includes the `sqlite3` module in the standard library.

```python
import sqlite3

connection = sqlite3.connect('school.db')
connection.execute('PRAGMA foreign_keys = ON')

connection.execute('''
  CREATE TABLE IF NOT EXISTS notes (
    note_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT
  )
''')
connection.commit()
connection.close()
```

Use parameterized queries instead of string concatenation.

```python
import sqlite3

with sqlite3.connect('school.db') as connection:
    connection.execute(
        'INSERT INTO notes(title, body) VALUES (?, ?)',
        ('SQLite practice', 'Learn one query at a time')
    )
```

## 3.3 Execute and Fetch

`fetchone()` returns one row. `fetchall()` returns all remaining rows.

```python
import sqlite3

with sqlite3.connect('school.db') as connection:
    cursor = connection.execute(
        'SELECT student_id, student_name FROM students ORDER BY student_id'
    )
    first_student = cursor.fetchone()
    remaining_students = cursor.fetchall()

print(first_student)
print(remaining_students)
```

Insert, update, and delete with `execute()`:

```python
with sqlite3.connect('school.db') as connection:
    connection.execute(
        'INSERT INTO students(student_id, student_name, city, age, joined_on) '
        'VALUES (?, ?, ?, ?, ?)',
        (9, 'Kavya Shah', 'Jaipur', 20, '2024-08-20')
    )
    connection.execute(
        'UPDATE students SET city = ? WHERE student_id = ?',
        ('Ahmedabad', 9)
    )
    connection.execute('DELETE FROM students WHERE student_id = ?', (9,))
    connection.commit()
```

## 3.4 SQLite + Python Student Database Assignment

This practical exercise creates a college database, inserts 10 student records, adds a `course` column, filters students from `Navsari` in `bca`, and exports the table to SQL and CSV files.

```python
import sqlite3
import csv

# Connect to database
conn = sqlite3.connect('college.db')
cur = conn.cursor()

# Create table
cur.execute('''
CREATE TABLE IF NOT EXISTS Student (
    roll_no INTEGER PRIMARY KEY,
    name TEXT(20),
    city TEXT(20),
    age INTEGER
)
''')

# Insert 10 student records
students = [
    (101, 'Jil', 'Surat', 24),
    (102, 'Ayaan', 'Ahmedabad', 21),
    (103, 'Zaid', 'Vadodara', 19),
    (104, 'Akash', 'Rajkot', 22),
    (105, 'Indrajeet', 'Bharuch', 20),
    (106, 'Ali', 'Surat', 20),
    (107, 'Riya', 'Navsari', 23),
    (108, 'Mehul', 'Surat', 21),
    (109, 'Nisha', 'Vadodara', 22),
    (110, 'Aman', 'Rajkot', 20)
]

cur.executemany(
    'INSERT INTO Student (roll_no, name, city, age) VALUES (?, ?, ?, ?)',
    students
)

# Add column course
cur.execute('ALTER TABLE Student ADD COLUMN course TEXT(20)')

# Update the required student
cur.execute(
    'UPDATE Student SET city = ?, course = ? WHERE roll_no = ?',
    ('Navsari', 'bca', 103)
)

# Display students from Navsari with course bca
print('Students from Navsari with course bca:')
rows = cur.execute(
    'SELECT * FROM Student WHERE city = ? AND course = ?',
    ('Navsari', 'bca')
).fetchall()

for row in rows:
    print(row)

# Export SQL dump
with open('student_table.sql', 'w', encoding='utf-8') as file:
    for line in conn.iterdump():
        file.write(line + '\n')

# Export CSV file
with open('student.csv', 'w', newline='', encoding='utf-8') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(['roll_no', 'name', 'city', 'age', 'course'])
    writer.writerows(
        cur.execute('SELECT roll_no, name, city, age, course FROM Student').fetchall()
    )

conn.commit()
conn.close()

print('SQL dump saved as student_table.sql')
print('CSV export saved as student.csv')
```

Expected result for the query:

```python
(103, 'Zaid', 'Navsari', 19, 'bca')
```

This is the Python version of the assignment, using the built-in `sqlite3` module instead of writing only raw SQL commands.

### Practice

1. Write a function that returns one student by ID.
2. Write a function that returns all students from a city.
3. Insert five rows with `executemany()` and commit them in one transaction.
4. Update a course fee and verify it with `fetchone()`.
