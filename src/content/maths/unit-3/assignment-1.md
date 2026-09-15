---
title: 'Assignment 1 — Questions & Step-by-Step Solutions'
description: 'Complete step-by-step solutions for Statistics Assignment 1 covering Mean, Median, Mode, Quartiles, Deciles, Percentiles, Mean Deviation, C.V., and Harmonic Mean.'
chapter: 'Unit 3: Basic Statistics'
author: 'Fahad Sir'
order: 9
published: true
---

:::tip
📥 **Downloads & Web Version:**
- [📄 Download Assignment 1 Solutions PDF](/pdfs/Assignment_1_Solutions.pdf)
- [🌐 Open Full Interactive Web App](/assignments/assignment-1/index.html)
:::

# Statistics Assignment 1 – Complete Step-by-Step Solutions

> **Subject:** Business Statistics / Mathematical Statistics  
> **Topic:** Measures of Central Tendency & Measures of Dispersion  
> **Format:** Step-by-Step Easy Explanation with Formulae, Tables & Verification  

---

## Quick Navigation / Table of Contents

- [Question 1: Mean, Median and Mode (Continuous Distribution)](#question-1)
- [Question 2: Deciles $D_5$ and $D_9$](#question-2)
- [Question 3: Mean Deviation from Mean & Coefficient](#question-3)
- [Question 4: Coefficient of Variation (C.V.) – Inclusive Intervals](#question-4)
- [Question 5: Quartiles $Q_1$ and $Q_3$](#question-5)
- [Question 6: Quartile $Q_1$, Decile $D_8$, Percentile $P_{65}$](#question-6)
- [Question 7: Mean Deviation about Mean & Median (Individual Series)](#question-7)
- [Question 8: Mean Deviation about Median (Discrete Series)](#question-8)
- [Question 9: Decile $D_6$, Percentiles $P_{20}$ and $P_{100}$](#question-9)
- [Question 10: Missing Frequencies $f_1$ and $f_2$ (Continuous Series)](#question-10)
- [Question 11: Missing Frequencies $f_1$ and $f_2$ (Discrete Series)](#question-11)
- [Question 12: Harmonic Mean (H.M.)](#question-12)
- [Question 13: Statistical Definitions & Theory](#question-13)

---

<a id="question-1"></a>
## Question 1

**Problem Statement:**  
Find the **Mean**, **Median**, and **Mode** from the following data:

| Class Interval | Frequency ($f_i$) |
| :---: | :---: |
| 0–10 | 4 |
| 10–20 | 6 |
| 20–30 | 20 |
| 30–40 | 10 |
| 40–50 | 7 |
| 50–60 | 3 |

---

### Step-by-Step Solution:

#### Step 1: Prepare the Calculation Table
Find the mid-value ($x_i = \frac{\text{Lower} + \text{Upper}}{2}$), $f_i x_i$, and Cumulative Frequency ($cf$).

| Class | Frequency ($f_i$) | Mid-value ($x_i$) | $f_i x_i$ | Cumulative Frequency ($cf$) |
| :---: | :---: | :---: | :---: | :---: |
| 0–10 | 4 | 5 | $4 \times 5 = 20$ | 4 |
| 10–20 | 6 | 15 | $6 \times 15 = 90$ | 10 |
| 20–30 | 20 | 25 | $20 \times 25 = 500$ | 30 |
| 30–40 | 10 | 35 | $10 \times 35 = 350$ | 40 |
| 40–50 | 7 | 45 | $7 \times 45 = 315$ | 47 |
| 50–60 | 3 | 55 | $3 \times 55 = 165$ | 50 |
| **Total** | **$N = \sum f_i = 50$** | — | **$\sum f_i x_i = 1440$** | — |

---

#### Step 2: Calculate Arithmetic Mean ($\bar{x}$)
$$\bar{x} = \frac{\sum f_i x_i}{N}$$

$$\bar{x} = \frac{1440}{50} = 28.8$$

---

#### Step 3: Calculate Median
1. **Median Position:** $\frac{N}{2} = \frac{50}{2} = 25$.
2. In the cumulative frequency column, the value just $\ge 25$ is **30**, which belongs to the class **20–30**.
   - **Median Class:** $20 - 30$
   - Lower limit ($L$) = $20$
   - Cumulative frequency of preceding class ($cf$) = $10$
   - Frequency of median class ($f$) = $20$
   - Class width ($h$) = $10$

$$\text{Median} = L + \left( \frac{\frac{N}{2} - cf}{f} \right) \times h$$

$$\text{Median} = 20 + \left( \frac{25 - 10}{20} \right) \times 10 = 20 + \left( \frac{15}{20} \right) \times 10 = 20 + 7.5 = 27.5$$

---

#### Step 4: Calculate Mode
1. **Modal Class:** The class with the maximum frequency ($20$) is **20–30**.
   - Lower limit ($L$) = $20$
   - Frequency of modal class ($f_1$) = $20$
   - Frequency of preceding class ($f_0$) = $6$
   - Frequency of succeeding class ($f_2$) = $10$
   - Class width ($h$) = $10$

$$\text{Mode} = L + \left( \frac{f_1 - f_0}{2f_1 - f_0 - f_2} \right) \times h$$

$$\text{Mode} = 20 + \left( \frac{20 - 6}{2(20) - 6 - 10} \right) \times 10$$

$$\text{Mode} = 20 + \left( \frac{14}{40 - 16} \right) \times 10 = 20 + \left( \frac{14}{24} \right) \times 10 = 20 + 5.833 = 25.833$$

---

> ### **Final Answer (Q1):**
> - **Mean ($\bar{x}$):** `28.8`
> - **Median:** `27.5`
> - **Mode:** `25.83` (or $25\frac{5}{6}$)

---

<a id="question-2"></a>
## Question 2

**Problem Statement:**  
Find $D_5$ and $D_9$ for the following data:

| Class | Frequency ($f$) |
| :---: | :---: |
| 0–4 | 10 |
| 4–8 | 12 |
| 8–12 | 8 |
| 12–16 | 7 |
| 16–20 | 5 |
| 20–24 | 8 |
| 24–28 | 4 |
| 28–32 | 6 |

---

### Step-by-Step Solution:

#### Step 1: Cumulative Frequency Table
| Class Interval | Frequency ($f$) | Cumulative Frequency ($cf$) |
| :---: | :---: | :---: |
| 0–4 | 10 | 10 |
| 4–8 | 12 | 22 |
| 8–12 | 8 | 30 |
| 12–16 | 7 | 37 |
| 16–20 | 5 | 42 |
| 20–24 | 8 | 50 |
| 24–28 | 4 | 54 |
| 28–32 | 6 | 60 |
| **Total** | **$N = 60$** | — |

General Decile Formula:
$$D_k = L + \left( \frac{\frac{k \cdot N}{10} - cf}{f} \right) \times h$$

---

#### Step 2: Find $D_5$ (5th Decile / Median)
1. **Position:** $\frac{5N}{10} = \frac{5 \times 60}{10} = 30$.
2. In the $cf$ column, $30$ falls in the class **8–12**.
   - $L = 8$
   - $cf = 22$ (cumulative frequency of previous class)
   - $f = 8$
   - $h = 4$

$$D_5 = 8 + \left( \frac{30 - 22}{8} \right) \times 4 = 8 + \left( \frac{8}{8} \right) \times 4 = 8 + 4 = 12$$

---

#### Step 3: Find $D_9$ (9th Decile)
1. **Position:** $\frac{9N}{10} = \frac{9 \times 60}{10} = 54$.
2. In the $cf$ column, $54$ falls in the class **24–28**.
   - $L = 24$
   - $cf = 50$ (cumulative frequency of previous class)
   - $f = 4$
   - $h = 4$

$$D_9 = 24 + \left( \frac{54 - 50}{4} \right) \times 4 = 24 + \left( \frac{4}{4} \right) \times 4 = 24 + 4 = 28$$

---

> ### **Final Answer (Q2):**
> - **$D_5$:** `12`
> - **$D_9$:** `28`

---

<a id="question-3"></a>
## Question 3

**Problem Statement:**  
Find the **mean deviation from mean** and **co-efficient of mean deviation** for the following data:

| Class | Frequency ($f$) |
| :---: | :---: |
| 2–4 | 3 |
| 4–6 | 4 |
| 6–8 | 2 |
| 8–10 | 1 |

---

### Step-by-Step Solution:

#### Step 1: Calculate Mean ($\bar{x}$)
Midpoints $x_i = \frac{\text{Lower} + \text{Upper}}{2}$:
- Class 2–4: $x_1 = 3$
- Class 4–6: $x_2 = 5$
- Class 6–8: $x_3 = 7$
- Class 8–10: $x_4 = 9$

$$\sum f_i = 3 + 4 + 2 + 1 = 10$$
$$\sum f_i x_i = (3 \times 3) + (4 \times 5) + (2 \times 7) + (1 \times 9) = 9 + 20 + 14 + 9 = 52$$
$$\bar{x} = \frac{\sum f_i x_i}{N} = \frac{52}{10} = 5.2$$

---

#### Step 2: Calculate Absolute Deviations $|x_i - \bar{x}|$
Here $\bar{x} = 5.2$:
- $|3 - 5.2| = 2.2$
- $|5 - 5.2| = 0.2$
- $|7 - 5.2| = 1.8$
- $|9 - 5.2| = 3.8$

Table of Deviations:
| Class | $f_i$ | $x_i$ | $f_i x_i$ | $|x_i - \bar{x}|$ | $f_i |x_i - \bar{x}|$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 2–4 | 3 | 3 | 9 | 2.2 | $3 \times 2.2 = 6.6$ |
| 4–6 | 4 | 5 | 20 | 0.2 | $4 \times 0.2 = 0.8$ |
| 6–8 | 2 | 7 | 14 | 1.8 | $2 \times 1.8 = 3.6$ |
| 8–10 | 1 | 9 | 9 | 3.8 | $1 \times 3.8 = 3.8$ |
| **Total** | **$N = 10$** | — | **$\sum f_i x_i = 52$** | — | **$\sum f_i |x_i - \bar{x}| = 14.8$** |

---

#### Step 3: Compute Mean Deviation from Mean
$$MD(\bar{x}) = \frac{\sum f_i |x_i - \bar{x}|}{N} = \frac{14.8}{10} = 1.48$$

---

#### Step 4: Compute Coefficient of Mean Deviation
$$\text{Coefficient of } MD = \frac{MD(\bar{x})}{\bar{x}} = \frac{1.48}{5.2} = \frac{148}{520} = \frac{37}{130} \approx 0.2846 \text{ (or } 28.46\% \text{)}$$

---

> ### **Final Answer (Q3):**
> - **Mean Deviation from Mean:** `1.48`
> - **Coefficient of Mean Deviation:** `0.2846` (or `28.46%`)

---

<a id="question-4"></a>
## Question 4

**Problem Statement:**  
Calculate the **co-efficient of variation (C.V.)** from the following data:

| Age (in years) | 0–9 | 10–19 | 20–29 | 30–39 | 40–49 | 50–59 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **No. of persons ($f$)** | 13 | 38 | 67 | 76 | 22 | 4 |

---

### Step-by-Step Solution:

#### Step 1: Understand Inclusive Class Intervals
The class intervals are in inclusive form: $0–9, 10–19, \dots$  
- Class Boundaries: $-0.5 - 9.5$, $9.5 - 19.5$, $19.5 - 29.5$, $29.5 - 39.5$, $39.5 - 49.5$, $49.5 - 59.5$.  
- Class width $h = 10$.  
- Class mid-points ($x_i$):
  - $0–9$: $\frac{0 + 9}{2} = 4.5$
  - $10–19$: $\frac{10 + 19}{2} = 14.5$
  - $20–29$: $\frac{20 + 29}{2} = 24.5$
  - $30–39$: $\frac{30 + 39}{2} = 34.5$
  - $40–49$: $\frac{40 + 49}{2} = 44.5$
  - $50–59$: $\frac{50 + 59}{2} = 54.5$

#### Step 2: Step-Deviation Calculation Table
Let Assumed Mean $A = 24.5$, width $h = 10$.  
Step deviation: $u_i = \frac{x_i - 24.5}{10}$.

| Class (Age) | $f_i$ | Midpoint ($x_i$) | $u_i = \frac{x_i - 24.5}{10}$ | $f_i u_i$ | $u_i^2$ | $f_i u_i^2$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0–9 | 13 | 4.5 | -2 | -26 | 4 | 52 |
| 10–19 | 38 | 14.5 | -1 | -38 | 1 | 38 |
| 20–29 | 67 | 24.5 | 0 | 0 | 0 | 0 |
| 30–39 | 76 | 34.5 | +1 | 76 | 1 | 76 |
| 40–49 | 22 | 44.5 | +2 | 44 | 4 | 88 |
| 50–59 | 4 | 54.5 | +3 | 12 | 9 | 36 |
| **Total** | **$N = 220$** | — | — | **$\sum f_i u_i = 68$** | — | **$\sum f_i u_i^2 = 290$** |

---

#### Step 3: Compute Mean ($\bar{x}$)
$$\bar{x} = A + \left( \frac{\sum f_i u_i}{N} \right) \times h$$

$$\bar{x} = 24.5 + \left( \frac{68}{220} \right) \times 10 = 24.5 + \frac{680}{220} = 24.5 + 3.0909 = 27.5909 \text{ years}$$

---

#### Step 4: Compute Standard Deviation ($\sigma$)
$$\sigma = h \times \sqrt{ \frac{\sum f_i u_i^2}{N} - \left( \frac{\sum f_i u_i}{N} \right)^2 }$$

$$\frac{\sum f_i u_i^2}{N} = \frac{290}{220} \approx 1.318182$$

$$\left( \frac{\sum f_i u_i}{N} \right)^2 = \left( \frac{68}{220} \right)^2 = (0.309091)^2 \approx 0.095537$$

$$\text{Difference} = 1.318182 - 0.095537 = 1.222645$$

$$\sigma = 10 \times \sqrt{1.222645} = 10 \times 1.105733 = 11.0573 \text{ years}$$

---

#### Step 5: Compute Coefficient of Variation (C.V.)
$$C.V. = \frac{\sigma}{\bar{x}} \times 100$$

$$C.V. = \frac{11.0573}{27.5909} \times 100 \approx 40.076\% \approx 40.08\%$$

---

> ### **Final Answer (Q4):**
> - **Mean ($\bar{x}$):** `27.59 years`
> - **Standard Deviation ($\sigma$):** `11.06 years`
> - **Coefficient of Variation (C.V.):** `40.08%`

---

<a id="question-5"></a>
## Question 5

**Problem Statement:**  
Find $Q_1$ and $Q_3$ from the following data:

| Class Interval | 20–25 | 25–30 | 30–35 | 35–40 | 40–45 | 45–50 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Frequency ($f$)** | 5 | 12 | 15 | 8 | 5 | 5 |

---

### Step-by-Step Solution:

#### Step 1: Cumulative Frequency Table
| Class Interval | Frequency ($f$) | Cumulative Frequency ($cf$) |
| :---: | :---: | :---: |
| 20–25 | 5 | 5 |
| 25–30 | 12 | 17 |
| 30–35 | 15 | 32 |
| 35–40 | 8 | 40 |
| 40–45 | 5 | 45 |
| 45–50 | 5 | 50 |
| **Total** | **$N = 50$** | — |

General Quartile Formula:
$$Q_k = L + \left( \frac{\frac{k \cdot N}{4} - cf}{f} \right) \times h$$

---

#### Step 2: Calculate First Quartile ($Q_1$)
1. **Position:** $\frac{N}{4} = \frac{50}{4} = 12.5$.
2. $cf$ just $\ge 12.5$ is **17**, corresponding to class **25–30**.
   - Lower limit ($L$) = $25$
   - Preceding cumulative frequency ($cf$) = $5$
   - Frequency ($f$) = $12$
   - Class width ($h$) = $5$

$$Q_1 = 25 + \left( \frac{12.5 - 5}{12} \right) \times 5 = 25 + \left( \frac{7.5}{12} \right) \times 5 = 25 + 3.125 = 28.125$$

---

#### Step 3: Calculate Third Quartile ($Q_3$)
1. **Position:** $\frac{3N}{4} = \frac{3 \times 50}{4} = 37.5$.
2. $cf$ just $\ge 37.5$ is **40**, corresponding to class **35–40**.
   - Lower limit ($L$) = $35$
   - Preceding cumulative frequency ($cf$) = $32$
   - Frequency ($f$) = $8$
   - Class width ($h$) = $5$

$$Q_3 = 35 + \left( \frac{37.5 - 32}{8} \right) \times 5 = 35 + \left( \frac{5.5}{8} \right) \times 5 = 35 + \frac{27.5}{8} = 35 + 3.4375 = 38.4375$$

---

> ### **Final Answer (Q5):**
> - **First Quartile ($Q_1$):** `28.125`
> - **Third Quartile ($Q_3$):** `38.4375`

---

<a id="question-6"></a>
## Question 6

**Problem Statement:**  
Find $Q_1$, $D_8$, and $P_{65}$ from the following data:

| Class Interval | 20–30 | 30–40 | 40–50 | 50–60 | 60–70 | 70–80 | 80–90 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Frequency ($f$)** | 69 | 167 | 207 | 65 | 58 | 27 | 10 |

---

### Step-by-Step Solution:

#### Step 1: Cumulative Frequency Table
| Class Interval | Frequency ($f$) | Cumulative Frequency ($cf$) |
| :---: | :---: | :---: |
| 20–30 | 69 | 69 |
| 30–40 | 167 | 236 |
| 40–50 | 207 | 443 |
| 50–60 | 65 | 508 |
| 60–70 | 58 | 566 |
| 70–80 | 27 | 593 |
| 80–90 | 10 | 603 |
| **Total** | **$N = 603$** | — |

---

#### Step 2: Find First Quartile ($Q_1$)
- **Position:** $\frac{N}{4} = \frac{603}{4} = 150.75$.
- $cf$ just $\ge 150.75$ is $236$ $\implies$ Class **30–40**.
- $L = 30, cf = 69, f = 167, h = 10$.

$$Q_1 = 30 + \left( \frac{150.75 - 69}{167} \right) \times 10 = 30 + \left( \frac{81.75}{167} \right) \times 10 = 30 + 4.8952 = 34.8952$$

---

#### Step 3: Find 8th Decile ($D_8$)
- **Position:** $\frac{8N}{10} = \frac{8 \times 603}{10} = 482.4$.
- $cf$ just $\ge 482.4$ is $508$ $\implies$ Class **50–60**.
- $L = 50, cf = 443, f = 65, h = 10$.

$$D_8 = 50 + \left( \frac{482.4 - 443}{65} \right) \times 10 = 50 + \left( \frac{39.4}{65} \right) \times 10 = 50 + 6.0615 = 56.0615$$

---

#### Step 4: Find 65th Percentile ($P_{65}$)
- **Position:** $\frac{65N}{100} = \frac{65 \times 603}{100} = 391.95$.
- $cf$ just $\ge 391.95$ is $443$ $\implies$ Class **40–50**.
- $L = 40, cf = 236, f = 207, h = 10$.

$$P_{65} = 40 + \left( \frac{391.95 - 236}{207} \right) \times 10 = 40 + \left( \frac{155.95}{207} \right) \times 10 = 40 + 7.5338 = 47.5338$$

---

> ### **Final Answer (Q6):**
> - **$Q_1$:** `34.90`
> - **$D_8$:** `56.06`
> - **$P_{65}$:** `47.53`

---

<a id="question-7"></a>
## Question 7

**Problem Statement:**  
Find the **mean deviation about mean** and **mean deviation about median** for the following data:  
**Data values:** $3, 9, 5, 3, 12, 10, 18, 4, 7, 19, 21$

---

### Step-by-Step Solution:

Total observations: $n = 11$.

#### Part A: Mean Deviation about Mean ($MD_{\bar{x}}$)
1. **Compute Mean ($\bar{x}$):**
   $$\sum x_i = 3 + 9 + 5 + 3 + 12 + 10 + 18 + 4 + 7 + 19 + 21 = 111$$
   $$\bar{x} = \frac{111}{11} \approx 10.0909$$

2. **Compute Absolute Deviations $|x_i - \bar{x}|$:**
   - $|3 - 10.0909| = 7.0909$
   - $|9 - 10.0909| = 1.0909$
   - $|5 - 10.0909| = 5.0909$
   - $|3 - 10.0909| = 7.0909$
   - $|12 - 10.0909| = 1.9091$
   - $|10 - 10.0909| = 0.0909$
   - $|18 - 10.0909| = 7.9091$
   - $|4 - 10.0909| = 6.0909$
   - $|7 - 10.0909| = 3.0909$
   - $|19 - 10.0909| = 8.9091$
   - $|21 - 10.0909| = 10.9091$

   $$\sum |x_i - \bar{x}| = 59.2727$$

3. **Calculate $MD(\bar{x})$:**
   $$MD(\bar{x}) = \frac{\sum |x_i - \bar{x}|}{n} = \frac{59.2727}{11} \approx 5.3884$$

---

#### Part B: Mean Deviation about Median ($MD_{\text{Med}}$)
1. **Find Median ($M$):**
   Arrange the data in ascending order:
   $$3, 3, 4, 5, 7, \mathbf{9}, 10, 12, 18, 19, 21$$
   Since $n = 11$ is odd:
   $$\text{Median} = \left(\frac{n+1}{2}\right)\text{-th observation} = 6\text{-th observation} = 9$$

2. **Compute Absolute Deviations $|x_i - M| = |x_i - 9|$:**
   - $|3 - 9| = 6$
   - $|3 - 9| = 6$
   - $|4 - 9| = 5$
   - $|5 - 9| = 4$
   - $|7 - 9| = 2$
   - $|9 - 9| = 0$
   - $|10 - 9| = 1$
   - $|12 - 9| = 3$
   - $|18 - 9| = 9$
   - $|19 - 9| = 10$
   - $|21 - 9| = 12$

   $$\sum |x_i - M| = 6 + 6 + 5 + 4 + 2 + 0 + 1 + 3 + 9 + 10 + 12 = 58$$

3. **Calculate $MD(\text{Median})$:**
   $$MD(M) = \frac{\sum |x_i - M|}{n} = \frac{58}{11} \approx 5.2727$$

---

> ### **Final Answer (Q7):**
> - **Mean:** `10.09`
> - **Mean Deviation about Mean:** `5.39`
> - **Median:** `9`
> - **Mean Deviation about Median:** `5.27`

---

<a id="question-8"></a>
## Question 8

**Problem Statement:**  
Find the **mean deviation about median** for the following data:

| $x_i$ | 3 | 6 | 9 | 12 | 13 | 15 | 21 | 22 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$f_i$** | 3 | 4 | 5 | 2 | 4 | 5 | 4 | 3 |

---

### Step-by-Step Solution:

#### Step 1: Find Median for Discrete Distribution
Compute Cumulative Frequency:
| $x_i$ | $f_i$ | Cumulative Frequency ($cf$) |
| :---: | :---: | :---: |
| 3 | 3 | 3 |
| 6 | 4 | 7 |
| 9 | 5 | 12 |
| 12 | 2 | 14 |
| **13** | **4** | **18** |
| 15 | 5 | 23 |
| 21 | 4 | 27 |
| 22 | 3 | 30 |
| **Total** | **$N = 30$** | — |

- Total observations: $N = 30$.
- Median position = $\frac{N}{2} = \frac{30}{2} = 15$ (or $\frac{N+1}{2} = 15.5$).
- The cumulative frequency just greater than 15 is **18**, which corresponds to $x_i = 13$.
$$\text{Median } (M) = 13$$

---

#### Step 2: Compute Table for Deviations from Median
| $x_i$ | $f_i$ | $|x_i - M| = |x_i - 13|$ | $f_i |x_i - M|$ |
| :---: | :---: | :---: | :---: |
| 3 | 3 | $|3 - 13| = 10$ | $3 \times 10 = 30$ |
| 6 | 4 | $|6 - 13| = 7$ | $4 \times 7 = 28$ |
| 9 | 5 | $|9 - 13| = 4$ | $5 \times 4 = 20$ |
| 12 | 2 | $|12 - 13| = 1$ | $2 \times 1 = 2$ |
| 13 | 4 | $|13 - 13| = 0$ | $4 \times 0 = 0$ |
| 15 | 5 | $|15 - 13| = 2$ | $5 \times 2 = 10$ |
| 21 | 4 | $|21 - 13| = 8$ | $4 \times 8 = 32$ |
| 22 | 3 | $|22 - 13| = 9$ | $3 \times 9 = 27$ |
| **Total** | **$N = 30$** | — | **$\sum f_i |x_i - M| = 149$** |

---

#### Step 3: Calculate Mean Deviation about Median
$$MD(\text{Median}) = \frac{\sum f_i |x_i - M|}{N}$$

$$MD(M) = \frac{149}{30} \approx 4.9667$$

---

> ### **Final Answer (Q8):**
> - **Median ($M$):** `13`
> - **Mean Deviation about Median:** `4.97` (or $\frac{149}{30}$)

---

<a id="question-9"></a>
## Question 9

**Problem Statement:**  
Find $D_6$, $P_{20}$, and $P_{100}$ from the following data:

| Class Interval | 0–10 | 10–20 | 20–30 | 30–40 | 40–50 | 50–60 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Frequency ($f$)** | 5 | 8 | 21 | 8 | 5 | 4 |

---

### Step-by-Step Solution:

#### Step 1: Cumulative Frequency Table
| Class Interval | Frequency ($f$) | Cumulative Frequency ($cf$) |
| :---: | :---: | :---: |
| 0–10 | 5 | 5 |
| 10–20 | 8 | 13 |
| 20–30 | 21 | 34 |
| 30–40 | 8 | 42 |
| 40–50 | 5 | 47 |
| 50–60 | 4 | 51 |
| **Total** | **$N = 51$** | — |

---

#### Step 2: Calculate $D_6$ (6th Decile)
- **Position:** $\frac{6N}{10} = \frac{6 \times 51}{10} = 30.6$.
- $cf$ just $\ge 30.6$ is $34$ $\implies$ Class **20–30**.
- $L = 20, cf = 13, f = 21, h = 10$.

$$D_6 = 20 + \left( \frac{30.6 - 13}{21} \right) \times 10 = 20 + \left( \frac{17.6}{21} \right) \times 10 = 20 + \frac{176}{21} = 20 + 8.3810 = 28.3810$$

---

#### Step 3: Calculate $P_{20}$ (20th Percentile)
- **Position:** $\frac{20N}{100} = \frac{20 \times 51}{100} = 10.2$.
- $cf$ just $\ge 10.2$ is $13$ $\implies$ Class **10–20**.
- $L = 10, cf = 5, f = 8, h = 10$.

$$P_{20} = 10 + \left( \frac{10.2 - 5}{8} \right) \times 10 = 10 + \left( \frac{5.2}{8} \right) \times 10 = 10 + 6.5 = 16.5$$

---

#### Step 4: Calculate $P_{100}$ (100th Percentile)
- **Position:** $\frac{100N}{100} = N = 51$.
- Reaches the top class **50–60**.
- $L = 50, cf = 47, f = 4, h = 10$.

$$P_{100} = 50 + \left( \frac{51 - 47}{4} \right) \times 10 = 50 + \left( \frac{4}{4} \right) \times 10 = 50 + 10 = 60$$

*(Note: By definition, the 100th percentile represents the maximum boundary value of the distribution, which is exactly $60$).*

---

> ### **Final Answer (Q9):**
> - **$D_6$:** `28.38`
> - **$P_{20}$:** `16.5`
> - **$P_{100}$:** `60`

---

<a id="question-10"></a>
## Question 10

**Problem Statement:**  
Find the missing frequencies $f_1$ and $f_2$ of the following distribution, given that the **mean is 21.4** and **total frequency is 40**:

| Class-Interval | 0–8 | 8–16 | 16–24 | 24–32 | 32–40 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Frequency** | 6 | $f_1$ | 10 | $f_2$ | 9 |

---

### Step-by-Step Solution:

#### Step 1: Set up the Table with Mid-values
| Class-Interval | Frequency ($f_i$) | Mid-point ($x_i$) | $f_i x_i$ |
| :---: | :---: | :---: | :---: |
| 0–8 | 6 | 4 | $6 \times 4 = 24$ |
| 8–16 | $f_1$ | 12 | $12 f_1$ |
| 16–24 | 10 | 20 | $10 \times 20 = 200$ |
| 24–32 | $f_2$ | 28 | $28 f_2$ |
| 32–40 | 9 | 36 | $9 \times 36 = 324$ |
| **Total** | **$N = 40$** | — | **$\sum f_i x_i = 548 + 12f_1 + 28f_2$** |

---

#### Step 2: Form Equation (1) from Total Frequency
$$N = \sum f_i = 6 + f_1 + 10 + f_2 + 9 = 40$$
$$25 + f_1 + f_2 = 40$$
$$f_1 + f_2 = 15 \quad \text{--- [Equation 1]}$$

---

#### Step 3: Form Equation (2) from Mean
$$\text{Mean } (\bar{x}) = \frac{\sum f_i x_i}{N} = 21.4$$
$$\frac{548 + 12f_1 + 28f_2}{40} = 21.4$$
$$548 + 12f_1 + 28f_2 = 40 \times 21.4 = 856$$
$$12f_1 + 28f_2 = 856 - 548 = 308$$

Divide throughout by $4$:
$$3f_1 + 7f_2 = 77 \quad \text{--- [Equation 2]}$$

---

#### Step 4: Solve the Simultaneous Equations
From Equation 1:
$$f_1 = 15 - f_2$$

Substitute into Equation 2:
$$3(15 - f_2) + 7f_2 = 77$$
$$45 - 3f_2 + 7f_2 = 77$$
$$45 + 4f_2 = 77$$
$$4f_2 = 77 - 45 = 32$$
$$f_2 = \frac{32}{4} = 8$$

Now find $f_1$:
$$f_1 = 15 - 8 = 7$$

---

> ### **Final Answer (Q10):**
> - **$f_1 = 7$**
> - **$f_2 = 8$**

---

<a id="question-11"></a>
## Question 11

**Problem Statement:**  
Find the missing frequencies $f_1$ and $f_2$ for the following data whose **mean is 1.46** and **total frequency is 200**:

| $x_i$ | 0 | 1 | 2 | 3 | 4 | 5 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$f_i$** | 46 | $f_1$ | $f_2$ | 25 | 10 | 5 |

---

### Step-by-Step Solution:

#### Step 1: Set up the Calculation Table
| $x_i$ | $f_i$ | $f_i x_i$ |
| :---: | :---: | :---: |
| 0 | 46 | $46 \times 0 = 0$ |
| 1 | $f_1$ | $f_1 \times 1 = f_1$ |
| 2 | $f_2$ | $f_2 \times 2 = 2f_2$ |
| 3 | 25 | $25 \times 3 = 75$ |
| 4 | 10 | $10 \times 4 = 40$ |
| 5 | 5 | $5 \times 5 = 25$ |
| **Total** | **$N = 200$** | **$\sum f_i x_i = 140 + f_1 + 2f_2$** |

---

#### Step 2: Form Equation (1) from Total Frequency
$$N = \sum f_i = 46 + f_1 + f_2 + 25 + 10 + 5 = 200$$
$$86 + f_1 + f_2 = 200$$
$$f_1 + f_2 = 114 \quad \text{--- [Equation 1]}$$

---

#### Step 3: Form Equation (2) from Mean
$$\text{Mean } (\bar{x}) = \frac{\sum f_i x_i}{N} = 1.46$$
$$\frac{140 + f_1 + 2f_2}{200} = 1.46$$
$$140 + f_1 + 2f_2 = 200 \times 1.46 = 292$$
$$f_1 + 2f_2 = 292 - 140 = 152 \quad \text{--- [Equation 2]}$$

---

#### Step 4: Solve the Equations
Subtract Equation 1 from Equation 2:
$$(f_1 + 2f_2) - (f_1 + f_2) = 152 - 114$$
$$f_2 = 38$$

Substitute $f_2 = 38$ into Equation 1:
$$f_1 + 38 = 114$$
$$f_1 = 114 - 38 = 76$$

---

> ### **Final Answer (Q11):**
> - **$f_1 = 76$**
> - **$f_2 = 38$**

---

<a id="question-12"></a>
## Question 12

**Problem Statement:**  
Find the **Harmonic Mean (H.M.)** for the following distribution:

| Marks ($x_i$) | 20 | 30 | 40 | 50 | 60 | 70 | 80 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Frequency ($f_i$)** | 3 | 61 | 132 | 153 | 140 | 51 | 3 |

---

### Step-by-Step Solution:

#### Step 1: Harmonic Mean Formula for Frequency Distribution
$$HM = \frac{N}{\sum \left( \frac{f_i}{x_i} \right)}$$
where $N = \sum f_i$.

---

#### Step 2: Compute $\frac{f_i}{x_i}$ Table
| Marks ($x_i$) | Frequency ($f_i$) | $\frac{f_i}{x_i}$ (up to 6 decimal places) |
| :---: | :---: | :---: |
| 20 | 3 | $\frac{3}{20} = 0.150000$ |
| 30 | 61 | $\frac{61}{30} = 2.033333$ |
| 40 | 132 | $\frac{132}{40} = 3.300000$ |
| 50 | 153 | $\frac{153}{50} = 3.060000$ |
| 60 | 140 | $\frac{140}{60} = 2.333333$ |
| 70 | 51 | $\frac{51}{70} = 0.728571$ |
| 80 | 3 | $\frac{3}{80} = 0.037500$ |
| **Total** | **$N = 543$** | **$\sum \left( \frac{f_i}{x_i} \right) = 11.642738$** |

---

#### Step 3: Compute Harmonic Mean
$$HM = \frac{543}{11.642738} \approx 46.6385$$

Rounding to 2 decimal places:
$$HM \approx 46.64$$

---

> ### **Final Answer (Q12):**
> - **Total Frequency ($N$):** `543`
> - **$\sum (f_i/x_i)$:** `11.6427`
> - **Harmonic Mean (H.M.):** `46.64`

---

<a id="question-13"></a>
## Question 13

**Problem Statement:**  
Answer the following theoretical statistical concepts:
1. Define Range.
2. Define Mean Deviation.
3. Define Standard Deviation.
4. State Measures of Dispersion.
5. State Merits and Demerits of Mean, Median, and Mode.

---

### 1. Define Range
**Definition:**  
Range is the simplest and crudest measure of dispersion. It is defined as the absolute difference between the largest (maximum) value and the smallest (minimum) value in a given dataset.

- **Formula:**
  $$\text{Range} = L - S$$
  where $L = \text{Largest observation}$, $S = \text{Smallest observation}$.

- **Relative Measure (Coefficient of Range):**
  $$\text{Coefficient of Range} = \frac{L - S}{L + S}$$

---

### 2. Define Mean Deviation
**Definition:**  
Mean Deviation (also known as Average Deviation) is defined as the arithmetic mean of the absolute values of the numerical deviations of all observations measured from a measure of central tendency (usually the arithmetic mean or median). The negative signs of deviations are ignored (i.e., taken as absolute $|x - A|$).

- **Formulae:**
  - For Individual Data:
    $$MD = \frac{\sum |x_i - A|}{n}$$
  - For Discrete/Continuous Frequency Distribution:
    $$MD = \frac{\sum f_i |x_i - A|}{N}$$
    *(where $A = \bar{x}$ for mean deviation about mean, or $A = \text{Median}$ for mean deviation about median).*

- **Coefficient of Mean Deviation:**
  $$\text{Coefficient of } MD = \frac{MD}{A}$$

---

### 3. Define Standard Deviation
**Definition:**  
Standard Deviation is the most widely used and scientifically sound measure of dispersion. Introduced by Karl Pearson in 1893, it is defined as the **positive square root of the arithmetic mean of the squared deviations of the values taken from their arithmetic mean**. It is denoted by the Greek letter $\sigma$ (sigma).

- **Formulae:**
  - For Individual Data:
    $$\sigma = \sqrt{ \frac{\sum (x_i - \bar{x})^2}{n} }$$
  - For Grouped Frequency Distribution:
    $$\sigma = \sqrt{ \frac{\sum f_i (x_i - \bar{x})^2}{N} } = \sqrt{ \frac{\sum f_i x_i^2}{N} - \left( \frac{\sum f_i x_i}{N} \right)^2 }$$
- The square of standard deviation is termed **Variance** ($\sigma^2$).

---

### 4. State Measures of Dispersion
Dispersion measures the extent of scatter, spread, or variation of observations around a central value. Measures of dispersion are classified into two broad categories:

#### A. Absolute Measures of Dispersion
*(Expressed in the same physical units as the original data)*
1. **Range**
2. **Quartile Deviation** (Semi-Interquartile Range: $QD = \frac{Q_3 - Q_1}{2}$)
3. **Mean Deviation**
4. **Standard Deviation and Variance**

#### B. Relative Measures of Dispersion (Coefficients)
*(Pure numbers independent of units of measurement, used for comparing two or more distributions)*
1. **Coefficient of Range** = $\frac{L - S}{L + S}$
2. **Coefficient of Quartile Deviation** = $\frac{Q_3 - Q_1}{Q_3 + Q_1}$
3. **Coefficient of Mean Deviation** = $\frac{MD}{\text{Mean or Median}}$
4. **Coefficient of Variation (C.V.)** = $\frac{\sigma}{\bar{x}} \times 100$

---

### 5. Merits and Demerits of Mean, Median, and Mode

#### A. Arithmetic Mean
| Merits | Demerits |
| :--- | :--- |
| 1. **Rigidly defined** by a clear algebraic formula. | 1. **Highly sensitive to extreme values** (outliers). |
| 2. **Based on all observations** in the dataset. | 2. Cannot be computed for **open-ended classes** without guessing. |
| 3. **Capable of further algebraic treatment** (e.g., combined mean). | 3. Cannot be determined **graphically**. |
| 4. Possesses high **sampling stability**. | 4. Cannot be calculated for **qualitative phenomena** (e.g., honesty, beauty). |

#### B. Median
| Merits | Demerits |
| :--- | :--- |
| 1. **Easy to understand and calculate**. | 1. **Not based on all observations** (relies only on positional order). |
| 2. **Unaffected by extreme values** or outliers. | 2. **Not capable of further algebraic treatment** (cannot find combined median). |
| 3. Can be calculated for **open-ended classes**. | 3. Requires data to be **sorted/arranged**, which is tedious for huge data. |
| 4. Can be determined **graphically** using Ogives. | 4. Less stable under sampling variations than the mean. |
| 5. Best measure for **qualitative characteristics**. | |

#### C. Mode
| Merits | Demerits |
| :--- | :--- |
| 1. **Simplest to locate**; can often be found by inspection. | 1. **Ill-defined** or non-existent in multimodal/bimodal data. |
| 2. **Completely unaffected by extreme values**. | 2. **Not based on all observations**. |
| 3. Can be computed for **open-ended distributions**. | 3. **Not amenable to algebraic treatment**. |
| 4. Can be determined **graphically** using a Histogram. | 4. Highly unstable under sampling fluctuations. |
| 5. Highly practical for **business and industry** (e.g., shoe/garment sizing). | |

---

*Assignment 1 Solutions Prepared & Verified Successfully.*
