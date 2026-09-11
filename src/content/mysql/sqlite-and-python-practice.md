---
title: 'SQLite and Python Practice'
description: SQLite datasets, Python examples, and data analysis exercises for beginners.
---
# SQLite and Python Practice

This page contains 12 connected and standalone datasets. Run the setup scripts in order, then solve the exercises using `SELECT`, filtering, sorting, grouping, joins, subqueries, and window functio[...]

:::tip
The SQL uses common MySQL/PostgreSQL-compatible syntax. Run each block separately if your database does not support multiple statements at once.
:::

## Course Syllabus

This course moves from SQLite fundamentals to Python database programming, file handling, Pandas/NumPy data frames, and two-dimensional data visualization.

* [Introduction to SQLite](/sql/)
* [Database Backup and CSV Handling](/sql/unit-2/)
* [Python Interaction with SQLite](/sql/unit-3/)
* [Python Interaction with Text and CSV](/sql/unit-4/)
* [Data Visualization Using DataFrames](/sql/unit-5/)

## 1. Departments

```sql
CREATE TABLE departments (
  department_id INT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL,
  location VARCHAR(50)
);

INSERT INTO departments VALUES
(1, 'Engineering', 'Delhi'),
(2, 'Sales', 'Mumbai'),
(3, 'Human Resources', 'Bengaluru'),
(4, 'Finance', 'Pune'),
(5, 'Support', 'Hyderabad');
```

Practice: Find departments located in cities starting with `D`; count departments by location.
