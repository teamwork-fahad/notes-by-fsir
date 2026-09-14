---
title: '0.6 — Events and @Output()'
description: Compare React events and Angular event binding, @Output, and EventEmitter.
---

# Lesson 0.6 — Events: React vs Angular

## What is an event?

An **event** is something the user does.

Examples:

- Click a button
- Type in an input
- Submit a form

Your app listens and then runs a function.

## React click event

```jsx
function SaveButton() {
  function handleClick() {
    alert("Saved!");
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

### Explain the code

1. `handleClick` is the function to run
2. `onClick={handleClick}` connects the click to the function
3. When the user clicks, the alert appears

## Angular click event

```html
<button (click)="handleClick()">
  Click Me
</button>
```

```typescript
handleClick() {
  alert('Saved!');
}
```

### Explain the code

1. `(click)` is Angular event binding
2. `handleClick()` is the method in the component class
3. Parentheses `()` mean this is an event

## Easy connection

| React        | Angular           |
| ------------ | ----------------- |
| `onClick`    | `(click)`         |
| `onChange`   | `(input)` / `(change)` |
| `onSubmit`   | `(ngSubmit)`      |

## Parent-child event communication

Sometimes the **child** needs to tell the **parent** something.

Example:

- Child has a Delete button
- Parent should remove the student

```text
Child Component
   |
   |  sends event
   v
Parent Component
```

### React idea

Pass a function as a prop:

```jsx
function Student({ onDelete }) {
  return <button onClick={onDelete}>Delete</button>;
}

function App() {
  function handleDelete() {
    alert("Student deleted");
  }

  return <Student onDelete={handleDelete} />;
}
```

### Angular idea: @Output() and EventEmitter

Angular uses:

- `@Output()`
- `EventEmitter`

#### Child

```typescript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-student',
  template: `<button (click)="deleteClicked()">Delete</button>`,
  standalone: true,
})
export class StudentComponent {
  @Output() delete = new EventEmitter<void>();

  deleteClicked() {
    this.delete.emit();
  }
}
```

#### Parent template

```html
<app-student (delete)="handleDelete()"></app-student>
```

#### Parent class

```typescript
handleDelete() {
  alert('Student deleted');
}
```

### Explain the Angular code

1. `@Output() delete` creates an event the parent can listen to
2. `EventEmitter` is the tool that sends the event
3. `this.delete.emit()` fires the event
4. `(delete)="handleDelete()"` listens in the parent

## Input vs Output memory tip

| Decorator   | Direction        | Meaning                         |
| ----------- | ---------------- | ------------------------------- |
| `@Input()`  | Parent → Child   | Data comes **in**               |
| `@Output()` | Child → Parent   | Event goes **out**              |

:::tip
`@Input()` = receive data  
`@Output()` = send event
:::

## Try it yourself

1. Make a React button that shows an alert on click.
2. Make an Angular button that does the same.
3. Explain `@Output()` in one sentence.

## Next lesson

Next: [0.7 — State and Data Binding](/angular/part-0-react-to-angular/data-binding/)
