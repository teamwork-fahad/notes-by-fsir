---
title: 'Data Visualization Using DataFrames'
description: 'Create two-dimensional scatter, line, histogram, and bar charts with Matplotlib.'
---

## 5.1 Matplotlib Basics

Matplotlib's `pyplot` module creates charts. This unit focuses on two-dimensional plots.

```bash
pip install matplotlib pandas
```

```python
import matplotlib.pyplot as plt

months = ['Jan', 'Feb', 'Mar', 'Apr']
sales = [120, 150, 135, 180]

plt.plot(months, sales, label='Sales')
plt.title('Monthly Sales')
plt.xlabel('Month')
plt.ylabel('Sales')
plt.legend()
plt.show()
```

`range()` is useful for numeric x-values, `len()` returns the number of values, and `subplot()` places multiple plots in one figure.

```python
x_values = list(range(1, 6))
y_values = [4, 7, 5, 9, 8]
print(len(y_values))

figure, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].plot(x_values, y_values, label='Trend')
axes[0].set_title('Line Plot')
axes[0].legend()
axes[1].bar(x_values, y_values, label='Values')
axes[1].set_title('Bar Plot')
axes[1].legend()
plt.tight_layout()
plt.show()
```

## 5.2 Scatter Plot

A scatter plot shows the relationship between two numeric variables.

```python
hours_studied = [1, 2, 3, 4, 5, 6]
scores = [45, 52, 61, 68, 78, 88]

plt.scatter(hours_studied, scores, color='teal', label='Students')
plt.title('Study Hours and Score')
plt.xlabel('Hours studied')
plt.ylabel('Score')
plt.legend()
plt.show()
```

## 5.3 Line Chart

A line chart is useful for trends over an ordered sequence such as time.

```python
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
revenue = [12000, 14500, 13800, 16200, 19000]

plt.plot(months, revenue, marker='o', label='Revenue')
plt.title('Revenue Trend')
plt.xlabel('Month')
plt.ylabel('Revenue')
plt.legend()
plt.show()
```

## 5.4 Histogram

A histogram groups numeric values into intervals called bins. It helps show distribution.

```python
marks = [45, 52, 61, 68, 68, 72, 78, 81, 85, 88, 91, 94]

plt.hist(marks, bins=4, edgecolor='black')
plt.title('Marks Distribution')
plt.xlabel('Marks')
plt.ylabel('Number of students')
plt.show()
```

## 5.5 Bar Chart

A bar chart compares separate categories.

```python
categories = ['SQL', 'Python', 'Pandas', 'Matplotlib']
students = [32, 28, 21, 18]

plt.bar(categories, students, color=['#2563eb', '#16a34a', '#f59e0b', '#dc2626'])
plt.title('Students by Topic')
plt.xlabel('Topic')
plt.ylabel('Number of students')
plt.show()
```

## DataFrame Visualization Practice

```python
import pandas as pd
import matplotlib.pyplot as plt

sales_data = pd.DataFrame({
    'month': ['Jan', 'Feb', 'Mar', 'Apr'],
    'sales': [120, 150, 135, 180],
    'orders': [12, 16, 14, 20],
})

figure, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].plot(sales_data['month'], sales_data['sales'], marker='o', label='Sales')
axes[0].set_title('Sales by Month')
axes[0].set_xlabel('Month')
axes[0].set_ylabel('Sales')
axes[0].legend()
axes[1].bar(sales_data['month'], sales_data['orders'], label='Orders')
axes[1].set_title('Orders by Month')
axes[1].set_xlabel('Month')
axes[1].set_ylabel('Orders')
axes[1].legend()
plt.tight_layout()
plt.show()
```

### Practice

1. Create a scatter plot for product price and stock.
2. Plot monthly order totals as a line chart.
3. Create a histogram of employee salaries.
4. Create a bar chart comparing revenue by product category.
5. Put a line chart and histogram in one figure using `subplot()`.
