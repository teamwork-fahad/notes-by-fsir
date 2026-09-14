---
title: 'SQL Tasks - Exercise II'
description: 'Complete reference tables, DDL/DML scripts, and step-by-step SQL query solutions for Scott/Tiger classic database tasks.'
---

# SQL Tasks - Exercise II

**Prepared by:** Ravi M. Gulati

Use the classic sales and employee database tables below to solve the SQL query tasks.

---

## 🛠️ Complete Database Setup (CREATE TABLE & INSERT INTO)

<details>
<summary><b>Click to Expand Database Creation & Data Insertion Script</b></summary>

```sql
-- 1. Create DEPT table
CREATE TABLE DEPT (
    DEPTNO INT PRIMARY KEY,
    DNAME VARCHAR(14),
    LOC VARCHAR(13)
);

-- Insert DEPT data
INSERT INTO DEPT VALUES (10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO DEPT VALUES (20, 'RESEARCH', 'DALLAS');
INSERT INTO DEPT VALUES (30, 'SALES', 'CHICAGO');
INSERT INTO DEPT VALUES (40, 'OPERATIONS', 'BOSTON');

-- 2. Create EMP table
CREATE TABLE EMP (
    EMPNO INT PRIMARY KEY,
    ENAME VARCHAR(10),
    JOB VARCHAR(9),
    MGR INT,
    HIREDATE DATE,
    SAL DECIMAL(7,2),
    COMM DECIMAL(7,2),
    DEPTNO INT,
    FOREIGN KEY (MGR) REFERENCES EMP(EMPNO),
    FOREIGN KEY (DEPTNO) REFERENCES DEPT(DEPTNO)
);

-- Insert EMP data
INSERT INTO EMP VALUES (7839, 'KING', 'PRESIDENT', NULL, '1981-11-17', 5000.00, NULL, 10);
INSERT INTO EMP VALUES (7698, 'BLAKE', 'MANAGER', 7839, '1981-05-01', 2850.00, NULL, 30);
INSERT INTO EMP VALUES (7782, 'CLARK', 'MANAGER', 7839, '1981-06-09', 2450.00, NULL, 10);
INSERT INTO EMP VALUES (7566, 'JONES', 'MANAGER', 7839, '1981-04-02', 2975.00, NULL, 20);
INSERT INTO EMP VALUES (7654, 'MARTIN', 'SALESMAN', 7698, '1981-09-28', 1250.00, 1400.00, 30);
INSERT INTO EMP VALUES (7499, 'ALLEN', 'SALESMAN', 7698, '1981-02-20', 1600.00, 300.00, 30);
INSERT INTO EMP VALUES (7844, 'TURNER', 'SALESMAN', 7698, '1981-09-08', 1500.00, 0.00, 30);
INSERT INTO EMP VALUES (7900, 'JAMES', 'CLERK', 7698, '1981-12-03', 950.00, NULL, 30);
INSERT INTO EMP VALUES (7521, 'WARD', 'SALESMAN', 7698, '1981-02-22', 1250.00, 500.00, 30);
INSERT INTO EMP VALUES (7902, 'FORD', 'ANALYST', 7566, '1981-12-03', 3000.00, NULL, 20);
INSERT INTO EMP VALUES (7369, 'SMITH', 'CLERK', 7902, '1980-12-17', 800.00, NULL, 20);
INSERT INTO EMP VALUES (7788, 'SCOTT', 'ANALYST', 7566, '1982-12-09', 3000.00, NULL, 20);
INSERT INTO EMP VALUES (7876, 'ADAMS', 'CLERK', 7788, '1983-01-12', 1100.00, NULL, 20);
INSERT INTO EMP VALUES (7934, 'MILLER', 'CLERK', 7782, '1982-01-23', 1300.00, NULL, 10);

-- 3. Create CUSTOMER table
CREATE TABLE CUSTOMER (
    CUSTID INT PRIMARY KEY,
    NAME VARCHAR(45),
    ADDRESS VARCHAR(40),
    CITY VARCHAR(30),
    STATE VARCHAR(2),
    ZIP VARCHAR(9),
    AREA INT,
    PHONE VARCHAR(9),
    REPID INT,
    CREDITLIMIT DECIMAL(9,2),
    COMMENTS TEXT,
    FOREIGN KEY (REPID) REFERENCES EMP(EMPNO)
);

-- Insert CUSTOMER data
INSERT INTO CUSTOMER VALUES (100, 'Jocksports', '345 Viewridge', 'Belmont', 'CA', '96711', 415, '598-6609', 7844, 5000.00, 'Very friendly people to work with');
INSERT INTO CUSTOMER VALUES (101, 'Tkb Sport Shop', '490 Boli Rd.', 'Redwood City', 'CA', '94061', 415, '368-1223', 7521, 10000.00, 'Rep called 5/8 about change in order');
INSERT INTO CUSTOMER VALUES (102, 'Vollyrite', '9722 Hamilton', 'Burlingame', 'CA', '95133', 415, '344-3341', 7654, 7000.00, 'Company doing heavy promotion');
INSERT INTO CUSTOMER VALUES (103, 'Just Tennis', 'Hillview Mall', 'Burlingame', 'CA', '97544', 415, '677-9312', 7521, 3000.00, 'Contact rep about new line');
INSERT INTO CUSTOMER VALUES (104, 'Every Mountain', '574 Surry Rd.', 'Cupertino', 'CA', '93301', 408, '996-2323', 7499, 10000.00, 'Customer with high market share');
INSERT INTO CUSTOMER VALUES (105, 'K + T Sports', '3476 El Paseo', 'Santa Clara', 'CA', '91003', 408, '376-9966', 7844, 5000.00, 'Tends to order large amount');
INSERT INTO CUSTOMER VALUES (106, 'Shape Up', '908 Sequoia', 'Palo Alto', 'CA', '94301', 415, '364-9777', 7521, 6000.00, 'Support intensive');
INSERT INTO CUSTOMER VALUES (107, 'Womens Sports', 'Valco Village', 'Sunnyvale', 'CA', '93301', 408, '967-4398', 7499, 10000.00, 'First sporting goods store');
INSERT INTO CUSTOMER VALUES (108, 'North Woods Health And Fitness Supply Center', '98 Lone Pine Way', 'Hibbing', 'MN', '55649', 612, '566-9123', 7844, 8000.00, NULL);

-- 4. Create ORD table
CREATE TABLE ORD (
    ORDID INT PRIMARY KEY,
    ORDERDATE DATE,
    COMMPLAN VARCHAR(1),
    CUSTID INT,
    SHIPDATE DATE,
    TOTAL DECIMAL(8,2),
    FOREIGN KEY (CUSTID) REFERENCES CUSTOMER(CUSTID)
);

-- Insert ORD data
INSERT INTO ORD VALUES (610, '1987-01-07', 'A', 101, '1987-01-08', 101.40);
INSERT INTO ORD VALUES (611, '1987-01-11', 'B', 102, '1987-01-11', 45.00);
INSERT INTO ORD VALUES (612, '1987-01-15', 'C', 104, '1987-01-20', 5860.00);
INSERT INTO ORD VALUES (601, '1986-05-01', 'A', 106, '1986-05-30', 2.40);
INSERT INTO ORD VALUES (602, '1986-06-05', 'B', 102, '1986-06-20', 56.00);
INSERT INTO ORD VALUES (604, '1986-06-15', 'A', 106, '1986-06-30', 698.00);
INSERT INTO ORD VALUES (605, '1986-07-14', 'A', 106, '1986-07-30', 8324.00);
INSERT INTO ORD VALUES (606, '1986-07-14', 'A', 100, '1986-07-30', 3.40);
INSERT INTO ORD VALUES (609, '1986-08-01', 'B', 100, '1986-08-15', 97.50);
INSERT INTO ORD VALUES (607, '1986-07-18', 'C', 104, '1986-07-18', 5.60);
INSERT INTO ORD VALUES (608, '1986-07-25', 'C', 104, '1986-07-25', 35.20);
INSERT INTO ORD VALUES (603, '1986-06-05', NULL, 102, '1986-06-05', 224.00);
INSERT INTO ORD VALUES (620, '1987-03-12', NULL, 100, '1987-03-12', 4450.00);
INSERT INTO ORD VALUES (613, '1987-02-01', NULL, 108, '1987-02-01', 6400.00);
INSERT INTO ORD VALUES (614, '1987-02-01', NULL, 102, '1987-02-05', 23940.00);
INSERT INTO ORD VALUES (616, '1987-02-03', NULL, 103, '1987-02-10', 764.00);
INSERT INTO ORD VALUES (619, '1987-02-22', NULL, 104, '1987-02-04', 1260.00);
INSERT INTO ORD VALUES (617, '1987-02-05', NULL, 105, '1987-03-03', 46370.00);
INSERT INTO ORD VALUES (615, '1987-02-01', NULL, 107, '1987-02-06', 710.00);
INSERT INTO ORD VALUES (618, '1987-02-15', 'A', 102, '1987-03-06', 3510.50);
INSERT INTO ORD VALUES (621, '1987-03-15', 'A', 100, '1987-01-01', 730.00);

-- 5. Create PRODUCT table
CREATE TABLE PRODUCT (
    PRODID INT PRIMARY KEY,
    DESCRIP VARCHAR(50)
);

INSERT INTO PRODUCT VALUES (100860, 'ACE TENNIS RACKET I');
INSERT INTO PRODUCT VALUES (100861, 'ACE TENNIS RACKET II');
INSERT INTO PRODUCT VALUES (100870, 'ACE TENNIS BALLS 3-PACK');
INSERT INTO PRODUCT VALUES (100890, 'ACE TENNIS NET');

-- 6. Create ITEM table
CREATE TABLE ITEM (
    ORDID INT,
    ITEMID INT,
    PRODID INT,
    ACTUALPRICE DECIMAL(8,2),
    QTY INT,
    ITEMTOT DECIMAL(8,2),
    PRIMARY KEY (ORDID, ITEMID),
    FOREIGN KEY (ORDID) REFERENCES ORD(ORDID),
    FOREIGN KEY (PRODID) REFERENCES PRODUCT(PRODID)
);

INSERT INTO ITEM VALUES (610, 1, 100860, 35.00, 1, 35.00);
INSERT INTO ITEM VALUES (610, 2, 100870, 2.80, 5, 14.00);
INSERT INTO ITEM VALUES (611, 1, 100861, 45.00, 1, 45.00);
INSERT INTO ITEM VALUES (612, 1, 100860, 35.00, 100, 3500.00);
```

</details>

---

## 📋 Reference Tables & Specifications

### 1. DEPT: Department Table  *(PRIMARY KEY: DEPTNO)*

**Column Specifications:**
- `DEPTNO` : Department Number (Primary Key) — `NUMBER(2)`
- `DNAME` : Department Name — `CHAR(14)`
- `LOC` : Location of the Department — `CHAR(13)`

**Sample Data:**

| DEPTNO | DNAME | LOC |
| :--- | :--- | :--- |
| **10** | ACCOUNTING | NEW YORK |
| **20** | RESEARCH | DALLAS |
| **30** | SALES | CHICAGO |
| **40** | OPERATIONS | BOSTON |

---

### 2. EMP: Employee Table *(PRIMARY KEY: EMPNO)*

**Column Specifications:**
- `EMPNO` : Employee Number (Primary Key) — `NUMBER(4)`
- `ENAME` : Employee Name — `VARCHAR2(10)`
- `JOB` : Designation of the Employee — `CHAR(9)`
- `MGR` : Number of Employee's Manager (Foreign Key -> `EMP(EMPNO)`) — `NUMBER(4)`
- `HIREDATE` : Date of Joining — `DATE`
- `SAL` : Salary — `NUMBER(7,2)`
- `COMM` : Commission — `NUMBER(7,2)`
- `DEPTNO` : Department Number (Foreign Key -> `DEPT(DEPTNO)`) — `NUMBER(2)`

**Sample Data:**

| EMPNO | ENAME | JOB | MGR | HIREDATE | SAL | COMM | DEPTNO |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **7839** | KING | PRESIDENT | *NULL* | 17-NOV-1981 | 5000.00 | *NULL* | 10 |
| **7698** | BLAKE | MANAGER | 7839 | 01-MAY-1981 | 2850.00 | *NULL* | 30 |
| **7782** | CLARK | MANAGER | 7839 | 09-JUN-1981 | 2450.00 | *NULL* | 10 |
| **7566** | JONES | MANAGER | 7839 | 02-APR-1981 | 2975.00 | *NULL* | 20 |
| **7654** | MARTIN | SALESMAN | 7698 | 28-SEP-1981 | 1250.00 | 1400.00 | 30 |
| **7499** | ALLEN | SALESMAN | 7698 | 20-FEB-1981 | 1600.00 | 300.00 | 30 |
| **7844** | TURNER | SALESMAN | 7698 | 08-SEP-1981 | 1500.00 | 0.00 | 30 |
| **7900** | JAMES | CLERK | 7698 | 03-DEC-1981 | 950.00 | *NULL* | 30 |
| **7521** | WARD | SALESMAN | 7698 | 22-FEB-1981 | 1250.00 | 500.00 | 30 |
| **7902** | FORD | ANALYST | 7566 | 03-DEC-1981 | 3000.00 | *NULL* | 20 |
| **7369** | SMITH | CLERK | 7902 | 17-DEC-1980 | 800.00 | *NULL* | 20 |
| **7788** | SCOTT | ANALYST | 7566 | 09-DEC-1982 | 3000.00 | *NULL* | 20 |
| **7876** | ADAMS | CLERK | 7788 | 12-JAN-1983 | 1100.00 | *NULL* | 20 |
| **7934** | MILLER | CLERK | 7782 | 23-JAN-1982 | 1300.00 | *NULL* | 10 |

---

### 3. CUSTOMER: Customer Table *(PRIMARY KEY: CUSTID)*

**Column Specifications:**
- `CUSTID` : Customer Identification Number (Primary Key) — `NUMBER(6)`
- `NAME` : Customer Name — `VARCHAR2(45)`
- `ADDRESS` : Address of the Customer — `CHAR(40)`
- `CITY` : City of the Customer — `CHAR(30)`
- `STATE` : State — `CHAR(2)`
- `ZIP` : Zip Code — `CHAR(9)`
- `AREA` : Area Code — `NUMBER(3)`
- `PHONE` : Phone Number — `CHAR(9)`
- `REPID` : Representative Identification Number (Foreign Key -> `EMP(EMPNO)`) — `NUMBER(4)`
- `CREDITLIMIT` : Credit Limit given to customer — `NUMBER(9,2)`
- `COMMENTS` : Comments — `LONG`

**Sample Data:**

| Custid | Name | Address | City | State | Zip | Area | Phone | Repid | Creditlimit | Comments |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **100** | Jocksports | 345 Viewridge | Belmont | CA | 96711 | 415 | 598-6609 | 7844 | 5000 | Very friendly people to work with |
| **101** | Tkb Sport Shop | 490 Boli Rd. | Redwood City | CA | 94061 | 415 | 368-1223 | 7521 | 10000 | Rep called 5/8 about change |
| **102** | Vollyrite | 9722 Hamilton | Burlingame | CA | 95133 | 415 | 344-3341 | 7654 | 7000 | Company doing heavy promotion |
| **103** | Just Tennis | Hillview Mall | Burlingame | CA | 97544 | 415 | 677-9312 | 7521 | 3000 | Contact rep about new line |
| **104** | Every Mountain | 574 Surry Rd. | Cupertino | CA | 93301 | 408 | 996-2323 | 7499 | 10000 | Customer with high market share |
| **105** | K + T Sports | 3476 El Paseo | Santa Clara | CA | 91003 | 408 | 376-9966 | 7844 | 5000 | Tends to order large amount |
| **106** | Shape Up | 908 Sequoia | Palo Alto | CA | 94301 | 415 | 364-9777 | 7521 | 6000 | Support intensive |
| **107** | Womens Sports | Valco Village | Sunnyvale | CA | 93301 | 408 | 967-4398 | 7499 | 10000 | First sporting goods store |
| **108** | North Woods | 98 Lone Pine | Hibbing | MN | 55649 | 612 | 566-9123 | 7844 | 8000 | *NULL* |

---

### 4. ORD: Order Table *(PRIMARY KEY: ORDID)*

**Column Specifications:**
- `ORDID` : Order Identification Number (Primary Key) — `NUMBER(4)`
- `ORDERDATE` : Order Date — `DATE`
- `COMMPLAN` : Commission Plan (if any) — `CHAR(1)`
- `CUSTID` : Customer Identification Number (Foreign Key -> `CUSTOMER(CUSTID)`) — `NUMBER(6)`
- `SHIPDATE` : Shipment Date — `DATE`
- `TOTAL` : Total Order Amount — `NUMBER(8,2)`

**Sample Data:**

| Ordid | Orderdate | Commplan | Custid | Shipdate | Total |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **610** | 07-JAN-1987 | A | 101 | 08-JAN-1987 | 101.40 |
| **611** | 11-JAN-1987 | B | 102 | 11-JAN-1987 | 45.00 |
| **612** | 15-JAN-1987 | C | 104 | 20-JAN-1987 | 5860.00 |
| **601** | 01-MAY-1986 | A | 106 | 30-MAY-1986 | 2.40 |
| **602** | 05-JUN-1986 | B | 102 | 20-JUN-1986 | 56.00 |
| **604** | 15-JUN-1986 | A | 106 | 30-JUN-1986 | 698.00 |
| **605** | 14-JUL-1986 | A | 106 | 30-JUL-1986 | 8324.00 |
| **606** | 14-JUL-1986 | A | 100 | 30-JUL-1986 | 3.40 |
| **609** | 01-AUG-1986 | B | 100 | 15-AUG-1986 | 97.50 |
| **607** | 18-JUL-1986 | C | 104 | 18-JUL-1986 | 5.60 |
| **608** | 25-JUL-1986 | C | 104 | 25-JUL-1986 | 35.20 |
| **603** | 05-JUN-1986 | *NULL* | 102 | 05-JUN-1986 | 224.00 |
| **620** | 12-MAR-1987 | *NULL* | 100 | 12-MAR-1987 | 4450.00 |
| **613** | 01-FEB-1987 | *NULL* | 108 | 01-FEB-1987 | 6400.00 |
| **614** | 01-FEB-1987 | *NULL* | 102 | 05-FEB-1987 | 23940.00 |
| **616** | 03-FEB-1987 | *NULL* | 103 | 10-FEB-1987 | 764.00 |
| **619** | 22-FEB-1987 | *NULL* | 104 | 04-FEB-1987 | 1260.00 |
| **617** | 05-FEB-1987 | *NULL* | 105 | 03-MAR-1987 | 46370.00 |
| **615** | 01-FEB-1987 | *NULL* | 107 | 06-FEB-1987 | 710.00 |
| **618** | 15-FEB-1987 | A | 102 | 06-MAR-1987 | 3510.50 |
| **621** | 15-MAR-1987 | A | 100 | 01-JAN-1987 | 730.00 |

---

## 🎯 Task 1: Simple Queries

1. **List details of all employees.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP;
```
</details>

2. **List employee number and name.**
<details>
<summary>Show Solution</summary>

```sql
SELECT EMPNO, ENAME FROM EMP;
```
</details>

3. **List employee number, name, job, and salary.**
<details>
<summary>Show Solution</summary>

```sql
SELECT EMPNO, ENAME, JOB, SAL FROM EMP;
```
</details>

4. **List employees whose salary is greater than 2000.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE SAL > 2000;
```
</details>

5. **List orders whose amount is greater than 1000.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM ORD WHERE TOTAL > 1000;
```
</details>

6. **List customers from CA.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM CUSTOMER WHERE STATE = 'CA';
```
</details>

7. **List departments located in NEW YORK.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM DEPT WHERE LOC = 'NEW YORK';
```
</details>

8. **List departments located in NEW YORK or BOSTON.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM DEPT WHERE LOC IN ('NEW YORK', 'BOSTON');
```
</details>

9. **List departments located neither in NEW YORK nor BOSTON.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM DEPT WHERE LOC NOT IN ('NEW YORK', 'BOSTON');
```
</details>

10. **List employees of department 20.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO = 20;
```
</details>

11. **List employees of departments 10 and 20.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO IN (10, 20);
```
</details>

12. **List employees of departments 10, 20, and 30.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO IN (10, 20, 30);
```
</details>

13. **List employees whose commission is greater than 60% of salary.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE COMM > (0.60 * SAL);
```
</details>

14. **List all CLERKs.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE JOB = 'CLERK';
```
</details>

15. **List CLERKs of department 20.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE JOB = 'CLERK' AND DEPTNO = 20;
```
</details>

16. **List CLERKs of departments 10 and 20.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE JOB = 'CLERK' AND DEPTNO IN (10, 20);
```
</details>

17. **List CLERKs, ANALYSTs, SALESMAN, and MANAGERs.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE JOB IN ('CLERK', 'ANALYST', 'SALESMAN', 'MANAGER');
```
</details>

18. **List employees whose name starts with A.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE ENAME LIKE 'A%';
```
</details>

19. **List employees whose name does not start with A.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE ENAME NOT LIKE 'A%';
```
</details>

20. **List employees with A at the second position of the name.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE ENAME LIKE '_A%';
```
</details>

21. **List employees whose name contains A.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE ENAME LIKE '%A%';
```
</details>

22. **List employees whose name contains AM.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE ENAME LIKE '%AM%';
```
</details>

23. **List employees without commission.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE COMM IS NULL OR COMM = 0;
```
</details>

24. **List orders without a commission plan.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM ORD WHERE COMMPLAN IS NULL;
```
</details>

25. **List orders with a commission plan.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM ORD WHERE COMMPLAN IS NOT NULL;
```
</details>

26. **List employees with salary between 2000 and 4000.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE SAL BETWEEN 2000 AND 4000;
```
</details>

27. **List EMPNO, ENAME, JOB, and total earnings (`SAL + COMM`).**
<details>
<summary>Show Solution</summary>

```sql
SELECT EMPNO, ENAME, JOB, SAL + COALESCE(COMM, 0) AS TOTAL_EARNINGS FROM EMP;
```
</details>

28. **List customers whose name contains two or more words.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM CUSTOMER WHERE NAME LIKE '% %';
```
</details>

29. **List employees in ascending name order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP ORDER BY ENAME ASC;
```
</details>

30. **List employees ordered by DEPTNO ascending and SAL ascending.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP ORDER BY DEPTNO ASC, SAL ASC;
```
</details>

31. **List employees ordered by DEPTNO ascending and SAL descending.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP ORDER BY DEPTNO ASC, SAL DESC;
```
</details>

32. **List employees ordered by DEPTNO descending and SAL descending.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP ORDER BY DEPTNO DESC, SAL DESC;
```
</details>

33. **List orders in ascending amount order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM ORD ORDER BY TOTAL ASC;
```
</details>

34. **List orders without a commission plan in descending amount order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM ORD WHERE COMMPLAN IS NULL ORDER BY TOTAL DESC;
```
</details>

35. **List department 10 employees in ascending salary order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO = 10 ORDER BY SAL ASC;
```
</details>

36. **List all JOB values from EMP.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DISTINCT JOB FROM EMP;
```
</details>

37. **List PRODIDs ordered at least once.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DISTINCT PRODID FROM ITEM;
```
</details>

38. **List customers in descending CREDITLIMIT order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM CUSTOMER ORDER BY CREDITLIMIT DESC;
```
</details>

39. **List orders in order of ORDERDATE.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM ORD ORDER BY ORDERDATE ASC;
```
</details>

40. **List employees in descending earnings order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT EMPNO, ENAME, JOB, SAL + COALESCE(COMM, 0) AS TOTAL_EARNINGS FROM EMP ORDER BY TOTAL_EARNINGS DESC;
```
</details>

41. **List CLERKs in descending earnings order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT EMPNO, ENAME, JOB, SAL + COALESCE(COMM, 0) AS TOTAL_EARNINGS FROM EMP WHERE JOB = 'CLERK' ORDER BY TOTAL_EARNINGS DESC;
```
</details>

42. **List employees in descending experience order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP ORDER BY HIREDATE ASC;
```
</details>

43. **List EMPNO, ENAME, JOB, and experience in years rounded to zero decimals.**
<details>
<summary>Show Solution</summary>

```sql
SELECT EMPNO, ENAME, JOB, ROUND((JULIANDAY('now') - JULIANDAY(HIREDATE)) / 365.25) AS EXPERIENCE_YEARS FROM EMP;
```
</details>

---

## 📊 Task 2: Queries Using Group Functions

44. **Find the total number of employees.**
<details>
<summary>Show Solution</summary>

```sql
SELECT COUNT(*) AS TOTAL_EMPLOYEES FROM EMP;
```
</details>

45. **Find the sum and average salary.**
<details>
<summary>Show Solution</summary>

```sql
SELECT SUM(SAL) AS TOTAL_SALARY, AVG(SAL) AS AVG_SALARY FROM EMP;
```
</details>

46. **Find the highest and lowest salary.**
<details>
<summary>Show Solution</summary>

```sql
SELECT MAX(SAL) AS HIGHEST_SALARY, MIN(SAL) AS LOWEST_SALARY FROM EMP;
```
</details>

47. **Find average employee earnings.**
<details>
<summary>Show Solution</summary>

```sql
SELECT AVG(SAL + COALESCE(COMM, 0)) AS AVG_EARNINGS FROM EMP;
```
</details>

48. **Count employees earning more than 2000.**
<details>
<summary>Show Solution</summary>

```sql
SELECT COUNT(*) FROM EMP WHERE SAL > 2000;
```
</details>

49. **Find total salary of department 10.**
<details>
<summary>Show Solution</summary>

```sql
SELECT SUM(SAL) AS TOTAL_SALARY FROM EMP WHERE DEPTNO = 10;
```
</details>

50. **Count employees without commission.**
<details>
<summary>Show Solution</summary>

```sql
SELECT COUNT(*) FROM EMP WHERE COMM IS NULL OR COMM = 0;
```
</details>

51. **Count orders without a commission plan.**
<details>
<summary>Show Solution</summary>

```sql
SELECT COUNT(*) FROM ORD WHERE COMMPLAN IS NULL;
```
</details>

52. **Count CLERKs.**
<details>
<summary>Show Solution</summary>

```sql
SELECT COUNT(*) FROM EMP WHERE JOB = 'CLERK';
```
</details>

53. **Find total salary of MANAGERs.**
<details>
<summary>Show Solution</summary>

```sql
SELECT SUM(SAL) AS TOTAL_MANAGER_SALARY FROM EMP WHERE JOB = 'MANAGER';
```
</details>

54. **Count jobs in the company.**
<details>
<summary>Show Solution</summary>

```sql
SELECT COUNT(DISTINCT JOB) AS TOTAL_JOBS FROM EMP;
```
</details>

55. **Find salary sum for each department.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, SUM(SAL) AS TOTAL_SALARY FROM EMP GROUP BY DEPTNO;
```
</details>

56. **Count employees in each department.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, COUNT(*) AS EMP_COUNT FROM EMP GROUP BY DEPTNO;
```
</details>

57. **Count CLERKs in each department.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, COUNT(*) AS CLERK_COUNT FROM EMP WHERE JOB = 'CLERK' GROUP BY DEPTNO;
```
</details>

58. **Count jobs in each department.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, COUNT(DISTINCT JOB) AS JOB_COUNT FROM EMP GROUP BY DEPTNO;
```
</details>

59. **Count employees in each job of each department.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, JOB, COUNT(*) AS EMP_COUNT FROM EMP GROUP BY DEPTNO, JOB;
```
</details>

60. **Find each CUSTID and its order count.**
<details>
<summary>Show Solution</summary>

```sql
SELECT CUSTID, COUNT(*) AS ORDER_COUNT FROM ORD GROUP BY CUSTID;
```
</details>

61. **Find total order amount for each product.**
<details>
<summary>Show Solution</summary>

```sql
SELECT PRODID, SUM(ITEMTOT) AS TOTAL_AMOUNT FROM ITEM GROUP BY PRODID;
```
</details>

62. **Find total quantity ordered for each product.**
<details>
<summary>Show Solution</summary>

```sql
SELECT PRODID, SUM(QTY) AS TOTAL_QTY FROM ITEM GROUP BY PRODID;
```
</details>

63. **Find total items ordered in each order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT ORDID, SUM(QTY) AS TOTAL_ITEMS FROM ITEM GROUP BY ORDID;
```
</details>

64. **Count orders placed in each month of 1987.**
<details>
<summary>Show Solution</summary>

```sql
SELECT STRFTIME('%m', ORDERDATE) AS MONTH, COUNT(*) AS ORDER_COUNT 
FROM ORD 
WHERE STRFTIME('%Y', ORDERDATE) = '1987' 
GROUP BY STRFTIME('%m', ORDERDATE);
```
</details>

65. **Count employees joining in each year.**
<details>
<summary>Show Solution</summary>

```sql
SELECT STRFTIME('%Y', HIREDATE) AS JOIN_YEAR, COUNT(*) AS JOINER_COUNT 
FROM EMP 
GROUP BY STRFTIME('%Y', HIREDATE);
```
</details>

66. **Count CLERKs joining in each year.**
<details>
<summary>Show Solution</summary>

```sql
SELECT STRFTIME('%Y', HIREDATE) AS JOIN_YEAR, COUNT(*) AS CLERK_COUNT 
FROM EMP 
WHERE JOB = 'CLERK' 
GROUP BY STRFTIME('%Y', HIREDATE);
```
</details>

67. **Count orders in each year.**
<details>
<summary>Show Solution</summary>

```sql
SELECT STRFTIME('%Y', ORDERDATE) AS ORDER_YEAR, COUNT(*) AS ORDER_COUNT 
FROM ORD 
GROUP BY STRFTIME('%Y', ORDERDATE);
```
</details>

68. **Count customers in each area.**
<details>
<summary>Show Solution</summary>

```sql
SELECT AREA, COUNT(*) AS CUSTOMER_COUNT FROM CUSTOMER GROUP BY AREA;
```
</details>

69. **Find total order amount for each year.**
<details>
<summary>Show Solution</summary>

```sql
SELECT STRFTIME('%Y', ORDERDATE) AS ORDER_YEAR, SUM(TOTAL) AS TOTAL_AMOUNT 
FROM ORD 
GROUP BY STRFTIME('%Y', ORDERDATE);
```
</details>

70. **Count orders in each COMMPLAN.**
<details>
<summary>Show Solution</summary>

```sql
SELECT COMMPLAN, COUNT(*) AS ORDER_COUNT FROM ORD GROUP BY COMMPLAN;
```
</details>

71. **Find average ordered price for each product.**
<details>
<summary>Show Solution</summary>

```sql
SELECT PRODID, AVG(ACTUALPRICE) AS AVG_PRICE FROM ITEM GROUP BY PRODID;
```
</details>

72. **Find departments with more than 3 employees.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, COUNT(*) AS EMP_COUNT FROM EMP GROUP BY DEPTNO HAVING COUNT(*) > 3;
```
</details>

73. **Find dates with at least 2 orders.**
<details>
<summary>Show Solution</summary>

```sql
SELECT ORDERDATE, COUNT(*) AS ORDER_COUNT FROM ORD GROUP BY ORDERDATE HAVING COUNT(*) >= 2;
```
</details>

74. **Find customers with more than 3 orders.**
<details>
<summary>Show Solution</summary>

```sql
SELECT CUSTID, COUNT(*) AS ORDER_COUNT FROM ORD GROUP BY CUSTID HAVING COUNT(*) > 3;
```
</details>

75. **Find products ordered more than 6 times.**
<details>
<summary>Show Solution</summary>

```sql
SELECT PRODID, COUNT(*) AS ORDER_TIMES FROM ITEM GROUP BY PRODID HAVING COUNT(*) > 6;
```
</details>

76. **Find orders containing more than 3 items.**
<details>
<summary>Show Solution</summary>

```sql
SELECT ORDID, COUNT(*) AS ITEM_COUNT FROM ITEM GROUP BY ORDID HAVING COUNT(*) > 3;
```
</details>

77. **Find departments with at least 2 CLERKs.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, COUNT(*) AS CLERK_COUNT FROM EMP WHERE JOB = 'CLERK' GROUP BY DEPTNO HAVING COUNT(*) >= 2;
```
</details>

78. **Find managers and their subordinate counts.**
<details>
<summary>Show Solution</summary>

```sql
SELECT MGR, COUNT(*) AS SUBORDINATE_COUNT FROM EMP WHERE MGR IS NOT NULL GROUP BY MGR;
```
</details>

79. **Find departments whose total salary exceeds 10,000.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, SUM(SAL) AS TOTAL_SALARY FROM EMP GROUP BY DEPTNO HAVING SUM(SAL) > 10000;
```
</details>

80. **Find departments with at least 3 distinct jobs.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, COUNT(DISTINCT JOB) AS JOB_COUNT FROM EMP GROUP BY DEPTNO HAVING COUNT(DISTINCT JOB) >= 3;
```
</details>

81. **Find employees with more than 2 subordinates.**
<details>
<summary>Show Solution</summary>

```sql
SELECT MGR, COUNT(*) AS SUBORDINATES FROM EMP WHERE MGR IS NOT NULL GROUP BY MGR HAVING COUNT(*) > 2;
```
</details>

82. **List department salary totals in descending order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, SUM(SAL) AS TOTAL_SALARY FROM EMP GROUP BY DEPTNO ORDER BY TOTAL_SALARY DESC;
```
</details>

83. **List CLERK salary totals by department in descending order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DEPTNO, SUM(SAL) AS CLERK_TOTAL FROM EMP WHERE JOB = 'CLERK' GROUP BY DEPTNO ORDER BY CLERK_TOTAL DESC;
```
</details>

84. **List dates and order counts in ascending count order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT ORDERDATE, COUNT(*) AS ORDER_COUNT FROM ORD GROUP BY ORDERDATE ORDER BY ORDER_COUNT ASC;
```
</details>

---

## 🔍 Task 3: Queries Using Subquery

85. **List employees of SALES.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE DNAME = 'SALES');
```
</details>

86. **List employees of departments located in NEW YORK.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'NEW YORK');
```
</details>

87. **List employees of KING's department.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM EMP WHERE ENAME = 'KING');
```
</details>

88. **List departments having at least one employee.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM DEPT WHERE DEPTNO IN (SELECT DISTINCT DEPTNO FROM EMP);
```
</details>

89. **List employees with at least one assigned customer.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE EMPNO IN (SELECT DISTINCT REPID FROM CUSTOMER WHERE REPID IS NOT NULL);
```
</details>

90. **List employees with at least one subordinate.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE EMPNO IN (SELECT DISTINCT MGR FROM EMP WHERE MGR IS NOT NULL);
```
</details>

91. **List customers who placed at least one order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM CUSTOMER WHERE CUSTID IN (SELECT DISTINCT CUSTID FROM ORD);
```
</details>

92. **List products ordered once.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM PRODUCT WHERE PRODID IN (
    SELECT PRODID FROM ITEM GROUP BY PRODID HAVING COUNT(*) = 1
);
```
</details>

93. **List employees whose assigned customer placed an order.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE EMPNO IN (
    SELECT DISTINCT REPID FROM CUSTOMER WHERE CUSTID IN (SELECT DISTINCT CUSTID FROM ORD)
);
```
</details>

94. **List employees earning the same salary as MARTIN.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE SAL = (SELECT SAL FROM EMP WHERE ENAME = 'MARTIN') AND ENAME != 'MARTIN';
```
</details>

95. **List employees with MARTIN's salary and job.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE (SAL, JOB) = (SELECT SAL, JOB FROM EMP WHERE ENAME = 'MARTIN') AND ENAME != 'MARTIN';
```
</details>

96. **List department 20 employees earning more than an employee of department 10.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO = 20 AND SAL > ANY (SELECT SAL FROM EMP WHERE DEPTNO = 10);
```
</details>

97. **List department 10 employees earning more than all department 20 employees.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO = 10 AND SAL > ALL (SELECT SAL FROM EMP WHERE DEPTNO = 20);
```
</details>

98. **List SALES employees earning more than an employee of department 10.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE DNAME = 'SALES') 
AND SAL > ANY (SELECT SAL FROM EMP WHERE DEPTNO = 10);
```
</details>

99. **List SALES employees earning more than an ACCOUNTING employee.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE DNAME = 'SALES')
AND SAL > ANY (SELECT SAL FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE DNAME = 'ACCOUNTING'));
```
</details>

100. **List SALES employees earning more than all ACCOUNTING employees.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE DNAME = 'SALES')
AND SAL > ALL (SELECT SAL FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE DNAME = 'ACCOUNTING'));
```
</details>

---

## 🔗 Task 4: Queries Using Join

146. **List employee number, name, department number, and department name.**
<details>
<summary>Show Solution</summary>

```sql
SELECT E.EMPNO, E.ENAME, E.DEPTNO, D.DNAME 
FROM EMP E 
JOIN DEPT D ON E.DEPTNO = D.DEPTNO;
```
</details>

147. **List employees of SALES.**
<details>
<summary>Show Solution</summary>

```sql
SELECT E.* 
FROM EMP E 
JOIN DEPT D ON E.DEPTNO = D.DEPTNO 
WHERE D.DNAME = 'SALES';
```
</details>

148. **List departments having at least one employee.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DISTINCT D.* 
FROM DEPT D 
JOIN EMP E ON D.DEPTNO = E.DEPTNO;
```
</details>

149. **List employees of KING's department.**
<details>
<summary>Show Solution</summary>

```sql
SELECT E1.* 
FROM EMP E1 
JOIN EMP E2 ON E1.DEPTNO = E2.DEPTNO 
WHERE E2.ENAME = 'KING';
```
</details>

150. **List customers with their representative's name.**
<details>
<summary>Show Solution</summary>

```sql
SELECT C.CUSTID, C.NAME AS CUSTOMER_NAME, E.ENAME AS SALES_REP 
FROM CUSTOMER C 
LEFT JOIN EMP E ON C.REPID = E.EMPNO;
```
</details>

151. **List department 20 employees with the same job as JAMES.**
<details>
<summary>Show Solution</summary>

```sql
SELECT E1.* 
FROM EMP E1 
JOIN EMP E2 ON E1.JOB = E2.JOB 
WHERE E2.ENAME = 'JAMES' AND E1.DEPTNO = 20;
```
</details>

152. **List employee number, name, manager number, and manager name.**
<details>
<summary>Show Solution</summary>

```sql
SELECT E.EMPNO, E.ENAME, E.MGR, M.ENAME AS MANAGER_NAME 
FROM EMP E 
LEFT JOIN EMP M ON E.MGR = M.EMPNO;
```
</details>

153. **List employees who manage at least one employee.**
<details>
<summary>Show Solution</summary>

```sql
SELECT DISTINCT M.* 
FROM EMP M 
JOIN EMP E ON M.EMPNO = E.MGR;
```
</details>

154. **List employees earning more than their manager.**
<details>
<summary>Show Solution</summary>

```sql
SELECT E.EMPNO, E.ENAME, E.SAL, M.ENAME AS MANAGER_NAME, M.SAL AS MANAGER_SAL 
FROM EMP E 
JOIN EMP M ON E.MGR = M.EMPNO 
WHERE E.SAL > M.SAL;
```
</details>

155. **List employees who joined before their manager.**
<details>
<summary>Show Solution</summary>

```sql
SELECT E.EMPNO, E.ENAME, E.HIREDATE, M.ENAME AS MANAGER_NAME, M.HIREDATE AS MANAGER_HIREDATE 
FROM EMP E 
JOIN EMP M ON E.MGR = M.EMPNO 
WHERE E.HIREDATE < M.HIREDATE;
```
</details>

---

## ⚡ Task 5: Queries Using Correlated Subquery

165. **List employees earning more than their department average.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP E1 
WHERE SAL > (SELECT AVG(SAL) FROM EMP E2 WHERE E2.DEPTNO = E1.DEPTNO);
```
</details>

166. **List employees earning more than their manager.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP E 
WHERE SAL > (SELECT SAL FROM EMP M WHERE M.EMPNO = E.MGR);
```
</details>

167. **List departments having at least one employee.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM DEPT D 
WHERE EXISTS (SELECT 1 FROM EMP E WHERE E.DEPTNO = D.DEPTNO);
```
</details>

168. **List departments having more than 3 employees.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM DEPT D 
WHERE (SELECT COUNT(*) FROM EMP E WHERE E.DEPTNO = D.DEPTNO) > 3;
```
</details>

169. **List employees with at least 3 subordinates.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP M 
WHERE (SELECT COUNT(*) FROM EMP E WHERE E.MGR = M.EMPNO) >= 3;
```
</details>

170. **List employees with at least one assigned customer.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM EMP E 
WHERE EXISTS (SELECT 1 FROM CUSTOMER C WHERE C.REPID = E.EMPNO);
```
</details>

171. **List products ordered more than 6 times.**
<details>
<summary>Show Solution</summary>

```sql
SELECT * FROM PRODUCT P 
WHERE (SELECT COUNT(*) FROM ITEM I WHERE I.PRODID = P.PRODID) > 6;
```
</details>

---

## Assignment: 25 SQL Query Solutions

The following solutions answer the attached assignment using the `DEPT`, `EMP`, `CUSTOMER`, `ORD`, `PRODUCT`, and `ITEM` tables defined above. `COALESCE(COMM, 0)` treats a missing commission as zero while calculating total earnings.

### 1. Clerks and managers in departments 10 and 20

```sql
SELECT *
FROM EMP
WHERE JOB IN ('CLERK', 'MANAGER')
  AND DEPTNO IN (10, 20);
```

### 2. Employees with `A` in the second position

```sql
SELECT *
FROM EMP
WHERE ENAME LIKE '_A%';
```

`_` represents exactly one character, so the `A` is at position 2.

### 3. Customers whose names contain two or more words

```sql
SELECT *
FROM CUSTOMER
WHERE NAME LIKE '% %';
```

The space shows that the name contains at least two words.

### 4. Orders without a commission plan

```sql
SELECT *
FROM ORD
WHERE COMMPLAN IS NULL;
```

### 5. Employees ordered by department and total earnings

```sql
SELECT E.*,
       E.SAL + COALESCE(E.COMM, 0) AS TOTAL_EARNINGS
FROM EMP E
ORDER BY E.DEPTNO ASC, TOTAL_EARNINGS DESC;
```

### 6. Number of employees in each job of each department

```sql
SELECT DEPTNO, JOB, COUNT(*) AS EMPLOYEE_COUNT
FROM EMP
GROUP BY DEPTNO, JOB
ORDER BY DEPTNO, JOB;
```

### 7. Number of clerks who joined in each year

```sql
SELECT STRFTIME('%Y', HIREDATE) AS JOIN_YEAR,
       COUNT(*) AS CLERK_COUNT
FROM EMP
WHERE JOB = 'CLERK'
GROUP BY STRFTIME('%Y', HIREDATE)
ORDER BY JOIN_YEAR;
```

### 8. Employees and their number of subordinates

```sql
SELECT MGR AS EMPNO, COUNT(*) AS SUBORDINATE_COUNT
FROM EMP
WHERE MGR IS NOT NULL
GROUP BY MGR
HAVING COUNT(*) >= 1
ORDER BY EMPNO;
```

### 9. Department-wise salary total of clerks

```sql
SELECT DEPTNO, SUM(SAL) AS TOTAL_CLERK_SALARY
FROM EMP
WHERE JOB = 'CLERK'
GROUP BY DEPTNO
ORDER BY TOTAL_CLERK_SALARY DESC;
```

### 10. Sales employees who have at least one subordinate

```sql
SELECT E.*
FROM EMP E
JOIN DEPT D ON D.DEPTNO = E.DEPTNO
WHERE D.DNAME = 'SALES'
  AND EXISTS (
      SELECT 1
      FROM EMP S
      WHERE S.MGR = E.EMPNO
  );
```

### 11. Employees through whom at least one order was placed

```sql
SELECT E.*
FROM EMP E
WHERE EXISTS (
    SELECT 1
    FROM CUSTOMER C
    JOIN ORD O ON O.CUSTID = C.CUSTID
    WHERE C.REPID = E.EMPNO
);
```

The `EXISTS` condition avoids returning duplicate employee rows when a representative has several customers or orders.

### 12. Sales employees earning more than at least one accounting employee

```sql
SELECT E.*
FROM EMP E
JOIN DEPT D ON D.DEPTNO = E.DEPTNO
WHERE D.DNAME = 'SALES'
  AND E.SAL > (
      SELECT MIN(A.SAL)
      FROM EMP A
      JOIN DEPT AD ON AD.DEPTNO = A.DEPTNO
      WHERE AD.DNAME = 'ACCOUNTING'
  );
```

`SAL > MIN(accounting salaries)` is equivalent to being greater than **any** accounting employee's salary.

### 13. Sales employees earning more than every accounting employee

```sql
SELECT E.*
FROM EMP E
JOIN DEPT D ON D.DEPTNO = E.DEPTNO
WHERE D.DNAME = 'SALES'
  AND E.SAL > (
      SELECT MAX(A.SAL)
      FROM EMP A
      JOIN DEPT AD ON AD.DEPTNO = A.DEPTNO
      WHERE AD.DNAME = 'ACCOUNTING'
  );
```

`SAL > MAX(accounting salaries)` is equivalent to being greater than **all** accounting employees' salaries.

### 14. Products with the highest total order amount

```sql
WITH PRODUCT_TOTALS AS (
    SELECT PRODID, SUM(ITEMTOT) AS TOTAL_ORDER_AMOUNT
    FROM ITEM
    GROUP BY PRODID
)
SELECT P.*, T.TOTAL_ORDER_AMOUNT
FROM PRODUCT P
JOIN PRODUCT_TOTALS T ON T.PRODID = P.PRODID
WHERE T.TOTAL_ORDER_AMOUNT = (
    SELECT MAX(TOTAL_ORDER_AMOUNT)
    FROM PRODUCT_TOTALS
);
```

### 15. Customers who placed the highest-total-order products

```sql
WITH PRODUCT_TOTALS AS (
    SELECT PRODID, SUM(ITEMTOT) AS TOTAL_ORDER_AMOUNT
    FROM ITEM
    GROUP BY PRODID
), HIGHEST_PRODUCTS AS (
    SELECT PRODID
    FROM PRODUCT_TOTALS
    WHERE TOTAL_ORDER_AMOUNT = (SELECT MAX(TOTAL_ORDER_AMOUNT) FROM PRODUCT_TOTALS)
)
SELECT DISTINCT C.*
FROM CUSTOMER C
JOIN ORD O ON O.CUSTID = C.CUSTID
JOIN ITEM I ON I.ORDID = O.ORDID
JOIN HIGHEST_PRODUCTS H ON H.PRODID = I.PRODID;
```

### 16. Department with the lowest average salary

```sql
WITH DEPARTMENT_AVERAGES AS (
    SELECT DEPTNO, AVG(SAL) AS AVERAGE_SALARY
    FROM EMP
    GROUP BY DEPTNO
)
SELECT D.*, A.AVERAGE_SALARY
FROM DEPT D
JOIN DEPARTMENT_AVERAGES A ON A.DEPTNO = D.DEPTNO
WHERE A.AVERAGE_SALARY = (
    SELECT MIN(AVERAGE_SALARY)
    FROM DEPARTMENT_AVERAGES
);
```

### 17. Orders containing more than three item rows

```sql
SELECT O.*, COUNT(I.ITEMID) AS ITEM_COUNT
FROM ORD O
JOIN ITEM I ON I.ORDID = O.ORDID
GROUP BY O.ORDID, O.ORDERDATE, O.COMMPLAN, O.CUSTID, O.SHIPDATE, O.TOTAL
HAVING COUNT(I.ITEMID) > 3;
```

This counts item rows. To interpret the question as more than three individual units, replace `COUNT(I.ITEMID)` with `SUM(I.QTY)` in the `SELECT` and `HAVING` clauses.

### 18. Departments with the maximum number of clerks

```sql
WITH CLERK_COUNTS AS (
    SELECT DEPTNO, COUNT(*) AS CLERK_COUNT
    FROM EMP
    WHERE JOB = 'CLERK'
    GROUP BY DEPTNO
)
SELECT D.*, C.CLERK_COUNT
FROM DEPT D
JOIN CLERK_COUNTS C ON C.DEPTNO = D.DEPTNO
WHERE C.CLERK_COUNT = (SELECT MAX(CLERK_COUNT) FROM CLERK_COUNTS);
```

### 19. Products in the first order

```sql
SELECT DISTINCT P.*
FROM PRODUCT P
JOIN ITEM I ON I.PRODID = P.PRODID
WHERE I.ORDID = (
    SELECT ORDID
    FROM ORD
    ORDER BY ORDERDATE ASC, ORDID ASC
    LIMIT 1
);
```

The order ID is used as a tie-breaker if two orders have the same date.

### 20. Products ordered most by quantity

```sql
WITH PRODUCT_QUANTITIES AS (
    SELECT PRODID, SUM(QTY) AS TOTAL_QUANTITY
    FROM ITEM
    GROUP BY PRODID
)
SELECT P.*, Q.TOTAL_QUANTITY
FROM PRODUCT P
JOIN PRODUCT_QUANTITIES Q ON Q.PRODID = P.PRODID
WHERE Q.TOTAL_QUANTITY = (
    SELECT MAX(TOTAL_QUANTITY)
    FROM PRODUCT_QUANTITIES
);
```

### 21. Employees with at least three subordinates

```sql
SELECT M.EMPNO, M.ENAME, M.JOB
FROM EMP M
WHERE (
    SELECT COUNT(*)
    FROM EMP S
    WHERE S.MGR = M.EMPNO
) >= 3;
```

### 22. Customers and their representatives

```sql
SELECT C.CUSTID, C.NAME, C.CITY,
       E.EMPNO, E.ENAME, E.JOB
FROM CUSTOMER C
JOIN EMP E ON E.EMPNO = C.REPID;
```

### 23. Employees earning more than their department average

```sql
SELECT E.*
FROM EMP E
WHERE E.SAL > (
    SELECT AVG(D.SAL)
    FROM EMP D
    WHERE D.DEPTNO = E.DEPTNO
);
```

### 24. Employees earning more than their manager

```sql
SELECT E.*
FROM EMP E
JOIN EMP M ON M.EMPNO = E.MGR
WHERE E.SAL > M.SAL;
```

### 25. Employees who manage others but are not designated managers

```sql
SELECT DISTINCT M.*
FROM EMP M
JOIN EMP S ON S.MGR = M.EMPNO
WHERE M.JOB <> 'MANAGER';
```
