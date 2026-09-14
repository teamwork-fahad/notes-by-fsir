---
title: "Unit 3 Practical Lab, Common Errors & Viva Questions"
description: "Master Oracle PL/SQL lab exams: end-to-end practical project, common error code fixes (ORA-01403, ORA-01422, ORA-04091), and top viva voce questions with solutions."
subject: "plsql"
chapter: "Unit 3: Oracle Tools and Utilities"
author: "Fahad Sir"
order: 8
published: true
---

# Unit 3 Practical Lab, Common Errors & Viva Questions

This practical guide prepares you for university lab examinations, viva voce evaluations, and technical interviews on Oracle SQL & PL/SQL.

---

## 1. Integrated Practical Lab Project

### Problem Statement

> Design a complete Oracle PL/SQL workflow that:
> 1. Tracks annual performance ratings (1 to 5) for all active employees.
> 2. Applies rating-based bonuses (Rating 5: 20%, Rating 4: 15%, Rating 3: 10%, Others: 5%).
> 3. Uses an explicit cursor to process employees department by department.
> 4. Audits all modifications automatically using a database trigger.
> 5. Handles all runtime exceptions gracefully without terminating the batch run.

### Complete Solution Script

```sql
SET SERVEROUTPUT ON;

-- 1. Create a performance appraisal table
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE emp_performance CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

CREATE TABLE emp_performance (
    emp_id     NUMBER(6) PRIMARY KEY,
    rating     NUMBER(1) CHECK (rating BETWEEN 1 AND 5),
    appraised_date DATE DEFAULT SYSDATE
);

-- 2. Populate sample appraisal ratings
INSERT INTO emp_performance VALUES (1001, 5, SYSDATE);
INSERT INTO emp_performance VALUES (1002, 5, SYSDATE);
INSERT INTO emp_performance VALUES (1003, 4, SYSDATE);
INSERT INTO emp_performance VALUES (1004, 3, SYSDATE);
INSERT INTO emp_performance VALUES (1005, 5, SYSDATE);
INSERT INTO emp_performance VALUES (1006, 4, SYSDATE);
INSERT INTO emp_performance VALUES (1007, 3, SYSDATE);
INSERT INTO emp_performance VALUES (1008, 2, SYSDATE);
INSERT INTO emp_performance VALUES (1009, 3, SYSDATE);
INSERT INTO emp_performance VALUES (1010, 4, SYSDATE);
COMMIT;

-- 3. The Batch Appraisal PL/SQL Block
DECLARE
    -- Parameterized Cursor to fetch employees by department
    CURSOR cur_dept_appraisals(p_dept NUMBER) IS
        SELECT e.emp_id, e.emp_name, e.salary, NVL(p.rating, 3) AS rating
        FROM employees e
        LEFT JOIN emp_performance p ON e.emp_id = p.emp_id
        WHERE e.dept_id = p_dept
        FOR UPDATE OF e.salary;

    v_hike_pct    NUMBER(4, 2);
    v_new_salary  employees.salary%TYPE;
    v_updated_cnt NUMBER := 0;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== COMMENCING ANNUAL PERFORMANCE APPRAISAL (DEPT 20) ===');

    FOR rec IN cur_dept_appraisals(20) LOOP
        -- Determine hike percentage based on rating
        CASE rec.rating
            WHEN 5 THEN v_hike_pct := 0.20;
            WHEN 4 THEN v_hike_pct := 0.15;
            WHEN 3 THEN v_hike_pct := 0.10;
            ELSE        v_hike_pct := 0.05;
        END CASE;

        v_new_salary := rec.salary + (rec.salary * v_hike_pct);

        -- Update row via WHERE CURRENT OF
        UPDATE employees
        SET salary = v_new_salary
        WHERE CURRENT OF cur_dept_appraisals;

        v_updated_cnt := v_updated_cnt + 1;

        DBMS_OUTPUT.PUT_LINE('Staff: ' || RPAD(rec.emp_name, 18) || 
                             ' | Rating: ' || rec.rating || 
                             ' | Old: ₹' || rec.salary || 
                             ' -> New: ₹' || v_new_salary);
    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Appraisal complete. Successfully updated ' || v_updated_cnt || ' employees.');

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Fatal error during appraisal: ' || SQLERRM);
END;
/
```

---

## 2. Top Oracle Runtime Error Codes & Troubleshooting

| Error Code | Error Message | Common Cause | Exact Solution |
| :--- | :--- | :--- | :--- |
| **`ORA-01403`** | `no data found` | A `SELECT ... INTO` returned 0 rows. | Wrap with `EXCEPTION WHEN NO_DATA_FOUND THEN ...`, or use an explicit cursor. |
| **`ORA-01422`** | `exact fetch returns more than requested number of rows` | A `SELECT ... INTO` returned $\ge 2$ rows. | Use an **Explicit Cursor** or `Cursor FOR loop` instead of single-row `SELECT INTO`. |
| **`ORA-06502`** | `PL/SQL: numeric or value error` | String too long for variable, or trying to assign text to `NUMBER`. | Verify variable precision (e.g. use `VARCHAR2(100)` or `%TYPE`). |
| **`ORA-04091`** | `table ... is mutating, trigger/function may not see it` | A row-level trigger (`FOR EACH ROW`) queried or updated the exact same table that triggered it. | Use a **Compound Trigger**, package state variables, or statement-level triggers. |
| **`ORA-00001`** | `unique constraint (...) violated` | Attempting to insert a duplicate primary or unique key value. | Verify sequence usage or write `MERGE` statements. |

---

## 3. Top 15 Viva Voce & Exam Questions

### Q1: What is the main difference between SQL and PL/SQL?
**Answer:** SQL is a declarative data manipulation query language with no procedural constructs. PL/SQL is Oracle's procedural language extension that integrates procedural logic (variables, loops, conditional branching, and error handling) with SQL queries.

### Q2: What is the purpose of `%TYPE` and `%ROWTYPE`?
**Answer:** `%TYPE` anchors a PL/SQL variable to the data type and precision of a database column. `%ROWTYPE` defines a composite record variable matching all columns of a table or view. Both provide automatic maintenance adaptability if underlying schema data types change.

### Q3: What is a Cursor? Name its types.
**Answer:** A cursor is a pointer to the Context Area (private SQL work area) allocated by Oracle for query processing. Types are:
1. **Implicit Cursors:** Managed automatically for single-row queries and DML commands.
2. **Explicit Cursors:** Declared and managed manually by developers for multi-row queries.

### Q4: List the four implicit cursor attributes.
**Answer:**
- `SQL%FOUND`: Returns `TRUE` if $\ge 1$ row was affected.
- `SQL%NOTFOUND`: Returns `TRUE` if 0 rows were affected.
- `SQL%ROWCOUNT`: Number of rows affected by the last SQL command.
- `SQL%ISOPEN`: Always `FALSE` for implicit cursors.

### Q5: What are the four lifecycle steps of an Explicit Cursor?
**Answer:** `DECLARE` $\rightarrow$ `OPEN` $\rightarrow$ `FETCH` $\rightarrow$ `CLOSE`.

### Q6: Why is a Cursor `FOR` Loop preferred over manual OPEN-FETCH-CLOSE?
**Answer:** A Cursor `FOR` loop automatically opens the cursor, declares a `%ROWTYPE` record, iterates until all rows are fetched, and guarantees the cursor is safely closed even if runtime exceptions occur.

### Q7: Explain the three parameter modes in PL/SQL.
**Answer:**
1. **`IN` (Default):** Read-only parameter passed into the subprogram.
2. **`OUT`:** Write-only parameter used to return values to the calling environment.
3. **`IN OUT`:** Read-write parameter passed in, modified, and returned.

### Q8: Differentiate between a Stored Procedure and a Stored Function.
**Answer:** A Procedure executes actions and returns zero or multiple values via `OUT` parameters, but cannot be called directly inside SQL queries. A Function must return exactly one value via `RETURN` and can be invoked directly inside SQL statements.

### Q9: What is a Database Trigger?
**Answer:** A trigger is a named PL/SQL block executed automatically by Oracle in response to specified database events (`INSERT`, `UPDATE`, `DELETE`, DDL, or system events). Triggers cannot be called explicitly and accept no parameters.

### Q10: What is the difference between a Statement-Level and a Row-Level trigger?
**Answer:** A statement-level trigger fires once per SQL command regardless of rows affected. A row-level trigger (`FOR EACH ROW`) fires once for every modified row and has access to `:NEW` and `:OLD` pseudo-records.

### Q11: In which DML operations is `:OLD` null, and in which is `:NEW` null?
**Answer:** During an `INSERT`, `:OLD` is null. During a `DELETE`, `:NEW` is null. Both contain values during an `UPDATE`.

### Q12: What causes the `ORA-04091: mutating table` error?
**Answer:** It occurs when a row-level trigger (`FOR EACH ROW`) on Table X attempts to query or modify Table X while that same table is in the middle of being changed by the triggering DML.

### Q13: What are the two parts of a PL/SQL Package?
**Answer:**
1. **Package Specification:** Public interface declaring available types, constants, cursors, and subprogram signatures.
2. **Package Body:** Private implementation containing subprogram code, private helpers, and optional initialization logic.

### Q14: What is Subprogram Overloading in Packages?
**Answer:** Defining multiple procedures or functions with the identical name within the same package, provided their formal parameter lists differ in parameter count, order, or data type family.

### Q15: What is the role of the Oracle `DUAL` table?
**Answer:** `DUAL` is a special single-row, single-column table used to select pseudo-columns (`ROWNUM`), sequences (`seq.NEXTVAL`), system values (`SYSDATE`), and evaluate expressions when no real user table is required.

---

## Unit 3 Revision Summary

```
+-------------------------------------------------------------------------+
|                  UNIT 3: ORACLE TOOLS AND UTILITIES                     |
+-------------------------------------------------------------------------+
| SQL           | DDL (auto-commit), DML, TCL, DCL, Joins, Subqueries     |
| PL/SQL Blocks | DECLARE -> BEGIN -> EXCEPTION -> END;                   |
| Anchoring     | %TYPE (single column) | %ROWTYPE (full row record)      |
| Cursors       | Implicit (SQL%ROWCOUNT) | Explicit (FOR rec IN cur LOOP)|
| Subprograms   | PROCEDURE (action, OUT params) | FUNCTION (RETURN value)|
| Triggers      | BEFORE/AFTER, FOR EACH ROW, :NEW & :OLD qualifiers      |
| Packages      | Specification (Public API) + Body (Private code)        |
+-------------------------------------------------------------------------+
```

Congratulations! You have completed all notes for **Unit 3: Oracle Tools and Utilities**. Review each section and run the code examples on your Oracle database instance.
