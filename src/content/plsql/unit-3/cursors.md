---
title: "3.2.2 Cursors in Oracle PL/SQL"
description: "Master Oracle cursors: context areas, implicit attributes (SQL%FOUND, SQL%ROWCOUNT), explicit cursor lifecycle, Cursor FOR loops, parameterized cursors, and FOR UPDATE."
subject: "plsql"
chapter: "Unit 3: Oracle Tools and Utilities"
author: "Fahad Sir"
order: 4
published: true
---

# 3.2.2 Cursors in Oracle PL/SQL

In standard PL/SQL, an ordinary `SELECT INTO` statement can retrieve **only one row**. If a query returns multiple rows, Oracle throws the fatal `ORA-01422: exact fetch returns more than requested number of rows` exception.

To retrieve and process multi-row query results one row at a time, Oracle uses **Cursors**.

---

## 1. What is a Cursor?

A **cursor** is a pointer to a private memory work area allocated by Oracle called the **Context Area**. The Context Area holds:
- The parsed SQL statement.
- The rows returned by the query (called the **Active Set**).
- Status information about the execution state.

Oracle supports two types of cursors:
1. **Implicit Cursors:** Created and managed automatically by Oracle for all SQL DML statements (`INSERT`, `UPDATE`, `DELETE`) and single-row `SELECT INTO` queries.
2. **Explicit Cursors:** Defined and controlled manually by the developer for multi-row queries.

---

## 2. Implicit Cursors & Their Attributes

Every time a DML statement is executed, Oracle opens an implicit cursor named `SQL`. Developers can inspect the outcome using **implicit cursor attributes**:

| Attribute | Meaning / Value |
| :--- | :--- |
| `SQL%FOUND` | `TRUE` if DML modified $\ge 1$ row, or single-row `SELECT` returned a row. |
| `SQL%NOTFOUND` | `TRUE` if no rows were modified or returned. |
| `SQL%ROWCOUNT` | Number of rows affected by the most recent SQL statement. |
| `SQL%ISOPEN` | Always `FALSE` because Oracle closes implicit cursors automatically. |

### Example: Using Implicit Cursor Attributes with DML

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_dept_id     employees.dept_id%TYPE := 20;
    v_hike_amount NUMBER(6)              := 3000;
BEGIN
    UPDATE employees
    SET salary = salary + v_hike_amount
    WHERE dept_id = v_dept_id AND salary < 90000;

    -- Inspect the implicit cursor
    IF SQL%FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Success! Modified ' || SQL%ROWCOUNT || ' employees in department ' || v_dept_id);
    ELSE
        DBMS_OUTPUT.PUT_LINE('No employees qualified for a hike in department ' || v_dept_id);
    END IF;

    COMMIT;
END;
/
```

---

## 3. Explicit Cursors: The 4-Step Lifecycle

When querying multiple rows, declare an **explicit cursor**. Its lifecycle consists of four steps:

```
+-----------+       +--------+       +---------+       +---------+
|  DECLARE  |  -->  |  OPEN  |  -->  |  FETCH  |  -->  |  CLOSE  |
+-----------+       +--------+       +---------+       +---------+
```

1. **DECLARE:** Names the cursor and defines the `SELECT` query in the `DECLARE` section.
2. **OPEN:** Allocates memory, executes the query, and binds variables to establish the **Active Set**.
3. **FETCH:** Retrieves the current row from the active set into variables and advances the pointer.
4. **CLOSE:** Releases the allocated context area memory back to the database server.

---

## 4. Classic Explicit Cursor Example

```sql
DECLARE
    -- Step 1: Declare the cursor
    CURSOR cur_it_staff IS
        SELECT emp_id, emp_name, job_title, salary
        FROM employees
        WHERE dept_id = 20
        ORDER BY salary DESC;

    -- Variables to hold fetched data
    v_id     employees.emp_id%TYPE;
    v_name   employees.emp_name%TYPE;
    v_title  employees.job_title%TYPE;
    v_salary employees.salary%TYPE;
BEGIN
    -- Step 2: Open cursor
    OPEN cur_it_staff;

    DBMS_OUTPUT.PUT_LINE('--- IT STAFF REPORT ---');
    LOOP
        -- Step 3: Fetch next row
        FETCH cur_it_staff INTO v_id, v_name, v_title, v_salary;

        -- Exit loop when no more rows exist
        EXIT WHEN cur_it_staff%NOTFOUND;

        DBMS_OUTPUT.PUT_LINE('Row #' || cur_it_staff%ROWCOUNT || ': [' || v_id || '] ' || 
                             RPAD(v_name, 18) || ' | ' || RPAD(v_title, 18) || ' | ₹' || v_salary);
    END LOOP;

    -- Step 4: Close cursor
    CLOSE cur_it_staff;
END;
/
```

### Explicit Cursor Attributes

| Attribute | Syntax | Returns |
| :--- | :--- | :--- |
| `%FOUND` | `cursor_name%FOUND` | `TRUE` if the last `FETCH` retrieved a row; `FALSE` otherwise. |
| `%NOTFOUND` | `cursor_name%NOTFOUND` | `TRUE` if the last `FETCH` failed to retrieve a row. |
| `%ROWCOUNT` | `cursor_name%ROWCOUNT` | Cumulative number of rows fetched so far. |
| `%ISOPEN` | `cursor_name%ISOPEN` | `TRUE` if the cursor is open; `FALSE` if closed. |

---

## 5. Cursor `FOR` Loop (Industry Best Practice)

The Cursor `FOR` loop is the most elegant, readable, and safe way to handle explicit cursors. Oracle automatically:
1. Opens the cursor.
2. Declares a record variable of type `cursor_name%ROWTYPE`.
3. Fetches each row into the record until `%NOTFOUND`.
4. Closes the cursor automatically when loop terminates (even on exceptions).

```sql
DECLARE
    CURSOR cur_dept_summary IS
        SELECT d.dept_name, d.location, COUNT(e.emp_id) AS total_emps, NVL(SUM(e.salary), 0) AS total_payroll
        FROM departments d
        LEFT JOIN employees e ON d.dept_id = e.dept_id
        GROUP BY d.dept_name, d.location
        ORDER BY total_payroll DESC;
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- DEPARTMENT PAYROLL SUMMARY (CURSOR FOR LOOP) ---');
    
    -- Oracle handles OPEN, FETCH, RECORD DECLARATION, and CLOSE automatically!
    FOR rec IN cur_dept_summary LOOP
        DBMS_OUTPUT.PUT_LINE(RPAD(rec.dept_name, 25) || ' (' || RPAD(rec.location, 10) || ') ' ||
                             '| Staff: ' || LPAD(rec.total_emps, 2) || 
                             ' | Payroll: ₹' || LPAD(rec.total_payroll, 10));
    END LOOP;
END;
/
```

---

## 6. Parameterized Cursors

You can pass arguments to cursors just like functions. This makes a single cursor reusable across different departments, locations, or salary ranges.

```sql
DECLARE
    -- Parameterized cursor accepting dept_id and min_salary
    CURSOR cur_filtered_staff(p_dept NUMBER, p_min_sal NUMBER) IS
        SELECT emp_name, job_title, salary
        FROM employees
        WHERE dept_id = p_dept AND salary >= p_min_sal
        ORDER BY salary DESC;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== AI Dept (30) Staff earning >= ₹60,000 ===');
    FOR emp IN cur_filtered_staff(30, 60000) LOOP
        DBMS_OUTPUT.PUT_LINE('- ' || emp.emp_name || ' (' || emp.job_title || '): ₹' || emp.salary);
    END LOOP;

    DBMS_OUTPUT.PUT_LINE('=== Finance Dept (40) Staff earning >= ₹50,000 ===');
    FOR emp IN cur_filtered_staff(40, 50000) LOOP
        DBMS_OUTPUT.PUT_LINE('- ' || emp.emp_name || ' (' || emp.job_title || '): ₹' || emp.salary);
    END LOOP;
END;
/
```

---

## 7. Locking Rows: `FOR UPDATE` and `WHERE CURRENT OF`

When a PL/SQL program reads rows and subsequently updates or deletes them, other database sessions might modify those rows concurrently.

- **`FOR UPDATE` Clause:** Locks the queried rows at the database level when the cursor is opened.
- **`WHERE CURRENT OF cursor_name`:** Updates or deletes the **exact row currently pointed to** by the cursor, eliminating the need for a separate primary key search.

```sql
DECLARE
    -- Lock rows of employees in Department 50 earning less than 50000
    CURSOR cur_appraisal IS
        SELECT emp_id, emp_name, salary
        FROM employees
        WHERE dept_id = 50 AND salary < 50000
        FOR UPDATE OF salary;
BEGIN
    FOR emp IN cur_appraisal LOOP
        -- Give a 15% increment directly to the current fetched row
        UPDATE employees
        SET salary = salary * 1.15
        WHERE CURRENT OF cur_appraisal;

        DBMS_OUTPUT.PUT_LINE('Updated salary for: ' || emp.emp_name);
    END LOOP;

    COMMIT; -- Releases locks acquired by FOR UPDATE
END;
/
```

---

## Cursor Comparison Table

| Aspect | Classic OPEN / FETCH / CLOSE | Cursor FOR Loop |
| :--- | :--- | :--- |
| **Manual Open/Close** | Mandatory | Handled automatically by Oracle |
| **Record Variable** | Explicit declaration required | Automatically declared |
| **Risk of Memory Leaks** | High (if exception occurs before CLOSE) | Zero (always safely closed) |
| **Best Used For** | Complex multi-cursor synchronization | Standard iteration over row sets (Recommended) |

Next, advance to **[3.2.3 Stored Procedures & Functions](/plsql/unit-3/stored-procedures-and-functions/)** to encapsulate reusable business operations!
