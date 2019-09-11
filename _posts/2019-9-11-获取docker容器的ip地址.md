---
layout: post
title:  如何获取 docker 容器(container)的 ip 地址
date:   2019-09-11 13:11:56 +0800
categories: docker
tags:  docker ip container 容器
author: Jv0id
---
* content
{:toc}


### 1-进入容器内部
```bash
cat /etc/hosts
```

### 2-使用命令
```bash
docker inspect --format '{{ .NetworkSettings.IPAddress }}' <container-ID>
```
或
```bash
docker inspect <container id>
```
或
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
```

### 3-可以考虑在~/.bashrc中写一个函数
```bash
function docker_ip() {
    sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' $1
}
```
```bash
source ~/.bashrc
```
以后就可以直接使用命令：
```bash
 docker_ip <container-ID>
```

### 4-要获取所有容器名称及其IP地址
```bash
docker inspect -f '{{.Name}} - {{.NetworkSettings.IPAddress }}' $(docker ps -aq)
```
如果使用所有容器IP地址
```bash
docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
```

### 5-显示所有容器IP地址
```bash
docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
```
