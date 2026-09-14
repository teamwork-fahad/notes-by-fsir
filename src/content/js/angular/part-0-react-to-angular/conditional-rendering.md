---
title: '0.8 — Conditional Rendering'
description: Compare React conditional rendering with Angular *ngIf and modern @if syntax.
---

# Lesson 0.8 — Conditional Rendering

## What is conditional rendering?

**Conditional rendering** means:

> Show some UI only when a condition is true.

Example:

- If user is logged in → show Welcome
- If user is not logged in → show Login button

## React example

```jsx
function Home({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn && <h2>Welcome</h2>}
    </div>
  );
}
```

### Explain the code

1. `isLoggedIn` is true or false
2. `&&` means: if true, show `<h2>Welcome</h2>`
3. If false, show nothing

React also often uses ternary:

```jsx
{isLoggedIn ? <h2>Welcome</h2> : <h2>Please login</h2>}
```

## Angular with *ngIf

Syllabus style (very common in older and many current projects):

```html
<div *ngIf="isLoggedIn">
  <h2>Welcome</h2>
</div>
```

### Explain the code

1. `*ngIf` is a structural directive
2. If `isLoggedIn` is true, Angular shows the `<div>`
3. If false, Angular removes it from the page

With else:

```html
<div *ngIf="isLoggedIn; else loginBlock">
  <h2>Welcome</h2>
</div>

<ng-template #loginBlock>
  <h2>Please login</h2>
</ng-template>
```

## Modern Angular @if

Modern Angular also supports control-flow syntax:

```html
@if (isLoggedIn) {
  <h2>Welcome</h2>
} @else {
  <h2>Please login</h2>
}
```

This reads more like normal programming.

:::note
Students may see both styles:

- `*ngIf` (classic directive style)
- `@if` (modern control-flow style)

Both are useful. Learn the idea first.
:::

## Side-by-side

| Need                 | React                              | Angular                         |
| -------------------- | ---------------------------------- | ------------------------------- |
| Show if true         | `{ Cond && <UI /> }`               | `*ngIf` or `@if`                |
| If / else            | Ternary `? :`                      | `*ngIf; else` or `@if / @else`  |

## Easy connection

React:

```jsx
{isLoggedIn && <h2>Welcome</h2>}
```

Angular:

```html
<h2 *ngIf="isLoggedIn">Welcome</h2>
```

Same idea. Different syntax.

## Related syllabus terms

You will also meet:

- `*ngFor` — for lists
- `*ngSwitch` — for multiple cases

We cover lists next. Directives come soon after that.

## Try it yourself

Variable: `hasMarks = true`

Show:

- `Pass` when true
- `Fail` when false

Write React and Angular versions.

## Next lesson

Next: [0.9 — Lists](/angular/part-0-react-to-angular/lists/)
