---
title: '0.16 — Routing'
description: Compare React Router and Angular Router for beginner page navigation.
---

# Lesson 0.16 — Routing

## What is routing?

**Routing** means changing pages (or views) based on the URL.

Example:

- `/students` → Student List page
- `/about` → About page
- `/login` → Login page

The user clicks a link, the URL changes, and the correct component appears.

## Important words

| Word       | Easy meaning                                  |
| ---------- | --------------------------------------------- |
| URL        | The address in the browser                    |
| Route      | A rule that connects a path to a component    |
| Router     | The system that handles navigation            |
| Navigation | Moving from one page/component to another     |

## React Router example

```jsx
import { Routes, Route } from "react-router-dom";
import Students from "./Students";
import About from "./About";

function App() {
  return (
    <Routes>
      <Route path="/students" element={<Students />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```

### Explain the code

1. `path="/students"` is the URL path
2. `element={<Students />}` is the component to show
3. React Router matches the URL and renders the page

## Angular Router example

```typescript
import { Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { AboutComponent } from './about.component';

export const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'about', component: AboutComponent },
];
```

In a template, links often look like:

```html
<a routerLink="/students">Students</a>
<a routerLink="/about">About</a>
```

And the page outlet:

```html
<router-outlet></router-outlet>
```

### Explain the code

1. `path: 'students'` matches the URL
2. `component: StudentsComponent` chooses what to show
3. `routerLink` creates navigation links
4. `router-outlet` is the place where the routed component appears

## Side-by-side

| Idea              | React Router                          | Angular Router                          |
| ----------------- | ------------------------------------- | --------------------------------------- |
| Define route      | `<Route path=... element=... />`      | `{ path: '...', component: ... }`       |
| Link              | `<Link to="/students">`               | `<a routerLink="/students">`            |
| Show page area    | Parent route layout / outlet patterns | `<router-outlet>`                       |

## Easy connection

React Router and Angular Router solve the same problem:

> Connect a URL to a page/component.

## Keep it basic

Full Angular Routing includes:

- Nested routes
- Route parameters (`:id`)
- Guards
- Lazy loading

Those come later in the Angular syllabus.

For Part 0, remember only the core idea.

## Try it yourself

1. What is routing?
2. Write one React route for `/contact`.
3. Write one Angular route for `/contact`.

## Next lesson

Next: [0.17 — Forms](/angular/part-0-react-to-angular/forms/)
