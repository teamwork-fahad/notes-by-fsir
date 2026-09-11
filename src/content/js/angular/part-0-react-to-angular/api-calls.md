---
title: '0.14 — API Calls'
description: Compare React fetch API calls with Angular HttpClient for beginners.
subject: js
chapter: Part 0 - API Calls
author: teamwork-fahad
---

# Lesson 0.14 — API Calls

:::\tip[New words]
Hover or tap dotted **?** words for short meanings.
Also see: [Part 0 — New Words](/js/angular/part-0-react-to-angular/new-words/).
:::

## What is a REST API?

A REST API is a way for your frontend to ask a server for data using HTTP.

Simple meaning:

> Your app asks the server for data, or sends data to the server.

## Important words

| Word            | Easy meaning                                      |
| --------------- | ------------------------------------------------- |
| HTTP request    | A message from your app to the server             |
| GET             | Read/fetch data                                   |
| POST            | Send/create data                                  |
| Response        | The server’s answer                               |
| HttpClient      | Angular’s built-in tool for HTTP requests        |

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
