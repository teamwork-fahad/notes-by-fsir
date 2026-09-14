---
title: '0.20 — Final Practice'
description: Beginner practice questions for the React to Angular bridge section.
---

# Lesson 0.20 — Final Practice

Answer these beginner questions to revise Part 0.

Do not worry if you need to look back at earlier lessons.

---

## A. Multiple choice

**1. Which language is commonly used with Angular?**

- A. Only Python
- B. TypeScript
- C. Only PHP
- D. Only SQL

**2. React is mainly a ______.**

- A. Database
- B. Operating system
- C. UI library
- D. Backend server

**3. What is `@Input()` used for?**

- A. Sending events to the parent
- B. Receiving data from the parent
- C. Calling APIs
- D. Creating routes

**4. What does `{{ name }}` mean in Angular?**

- A. A CSS style
- B. Interpolation (show the value)
- C. A database query
- D. A route path

**5. Which Angular feature is used for dependency injection?**

- A. JSX
- B. Angular’s DI system with services
- C. Only CSS modules
- D. Only localStorage

**6. What is `*ngFor` used for?**

- A. Styling text
- B. Looping through a list
- C. Creating a database
- D. Hashing passwords

---

## B. Identify React or Angular

For each snippet, write **React** or **Angular**.

**7.**

```jsx
<button onClick={handleClick}>Save</button>
```

**8.**

```html
<button (click)="handleClick()">Save</button>
```

**9.**

```jsx
{students.map((s) => <p key={s}>{s}</p>)}
```

**10.**

```html
<p *ngIf="isLoggedIn">Welcome</p>
```

---

## C. Fill in the blanks

**11.** Parent-to-child data in React is called ______.

**12.** Child-to-parent events in Angular often use `@Output()` and ______.

**13.** Angular’s HTTP tool is called ______.

**14.** Angular HTTP calls commonly return an ______ instead of only a Promise.

---

## D. Small coding questions

**15.** Convert this React idea to Angular interpolation:

```jsx
<h2>{title}</h2>
```

**16.** Write Angular event binding for a click that calls `save()`.

**17.** Write a simple Angular `*ngFor` that prints each item in `cities`.

---

## E. Concept questions

**18.** In one sentence, what is a component?

**19.** Why do we use services in Angular?

**20.** What is one basic difference between Promise and Observable?

---

## Answer key

1. B  
2. C  
3. B  
4. B  
5. B  
6. B  
7. React  
8. Angular  
9. React  
10. Angular  
11. props  
12. `EventEmitter`  
13. `HttpClient`  
14. Observable  
15. `<h2>{{ title }}</h2>`  
16. `<button (click)="save()">Save</button>` (text can vary)  
17. Example:

```html
<p *ngFor="let city of cities">{{ city }}</p>
```

18. A reusable UI building block  
19. To share reusable logic/data (and keep components cleaner)  
20. Example: Promise usually gives one result; Observable can emit multiple values over time

---

## Part 0 complete

Great work.

You now have a bridge from React ideas to Angular ideas.

:::tip
Next step: start **Unit 3 — Fundamentals of Angular** when it is available in this course.
:::

Review pages if needed:

- [Cheat Sheet](/angular/part-0-react-to-angular/cheat-sheet/)
- [Mini Project](/angular/part-0-react-to-angular/mini-project/)
- [Angular Home](/angular/)
