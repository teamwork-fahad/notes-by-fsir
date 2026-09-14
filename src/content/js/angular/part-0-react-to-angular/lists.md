---
title: '0.9 — Lists'
description: Compare React map with Angular *ngFor and modern @for for displaying lists.
---

# Lesson 0.9 — Lists

## What is the goal?

Both React and Angular are used to display multiple items.

Example result:

```text
Ahmed
Sara
Rahul
Priya
```

## React with .map()

```jsx
function StudentList() {
  const students = ["Ahmed", "Sara", "Rahul", "Priya"];

  return (
    <div>
      {students.map((student) => (
        <p key={student}>{student}</p>
      ))}
    </div>
  );
}
```

### Explain the code

1. `students` is an array
2. `.map()` loops through each item
3. Each item becomes a `<p>`
4. `key` helps React track each item

With objects:

```jsx
students.map((student) => (
  <p key={student.id}>{student.name}</p>
))
```

## Angular with *ngFor

```typescript
students = ['Ahmed', 'Sara', 'Rahul', 'Priya'];
```

```html
<p *ngFor="let student of students">
  {{ student }}
</p>
```

### Explain the code

1. `*ngFor` loops through the array
2. `let student of students` means: take each item as `student`
3. `{{ student }}` prints the value

With objects:

```html
<p *ngFor="let student of students">
  {{ student.name }}
</p>
```

## Modern Angular @for

```html
@for (student of students; track student) {
  <p>{{ student }}</p>
}
```

With objects, track by id when possible:

```html
@for (student of students; track student.id) {
  <p>{{ student.name }}</p>
}
```

:::note
`track` helps Angular know which item is which when the list changes.
In React, `key` does a similar job.
:::

## Side-by-side

| Task            | React                 | Angular                     |
| --------------- | --------------------- | --------------------------- |
| Loop list       | `.map()`              | `*ngFor` or `@for`          |
| Item identity   | `key={...}`           | `track` (modern) / trackBy  |
| Show value      | `{student.name}`      | `{{ student.name }}`        |

## Easy connection

> Both are used to display multiple items.

React `.map()` ≈ Angular `*ngFor` / `@for`

## Index in the loop

### React

```jsx
students.map((student, index) => (
  <p key={student}>{index + 1}. {student}</p>
))
```

### Angular

```html
<p *ngFor="let student of students; let i = index">
  {{ i + 1 }}. {{ student }}
</p>
```

## Try it yourself

Create a fruit list:

```text
Apple
Banana
Mango
```

Write:

1. React version with `.map()`
2. Angular version with `*ngFor`
3. Optional: Angular version with `@for`

## Next lesson

Next: [0.10 — Directives](/angular/part-0-react-to-angular/directives/)
