---
title: 'Tower of Hanoi'
description: 'Recursion example: Tower of Hanoi problem and solution analysis.'
subject: dsa
chapter: Recursion
author: teamwork-fahad
---

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
