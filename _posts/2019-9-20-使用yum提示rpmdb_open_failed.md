---
title: 使用yum提示Error: rpmdb open failed
key: 20190920144556
tags: yum rpmdb failed error
author: Jv0id
---

## 在centos系统上，在使用yum命令安装软件包时候报错：

```bash
error: rpmdb: BDB0113 Thread/process 29414/140651526424384 failed: BDB1507 Thread died in Berkeley DB library
error: db5 error(-30973) from dbenv->failchk: BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
error: cannot open Packages index using db5 -  (-30973)
error: cannot open Packages database in /var/lib/rpm
CRITICAL:yum.main:

Error: rpmdb open failed
```

## 原因是RPM数据库被破坏

## 重建数据库后恢复正常：

```bash
cd /var/lib/rpm/
for i in `ls | grep 'db.'`;do mv $i $i.bak;done
rpm --rebuilddb
yum clean all
```
