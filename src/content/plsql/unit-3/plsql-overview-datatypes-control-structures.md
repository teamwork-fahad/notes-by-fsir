---
title: "3.2.1 PL/SQL Overview, Data Types & Control Structures"
description: "Comprehensive guide to Oracle PL/SQL architecture, block structure, %TYPE, %ROWTYPE, conditional statements (IF, CASE), and iterative loops with dummy data."
subject: "plsql"
chapter: "Unit 3: Oracle Tools and Utilities"
author: "Fahad Sir"
order: 3
published: true
---

# 3.2.1 PL/SQL Overview, Data Types & Control Structures

## 1. What is PL/SQL?

**PL/SQL (Procedural Language extension to SQL)** is Oracle Corporation's proprietary procedural extension to SQL. Standard SQL is non-procedural (declarative): you specify **what** data you want, but you cannot define iterative logic, variables, branching (`if-else`), or error handling.

PL/SQL combines the data manipulation power of SQL with the structural capabilities of procedural programming languages like C, C++, and Java.

---

## 2. Advantages of PL/SQL over SQL

| Feature | Standard SQL | Oracle PL/SQL |
| :--- | :--- | :--- |
| **Execution Paradigm** | Single query sent across the network one at a time | Entire block of statements compiled and sent in a single network round-trip |
| **Procedural Logic** | No variables, loops, or conditional logic | Supports variables, constants, records, `IF-THEN-ELSE`, and loops |
| **Error Handling** | Aborts execution on error | Structured, user-friendly exception handling (`EXCEPTION` block) |
| **Performance** | High network traffic for multiple queries | Drastically reduced network latency and higher throughput |
| **Modularity & Security** | Ad-hoc queries | Modular stored subprograms, triggers, and secure encapsulated packages |

### The PL/SQL Engine Architecture

When an application sends a PL/SQL block to the Oracle Database Server, the **PL/SQL Engine** processes it:
1. Procedural statements (loops, assignments, conditions) are executed directly by the PL/SQL Engine.
2. SQL statements (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) are stripped and routed to the database **SQL Engine**.

---

## 3. PL/SQL Block Structure

A PL/SQL program is organized into logical units called **blocks**. A block consists of three sections:

```sql
DECLARE
    -- [OPTIONAL] Variables, constants, cursors, user-defined exceptions
BEGIN
    -- [MANDATORY] Executable SQL & procedural statements
EXCEPTION
    -- [OPTIONAL] Handlers for runtime errors
END;
/
```

> **Note:** The forward slash (`/`) on a new line tells SQL*Plus / SQL Developer to execute the submitted buffer.

### Anonymous Block vs Named Block

- **Anonymous Block:** Unnamed block compiled and executed on-the-fly. It is not stored in the database catalog (e.g., ad-hoc scripts).
- **Named Block:** Stored in the database dictionary as a pre-compiled object (Procedures, Functions, Packages, Triggers).

---

## 4. First PL/SQL Program with Output

Make sure `SET SERVEROUTPUT ON;` is enabled.

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_greeting VARCHAR2(50) := 'Hello from Oracle PL/SQL!';
    v_author   CONSTANT VARCHAR2(30) := 'Fahad Sir';
BEGIN
    DBMS_OUTPUT.PUT_LINE(v_greeting);
    DBMS_OUTPUT.PUT_LINE('Tutorial crafted by: ' || v_author);
END;
/
```

**Output:**
```text
Hello from Oracle PL/SQL!
Tutorial crafted by: Fahad Sir
PL/SQL procedure successfully completed.
```

---

## 5. PL/SQL Data Types

Oracle PL/SQL supports scalar types, composite types, reference types, and large objects (LOBs).

### 5.1 Scalar Data Types

```sql
DECLARE
    v_emp_id      NUMBER(6)       := 1002;
    v_salary      NUMBER(10, 2)   := 98000.50;
    v_emp_name    VARCHAR2(50)    := 'Priya Patel';
    v_hire_date   DATE            := SYSDATE;
    v_is_eligible BOOLEAN         := TRUE; -- Note: BOOLEAN is PL/SQL only!
BEGIN
    IF v_is_eligible THEN
        DBMS_OUTPUT.PUT_LINE('Employee ' || v_emp_name || ' earns ₹' || v_salary);
    END IF;
END;
/
```

---

## 6. Dynamic Anchoring: `%TYPE` and `%ROWTYPE`

Hardcoding data types in PL/SQL creates maintenance issues if database column sizes change. Oracle provides two dynamic anchoring attributes:

### 6.1 The `%TYPE` Attribute

Declares a variable with the **exact data type and precision** of a database column or another variable.

```sql
DECLARE
    -- Anchored to table columns:
    v_name   employees.emp_name%TYPE;
    v_salary employees.salary%TYPE;
BEGIN
    -- SELECT INTO: Must return EXACTLY ONE ROW
    SELECT emp_name, salary
    INTO v_name, v_salary
    FROM employees
    WHERE emp_id = 1003;

    DBMS_OUTPUT.PUT_LINE('Employee Name: ' || v_name);
    DBMS_OUTPUT.PUT_LINE('Monthly Salary: ₹' || v_salary);
END;
/
```

### 6.2 The `%ROWTYPE` Attribute

Declares a composite record variable that represents a **full row of a table or view**.

```sql
DECLARE
    -- Holds all columns of the employees table
    rec_emp employees%ROWTYPE;
BEGIN
    SELECT *
    INTO rec_emp
    FROM employees
    WHERE emp_id = 1005;

    DBMS_OUTPUT.PUT_LINE('ID: ' || rec_emp.emp_id);
    DBMS_OUTPUT.PUT_LINE('Name: ' || rec_emp.emp_name);
    DBMS_OUTPUT.PUT_LINE('Designation: ' || rec_emp.job_title);
    DBMS_OUTPUT.PUT_LINE('Base Salary: ₹' || rec_emp.salary);
    DBMS_OUTPUT.PUT_LINE('Hire Date: ' || TO_CHAR(rec_emp.hire_date, 'DD-Mon-YYYY'));
END;
/
```

---

## 7. Conditional Control Structures

### 7.1 `IF - THEN - ELSIF - ELSE`

```sql
DECLARE
    v_emp_id   employees.emp_id%TYPE := 1004;
    v_salary   employees.salary%TYPE;
    v_bonus    NUMBER(10, 2);
    v_category VARCHAR2(20);
BEGIN
    SELECT salary INTO v_salary FROM employees WHERE emp_id = v_emp_id;

    IF v_salary >= 100000 THEN
        v_bonus := v_salary * 0.20;
        v_category := 'Tier 1 (Executive)';
    ELSIF v_salary >= 70000 THEN
        v_bonus := v_salary * 0.15;
        v_category := 'Tier 2 (Senior)';
    ELSE
        v_bonus := v_salary * 0.10;
        v_category := 'Tier 3 (Standard)';
    END IF;

    DBMS_OUTPUT.PUT_LINE('Category : ' || v_category);
    DBMS_OUTPUT.PUT_LINE('Salary   : ₹' || v_salary);
    DBMS_OUTPUT.PUT_LINE('Bonus    : ₹' || v_bonus);
END;
/
```

### 7.2 The `CASE` Statement

Oracle PL/SQL supports both Simple `CASE` and Searched `CASE` statements:

```sql
DECLARE
    v_dept_id   departments.dept_id%TYPE := 30;
    v_dept_desc VARCHAR2(100);
BEGIN
    -- Searched CASE
    CASE 
        WHEN v_dept_id = 10 THEN v_dept_desc := 'Corporate Headquarters';
        WHEN v_dept_id = 20 THEN v_dept_desc := 'Application Development Center';
        WHEN v_dept_id = 30 THEN v_dept_desc := 'Artificial Intelligence & Machine Learning Lab';
        WHEN v_dept_id = 40 THEN v_dept_desc := 'Accounts & Budgeting Division';
        ELSE v_dept_desc := 'General Operations Division';
    END CASE;

    DBMS_OUTPUT.PUT_LINE('Dept ID ' || v_dept_id || ' is: ' || v_dept_desc);
END;
/
```

---

## 8. Iterative Control: Loops in PL/SQL

PL/SQL provides three types of loops:

### 8.1 Simple / Basic `LOOP`

Executes until an explicit `EXIT` or `EXIT WHEN` condition is encountered.

```sql
DECLARE
    v_counter NUMBER(2) := 1;
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- Simple Loop Demonstration ---');
    LOOP
        DBMS_OUTPUT.PUT_LINE('Step Count: ' || v_counter);
        v_counter := v_counter + 1;
        EXIT WHEN v_counter > 5;
    END LOOP;
END;
/
```

### 8.2 The `WHILE` Loop

Tests the condition **before** entering the loop body.

```sql
DECLARE
    v_num NUMBER(2) := 1;
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- WHILE Loop: Multiples of 3 ---');
    WHILE v_num <= 5 LOOP
        DBMS_OUTPUT.PUT_LINE(v_num || ' x 3 = ' || (v_num * 3));
        v_num := v_num + 1;
    END LOOP;
END;
/
```

### 8.3 The Numeric `FOR` Loop

Automatically declares its loop index variable and increments or decrements it:

```sql
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- Ascending FOR Loop ---');
    FOR i IN 1..5 LOOP
        DBMS_OUTPUT.PUT_LINE('Iteration #' || i);
    END LOOP;

    DBMS_OUTPUT.PUT_LINE('--- REVERSE FOR Loop ---');
    FOR i IN REVERSE 1..5 LOOP
        DBMS_OUTPUT.PUT_LINE('Countdown: ' || i);
    END LOOP;
END;
/
```

> **Important:** In a `FOR loop`, the loop counter (`i`) cannot be modified manually inside the loop, and its scope is restricted strictly to the loop body.

---

## 9. Exception Handling in Basic Blocks

If a `SELECT INTO` returns 0 rows or multiple rows, Oracle raises runtime errors:

```sql
DECLARE
    v_name employees.emp_name%TYPE;
BEGIN
    -- Trying to fetch non-existent employee 9999
    SELECT emp_name INTO v_name FROM employees WHERE emp_id = 9999;
    DBMS_OUTPUT.PUT_LINE('Found: ' || v_name);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: Employee with ID 9999 does not exist.');
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Error: Query matched multiple records. Use a cursor instead.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Unexpected error code: ' || SQLCODE || ' - ' || SQLERRM);
END;
/
```

---

## Summary Cheat Sheet

| Construct | Syntax Pattern | When to Use |
| :--- | :--- | :--- |
| `%TYPE` | `var_name table.col%TYPE;` | To mirror database column types reliably |
| `%ROWTYPE` | `rec_name table%ROWTYPE;` | To store an entire row of record data |
| `IF-THEN-ELSIF` | `IF cond THEN ... ELSIF cond THEN ... END IF;` | Multi-branch procedural decision making |
| `CASE` | `CASE WHEN cond THEN ... ELSE ... END CASE;` | Clean evaluation of multiple conditions |
| `FOR Loop` | `FOR counter IN low..high LOOP ... END LOOP;` | Known, bounded iterations |

When you need to process query results with multiple rows, single-variable `SELECT INTO` fails with `TOO_MANY_ROWS`. That is where **Cursors** come into play.

Continue to **[3.2.2 Cursors in Oracle PL/SQL](/plsql/unit-3/cursors/)**!
