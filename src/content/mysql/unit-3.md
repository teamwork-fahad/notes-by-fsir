---
title: 'Python Interaction with SQLite'
description: 'Use Python modules and sqlite3 to create, read, update, and delete database records.'
---

## 3.1 Modules, Namespaces, and Packages

A module is a Python file containing reusable code. A package is a directory of related modules, usually identified by `__init__.py`. A namespace controls where a name can be accessed, and scope co[...]

```python
# project/database_tools.py
DEFAULT_LIMIT = 10

# app.py
import sys
from database_tools import DEFAULT_LIMIT

print(sys.path)
print(DEFAULT_LIMIT)
```
