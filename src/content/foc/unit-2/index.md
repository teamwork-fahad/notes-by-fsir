---
title: 'Number Systems and Digital Logic'
description: 'Number systems, conversions, binary arithmetic, and digital logic fundamentals.'
---

# Unit 2: Number Systems and Digital Logic

## Number Systems

Number systems are methods of representing numbers. Different number systems are used in computers for processing and storage.

### Decimal Number System
The decimal system uses base 10 with digits 0-9.

---

## Decimal Complementary Subtraction

Decimal complementary subtraction is a method of subtracting one decimal number from another using **complements**.

This method is useful for performing subtraction without directly borrowing from digits.

### 1. Types of Decimal Complements

For decimal numbers, the base is:

$$B = 10$$

There are two important complements:

- **9's Complement**
- **10's Complement**

#### 9's Complement Formula

The formula used to find the 9's complement is:

$$B^n - 1 - N$$

Where:

- $B$ = Base
- $n$ = Number of digits
- $N$ = Given number

Since decimal numbers have base 10:

$$B = 10$$

Therefore:

- For a 2-digit number → $10^2 = 100$
- For a 3-digit number → $10^3 = 1000$
- For a 4-digit number → $10^4 = 10000$

---

### 2. Steps for Decimal Complementary Subtraction

To subtract using the decimal complement method:

1. Find the **9's complement** of the number being subtracted.
2. Add the complement to the number from which we are subtracting.
3. Add **1** to the result.
4. Check whether a **carry** is generated.
5. If carry is generated:
   - Remove the carry.
   - The remaining number is the positive answer.
6. If carry is **not** generated:
   - The answer is negative.
   - Find the **10's complement** of the result.
   - Put a negative (`−`) sign before the answer.

---

### 3. Example 1: 56 from 92

The question means: $92 - 56$

#### Step 1: Find 9's Complement of 56

Since 56 is a 2-digit number:

$$B^n - 1 - N$$

$$= 10^2 - 1 - 56$$

$$= 100 - 1 - 56$$

$$= 99 - 56$$

$$= 43$$

So, the **9's complement of 56 = 43**.

#### Step 2: Add the Complement

```
    92
  + 43
  ----
   135
```

#### Step 3: Add 1

```
135 + 1 = 136
```

#### Step 4: Check Carry

Since this is a **2-digit calculation**, we check against:

$$10^2 = 100$$

The result is `136`, which is greater than `100`.

So, **carry is generated**.

Remove the carry `1`:

```
136 → 36
```

#### Answer

$$\boxed{92 - 56 = 36}$$

---

### 4. Example 2: 35 from 18

The question means: $18 - 35$

#### Step 1: Find 9's Complement of 35

Since 35 is a 2-digit number:

$$10^2 - 1 - 35$$

$$= 100 - 1 - 35$$

$$= 99 - 35$$

$$= 64$$

So, the **9's complement of 35 = 64**.

#### Step 2: Add the Complement

```
    18
  + 64
  ----
    82
```

#### Step 3: Add 1

```
82 + 1 = 83
```

#### Step 4: Check Carry

For a 2-digit number:

$$10^2 = 100$$

The result `83` is less than `100`.

Therefore, **no carry is generated**.

This means the answer is **negative**.

#### Step 5: Find 10's Complement of 83

For a 2-digit number:

$$10^2 - 83$$

$$= 100 - 83$$

$$= 17$$

Therefore:

$$\boxed{18 - 35 = -17}$$

---

### 5. Example 3: 216 from 172

The question means: $172 - 216$

#### Step 1: Find 9's Complement of 216

Since 216 is a 3-digit number:

$$10^3 - 1 - 216$$

$$= 1000 - 1 - 216$$

$$= 999 - 216$$

$$= 783$$

So, the **9's complement of 216 = 783**.

#### Step 2: Add the Complement

```
    172
  + 783
  -----
    955
```

#### Step 3: Add 1

```
955 + 1 = 956
```

#### Step 4: Check Carry

Since this is a **3-digit calculation**, we check against:

$$10^3 = 1000$$

The result is:

```
956
```

Since: $956 < 1000$

**No carry is generated.**

Therefore, the answer is **negative**.

#### Step 5: Find 10's Complement of 956

$$10^3 - 956$$

$$= 1000 - 956$$

$$= 44$$

Therefore:

$$\boxed{172 - 216 = -44}$$

---

### 6. Understanding Carry

Carry is the most important part of this method.

The value we compare with depends on the number of digits.

| Number of Digits | Carry if Result is |
|--|--|
| 2 digits | 100 or more |
| 3 digits | 1000 or more |
| 4 digits | 10000 or more |
| n digits | $10^n$ or more |

#### Simple Rule

For an **n-digit number**:

$$\boxed{\text{Carry if Result} \geq 10^n}$$

If the result is less than $10^n$, there is **no carry**.

---

### 7. Quick Examples of Carry

#### 2-Digit Number

```
136
```

Since: $136 \geq 100$

Carry is generated. ✅

---

#### 3-Digit Number

```
1354
```

Since: $1354 \geq 1000$

Carry is generated. ✅

Remove the extra `1`:

```
1354 → 354
```

---

#### 3-Digit Number Without Carry

```
956
```

Since: $956 < 1000$

No carry is generated. ❌

Therefore, the answer will be negative.

---

### 8. Important Rule to Remember

#### When Carry is Generated

If: $\text{Result} \geq 10^n$

then:

- Carry is generated.
- Remove the carry.
- Remaining value is the **positive answer**.

#### When Carry is Not Generated

If: $\text{Result} < 10^n$

then:

- No carry is generated.
- Answer is **negative**.
- Find the 10's complement of the result.
- Add the negative sign.

---

### 9. Quick Revision

#### Formula for 9's Complement

$$\boxed{B^n - 1 - N}$$

For decimal:

$$\boxed{10^n - 1 - N}$$

#### Formula for 10's Complement

$$\boxed{10^n - N}$$

#### Carry Rule

$$\boxed{\text{Result} \geq 10^n \Rightarrow \text{Carry}}$$

$$\boxed{\text{Result} < 10^n \Rightarrow \text{No Carry}}$$

---

### 10. One-Line Shortcut

> **9's Complement → Add → +1 → Check Carry → Carry = Positive, No Carry = Negative**

This is the complete procedure for **Decimal Complementary Subtraction**.

---

## Binary Subtraction Using 1's Complement

Binary subtraction can be done using the **1's complement method**.

This method is useful for subtracting binary numbers without doing normal borrowing.

---

### 1. What is 1's Complement?

To find the **1's complement** of a binary number:

- Change `0` to `1`
- Change `1` to `0`

#### Example

```
Original Number : 01010
1's Complement  : 10101
```

So:

$$01010_2 \rightarrow 10101_2$$

---

### 2. Steps for Binary Subtraction

To subtract two binary numbers using 1's complement:

1. Write the number from which you want to subtract.
2. Find the **1's complement** of the number being subtracted.
3. Add the 1's complement to the first number.
4. Check for a **carry**.
5. If a carry is generated:
   - Remove the carry.
   - Add the carry to the rightmost bit of the result.
6. If there is no carry:
   - Find the 1's complement of the result.
   - Put a negative (`−`) sign before the result.

---

### 3. Example: Subtract 01010 from 10000

The question is:

$$10000_2 - 01010_2$$

#### Step 1: Find 1's Complement

The number being subtracted is:

```
01010
```

Change every `0` to `1` and every `1` to `0`:

```
01010
  ↓
10101
```

Therefore:

$$1's\ Complement\ of\ 01010 = 10101$$

---

#### Step 2: Add the Complement

Add `10101` to `10000`:

```
    10000
  + 10101
  -------
   100101
```

The result has **6 bits**, but our original numbers have only **5 bits**.

So the extra leftmost `1` is the **carry**.

```
100101
↑
Carry
```

Remaining result:

```
00101
```

---

#### Step 3: Add the Carry Again

In the 1's complement method, when a carry is generated, we use **end-around carry**.

This means we add the carry `1` to the rightmost side of the result.

```
    00101
  +     1
  -------
    00110
```

---

### 4. Final Answer

Therefore:

$$\boxed{10000_2 - 01010_2 = 00110_2}$$

So the answer is:

```
00110₂
```

---

### 5. Check the Answer

We can convert the numbers to decimal to check our answer.

```
10000₂ = 16₁₀
01010₂ = 10₁₀
```

Therefore:

$$16 - 10 = 6$$

And:

```
00110₂ = 6₁₀
```

So the answer is correct. ✅

---

### 6. Important Rule: End-Around Carry

Remember this rule:

> **If a carry is generated, remove it and add it to the rightmost bit of the result.**

This is called **End-Around Carry**.

#### Example

```
100101
↑
Carry = 1
```

Remove the carry:

```
00101
```

Add the carry:

```
  00101
+     1
-------
  00110
```

---

### 7. What If There Is No Carry?

If there is **no carry** after addition:

1. Take the **1's complement** of the result.
2. Put a negative (`−`) sign before it.

#### Example

Suppose the addition gives:

```
00101
```

There is no carry.

Find its 1's complement:

```
00101
  ↓
11010
```

Therefore, the answer would be:

```
−11010₂
```

---

### 8. Quick Revision

#### 1's Complement

Change:

```
0 → 1
1 → 0
```

#### Subtraction Method

```
1. Find 1's complement
2. Add it to the first number
3. Check carry
4. Carry present → End-around carry
5. No carry → 1's complement + negative sign
```

#### Most Important Point

$$\boxed{\text{Carry} \rightarrow \text{Add carry again}}$$

This is called:

**End-Around Carry**

---

### 9. One-Line Shortcut

> **1's Complement → Add → Check Carry → Carry = End-Around Carry → No Carry = Negative Answer**
