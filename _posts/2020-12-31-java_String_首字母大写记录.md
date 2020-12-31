---
layout: post
title: "Java String类型 首字母大写"
date: 2020-12-21 14:28:59
description: "Java String类型 首字母大写"
tag: Java String
---

java string, 需要进行首字母大写改写，网上大家的思路基本一致，就是将首字母截取，转化成大写然后再串上后面的，类似如下代码:

```java
// 首字母大写
public static String captureName(String name) {
name = name.substring(0, 1).toUpperCase() + name.substring(1);
return name;
}
```
    
将字符串name转化为首字母大写。但是这种效率并不高，我之前看过一个牛人的写的方法核心代码，是这样的:
```java

// 首字母大写
    public static String captureName(String name) {
// name = name.substring(0, 1).toUpperCase() + name.substring(1);
// return name;
char[] cs = name.toCharArray();
cs[0] -= 32;
return String.valueOf(cs);
}
```

即进行字母的ascii编码前移，但是这个文章在网上找不到了， 所以在此记录一下。