---
title: "一键部署 jdk/tomcat/mysql"
layout: post
date: 2019-11-21 14:56
headerImage: false
tag:
- jdk
- tomcat
- mysql
- 一键部署
category: blog
author: 夏潇熙
description: 一键部署 jdk/tomcat/mysql
---

* 本脚本仅在 Centos7 通过测试。JDK 版本为 8,Tomcat 为 8.5,mysql 为 5.7。

## 一键部署教程(包含jdk,tomcat和mysql)

linux 下载一键脚本:
```bash
wget https://raw.githubusercontent.com/Jv0id/allShell/master/shells/allPack.sh
```
执行脚本:
```bash
source allPack.sh
```

进入数据库:
```bash
mysql -uroot -p
```

修改数据库密码:
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY '密码';
```

远程权限账户创建:
```bash
grant all privileges on *.* to '用户名' @'%' identified by '密码';
FLUSH PRIVILEGES;"
```
 
开启 / 关闭 tomcat:
```bash
service tomcat start
service tomcat stop
```

## 单独的 mysql 5.6 和 mysql 5.7 一键安装脚本

#### mysql 5.6 一键脚本
```bash
#!/bin/bash

echo "begin install mysql 5.6"
sleep 3

wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum install -y mysql-server
service mysqld restart

echo "update password and access remote"
sleep 1

echo -e "\n" | mysql -uroot  <<EOF
SET PASSWORD FOR root@'localhost' = PASSWORD('Mysql@123');
GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "Mysql@123";
EOF
echo -e "\033[31m数据库安装完成,你的数据库密码为:Mysql@123(已开启远程访问权限)\033[0m"
```

> 5.6 版本不同于 5.7, 它初始没有密码，所以登录只需要一个回车即可，使用管道自动输入密码登录；在使用 EOF 作为子命令修改 mysql 的密码以及创建一个远程账户；

mysql 5.7 一键安装脚本

```bash
#!/bin/bash

echo "begin install mysql 5.7"
sleep 3

sudo rpm -ivh https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
sudo yum -y install mysql-community-server
systemctl start mysqld
mysqltmppwd=`cat /var/log/mysqld.log | grep -i 'temporary password'`
mysql  -uroot -p"${mysqltmppwd: -12}"  --connect-expired-password  -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'Mysql@123';"
mysql  -uroot -p"Mysql@123"  --connect-expired-password  -e "grant all privileges on *.* to 'root' @'%' identified by 'Mysql@123';"
echo "##########################################################################"
echo -e "\033[31m数据库安装完成,你的数据库密码为:Mysql@123(已开启远程访问权限)\033[0m"
echo "##########################################################################"
```
