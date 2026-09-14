---
title: '0.1 — React and Angular: What Are They?'
description: Learn what React and Angular are, why developers use them, and the basic differences between them.
---

# Lesson 0.1 — React and Angular: What Are They?

Welcome to **Part 0 — React → Angular Bridge**.

This part helps you move from simple React ideas to Angular ideas.

You do **not** need to be a React expert.

:::tip[New words]
Dotted words with a small **?** are new words.
Hover or tap them to see a short meaning.
Full list: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## What is a frontend library or framework?

A website has two main parts:

- <span class="new-word" tabindex="0">Backend<span class="new-word__tip" role="tooltip">The server side: database, APIs, and server logic.</span></span> — server, database, APIs
- <span class="new-word" tabindex="0">Frontend<span class="new-word__tip" role="tooltip">The part users see and click in the browser.</span></span> — what the user sees and clicks

A <span class="new-word" tabindex="0">frontend library/framework<span class="new-word__tip" role="tooltip">A tool that helps you build website screens faster.</span></span> helps us build the <span class="new-word" tabindex="0">user interface (UI)<span class="new-word__tip" role="tooltip">Everything the user can see and interact with on screen.</span></span> faster.

Examples:

- React
- Angular
- Vue

## What is React?

**React** is a JavaScript <span class="new-word" tabindex="0">library<span class="new-word__tip" role="tooltip">A tool focused on one main job. React’s main job is building UI.</span></span> for building user interfaces.

It helps you build pages using <span class="new-word" tabindex="0">components<span class="new-word__tip" role="tooltip">Small reusable UI parts, like a button, card, or navbar.</span></span>.

A component is a small reusable UI piece, like a button, card, or navbar.

```jsx
function Hello() {
  return <h1>Hello Student</h1>;
}
```

### Why do developers use React?

- It is popular
- It has many jobs
- Component idea is easy to learn
- Large community and many tutorials

## What is Angular?

**Angular** is a TypeScript <span class="new-word" tabindex="0">framework<span class="new-word__tip" role="tooltip">A bigger ready-made structure with many built-in tools for building apps.</span></span> for building web applications.

It also uses **components**.

But Angular gives you more built-in tools, such as:

- <span class="new-word" tabindex="0">Routing<span class="new-word__tip" role="tooltip">Showing different pages based on the URL, like /students or /about.</span></span>
- Forms
- <span class="new-word" tabindex="0">HTTP client<span class="new-word__tip" role="tooltip">A tool that calls APIs to get or send data from a server.</span></span>
- <span class="new-word" tabindex="0">Dependency Injection<span class="new-word__tip" role="tooltip">Angular gives your component the services/tools it needs, instead of the component creating them itself.</span></span>

```typescript
@Component({
  selector: 'app-hello',
  template: `<h1>Hello Student</h1>`,
})
export class HelloComponent {}
```

### Why do developers use Angular?

- It is a full framework
- Good structure for large apps
- Strong TypeScript support
- Built-in tools reduce the need for many extra libraries

## Why should students learn Angular?

If you know a little React, Angular will feel new at first.

But many ideas are similar:

| Idea              | In React        | In Angular              |
| ----------------- | --------------- | ----------------------- |
| UI building block | Component       | Component               |
| Pass data down    | <span class="new-word" tabindex="0">Props<span class="new-word__tip" role="tooltip">Data passed from a parent component to a child component in React.</span></span> | <span class="new-word" tabindex="0">`@Input()`<span class="new-word__tip" role="tooltip">Angular way to receive data from parent to child.</span></span> |
| Send event up     | Callback / prop | <span class="new-word" tabindex="0">`@Output()`<span class="new-word__tip" role="tooltip">Angular way for a child to send an event to its parent.</span></span> |
| Show / hide UI    | Conditional JSX | `*ngIf` or `@if`        |
| Show lists        | `.map()`        | `*ngFor` or `@for`      |
| Change pages      | React Router    | Angular Router          |

Learning Angular helps you:

- Understand a second major frontend tool
- Work on company projects that use Angular
- Think in a clear project structure

## Basic difference: library vs framework

### React (library)

React mainly focuses on the UI.

You often add other tools yourself, such as:

- React Router for pages
- Extra libraries for forms or HTTP

### Angular (framework)

Angular already includes many tools.

You get a ready structure for building full apps.

:::note
Simple memory tip:

- **React** = flexible toolbox for UI
- **Angular** = complete workshop with many tools included
:::

## Simple comparison table

| Topic            | React                 | Angular                         |
| ---------------- | --------------------- | ------------------------------- |
| Type             | Library               | Framework                       |
| Main language    | JavaScript / JSX      | TypeScript / HTML templates     |
| UI parts         | Components            | Components                      |
| Passing data     | Props                 | `@Input()`                      |
| Sending events   | Callbacks / handlers  | `@Output()` + `EventEmitter`    |
| Routing          | React Router (extra)  | Angular Router (built-in)       |
| State idea       | `useState` and more   | Component data + data binding   |
| Shared logic     | Hooks / utilities     | Services                        |
| Getting services | Manual imports / context | Dependency Injection (DI)    |

## Important point

React and Angular solve similar problems.

They use **different syntax** and **different style**.

Your goal in Part 0 is simple:

> “I already understand some React concepts. Now I can understand how Angular does similar things in a different way.”

## Try it yourself

1. Write one sentence: What is React?
2. Write one sentence: What is Angular?
3. Is React a library or a framework?
4. Is Angular a library or a framework?

## Next lesson

Next: [0.2 — React vs Angular](/angular/part-0-react-to-angular/react-vs-angular/)
