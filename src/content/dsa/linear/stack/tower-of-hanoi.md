---
title: Tower of Hanoi
description: Recursive puzzle solution using stack principles and call stack mechanics.
sidebar:
  order: 4
---

# Tower of Hanoi

Tower of Hanoi is a mathematical puzzle where disks are moved between three rods following strict size constraint rules.

```python
def tower_of_hanoi(n, source, destination, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return
    tower_of_hanoi(n - 1, source, auxiliary, destination)
    print(f"Move disk {n} from {source} to {destination}")
    tower_of_hanoi(n - 1, auxiliary, destination, source)
```
