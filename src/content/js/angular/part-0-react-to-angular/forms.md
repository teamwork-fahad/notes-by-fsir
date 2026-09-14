---
title: '0.17 — Forms'
description: Compare basic React forms with Angular template-driven and reactive forms.
---

# Lesson 0.17 — Forms

## What is a form?

A **form** collects user input.

Examples:

- Login form
- Registration form
- Search box
- Student details form

## Important words

| Word             | Easy meaning                                      |
| ---------------- | ------------------------------------------------- |
| Input            | A field where the user types                      |
| Form             | A group of inputs                                 |
| Validation       | Checking if input is correct                      |
| Controlled input | Input value is controlled by app state/data       |

## React basic form idea

In React, inputs are often controlled by state.

```jsx
import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Hello " + name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

### Explain the code

1. `name` stores the input value
2. `onChange` updates state when the user types
3. `value={name}` keeps the input in sync
4. This is the controlled input idea

## Angular forms overview

Angular has two common form styles:

1. **Template-driven Forms**
2. **Reactive Forms**

### 1. Template-driven Forms

You write most form logic in the HTML template.

Two-way binding is common:

```html
<input [(ngModel)]="name" />
<p>Hello {{ name }}</p>
```

```typescript
name = '';
```

Simple form:

```html
<form #studentForm="ngForm" (ngSubmit)="save()">
  <input name="name" [(ngModel)]="name" required />
  <button type="submit">Save</button>
</form>
```

Good for small and simple forms.

### 2. Reactive Forms

You build the form model in TypeScript.

```typescript
import { FormControl, FormGroup } from '@angular/forms';

profileForm = new FormGroup({
  name: new FormControl(''),
});
```

```html
<form [formGroup]="profileForm" (ngSubmit)="save()">
  <input formControlName="name" />
  <button type="submit">Save</button>
</form>
```

Good for larger forms and more control.

## React vs Angular

| Topic              | React                         | Angular                                      |
| ------------------ | ----------------------------- | -------------------------------------------- |
| Basic input sync   | `value` + `onChange`          | `[(ngModel)]` or Reactive Forms              |
| Simple forms       | State in component            | Template-driven Forms                        |
| Complex forms      | State / form libraries        | Reactive Forms                               |
| Validation         | Custom / libraries            | Built-in validators + more                   |

## Easy connection

React controlled inputs and Angular `[(ngModel)]` both keep the field and data together.

Angular also gives a stronger built-in forms system.

:::caution
This lesson is only an introduction.
The complete Forms chapter comes later in Angular.
:::

## Try it yourself

1. What is validation?
2. Write a React controlled input for `email`.
3. Write an Angular `[(ngModel)]` input for `email`.
4. Name the two Angular form styles.

## Next lesson

Next: [0.18 — React → Angular Cheat Sheet](/angular/part-0-react-to-angular/cheat-sheet/)
