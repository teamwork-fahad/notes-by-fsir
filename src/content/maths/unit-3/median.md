---
title: '3.3.2 Median'
description: 'Learn the definition, formula, calculation, and uses of the median for raw and grouped data.'
---

## What is Median?

**Median is the middle value of a dataset when the observations are arranged in ascending order.** It is another important measure of central tendency.

In simple words:

> **Median gives us one value that represents the middle position of the data.**

## Why do we use Median?

Suppose the marks of 5 students are **40, 50, 60, 70, 80**. The middle value is **60**. So we can say:

> **The median mark is 60.**

Median is especially useful when the data contains **extreme values** or is **skewed**, because it is not strongly affected by very large or very small observations.

## How do we calculate Median?

### Step 1: Arrange the data in ascending order

### Step 2: Find the middle position

- If the number of values **$n$ is odd**, the median is the value at position $\dfrac{n+1}{2}$.
- If the number of values **$n$ is even**, the median is the average of the two middle values at positions $\dfrac{n}{2}$ and $\dfrac{n}{2}+1$.

### Example 1: Odd number of values

Data: **10, 30, 20, 50, 40**

Arrange in order: **10, 20, 30, 40, 50**

Here $n=5$, which is odd.

$$
\text{Median position}=\frac{5+1}{2}=3
$$

The 3rd value is **30**.

Therefore, **Median = 30**.

### Example 2: Even number of values

Data: **10, 20, 30, 40**

Here $n=4$, which is even.

$$
\text{Median}=\frac{20+30}{2}=25
$$

Therefore, **Median = 25**.

## Formula of Median

For **ungrouped data**:

$$
\boxed{\text{Median}=\text{Middle value after ordering the data}}
$$

For **grouped data**, first find the total frequency $N=\sum f$. The **median class** is the first class whose cumulative frequency is greater than $N/2$.

$$
\boxed{\text{Median}=l+\left(\frac{N/2-cf}{f}\right)h}
$$

Here:

- $l$ = lower limit of the median class
- $cf$ = cumulative frequency before the median class
- $f$ = frequency of the median class
- $h$ = class width

### Worked example: grouped data

| Marks | 10-20 | 20-30 | 30-40 | 40-50 | 50-60 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Frequency | 3 | 5 | 8 | 4 | 2 |
| Cumulative frequency | 3 | 8 | 16 | 20 | 22 |

Here $N=22$, so $N/2=11$.

The first cumulative frequency greater than 11 is **16**, so the median class is **30-40**.

Therefore $l=30$, $cf=8$, $f=8$, and $h=10$.

$$
\text{Median}=30+\left(\frac{11-8}{8}\right)10
=30+\frac{30}{8}
=33.75
$$

The median score is approximately **33.75 marks**.

## Important point

Median depends on **position**, not on every individual value. That is why it is more reliable than the mean when the data contains outliers.

## Effect of Extreme Values

For the data **10, 20, 30, 40, 50**:

$$
\text{Median}=30
$$

If 50 becomes 500, the ordered data becomes **10, 20, 30, 40, 500**:

$$
\text{Median}=30
$$

The median stays the same, even though one value changed drastically.

Compare this with the mean, which would increase sharply. This is why median is preferred for income data, house prices, and other skewed distributions.

## Remember

- Median gives the middle value of ordered data.
- For odd $n$, take the middle observation.
- For even $n$, average the two middle observations.
- For grouped data, locate the median class using cumulative frequency.
- Median is less affected by extreme values than the mean.
