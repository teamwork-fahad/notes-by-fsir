---
title: 'C++ Encapsulation and Inheritance'
description: 'Access control, classes, enums, abstraction, encapsulation, constructors, destructors, and inheritance.'
---

## Access control

- `public`: accessible wherever the object is visible.
- `private`: accessible only inside the class and its friends.
- `protected`: accessible inside the class and derived classes.

```cpp
class User {
private:
    string password;

protected:
    string username;

public:
    User(string user) : username(user) {}
};
```

## Member variables and functions

Member variables store object state. Member functions define object behavior. Keep sensitive state private and expose controlled public methods.

## Enumerations

An enum represents a fixed set of named values.

```cpp
enum class Status {
    Pending,
    Active,
    Complete
};

Status currentStatus = Status::Active;
```

## Data hiding, abstraction, and encapsulation

Data hiding prevents direct access to implementation details. Abstraction presents a useful interface. Encapsulation combines data and methods with access control.

```cpp
class Temperature {
private:
    double celsius;

public:
    void setCelsius(double value) {
        if (value >= -273.15) celsius = value;
    }

    double getFahrenheit() const {
        return celsius * 9 / 5 + 32;
    }
};
```

## Inheritance

C++ supports single, multilevel, hierarchical, multiple, and hybrid inheritance.

```cpp
class Vehicle {
public:
    void move() const { cout << "Moving" << endl; }
};

class Car : public Vehicle {
public:
    void drive() const { cout << "Driving" << endl; }
};
```

Use public inheritance when the child is a true specialized form of the parent. Prefer composition when the relationship is “has-a” rather than “is-a”.

## Constructors and destructors

A constructor initializes an object. A destructor runs when the object is destroyed and is written with a tilde.

```cpp
class FileLogger {
public:
    FileLogger() { cout << "Resource opened" << endl; }
    ~FileLogger() { cout << "Resource closed" << endl; }
};
```

### Practice

1. Build a `BankAccount` class with private balance and public deposit/withdraw methods.
2. Demonstrate single and multilevel inheritance.
3. Create an enum for order status and use it in a class.
4. Add a constructor and destructor to a resource-owning class.
