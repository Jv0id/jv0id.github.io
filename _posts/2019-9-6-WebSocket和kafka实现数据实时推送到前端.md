---
title: "WebSocket和kafka实现数据实时推送到前端"
layout: post
date: 2019-09-06 12:08
headerImage: false
tag:
- java
- websocket
- kafka
- 实时
category: blog
author: 夏潇熙
description: WebSocket和kafka实现数据实时推送到前端
---



## 一. 需求背景

> 最近新接触一个需求，需要将kafka中的数据实时推送到前端展示。最开始想到的是前端轮询接口数据，但是无法保证轮询的频率和消费的频率完全一致，或造成数据缺失等问题。最终确定用利用WebSocket实现数据的实时推送。




## 二. websocket简介

> 网上已经有好多介绍WebSocket的文章了，就不详细介绍了，这里只做简单介绍。 WebSocket协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端。

## 三. 服务端实现

#### 1. pom文件
　　这里需要引用三个依赖。第一个为WebSocket需要的依赖，另外两个为kafka的依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
 
    <groupId>person</groupId>
    <artifactId>wbSocketkafka</artifactId>
    <version>1.0-SNAPSHOT</version>
 
    <dependencies>
        <!-- webSocket所需依赖 -->
        <dependency>
            <groupId>javax</groupId>
            <artifactId>javaee-api</artifactId>
            <version>7.0</version>
        </dependency>
        <!-- kafka 所需依赖 -->
        <dependency>
            <groupId>org.apache.kafka</groupId>
            <artifactId>kafka_2.9.2</artifactId>
            <version>0.8.1.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.kafka</groupId>
            <artifactId>kafka-clients</artifactId>
            <version>RELEASE</version>
        </dependency> 
    </dependencies>
</project>

```

#### 2. webSocket服务端实现

```java
//此处定义接口的uri
@ServerEndpoint("/wbSocket")
public class WebSocket {
    private Session session;
    public static CopyOnWriteArraySet<WebSocket> wbSockets = new CopyOnWriteArraySet<WebSocket>(); //此处定义静态变量，以在其他方法中获取到所有连接
    
    /**
     * 建立连接。
     * 建立连接时入参为session
     */
    @OnOpen
    public void onOpen(Session session){
        this.session = session;
        wbSockets.add(this); //将此对象存入集合中以在之后广播用，如果要实现一对一订阅，则类型对应为Map。由于这里广播就可以了随意用Set
        System.out.println("New session insert,sessionId is "+ session.getId());
    }
    /**
     * 关闭连接
     */
    @OnClose
    public void onClose(){
        wbSockets.remove(this);//将socket对象从集合中移除，以便广播时不发送次连接。如果不移除会报错(需要测试)
        System.out.println("A session insert,sessionId is "+ session.getId());
    }
    /**
     * 接收前端传过来的数据。
     * 虽然在实现推送逻辑中并不需要接收前端数据，但是作为一个webSocket的教程或叫备忘，还是将接收数据的逻辑加上了。
     */
    @OnMessage
    public void onMessage(String message ,Session session){
        System.out.println(message + "from " + session.getId());
    }
 
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }
}
```

#### 3. kafka消费者实现

```java
public class ConsumerKafka extends Thread {
 
    private KafkaConsumer<String,String> consumer;
    private String topic = "kafkaTopic";
 
    public ConsumerKafka(){
 
    }
 
    @Override
    public void run(){
        //加载kafka消费者参数
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "ytna");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("session.timeout.ms", "15000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        //创建消费者对象
        consumer = new KafkaConsumer<String,String>(props);
        consumer.subscribe(Arrays.asList(this.topic));
        //死循环，持续消费kafka
        while (true){
            try {
               //消费数据，并设置超时时间
                ConsumerRecords<String, String> records = consumer.poll(100);
                //Consumer message
                for (ConsumerRecord<String, String> record : records) {
                    //Send message to every client
                    for (WebSocket webSocket :wbSockets){
                        webSocket.sendMessage(record.value());
                    }
                }
            }catch (IOException e){
                System.out.println(e.getMessage());
                continue;
            }
        }
    }
 
    public void close() {
        try {
            consumer.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
 
    //供测试用，若通过tomcat启动需通过其他方法启动线程
    public static void main(String[] args){
        ConsumerKafka consumerKafka = new ConsumerKafka();
        consumerKafka.start();
    }
}
```

- **需要注意的是WebSocket对tomcat版本是有要求的**

## 四. 前端简单实现
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebSocket client</title>
    <script type="text/javascript">
        var socket;
        if (typeof (WebSocket) == "undefined"){
            alert("This explorer don't support WebSocket")
        }
 
        function connect() {
            //Connect WebSocket server
            socket =new WebSocket("ws://127.0.0.1:8080/wbSocket");
            //open
            socket.onopen = function () {
                alert("WebSocket is open");
            }
            //Get message
            socket.onmessage = function (msg) {
                alert("Message is " + msg);
            }
            //close
            socket.onclose = function () {
                alert("WebSocket is closed");
            }
            //error
            socket.onerror = function (e) {
                alert("Error is " + e);
            }
        }
 
        function close() {
            socket.close();
        }
 
        function sendMsg() {
            socket.send("This is a client message ");
        }
    </script>
</head>
<body>
    <button onclick="connect()">connect</button>
    <button onclick="close()">close</button>
    <button onclick="sendMsg()">sendMsg</button>
</body>
</html>

```
