---
title:  如何获取 docker 容器(container)的 ip 地址
modify_date:   2019-09-11 13:11:56 +0800
tags:  docker ip container 容器
author: Jv0id
sharing: true
show_author_profile: true
show_subscribe: true
---




> > > **文中的所用的大括号`{}`均为中文状态下的符号，注意更改。**

### 1-进入容器内部

`cat /etc/hosts`

会显示自己以及(– link)软连接的容器IP

### 2-使用命令

`docker inspect --format '｛ ｛  .NetworkSettings.IPAddress ｝｝' <container-ID>`

或

`docker inspect <container id>`

或

`docker inspect -f '｛ ｛ range .NetworkSettings.Networks ｝｝ ｛ ｛ .IPAddress ｝｝｛ ｛ end ｝｝' container_name_or_id`

### 3-可以考虑在~/.bashrc中写一个函数

`function docker_ip() {
    sudo docker inspect --format '｛ ｛  .NetworkSettings.IPAddress ｝｝' $1
}`

`source ~/.bashrc`

以后就可以直接使用命令：

`docker_ip <container-ID>`

### 4-要获取所有容器名称及其IP地址
`docker inspect -f '｛ ｛ .Name ｝｝ - ｛ ｛ .NetworkSettings.IPAddress ｝｝' $(docker ps -aq)`

如果使用docker-compose命令将是:

`docker inspect -f '｛ ｛ .Name ｝｝ - ｛ ｛ range .NetworkSettings.Networks ｝｝｛ ｛ .IPAddress ｝｝｛ ｛ end ｝｝' $(docker ps -aq)`

### 5-显示所有容器IP地址

`docker inspect --format='｛ ｛ .Name ｝｝ - ｛ ｛ range .NetworkSettings.Networks ｝｝｛ ｛ .IPAddress ｝｝｛ ｛ end ｝｝' $(docker ps -aq)`

