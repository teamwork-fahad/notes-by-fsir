---
title: 'Python Interaction with Text and CSV'
description: 'Read and write text and CSV files with Python, then analyze data with Pandas and NumPy.'
---

## 4.1 Text and CSV File Handling

Common file modes are `r` for read, `w` for overwrite, and `a` for append. The `with` statement closes the file automatically.

```python
with open('notes.txt', 'w', encoding='utf-8') as file:
    file.write('SQLite and Python\n')

with open('notes.txt', 'a', encoding='utf-8') as file:
    file.write('Practice makes progress\n')

with open('notes.txt', 'r', encoding='utf-8') as file:
    contents = file.read()

print(contents)
```
