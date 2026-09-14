---
title: '0.13 — Dependency Injection'
description: Understand Angular Dependency Injection with a simple beginner analogy and tiny code example.
---

# Lesson 0.13 — Dependency Injection

:::tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## Simple analogy

A student needs a book.

The student does **not** create the book factory.

The book is **provided** to the student.

That is the idea of <span class="new-word" tabindex="0">Dependency Injection<span class="new-word__tip" role="tooltip">Angular gives your component the tools/services it needs.</span></span>.

## What is Dependency Injection (DI)?

<span class="new-word" tabindex="0">Dependency Injection<span class="new-word__tip" role="tooltip">A class receives the objects it needs, instead of creating them itself.</span></span> means:

> A class receives the objects it needs, instead of creating them itself.

In Angular:

- Component needs a service
- Angular creates/provides the service
- Angular injects it into the component

## Why DI helps

Without DI:

```typescript
// hard to manage in large apps
const service = new StudentService();
```

With DI:

- Angular manages creation
- Sharing becomes easier
- Testing becomes easier
- Code stays cleaner

## Angular DI in simple code

### Service

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  getBook() {
    return 'Angular Basics';
  }
}
```

### Component receives the service

```typescript
import { Component } from '@angular/core';
import { BookService } from './book.service';

@Component({
  selector: 'app-reader',
  template: `<h2>{{ book }}</h2>`,
  standalone: true,
})
export class ReaderComponent {
  book = '';

  constructor(private bookService: BookService) {
    this.book = this.bookService.getBook();
  }
}
```

### Explain the code

1. `BookService` is the dependency
2. The constructor asks for `BookService`
3. Angular injects it automatically
4. The component uses `getBook()`

## Another modern style (optional)

Angular also supports `inject()`:

```typescript
private bookService = inject(BookService);
```

Both styles inject a dependency.

Beginners can start with constructor injection.

## React connection

React does not use Angular-style DI as a core feature.

In React you often:

- import a helper directly
- pass functions/data with props
- use Context for shared values

Angular DI is a built-in system for providing services.

:::note
These are learning connections, not exact replacements.
:::

## What not to study yet

Skip for now:

- Advanced providers
- Injection tokens
- Multi-providers
- Complex hierarchical injectors

Learn the basic idea first.

## Memory tip

| Word        | Easy meaning                          |
| ----------- | ------------------------------------- |
| Dependency  | Something your class needs            |
| Injection   | It is given to your class             |
| DI          | “Please give me what I need”          |

## Try it yourself

1. Explain DI using the student-and-book analogy.
2. What does `@Injectable` mean?
3. In a component, where do we commonly receive a service?

## Next lesson

Next: [0.14 — API Calls](/angular/part-0-react-to-angular/api-calls/)
