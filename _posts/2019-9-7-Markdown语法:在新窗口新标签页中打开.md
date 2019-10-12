---
layout: post
title:  "Markdown语法:在新窗口新标签页中打开"
key: Markdown
tags:  Markdown 新窗口 语法 区别   
author: Jv0id
---



## 超链接：默认在本标签页打开

### Markdown语法里的几种超链接方式都是默认直接在本标签页打开的，如下：

* 方法一

 - 方括号后加小括号，小括号里写链接地址。

`[example](http://jv0id.github.io)`

 效果如下：

[example](http://jv0id.github.io)




* 方法二

 - 如果无所谓链接的名字的话，可以直接使用尖括号把链接括起来。

`<http://jv0id.github.io>`

 - 效果如下：

<http://jv0id.github.io>

### 让超链接在新窗口(新标签页)中打开

 - 我看到有些朋友在他们的博客中提到，要在什么{YOUR_OCTOPRESS}\source_includes\custom\head.html后面添加一堆代码,其实最简单的办法是，只需要在上面两种方法后面添加{:target="_blank"}.

- 改进后的方法一:

`[example](http://jv0id.github.io){:target="_blank"}`

效果如下：

[example](http://jv0id.github.io){:target="_blank"}

- 改进后的方法二:

`<http://jv0id.github.io>{:target="_blank"}`

效果如下：

<http://jv0id.github.io>{:target="_blank"}
