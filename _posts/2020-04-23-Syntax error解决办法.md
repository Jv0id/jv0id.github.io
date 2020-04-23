---
layout: post
title: "Syntax error: “(” unexpected解决办法"
date: 2020-04-23 12:22:28 
description: "Syntax error"
tag: Linux 
---
Linux执行脚本sh `./init-letsencrypt.sh`出现如下错误：

```bash
./init-letsencrypt.sh: 8: ./init-letsencrypt.sh: Syntax error: "(" unexpected
```

错误原因：

主要是因为Linux系统shell版本不兼容引起的。 shell的版本有`sh,ksh,csh, bash，dash……`等等。用命令`ls -al /bin/sh`可以得到我们当前所用的Linux系统的shell属于何版本。

解决办法：

```bash
bash ./init-letsencrypt.sh
```
