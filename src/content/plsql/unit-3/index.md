---
title: "Unit 3: Oracle Tools & Utilities - Overview & Dummy Schema Setup"
description: "Unit 3 syllabus roadmap and complete runnable Oracle dummy schema script (departments, employees, orders, audit log) for hands-on practice."
subject: "plsql"
chapter: "Unit 3: Oracle Tools and Utilities"
author: "Fahad Sir"
order: 1
published: true
---

# Unit 3: Oracle Tools and Utilities

Welcome to **Unit 3: Oracle Tools and Utilities**. This unit bridges fundamental Relational Database Management concepts with enterprise-level procedural database programming using **Oracle SQL** and **Oracle PL/SQL (Procedural Language/Structured Query Language)**.

While standard SQL allows you to store, retrieve, and manipulate relational data declaratively, real-world business rules require procedural controls—such as loops, conditional execution (`IF-THEN`), error handling, reusable subprograms, automated trigger events, and modular packages.

---

## Unit 3 Syllabus Roadmap

Here is the complete study roadmap for this unit, structured to take you from foundational SQL concepts to advanced enterprise PL/SQL development:

| Topic Code | Topic Title | Core Concepts Covered |
| :--- | :--- | :--- |
| **3.1** | [**SQL in Oracle**](/plsql/unit-3/sql-fundamentals/) | DDL, DML, TCL, DCL, Oracle `DUAL` table, `ROWNUM`, sequences, built-in functions, joins, and subqueries. |
| **3.2.1** | [**PL/SQL Overview, Data Types & Control Structures**](/plsql/unit-3/plsql-overview-datatypes-control-structures/) | Architecture, Anonymous blocks, `%TYPE`, `%ROWTYPE`, `IF-THEN-ELSIF`, `CASE`, and `LOOP` constructs. |
| **3.2.2** | [**Cursors in PL/SQL**](/plsql/unit-3/cursors/) | Implicit (`SQL%FOUND`, `SQL%ROWCOUNT`) & Explicit cursors, Cursor `FOR` loops, Parameterized cursors, and `FOR UPDATE`. |
| **3.2.3** | [**Stored Procedures & Functions**](/plsql/unit-3/stored-procedures-and-functions/) | Subprograms, `IN`, `OUT`, `IN OUT` parameter modes, Return types, executing subprograms, and Procedure vs Function. |
| **3.2.4** | [**Database Triggers**](/plsql/unit-3/database-triggers/) | `BEFORE`/`AFTER`, Statement vs Row triggers (`FOR EACH ROW`), `:NEW` & `:OLD` qualifiers, and Audit trail logging. |
| **3.2.5** | [**Package Creation**](/plsql/unit-3/package-creation/) | Package Specification (API header), Package Body (implementation), private vs public items, and overloading. |
| **Lab** | [**Practical Lab & Viva Questions**](/plsql/unit-3/practical-lab-and-faq/) | End-to-end practical scenario, common Oracle error codes (`ORA-01403`, `ORA-04091`), and interview Q&A. |

---

## Oracle Dummy Database Schema Setup

To practice all the examples in this unit, copy and run the following unified SQL script in your **Oracle SQL Developer**, **SQL*Plus**, or **Oracle Live SQL** environment.

This schema models an organization with **Departments**, **Employees**, **Projects**, and an **Audit Log** table for triggers.

```sql
-- =============================================================
-- UNIT 3: ORACLE PL/SQL DUMMY SCHEMA SETUP
-- Author: Fahad Sir
-- Description: Run this script to prepare tables for all examples
-- =============================================================

-- 1. CLEANUP (Drop existing objects if recreating)
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE emp_audit CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE employees CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE departments CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP SEQUENCE emp_seq';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP SEQUENCE audit_seq';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

-- 2. CREATE SEQUENCES
CREATE SEQUENCE emp_seq START WITH 1011 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE audit_seq START WITH 1 INCREMENT BY 1 NOCACHE;

-- 3. CREATE DEPARTMENTS TABLE
CREATE TABLE departments (
    dept_id     NUMBER(4) PRIMARY KEY,
    dept_name   VARCHAR2(50) NOT NULL,
    location    VARCHAR2(50) NOT NULL
);

-- 4. CREATE EMPLOYEES TABLE
CREATE TABLE employees (
    emp_id          NUMBER(6) PRIMARY KEY,
    emp_name        VARCHAR2(60) NOT NULL,
    job_title       VARCHAR2(50) NOT NULL,
    salary          NUMBER(10, 2) NOT NULL,
    commission_pct  NUMBER(4, 2) DEFAULT 0.00,
    hire_date       DATE DEFAULT SYSDATE NOT NULL,
    dept_id         NUMBER(4),
    status          VARCHAR2(20) DEFAULT 'ACTIVE',
    CONSTRAINT fk_emp_dept FOREIGN KEY (dept_id) 
        REFERENCES departments(dept_id) ON DELETE SET NULL,
    CONSTRAINT chk_emp_salary CHECK (salary > 0)
);

-- 5. CREATE EMP_AUDIT TABLE (FOR TRIGGER EXAMPLES)
CREATE TABLE emp_audit (
    audit_id    NUMBER(8) PRIMARY KEY,
    emp_id      NUMBER(6),
    action_type VARCHAR2(20),
    old_salary  NUMBER(10, 2),
    new_salary  NUMBER(10, 2),
    changed_by  VARCHAR2(50),
    changed_at  DATE DEFAULT SYSDATE
);

-- 6. INSERT DUMMY DATA FOR DEPARTMENTS
INSERT INTO departments (dept_id, dept_name, location) VALUES (10, 'Administration', 'Mumbai');
INSERT INTO departments (dept_id, dept_name, location) VALUES (20, 'Software Engineering', 'Bangalore');
INSERT INTO departments (dept_id, dept_name, location) VALUES (30, 'Data & AI', 'Hyderabad');
INSERT INTO departments (dept_id, dept_name, location) VALUES (40, 'Finance & Accounts', 'Pune');
INSERT INTO departments (dept_id, dept_name, location) VALUES (50, 'Human Resources', 'Delhi');

-- 7. INSERT DUMMY DATA FOR EMPLOYEES
INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1001, 'Aarav Sharma', 'Director', 145000.00, 0.20, TO_DATE('2018-03-15', 'YYYY-MM-DD'), 10);

INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1002, 'Priya Patel', 'Tech Lead', 98000.00, 0.10, TO_DATE('2019-07-01', 'YYYY-MM-DD'), 20);

INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1003, 'Rohan Mehta', 'Senior Developer', 78000.00, 0.05, TO_DATE('2020-01-10', 'YYYY-MM-DD'), 20);

INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1004, 'Ananya Iyer', 'Software Engineer', 56000.00, 0.00, TO_DATE('2021-09-20', 'YYYY-MM-DD'), 20);

INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1005, 'Kabir Khan', 'AI Specialist', 92000.00, 0.12, TO_DATE('2020-11-05', 'YYYY-MM-DD'), 30);

INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1006, 'Neha Verma', 'Data Analyst', 58000.00, 0.00, TO_DATE('2022-04-18', 'YYYY-MM-DD'), 30);

INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1007, 'Vikram Malhotra', 'Finance Manager', 89000.00, 0.08, TO_DATE('2019-10-12', 'YYYY-MM-DD'), 40);

INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1008, 'Sanya Kapoor', 'Accountant', 45000.00, 0.00, TO_DATE('2022-08-01', 'YYYY-MM-DD'), 40);

INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1009, 'Sameer Joshi', 'HR Executive', 48000.00, 0.00, TO_DATE('2021-02-14', 'YYYY-MM-DD'), 50);

INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, hire_date, dept_id)
VALUES (1010, 'Divya Nair', 'HR Manager', 72000.00, 0.05, TO_DATE('2020-06-25', 'YYYY-MM-DD'), 50);

COMMIT;
```

---

## Verifying Your Setup

Once you have executed the script, verify the tables and row counts:

```sql
SELECT table_name FROM user_tables WHERE table_name IN ('DEPARTMENTS', 'EMPLOYEES', 'EMP_AUDIT');
```

```sql
SELECT d.dept_name, COUNT(e.emp_id) AS employee_count, AVG(e.salary) AS avg_salary
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_name
ORDER BY avg_salary DESC;
```

### Important Oracle SQL*Plus Environment Setting

Before running PL/SQL blocks that output messages via `DBMS_OUTPUT.PUT_LINE`, always execute this command once in your SQL*Plus or SQL Developer command line:

```sql
SET SERVEROUTPUT ON;
```

Without this setting, Oracle executes your code correctly but suppresses server console output from appearing on screen.

Click on **[3.1 SQL in Oracle](/plsql/unit-3/sql-fundamentals/)** to start learning!
