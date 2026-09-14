---
title: 'Sorting Techniques'
description: 'Bubble sort, selection sort, insertion sort, quicksort, mergesort, heap sort, and radix sort.'
sidebar:
  order: 6
---

Sorting arranges data according to an order, usually ascending or descending.

| Algorithm | Best | Average | Worst | Extra space |
| --- | ---: | ---: | ---: | ---: |
| Bubble sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Selection sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Insertion sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Shell sort | depends on gap | depends on gap | depends on gap | $O(1)$ |
| Merge sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(n)$ |
| Quick sort | $O(n\log n)$ | $O(n\log n)$ | $O(n^2)$ | $O(\log n)$ average |
| Radix sort | $O(d(n+k))$ | $O(d(n+k))$ | $O(d(n+k))$ | $O(n+k)$ |
| Heap sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(1)$ |

## Basic sorting algorithms

- **Bubble sort:** repeatedly swaps adjacent elements that are out of order.
- **Selection sort:** selects the smallest remaining element and places it next.
- **Insertion sort:** inserts each new element into the sorted part.
- **Shell sort:** performs insertion sort over progressively smaller gaps.

## Efficient sorting algorithms

- **Merge sort:** divides the list, sorts each half, and merges the sorted halves. It is stable and predictable.
- **Quick sort:** partitions around a pivot and recursively sorts both sides. Pivot selection affects performance.
- **Radix sort:** sorts numbers digit by digit using a stable sub-sort.
- **Heap sort:** builds a heap and repeatedly extracts the maximum or minimum element.

### Practice

1. Trace bubble, selection, and insertion sort on `[5, 2, 4, 1, 3]`.
2. Implement merge sort and count comparisons.
3. Compare quick sort with different pivot choices.
4. Sort non-negative integers using radix sort.
5. Implement heap sort using a max heap.
