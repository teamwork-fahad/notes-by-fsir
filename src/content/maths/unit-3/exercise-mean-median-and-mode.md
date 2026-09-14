---
title: Exercise — Mean, Median and Mode
description: covering mean, median and mode with step-by-step solutions.
---

This exercise contains questions based on **Mean, Median and Mode**.

:::tip
Try to solve each question yourself first. Then click **Show Solution** to check your answer.
:::

---

## Question 1

The following frequency distribution gives the monthly consumption of electricity of 68 consumers of a locality. Find the **median, mean and mode** of the data and compare them.

| Monthly consumption (in units) | Number of consumers |
| ------------------------------ | ------------------- |
| 65–85                          | 4                   |
| 85–105                         | 5                   |
| 105–125                        | 13                  |
| 125–145                        | 20                  |
| 145–165                        | 14                  |
| 165–185                        | 8                   |
| 185–205                        | 4                   |

<details>
<summary>Show Solution</summary>

#### Step 1: Find the Mean

Find the class marks:

| Class     | Frequency (f) | Class Mark (x) | fx       |
| --------- | ------------- | -------------- | -------- |
| 65–85     | 4             | 75             | 300      |
| 85–105    | 5             | 95             | 475      |
| 105–125   | 13            | 115            | 1495     |
| 125–145   | 20            | 135            | 2700     |
| 145–165   | 14            | 155            | 2170     |
| 165–185   | 8             | 175            | 1400     |
| 185–205   | 4             | 195            | 780      |
| **Total** | **68**        |                | **9320** |

Formula:

$$
Mean = \frac{\sum fx}{\sum f}
$$

$$
Mean = \frac{9320}{68}
$$

$$
\boxed{Mean \approx 137.06}
$$

#### Step 2: Find the Median

Total frequency:

$$
N=68
$$

$$
\frac{N}{2}=34
$$

Cumulative frequency:

| Class       | f      | C.F.   |
| ----------- | ------ | ------ |
| 65–85       | 4      | 4      |
| 85–105      | 5      | 9      |
| 105–125     | 13     | 22     |
| **125–145** | **20** | **42** |
| 145–165     | 14     | 56     |
| 165–185     | 8      | 64     |
| 185–205     | 4      | 68     |

The 34th observation lies in **125–145**.

Therefore, median class = **125–145**.

For this class:

```text
L = 125
C.F. = 22
f = 20
h = 20
```

Formula:

$$
Median = L+\left(\frac{N/2-C.F.}{f}\right)\times h
$$

$$
Median = 125+\left(\frac{34-22}{20}\right)\times20
$$

$$
Median=125+12
$$

$$
\boxed{Median=137}
$$

#### Step 3: Find the Mode

The highest frequency is **20**, so the modal class is **125–145**.

For this class:

```text
L = 125
f₁ = 20
f₀ = 13
f₂ = 14
h = 20
```

Formula:

$$
Mode=L+\left(\frac{f_1-f_0}{2f_1-f_0-f_2}\right)\times h
$$

$$
Mode=125+\left(\frac{20-13}{40-13-14}\right)\times20
$$

$$
Mode=125+\frac{7}{13}\times20
$$

$$
\boxed{Mode\approx135.77}
$$

#### Comparison

$$
\boxed{Mean\approx137.06}
$$

$$
\boxed{Median=137}
$$

$$
\boxed{Mode\approx135.77}
$$

Therefore:

$$
\boxed{Mean>Median>Mode}
$$

</details>

---

## Question 2

If the median of the distribution given below is **28.5**, find the values of **x** and **y**.

| Class Interval | Frequency |
| -------------- | --------- |
| 0–10           | 5         |
| 10–20          | x         |
| 20–30          | 20        |
| 30–40          | 15        |
| 40–50          | y         |
| 50–60          | 5         |
| **Total**      | **60**    |

<details>
<summary>Show Solution</summary>

#### Step 1: Find x

Given:

$$
Median=28.5
$$

The median class is **20–30**.

Here:

```text
L = 20
N = 60
N/2 = 30
C.F. = 5 + x
f = 20
h = 10
```

Using:

$$
Median=L+\left(\frac{N/2-C.F.}{f}\right)\times h
$$

Substitute:

$$
28.5=20+\left(\frac{30-(5+x)}{20}\right)\times10
$$

$$
8.5=\frac{25-x}{2}
$$

$$
17=25-x
$$

$$
\boxed{x=8}
$$

#### Step 2: Find y

Total frequency is 60.

$$
5+x+20+15+y+5=60
$$

Put $x=8$:

$$
5+8+20+15+y+5=60
$$

$$
53+y=60
$$

$$
\boxed{y=7}
$$

#### Answer

$$
\boxed{x=8,\quad y=7}
$$

</details>

---

## Question 3

A life insurance agent found the following data for distribution of ages of 100 policy holders. Calculate the **median age**, if policies are given only to persons having **18 years onwards but less than 60 years**.

| Age      | Number of policy holders |
| -------- | ------------------------ |
| Below 20 | 2                        |
| Below 25 | 6                        |
| Below 30 | 24                       |
| Below 35 | 45                       |
| Below 40 | 78                       |
| Below 45 | 89                       |
| Below 50 | 92                       |
| Below 55 | 98                       |
| Below 60 | 100                      |

<details>
<summary>Show Solution</summary>

The given table is a **less-than cumulative frequency distribution**.

Convert it into a frequency table:

| Age Group | Frequency | C.F.   |
| --------- | --------- | ------ |
| 18–20     | 2         | 2      |
| 20–25     | 4         | 6      |
| 25–30     | 18        | 24     |
| 30–35     | 21        | 45     |
| **35–40** | **33**    | **78** |
| 40–45     | 11        | 89     |
| 45–50     | 3         | 92     |
| 50–55     | 6         | 98     |
| 55–60     | 2         | 100    |

Here:

$$
N=100
$$

$$
\frac{N}{2}=50
$$

The first C.F. greater than 50 is **78**.

Therefore, the median class is **35–40**.

Values:

```text
L = 35
C.F. = 45
f = 33
h = 5
```

Formula:

$$
Median=L+\left(\frac{N/2-C.F.}{f}\right)\times h
$$

$$
Median=35+\left(\frac{50-45}{33}\right)\times5
$$

$$
Median=35+\frac{25}{33}
$$

$$
\boxed{Median\approx35.76\text{ years}}
$$

</details>

---

## Question 4

The lengths of 40 leaves of a plant are measured correct to the nearest millimetre, and the data obtained is represented in the following table. Find the **median length of the leaves**.

| Length (in mm) | Number of leaves |
| -------------- | ---------------- |
| 118–126        | 3                |
| 127–135        | 5                |
| 136–144        | 9                |
| 145–153        | 12               |
| 154–162        | 5                |
| 163–171        | 4                |
| 172–180        | 2                |

:::note
The data must be converted to continuous classes because the median formula assumes continuous classes.
:::

<details>
<summary>Show Solution</summary>

#### Step 1: Convert into continuous classes

Since the measurements are given to the nearest millimetre:

```text
118–126 → 117.5–126.5
127–135 → 126.5–135.5
136–144 → 135.5–144.5
145–153 → 144.5–153.5
154–162 → 153.5–162.5
163–171 → 162.5–171.5
172–180 → 171.5–180.5
```

#### Step 2: Find the Median Class

Total:

$$
N=40
$$

$$
\frac{N}{2}=20
$$

Cumulative frequencies:

| Continuous Class | f      | C.F.   |
| ---------------- | ------ | ------ |
| 117.5–126.5      | 3      | 3      |
| 126.5–135.5      | 5      | 8      |
| 135.5–144.5      | 9      | 17     |
| **144.5–153.5**  | **12** | **29** |
| 153.5–162.5      | 5      | 34     |
| 162.5–171.5      | 4      | 38     |
| 171.5–180.5      | 2      | 40     |

The 20th observation lies in **144.5–153.5**.

Therefore:

```text
L = 144.5
C.F. = 17
f = 12
h = 9
```

#### Step 3: Apply the Formula

$$
Median=L+\left(\frac{N/2-C.F.}{f}\right)\times h
$$

$$
Median=144.5+\left(\frac{20-17}{12}\right)\times9
$$

$$
Median=144.5+2.25
$$

$$
\boxed{Median=146.75\text{ mm}}
$$

</details>

---

## Question 5

The following table gives the distribution of the life time of **400 neon lamps**. Find the **median life time of a lamp**.

| Life time (in hours) | Number of lamps |
| -------------------- | --------------- |
| 1500–2000            | 14              |
| 2000–2500            | 56              |
| 2500–3000            | 60              |
| 3000–3500            | 86              |
| 3500–4000            | 74              |
| 4000–4500            | 62              |
| 4500–5000            | 48              |

<details>
<summary>Show Solution</summary>

#### Step 1: Find C.F.

| Life time     | f      | C.F.    |
| ------------- | ------ | ------- |
| 1500–2000     | 14     | 14      |
| 2000–2500     | 56     | 70      |
| 2500–3000     | 60     | 130     |
| **3000–3500** | **86** | **216** |
| 3500–4000     | 74     | 290     |
| 4000–4500     | 62     | 352     |
| 4500–5000     | 48     | 400     |

Total:

$$
N=400
$$

$$
\frac{N}{2}=200
$$

The first C.F. greater than 200 is **216**.

Therefore, the median class is **3000–3500**.

Values:

```text
L = 3000
C.F. = 130
f = 86
h = 500
```

#### Step 2: Apply the Formula

$$
Median=L+\left(\frac{N/2-C.F.}{f}\right)\times h
$$

$$
Median=3000+\left(\frac{200-130}{86}\right)\times500
$$

$$
Median=3000+\frac{70}{86}\times500
$$

$$
Median\approx3000+406.98
$$

$$
\boxed{Median\approx3406.98\text{ hours}}
$$

</details>

---

## Question 6

100 surnames were randomly picked up from a local telephone directory and the frequency distribution of the number of letters in the English alphabets in the surnames was obtained as follows:

| Number of letters  | 1–4 | 4–7 | 7–10 | 10–13 | 13–16 | 16–19 |
| ------------------ | --- | --- | ---- | ----- | ----- | ----- |
| Number of surnames | 6   | 30  | 40   | 16    | 4     | 4     |

Determine:

1. The median number of letters in the surnames.
2. The mean number of letters in the surnames.
3. The modal size of the surnames.

<details>
<summary>Show Solution</summary>

#### Part A: Median

Total:

$$
N=100
$$

$$
\frac{N}{2}=50
$$

Cumulative frequency:

| Class    | f      | C.F.   |
| -------- | ------ | ------ |
| 1–4      | 6      | 6      |
| 4–7      | 30     | 36     |
| **7–10** | **40** | **76** |
| 10–13    | 16     | 92     |
| 13–16    | 4      | 96     |
| 16–19    | 4      | 100    |

The 50th observation lies in **7–10**.

Values:

```text
L = 7
C.F. = 36
f = 40
h = 3
```

$$
Median=7+\left(\frac{50-36}{40}\right)\times3
$$

$$
Median=7+1.05
$$

$$
\boxed{Median=8.05}
$$

#### Part B: Mean

Class marks:

```text
2.5, 5.5, 8.5, 11.5, 14.5, 17.5
```

| Class     | f       | x    | fx      |
| --------- | ------- | ---- | ------- |
| 1–4       | 6       | 2.5  | 15      |
| 4–7       | 30      | 5.5  | 165     |
| 7–10      | 40      | 8.5  | 340     |
| 10–13     | 16      | 11.5 | 184     |
| 13–16     | 4       | 14.5 | 58      |
| 16–19     | 4       | 17.5 | 70      |
| **Total** | **100** |      | **832** |

$$
Mean=\frac{\sum fx}{\sum f}
$$

$$
Mean=\frac{832}{100}
$$

$$
\boxed{Mean=8.32}
$$

#### Part C: Mode

The highest frequency is **40**, so the modal class is **7–10**.

Values:

```text
L = 7
f₁ = 40
f₀ = 30
f₂ = 16
h = 3
```

Formula:

$$
Mode=L+\left(\frac{f_1-f_0}{2f_1-f_0-f_2}\right)\times h
$$

$$
Mode=7+\left(\frac{40-30}{80-30-16}\right)\times3
$$

$$
Mode=7+\frac{10}{34}\times3
$$

$$
\boxed{Mode\approx7.88}
$$

#### Final Answers

```text
Median = 8.05 letters
Mean   = 8.32 letters
Mode   ≈ 7.88 letters
```

</details>

---

## Question 7

The distribution below gives the weights of 30 students of a class. Find the **median weight** of the students.

| Weight (in kg) | Number of students |
| -------------- | ------------------ |
| 40–45          | 2                  |
| 45–50          | 3                  |
| 50–55          | 8                  |
| 55–60          | 6                  |
| 60–65          | 6                  |
| 65–70          | 3                  |
| 70–75          | 2                  |

<details>
<summary>Show Solution</summary>

#### Step 1: Find C.F.

| Weight    | f     | C.F.   |
| --------- | ----- | ------ |
| 40–45     | 2     | 2      |
| 45–50     | 3     | 5      |
| 50–55     | 8     | 13     |
| **55–60** | **6** | **19** |
| 60–65     | 6     | 25     |
| 65–70     | 3     | 28     |
| 70–75     | 2     | 30     |

Total:

$$
N=30
$$

$$
\frac{N}{2}=15
$$

The first C.F. greater than 15 is **19**.

Therefore, the median class is **55–60**.

Values:

```text
L = 55
C.F. = 13
f = 6
h = 5
```

#### Step 2: Apply the Formula

$$
Median=L+\left(\frac{N/2-C.F.}{f}\right)\times h
$$

$$
Median=55+\left(\frac{15-13}{6}\right)\times5
$$

$$
Median=55+\frac{10}{6}
$$

$$
Median=56.67
$$

#### Answer

$$
\boxed{Median\approx56.67\text{ kg}}
$$

</details>

---

## Quick Answer Key

| Question | Answer                                                 |
| -------- | ------------------------------------------------------ |
| Q1       | Mean ≈ **137.06**, Median = **137**, Mode ≈ **135.77** |
| Q2       | **x = 8, y = 7**                                       |
| Q3       | Median ≈ **35.76 years**                               |
| Q4       | Median = **146.75 mm**                                 |
| Q5       | Median ≈ **3406.98 hours**                             |
| Q6       | Median = **8.05**, Mean = **8.32**, Mode ≈ **7.88**    |
| Q7       | Median ≈ **56.67 kg**                                  |
