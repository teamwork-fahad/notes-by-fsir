---
title: 'DHP Practical Tasks 2026'
description: 'Database Handling using Python practical tasks with SQLite, CSV, Pandas, and Matplotlib.'
---

# DHP Practical Tasks 2026

**Subject:** Practical - Database Handling using Python  
**Course:** S.Y.B.C.A. (Semester 3)

## Task 1: Student database

Create a college database and a SQLite `Student(roll_no, name, city, age)` table. Insert 10 records, add a `course` column, display students from `Navsari` taking `BCA`, dump the table to `student_table.sql`, and export it to CSV.

## Task 2: Employee CSV export

Retrieve all rows from the `employee` table and export them to `employee_details.csv`.

## Task 3: Student marks

Create `Student(roll_no, name, subject1, subject2, subject3)`, insert 10 records, display all records using a cursor, and display the student with the highest `subject1` marks.

## Task 4: Sales chart

Create `Sales(s_id, year, totalsales)` with suitable constraints, insert at least 10 records, export to `sales.csv`, and plot a bar chart of total sales by year.

## Task 5: Result table

Create `result(Rno, Student_name, IC, CPPM, DMA, Maths, CS)`, insert 10 records, add and calculate `total_marks` and `percentage`, display names starting with `A`, and export to `student_result.csv`.

## Task 6: Item CSV operations

For `item.csv` with `item_no, item_name, price, Qty, total`, write item data, display maximum- and minimum-price items, display the last 6 rows, and display rows 3 through 7.

## Task 7: Account trigger

Create a trigger for `ACCOUNT(A_no, balance)` that raises an error when the withdrawal amount exceeds the account balance.

## Task 8: Age-check trigger

Create an `AGE_CHECK` trigger on `employees` that prevents insertion or update when age is less than 18.

## Task 9: Book database

Create `Book(BookId, Title, Author, Subject, price)`, insert at least 10 records, display Python books priced above 350, and export the table to CSV.

## Task 10: Student marks DataFrame

Create `Db1.db` and `student_marks(Student_id, Student_name, SM_marks, SE_marks, Python_marks)`, insert at least 10 records, export to `Student_data.csv`, load it into a DataFrame, display the first 5 and last 3 records, find minimum and maximum `Python_marks`, and plot `Student_id` versus `Python_marks` as a scatter chart.

## Task 11: Student CSV analysis

Read `stud_data.csv` with `stud_id, stud_name, sub1, sub2, sub3`, insert 10 records, display names starting with `R`, add and calculate `Total_marks`, and plot `stud_name` versus `sub1` as a labelled bar chart.

## Task 12: Medicine database

Create `Medicines(Med_id, Med_Name, Qty, Rate)`, insert at least 10 records, display names starting with `C`, and export to `medicines.csv`.

## Task 13: Flights database

Create `Flights(Flight_id, Airline, Source, Destination, Fare)`, insert at least 8 records, display flights operated by `Air India`, and delete flights with fare greater than 20,000.

## Task 14: Bank database

Create `Bank(Account_no, Holder_name, Account_type, Balance, Branch)`, export it to `bank_dump.sql`, retrieve account holders with balance greater than 50,000, and drop the table.

## Required technologies

- Python 3
- SQLite
- Python `csv` module
- Pandas
- Matplotlib
