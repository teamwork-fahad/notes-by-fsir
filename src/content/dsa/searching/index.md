---
title: 'Searching Techniques'
description: 'Linear search, binary search, hashing, collisions, and rehashing.'
sidebar:
  order: 5
---

## Linear search

Linear search checks elements one by one. It works on sorted or unsorted data and has $O(n)$ worst-case time complexity.

```python
def linear_search(values, target):
    for index, value in enumerate(values):
        if value == target:
            return index
    return -1
```

## Binary search

Binary search requires sorted data. It repeatedly compares the target with the middle element and discards half the search space. Its time complexity is $O(\log n)$.

```python
def binary_search(values, target):
    left, right = 0, len(values) - 1
    while left <= right:
        middle = (left + right) // 2
        if values[middle] == target:
            return middle
        if values[middle] < target:
            left = middle + 1
        else:
            right = middle - 1
    return -1
```

## Hashing

A hash function maps a key to an index in a hash table. A good hash function distributes keys evenly.

A collision occurs when different keys map to the same index. Collision resolution methods include separate chaining, linear probing, quadratic probing, and double hashing.

Rehashing creates a larger table and inserts existing keys again when the load factor becomes high. Average hash-table search is $O(1)$, while the worst case can be $O(n)$.

### Practice

1. Compare linear and binary search on the same sorted list.
2. Implement binary search recursively.
3. Create a hash table using chaining.
4. Demonstrate collision resolution with linear probing and rehashing.
