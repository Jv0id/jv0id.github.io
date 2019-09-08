---
layout: post
title:  "Linux shell的特殊变量"
categories: linux
tags:  shell 变量 linux   
author: Jv0id
---
* content
{:toc}


## Linux中变量#,@,0,1,2,*,$$,$?的含义

##### $# 是传给脚本的参数个数
##### $0 是脚本本身的名字
##### $1 是传递给该shell脚本的第一个参数
##### $2 是传递给该shell脚本的第二个参数
##### $@ 是传给脚本的所有参数的列表
##### $* 是以一个单字符串显示所有向脚本传递的参数，与位置变量不同，参数可超过9个 
##### $$ 是脚本运行的当前进程ID号 $? 是显示最后命令的退出状态，0表示没有错误，其他表示有错误

* 区别：@* 
- 相同点：都是引用所有参数
- 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数（分别存储在1123）则"3）则"*"等价于"1123"（传递了一个参数）；而"3"（传递了一个参数）；而“@"等价于"1""1""2""$3"（传递了三个参数）

## 变量说明:
`$$`     
Shell本身的PID（ProcessID）
 
`$!`       
Shell最后运行的后台Process的PID 

`$?`           
最后运行的命令的结束代码（返回值,0为正常，其它为不正常。） 

`$-`          
使用Set命令设定的Flag一览 

`$*`        
所有参数列表。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。
 
`$@`          
所有参数列表。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 

`$#`        
添加到Shell的参数个数 

`$0`           
Shell本身的文件名 

`$1～$n`             
添加到Shell的各参数值。$1是第1参数、$2是第2参数…。


## 一、文件比较运算符
1. `-e filename` 如果 filename存在，则为真 如： `[ -e /var/log/syslog ] `
2. `-d filename` 如果 filename为目录，则为真 如： `[ -d /tmp/mydir ] `
3. `-f filename` 如果 filename为常规文件，则为真 如： `[ -f /usr/bin/grep ] `
4. `-L filename` 如果 filename为符号链接，则为真 如： `[ -L /usr/bin/grep ]`
5. `-r filename` 如果 filename可读，则为真 如： `[ -r /var/log/syslog ] `
6. `-w filename` 如果 filename可写，则为真 如： `[ -w /var/mytmp.txt ]` 
7. `-x filename` 如果 filename可执行，则为真 如： `[ -L /usr/bin/grep ] `
8. `filename1 -nt filename2`如果filename1比filename2新，则为真如：`[/tmp/install/etc/services-nt/etc/services]`
9. `filename1 -ot filename2` 如果 filename1比 filename2旧，则为真 如：`[/boot/bzImage -ot arch/i386/boot/bzImage]`
            
## 二、字符串比较运算符（请注意引号的使用，这是防止空格扰乱代码的好方法）
 1. -z string  如果 string长度为零，则为真 如：  `[ -z "$myvar" ]`
 2. -n string  如果 string长度非零，则为真  如： `[ -n "$myvar" ]`
 3. string1= string2  如果 string1与 string2相同，则为真 如：  `["$myvar" = "one two three"]`
 4. string1!= string2  如果 string1与 string2不同，则为真 如：  `["$myvar" != "one two three"]`
 
## 三、算术比较运算符
 1. num1-eq num2  等于 如： `[ 3 -eq $mynum ]`
 2. num1-ne num2  不等于 如： `[ 3 -ne $mynum ]`
 3. num1-lt num2  小于 如： `[ 3 -lt $mynum ]`
 4. num1-le num2  小于或等于  如：`[ 3 -le $mynum ]`
 5. num1-gt num2  大于  如：`[ 3 -gt $mynum ]`
 6. num1-ge num2  大于或等于 如： `[ 3 -ge $mynum ]`
 
- -eq           //等于            
- -ne           //不等于
- -gt           //大于 （greater ）
- -lt           //小于  （less）
- -ge           //大于等于
- -le           //小于等于
在linux 中 命令执行状态：0 为真，其他为假

## 四、查看磁盘、文件大小 

1. `df -h` 查看磁盘占用情况 
2. `du -sh ./*` 查看当前目录下文件大小，单位M

## awk处理过程: 
依次对每一行进行处理，然后输出 awk命令形式:          
`awk [-F|-f|-v] ' BEGIN{} // {command1;command2} END{}' file ` 

- `[-F|-f|-v]` :大参数，-F指定分隔符，-f调用脚本，-v定义变量 var=value 
* ' ' 引用代码块 
* BEGIN 初始化代码块，在对每一行进行处理之前，初始化代码，主要是引用全局变量，设置FS分隔符 
* // 匹配代码块，可以是字符串或正则表达式 
* {} 命令代码块，包含一条或多条命令 
* ; 多条命令使用分号分隔 
* END 结尾代码块，在对每一行进行处理之后再执行的代码块，主要是进行最终计算或输出结尾摘要信息

## ps和topcpu 占用区别

* 看看man ps里的相关内容           
`CPU usage is currently expressed as the percentage of time spent running during the entire lifetime of a process. This is not ideal,and it does not conform to the standards that ps otherwise conforms to.CPU usage is unlikely to add up to exactly 100%.`

* 再看看top的           
`k: %CPU – CPU usage The task’s share of the elapsed CPU time since the last screen update, expressed as a percentage of total CPU time. In a true SMP environment, if ‘Irix mode’ is Off, top will operate in ‘Solaris mode’ where a task’s cpu usage will be divided by the total number of CPUs. You toggle ‘Irix/Solaris’ modes with the ‘I’ interactive command.`

就不难理解了。ps是从进程开始就开始算的，是平均的占用率；而top是从上次刷新开始算的，一般几秒钟一刷，可以认为是即时的。而桌面系统我们一般更关注即时的，所以top的cpu占用率才是我需要的。而且top默认cpu的占用率的和并不是100%，而是核数x100%，所以有时会有一个进程占用超过100%的情况。

