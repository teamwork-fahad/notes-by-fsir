---
title: 'Unit 1: Relations, Functions, Sequence and Series'
description: 'An introductory guide to sets, relations, functions, and sequences.'
---

## 1.1 Cartesian Product of Sets

For sets $A$ and $B$, the Cartesian product is
$A \times B = \{(a,b) : a \in A, b \in B\}$.
If $A$ and $B$ are finite, $|A \times B| = |A||B|$.

## 1.2 Relations as Sets of Ordered Pairs

A relation from $A$ to $B$ is any subset of $A \times B$. A relation on $A$ is a subset of $A \times A$. The domain contains first components and the range contains second components.

## 1.3 Types of Relations

### 1.3.1 Symmetric Relation

$R$ on $A$ is symmetric if $aRb$ implies $bRa$ for all $a,b \in A$.

### 1.3.2 Anti-symmetric Relation

$R$ is anti-symmetric if $aRb$ and $bRa$ together imply $a=b$.

### 1.3.3 Reflexive Relation

$R$ is reflexive if $aRa$ for every $a \in A$.

### 1.3.4 Irreflexive Relation

$R$ is irreflexive if $aRa$ is false for every $a \in A$.

### 1.3.5 Transitive Relation

$R$ is transitive if $aRb$ and $bRc$ imply $aRc$.

## 1.4 Properties of Relations

Relations can be classified by combinations of reflexivity, symmetry, anti-symmetry, and transitivity. A partial order is reflexive, anti-symmetric, and transitive. An equivalence relation is reflexive, symmetric, and transitive.

## 1.5 Congruence Relations

A congruence relation preserves an operation. For integers, congruence modulo $n$ is defined by $a \equiv b \pmod n$ when $n$ divides $a-b$.

## 1.6 Equivalence Classes

If $R$ is an equivalence relation on $A$, the equivalence class of $a$ is $[a] = \{x \in A : xRa\}$. Equivalence classes partition $A$ into disjoint subsets.

## 1.7 Composition of Relations

For $R \subseteq A \times B$ and $S \subseteq B \times C$,
$S \circ R = \{(a,c): \text{there exists } b \in B, (a,b) \in R, (b,c) \in S\}$.

## 1.8 Algebra of Relations

Relations may be combined using union, intersection, complement, inverse, and composition. The inverse relation is $R^{-1} = \{(b,a):(a,b) \in R\}$.

## 1.9 Functions as Sets of Ordered Pairs

A function $f:A \to B$ is a relation in which every element of $A$ occurs exactly once as a first component. $A$ is the domain and $B$ is the codomain.

## 1.10 One-One, Onto, and Many-One Functions

A one-one (injective) function maps distinct inputs to distinct outputs. An onto (surjective) function covers every element of the codomain. A many-one function allows different inputs to have the same output.

## 1.11 Countable Sets

A set is countable if its elements can be listed in correspondence with a subset of the natural numbers. The integers and rational numbers are countable; the real numbers are uncountable.

## 1.12 Equality of Functions

Functions $f:A \to B$ and $g:A \to B$ are equal when $f(a)=g(a)$ for every $a \in A$.

## 1.13 Algebra of Functions

For real-valued functions, $(f+g)(x)=f(x)+g(x)$, $(f-g)(x)=f(x)-g(x)$, $(fg)(x)=f(x)g(x)$, and $(f/g)(x)=f(x)/g(x)$ where $g(x) \ne 0$.

## 1.14 Composition of Two Functions

If $f:A \to B$ and $g:B \to C$, their composition is $(g \circ f)(x)=g(f(x))$. In general, $g \circ f \ne f \circ g$.

## 1.15 Inverse Functions and Characteristic Functions

A function has an inverse function when it is bijective. The inverse satisfies $f^{-1}(f(x))=x$. The characteristic function of a subset $S$ of $A$ is $\chi_S(x)=1$ if $x \in S$ and $0$ otherwise.

## 1.16 Convergent and Divergent Sequences and Series

A sequence $(a_n)$ converges to $L$ if $a_n \to L$ as $n \to \infty$. Otherwise it diverges. A series $\sum a_n$ converges when its sequence of partial sums converges. The geometric series $\sum_{n=0}^{\infty} ar^n$ converges for $|r|<1$ and has sum $a/(1-r)$.
