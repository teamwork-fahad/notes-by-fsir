---
title: '0.10 — Directives'
description: Learn Angular structural and attribute directives at a beginner level.
---

# Lesson 0.10 — Directives

:::tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## What is a directive?

In Angular, a <span class="new-word" tabindex="0">directive<span class="new-word__tip" role="tooltip">An instruction that tells Angular how to change HTML.</span></span> is an instruction that changes the <span class="new-word" tabindex="0">DOM<span class="new-word__tip" role="tooltip">The page structure in the browser (elements like div, p, button).</span></span> (the page structure) or how an element looks/behaves.

Simple meaning:

> A directive tells Angular how to change HTML.

## How React handles similar ideas

React does not use the word “directives” the same way.

In React, you usually write logic in JavaScript/JSX:

```jsx
{isOpen && <p>Open</p>}
{items.map(item => <p key={item.id}>{item.name}</p>)}
<div className={isActive ? "active" : ""}>
```

In Angular, many of these jobs are done with directives or control-flow syntax.

## Two main types (beginner level)

1. **Structural directives** — add/remove HTML structure
2. **Attribute directives** — change the look or behavior of an element

---

## Structural directives

Structural directives change the layout by adding or removing elements.

### 1. *ngIf

Show or hide content.

```html
<p *ngIf="isLoggedIn">Welcome</p>
```

### 2. *ngFor

Repeat content for each item.

```html
<li *ngFor="let city of cities">{{ city }}</li>
```

### 3. *ngSwitch

Choose one block among many options.

```html
<div [ngSwitch]="grade">
  <p *ngSwitchCase="'A'">Excellent</p>
  <p *ngSwitchCase="'B'">Good</p>
  <p *ngSwitchDefault>Keep practicing</p>
</div>
```

:::tip
Modern Angular also has `@if`, `@for`, and `@switch`.
Your syllabus still uses `*ngIf`, `*ngFor`, and `*ngSwitch`, so learn both names.
:::

---

## Attribute directives

Attribute directives change an existing element.

### 1. ngClass

Add CSS classes from data.

```html
<p [ngClass]="{ active: isActive, error: hasError }">
  Status
</p>
```

If `isActive` is true, the `active` class is added.

### 2. ngStyle

Set inline styles from data.

```html
<p [ngStyle]="{ color: textColor, fontSize: '18px' }">
  Colored text
</p>
```

## React connection

| Need                 | React idea                          | Angular idea              |
| -------------------- | ----------------------------------- | ------------------------- |
| Show / hide          | Conditional JSX                     | `*ngIf` / `@if`           |
| Lists                | `.map()`                            | `*ngFor` / `@for`         |
| Dynamic CSS class    | `className={...}`                   | `ngClass`                 |
| Dynamic style        | `style={{...}}`                     | `ngStyle`                 |

## Important beginner rule

Do **not** worry about custom directives yet.

First master:

- `*ngIf`
- `*ngFor`
- `*ngSwitch`
- `ngClass`
- `ngStyle`

Custom directives come later when you know Angular better.

## Try it yourself

1. Use `*ngIf` to show `Open` only when `isOpen` is true.
2. Use `*ngFor` to print three subjects.
3. Use `ngClass` to add class `pass` when `score >= 40`.

## Next lesson

Next: [0.11 — Lifecycle Hooks](/angular/part-0-react-to-angular/lifecycle-hooks/)
