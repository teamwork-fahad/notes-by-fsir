---
title: '0.2 — React vs Angular'
description: A beginner-friendly side-by-side comparison of React and Angular concepts.
---

# Lesson 0.2 — React vs Angular

In this lesson, we compare React and Angular idea by idea.

For each topic you will see:

1. React
2. Angular
3. Easy Connection

:::tip
Do not memorize everything today.
Just notice the connections.
:::

## 1. React

### React

React is a UI library. You build screens with components.

### Angular

Angular is a full framework. You build apps with components plus many built-in tools.

### Easy Connection

Both help you build frontend apps. Angular includes more tools by default.

---

## 2. Angular

### React

You often choose your own project tools.

### Angular

Angular CLI and Angular structure guide how projects are organized.

### Easy Connection

React feels freer. Angular feels more structured.

---

## 3. Language

### React

Most beginners start with JavaScript and JSX.

```jsx
const name = "Fahad";
return <h2>Hello {name}</h2>;
```

### Angular

Angular commonly uses TypeScript and HTML templates.

```typescript
name = 'Fahad';
```

```html
<h2>Hello {{ name }}</h2>
```

### Easy Connection

JSX mixes HTML-like code inside JavaScript. Angular keeps HTML in a template and TypeScript in a class.

---

## 4. Components

### React

```jsx
function StudentCard() {
  return <p>Student Card</p>;
}
```

### Angular

```typescript
@Component({
  selector: 'app-student-card',
  template: `<p>Student Card</p>`,
})
export class StudentCardComponent {}
```

### Easy Connection

Both split the UI into reusable parts called components.

---

## 5. Templates

### React

The template is usually JSX inside the function.

### Angular

The template is HTML (inline or in a `.html` file).

### Easy Connection

React template = JSX. Angular template = HTML with Angular syntax.

---

## 6. Data binding

### React

You often use state and render values in JSX.

```jsx
const [count, setCount] = useState(0);
return <h2>{count}</h2>;
```

### Angular

You bind data from the class to the template.

```html
<h2>{{ count }}</h2>
```

### Easy Connection

Both show data on the screen. Angular uses special binding syntax like `{{ }}`, `[]`, and `()`.

---

## 7. Events

### React

```jsx
<button onClick={handleClick}>Save</button>
```

### Angular

```html
<button (click)="handleClick()">Save</button>
```

### Easy Connection

`onClick` in React is like `(click)` in Angular.

---

## 8. Conditional rendering

### React

```jsx
{isOpen && <p>Open</p>}
```

### Angular

```html
<p *ngIf="isOpen">Open</p>
```

or modern syntax:

```html
@if (isOpen) {
  <p>Open</p>
}
```

### Easy Connection

Both show or hide UI based on a condition.

---

## 9. Lists

### React

```jsx
students.map((s) => <li key={s.id}>{s.name}</li>)
```

### Angular

```html
<li *ngFor="let s of students">{{ s.name }}</li>
```

### Easy Connection

`.map()` in React is like `*ngFor` / `@for` in Angular.

---

## 10. Forms

### React

You usually control inputs with state.

```jsx
<input value={name} onChange={(e) => setName(e.target.value)} />
```

### Angular

You can use Template-driven Forms or Reactive Forms.

```html
<input [(ngModel)]="name" />
```

### Easy Connection

Both collect user input. Angular has built-in form systems.

---

## 11. Routing

### React

Often uses React Router.

```jsx
<Route path="/students" element={<Students />} />
```

### Angular

Uses Angular Router.

```typescript
{ path: 'students', component: StudentsComponent }
```

### Easy Connection

Both connect a URL to a page/component.

---

## 12. API calls

### React

Commonly uses `fetch` or libraries like Axios.

```javascript
fetch('/api/students');
```

### Angular

Commonly uses `HttpClient`.

```typescript
this.http.get('/api/students');
```

### Easy Connection

Same goal: get data from a server. Different tools.

---

## 13. Services

### React

Shared logic often lives in custom hooks, utility files, or context.

### Angular

Shared logic often lives in **services**.

```typescript
@Injectable({ providedIn: 'root' })
export class StudentService {}
```

### Easy Connection

Angular services are a common place for reusable logic and API code.

---

## 14. Dependency Injection

### React

You import what you need, or pass values through props/context.

### Angular

Angular can **inject** services into components.

### Easy Connection

DI means: “Give me what I need. Do not create everything yourself.”

---

## 15. State management

### React

`useState`, Context, Redux, Zustand, and more.

### Angular

Component properties, services, signals, NgRx, and more.

### Easy Connection

Both need a place to store and update app data. Tools differ by project size.

---

## 16. Project structure

### React

Flexible. Many styles exist (Create React App, Vite, Next.js folders, and more).

### Angular

More standard structure from Angular CLI:

- `app.component.ts`
- feature folders
- services, routes, modules/standalone setup

### Easy Connection

Angular projects often look more similar from team to team.

---

## Quick summary

| Need                 | React idea              | Angular idea                 |
| -------------------- | ----------------------- | ---------------------------- |
| Build UI             | Components + JSX        | Components + HTML templates  |
| Pass data to child   | Props                   | `@Input()`                   |
| Child tells parent   | Callback                | `@Output()`                  |
| Show list            | `.map()`                | `*ngFor` / `@for`            |
| Change page          | React Router            | Angular Router               |
| Call API             | `fetch` / Axios         | `HttpClient`                 |
| Share logic          | Hooks / utils           | Services                     |

## Try it yourself

Match these pairs:

1. Props → ?
2. `onClick` → ?
3. `.map()` → ?
4. React Router → ?

## Next lesson

Next: [0.3 — JavaScript vs TypeScript](/angular/part-0-react-to-angular/typescript-overview/)
