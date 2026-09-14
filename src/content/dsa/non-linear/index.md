---
title: 'Non-Linear Data Structures'
description: 'Trees and graphs.'
sidebar:
  order: 4
---

## Trees

A tree is a hierarchical structure containing nodes, edges, a root, and subtrees. A general tree can have any number of children. A binary tree has at most two children per node.

Binary trees can use linked storage with left and right pointers, or array storage for complete trees. Threaded trees use otherwise-null links to connect traversal neighbors.

## Binary tree operations

Common operations include insertion, deletion, searching, finding height, counting nodes, and finding leaf nodes.

### Traversals

- **Preorder:** root, left, right
- **Inorder:** left, root, right
- **Postorder:** left, right, root
- **Level order:** visit each level from top to bottom

For a binary search tree, inorder traversal produces sorted order.

## Binary Search Tree

A BST stores smaller values in the left subtree and larger values in the right subtree. Average search, insertion, and deletion can be $O(\log n)$ when balanced, but become $O(n)$ in the worst case.

## Height-balanced AVL tree

An AVL tree keeps the height difference of left and right subtrees at most one. Rotations restore balance after insertion or deletion:

- LL rotation
- RR rotation
- LR rotation
- RL rotation

## Splay tree

A splay tree moves a recently accessed node toward the root using rotations. Individual operations can be $O(n)$, but the amortized complexity over a sequence is $O(\log n)$.

## Applications

Expression trees represent operators as internal nodes and operands as leaves. Symbol tables store identifiers and their attributes. Syntax analysis uses tree structures such as parse trees and abstract syntax trees.

### Practice

1. Draw a binary tree and write all four traversals.
2. Insert values into a BST and delete a node with two children.
3. Apply LL, RR, LR, and RL AVL rotations.
4. Build an expression tree for `(A+B)*C`.
