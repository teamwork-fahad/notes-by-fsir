---
title: 'OOP with C++'
description: 'C++ examples for classes, encapsulation, inheritance, and polymorphism.'
---

C++ is the primary implementation language for this OOP syllabus. It supports classes, access control, constructors, destructors, friend functions, virtual functions, and multiple inheritance.

## Class and object

```cpp
#include <iostream>
#include <string>
using namespace std;

class Student {
private:
    string name;

public:
    Student(string studentName) : name(studentName) {}

    void introduce() const {
        cout << "I am " << name << endl;
    }
};

int main() {
    Student student("Ishita");
    student.introduce();
}
```

## Encapsulation and inheritance

```cpp
class Person {
protected:
    string name;

public:
    Person(string personName) : name(personName) {}
};

class Teacher : public Person {
public:
    Teacher(string teacherName) : Person(teacherName) {}

    void teach() const {
        cout << name << " is teaching" << endl;
    }
};
```

## Run-time polymorphism

```cpp
class Shape {
public:
    virtual void draw() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
public:
    void draw() const override {
        cout << "Drawing a circle" << endl;
    }
};
```

## C++ syllabus

- [Classes, Objects, Strings, and Fundamentals](/oop/cpp/fundamentals/)
- [Encapsulation, Access Control, Inheritance](/oop/cpp/encapsulation-inheritance/)
- [Polymorphism](/oop/cpp/polymorphism/)
