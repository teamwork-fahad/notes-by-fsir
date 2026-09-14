---
title: Introduction to SQLite
description: SQLite data types, transactions, filtering, joins, and triggers.
---
## 1.1 SQLite Fundamentals

SQLite is a lightweight, serverless, self-contained relational database. A database can be stored in one `.db` file, making it useful for learning, small applications, and local data analysis.

### SQLite type system

SQLite uses dynamic typing. A value has a storage class, while a column has type affinity that influences how inserted values are stored.

| Storage class | Use                      |
| ------------- | ------------------------ |
| `NULL`        | Missing or unknown value |
| `INTEGER`     | Whole numbers            |
| `REAL`        | Floating-point numbers   |
| `TEXT`        | Strings                  |
| `BLOB`        | Raw binary data          |

```sql
CREATE TABLE data_types (
  item_id INTEGER PRIMARY KEY,
  item_name TEXT,
  quantity INTEGER,
  price REAL,
  attachment BLOB,
  note TEXT
);
```

### Transactions

A transaction groups changes into one logical operation. `COMMIT` saves changes and `ROLLBACK` cancels uncommitted changes.

```sql
BEGIN TRANSACTION;
UPDATE products SET stock = stock - 1 WHERE product_id = 501;
COMMIT;

BEGIN TRANSACTION;
DELETE FROM products WHERE product_id = 508;
ROLLBACK;
```

## 1.2 Filtering and Conditional Logic

```sql
SELECT DISTINCT city FROM students;
SELECT * FROM products WHERE price BETWEEN 500 AND 3000;
SELECT * FROM students WHERE city IN ('Delhi', 'Pune');
SELECT * FROM customers WHERE customer_name LIKE 'A%';
SELECT * FROM library_loans WHERE return_date IS NULL;
SELECT * FROM products LIMIT 5;
```

Set operators combine compatible result sets:

```sql
SELECT city FROM students
UNION
SELECT city FROM customers;

SELECT city FROM students
INTERSECT
SELECT city FROM customers;

SELECT city FROM students
EXCEPT
SELECT city FROM customers;
```

Grouping, sorting, and `CASE`:

```sql
SELECT category, COUNT(*) AS product_count, AVG(price) AS average_price
FROM products
GROUP BY category
HAVING AVG(price) > 1000
ORDER BY average_price DESC;

SELECT product_name, stock,
  CASE
    WHEN stock = 0 THEN 'Out of stock'
    WHEN stock < 20 THEN 'Low stock'
    ELSE 'Available'
  END AS stock_status
FROM products;
```

## 1.3 Joins

```sql
SELECT e.employee_name, d.department_name
FROM employees AS e
INNER JOIN departments AS d ON d.department_id = e.department_id;

SELECT d.department_name, e.employee_name
FROM departments AS d
LEFT JOIN employees AS e ON e.department_id = d.department_id;

SELECT s.student_name, c.course_name
FROM students AS s
CROSS JOIN courses AS c
LIMIT 10;
```

A self join connects a table to itself. This example displays each employee and their manager:

```sql
SELECT employee.employee_name, manager.employee_name AS manager_name
FROM employees AS employee
LEFT JOIN employees AS manager ON manager.employee_id = employee.manager_id;
```

SQLite supports `FULL OUTER JOIN` in current versions. On older SQLite versions, combine a left join and a reverse left join with `UNION`.

## 1.4 Triggers

A trigger runs automatically before or after an insert, update, or delete.

```sql
CREATE TABLE stock_log (
  log_id INTEGER PRIMARY KEY,
  product_id INTEGER,
  old_stock INTEGER,
  new_stock INTEGER,
  changed_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER log_stock_update
AFTER UPDATE OF stock ON products
WHEN OLD.stock <> NEW.stock
BEGIN
  INSERT INTO stock_log(product_id, old_stock, new_stock)
  VALUES (OLD.product_id, OLD.stock, NEW.stock);
END;

UPDATE products SET stock = stock - 1 WHERE product_id = 501;
SELECT * FROM stock_log;
DROP TRIGGER log_stock_update;
```

SQLite has no general `DISABLE TRIGGER` statement. To disable a trigger, drop it and recreate it later, or add a control flag table and check that flag in the trigger's `WHEN` clause.

### Practice

1. Find products with a price above the category average.
2. Use `LEFT JOIN` to show every department, including empty departments.
3. Create an `AFTER INSERT` trigger that records new customers.
4. Use a transaction to update two products and roll back the changes.
