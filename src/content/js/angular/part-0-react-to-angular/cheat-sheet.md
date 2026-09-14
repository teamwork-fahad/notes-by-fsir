---
title: '0.18 — React → Angular Cheat Sheet'
description: A quick reference table connecting React ideas to Angular ideas for beginners.
---

# Lesson 0.18 — React → Angular Cheat Sheet

Use this page for quick revision.

:::note
These are **learning connections**, not exact replacements.
React and Angular solve similar problems with different designs.
:::

## Quick reference table

| React                         | Angular                          |
| ----------------------------- | -------------------------------- |
| Component                     | Component                        |
| Props                         | `@Input()`                       |
| Callback / Event prop         | `@Output()` + `EventEmitter`     |
| JSX                           | HTML Template                    |
| `{value}`                     | `{{ value }}`                    |
| `onClick`                     | `(click)`                        |
| `className`                   | `class` / `ngClass`              |
| Conditional rendering         | `*ngIf` / `@if`                  |
| `.map()`                      | `*ngFor` / `@for`                |
| React Router                  | Angular Router                   |
| Custom hooks / shared logic   | Services                         |
| Context / dependency patterns | Dependency Injection             |
| `fetch()`                     | `HttpClient`                     |
| Promise                       | Observable (often)               |
| React forms / controlled input| Angular Forms (`ngModel` / Reactive Forms) |
| `useEffect(() => {}, [])`     | `ngOnInit()` (similar first-load idea) |
| JavaScript (common start)     | TypeScript                       |
| UI library                    | Full framework                   |

## Tiny syntax map

### Show a value

React:

```jsx
<h2>{name}</h2>
```

Angular:

```html
<h2>{{ name }}</h2>
```

### Click event

React:

```jsx
<button onClick={save}>Save</button>
```

Angular:

```html
<button (click)="save()">Save</button>
```

### Pass data parent → child

React:

```jsx
<Student name="Sara" />
```

Angular:

```html
<app-student name="Sara"></app-student>
```

### Lists

React:

```jsx
students.map((s) => <p key={s}>{s}</p>)
```

Angular:

```html
<p *ngFor="let s of students">{{ s }}</p>
```

## Memory tips

1. `@Input()` = data in
2. `@Output()` = event out
3. `{{ }}` = show value
4. `[]` = property binding
5. `()` = event binding
6. `[()]` = two-way binding

## Before Unit 3

You should now feel comfortable with these ideas:

- Components
- Inputs and outputs
- Binding
- Lists and conditions
- Services and DI at a basic level
- HttpClient and Observables at a basic level
- Routing and Forms at a basic level

## Next lesson

Next: [0.19 — Mini Project: Student List](/angular/part-0-react-to-angular/mini-project/)
