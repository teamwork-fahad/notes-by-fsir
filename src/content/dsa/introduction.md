---
title: 'Introduction and Algorithm Analysis'
description: 'Data structure classification, operations, complexity, and asymptotic notation.'
sidebar:
  order: 2
---

## Data structures

A data structure is a way to organize and store data so that operations can be performed efficiently.

### Classification

- **Primitive:** integer, character, boolean, and floating-point values.
- **Non-primitive:** arrays, linked lists, stacks, queues, trees, graphs, and hash tables.
- **Linear:** elements are arranged sequentially, such as arrays, stacks, queues, and linked lists.
- **Non-linear:** elements form hierarchies or networks, such as trees and graphs.

## Importance and operations

Good data structures improve performance, memory usage, maintainability, and scalability. Common operations are traversal, insertion, deletion, searching, sorting, merging, and updating.

## Algorithm analysis

Algorithm analysis estimates the time and memory required as input size $n$ grows. Time complexity measures running time; space complexity measures additional memory.

### Asymptotic notation

- $O(f(n))$: upper bound, commonly used for worst-case growth.
- $\Omega(f(n))$: lower bound, commonly used for best-case growth.
- $\Theta(f(n))$: tight bound when upper and lower growth match.

### Cases

- **Best case:** minimum work for a favorable input.
- **Average case:** expected work over typical inputs.
- **Worst case:** maximum work for any input of that size.

## Time-space trade-off

An algorithm can use extra memory to reduce execution time, or save memory by doing more computation. Hash tables are a common example: extra storage enables average constant-time lookup.

### Practice

1. Classify an array, stack, tree, and hash table.
2. Find the time complexity of a loop nested inside another loop.
3. Compare two algorithms with $O(n)$ and $O(n^2)$ complexity.
