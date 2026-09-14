---
title: 'Unit 5: Random Variables and Distributions'
description: 'Random variables, expectation, variance, and important discrete probability distributions.'
---

## 5.1 Discrete and Continuous Random Variables

A random variable assigns a numerical value to each outcome. A discrete random variable has countable values and a probability mass function; a continuous random variable uses a density function over intervals.

## 5.2 Mathematical Expectation and Variance

For a discrete variable $X$, $E(X)=\sum xP(X=x)$. Its variance is $Var(X)=E(X^2)-[E(X)]^2$, and its standard deviation is $\sqrt{Var(X)}$.

## 5.3 Discrete Probability Distributions

A discrete distribution lists probabilities for possible values of $X$. The probabilities are non-negative and sum to $1$.

## 5.3.1 Binomial Distribution

The binomial model counts successes in $n$ independent trials, each with success probability $p$. Let $q=1-p$.

### 5.3.1.1 Density Function

$P(X=x)=\binom{n}{x}p^xq^{n-x}$, for $x=0,1,\ldots,n$.

### 5.3.1.2 Mean, Variance, Properties, and Uses

For a binomial variable, $E(X)=np$ and $Var(X)=npq$. It is used for repeated yes/no trials, quality checks, and success counts.

## 5.3.2 Poisson Distribution

The Poisson model describes the number of events in a fixed interval when events occur independently at a constant average rate $\lambda$.

### 5.3.2.1 Density Function

$P(X=x)=\dfrac{e^{-\lambda}\lambda^x}{x!}$, for $x=0,1,2,\ldots$.

### 5.3.2.2 Mean and Variance

For a Poisson variable, both $E(X)$ and $Var(X)$ equal $\lambda$.

### 5.3.2.3 Properties and Uses

The Poisson distribution is useful for counts such as calls, arrivals, defects, or accidents in a fixed time or space interval. It approximates a binomial distribution when $n$ is large and $p$ is small, with $\lambda=np$.
