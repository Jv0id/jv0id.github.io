---
title: "RedHat yum源配置"
layout: post
date: 2019-09-15 11:30
headerImage: false
tag:
- RedHat
- yum
category: blog
author: 夏潇熙
description: RedHat yum源配置
---

### 卸载原来的yum源

执行命令：
```bash
rpm -qa|grep yum|xargs rpm -e --nodeps
```

### 下载新的yum安装包

网易的镜像网站为：<http://mirrors.163.com>，我安装的系统是红帽7版本，所以选择下载Centos7的镜像源，在以下网址<http://mirrors.163.com/centos/7/os/x86_64/Packages/> 下载所需文件，所需的文件为：

```bash
rpm-4.11.3-25.el7.x86_64.rpm         
yum-metadata-parser-1.1.4-10.el7.x86_6
python-urlgrabber-3.10-8.el7.noarch.rpm 
yum-3.4.3-154.el7.centos.noarch.rpm  
yum-plugin-fastestmirror-1.1.31-42.el7.noarch.rpm
```

因为在安装：`yum-3.4.3-154.el7.centos.noarch.rpm`和`yum-metadata-parser-1.1.4-10.el7.x86_64.rpm`的时候会提示需要先安装其他的几个包，而且对版本会有要求，所以这里就一次性把所需的包全部下载下来。

### 安装

执行命令：

```bash
rpm -ivh rpm-4.11.3-25.el7.x86_64.rpm yum-metadata-parser-1.1.4-10.el7.x86_6 python-urlgrabber-3.10-8.el7.noarch.rpm yum-3.4.3-154.el7.centos.noarch.rpm yum-plugin-fastestmirror-1.1.31-42.el7.noarch.rpm
```

在安装的时候可能系统会提示存在文件冲突，参考<http://man.linuxde.net/rpm>中关于rpm命令的介绍，可以采取强制安装的方式，即在执行安装语句的时候加上选项`--force`，更改后的语句为：

```bash
rpm -ivh --force rpm-4.11.3-25.el7.x86_64.rpm yum-metadata-parser-1.1.4-10.el7.x86_6 python-urlgrabber-3.10-8.el7.noarch.rpm yum-3.4.3-154.el7.centos.noarch.rpm yum-plugin-fastestmirror-1.1.31-42.el7.noarch.rpm
```

### 配置文件

网易镜像的配置文件可以在<http://mirrors.163.com/.help/centos.html> 进行下载，Centos7的镜像下载链接为：<http://mirrors.163.com/.help/CentOS7-Base-163.repo>

```bash
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
```

将该文将放在 `/etc/yum.repos.d` 文件夹下，并将原yum文件作备份，这里参考<http://mirrors.163.com/.help/centos.html> 的介绍，将文件下载好以后，还要更改文件中的变量，具体就是将 `$releasever` 变量转化为你相应的系统版本，在这里就是 7 。转化方法:在vi编辑器下执行下述指令即可更改：`:1,$s/$releasever/7/g`

### 完成

此时，yum源就基本配置完成，执行命令：
```bash
yum clean all
yum makecache
yum update
```

更新软件并测试yum源的可用性，执行：
```bash
yum repolist all
```

可以查看yum源列表，示例如下：

```bash
repo id                                               repo name                                                        status
base/x86_64                                           CentOS-7 - Base - 163.com                                        enabled: 9,591
centosplus/x86_64                                     CentOS-7 - Plus - 163.com                                        disabled
extras/x86_64                                         CentOS-7 - Extras - 163.com                                      enabled:   446
updates/x86_64                                        CentOS-7 - Updates - 163.com                                     enabled: 2,416
```
如果发现某个yum源的状态是`disabled`，则可以在`CentOS7-Base-163.repo`文件中进行更改，将相应模块的enabled参数更改为1就行了：`enabled=1`。
