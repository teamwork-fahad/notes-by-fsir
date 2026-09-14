---
title: 'OOP with Python'
description: 'Python examples for classes, encapsulation, inheritance, and polymorphism.'
---

Python supports OOP with classes, objects, constructors, inheritance, duck typing, and special methods.

```python
class Student:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        print(f"I am {self.name}")


student = Student("Ishita")
student.introduce()
```

Python uses naming conventions for access control. A leading underscore signals internal use, while a double underscore triggers name mangling.

```python
class Shape:
    def draw(self):
        raise NotImplementedError


class Circle(Shape):
    def draw(self):
        print("Drawing a circle")


for shape in [Circle()]:
    shape.draw()
```

Python does not require a separate interface keyword for common polymorphism; objects are often used according to the methods they provide.
