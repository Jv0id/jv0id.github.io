---
layout: post
title: "Linux复习RPM和YUM"
key: Linux
tags: Linux RPM YUM
author: jv0id
---

## RPM

```
一种用于互联网下载包的打包及安装工具，它包含在某些 Linux 分发版中。它生成具有.RPM扩展名的文件。RPM 是RedHat Package Manager（RedHat 软件包管理工具）的缩写，类似windows的setup.exe，这一文件格式名称虽然打上了RedHat 的标志，但理念是通用的。
Linux 的分发版本都有采用（suse,redhat, centos 等等），可以算是公认的行业标准了。
```

### 查询指令

```
查询已安装的rpm 列表 rpm –qa|grep xx

请查询看一下，当前的Linux 有没有安装 firefox
rpm -qa | grep firefox
```

```
一个rpm 包名：firefox-45.0.1-1.el6.centos.x86_64.rpm
名称:firefox
版本号：45.0.1-1
适用操作系统: el6.centos.x86_64
表示centos6.x 的64 位系统
如果是i686、i386 表示32 位系统，noarch 表示通用
```

```
rpm -qa :查询所安装的所有rpm 软件包
rpm -qa | more [分页显示]
rpm -qa | grep X [rpm -qa | grep firefox ]
rpm -q 软件包名 :查询软件包是否安装
rpm -qi 软件包名 ：查询软件包信息
rpm -qi file
rpm -ql 软件包名 :查询软件包中的文件
rpm -qf 文件全路径名 查询文件所属的软件包
```

### 卸载

```
基本语法
	rpm -e RPM 包的名称
```

```
1) 删除firefox 软件包

rpm -e firefox
```

```
1) 如果其它软件包依赖于您要卸载的软件包，卸载时则会产生错误信息。
如： $ rpm -e foo
removing these packages would break dependencies:foo is needed by bar-1.0-1

2) 如果我们就是要删除 foo 这个 rpm 包，可以增加参数 --nodeps ,就可以强制删除，但是一般不推荐这样做，因为依赖于该软件包的程序可能无法运行
如：$ rpm -e --nodeps foo
带上 --nodeps 就是强制删除。
```

### 安装

```
基本语法
	rpm -ivh RPM 包全路径名称
参数说明
	i=install 安装
	v=verbose 提示
	h=hash 进度条
```

```
1) 演示安装firefox 浏览器
步骤先找到 firefox 的安装 rpm 包,你需要挂载上我们安装 centos 的 iso 文件，然后到/media/下去找rpm 找。
cp firefox-45.0.1-1.el6.centos.x86_64.rpm /opt/
cd /opt/
rpm -ivh firefox-45.0.1-1.el6.centos.x86_64.rpm
```



## YUM

```
Yum 是一个Shell 前端软件包管理器。基于RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包。使用 yum 的前提是可以联网。
```

### 基本命令

```
查询yum 服务器是否有需要安装的软件
yum list|grep xx 软件列表

安装指定的yum 包
yum install xxx 下载安装
```

```
案例：请使用yum 的方式来安装firefox

1) 先查看一下 firefox rpm 在yum 服务器有没有
yum llist | grep firefox

2) 安装
yum install firefox
```

