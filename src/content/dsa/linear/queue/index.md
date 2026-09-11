---
title: 'Queue and Types of Queue'
description: 'Learn the queue data structure, FIFO principle, operations, and types.'
subject: dsa
chapter: Queue
author: teamwork-fahad
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

... (content preserved) ...
