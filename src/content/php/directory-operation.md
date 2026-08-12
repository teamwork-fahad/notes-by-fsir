---

title: "2.5 Directory Operation in PHP"
description: "Complete notes on directory operations in PHP including creating, opening, reading, scanning and removing directories."
subject: "PHP"
chapter: "2.5"
author: "Fahad Sir"
-------------------

# 2.5 Directory Operation in PHP

PHP provides several built-in functions for working with files and directories.

Using directory functions, we can:

* Create a directory
* Open a directory
* Read directory contents
* Check whether a directory exists
* List files and folders
* Remove an empty directory
* Close an opened directory

---

## What is a Directory?

A **directory** is a folder used to store files and other directories.

For example:

```text
myproject/
│
├── index.php
├── login.php
├── register.php
├── style.css
│
└── images/
    ├── logo.png
    ├── banner.jpg
    └── profile.jpg
```

Here:

* `myproject` is a directory.
* `images` is also a directory.
* `index.php`, `login.php` and `style.css` are files.

PHP provides different functions to perform operations on directories.

---

# Directory Functions in PHP

The following functions are commonly used for directory operations in PHP.

| Function     | Purpose                              |
| ------------ | ------------------------------------ |
| `mkdir()`    | Creates a new directory              |
| `rmdir()`    | Removes an empty directory           |
| `opendir()`  | Opens a directory                    |
| `readdir()`  | Reads an entry from a directory      |
| `closedir()` | Closes an opened directory           |
| `is_dir()`   | Checks whether a path is a directory |
| `scandir()`  | Lists files and directories          |

---

# 1. mkdir()

The `mkdir()` function is used to **create a new directory**.

## Syntax

```php
mkdir(directory);
```

Here, `directory` represents the name or path of the directory that we want to create.

## Example

```php
<?php

mkdir("students");

?>
```

The above program creates a directory named:

```text
students
```

---

## Example with Message

```php
<?php

if (mkdir("students")) {
    echo "Directory created successfully.";
}

?>
```

### Output

```text
Directory created successfully.
```

---

## Creating a Directory with Permission

The `mkdir()` function can also accept a permission value.

```php
mkdir("students", 0777);
```

Example:

```php
<?php

mkdir("students", 0777);

echo "Directory created.";

?>
```

> **Note:** Permission behavior can depend on the operating system and server configuration.

---

# 2. rmdir()

The `rmdir()` function is used to **remove an empty directory**.

## Syntax

```php
rmdir(directory);
```

## Example

```php
<?php

rmdir("students");

?>
```

The above program removes the `students` directory.

> **Important:** `rmdir()` can remove only an empty directory.

If the directory contains files or subdirectories, `rmdir()` cannot remove it directly.

---

## Example with Condition

```php
<?php

if (is_dir("students")) {

    if (rmdir("students")) {
        echo "Directory removed successfully.";
    }

} else {

    echo "Directory does not exist.";

}

?>
```

---

# 3. opendir()

The `opendir()` function is used to **open a directory**.

It returns a directory handle when the directory is successfully opened.

## Syntax

```php
opendir(directory);
```

## Example

```php
<?php

$handle = opendir("images");

if ($handle) {
    echo "Directory opened successfully.";
}

?>
```

### Output

```text
Directory opened successfully.
```

The variable `$handle` contains the directory handle.

---

# 4. readdir()

The `readdir()` function is used to **read an entry from an opened directory**.

It reads one directory entry at a time.

## Syntax

```php
readdir(directory_handle);
```

## Example

```php
<?php

$handle = opendir("images");

while (($file = readdir($handle)) !== false) {
    echo $file . "<br>";
}

closedir($handle);

?>
```

If the `images` directory contains:

```text
logo.png
banner.jpg
profile.jpg
```

The output may include:

```text
.
..
logo.png
banner.jpg
profile.jpg
```

### Meaning of `.` and `..`

* `.` represents the current directory.
* `..` represents the parent directory.

Therefore, when displaying files to users, we generally ignore these two entries.

---

# 5. closedir()

The `closedir()` function is used to **close an opened directory**.

## Syntax

```php
closedir(directory_handle);
```

## Example

```php
<?php

$handle = opendir("images");

while (($file = readdir($handle)) !== false) {
    echo $file . "<br>";
}

closedir($handle);

?>
```

Here:

1. `opendir()` opens the directory.
2. `readdir()` reads the directory entries.
3. `closedir()` closes the directory.

> **Best Practice:** Close the directory after completing the required operation.

---

# 6. is_dir()

The `is_dir()` function checks whether the specified path is a directory.

It returns:

* `true` if the path is a directory.
* `false` if the path is not a directory.

## Syntax

```php
is_dir(path);
```

## Example

```php
<?php

if (is_dir("images")) {
    echo "images is a directory.";
} else {
    echo "images is not a directory.";
}

?>
```

### Output

```text
images is a directory.
```

---

## Example with User-Friendly Message

```php
<?php

$folder = "students";

if (is_dir($folder)) {

    echo "The directory already exists.";

} else {

    echo "The directory does not exist.";

}

?>
```

---

# 7. scandir()

The `scandir()` function is used to **list files and directories inside a directory**.

It returns an array containing the directory entries.

## Syntax

```php
scandir(directory);
```

## Example

```php
<?php

$files = scandir("images");

foreach ($files as $file) {
    echo $file . "<br>";
}

?>
```

The output may be:

```text
.
..
logo.png
banner.jpg
profile.jpg
```

---

## Removing `.` and `..`

To display only actual files and folders:

```php
<?php

$files = scandir("images");

foreach ($files as $file) {

    if ($file != "." && $file != "..") {
        echo $file . "<br>";
    }

}

?>
```

### Output

```text
logo.png
banner.jpg
profile.jpg
```

---

# Difference Between Directory Functions

| Function     | Purpose                                  |
| ------------ | ---------------------------------------- |
| `mkdir()`    | Creates a new directory                  |
| `rmdir()`    | Removes an empty directory               |
| `opendir()`  | Opens a directory                        |
| `readdir()`  | Reads one entry from an opened directory |
| `closedir()` | Closes an opened directory               |
| `is_dir()`   | Checks whether a path is a directory     |
| `scandir()`  | Returns a list of directory entries      |

---

# Easy Memory Trick

| Function     | Remember As                |
| ------------ | -------------------------- |
| `mkdir()`    | **M → Make** a directory   |
| `rmdir()`    | **R → Remove** a directory |
| `opendir()`  | **O → Open** a directory   |
| `readdir()`  | **R → Read** a directory   |
| `closedir()` | **C → Close** a directory  |
| `is_dir()`   | **I → Is it a Directory?** |
| `scandir()`  | **S → Scan** a directory   |

---

# Complete Example 1: Create a Directory

```php
<?php

$folder = "students";

if (is_dir($folder)) {

    echo "Directory already exists.";

} else {

    if (mkdir($folder)) {
        echo "Directory created successfully.";
    } else {
        echo "Unable to create directory.";
    }

}

?>
```

### Explanation

First, `is_dir()` checks whether the directory already exists.

If it does not exist, `mkdir()` creates the directory.

---

# Complete Example 2: Read Directory Contents

```php
<?php

$folder = "images";

if (is_dir($folder)) {

    $handle = opendir($folder);

    while (($file = readdir($handle)) !== false) {

        if ($file != "." && $file != "..") {
            echo $file . "<br>";
        }

    }

    closedir($handle);

} else {

    echo "Directory does not exist.";

}

?>
```

### Explanation

The program performs the following steps:

1. Checks whether the directory exists.
2. Opens the directory using `opendir()`.
3. Reads entries using `readdir()`.
4. Ignores `.` and `..`.
5. Displays the directory entries.
6. Closes the directory using `closedir()`.

---

# Complete Example 3: List Directory Contents Using scandir()

```php
<?php

$folder = "images";

if (is_dir($folder)) {

    $files = scandir($folder);

    foreach ($files as $file) {

        if ($file != "." && $file != "..") {
            echo $file . "<br>";
        }

    }

} else {

    echo "Directory does not exist.";

}

?>
```

### Explanation

`scandir()` is simpler when we only need a list of directory entries.

It returns the contents as an array, which can then be processed using `foreach`.

---

# Complete Example 4: Create and Check Directory

```php
<?php

$folder = "students";

if (!is_dir($folder)) {

    if (mkdir($folder)) {

        echo "Directory created successfully.";

    } else {

        echo "Directory could not be created.";

    }

} else {

    echo "Directory already exists.";

}

?>
```

---

# Important Points

> **Important:** `mkdir()` is used to create a new directory.

> **Important:** `rmdir()` is used to remove an empty directory.

> **Important:** `opendir()` is used to open a directory.

> **Important:** `readdir()` reads directory entries one at a time.

> **Important:** `closedir()` closes an opened directory.

> **Important:** `is_dir()` checks whether a path is a directory.

> **Important:** `scandir()` returns an array containing directory entries.

> **Important:** `.` represents the current directory.

> **Important:** `..` represents the parent directory.

---

# Common Mistakes

## Mistake 1: Using rmdir() on a non-empty directory

```php
rmdir("images");
```

If the `images` directory contains files, the operation will fail.

---

## Mistake 2: Forgetting to close the directory

When using `opendir()` and `readdir()`, close the directory after use.

```php
closedir($handle);
```

---

## Mistake 3: Not checking whether a directory exists

Before performing an operation, it is a good practice to check:

```php
if (is_dir("images")) {
    // Directory exists
}
```

---

## Mistake 4: Displaying `.` and `..`

When using `readdir()` or `scandir()`, remember that `.` and `..` can appear in the result.

You can ignore them:

```php
if ($file != "." && $file != "..") {
    echo $file;
}
```

---

# Quick Revision

## mkdir()

**Purpose:** Create a directory.

```php
mkdir("students");
```

---

## rmdir()

**Purpose:** Remove an empty directory.

```php
rmdir("students");
```

---

## opendir()

**Purpose:** Open a directory.

```php
$handle = opendir("images");
```

---

## readdir()

**Purpose:** Read a directory entry.

```php
$file = readdir($handle);
```

---

## closedir()

**Purpose:** Close an opened directory.

```php
closedir($handle);
```

---

## is_dir()

**Purpose:** Check whether a path is a directory.

```php
is_dir("images");
```

---

## scandir()

**Purpose:** Get a list of files and directories.

```php
$files = scandir("images");
```

---

# Summary

PHP provides several built-in functions to perform directory operations.

The important functions are:

| Function     | Meaning               |
| ------------ | --------------------- |
| `mkdir()`    | Make/Create Directory |
| `rmdir()`    | Remove Directory      |
| `opendir()`  | Open Directory        |
| `readdir()`  | Read Directory        |
| `closedir()` | Close Directory       |
| `is_dir()`   | Check Directory       |
| `scandir()`  | Scan Directory        |

These functions are useful when PHP applications need to work with folders and directory contents.

---

# Practice Questions

1. What is a directory?
2. What is the use of `mkdir()`?
3. Write the syntax of `mkdir()`.
4. How can you create a directory using PHP?
5. What is the use of `rmdir()`?
6. Can `rmdir()` remove a non-empty directory?
7. What is the use of `opendir()`?
8. What is the use of `readdir()`?
9. What is the use of `closedir()`?
10. What is the use of `is_dir()`?
11. What does `scandir()` return?
12. What is the meaning of `.` in a directory listing?
13. What is the meaning of `..` in a directory listing?
14. Write a PHP program to create a directory.
15. Write a PHP program to read the contents of a directory.
16. Write a PHP program to display files using `scandir()`.

---

# Viva Questions

### Q1. Which PHP function is used to create a directory?

**Answer:** `mkdir()`

### Q2. Which function is used to remove an empty directory?

**Answer:** `rmdir()`

### Q3. Which function opens a directory?

**Answer:** `opendir()`

### Q4. Which function reads entries from a directory?

**Answer:** `readdir()`

### Q5. Which function closes a directory?

**Answer:** `closedir()`

### Q6. Which function checks whether a path is a directory?

**Answer:** `is_dir()`

### Q7. Which function returns the contents of a directory as an array?

**Answer:** `scandir()`

### Q8. Can `rmdir()` remove a directory containing files?

**Answer:** No. `rmdir()` removes only an empty directory.

---

# One-Line Revision

```text
mkdir()   → Create
rmdir()   → Remove
opendir() → Open
readdir() → Read
closedir()→ Close
is_dir()  → Check
scandir() → List
```

---

**Notes By FSir**
*Created by Fahad Sir*
