---
title: '0.11 — React Hooks vs Angular Lifecycle Hooks'
description: Compare React useEffect with Angular ngOnInit and the basic idea of lifecycle hooks.
---

# Lesson 0.11 — React Hooks vs Angular Lifecycle Hooks

## What does lifecycle mean?

A component has a life:

1. It is created
2. It appears on the screen
3. It may update
4. It is removed

**Lifecycle hooks** let you run code at those moments.

## Why lifecycle hooks are useful

Common uses:

- Load data when the page opens
- Start a timer
- Clean up when the component closes
- React when input values change

## React example: useEffect

```jsx
import { useEffect } from "react";

function Students() {
  useEffect(() => {
    console.log("Component loaded");
  }, []);

  return <h2>Students</h2>;
}
```

### Explain the code

1. `useEffect` runs side effects
2. `[]` means: run mainly after first load
3. `"Component loaded"` prints when the component mounts

:::note
React Hooks do more than lifecycle work.
`useEffect` is only one hook.
:::

## Angular example: ngOnInit

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  template: `<h2>Students</h2>`,
  standalone: true,
})
export class StudentsComponent implements OnInit {
  ngOnInit() {
    console.log('Component loaded');
  }
}
```

### Explain the code

1. `OnInit` is an interface for the init lifecycle
2. `ngOnInit()` runs after Angular creates the component
3. This is a common place to load starting data

## Easy connection

| Moment                 | React idea           | Angular idea     |
| ---------------------- | -------------------- | ---------------- |
| After first load       | `useEffect(..., [])` | `ngOnInit()`     |
| Run code at life stage | Hooks / effects      | Lifecycle hooks  |

They are not exact copies.

But the beginner idea is similar:

> Run code when the component is ready.

## Important Angular hooks (names only)

You will see more later, such as:

- `ngOnInit` — component initialized
- `ngOnChanges` — input values changed
- `ngOnDestroy` — component about to be removed

Do **not** memorize every hook deeply here.

:::tip
Angular Lifecycle Hooks will be taught properly later in the Angular syllabus.
This lesson only builds the bridge from React.
:::

## Simple practice idea

When a Student List page opens:

- React: call API inside `useEffect`
- Angular: call API inside `ngOnInit`

Same goal. Different place.

## Try it yourself

1. What does lifecycle mean in one sentence?
2. What is `ngOnInit()` used for?
3. Which React hook is often compared with first-load setup?

## Next lesson

Next: [0.12 — Services](/angular/part-0-react-to-angular/services/)
