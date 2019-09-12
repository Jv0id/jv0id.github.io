---

title:  "CentOS7 64位下MySQL5.7安装与配置（YUM）"
key: mysql
tags:  mysql CentOS7 yum   
author: Jv0id
---



> 安装环境：CentOS7 64位 MINI版，安装MySQL5.7




## 配置YUM源

* 在MySQL官网中下载YUM源rpm安装包：<http://dev.mysql.com/downloads/repo/yum/> 

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/mysql/1.png)

* 下载mysql源安装包
```bash
wget http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
```

* 安装mysql源
```bash
 yum localinstall mysql57-community-release-el7-8.noarch.rpm
```

* 检查mysql源是否安装成功
```bash
yum repolist enabled | grep "mysql.*-community.*"
```
![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/mysql/2.png)

看到上图所示表示安装成功。 

- 可以修改vim /etc/yum.repos.d/mysql-community.repo源，改变默认安装的mysql版本。比如要安装5.6版本，将5.7源的enabled=1改成enabled=0。然后再将5.6源的enabled=0改成enabled=1即可。改完之后的效果如下所示： 

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/mysql/3.png)

-----
## 安装MySQL

```bash
yum install mysql-community-server
```

-----
## 启动MySQL服务
```bash
systemctl start mysqld
```

- 查看MySQL的启动状态

```bash
systemctl status mysqld
 mysqld.service - MySQL Server
   Loaded: loaded (/usr/lib/systemd/system/mysqld.service; disabled; vendor preset: disabled)
   Active: active (running) since 五 2016-06-24 04:37:37 CST; 35min ago
 Main PID: 2888 (mysqld)
   CGroup: /system.slice/mysqld.service
           └─2888 /usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid
6月 24 04:37:36 localhost.localdomain systemd[1]: Starting MySQL Server...
6月 24 04:37:37 localhost.localdomain systemd[1]: Started MySQL Server.
```

## 开机启动

```bash
systemctl enable mysqld
systemctl daemon-reload
```

-----
## 修改root本地登录密码

* mysql安装完成之后，在/var/log/mysqld.log文件中给root生成了一个默认密码。通过下面的方式找到root默认密码，然后登录mysql进行修改：

```bash
grep 'temporary password' /var/log/mysqld.log
```

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/mysql/4.png)

```bash
mysql -uroot -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!'; 
#或者
mysql> set password for 'root'@'localhost'=password('MyNewPass4!');
```

> mysql5.7默认安装了密码安全检查插件（valimodify_date_password），默认密码检查策略要求密码必须包含：大小写字母、数字和特殊符号，并且长度不能少于8位。否则会提示ERROR 1819 (HY000): Your password does not satisfy the current policy requirements错误，如下图所示：

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/mysql/5.png)

> 通过msyql环境变量可以查看密码策略的相关信息：
```bash
mysql> show variables like '%password%';
```

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/mysql/6.png)

```bash
valimodify_date_password_policy：密码策略，默认为MEDIUM策略 
valimodify_date_password_dictionary_file：密码策略文件，策略为STRONG才需要 
valimodify_date_password_length：密码最少长度 
valimodify_date_password_mixed_case_count：大小写字符长度，至少1个 
valimodify_date_password_number_count ：数字至少1个 
valimodify_date_password_special_char_count：特殊字符至少1个 
```
> 上述参数是默认策略MEDIUM的密码检查规则

* 共有以下几种密码策略：

| 策略 | 检查规则 |
|---|---|
| 0 or LOW | Length |
| 1 or MEDIUM | Length; numeric, lowercase/uppercase, and special characters |
| 2 or STRONG | Length; numeric, lowercase/uppercase, and special characters; dictionary file |

> MySQL官网密码策略详细说明: <http://dev.mysql.com/doc/refman/5.7/en/valimodify_date-password-options-variables.html#sysvar_validate_password_policy>

* 修改密码策略
 - 在`/etc/my.cnf`文件添加`valimodify_date_password_policy`配置，指定密码策略
 - 选择0（LOW），1（MEDIUM），2（STRONG）其中一种，选择2需要提供密码字典文件
```bash
valimodify_date_password_policy=0 / 1 / 2
```

* 如果不需要密码策略，添加my.cnf文件中添加如下配置禁用即可：
```bash
valimodify_date_password = off
```

* 重新启动mysql服务使配置生效：
```bash
systemctl restart mysqld
```

-----
## 添加远程登录用户

> 默认只允许root帐户在本地登录，如果要在其它机器上连接mysql，必须修改root允许远程连接，或者添加一个允许远程连接的帐户，为了安全起见，我添加一个新的帐户：
```bash
mysql> GRANT ALL PRIVILEGES ON *.* TO 'yangxin'@'%' IDENTIFIED BY 'Yangxin0917!' WITH GRANT OPTION;
```

-----
## 配置默认编码为utf8

> 修改`/etc/my.cnf`配置文件，在[mysqld]下添加编码配置，如下所示：
```bash
[mysqld]
character_set_server=utf8
init_connect='SET NAMES utf8'
```
-----
> 重新启动mysql服务，查看数据库默认编码如下所示：

![](https://raw.githubusercontent.com/jv0id/jv0id.github.io/master/images/mysql/7.png)

-----
> 默认配置文件路径： 
```
配置文件：/etc/my.cnf 
日志文件：/var/log//var/log/mysqld.log 
服务启动脚本：/usr/lib/systemd/system/mysqld.service 
socket文件：/var/run/mysqld/mysqld.pid
```

具体参考：<http://www.linuxidc.com/Linux/2016-09/135288.htm>

-----
## 权限

* 给root用户授予从任何机器上登陆mysql服务器的权限：

```bash
mysql> grant all privileges on *.* to 'root'@'%' identified by '你的密码' with grant option;
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

```
