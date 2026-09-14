---
title: 'Unit 2: Theory of Matrices'
description: 'Fundamentals of matrices, transformations, rank, inverses, and linear systems.'
---

## 2.1 Matrices

A matrix is a rectangular arrangement of numbers in rows and columns. A matrix with $m$ rows and $n$ columns has order $m \times n$.

## 2.2 Types of Matrices

Common types include row, column, rectangular, square, zero, diagonal, scalar, identity, triangular, symmetric, and skew-symmetric matrices.

## 2.3 Equality of Matrices

Two matrices are equal when they have the same order and their corresponding entries are equal.

## 2.4 Operations on Matrices

Matrices of compatible orders can be added or subtracted entrywise. For multiplication, the number of columns of the first matrix must equal the number of rows of the second.

## 2.5 Properties and Singular Matrices

Matrix addition is commutative and associative, while multiplication is associative and distributive but generally not commutative. A square matrix is singular when $|A|=0$.

## 2.6 Inverse and Adjoint of a Matrix

For a nonsingular square matrix, $A^{-1}=\dfrac{1}{|A|}\operatorname{adj}(A)$. The adjoint is the transpose of the cofactor matrix.

## 2.7 Rank of Matrices

The rank of a matrix is the maximum number of linearly independent rows or columns. It is also the order of the largest non-zero minor.

## 2.8 Elementary Row and Column Transformations

Elementary transformations interchange two rows or columns, multiply one by a non-zero constant, or add a multiple of one to another.

## 2.9 Canonical Forms

Using elementary transformations, a matrix can be reduced to a row- or column-equivalent canonical form such as $\begin{bmatrix}I_r&0\\0&0\end{bmatrix}$, where $r$ is the rank.

## 2.10 Inverse Using Elementary Transformations

Augment $A$ with $I$: $[A\mid I]$. Apply row operations until the left side becomes $I$; the right side then becomes $A^{-1}$.

## 2.11 Systems of Linear Equations

Write a system as $AX=B$ and reduce its augmented matrix. A homogeneous system always has the trivial solution. A non-homogeneous system is consistent when $\operatorname{rank}(A)=\operatorname{rank}([A\mid B])$.
