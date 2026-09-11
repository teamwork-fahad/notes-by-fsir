---
title: 'Linear Data Structures'
description: 'Arrays, stacks, queues, linked lists, recursion, and polynomial manipulation.'
subject: dsa
chapter: Linear
author: teamwork-fahad
---

## Array

An array stores elements in contiguous memory. For a one-dimensional array, the address of element `i` can be calculated from the base address and element size. Arrays provide fast indexed access [...]

## Stack

A stack follows **LIFO**: Last In, First Out.

Operations include `push`, `pop`, `peek`, and `isEmpty`. Applications include undo operations, function calls, backtracking, expression conversion, and expression evaluation.

### Infix, prefix, and postfix

For the expression `A + B * C`:

- Infix: `A + B * C`
- Prefix: `+ A * B C`
- Postfix: `A B C * +`

A stack can convert infix to postfix by applying operator precedence and can evaluate postfix expressions by pushing operands and applying operators.

## Recursion and Tower of Hanoi

A recursive function calls itself with a smaller problem and must have a base case.

```python
def hanoi(disks, source, helper, destination):
    if disks == 1:
        print(source, '->', destination)
        return
    hanoi(disks - 1, source, destination, helper)
    print(source, '->', destination)
    hanoi(disks - 1, helper, source, destination)
```

Tower of Hanoi requires $2^n - 1$ moves for `n` disks.

## Queue

[Read Queue and Types of Queue](/dsa/linear/queue/).

## Linked list

A linked list stores nodes connected by links rather than requiring contiguous memory.

Types include singly, circular, doubly, circular doubly, and header linked lists. Typical operations are traversal, insertion, deletion, searching, and reversal.

Linked lists are useful when frequent insertion and deletion are more important than direct indexed access. Polynomial expressions can be represented as nodes containing coefficient and exponent, [...]

### Practice

1. Implement a stack using an array and a linked list.
2. Convert `(A+B)*C` from infix to postfix.
3. Insert and delete nodes at the beginning, end, and a given position.
4. Represent and add two polynomials using linked lists.
