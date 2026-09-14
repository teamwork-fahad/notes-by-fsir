---
title: Queue and Types of Queue
description: Learn the queue data structure, FIFO principle, operations, and types.
sidebar:
   order: 2
---

# Queue

## 1. Introduction

A **Queue** is a linear data structure in which elements are inserted from one end and deleted from the other end.

Queue follows the **FIFO** principle.

### FIFO

**FIFO = First In, First Out**

It means the element which is inserted first will be removed first.

### Real-Life Example

A queue is similar to a line of people waiting for a ticket.

```text
Person 1 → Person 2 → Person 3 → Person 4
   ↑                              ↑
 Front                           Rear
```

Person 1 came first, so Person 1 will get the ticket first.

---

# 2. Queue Example

Suppose we insert:

```text
10, 20, 30, 40
```

The queue will look like:

```text
        Queue
   ┌────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │
   └────┴────┴────┴────┘
     ↑                ↑
   Front             Rear
```

Here:

* **10** is at the Front.
* **40** is at the Rear.
* 10 will be deleted first.
* New elements will be inserted at the Rear.

---

# 3. Basic Operations of Queue

A queue mainly has the following operations:

## 3.1 Enqueue

**Enqueue** means inserting a new element into the queue.

The new element is always inserted at the **Rear**.

```text
Before Enqueue:

   ┌────┬────┬────┐
   │ 10 │ 20 │ 30 │
   └────┴────┴────┘
     ↑          ↑
   Front       Rear


Enqueue(40)


After Enqueue:

   ┌────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │
   └────┴────┴────┴────┘
     ↑                ↑
   Front             Rear
```

---

## 3.2 Dequeue

**Dequeue** means removing an element from the queue.

The element is always removed from the **Front**.

```text
Before Dequeue:

   ┌────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │
   └────┴────┴────┴────┘
     ↑                ↑
   Front             Rear


Dequeue()


After Dequeue:

   ┌────┬────┬────┐
   │ 20 │ 30 │ 40 │
   └────┴────┴────┘
     ↑          ↑
   Front       Rear
```

The element **10** is removed.

---

# 4. Front and Rear

A queue uses two important positions:

### Front

The **Front** points to the element that will be removed next.

### Rear

The **Rear** points to the position where a new element will be inserted.

```text
                 Queue

   ┌────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │
   └────┴────┴────┴────┘
     ↑                ↑
   Front             Rear
```

Remember:

> **Insertion → Rear**

> **Deletion → Front**

---

# 5. Queue Operations

The common operations of a queue are:

| Operation    | Meaning                      |
| ------------ | ---------------------------- |
| Enqueue      | Insert an element            |
| Dequeue      | Delete an element            |
| Peek / Front | View the front element       |
| Rear         | View the last element        |
| isEmpty()    | Check whether queue is empty |
| isFull()     | Check whether queue is full  |

---

# 6. Queue Overflow

**Overflow** occurs when we try to insert an element into a full queue.

Example:

```text
Queue Size = 4

   ┌────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │
   └────┴────┴────┴────┘

Queue is FULL.

Enqueue(50)
```

There is no free space.

Therefore:

```text
Queue Overflow
```

---

# 7. Queue Underflow

**Underflow** occurs when we try to delete an element from an empty queue.

```text
Empty Queue:

   ┌────┬────┬────┬────┐
   │    │    │    │    │
   └────┴────┴────┴────┘

Dequeue()
```

There is no element to delete.

Therefore:

```text
Queue Underflow
```

---

# 8. Types of Queue

There are mainly four important types of queues:

```text
                    Queue
                      │
       ┌──────────────┼──────────────┐──────────────┐
       │              │              │              |
   Simple Queue   Circular Queue   Deque         Priority Queue   
                                      │
                              ┌───────┴───────┐
                              │               │
                           Input          Output
                           Restricted     Restricted
       
                 
```

The main types are:

1. Simple Queue
2. Circular Queue
3. Priority Queue
4. Double Ended Queue (Deque)

---

# 9. Simple Queue

A **Simple Queue** is also called a **Linear Queue**.

In a simple queue:

* Insertion is done from the Rear.
* Deletion is done from the Front.
* It follows FIFO.
* Elements move in one direction.

### Diagram

```text
   Front                         Rear
     ↓                            ↓
   ┌────┬────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │ 50 │
   └────┴────┴────┴────┴────┘
```

### Example

```text
Enqueue: 10

   10

Enqueue: 20

   10 → 20

Enqueue: 30

   10 → 20 → 30

Dequeue:

   20 → 30
```

### Disadvantage

The main problem with a simple queue implemented using an array is **wasted space**.

Example:

```text
Initial Queue:

   ┌────┬────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │ 50 │
   └────┴────┴────┴────┴────┘


After deleting 10, 20 and 30:

   ┌────┬────┬────┬────┬────┐
   │    │    │    │ 40 │ 50 │
   └────┴────┴────┴────┴────┘
```

Although the first three positions are empty, they may not be reusable in a normal linear queue.

This problem is solved by using a **Circular Queue**.

---

# 10. Circular Queue

A **Circular Queue** is a queue in which the last position is connected to the first position.

It forms a circle.

```text
              ┌───────────────┐
              ↓               │
        ┌────┬────┬────┬────┐ │
        │ 10 │ 20 │ 30 │ 40 │ │
        └────┴────┴────┴────┘ │
          ↑                   │
          └───────────────────┘
```

### Main Features

* Follows FIFO.
* Rear moves forward.
* When Rear reaches the last position, it can move back to the first position.
* It makes better use of available space.

### Example

Suppose the queue size is 5.

```text
   ┌────┬────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │ 50 │
   └────┴────┴────┴────┴────┘
```

Delete 10 and 20:

```text
   ┌────┬────┬────┬────┬────┐
   │    │    │ 30 │ 40 │ 50 │
   └────┴────┴────┴────┴────┘
```

Now new elements can use the empty positions:

```text
   ┌────┬────┬────┬────┬────┐
   │ 60 │ 70 │ 30 │ 40 │ 50 │
   └────┴────┴────┴────┴────┘
```

This is possible because the queue is circular.

---

# 11. Priority Queue

A **Priority Queue** is a special type of queue in which each element has a priority.

The element with higher priority is removed before an element with lower priority.

It does not always follow normal FIFO order.

### Example

Suppose we have:

```text
Element       Priority

A             3
B             1
C             2
```

If priority `1` is the highest priority:

```text
B → C → A
```

So **B** will be removed first.

### Diagram

```text
             Priority Queue

        ┌───────────────┐
        │ Element │ P   │
        ├───────────────┤
        │   B     │ 1   │ ← Highest
        │   C     │ 2   │
        │   A     │ 3   │
        └───────────────┘
```

### Real-Life Examples

Priority Queue is used in:

* Hospital emergency systems
* CPU scheduling
* Network traffic management
* Printer scheduling
* Operating systems

### Important Point

> In a Priority Queue, the element with higher priority is processed first.

---

# 12. Double Ended Queue (Deque)

**Deque** stands for:

**Double Ended Queue**

In a deque, insertion and deletion can be performed from **both ends**.

```text
          Insertion
             ↓
   ┌────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │
   └────┴────┴────┴────┘
     ↑                ↑
     │                │
  Front              Rear
     │                │
  Deletion         Insertion
```

Both Front and Rear can be used for insertion and deletion.

---

# 13. Types of Deque

There are two important types of Deque:

1. Input Restricted Deque
2. Output Restricted Deque

---

## 13.1 Input Restricted Deque

In an **Input Restricted Deque**, insertion is allowed at only one end.

But deletion is allowed from both ends.

```text
        Deletion
          ↓
   ┌────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │
   └────┴────┴────┴────┘
     ↑                ↑
   Front             Rear
     ↓
   Deletion

Insertion → Only at Rear
```

### Rule

```text
Insertion → One end only
Deletion  → Both ends
```

---

# 14. Output Restricted Deque

In an **Output Restricted Deque**, deletion is allowed at only one end.

But insertion is allowed from both ends.

```text
        Insertion
          ↓
   ┌────┬────┬────┬────┐
   │ 10 │ 20 │ 30 │ 40 │
   └────┴────┴────┴────┘
     ↑                ↑
   Front             Rear
     ↓                ↓
  Deletion         Insertion
```

### Rule

```text
Insertion → Both ends
Deletion  → One end only
```

---

# 15. Difference Between Types of Queue

| Type           | Insertion             | Deletion              | Main Feature                    |
| -------------- | --------------------- | --------------------- | ------------------------------- |
| Simple Queue   | Rear                  | Front                 | FIFO                            |
| Circular Queue | Rear                  | Front                 | Last position connects to first |
| Priority Queue | According to priority | According to priority | Priority-based processing       |
| Deque          | Both ends*            | Both ends*            | Double-ended operations         |

`*` In restricted Deques, one operation is limited to one end.

---

# 16. Simple Queue vs Circular Queue

| Simple Queue                     | Circular Queue                                |
| -------------------------------- | --------------------------------------------- |
| Linear structure                 | Circular structure                            |
| Rear moves in one direction      | Rear can wrap around                          |
| May waste empty spaces           | Reuses empty spaces                           |
| Easy to implement                | Slightly more complex                         |
| Suitable for simple applications | Suitable when memory utilization is important |

---

# 17. Applications of Queue

Queues are widely used in computer science.

### 1. CPU Scheduling

Operating systems use queues to manage processes waiting for CPU time.

### 2. Printer Queue

When multiple documents are sent to a printer, they wait in a queue.

```text
Document 1 → Document 2 → Document 3 → Printer
```

### 3. Keyboard Buffer

Characters typed by a user can be stored in a queue before processing.

### 4. Network Data

Packets waiting to be processed can be maintained using queues.

### 5. Breadth First Search

Queue is used in **BFS (Breadth First Search)** of graphs and trees.

### 6. Customer Service

Customers waiting for service can be represented using a queue.

---

# 18. Queue Using Array

A queue can be implemented using an array.

Example:

```text
int queue[5];

Front = 0
Rear  = -1
```

Diagram:

```text
Index:    0     1     2     3     4

        ┌─────┬─────┬─────┬─────┬─────┐
Queue:  │ 10  │ 20  │ 30  │     │     │
        └─────┴─────┴─────┴─────┴─────┘
          ↑           ↑
        Front        Rear
```

---

# 19. Queue Using Linked List

A queue can also be implemented using a linked list.

```text
 Front                              Rear
   ↓                                  ↓
┌──────┐      ┌──────┐      ┌──────┐
│  10  │ ───→ │  20  │ ───→ │  30  │ ───→ NULL
└──────┘      └──────┘      └──────┘
```

---

# 20. Practice

1. Implement a simple queue using an array.
2. Implement a circular queue.
3. Implement a queue using a linked list.
4. Compare a priority queue and a normal FIFO queue.
5. Implement an input-restricted deque and an output-restricted deque.

Insertion is performed at the **Rear**.

Deletion is performed at the **Front**.

---

# 20. Important Points to Remember

```text
Queue
  ↓
FIFO
  ↓
First In → First Out
```

Remember these rules:

```text
Enqueue → Rear
Dequeue → Front
```

### Quick Revision

* Queue is a **linear data structure**.
* Queue follows **FIFO**.
* Insertion is called **Enqueue**.
* Deletion is called **Dequeue**.
* **Front** is used for deletion.
* **Rear** is used for insertion.
* Full Queue → **Overflow**.
* Empty Queue + Dequeue → **Underflow**.
* Circular Queue solves the space-wastage problem of a linear queue.
* Priority Queue processes elements according to priority.
* Deque allows operations at both ends.
* Deque has two types:

  * Input Restricted Deque
  * Output Restricted Deque

---

# 21. One-Line Exam Definitions

### Queue

> A queue is a linear data structure that follows the FIFO (First In, First Out) principle.

### Enqueue

> Enqueue is the operation of inserting an element into a queue from the Rear.

### Dequeue

> Dequeue is the operation of removing an element from a queue from the Front.

### Circular Queue

> A circular queue is a queue in which the last position is connected to the first position.

### Priority Queue

> A priority queue is a queue in which elements are processed according to their priority.

### Deque

> A deque is a double-ended queue in which insertion and deletion can be performed from both ends.

### Input Restricted Deque

> An input restricted deque allows insertion at one end and deletion at both ends.

### Output Restricted Deque

> An output restricted deque allows insertion at both ends and deletion at one end.

---

# 22. Queue Summary Diagram

```text
                         QUEUE
                           │
                           │
                    FIFO Principle
                           │
              First In → First Out
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
     Enqueue            Dequeue          Front / Rear
        │                  │
      Rear               Front
                           │
                           ▼
                    Types of Queue
                           │
       ┌────────────┬──────┼──────┬──────────────┐
       │            │      │      │              │
     Simple      Circular Priority Deque
     Queue        Queue    Queue
                                  │
                         ┌────────┴────────┐
                         │                 │
                  Input Restricted   Output Restricted
                       Deque              Deque
```

---

# 23. Quick Memory Trick

Remember:

**Queue = FIFO**

**Enqueue = Enter from Rear**

**Dequeue = Delete from Front**

**Circular = Reuse Space**

**Priority = Important First**

**Deque = Both Ends**

```text
Simple     → FIFO
Circular   → Reuse Space
Priority   → Priority First
Deque      → Both Ends
```
