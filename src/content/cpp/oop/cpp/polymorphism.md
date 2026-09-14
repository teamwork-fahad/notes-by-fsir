---
title: 'C++ Polymorphism'
description: 'Compile-time and run-time polymorphism, overloading, overriding, friend functions, and virtual functions.'
---

## Polymorphism

Polymorphism allows one interface to represent different behavior. C++ supports compile-time polymorphism and run-time polymorphism.

## Compile-time polymorphism

Function overloading uses the same function name with different parameter lists. Operator overloading gives operators meaning for user-defined types.

```cpp
class Calculator {
public:
    int add(int first, int second) { return first + second; }
    double add(double first, double second) { return first + second; }
};
```

## Run-time polymorphism

Method overriding occurs when a derived class provides a new implementation of a virtual base method. Calling through a base pointer selects the derived implementation at run time.

```cpp
class Animal {
public:
    virtual void sound() const {
        cout << "Some sound" << endl;
    }
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void sound() const override {
        cout << "Bark" << endl;
    }
};

Animal* animal = new Dog();
animal->sound();
delete animal;
```

## Overloading and overriding

| Feature | Overloading | Overriding |
| --- | --- | --- |
| Binding | Compile time | Run time with virtual dispatch |
| Relationship | Usually same class | Base and derived classes |
| Parameters | Must differ | Usually same signature |
| Purpose | Convenience and type variation | Specialized behavior |

## Friend function

A friend function is not a member, but it can access private and protected members when explicitly declared as a friend.

```cpp
class Box {
private:
    int width;

public:
    Box(int value) : width(value) {}
    friend int getWidth(const Box& box);
};

int getWidth(const Box& box) {
    return box.width;
}
```

## Virtual and pure virtual functions

A virtual function enables run-time dispatch. A pure virtual function has `= 0` and makes the class abstract; derived classes must implement it.

```cpp
class Payment {
public:
    virtual void pay() = 0;
    virtual ~Payment() = default;
};

class CardPayment : public Payment {
public:
    void pay() override {
        cout << "Paid by card" << endl;
    }
};
```

### Practice

1. Overload a `print()` method for integers and strings.
2. Override a `calculateArea()` method for circle and rectangle classes.
3. Create an abstract `Employee` class with a pure virtual salary method.
4. Write a safe example using a virtual destructor.
