---
title: "3.2.5 Package Creation in Oracle PL/SQL"
description: "Master Oracle PL/SQL packages: package specification vs package body, public and private encapsulation, subprogram overloading, and real-world HR management packages."
subject: "plsql"
chapter: "Unit 3: Oracle Tools and Utilities"
author: "Fahad Sir"
order: 7
published: true
---

# 3.2.5 Package Creation in Oracle PL/SQL

A **package** is an encapsulated database schema object that groups logically related PL/SQL types, variables, constants, cursors, exceptions, procedures, and functions into a single modular unit.

Packages represent the highest level of modular software design in Oracle database development, similar to classes in Object-Oriented Programming (Java/C++).

---

## 1. Architecture of a PL/SQL Package

Every package is divided into two distinct components that are compiled and stored separately in the database:

```
+-------------------------------------------------------------+
|               1. PACKAGE SPECIFICATION (HEADER)             |
|   - Public API declaration                                  |
|   - Variables, constants, types, exceptions                 |
|   - Procedure & function signatures (visible to everyone)   |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|               2. PACKAGE BODY (IMPLEMENTATION)              |
|   - Implements every subprogram in the specification        |
|   - Private variables, cursors, and helper functions        |
|   - Hidden from external callers (Encapsulation)            |
|   - Optional one-time initialization block                  |
+-------------------------------------------------------------+
```

---

## 2. Key Advantages of Packages

| Advantage | Explanation |
| :--- | :--- |
| **Modularity & Organization** | Related business subprograms are organized under a single namespace (e.g., `payroll_pkg`). |
| **Information Hiding (Security)** | Only items declared in the **specification** are public. Complex helper logic in the **body** remains completely hidden. |
| **Performance (SGA Caching)** | When an application invokes any subprogram in a package for the first time, Oracle loads the **entire package** into Shared Memory (SGA). Subsequent calls execute in-memory with zero disk I/O. |
| **Overloading** | Allows multiple procedures or functions to share the exact same name, as long as their parameter signatures differ. |
| **Session State Persistence** | Package variables retain their values across multiple calls within the same database user session. |

---

## 3. Subprogram Overloading

**Overloading** allows you to declare multiple procedures or functions with the **same name** inside the same package, provided their formal parameters differ in **number**, **order**, or **data type family**.

```sql
-- VALID OVERLOADING in a Package Specification:
PROCEDURE update_salary (p_emp_id IN NUMBER, p_new_sal IN NUMBER);
PROCEDURE update_salary (p_dept_id IN NUMBER, p_percent_hike IN NUMBER);
```

> **Rules for Overloading:**
> - You **cannot** overload subprograms if their parameters differ only in **parameter mode** (`IN` vs `OUT`).
> - You **cannot** overload functions that differ only in their **return data type**.

---

## 4. Building an Enterprise Package: `pkg_emp_mgmt`

Let's build a complete, real-world Human Resources and Employee Management package using our dummy database.

### Step 4.1: The Package Specification (Public API)

```sql
CREATE OR REPLACE PACKAGE pkg_emp_mgmt IS
    -- Public constants
    c_company_name CONSTANT VARCHAR2(50) := 'Apex Technologies India';
    c_max_hike_pct CONSTANT NUMBER        := 30;

    -- Custom public exception
    e_invalid_salary EXCEPTION;

    -- Public Procedure 1: Hire a new employee
    PROCEDURE hire_employee (
        p_name      IN employees.emp_name%TYPE,
        p_job       IN employees.job_title%TYPE,
        p_salary    IN employees.salary%TYPE,
        p_dept_id   IN employees.dept_id%TYPE,
        p_comm      IN employees.commission_pct%TYPE DEFAULT 0,
        p_new_id    OUT employees.emp_id%TYPE
    );

    -- Overloaded Procedure 2A: Update salary by individual Employee ID
    PROCEDURE update_salary (
        p_emp_id     IN employees.emp_id%TYPE,
        p_new_salary IN employees.salary%TYPE
    );

    -- Overloaded Procedure 2B: Update salary across an entire Department by percentage
    PROCEDURE update_salary (
        p_dept_id      IN departments.dept_id%TYPE,
        p_percentage   IN NUMBER
    );

    -- Public Function: Calculate Net Annual Compensation
    FUNCTION get_net_annual_package (
        p_emp_id IN employees.emp_id%TYPE
    ) RETURN NUMBER;

    -- Public Procedure 3: Print Department Roster
    PROCEDURE print_dept_roster (
        p_dept_id IN departments.dept_id%TYPE
    );

END pkg_emp_mgmt;
/
```

---

### Step 4.2: The Package Body (Implementation & Private Logic)

```sql
CREATE OR REPLACE PACKAGE BODY pkg_emp_mgmt IS

    -- PRIVATE CONSTANT (Only visible inside this body)
    c_minimum_salary CONSTANT NUMBER := 25000;

    -- PRIVATE HELPER FUNCTION: Not declared in specification
    FUNCTION validate_salary_tier (p_sal NUMBER) RETURN BOOLEAN IS
    BEGIN
        RETURN (p_sal >= c_minimum_salary);
    END validate_salary_tier;

    -- 1. IMPLEMENTATION: hire_employee
    PROCEDURE hire_employee (
        p_name      IN employees.emp_name%TYPE,
        p_job       IN employees.job_title%TYPE,
        p_salary    IN employees.salary%TYPE,
        p_dept_id   IN employees.dept_id%TYPE,
        p_comm      IN employees.commission_pct%TYPE DEFAULT 0,
        p_new_id    OUT employees.emp_id%TYPE
    ) IS
    BEGIN
        -- Enforce private business validation
        IF NOT validate_salary_tier(p_salary) THEN
            RAISE e_invalid_salary;
        END IF;

        p_new_id := emp_seq.NEXTVAL;

        INSERT INTO employees (emp_id, emp_name, job_title, salary, commission_pct, dept_id, hire_date)
        VALUES (p_new_id, p_name, p_job, p_salary, p_comm, p_dept_id, SYSDATE);

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Successfully onboarded: ' || p_name || ' with ID [' || p_new_id || ']');
    EXCEPTION
        WHEN e_invalid_salary THEN
            RAISE_APPLICATION_ERROR(-20010, 'Hiring rejected: Starting salary cannot be less than ₹' || c_minimum_salary);
    END hire_employee;

    -- 2A. IMPLEMENTATION: update_salary (By Employee ID)
    PROCEDURE update_salary (
        p_emp_id     IN employees.emp_id%TYPE,
        p_new_salary IN employees.salary%TYPE
    ) IS
    BEGIN
        IF NOT validate_salary_tier(p_new_salary) THEN
            RAISE e_invalid_salary;
        END IF;

        UPDATE employees
        SET salary = p_new_salary
        WHERE emp_id = p_emp_id;

        IF SQL%FOUND THEN
            COMMIT;
            DBMS_OUTPUT.PUT_LINE('Updated Employee [' || p_emp_id || '] to ₹' || p_new_salary);
        ELSE
            DBMS_OUTPUT.PUT_LINE('Employee ID [' || p_emp_id || '] not found.');
        END IF;
    END update_salary;

    -- 2B. IMPLEMENTATION: update_salary (By Department Percentage)
    PROCEDURE update_salary (
        p_dept_id    IN departments.dept_id%TYPE,
        p_percentage IN NUMBER
    ) IS
    BEGIN
        IF p_percentage > c_max_hike_pct THEN
            RAISE_APPLICATION_ERROR(-20011, 'Bulk department hike exceeds policy limit of ' || c_max_hike_pct || '%');
        END IF;

        UPDATE employees
        SET salary = salary + (salary * (p_percentage / 100))
        WHERE dept_id = p_dept_id;

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Dept [' || p_dept_id || ']: ' || SQL%ROWCOUNT || ' employees received ' || p_percentage || '% hike.');
    END update_salary;

    -- 3. IMPLEMENTATION: get_net_annual_package
    FUNCTION get_net_annual_package (
        p_emp_id IN employees.emp_id%TYPE
    ) RETURN NUMBER IS
        v_sal  employees.salary%TYPE;
        v_comm employees.commission_pct%TYPE;
    BEGIN
        SELECT salary, NVL(commission_pct, 0)
        INTO v_sal, v_comm
        FROM employees
        WHERE emp_id = p_emp_id;

        RETURN (v_sal * 12) + ((v_sal * v_comm) * 12);
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 0;
    END get_net_annual_package;

    -- 4. IMPLEMENTATION: print_dept_roster
    PROCEDURE print_dept_roster (
        p_dept_id IN departments.dept_id%TYPE
    ) IS
        CURSOR cur_staff IS
            SELECT emp_id, emp_name, job_title, salary
            FROM employees
            WHERE dept_id = p_dept_id
            ORDER BY salary DESC;
    BEGIN
        DBMS_OUTPUT.PUT_LINE('--- DEPARTMENT ' || p_dept_id || ' ROSTER (' || c_company_name || ') ---');
        FOR emp IN cur_staff LOOP
            DBMS_OUTPUT.PUT_LINE('[' || emp.emp_id || '] ' || RPAD(emp.emp_name, 20) || ' | ' ||
                                 RPAD(emp.job_title, 18) || ' | ₹' || emp.salary);
        END LOOP;
    END print_dept_roster;

-- OPTIONAL INITIALIZATION BLOCK:
-- Executes only ONCE when the package is first invoked during a database session
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- [' || c_company_name || '] Package Loaded into SGA ---');
END pkg_emp_mgmt;
/
```

---

## 5. Testing and Executing the Package

Call package subprograms using the dot notation (`package_name.subprogram_name`):

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_new_id employees.emp_id%TYPE;
    v_package NUMBER;
BEGIN
    -- 1. Access public package constant
    DBMS_OUTPUT.PUT_LINE('Provider: ' || pkg_emp_mgmt.c_company_name);

    -- 2. Hire an employee
    pkg_emp_mgmt.hire_employee(
        p_name   => 'Karan Oberoi',
        p_job    => 'Data Scientist',
        p_salary => 75000,
        p_dept_id=> 30,
        p_comm   => 0.05,
        p_new_id => v_new_id
    );

    -- 3. Calculate compensation using package function
    v_package := pkg_emp_mgmt.get_net_annual_package(v_new_id);
    DBMS_OUTPUT.PUT_LINE('Annual CTC for ID [' || v_new_id || ']: ₹' || v_package);

    -- 4. Test overloaded department update
    pkg_emp_mgmt.update_salary(p_dept_id => 30, p_percentage => 8);

    -- 5. Print updated roster
    pkg_emp_mgmt.print_dept_roster(30);
END;
/
```

---

## 6. Dropping and Inspecting Packages

```sql
-- Drop only the implementation body (leaves specification intact)
DROP PACKAGE BODY pkg_emp_mgmt;

-- Drop both specification and body
DROP PACKAGE pkg_emp_mgmt;

-- View user packages in catalog
SELECT object_name, object_type, status 
FROM user_objects 
WHERE object_name = 'PKG_EMP_MGMT';
```

Next, practice with comprehensive hands-on problems and viva questions in **[Unit 3 Practical Lab & Viva Questions](/plsql/unit-3/practical-lab-and-faq/)**!
