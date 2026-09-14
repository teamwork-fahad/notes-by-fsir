---
title: 'DBMS Theory Assignment - 1'
description: 'Easy-English answers for M.C.A. first-semester DBMS Theory Assignment - 1.'
---

# M.C.A. 1st Semester (2026-2027)

## Paper 101: Database Management System (DBMS)

## Q.1 NoSQL Data Model

**NoSQL** means **Not Only SQL**. It is a database approach used for storing and processing large amounts of data that may not fit neatly into fixed tables. NoSQL databases usually allow flexible data structures, so different records can have different fields.

### Main features

- **Flexible structure:** A record can contain different fields from another record.
- **Horizontal scaling:** More computers can be added when the amount of data increases.
- **High speed:** Data can be read and written quickly for many applications.
- **Distributed storage:** Data can be stored across several servers.
- **Useful for large and changing data:** It is common in social media, online shopping, IoT, and real-time applications.

### Main types of NoSQL databases

| Type | How data is stored | Examples | Common use |
| --- | --- | --- | --- |
| Document | JSON-like documents | MongoDB, CouchDB | Product catalogues and user profiles |
| Key-value | A key and its value | Redis, Amazon DynamoDB | Caches and sessions |
| Wide-column | Rows grouped into column families | Cassandra, HBase | Very large distributed data |
| Graph | Nodes and relationships | Neo4j | Social networks and route finding |

Example of a document record:

```json
{
  "student_id": 101,
  "name": "Asha",
  "course": "MCA",
  "skills": ["Python", "SQL"]
}
```

In this example, `skills` is an array inside the document. Another student document could contain an additional field such as `email` without changing a table definition.

NoSQL is a good choice when the data structure changes often, the system must handle very high traffic, or data is naturally represented as documents, key-value pairs, columns, or graph relationships. SQL is often a better choice when strong transactions, fixed relationships, and complex reports are the main requirements.

## Q.2 Technical Comparison of SQL and NoSQL

| Feature | SQL databases | NoSQL databases |
| --- | --- | --- |
| Basic model | Relational tables with rows and columns | Document, key-value, wide-column, or graph model |
| Schema | Usually fixed and defined before inserting data | Usually flexible or schema-on-read |
| Relationships | Foreign keys and joins are central | Often embedded or handled by application code; graph databases use relationships directly |
| Query language | SQL is a common standard language | Query syntax differs between products |
| Transactions | Strong ACID transactions are widely supported | Support varies; many provide transactions, but the design often favours distributed availability and scale |
| Consistency | Usually strong consistency | May provide strong or eventual consistency, depending on the database and configuration |
| Scaling | Commonly vertical scaling; horizontal scaling is also possible | Designed mainly for horizontal scaling across servers |
| Data duplication | Normalization reduces repeated data | Denormalization is common to make reads faster |
| Best for | Banking, accounting, inventory, and structured reports | Big data, content, real-time systems, and rapidly changing data |
| Examples | MySQL, PostgreSQL, Oracle, SQLite | MongoDB, Redis, Cassandra, Neo4j |

### Technical summary

SQL databases normally follow the **ACID** properties:

- **Atomicity:** A transaction happens completely or not at all.
- **Consistency:** Data follows all defined rules after a transaction.
- **Isolation:** Simultaneous transactions do not incorrectly affect one another.
- **Durability:** Committed data remains saved after a failure.

NoSQL databases are often designed around distributed-system needs such as availability and partition tolerance. Some NoSQL systems provide strong consistency and ACID transactions too, so it is incorrect to say that every NoSQL database is weak or transaction-free. The correct choice depends on the application, data shape, query pattern, scale, and consistency requirement.

## Q.3 Mappings with Sample Data

A **mapping** describes how records in one entity are connected to records in another entity.

### 1. One-to-One (1:1)

One record in the first entity is connected to only one record in the second entity, and one record in the second entity is connected to only one record in the first entity.

**Example:** One student has one university identity card.

**Student**

| student_id | student_name |
| ---: | --- |
| 101 | Asha |
| 102 | Ravi |

**IdentityCard**

| card_id | card_number | student_id |
| ---: | --- | ---: |
| 1 | MCA-101 | 101 |
| 2 | MCA-102 | 102 |

Here, `IdentityCard.student_id` is a foreign key and should also be `UNIQUE`. This prevents two cards from being assigned to the same student and makes the relationship 1:1.

### 2. One-to-Many (1:N)

One record in the first entity can be connected to many records in the second entity. Each record in the second entity is connected to one record in the first entity.

**Example:** One department has many students.

**Department**

| department_id | department_name |
| ---: | --- |
| 10 | Computer Applications |
| 20 | Commerce |

**Student**

| student_id | student_name | department_id |
| ---: | --- | ---: |
| 101 | Asha | 10 |
| 102 | Ravi | 10 |
| 103 | Meena | 20 |

Department `10` has two students, while each student belongs to one department. The foreign key `Student.department_id` stores the 1:N connection.

### 3. Many-to-Many (M:N)

Many records in the first entity can be connected to many records in the second entity. A separate **junction table** is used to store the connections.

**Example:** Many students can join many courses.

**Student**

| student_id | student_name |
| ---: | --- |
| 101 | Asha |
| 102 | Ravi |

**Course**

| course_id | course_name |
| ---: | --- |
| C01 | DBMS |
| C02 | Python |

**StudentCourse**

| student_id | course_id |
| ---: | --- |
| 101 | C01 |
| 101 | C02 |
| 102 | C01 |

Asha studies DBMS and Python. Ravi studies DBMS. The composite key `(student_id, course_id)` prevents the same student from being registered for the same course twice. The junction table changes the M:N relationship into two 1:N relationships:

```text
Student 1 ---- N StudentCourse N ---- 1 Course
```

## Q.4 Data Models and E-R Model

### Meaning of a data model

A **data model** is a plan that shows how data is organized, related, stored, and used in a database. It helps a database designer understand the data before creating tables.

### Types of data models

1. **Hierarchical model:** Data is arranged like a tree. One parent can have many children.
2. **Network model:** Data is arranged as records connected by links. A record can have many relationships.
3. **Relational model:** Data is stored in tables. Rows are records, columns are attributes, and keys connect tables.
4. **Entity-Relationship model:** Data is represented using entities, attributes, and relationships. It is mainly used for database design.
5. **Object-oriented model:** Data is stored as objects containing data and behaviour.
6. **NoSQL models:** Data is stored as documents, key-value pairs, wide columns, or graphs.

### Definition of the E-R Model

The **Entity-Relationship (E-R) Model** is a conceptual data model used to design a database. It shows:

- **Entity:** A real-world object, such as a Student or Book.
- **Attribute:** A property of an entity, such as `student_id` or `book_title`.
- **Relationship:** A connection between entities, such as a student borrowing a book.
- **Cardinality:** The number of records that can participate in a relationship, such as 1:1, 1:N, or M:N.

## E-R Diagram: University Department Library Information System

The following diagram represents a library used by a university department. A member can borrow many books over time. A book can be borrowed many times over time, so the `Loan` entity records each borrowing event. A book belongs to one category, while one category can contain many books.

```text
+----------------+       1       N       +----------------+
|    Category    |-----------------------|      Book      |
| category_id PK |                       | book_id PK     |
| category_name  |                       | title          |
+----------------+                       | author         |
                                         | category_id FK |
                                         +--------+-------+
                                                  |
                                                  | 1
                                                  |
                                                  | N
                                         +--------v-------+
                                         |      Loan      |
                                         | loan_id PK     |
                                         | issue_date     |
                                         | due_date       |
                                         | return_date    |
                                         | member_id FK   |
                                         | book_id FK     |
                                         +--------+-------+
                                                  |
                                                  | N
                                                  |
                                                  | 1
                                         +--------v-------+
                                         |     Member     |
                                         | member_id PK   |
                                         | member_name    |
                                         | email          |
                                         | member_type    |
                                         +----------------+
```

### Sample data

**Category**

| category_id | category_name |
| ---: | --- |
| 1 | Database |
| 2 | Programming |

**Book**

| book_id | title | author | category_id |
| ---: | --- | --- | ---: |
| 501 | Database System Concepts | Korth | 1 |
| 502 | Learning Python | Lutz | 2 |

**Member**

| member_id | member_name | email | member_type |
| ---: | --- | --- | --- |
| 101 | Asha | asha@example.com | Student |
| 102 | Ravi | ravi@example.com | Student |

**Loan**

| loan_id | issue_date | due_date | return_date | member_id | book_id |
| ---: | --- | --- | --- | ---: | ---: |
| 9001 | 2026-08-01 | 2026-08-15 | 2026-08-12 | 101 | 501 |
| 9002 | 2026-08-05 | 2026-08-19 | - | 101 | 502 |
| 9003 | 2026-08-07 | 2026-08-21 | 2026-08-20 | 102 | 501 |

### Relationships and mapping

| Relationship | Mapping | Justification |
| --- | --- | --- |
| Category to Book | 1:N | One category can contain many books, but each book belongs to one category. |
| Member to Loan | 1:N | One member can have many loan records, but each loan belongs to one member. |
| Book to Loan | 1:N | One book can appear in many loan records over time, but each loan is for one book. |
| Member to Book through Loan | M:N over time | A member can borrow many books, and a book can be borrowed by many members at different times. `Loan` is the junction/transaction entity. |

### Brief working of the system

1. The librarian adds categories and books to the database.
2. A student or teacher is registered as a library member.
3. When a member borrows a book, the system creates a `Loan` record with issue and due dates.
4. When the book is returned, the system fills in `return_date`.
5. The system can find current loans by selecting records where `return_date` is empty.
6. The system can prepare reports such as available books, overdue books, and a member's borrowing history.

The primary keys uniquely identify records. The foreign keys connect the entities. This design avoids repeating member and book details in every loan record and keeps the library data organized.