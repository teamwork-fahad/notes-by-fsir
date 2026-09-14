---
title: '0.3 — JavaScript vs TypeScript'
description: A beginner introduction to TypeScript for Angular students who know basic JavaScript.
---

# Lesson 0.3 — JavaScript vs TypeScript

Angular uses <span class="new-word" tabindex="0">TypeScript<span class="new-word__tip" role="tooltip">JavaScript with types. It helps catch mistakes earlier.</span></span>.

You do not need to become a TypeScript expert before Angular.

But you should know the basics.

:::tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## What is JavaScript?

JavaScript is the language of the browser.

```javascript
let name = "Fahad";
let age = 20;
let isStudent = true;
```

JavaScript is flexible.

That is good for quick coding.

But mistakes can hide until the app runs.

## What is TypeScript?

TypeScript is JavaScript **with types**.

```typescript
let name: string = "Fahad";
let age: number = 20;
let isStudent: boolean = true;
```

TypeScript checks your code before it runs.

If you write wrong types, TypeScript warns you early.

## What is a type?

A **type** tells TypeScript what kind of value a variable can hold.

Common types:

| Type      | Example        |
| --------- | -------------- |
| `string`  | `"Hello"`      |
| `number`  | `25`           |
| `boolean` | `true`/`false` |
| `any`     | almost anything (avoid when learning) |

```typescript
let course: string = "Angular";
let marks: number = 85;
let passed: boolean = true;
```

If you later write:

```typescript
marks = "eighty five"; // error
```

TypeScript says this is wrong.

That protection is called <span class="new-word" tabindex="0">type safety<span class="new-word__tip" role="tooltip">Checking that values match the expected type before the app runs.</span></span>.

## Why type safety helps

Imagine this JavaScript:

```javascript
function add(a, b) {
  return a + b;
}

add(2, "3"); // becomes "23" — surprise!
```

With TypeScript:

```typescript
function add(a: number, b: number): number {
  return a + b;
}

add(2, 3); // OK
// add(2, "3"); // TypeScript error
```

You catch mistakes earlier.

## Interfaces

An <span class="new-word" tabindex="0">interface<span class="new-word__tip" role="tooltip">A plan that describes which fields an object should have.</span></span> describes the shape of an object.

```typescript
interface Student {
  name: string;
  age: number;
}

const student: Student = {
  name: "Sara",
  age: 18,
};
```

If you forget `age`, TypeScript warns you.

:::note
Think of an interface like a form template.
It tells you which fields are required.
:::

## Classes

A **class** is a blueprint for creating objects.

```typescript
class Student {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    return "Hello " + this.name;
  }
}

const s = new Student("Ahmed");
console.log(s.greet());
```

Angular components and services are written as classes.

That is one big reason Angular uses TypeScript.

## Why TypeScript is useful in large projects

In small code, JavaScript feels easy.

In large apps:

- many files
- many developers
- many data shapes

TypeScript helps by:

- catching errors early
- making code easier to read
- improving editor autocomplete
- explaining what functions expect

## Angular and TypeScript

In Angular you often see:

```typescript
export class HomeComponent {
  title: string = 'Home';
}
```

And:

```typescript
@Input() name: string = '';
```

These type annotations make Angular code clearer.

## What you should know before Angular

You should be comfortable with:

1. Variables with types (`string`, `number`, `boolean`)
2. Simple functions with typed parameters
3. Simple interfaces
4. Simple classes

You do **not** need advanced TypeScript topics yet.

:::caution
This lesson is only an overview.
It is not a full TypeScript course.
:::

## Try it yourself

Convert this JavaScript to TypeScript:

```javascript
let city = "Delhi";
let population = 100;
let isCapital = true;
```

Then create an interface called `Book` with:

- `title` (string)
- `pages` (number)

## Key takeaway

> Before learning Angular deeply, students should know basic TypeScript.

## Next lesson

Next: [0.4 — Components](/angular/part-0-react-to-angular/components/)
