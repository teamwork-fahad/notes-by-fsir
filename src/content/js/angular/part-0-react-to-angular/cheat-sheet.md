---
title: '0.18 — React → Angular Cheat Sheet'
description: A quick reference table connecting React ideas to Angular ideas for beginners.
subject: js
chapter: Part 0 - Cheat Sheet
author: teamwork-fahad
---

# Lesson 0.18 — React → Angular Cheat Sheet

Use this page for quick revision.

:::\note
These are **learning connections**, not exact replacements.
React and Angular solve similar problems with different designs.
:::

## Quick reference table

| React                         | Angular                          |
| ----------------------------- | -------------------------------- |
| Component                     | Component                        |
| Props                         | `@Input()`                       |
| Callback / Event prop         | `@Output()` + `EventEmitter`     |
| JSX                           | HTML Template                    |
| `{value}`                     | `{{ value }}`                    |
| `onClick`                     | `(click)`                        |
| `className`                   | `class` / `ngClass`              |
| Conditional rendering         | `*ngIf` / `@if`                  |
| `.map()`                      | `*ngFor` / `@for`                |
| React Router                  | Angular Router                   |
| Custom hooks / shared logic   | Services                         |
| Context / dependency patterns | Dependency Injection             |
| `fetch()`                     | `HttpClient`                     |
| Promise                       | Observable (often)               |
| React forms / controlled input| Angular Forms (`ngModel` / Reactive Forms) |
| `useEffect(() => {}, [])`     | `ngOnInit()` (similar first-load idea) |
| JavaScript (common start)     | TypeScript                       |
| UI library                    | Full framework                   |
