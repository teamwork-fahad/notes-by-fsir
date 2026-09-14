---
title: 'OOP with PHP'
description: 'PHP examples for the common object-oriented programming concepts.'
---

PHP supports classes, objects, visibility modifiers, constructors, inheritance, interfaces, traits, and method overriding.

```php
<?php
class Student {
    private string $name;

    public function __construct(string $name) {
        $this->name = $name;
    }

    public function introduce(): void {
        echo "I am {$this->name}";
    }
}

$student = new Student('Ishita');
$student->introduce();
```

Interfaces provide a common contract, and child classes can override inherited methods.

```php
interface Printable {
    public function print(): void;
}

class Report implements Printable {
    public function print(): void {
        echo 'Printing report';
    }
}
```
