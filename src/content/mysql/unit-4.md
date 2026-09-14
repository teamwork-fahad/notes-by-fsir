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

## 4.2 The `csv` Module

```python
import csv

rows = [
    ['student_id', 'student_name', 'score'],
    [1, 'Ishita Verma', 88],
    [2, 'Aditya Mehta', 76],
]

with open('scores.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerows(rows)

with open('scores.csv', 'r', newline='', encoding='utf-8') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

`DictReader` and `DictWriter` work with column names:

```python
with open('scores.csv', 'r', newline='', encoding='utf-8') as file:
    for row in csv.DictReader(file):
        print(row['student_name'], row['score'])

with open('summary.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=['city', 'average_score'])
    writer.writeheader()
    writer.writerow({'city': 'Delhi', 'average_score': 88})
```

## 4.3 Pandas and NumPy DataFrames

Install the packages once:

```bash
pip install pandas numpy openpyxl
```

Read and write CSV or Excel files:

```python
import pandas as pd

scores = pd.read_csv('scores.csv')
scores.to_csv('scores_copy.csv', index=False)

workbook = pd.read_excel('scores.xlsx')
workbook.to_excel('scores_copy.xlsx', index=False)
```

Inspect and select data:

```python
print(scores.head())
print(scores.tail(2))
print(scores.loc[scores['score'] >= 80, ['student_name', 'score']])
print(scores.iloc[0:2, 0:2])
print(scores['score'].values)
print(scores.to_numpy())
print(scores.describe())
```

Central tendency and variation:

```python
import numpy as np

score_values = scores['score'].to_numpy()
print('Mean:', np.mean(score_values))
print('Median:', np.median(score_values))
print('Mode:', scores['score'].mode().tolist())
print('Variance:', np.var(score_values))
print('Standard deviation:', np.std(score_values))
```

### Practice

1. Append a new row to a CSV file using `csv.DictWriter`.
2. Select all rows above the DataFrame's mean score.
3. Compare `loc` and `iloc` on a DataFrame with a custom index.
4. Calculate mean, median, mode, variance, and standard deviation for product prices.
