---
title: "3.2.4 Database Triggers in Oracle"
description: "Master Oracle database triggers: BEFORE vs AFTER, row vs statement level, :NEW and :OLD qualifiers, conditional predicates, and automated audit logging."
subject: "plsql"
chapter: "Unit 3: Oracle Tools and Utilities"
author: "Fahad Sir"
order: 6
published: true
---

# 3.2.4 Database Triggers in Oracle

A **database trigger** is a specialized, event-driven PL/SQL block that Oracle executes (or "fires") automatically whenever a specific database event occurs—such as a DML statement (`INSERT`, `UPDATE`, `DELETE`), DDL operation (`CREATE`, `ALTER`), or database event (`LOGON`, `SHUTDOWN`).

Unlike procedures and functions, triggers **cannot be called explicitly** by a user or application, and they accept **no arguments**.

---

## 1. Trigger Types and Classifications

Oracle triggers are classified according to three dimensions:

```
                      +-----------------------------+
                      |       TRIGGER TIMING        |
                      | BEFORE | AFTER | INSTEAD OF |
                      +-----------------------------+
                                     |
                      +-----------------------------+
                      |       TRIGGER LEVEL         |
                      |  Statement-Level (Default)  |
                      |  Row-Level (FOR EACH ROW)   |
                      +-----------------------------+
                                     |
                      +-----------------------------+
                      |       TRIGGER EVENT         |
                      |   INSERT | UPDATE | DELETE  |
                      +-----------------------------+
```

### 1.1 Trigger Timing

- **`BEFORE`:** Executes before the triggering event is applied to the table. Ideal for validating business constraints, auto-generating primary keys, or normalizing inputs.
- **`AFTER`:** Executes after the triggering event completes. Ideal for audit logging, synchronizing replica tables, or sending notifications.
- **`INSTEAD OF`:** Intercepts DML issued against complex or multi-table views, translating operations into underlying table changes.

### 1.2 Statement-Level vs Row-Level Triggers

| Feature | Statement-Level Trigger | Row-Level Trigger (`FOR EACH ROW`) |
| :--- | :--- | :--- |
| **Execution Frequency** | Fires **once** per SQL command, even if 0 or 1,000 rows are modified | Fires **once for every individual row** affected |
| **Declaration Clause** | Default (omits `FOR EACH ROW`) | Contains `FOR EACH ROW` |
| **`:NEW` & `:OLD` Access** | **Not available** | **Available** to inspect row values |
| **Primary Use Case** | Enforcing time-of-day restrictions, statement logging | Data validation, change auditing, column default setting |

---

## 2. The `:NEW` and `:OLD` Pseudo-Records

In a row-level trigger (`FOR EACH ROW`), Oracle provides two pseudo-records to inspect and modify data:

| DML Operation | `:OLD.column` | `:NEW.column` |
| :--- | :--- | :--- |
| **`INSERT`** | Undefined (`NULL`) | Contains the newly inserted value |
| **`UPDATE`** | Contains value before update | Contains proposed new value |
| **`DELETE`** | Contains value before deletion | Undefined (`NULL`) |

> **Note on Syntax:** In the PL/SQL body, prefix with a colon (`:NEW.salary`, `:OLD.salary`). In the trigger's `WHEN` condition clause, omit the colon (`WHEN (NEW.salary > 100000)`).

---

## 3. Conditional Predicates

When a trigger listens to multiple events (`INSERT OR UPDATE OR DELETE`), you can use Oracle's built-in boolean predicates:
- `INSERTING`
- `UPDATING` or `UPDATING('column_name')`
- `DELETING`

---

## 4. Trigger Syntax

```sql
CREATE OR REPLACE TRIGGER trigger_name
    {BEFORE | AFTER | INSTEAD OF}
    {INSERT | UPDATE [OF column_list] | DELETE} ON table_or_view_name
    [FOR EACH ROW]
    [WHEN (condition)]
DECLARE
    -- Local variables
BEGIN
    -- Executable logic
END trigger_name;
/
```

---

## 5. Practical Example 1: Automated Audit Trail Logging

Whenever an employee's salary is modified or an employee is deleted, log the action into `emp_audit`:

```sql
CREATE OR REPLACE TRIGGER trg_emp_salary_audit
    AFTER UPDATE OF salary OR DELETE ON employees
    FOR EACH ROW
BEGIN
    IF UPDATING THEN
        INSERT INTO emp_audit (
            audit_id, emp_id, action_type, old_salary, new_salary, changed_by, changed_at
        ) VALUES (
            audit_seq.NEXTVAL,
            :OLD.emp_id,
            'SALARY_UPDATE',
            :OLD.salary,
            :NEW.salary,
            USER,
            SYSDATE
        );
    ELSIF DELETING THEN
        INSERT INTO emp_audit (
            audit_id, emp_id, action_type, old_salary, new_salary, changed_by, changed_at
        ) VALUES (
            audit_seq.NEXTVAL,
            :OLD.emp_id,
            'RECORD_DELETED',
            :OLD.salary,
            NULL,
            USER,
            SYSDATE
        );
    END IF;
END trg_emp_salary_audit;
/
```

### Testing the Audit Trigger

```sql
-- Update Priya's salary
UPDATE employees SET salary = 105000 WHERE emp_id = 1002;
COMMIT;

-- Inspect the audit log table
SELECT audit_id, emp_id, action_type, old_salary, new_salary, changed_by, TO_CHAR(changed_at, 'HH24:MI:SS') AS log_time
FROM emp_audit;
```

---

## 6. Practical Example 2: Business Rule Validation Trigger

Enforce two enterprise policies:
1. An employee's salary can never be reduced.
2. Modifications to employee data cannot occur on Sundays.

```sql
CREATE OR REPLACE TRIGGER trg_validate_employee_rules
    BEFORE INSERT OR UPDATE ON employees
    FOR EACH ROW
BEGIN
    -- Policy 1: Restrict changes on Sundays
    IF TO_CHAR(SYSDATE, 'DY', 'NLS_DATE_LANGUAGE=ENGLISH') = 'SUN' THEN
        RAISE_APPLICATION_ERROR(-20002, 'Security Policy: Employee table changes are prohibited on Sundays.');
    END IF;

    -- Policy 2: Salary cannot be decreased
    IF UPDATING('salary') AND :NEW.salary < :OLD.salary THEN
        RAISE_APPLICATION_ERROR(-20003, 
            'Policy Violation: Salary reduction from ₹' || :OLD.salary || ' to ₹' || :NEW.salary || ' is disallowed.');
    END IF;
END trg_validate_employee_rules;
/
```

### Testing the Validation Trigger

```sql
-- Attempt to illegally reduce salary
UPDATE employees SET salary = 40000 WHERE emp_id = 1004;

-- Oracle immediately aborts with custom exception:
-- ORA-20003: Policy Violation: Salary reduction from ₹56000 to ₹40000 is disallowed.
```

---

## 7. Practical Example 3: Statement-Level Security Trigger

Statement-level triggers fire once per SQL statement, making them ideal for table-wide security locks:

```sql
CREATE OR REPLACE TRIGGER trg_enforce_business_hours
    BEFORE INSERT OR UPDATE OR DELETE ON employees
BEGIN
    -- Block modifications outside 09:00 AM - 06:00 PM
    IF TO_NUMBER(TO_CHAR(SYSDATE, 'HH24')) NOT BETWEEN 9 AND 18 THEN
        RAISE_APPLICATION_ERROR(-20005, 'DML operations on EMPLOYEES are only allowed between 09:00 AM and 06:00 PM.');
    END IF;
END trg_enforce_business_hours;
/
```

---

## 8. Understanding the Mutating Table Error (`ORA-04091`)

A **mutating table** is a table that is currently being modified by an ongoing DML statement.

> **The Rule:** A row-level trigger (`FOR EACH ROW`) defined on Table A **cannot query or modify Table A** while that same DML statement is executing.

```sql
-- INCORRECT: Causes ORA-04091 Mutating Error
CREATE OR REPLACE TRIGGER trg_bad_check
    BEFORE INSERT OR UPDATE ON employees
    FOR EACH ROW
DECLARE
    v_avg NUMBER;
BEGIN
    -- FAILS! The employees table is currently mutating!
    SELECT AVG(salary) INTO v_avg FROM employees;
END;
/
```

**How to avoid mutating table errors:**
1. Use a **Compound Trigger** (introduced in Oracle 11g), which provides distinct timing sections (`BEFORE STATEMENT`, `BEFORE EACH ROW`, `AFTER EACH ROW`, `AFTER STATEMENT`) that share state in memory.
2. Query separate summary or parent tables instead of the mutating table.

---

## 9. Managing Triggers

```sql
-- Temporarily disable a trigger during batch maintenance
ALTER TRIGGER trg_emp_salary_audit DISABLE;

-- Re-enable the trigger
ALTER TRIGGER trg_emp_salary_audit ENABLE;

-- Disable all triggers on a table
ALTER TABLE employees DISABLE ALL TRIGGERS;

-- Permanently drop a trigger
DROP TRIGGER trg_emp_salary_audit;

-- Inspect triggers in dictionary
SELECT trigger_name, trigger_type, triggering_event, status 
FROM user_triggers 
WHERE table_name = 'EMPLOYEES';
```

Next, bring all procedural elements together in **[3.2.5 Package Creation in Oracle PL/SQL](/plsql/unit-3/package-creation/)**!
