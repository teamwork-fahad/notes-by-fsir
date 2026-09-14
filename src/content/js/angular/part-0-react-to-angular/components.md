---
title: '0.4 — Components'
description: Learn the component concept in React and Angular with simple beginner examples.
---

# Lesson 0.4 — Components

:::tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## What is a component?

A <span class="new-word" tabindex="0">component<span class="new-word__tip" role="tooltip">A small reusable UI part, like a button, card, or navbar.</span></span> is a small reusable part of the user interface.

Examples:

- Navbar
- Button
- Student card
- Footer

Instead of writing one giant page, we build many small parts.

## Why components are useful

Components help us:

- Reuse UI
- Keep code organized
- Fix bugs in one place
- Build big apps from small pieces

## Real-world analogy

A website is like a school.

Each classroom can be treated like a component.

- Classroom A = Header
- Classroom B = Student List
- Classroom C = Footer

The school (app) is made of classrooms (components).

## React component

In React, a simple component can be a function:

```jsx
function Student() {
  return <h2>Hello Student</h2>;
}
```

Use it like this:

```jsx
<Student />
```

### Explain the code

1. `function Student()` creates a component named `Student`
2. `return` sends UI back to the screen
3. `<h2>Hello Student</h2>` is what the user sees

## Angular component

In modern Angular, a component is a TypeScript class with a `@Component` decorator.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  template: `<h2>Hello Student</h2>`,
  standalone: true,
})
export class StudentComponent {}
```

Use it in another template like this:

```html
<app-student></app-student>
```

### Explain the code

1. `@Component({...})` tells Angular: “This class is a component.”
2. `selector: 'app-student'` is the HTML tag name
3. `template` is the HTML shown on screen
4. `StudentComponent` is the TypeScript class name

:::note
Older Angular apps used NgModules a lot.
Modern Angular often uses <span class="new-word" tabindex="0">standalone<span class="new-word__tip" role="tooltip">A modern Angular component style that does not need NgModule.</span></span> components.
You may see both styles in different projects.
:::

## React vs Angular component files

### React (common style)

One file with JSX:

```text
Student.jsx
```

### Angular (common style)

Often split into:

```text
student.component.ts
student.component.html
student.component.css
```

You can also keep the template inline in the `.ts` file for small examples.

## Same idea, different shape

| Idea            | React                         | Angular                                      |
| --------------- | ----------------------------- | -------------------------------------------- |
| UI building unit | Component                    | Component                                    |
| How you write it | Function / class + JSX        | Class + `@Component`                         |
| How you use it   | `<Student />`                 | `<app-student></app-student>`                |
| Markup           | JSX                           | HTML template                                |

## Easy connection

If you understand React components, you already understand the main idea.

Angular components do the same job.

They just use TypeScript classes and HTML templates.

## Try it yourself

1. Create a React component that shows `Welcome to AppXwinD`.
2. Create an Angular component that shows the same text.
3. Explain in one sentence: What is a component?

## Next lesson

Next: [0.5 — Props vs @Input()](/angular/part-0-react-to-angular/props-vs-input/)
