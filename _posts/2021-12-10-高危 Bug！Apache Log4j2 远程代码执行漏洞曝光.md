---
layout: post
title: "高危 Bug！Apache Log4j2 远程代码执行漏洞细节曝光：官方正在修复中"
date: 2021-12-10 16:56:00
description: "Apache Log4j2 Bug 漏洞"
tag: Apache Log4j2 Bug 漏洞
---

### 十几个小时前，互联网上曝出了 Apache Log4j2 中的远程代码执行漏洞。攻击者可利用此漏洞构造特殊的数据请求包，最终触发远程代码执行。据“白帽”分析确认，几乎所有技术巨头如百度等都是该 Log4j 远程代码执行漏洞的受害者。
>（据 Apache 官方最新信息显示，目前 release 页面上 Log4j-2.15.0 更新并通过，正式发布工作正在进行中）

自从 11 月 24 日阿里巴巴云安全团队正式报告了该 Apache Log4J2 远程代码执行漏洞以来，其危漏洞危害已在互联网上持续蔓延。由于 Apache Log4j2 的某些函数具有递归分析函数，因此攻击者可以直接构造恶意请求来触发远程代码执行漏洞。

## Apache Log4j2
Apache Log4j2 最初是由 Ceki Gülcü 编写，是 Apache 软件基金会 Apache 日志服务项目的一部分。Log4j 是几种 Java 日志框架之一。而 Apache Log4j2 是对 Log4j 的升级，相比其前身 Log4j1 有了更显著的改进，同时修复了 Logback 架构中的一些固有问题。
通过 Apache Log4j2 框架，开发者可通过定义每一条日志信息的级别，来控制日志生成过程。
目前该日志框架已被广泛用于业务系统开发，用来记录日志信息。大多数情况下，开发者可能会将用户输入导致的错误信息写入日志中。

## 漏洞描述
Apache Log4j2 远程代码执行漏洞的详细信息已被披露，而经过分析，本次 Apache Log4j 远程代码执行漏洞，正是由于组件存在 Java JNDI 注入漏洞：当程序将用户输入的数据记入日志时，攻击者通过构造特殊请求，来触发 Apache Log4j2 中的远程代码执行漏洞，从而利用此漏洞在目标服务器上执行任意代码。

受影响版本：

`Apache Log4j 2.x <= 2.14.1`

已知受影响的应用程序和组件：

* spring-boot-starter-log4j2
* Apache Solr
* Apache Flink
* Apache Druid

据悉，此次 Apache Log4j2 远程代码执行漏洞风险已被业内评级为“高危”，且漏洞危害巨大，利用门槛极低。有报道称，目前 Apache Solr、Apache Struts2、Apache Druid、Apache Flink 等众多组件及大型应用均已经受到了影响，需尽快采取方案阻止。

## 解决方案

目前，Apache Log4j 已经发布了新版本来修复该漏洞，请受影响的用户将 Apache Log4j2 的所有相关应用程序升级至最新的 Log4j-2.15.0-rc2 版本，同时升级已知受影响的应用程序和组件，如 srping-boot-strater-log4j2、Apache Solr、Apache Flink、Apache Druid。

临时修复建议：

* JVM 参数添加 `-Dlog4j2.formatMsgNoLookups=true`
  
* `log4j2.formatMsgNoLookups=True`
  
* `FORMAT_MESSAGES_PATTERN_DISABLE_LOOKUPS` 设置为`true`

之前，就已经不知道多少次听到关于 log4j 漏洞的消息了，现在又直接来了个被恶意公开的新 0day，且影响面极广。

据 payload 公开信息显示，目前全球范围内大量网站已经被该漏洞“攻陷”，比如百度,还有 iCloud.


更新：
据 Apache 官方最新信息显示，release 页面上已经更新了 Log4j 2.15.0 版本：

```
<dependencies>
   <dependency org="org.apache.logging.log4j" name="log4j-api" rev="2.15.0" />
   <dependency org="org.apache.logging.log4j" name="log4j-core" rev="2.15.0" />
</dependencies>
```

由于正式发布工作正在进行中，因此对外暂时还无法看到 2.15 版本。

据 Apache 方面人士透露，目前 Maven Central 上仍有 0 个工件，可能需要几个小时后才能同步镜像服务器并正式对外采用。更多后续，我们持续关注。

参考链接: 
[https://github.com/apache/logging-log4j2](https://github.com/apache/logging-log4j2){:target="_blank"}

[https://repository.apache.org/service/local/repositories/releases/content/org/apache/logging/log4j/log4j-core/2.15.0/log4j-core-2.15.0.jar](https://repository.apache.org/service/local/repositories/releases/content/org/apache/logging/log4j/log4j-core/2.15.0/log4j-core-2.15.0.jar){:target="_blank"}
- END -

[source](https://telegra.ph/%E9%AB%98%E5%8D%B1-BugApache-Log4j2-%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%E7%BB%86%E8%8A%82%E6%9B%9D%E5%85%89%E5%AE%98%E6%96%B9%E6%AD%A3%E5%9C%A8%E4%BF%AE%E5%A4%8D%E4%B8%AD-12-10){:target="_blank"}