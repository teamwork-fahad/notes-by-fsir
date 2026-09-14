---
title: '0.7 — State and Data Binding'
description: Compare React state with Angular interpolation, property binding, event binding, and two-way binding.
---

# Lesson 0.7 — State and Data Binding

:::tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## What is state?

<span class="new-word" tabindex="0">State<span class="new-word__tip" role="tooltip">Data that can change while the app is running, like a counter or login status.</span></span> means data that can change while the app is running.

Examples:

- Counter value
- Login status
- Form text
- Dark mode on/off

When state changes, the UI should update.

## React state with useState

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### Explain the code

1. `useState(0)` starts count at `0`
2. `count` is the current value
3. `setCount` updates the value
4. `{count}` shows the value in JSX

## Angular component data

In Angular beginners often store data as class properties.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h2>{{ count }}</h2>
    <button (click)="increase()">+</button>
  `,
  standalone: true,
})
export class CounterComponent {
  count = 0;

  increase() {
    this.count = this.count + 1;
  }
}
```

### Explain the code

1. `count = 0` stores the data
2. `{{ count }}` shows it in the template
3. `(click)="increase()"` updates it

## What is data binding?

<span class="new-word" tabindex="0">Data binding<span class="new-word__tip" role="tooltip">Connecting component data with the HTML template so the screen stays updated.</span></span> connects component data and the HTML template.

Angular has four common binding styles.

## 1. Interpolation

<span class="new-word" tabindex="0">Interpolation<span class="new-word__tip" role="tooltip">Showing a value in the template with curly braces like name inside double braces.</span></span> means: show a value in the template.

```html
{{ name }}
```

Example:

```typescript
name = 'Fahad';
```

```html
<h2>Hello {{ name }}</h2>
```

Result:

```text
Hello Fahad
```

:::note
React `{name}` is similar to Angular `{{ name }}`.
:::

## 2. Property binding

Set an HTML property from component data.

```html
[property]="value"
```

Example:

```typescript
imageUrl = 'student.png';
isDisabled = true;
```

```html
<img [src]="imageUrl" />
<button [disabled]="isDisabled">Save</button>
```

### Explain

- `[src]` binds the image source
- `[disabled]` enables or disables the button

## 3. Event binding

Listen to user actions.

```html
(click)="method()"
```

Example:

```html
<button (click)="save()">Save</button>
```

```typescript
save() {
  console.log('Saved');
}
```

## 4. Two-way binding

Keep input and data in sync both ways.

```html
[(ngModel)]="name"
```

Example:

```typescript
name = '';
```

```html
<input [(ngModel)]="name" />
<p>Hello {{ name }}</p>
```

When the user types, `name` updates.
When `name` changes, the input updates too.

:::caution
`ngModel` needs Angular Forms support (`FormsModule`).
You will learn full Forms later.
:::

## Binding cheat view

| Binding            | Syntax                 | Direction        |
| ------------------ | ---------------------- | ---------------- |
| Interpolation      | `{{ name }}`           | Class → Template |
| Property binding   | `[src]="url"`          | Class → Template |
| Event binding      | `(click)="save()"`     | Template → Class |
| Two-way binding    | `[(ngModel)]="name"`   | Both ways        |

## Easy connection

| React idea                 | Angular idea                          |
| -------------------------- | ------------------------------------- |
| `useState` value           | Component property                    |
| `{count}`                  | `{{ count }}`                         |
| `onClick`                  | `(click)`                             |
| Controlled input           | Often `[(ngModel)]` or Reactive Forms |

## Try it yourself

Build a tiny counter in both React and Angular:

- Start at 0
- Button increases by 1
- Show the number on screen

## Next lesson

Next: [0.8 — Conditional Rendering](/angular/part-0-react-to-angular/conditional-rendering/)
