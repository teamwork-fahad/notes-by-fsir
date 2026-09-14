---
title: '0.12 — Services'
description: Learn why Angular apps use services for reusable logic and shared data.
---

# Lesson 0.12 — Services

## Why do applications need services?

Suppose 10 components need student data.

If you write the same API code in every component, you get:

- Duplicated code
- Harder updates
- More bugs

Better idea:

> Put shared logic in one place.

That place is often a **service**.

## Real-world analogy

A school library is like a service.

Many students (components) need books (data/logic).

They do not each build a library.
They use the shared library.

:::tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## What is a service?

A <span class="new-word" tabindex="0">service<span class="new-word__tip" role="tooltip">A reusable class for shared logic, shared data, or API code.</span></span> is a TypeScript class that holds reusable logic.

Common uses:

- Shared data
- API-related code
- Business rules
- Utility methods

## Angular service example

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  getStudents() {
    return ['Ahmed', 'Sara', 'Rahul', 'Priya'];
  }
}
```

### Explain the code

1. `@Injectable` marks the class as a service Angular can create
2. `providedIn: 'root'` makes one shared app-wide instance
3. `getStudents()` is reusable logic

## Using the service in a component

```typescript
import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student-list',
  template: `
    <p *ngFor="let student of students">{{ student }}</p>
  `,
  standalone: true,
})
export class StudentListComponent implements OnInit {
  students: string[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.students = this.studentService.getStudents();
  }
}
```

### Explain the code

1. The component asks for `StudentService`
2. Angular provides it through Dependency Injection
3. `ngOnInit` loads the student list from the service

## React connection

In React, similar shared logic may live in:

- Custom hooks
- Utility files
- Context
- API helper modules

Angular’s common pattern for this is **services**.

| Need              | React common approach     | Angular common approach |
| ----------------- | ------------------------- | ----------------------- |
| Reusable logic    | Custom hook / util        | Service                 |
| Shared app data   | Context / store           | Service / store         |
| API calls         | Helper + hooks            | Service + HttpClient    |

## Basic ideas to remember

- **Service** = reusable logic class
- **Reusable logic** = write once, use in many components
- **Shared data** = one place many components can read
- **API-related code** = often belongs in services

## Next step preview

How does the component get the service?

Angular uses <span class="new-word" tabindex="0">Dependency Injection (DI)<span class="new-word__tip" role="tooltip">Angular gives your component the services it needs, instead of the component creating them itself.</span></span>.

That is the next lesson.

## Try it yourself

1. Why is a service useful?
2. Create a `MathService` with an `add(a, b)` method.
3. Explain `providedIn: 'root'` in simple words.

## Next lesson

Next: [0.13 — Dependency Injection](/angular/part-0-react-to-angular/dependency-injection/)
