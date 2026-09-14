---
title: '0.5 — Props vs @Input()'
description: Compare React props and Angular @Input for parent-to-child data passing.
---

# Lesson 0.5 — Props vs @Input()

:::tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## What is the problem?

Sometimes a <span class="new-word" tabindex="0">parent<span class="new-word__tip" role="tooltip">The outer component that contains another component.</span></span> component has data.

A <span class="new-word" tabindex="0">child<span class="new-word__tip" role="tooltip">The inner component that receives data or sends events.</span></span> component needs that data.

Example:

- Parent knows the student name: `"Sara"`
- Child should display: `Hello Sara`

## Real-world analogy

A teacher (parent) gives a notebook (data) to a student (child).

The student does not create the notebook.
The teacher passes it.

## Parent and child

```text
Parent Component
   |
   |  passes data
   v
Child Component
```

- **Parent** = outer component
- **Child** = inner component
- **Passing data down** = parent → child

## React props

In React, data passed to a child is called **props**.

```jsx
function Student({ name }) {
  return <h2>Hello {name}</h2>;
}

function App() {
  return <Student name="Sara" />;
}
```

### Explain the code

1. `App` is the parent
2. `Student` is the child
3. `name="Sara"` passes a prop
4. `{ name }` receives the prop
5. `{name}` shows the value

## Angular @Input()

In Angular, parent-to-child data often uses `@Input()`.

### Child component

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student',
  template: `<h2>Hello {{ name }}</h2>`,
  standalone: true,
})
export class StudentComponent {
  @Input() name = '';
}
```

### Parent template

```html
<app-student name="Sara"></app-student>
```

or with a variable:

```html
<app-student [name]="studentName"></app-student>
```

### Explain the code

1. `@Input() name = '';` means: this property can receive data from the parent
2. `name="Sara"` passes a fixed string
3. `[name]="studentName"` passes a value from the parent class
4. `{{ name }}` shows the value in the child template

## Side-by-side

| Step                 | React                         | Angular                          |
| -------------------- | ----------------------------- | -------------------------------- |
| Declare received data | function args / props        | `@Input()` property              |
| Pass from parent      | `<Student name="Sara" />`    | `<app-student name="Sara">`      |
| Show value            | `{name}`                     | `{{ name }}`                     |

## Easy connection

React props ≈ Angular `@Input()`

Both mean:

> Parent sends data to child.

:::tip
Remember the direction:

`@Input()` = data **in** to the child.
:::

## Try it yourself

Create a child component that shows a course name.

Parent should pass:

```text
Angular Basics
```

Write both:

1. React version with props
2. Angular version with `@Input()`

## Next lesson

Next: [0.6 — Events and @Output()](/angular/part-0-react-to-angular/events-output/)
