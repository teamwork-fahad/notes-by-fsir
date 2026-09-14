---
title: 'Introduction to Linux'
description: 'Linux fundamentals, open-source concepts, commands, and operating system basics.'
---

# Unit 4: Introduction to Open Source OS: Linux

## Overview

Linux is a free, open-source operating system created by Linus Torvalds in 1991. It is widely used in servers, desktops, and embedded systems.

---

## 4.1 Features and Components of Linux

### Key Features of Linux

- **Open Source**: Source code is freely available
- **Portable**: Runs on various hardware platforms
- **Secure**: Advanced security features and user authentication
- **Multi-user**: Multiple users can work simultaneously
- **Multitasking**: Can run multiple processes at the same time
- **Scalability**: Can handle heavy workloads
- **Free**: No licensing cost

---

## 4.2 Components of Linux

### Kernel
The core component that manages system resources and facilitates communication between hardware and software.

### Shell
Command interpreter that allows users to interact with the kernel through commands.

### File System
Hierarchical structure for organizing files and directories (e.g., ext4, NTFS).

### Utilities and Tools
Programs and commands for various system operations.

### Compilers and Interpreters
Tools for converting source code into executable programs.

---

## 4.3 Installation and Configuration of Open Source Software

### Installation Methods

1. **Package Managers**: apt-get, yum, dnf
2. **Source Code Compilation**: Download and compile
3. **Binary Installation**: Pre-compiled executables

### Configuration

Configuration files are typically stored in `/etc/` directory. Software can be configured through:
- Configuration files
- Environment variables
- Command-line options

---

## 4.4 Basic Commands

Essential Linux commands for system administration and file management:

### File and Directory Operations

| Command | Description |
|---------|-------------|
| `ls` | List directory contents |
| `cd` | Change directory |
| `pwd` | Print working directory |
| `mkdir` | Create directory |
| `rmdir` | Remove empty directory |
| `cp` | Copy files or directories |
| `mv` | Move or rename files |
| `rm` | Remove files |

### File Viewing and Processing

| Command | Description |
|---------|-------------|
| `cat` | Display file contents |
| `more` | Display file contents page by page |
| `cmp` | Compare files byte by byte |
| `diff` | Show differences between files |
| `wc` | Count lines, words, characters |
| `sort` | Sort lines in a file |

### User and System Information

| Command | Description |
|---------|-------------|
| `who` | List logged-in users |
| `whoami` | Display current user |
| `passwd` | Change user password |
| `date` | Display current date and time |
| `sudo` | Execute with superuser privileges |

### Package Management

| Command | Description |
|---------|-------------|
| `apt-get install` | Install a package |
| `apt-get update` | Update package lists |
| `apt-get upgrade` | Upgrade installed packages |

### File Permissions

| Command | Description |
|---------|-------------|
| `chmod` | Change file permissions |

---

## Summary

Linux is a powerful, free, and open-source operating system with robust security features, portability, and flexibility. Mastering basic Linux commands is essential for system administration and software development.
