---
title: '0.19 — Mini Project: Student List'
description: Build the same Student List UI in React and Angular to compare the two approaches.
---

# Lesson 0.19 — Mini Project: Student List

## Goal

Display this UI:

```text
Student List

1. Ahmed
2. Sara
3. Rahul
4. Priya
```

You will see the same result in React and Angular.

Keep the project very small.

---

## React version

```jsx
function StudentList() {
  const students = ["Ahmed", "Sara", "Rahul", "Priya"];

  return (
    <div>
      <h2>Student List</h2>
      {students.map((student, index) => (
        <p key={student}>
          {index + 1}. {student}
        </p>
      ))}
    </div>
  );
}

export default StudentList;
```

### What this does

1. Stores names in an array
2. Uses `.map()` to create list items
3. Shows numbering with `index + 1`

---

## Angular version

### student-list.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
})
export class StudentListComponent {
  students = ['Ahmed', 'Sara', 'Rahul', 'Priya'];
}
```

### student-list.component.html

```html
<h2>Student List</h2>

<p *ngFor="let student of students; let i = index">
  {{ i + 1 }}. {{ student }}
</p>
```

### Modern Angular template option

```html
<h2>Student List</h2>

@for (student of students; track student; let i = $index) {
  <p>{{ i + 1 }}. {{ student }}</p>
}
```

### What this does

1. Stores names in a class property
2. Uses `*ngFor` (or `@for`) to loop
3. Shows numbering with the index

---

## Side-by-side comparison

| Step             | React                     | Angular                          |
| ---------------- | ------------------------- | -------------------------------- |
| Store list       | `const students = [...]`  | `students = [...]`               |
| Loop             | `.map()`                  | `*ngFor` / `@for`                |
| Show text        | `{student}`               | `{{ student }}`                  |
| Show number      | `{index + 1}`             | `{{ i + 1 }}`                    |
| Component usage  | `<StudentList />`         | `<app-student-list></app-student-list>` |

## Easy connection

You already knew how to render a list in React.

Angular does the same job with template looping syntax.

## Stretch challenge (optional)

Add one more name: `Fatima`

Do it in both versions.

## Try it yourself checklist

- [ ] React list renders 4 names
- [ ] Angular list renders 4 names
- [ ] Numbers show as 1 to 4
- [ ] You can explain `.map()` vs `*ngFor`

## Next lesson

Next: [0.20 — Final Practice](/angular/part-0-react-to-angular/final-practice/)
