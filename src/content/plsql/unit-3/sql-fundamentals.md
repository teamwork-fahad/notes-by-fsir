---
title: "3.1 SQL in Oracle (DDL, DML, TCL, DCL & Advanced Queries)"
description: "Master Oracle SQL fundamentals: command classifications, DUAL table, ROWNUM, built-in functions, joins, and subqueries with practical dummy data."
subject: "plsql"
chapter: "Unit 3: Oracle Tools and Utilities"
author: "Fahad Sir"
order: 2
published: true
---

# 3.1 SQL in Oracle

**Structured Query Language (SQL)** is the standard language used to communicate with Oracle Relational Database Management Systems (RDBMS). While SQL is standardized by ANSI/ISO, Oracle includes powerful extensions, pseudo-columns, functions, and transaction controls that make enterprise data processing fast and reliable.

---

## 1. Classification of SQL Statements

Oracle categorizes SQL statements into five primary sub-languages:

| Category | Full Name | Purpose | Key Commands | Transaction Impact |
| :--- | :--- | :--- | :--- | :--- |
| **DDL** | Data Definition Language | Defines, alters, and manages database structures | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` | **Auto-commits** immediately |
| **DML** | Data Manipulation Language | Manages and modifies existing data records | `INSERT`, `UPDATE`, `DELETE`, `MERGE` | Requires `COMMIT` or `ROLLBACK` |
| **DQL** | Data Query Language | Retrieves records from database tables | `SELECT` | Read-only |
| **TCL** | Transaction Control Language | Manages changes made by DML operations | `COMMIT`, `ROLLBACK`, `SAVEPOINT` | Controls transaction boundaries |
| **DCL** | Data Control Language | Controls security, access rights, and permissions | `GRANT`, `REVOKE` | Controls privileges |

---

## 2. DDL: Managing Table Structures

### 2.1 TRUNCATE vs DELETE (Crucial Exam Concept)

```sql
-- DML DELETE: Can be rolled back, logs every row, triggers fire
DELETE FROM employees WHERE status = 'INACTIVE';
ROLLBACK; -- Undoes deletion

-- DDL TRUNCATE: Fast, releases storage deallocations, cannot be rolled back, no triggers fire
TRUNCATE TABLE emp_audit;
```

### 2.2 ALTER TABLE Operations

```sql
-- Add a new column to employees
ALTER TABLE employees ADD (emergency_contact VARCHAR2(15));

-- Modify column definition
ALTER TABLE employees MODIFY (emergency_contact VARCHAR2(25));

-- Drop a column
ALTER TABLE employees DROP COLUMN emergency_contact;
```

---

## 3. DML: Data Manipulation & Oracle MERGE

### 3.1 Standard Insert, Update, and Delete

```sql
-- Inserting a new record using our sequence
INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, dept_id)
VALUES (emp_seq.NEXTVAL, 'Sunil Gavaskar', 'QA Engineer', 52000, 0.00, 20);

-- Updating records conditionally
UPDATE employees
SET salary = salary * 1.10
WHERE dept_id = 20 AND salary < 60000;

-- Deleting records
DELETE FROM employees
WHERE emp_id = 1011;
```

### 3.2 The Oracle MERGE Statement (UPSERT)

The `MERGE` statement combines `INSERT` and `UPDATE` into a single atomic operation:

```sql
MERGE INTO employees target
USING (SELECT 1004 AS emp_id, 62000 AS salary FROM dual) src
ON (target.emp_id = src.emp_id)
WHEN MATCHED THEN
    UPDATE SET target.salary = src.salary
WHEN NOT MATCHED THEN
    INSERT (emp_id, emp_name, job_title, salary, dept_id)
    VALUES (src.emp_id, 'New Joiner', 'Trainee', src.salary, 20);
```

---

## 4. Oracle TCL: Transactions & Savepoints

A transaction begins with the first executable DML command and ends with a `COMMIT`, `ROLLBACK`, or a DDL command (which forces an implicit commit).

```sql
-- Transaction begins
UPDATE employees SET salary = salary + 2000 WHERE dept_id = 10;
SAVEPOINT sp_admin_updated;

UPDATE employees SET salary = salary + 5000 WHERE dept_id = 20;
SAVEPOINT sp_eng_updated;

-- We made a mistake in engineering hike, rollback to sp_admin_updated
ROLLBACK TO sp_admin_updated;

-- Now commit only the admin update
COMMIT;
```

---

## 5. Oracle-Specific Features: DUAL, Pseudo-columns & Sequences

### 5.1 The `DUAL` Dummy Table

`DUAL` is a special single-row, single-column table maintained automatically by Oracle under the `SYS` schema. It is used to evaluate expressions, system variables, functions, and sequences without querying real user tables.

```sql
-- Get current database date & time
SELECT SYSDATE, TO_CHAR(SYSDATE, 'Day, DD-Month-YYYY HH24:MI:SS') AS full_now FROM dual;

-- Evaluate mathematical expressions
SELECT SQRT(144) AS square_root, POWER(2, 8) AS byte_combinations FROM dual;

-- Generate sequence numbers
SELECT emp_seq.NEXTVAL FROM dual;
```

### 5.2 Oracle Pseudo-Columns: `ROWNUM` and `ROWID`

- **`ROWNUM`**: Assigns a sequential temporary number (1, 2, 3...) to each row as it is fetched.
- **`ROWID`**: The physical storage address of the row in the Oracle data block (fastest possible row lookup).

```sql
-- Top 3 highest earning employees (Oracle pagination pattern)
SELECT emp_name, salary, job_title
FROM (
    SELECT emp_name, salary, job_title
    FROM employees
    ORDER BY salary DESC
)
WHERE ROWNUM <= 3;

-- Viewing physical row location
SELECT emp_id, emp_name, ROWID FROM employees WHERE emp_id = 1001;
```

---

## 6. Built-In Oracle Functions with Dummy Data

### 6.1 Character Functions

```sql
SELECT 
    emp_name,
    UPPER(emp_name) AS all_caps,
    LOWER(job_title) AS lower_title,
    SUBSTR(emp_name, 1, 5) AS short_name,
    INSTR(emp_name, ' ') AS space_pos,
    LENGTH(emp_name) AS name_len,
    LPAD(salary, 10, '*') AS formatted_sal
FROM employees;
```

### 6.2 Null-Handling Functions (`NVL`, `NVL2`, `COALESCE`)

Handling `NULL` is critical when calculating employee compensation:

```sql
SELECT 
    emp_name,
    salary,
    commission_pct,
    -- NVL(expr1, replace_with): If NULL, replace
    NVL(commission_pct, 0.00) AS safe_comm,
    -- NVL2(expr1, if_not_null, if_null)
    NVL2(commission_pct, 'Has Commission', 'No Commission') AS comm_status,
    -- Total earnings calculation
    salary + (salary * NVL(commission_pct, 0.00)) AS total_income
FROM employees;
```

### 6.3 Conditional Expressions: `DECODE` vs ANSI `CASE`

```sql
-- ANSI Standard CASE expression
SELECT emp_name, salary,
    CASE 
        WHEN salary >= 100000 THEN 'Grade A (Executive)'
        WHEN salary >= 70000  THEN 'Grade B (Senior)'
        ELSE                       'Grade C (Associate)'
    END AS pay_tier
FROM employees;

-- Oracle Proprietary DECODE function
SELECT emp_name, dept_id,
    DECODE(dept_id,
        10, 'Admin Wing',
        20, 'Software Lab',
        30, 'AI Wing',
        'Other Wing') AS location_alias
FROM employees;
```

---

## 7. Multi-Table Joins

Relate the `employees` and `departments` dummy tables using SQL-92 compliant ANSI joins:

### 7.1 INNER JOIN

Returns only matching rows present in both tables:

```sql
SELECT e.emp_id, e.emp_name, e.job_title, e.salary, d.dept_name, d.location
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id
ORDER BY d.dept_name, e.salary DESC;
```

### 7.2 LEFT, RIGHT & FULL OUTER JOINS

```sql
-- Shows all departments even if they currently have no employees assigned
SELECT d.dept_name, d.location, COUNT(e.emp_id) AS total_staff
FROM departments d
LEFT OUTER JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_name, d.location;
```

---

## 8. Grouping & Subqueries

### 8.1 Group By with HAVING

Find departments where average salary exceeds ₹65,000:

```sql
SELECT d.dept_name, COUNT(e.emp_id) AS staff_count, ROUND(AVG(e.salary), 2) AS avg_dept_salary
FROM departments d
JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_name
HAVING AVG(e.salary) > 65000;
```

### 8.2 Subqueries

```sql
-- Single-row subquery: Employees earning more than company average
SELECT emp_name, job_title, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Correlated subquery: Employees earning more than their department's average
SELECT e.emp_name, e.salary, e.dept_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(sub.salary)
    FROM employees sub
    WHERE sub.dept_id = e.dept_id
);
```

---

## Practice Exercises

1. Write a query to find the second-highest salary in the `employees` table without using analytical functions.
2. Display the total salary expenditure per department along with the department's name and city.
3. Write an update query using `NVL` that raises the commission of all employees with null or 0 commission to 0.03.

Next, proceed to **[3.2.1 PL/SQL Overview, Data Types & Control Structures](/plsql/unit-3/plsql-overview-datatypes-control-structures/)** to explore Oracle's procedural capabilities!
