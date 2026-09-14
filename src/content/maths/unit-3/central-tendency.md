---
title: '3.3 Measures of Central Tendency'
description: 'A complete tutorial on mean, median, mode, cumulative frequency, and grouped-data exercises.'
---

Central tendency gives one useful value that represents a whole dataset. This chapter extends the familiar ideas of **mean, median, and mode** from individual observations to frequency tables and grouped data.

<div style="text-align: center;">
  <img src="/images/central-tendency.png" alt="Mean, median and mode" style="max-width: 100%; border-radius: 12px;" />
</div>

## Learning goals

By the end of this lesson, you should be able to:

- choose mean, median, or mode for a situation;
- calculate a grouped mean by the direct, assumed-mean, and step-deviation methods;
- identify a modal class and calculate the grouped mode;
- construct cumulative frequencies and use them to find a grouped median;
- solve exam-style exercises and check your answers.

## 1. Which measure should you use?

| Measure | What it tells us | Best used when |
| --- | --- | --- |
| **Mean** | The average of all observations | Every value matters and extreme values are not dominant |
| **Median** | The middle position after ordering | The data contains extreme values or is skewed |
| **Mode** | The most common value or class | We need the most popular, frequent, or typical choice |

> **Exam definition:** A measure of central tendency is a single value used to represent a set of observations.

## 2. Mean of grouped data

For a frequency table, $x_i$ is an observation or class mark and $f_i$ is its frequency. The total number of observations is $N=\sum f_i$.

$$
\boxed{\bar{x}=\frac{\sum f_i x_i}{\sum f_i}}
$$

For a class interval, use its midpoint as the class mark:

$$
x_i=\frac{\text{lower limit}+\text{upper limit}}{2}
$$

### Worked example: direct method

Find the mean of this distribution.

| Marks | 10-25 | 25-40 | 40-55 | 55-70 | 70-85 | 85-100 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Frequency $f_i$ | 2 | 3 | 7 | 6 | 6 | 6 |
| Class mark $x_i$ | 17.5 | 32.5 | 47.5 | 62.5 | 77.5 | 92.5 |
| $f_i x_i$ | 35 | 97.5 | 332.5 | 375 | 465 | 555 |

Here, $\sum f_i=30$ and $\sum f_i x_i=1860$.

$$
\bar{x}=\frac{1860}{30}=62
$$

The grouped mean is **62 marks**. It is approximate because every observation in a class is represented by its midpoint.

### Assumed-mean method

When the class marks are large, choose a convenient assumed mean $a$. Define the deviation $d_i=x_i-a$.

$$
\boxed{\bar{x}=a+\frac{\sum f_i d_i}{\sum f_i}}
$$

For the table above, choose $a=47.5$. The deviations are $-30,-15,0,15,30,45$, so:

$$
\sum f_i d_i=-60-45+0+90+180+270=435
$$

$$
\bar{x}=47.5+\frac{435}{30}=62
$$

The answer does not depend on which class mark is selected as $a$.

### Step-deviation method

If the deviations have a common factor, divide them by a convenient class size $h$:

$$
u_i=\frac{x_i-a}{h}
$$

Then calculate the mean using:

$$
\boxed{\bar{x}=a+h\left(\frac{\sum f_i u_i}{\sum f_i}\right)}
$$

For the same table, $a=47.5$, $h=15$, and $\sum f_i u_i=29$.

$$
\bar{x}=47.5+15\left(\frac{29}{30}\right)=62
$$

> **Method choice:** Use the direct method for small values, the assumed-mean method for large values, and step-deviation when the deviations share a convenient factor.

## 3. Mode of grouped data

The class with the greatest frequency is the **modal class**. A grouped table does not tell us the exact most frequent observation, so we estimate it inside that class.

$$
\boxed{\text{Mode}=l+\left(\frac{f_1-f_0}{2f_1-f_0-f_2}\right)h}
$$

Here:

- $l$ is the lower limit of the modal class;
- $h$ is the class width;
- $f_1$ is the modal-class frequency;
- $f_0$ is the preceding-class frequency;
- $f_2$ is the succeeding-class frequency.

### Worked example

| Family size | 1-3 | 3-5 | 5-7 | 7-9 | 9-11 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Families | 7 | 8 | 2 | 2 | 1 |

The modal class is $3-5$. Thus $l=3$, $h=2$, $f_1=8$, $f_0=7$, and $f_2=2$.

$$
	ext{Mode}=3+\left(\frac{8-7}{2(8)-7-2}\right)2
=3+\frac{2}{7}\approx3.286
$$

So the estimated modal family size is **3.286 members**.

## 4. Cumulative frequency

Cumulative frequency is the running total of frequencies.

| Marks | Frequency | Cumulative frequency |
| --- | ---: | ---: |
| 0-10 | 5 | 5 |
| 10-20 | 3 | 8 |
| 20-30 | 4 | 12 |
| 30-40 | 3 | 15 |
| 40-50 | 3 | 18 |
| 50-60 | 4 | 22 |
| 60-70 | 7 | 29 |
| 70-80 | 9 | 38 |
| 80-90 | 7 | 45 |
| 90-100 | 8 | 53 |

This is a **less-than cumulative frequency distribution** because each total counts observations below the upper class limit. A more-than distribution starts with the total and subtracts frequencies as the lower limit increases.

## 5. Median of grouped data

First calculate $N=\sum f$. The **median class** is the first class whose cumulative frequency is greater than $N/2$.

$$
\boxed{\text{Median}=l+\left(\frac{N/2-cf}{f}\right)h}
$$

Here $l$ is the lower limit of the median class, $cf$ is the cumulative frequency before that class, $f$ is its frequency, and $h$ is its width.

### Worked example

In the cumulative table above, $N=53$, so $N/2=26.5$. The first cumulative frequency above 26.5 is 29, so the median class is $60-70$.

Therefore $l=60$, $cf=22$, $f=7$, and $h=10$.

$$
	ext{Median}=60+\left(\frac{26.5-22}{7}\right)10
=60+\frac{45}{7}\approx66.4
$$

The median score is approximately **66.4 marks**.

> **Important:** Before applying grouped median or mode formulae, make sure the class intervals are continuous. For measurements recorded to the nearest unit, use class boundaries such as $117.5-126.5$ instead of $118-126$.

## 6. Mean, median, and mode together

For a moderately skewed distribution, an empirical relationship is often used:

$$
\boxed{3\,\text{Median}=\text{Mode}+2\,\text{Mean}}
$$

This is an approximate relationship, not a universal identity. Mean uses every value, median resists extreme values, and mode highlights the most frequent group.

## Practice exercises

Try each question before opening its answer. Write the class marks and cumulative frequencies in your notebook where needed.

### Exercise A: mean

Find the mean daily expenditure.

| Expenditure (Rs) | 100-150 | 150-200 | 200-250 | 250-300 | 300-350 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Households | 4 | 5 | 12 | 2 | 2 |

<details>
<summary>Show answer</summary>

Class marks are 125, 175, 225, 275, and 325. The mean is:

$$
\bar{x}=\frac{4(125)+5(175)+12(225)+2(275)+2(325)}{25}=211
$$

**Answer: Rs 211**.
</details>

### Exercise B: mode

Find the mode.

| Number of cars | 0-10 | 10-20 | 20-30 | 30-40 | 40-50 | 50-60 | 60-70 | 70-80 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Frequency | 7 | 14 | 13 | 12 | 20 | 11 | 15 | 8 |

<details>
<summary>Show answer</summary>

The modal class is $40-50$. With $l=40$, $h=10$, $f_1=20$, $f_0=12$, and $f_2=11$:

$$
	ext{Mode}=40+\left(\frac{20-12}{40-12-11}\right)10\approx44.71
$$

**Answer: approximately 44.71 cars**.
</details>

### Exercise C: median

Find the median weight of the students.

| Weight (kg) | 40-45 | 45-50 | 50-55 | 55-60 | 60-65 | 65-70 | 70-75 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Students | 2 | 3 | 8 | 6 | 6 | 3 | 2 |

<details>
<summary>Show answer</summary>

$N=30$ and $N/2=15$. The cumulative frequencies are $2,5,13,19,25,28,30$, so the median class is $55-60$.

$$
	ext{Median}=55+\left(\frac{15-13}{6}\right)5\approx56.67\text{ kg}
$$

**Answer: approximately 56.67 kg**.
</details>

### Exercise D: choose the measure

Choose the most suitable measure and explain why.

1. The most popular colour of a new vehicle.
2. The typical income in a town where a few people earn exceptionally high salaries.
3. The average marks of all students in an examination.

<details>
<summary>Show answer</summary>

1. **Mode**, because it identifies the most common colour.
2. **Median**, because very high incomes would pull the mean upward.
3. **Mean**, because every student's mark contributes to the average.
</details>

## Quick revision checklist

- Find class marks before using the grouped mean.
- Use $\sum f_i$ as the total frequency.
- Locate the modal class using the greatest frequency.
- Locate the median class using the first $cf>N/2$.
- Check that class intervals are continuous before using median or mode formulae.
- State what the answer means in the context of the question.