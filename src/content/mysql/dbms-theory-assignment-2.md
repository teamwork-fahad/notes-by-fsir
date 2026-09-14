---
title: 'DBMS Theory Assignment - 2'
description: 'Easy-English answers for M.C.A. first-semester DBMS Theory Assignment - 2.'
---

# M.C.A. 1st Semester (2026-2027)

## Paper 101: Database Management System (DBMS)

## Theory Assignment - 2

## Q.1 Super Key

A **super key** is one attribute or a group of attributes that can uniquely identify every row in a table. A super key may contain extra attributes that are not necessary for uniqueness.

For example, in a table of delivery parcels, `tracking_no` can identify one parcel. The combination `(tracking_no, destination_city)` can also identify one parcel, but `destination_city` is extra. Therefore, both are super keys, but only `tracking_no` is a minimal one.

### Can a relation exist without a super key?

**No, a relation in the relational model cannot exist without at least one super key.** A relation is a set of unique tuples. Therefore, the set of all attributes is always able to distinguish one tuple from another. The set of all attributes is consequently a super key.

However, a practical SQL table can be created without a declared `PRIMARY KEY` or `UNIQUE` constraint. For example:

```sql
CREATE TABLE parcel_log (
    tracking_no VARCHAR(20),
    destination_city VARCHAR(40)
);

INSERT INTO parcel_log VALUES ('TRK100', 'Pune');
INSERT INTO parcel_log VALUES ('TRK100', 'Pune');
```

This SQL table has two duplicate rows. No column and no combination of its columns uniquely identifies the rows as separate occurrences. It is not a proper relation under the strict relational-model definition. A database designer should add a key, for example:

```sql
CREATE TABLE parcel (
    parcel_id INTEGER PRIMARY KEY,
    tracking_no VARCHAR(20) NOT NULL,
    destination_city VARCHAR(40) NOT NULL
);
```

Thus, my conclusion is that a **relational table always needs a super key conceptually**, even when the DBMS does not declare one. In real database design, declaring a primary key or a unique constraint makes this rule enforceable and prevents accidental duplicates.

## Q.2 One Relation with More Than One Candidate Key

For both parts of this question, consider only the following relation:

### `VEHICLE_REGISTRATION`

| registration_id | chassis_number | registration_number | owner_name | vehicle_model | city |
| ---: | --- | --- | --- | --- | --- |
| 501 | CHS-A91X7 | MH12AB1234 | Neha Rao | Eon X | Pune |
| 502 | CHS-B62K4 | MH14CD5678 | Omar Khan | Terra S | Nashik |
| 503 | CHS-C48P2 | MH12EF9012 | Isha Das | Eon X | Pune |

Assume that `registration_id`, `chassis_number`, and `registration_number` are each unique for the whole relation. The names and cities are not unique.

### 1. A super key that is not a candidate key

`{registration_id, owner_name}` is a **super key** but not a candidate key.

- It is a super key because `registration_id` alone already uniquely identifies every vehicle.
- It is not a candidate key because it contains an unnecessary attribute, `owner_name`.
- After removing `owner_name`, `{registration_id}` is still unique. Therefore, the original set is not minimal.

Other examples of super keys that are not candidate keys include:

- `{chassis_number, vehicle_model}`
- `{registration_number, city}`
- `{registration_id, chassis_number, owner_name}`

Each of these sets contains at least one attribute that is already enough to identify a row.

### 2. Candidate keys, primary key, and alternate keys

The **candidate keys** are:

1. `{registration_id}`
2. `{chassis_number}`
3. `{registration_number}`

Each candidate key is unique and minimal. If any one attribute is removed, the key becomes empty and cannot identify a row.

The **primary key** selected by the designer is:

- `{registration_id}`

The remaining candidate keys become **alternate keys**:

- `{chassis_number}`
- `{registration_number}`

The following sets are also super keys, but they are not candidate keys because they have extra attributes:

- `{registration_id, owner_name}`
- `{chassis_number, city}`
- `{registration_number, vehicle_model}`

The important difference is **minimality**: every candidate key is a super key, but every super key is not a candidate key.

## Q.3 Partial Functional Dependency

A **partial functional dependency** occurs when a non-key attribute depends on only part of a composite candidate key, rather than depending on the complete key.

Consider this relation about conference workshop registrations:

### `WORKSHOP_REGISTRATION`

| attendee_id | workshop_id | attendee_name | workshop_title | attendance_status |
| ---: | ---: | --- | --- | --- |
| 11 | 201 | Kavya Shah | Cloud Security | Present |
| 11 | 202 | Kavya Shah | Data Ethics | Present |
| 12 | 201 | Daniel Lee | Cloud Security | Absent |

Assume that one attendee can register for many workshops and one workshop can have many attendees. Therefore, the composite key is:

```text
(attendee_id, workshop_id)
```

The functional dependencies are:

```text
attendee_id  -> attendee_name
workshop_id  -> workshop_title
(attendee_id, workshop_id) -> attendance_status
```

`attendee_name` depends only on `attendee_id`, and `workshop_title` depends only on `workshop_id`. They do not need the complete composite key. Therefore, both are **partial functional dependencies**.

`attendance_status` depends on the complete pair because the attendance status can be different for each attendee-workshop registration. It is not a partial dependency.

### Why this design is a problem

The attendee's name is repeated for every workshop, and the workshop title is repeated for every attendee. This can cause update, insertion, and deletion anomalies.

To remove the partial dependencies, decompose the relation into these tables:

```text
ATTENDEE(attendee_id, attendee_name)
WORKSHOP(workshop_id, workshop_title)
WORKSHOP_REGISTRATION(attendee_id, workshop_id, attendance_status)
```

Now the non-key details in each table depend on the whole key of that table. This is the main idea of moving from **First Normal Form (1NF) toward Second Normal Form (2NF)**.

## Q.4 Referential Integrity Constraint

**Referential integrity** is a rule that keeps relationships between tables correct. A **foreign key** in a child table must either match an existing primary key (or candidate key) in the parent table, or be `NULL` when the relationship is optional.

Consider a cinema booking system:

```sql
CREATE TABLE movie (
    movie_id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE screening (
    screening_id INTEGER PRIMARY KEY,
    movie_id INTEGER NOT NULL,
    screening_time DATETIME NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movie(movie_id)
);
```

Here, `movie` is the **parent table** and `screening` is the **child table**. `screening.movie_id` is a foreign key that refers to `movie.movie_id`.

### Valid example

```sql
INSERT INTO movie VALUES (301, 'The Last Signal');
INSERT INTO screening VALUES (9001, 301, '2026-08-22 18:30:00');
```

The second insert is valid because movie `301` already exists.

### Invalid example

```sql
INSERT INTO screening VALUES (9002, 999, '2026-08-22 21:00:00');
```

This should be rejected because there is no movie with `movie_id = 999`. Without referential integrity, the database could contain a screening for a movie that does not exist.

### Update and delete actions

Referential integrity also controls what happens when a parent key is changed or deleted:

- **RESTRICT or NO ACTION:** Do not delete a movie while screenings refer to it.
- **CASCADE:** Delete its related screenings automatically.
- **SET NULL:** Set the foreign key to `NULL`, but only when the relationship is optional.

For example:

```sql
CREATE TABLE screening_note (
    note_id INTEGER PRIMARY KEY,
    movie_id INTEGER,
    note_text VARCHAR(200),
    FOREIGN KEY (movie_id)
        REFERENCES movie(movie_id)
        ON DELETE SET NULL
);
```

When the referenced movie is deleted, `screening_note.movie_id` becomes `NULL` instead of pointing to a missing movie. This is suitable only when keeping the note without its movie is meaningful.

In SQLite, foreign-key enforcement must be enabled for each connection:

```sql
PRAGMA foreign_keys = ON;
```

Referential integrity improves data quality by preventing orphan records, keeping parent-child relationships valid, and making database rules dependable.

## Note for Submission

These answers are prepared for study and can be written or printed for physical submission as required by the assignment.