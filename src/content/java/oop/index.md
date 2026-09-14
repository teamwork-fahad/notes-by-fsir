---
title: 'OOP with Java'
description: 'Java examples for the common object-oriented programming concepts.'
---

Java implements OOP using classes, objects, access modifiers, constructors, inheritance, interfaces, and method overriding.

```java
class Student {
    private String name;

    Student(String name) {
        this.name = name;
    }

    void introduce() {
        System.out.println("I am " + name);
    }
}

class Main {
    public static void main(String[] args) {
        Student student = new Student("Ishita");
        student.introduce();
    }
}
```

Java uses `extends` for class inheritance and `implements` for interfaces. It does not support multiple inheritance of classes, but a class can implement multiple interfaces.

```java
interface Printable {
    void print();
}

class Report implements Printable {
    @Override
    public void print() {
        System.out.println("Printing report");
    }
}
```
