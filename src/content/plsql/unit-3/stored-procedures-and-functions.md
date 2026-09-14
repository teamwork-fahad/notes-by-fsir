---
title: "3.2.3 Stored Procedures & Functions in PL/SQL"
description: "Master Oracle PL/SQL named subprograms: procedures vs functions, IN/OUT/IN OUT parameter modes, execution techniques, and business HR operations."
subject: "plsql"
chapter: "Unit 3: Oracle Tools and Utilities"
author: "Fahad Sir"
order: 5
published: true
---

# 3.2.3 Stored Procedures & Functions in PL/SQL

In contrast to anonymous blocks which are discarded after execution, **Stored Subprograms** (Procedures and Functions) are named PL/SQL blocks compiled once and permanently stored in the Oracle database data dictionary (`USER_SOURCE`).

---

## 1. Benefits of Stored Subprograms

- **Pre-compiled Execution:** Oracle parses and compiles the code on creation. Subsequent calls run the compiled p-code directly with zero compilation overhead.
- **Security & Access Control:** DBAs can grant `EXECUTE` privileges on a procedure to a user without granting access to the underlying sensitive tables (`employees`).
- **Data Integrity:** Business rules (e.g., maximum allowable salary hikes) are enforced at the database level regardless of which client application accesses the database.
- **Code Reusability & Maintainability:** Common logic is written once and shared across multiple applications.

---

## 2. Parameter Modes: `IN`, `OUT`, and `IN OUT`

When defining subprograms, parameters can be configured with three parameter modes:

| Parameter Mode | Default? | Direction | Can Read Inside? | Can Overwrite Inside? | Passed As |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`IN`** | **Yes** | Caller $\rightarrow$ Subprogram | Yes | **No** (Constants inside) | Value or Constant |
| **`OUT`** | No | Subprogram $\rightarrow$ Caller | No (Uninitialized) | **Yes** (Returns value) | Variable only |
| **`IN OUT`** | No | Caller $\leftrightarrow$ Subprogram | Yes | **Yes** (Modifies & returns) | Variable only |

---

## 3. Stored Procedures

A **procedure** performs an action (such as inserting records, calculating payrolls, or updating balances) and may optionally return zero, one, or multiple values via `OUT` parameters.

### 3.1 Procedure Syntax

```sql
CREATE OR REPLACE PROCEDURE procedure_name (
    parameter_1 [IN | OUT | IN OUT] data_type,
    parameter_2 [IN | OUT | IN OUT] data_type
)
IS
    -- Local variable declarations (Do NOT use the keyword DECLARE!)
BEGIN
    -- Executable statements
EXCEPTION
    -- Error handlers
END procedure_name;
/
```

### 3.2 Practical Example 1: Salary Hike Procedure (`IN` Parameters)

```sql
CREATE OR REPLACE PROCEDURE sp_give_salary_hike (
    p_emp_id     IN employees.emp_id%TYPE,
    p_percentage IN NUMBER
)
IS
    v_old_salary employees.salary%TYPE;
    v_new_salary employees.salary%TYPE;
    v_emp_name   employees.emp_name%TYPE;
BEGIN
    -- Validate percentage
    IF p_percentage <= 0 OR p_percentage > 50 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Percentage hike must be between 1% and 50%.');
    END IF;

    -- Fetch current salary and name
    SELECT emp_name, salary 
    INTO v_emp_name, v_old_salary
    FROM employees
    WHERE emp_id = p_emp_id;

    -- Calculate new salary
    v_new_salary := v_old_salary + (v_old_salary * (p_percentage / 100));

    -- Perform update
    UPDATE employees
    SET salary = v_new_salary
    WHERE emp_id = p_emp_id;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Hike applied for ' || v_emp_name || 
                         ': Old ₹' || v_old_salary || ' -> New ₹' || v_new_salary);

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: Employee ID ' || p_emp_id || ' does not exist.');
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END sp_give_salary_hike;
/
```

### Invoking the Procedure

```sql
-- Method 1: Using SQL*Plus EXECUTE command
EXEC sp_give_salary_hike(1004, 12);

-- Method 2: Calling from an anonymous PL/SQL block
BEGIN
    sp_give_salary_hike(p_emp_id => 1003, p_percentage => 10);
END;
/
```

---

### 3.3 Practical Example 2: Department Stats with `OUT` Parameters

Procedures can return multiple values using `OUT` parameters:

```sql
CREATE OR REPLACE PROCEDURE sp_get_dept_metrics (
    p_dept_id    IN  departments.dept_id%TYPE,
    p_staff_cnt  OUT NUMBER,
    p_avg_salary OUT NUMBER,
    p_max_salary OUT NUMBER
)
IS
BEGIN
    SELECT COUNT(*), NVL(AVG(salary), 0), NVL(MAX(salary), 0)
    INTO p_staff_cnt, p_avg_salary, p_max_salary
    FROM employees
    WHERE dept_id = p_dept_id;
END sp_get_dept_metrics;
/
```

#### Calling a Procedure with `OUT` Parameters

```sql
DECLARE
    v_count NUMBER;
    v_avg   NUMBER(10, 2);
    v_max   NUMBER(10, 2);
BEGIN
    -- Pass variables into OUT slots
    sp_get_dept_metrics(20, v_count, v_avg, v_max);

    DBMS_OUTPUT.PUT_LINE('--- Department 20 Metrics ---');
    DBMS_OUTPUT.PUT_LINE('Total Staff : ' || v_count);
    DBMS_OUTPUT.PUT_LINE('Avg Salary  : ₹' || v_avg);
    DBMS_OUTPUT.PUT_LINE('Max Salary  : ₹' || v_max);
END;
/
```

---

## 4. Stored Functions

A **function** must compute and return a **single value** to the caller. Unlike procedures, functions can be called directly inside standard SQL queries.

### 4.1 Function Syntax

```sql
CREATE OR REPLACE FUNCTION function_name (
    parameter_1 IN data_type
)
RETURN return_data_type
IS
    -- Local variables
BEGIN
    -- Executable statements
    RETURN some_value; -- MANDATORY
EXCEPTION
    -- Error handlers
END function_name;
/
```

### 4.2 Practical Example: Annual Compensation Function

```sql
CREATE OR REPLACE FUNCTION fn_annual_package (
    p_salary NUMBER,
    p_comm   NUMBER DEFAULT 0
)
RETURN NUMBER
DETERMINISTIC
IS
    v_annual_base NUMBER;
    v_comm_bonus  NUMBER;
BEGIN
    v_annual_base := p_salary * 12;
    v_comm_bonus  := (p_salary * NVL(p_comm, 0)) * 12;
    RETURN (v_annual_base + v_comm_bonus);
END fn_annual_package;
/
```

### 4.3 Calling Functions in Standard SQL Queries

Because `fn_annual_package` does not execute DML, it can be called directly inside SQL `SELECT`, `WHERE`, and `ORDER BY` clauses:

```sql
SELECT 
    emp_name,
    job_title,
    salary,
    commission_pct,
    fn_annual_package(salary, commission_pct) AS ctc_per_annum
FROM employees
ORDER BY ctc_per_annum DESC;
```

---

## 5. Parameter Passing Notations

Oracle supports three styles for passing arguments:

```sql
-- 1. Positional notation (arguments matched by order)
sp_give_salary_hike(1001, 10);

-- 2. Named notation (explicitly bound by name using =>)
sp_give_salary_hike(p_percentage => 10, p_emp_id => 1001);

-- 3. Mixed notation (positional first, followed by named)
sp_give_salary_hike(1001, p_percentage => 10);
```

---

## 6. Stored Procedure vs Stored Function (Comparison)

| Feature | Stored Procedure | Stored Function |
| :--- | :--- | :--- |
| **Primary Purpose** | Executes business actions / workflows | Computes and returns a computed value |
| **Return Mechanism** | Returns 0 or more values via `OUT` parameters | **Must** return exactly one value via `RETURN` |
| **Usage in SQL** | **Cannot** be called directly in `SELECT` queries | **Can** be called directly inside SQL statements |
| **DML Operations** | Fully supported (`INSERT`, `UPDATE`, `DELETE`) | Restricted when called inside SQL queries |
| **Header Clause** | `CREATE PROCEDURE name(...)` | `CREATE FUNCTION name(...) RETURN datatype` |

---

## 7. Managing Stored Subprograms

```sql
-- Drop subprograms
DROP PROCEDURE sp_give_salary_hike;
DROP FUNCTION fn_annual_package;

-- View stored code in data dictionary
SELECT line, text 
FROM user_source 
WHERE name = 'SP_GIVE_SALARY_HIKE' 
ORDER BY line;
```

Next, discover how to automate execution based on data changes in **[3.2.4 Database Triggers](/plsql/unit-3/database-triggers/)**!
