---
title: "Linux安装Redis"
layout: post
date: 2019-09-10 10:02
headerImage: false
tag:
- Linux
- redis
- 安装
category: blog
author: 夏潇熙
description: Linux安装Redis
---



## 系统版本为centOS 7.3

## 一、下载 Redis

### 在官网中下载Redis，下载地址为：<http://www.redis.cn/>

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/redis/5.png)

### 也可使用`wget`命令进行下载：

```bash
wget http://download.redis.io/releases/redis-5.0.5.tar.gz
```
可以看到我们当前安装的Redis服务版本为`5.0.5`

## 二、解压

```bash
tar -zxvf redis-5.0.5.tar.gz
```
就可以获取到解压之后的源码包`redis-5.0.5`，之后进入到该目录中。

## 三、编译

在进入到该目录下输入命令：

```bash
make
```

就开启了Redis的编译状态，在编译完成之后可以看到类似如下的信息提示：

```bash
        CC rax.o
    LINK redis-server
    INSTALL redis-sentinel
    CC redis-cli.o
    LINK redis-cli
    CC redis-benchmark.o
    LINK redis-benchmark
    INSTALL redis-check-rdb
    INSTALL redis-check-aof

Hint: It's a good idea to run 'make test' ;)

make[1]: Leaving directory `/root/redis-5.0.5/src'
```

- 应当运行make test命令
- 源码文件被移动到当前目录的src文件夹下面。

#### 安装过程可能出现的问题：
- 1,CentOS5.7默认没有安装gcc，这会导致我们无法make成功。使用yum安装：
`yum -y install gcc`

- 2,make时报如下错误：
```bash
zmalloc.h:50:31: error: jemalloc/jemalloc.h: No such file or directory

zmalloc.h:55:2: error: #error "Newer version of jemalloc required"

make[1]: *** [adlist.o] Error 1

make[1]: Leaving directory '/data0/src/redis-2.6.2/src'

make: *** [all] Error 2
```

原因是jemalloc重载了Linux下的ANSI C的malloc和free函数。解决办法：make时添加参数。

`make MALLOC=libc`

- 3,make之后，会出现一句提示
`Hint: To run 'make test' is a good idea ;) `

但是不测试，通常是可以使用的。若我们运行`make test` ，会有如下提示

```bash
[devnote@devnote src]$ make test

You need tcl 8.5 or newer in order to run the Redis test

make: ***[test] Error_1
```

解决办法是用yum安装tcl8.5（或去tcl的官方网站http://www.tcl.tk/下载8.5版本，并参考官网介绍进行安装）

`yum install tcl`


## 四、安装

- 进入到源码目录src下，输入对应的安装命令：

```bash
cd src
make install
```
- 安装完成之后的提示结果为：

```bash
Hint: It is a good idea to run 'make test' ;)

    INSTALL install
    INSTALL install
    INSTALL install
    INSTALL install
    INSTALL install
```
## 五、文件移动

在经过`make install`命令对Redis进行安装之后，我们可以看到文件夹下面的文件列表：

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/redis/3.png)

- 文件移动的目的是为了对Redis的配置和服务启动进行管理：

  * bin用于存放命令
  * etc拥有存放配置文件
  
我们返回上级目录，也就是在`redis-5.0.5`这个文件夹中进行文件夹的创建：

```bash
cd ..
mkdir etc
mkdir bin
```
之后使用命令将对应的文件移动到对应目录下：

```bash
mv redis.conf etc/
cd src
mv mkreleasehdr.sh  redis-benchmark  redis-check-aof  redis-check-rdb  redis-cli  redis-sentinel  redis-server  redis-trib.rb ../bin
```

## 六、Redis服务启动

进入到`bin`目录下面，进行Redis服务的启动：

```bash
./redis-server
```
![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/redis/2.png)

- 在这里可以看到服务已经启动起来，但是并没有使用到`etc/redis.conf`配置文件。目前还是使用默认配置进行服务的启动。先使用`control + c`停止当前服务。我们可以看到如下提示信息：

```bash
^C6443:signal-handler (1521089911) Received SIGINT scheduling shutdown...
6443:M 15 Mar 12:58:31.994 # User requested shutdown...
6443:M 15 Mar 12:58:31.995 * Saving the final RDB snapshot before exiting.
6443:M 15 Mar 12:58:32.003 * DB saved on disk
6443:M 15 Mar 12:58:32.003 # Redis is now ready to exit, bye bye...
```

我们运行`pstree -p | grep redis`也可以发现Redis服务已经被完全终止。

接下来使用命名带上配置文件一起运行

```bash
./redis-server /path/to/redis.conf
./redis-server /mnt/vdb/software/redis-5.0.5/etc/redis.conf
````
但是现在依旧是前台运行，在我们修改配置文件之后才可以后台运行。需要将`daemonize`配置为`true`。

- 搜索 ：daemonize
- 把daemonize配置项改为`yes`
- 保存退出

> 在vim命令模式下，输入'/'即进入搜索模式，输入想输入的字符串即可进行搜索

在使用以上加载配置文件的命令启动Redis服务即可看到如下提示：

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/redis/4.png)

Redis进入后台启动模式。使用命令：

```bash
pstree -p | grep redis
```
可以看到提示：

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/redis/1.png)

证明Redis服务正在运行。

**Redis服务的默认端口号为6379。**

我们可以使用如下命令查看端口占用情况：

```bash
lsof -i tcp:6379
```

可以看到如下提示：

```bash
redis-ser 8842 root    6u  IPv4 33556564      0t0  TCP VM_39_184_centos:6379 (LISTEN)
```

证明该端口被Redis服务所占用。

注意，redis服务需要 root 权限才能查看，不然只能检查到6379被某个进程占用，但是看不到进程名称。

至此，redis服务已经按照配置文件启动成功。

## 七、客户端登录

使用命令

```bash
./redis-cli 
```

就会进入对应的命令行：

```bash
./redis-cli 

127.0.0.1:6379> 
```
表明客户端登录成功，可以使用`exit`退出命令行。

## 八、Redis服务关闭

- `pkill redis-server`
- 在Redis的`bin`目录下`/redis-cli shutdown`
- 还可以使用 `killall` 和`kill -9`对服务进行关闭。

## 九、附录：配置信息

+ daemonize 如果需要在后台运行，把该项改为yes
+ pidfile 配置多个pid的地址 默认在/var/run/redis. pid
+ bind 绑定ip，设置后只接受来自该ip的请求
+ port 监听端口，默认是6379
+ loglevel 分为4个等级：debug verbose notice warning
+ logfile 用于配置log文件地址
+ databases 设置数据库个数，默认使用的数据库为0
+ save 设置redis进行数据库镜像的频率。
+ rdbcompression 在进行镜像备份时，是否进行压缩
+ dbfilename 镜像备份文件的文件名
+ Dir 数据库镜像备份的文件放置路径
+ Slaveof 设置数据库为其他数据库的从数据库
+ Masterauth 主数据库连接需要的密码验证
+ Requriepass 设置 登陆时需要使用密码
+ Maxclients 限制同时使用的客户数量
+ Maxmemory 设置redis能够使用的最大内存
+ Appendonly 开启append only模式
+ Appendfsync 设置对appendonly. aof文件同步的频率（对数据进行备份的第二种方式）
+ vm-enabled 是否开启虚拟内存支持 （vm开头的参数都是配置虚拟内存的）
+ vm-swap-file 设置虚拟内存的交换文件路径
+ vm-max-memory 设置redis使用的最大物理内存大小
+ vm-page-size 设置虚拟内存的页大小
+ vm-pages 设置交换文件的总的page数量
+ vm-max-threads 设置VM IO同时使用的线程数量
+ Glueoutputbuf 把小的输出缓存存放在一起
+ hash-max-zipmap-entries 设置hash的临界值
+ Activerehashing 重新hash

转自：https://blog.csdn.net/u011669700/article/details/79566713
