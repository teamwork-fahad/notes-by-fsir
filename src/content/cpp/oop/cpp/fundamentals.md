---
title: 'C++ Fundamentals, Strings, Classes, and Objects'
description: 'Procedural programming, C++ libraries, data types, strings, classes, and objects.'
---

## Procedural programming and OOP

Procedural programming organizes a program around functions and a sequence of steps. OOP organizes it around objects that combine data and behavior. Procedural code can be simple for small algorithms; OOP is useful when a system has many related entities and changing behavior.

## C++ libraries and headers

```cpp
#include <iostream>  // input and output
#include <string>    // std::string
#include <cstring>   // C-style string functions
#include <vector>    // dynamic arrays
#include <iomanip>   // formatted output
```

Use standard library headers instead of relying on non-standard headers such as `bits/stdc++.h` in portable code.

## C++ data types

Common types include `int`, `float`, `double`, `char`, `bool`, and `void`. C++ also supports arrays, pointers, references, classes, structures, enumerations, and `std::string`.

```cpp
int age = 20;
double percentage = 87.5;
char grade = 'A';
bool passed = true;
string name = "Ishita";
```

## Strings

A character array stores characters and usually ends with the null character `\\0`. A pointer can point to a character array, but modifying a string literal is unsafe.

```cpp
char name[] = "Ishita";
char* firstCharacter = name;
cout << firstCharacter << endl;
```

For C-style strings, `<cstring>` provides functions corresponding to the traditional `string.h` functions:

```cpp
#include <cstring>

char first[30] = "Hello ";
char second[] = "World";
char copy[30];

strcat(first, second);       // concatenate
strcpy(copy, first);         // copy
cout << strlen(copy) << endl; // length
cout << strcmp(copy, first);  // compare
```

The standard C++ alternative is `std::string`, with methods such as `.size()`, `.append()`, and comparison operators.

## Class and object

```cpp
class Account {
private:
    double balance;

public:
    Account(double openingBalance) : balance(openingBalance) {}

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    double getBalance() const {
        return balance;
    }
};

int main() {
    Account account(1000);
    account.deposit(500);
    cout << account.getBalance();
}
```

### Practice

1. Compare the same problem written with functions and with a class.
2. Write a program using `strcmp`, `strcat`, `strcpy`, and `strlen`.
3. Create a `Book` class with title, author, and a display method.
