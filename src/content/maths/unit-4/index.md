---
title: 'Unit 4: Probability Theory'
description: 'Core probability ideas including events, conditional probability, and Bayes theorem.'
---

## 4.1 Definitions

Probability assigns a number between $0$ and $1$ to an event. For equally likely outcomes, $P(A)=\dfrac{\text{favourable outcomes}}{\text{total outcomes}}$.

## 4.2 Sample Spaces

The sample space $S$ is the set of all possible outcomes of an experiment. An outcome is one member of $S$.

## 4.3 Events

An event is a subset of the sample space. The complement is $A^c=S\setminus A$, and $P(A^c)=1-P(A)$.

### 4.3.1 Types of Events

Events may be simple or compound, certain or impossible, mutually exclusive, exhaustive, independent, or dependent.

### 4.3.2 Algebra of Events

For events $A$ and $B$, $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. De Morgan's laws are $(A\cup B)^c=A^c\cap B^c$ and $(A\cap B)^c=A^c\cup B^c$.

## 4.4 Conditional Probability

The conditional probability of $A$ given $B$ is $P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$, when $P(B)>0$. Events are independent when $P(A\cap B)=P(A)P(B)$.

## 4.6 Bayes' Theorem

For a partition $B_1,\ldots,B_n$ of $S$, $P(B_i\mid A)=\dfrac{P(B_i)P(A\mid B_i)}{\sum_jP(B_j)P(A\mid B_j)}$. It updates the probability of a cause after observing evidence.
