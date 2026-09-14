---
title: '0.15 — Observables and RxJS'
description: A beginner introduction to RxJS Observables and how Angular HTTP uses them.
---

# Lesson 0.15 — Observables and RxJS

:::tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## What is RxJS?

<span class="new-word" tabindex="0">RxJS<span class="new-word__tip" role="tooltip">A library for working with data streams over time.</span></span> means Reactive Extensions for JavaScript.

Simple meaning:

> RxJS is a library for working with data streams over time.

Angular uses RxJS a lot, especially with HTTP and events.

## What is an Observable?

An <span class="new-word" tabindex="0">Observable<span class="new-word__tip" role="tooltip">A stream of data that can arrive now or later, and may send more than one value.</span></span> is a value that can arrive now or later, and may send more than one value over time.

Beginner picture:

```text
Observable = a stream of data
```

Like a YouTube livestream:

- You subscribe to watch
- Values (frames/data) can arrive over time
- You can unsubscribe to stop

## Why Angular uses Observables

Angular HTTP calls often return Observables because:

- Requests finish later (async)
- You can cancel some requests
- You can transform data with operators
- Many Angular APIs already use this style

## Basic HTTP Observable example

```typescript
this.http.get('/api/students').subscribe((data) => {
  console.log(data);
});
```

### Explain the code

1. `http.get(...)` returns an Observable
2. `.subscribe(...)` means: start listening and receive the result
3. `data` is the response from the server

:::tip
For beginners:  
`subscribe` ≈ “run this when the data arrives.”
:::

## Promise vs Observable (simple difference)

| Topic            | Promise                         | Observable                          |
| ---------------- | ------------------------------- | ----------------------------------- |
| Values           | Usually one result              | Can emit multiple values over time  |
| Start            | Starts when created             | Often waits until subscribe         |
| Cancel           | Not naturally cancelable        | Can unsubscribe / cancel            |
| Common in        | `fetch`, many JS APIs           | Angular HttpClient, RxJS streams    |

### Promise example

```javascript
const data = await fetch('/api/students').then((r) => r.json());
```

### Observable example

```typescript
this.http.get('/api/students').subscribe((data) => {
  console.log(data);
});
```

## Important beginner warning

Do **not** try to learn all RxJS operators now.

You only need this idea first:

> Angular HTTP requests commonly return Observables.

Later you will learn operators like `map`, `switchMap`, and error handling.

:::caution
This is not a full RxJS course.
Learn only the bridge idea for Angular.
:::

## Easy connection for React students

If you know Promises from React/`fetch`, Observables are another async tool.

Similar goal: wait for data.

Different style: stream + subscribe.

## Try it yourself

1. What is an Observable in one sentence?
2. Why do we use `.subscribe()`?
3. Write one difference between Promise and Observable.

## Next lesson

Next: [0.16 — Routing](/angular/part-0-react-to-angular/routing/)
