---
title: "XshellSSH连接虚拟机慢解决方法 使用yum提示Error: rpmdb open failed"
layout: post
date: 2019-10-16 14:30
headerImage: false
tag:
- Xshell
- ssh
- yum
category: blog
author: 夏潇熙
description: Xshell ssh连接虚拟机慢解决方法 使用yum提示Error rpmdb open failed
---


## Xshell ssh连接虚拟机慢解决方法

原因是ssh的服务端在连接时会自动检测dns环境是否一致导致的，修改为不检测即可，操作如下：

修改文件：`/etc/ssh/sshd_config`

`UseDNS yes` —>默认为注释行

`UseDNS no` —>把注释打开，改为no，然后重启ssh服务（`service sshd restart`)即可

## 使用yum提示Error: rpmdb open failed

#### 在centos系统上，在使用yum命令安装软件包时候报错：

```bash
error: rpmdb: BDB0113 Thread/process 29414/140651526424384 failed: BDB1507 Thread died in Berkeley DB library
error: db5 error(-30973) from dbenv->failchk: BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
error: cannot open Packages index using db5 -  (-30973)
error: cannot open Packages database in /var/lib/rpm
CRITICAL:yum.main:

Error: rpmdb open failed
```

#### 原因是RPM数据库被破坏

#### 重建数据库后恢复正常：

```bash
cd /var/lib/rpm/
for i in `ls | grep 'db.'`;do mv $i $i.bak;done
rpm --rebuilddb
yum clean all
```
