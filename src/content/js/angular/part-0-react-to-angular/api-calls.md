---
title: '0.14 — API Calls'
description: Compare React fetch API calls with Angular HttpClient for beginners.
---

# Lesson 0.14 — API Calls

:::tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/angular/part-0-react-to-angular/new-words/).
:::

## What is a REST API?

A <span class="new-word" tabindex="0">REST API<span class="new-word__tip" role="tooltip">A common way for your app to ask a server for data using HTTP.</span></span> is a way for your frontend to talk to a backend server using HTTP.

Simple meaning:

> Your app asks the server for data, or sends data to the server.

## Important words

| Word            | Easy meaning                                      |
| --------------- | ------------------------------------------------- |
| HTTP request    | A message from your app to the server             |
| GET             | Read/fetch data                                   |
| POST            | Send/create data                                  |
| Response        | The server’s answer                               |
| <span class="new-word" tabindex="0">HttpClient<span class="new-word__tip" role="tooltip">Angular’s built-in tool for calling APIs.</span></span> | Angular’s built-in tool for HTTP requests |

## React API call example

React apps often use `fetch`:

```javascript
fetch('/api/students')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

Or with async/await:

```javascript
const response = await fetch('/api/students');
const data = await response.json();
console.log(data);
```

## Angular API call example

Angular commonly uses `HttpClient`:

```typescript
this.http.get('/api/students');
```

A tiny service example:

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);

  getStudents() {
    return this.http.get('/api/students');
  }
}
```

### Explain the code

1. `HttpClient` sends HTTP requests
2. `.get('/api/students')` asks the server for student data
3. The method returns an Observable (next lesson)

## GET vs POST (beginner view)

### GET

Read data.

```typescript
this.http.get('/api/students');
```

### POST

Send data.

```typescript
this.http.post('/api/students', { name: 'Sara' });
```

## Where should API code live?

In Angular, API calls usually live in a **service**, not directly in every component.

```text
Component → Service → HttpClient → Server
```

This keeps components cleaner.

## React vs Angular

| Topic        | React                 | Angular                 |
| ------------ | --------------------- | ----------------------- |
| Common tool  | `fetch` / Axios       | `HttpClient`            |
| Return style | Promise (often)       | Observable (often)      |
| Best place   | helper / hook         | service                 |

## RxJS preview

Angular HTTP requests commonly return **Observables**.

You will learn the beginner idea next.

For now, remember:

```typescript
this.http.get('/api/students');
```

This starts an HTTP GET request and gives back a stream-like result (Observable).

## Try it yourself

1. What does GET mean?
2. What does POST mean?
3. Which Angular class is used for HTTP calls?
4. Why put API code in a service?

## Next lesson

Next: [0.15 — Observables and RxJS](/angular/part-0-react-to-angular/rxjs-observables/)
