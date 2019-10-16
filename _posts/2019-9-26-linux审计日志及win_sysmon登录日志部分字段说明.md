---
title: "linux审计日志及win_sysmon登录日志部分字段说明"
layout: post
date: 2019-09-26 13:11
headerImage: false
tag:
- linux
- 审计日志
- win_sysmon
- 登录日志
- 字段
category: blog
author: 夏潇熙
description: linux审计日志及win_sysmon登录日志部分字段说明
---


```bash
type=LOGIN msg=audit(1561701504.936:2922): pid=768324 uid=0 old-auid=4294967295 auid=0 tty=(none) old-ses=4294967295 ses=255 res=1
```    
```bash
type=LOGIN msg=audit(1562164321.734:11324210): pid=27558 uid=0 old-auid=4294967295 auid=0 tty=(none) old-ses=4294967295 ses=126720 res=1
```

当用户登录并进入系统时被触发以记录相关登录信息。

auid:审核ID。为进程提供用户登录的审核ID。然后将该ID传递给由用户的初始过程启动的任何子进程。即使用户更改了他们的身份（例如，变为root），审核ID也保持不变。    
ses:登录会话ID

```bash
type=USER_LOGIN msg=audit(1561701505.232:2924): pid=768324 uid=0 auid=0 ses=255 msg='op=login id=0 exe="/usr/sbin/sshd" hostname=192.168.1.43 addr=192.168.1.43 terminal=ssh res=success'
```      
```bash
type=USER_LOGIN msg=audit(1562164262.557:11323800): pid=27340 uid=0 auid=4294967295 ses=4294967295 msg='op=login acct="root" exe="/usr/sbin/sshd" hostname=? addr=118.89.25.23 terminal=ssh res=failed'
```

用户登录。

```bash
type=USER_START msg=audit(1562164261.707:11323790): pid=27344 uid=0 auid=0 ses=126719 msg='op=PAM:session_open grantors=pam_loginuid,pam_keyinit,pam_limits,pam_systemd acct="root" exe="/usr/sbin/crond" hostname=? addr=? terminal=cron res=success'
```      

用户已成功打开root会话。

```bash
type=USER_ACCT msg=audit(1561703228.361:3029): pid=927417 uid=0 auid=4294967295 ses=4294967295 msg='op=PAM:accounting grantors=pam_unix,pam_localuser acct="root" exe="/usr/sbin/sshd" hostname=192.168.1.43 addr=192.168.1.43 terminal=ssh res=success'
```       

PAM`已成功确定用户是否有权登录。

```bash
type=USER_END msg=audit(1561701544.208:2956): pid=772273 uid=0 auid=0 ses=256 msg='op=login id=0 exe="/usr/sbin/sshd" hostname=192.168.1.43 addr=192.168.1.43 terminal=ssh res=success'
```       
```bash
type=USER_END msg=audit(1562164261.729:11323793): pid=27344 uid=0 auid=0 ses=126719 msg='op=PAM:session_close grantors=pam_loginuid,pam_keyinit,pam_limits,pam_systemd acct="root" exe="/usr/sbin/crond" hostname=? addr=? terminal=cron res=success'
```

当用户空间会话被终止时被触发。

```bash
type=USER_LOGOUT msg=audit(1561701544.208:2957): pid=772273 uid=0 auid=0 ses=256 msg='op=login id=0 exe="/usr/sbin/sshd" hostname=192.168.1.43 addr=192.168.1.43 terminal=ssh res=success'
```

当用户注销时被触发。

```bash
type=USER_AUTH msg=audit(1561703228.361:3028): pid=927417 uid=0 auid=4294967295 ses=4294967295 msg='op=PAM:authentication grantors=pam_unix acct="root" exe="/usr/sbin/sshd" hostname=192.168.1.43 addr=192.168.1.43 terminal=ssh res=success'
```       
```bash
type=USER_AUTH msg=audit(1562164260.321:11323786): pid=27340 uid=0 auid=4294967295 ses=4294967295 msg='op=PAM:authentication grantors=? acct="root" exe="/usr/sbin/sshd" hostname=118.89.25.23 addr=118.89.25.23 terminal=ssh res=failed'
```

只有在使用用户名/密码组合时才会出现“USER_AUTH”记录类型

当用户空间的身份验证尝试被检测到时被触发。事件记录UID为0的用户尝试失败，以`root`用户身份登录。`uid = 0`表示进程以root帐户权限运行,`auid = 4294967295`表示审计服务不知道该进程（可能在审计服务启动之前启动）

---------------------------------

Kerberos 预身份验证失败。   ----->身份验证失败---->任务类型：`Kerberos Authentication Service` ----->事件ID：4771  (该事件不一定触发)

帐户信息:

    安全 ID:      FS\Administrator
    
    帐户名称:       Administrator
    
服务信息:

    服务名称:       krbtgt/FS
    
网络信息:

    客户端地址:      ::1
    
    客户端端口:      0
    
附加信息:

    票证选项:       0x40810010
    
    失败代码:       0x18
    
    预身份验证类型:    2
    
证书信息:

    证书颁发者名称:        
    
    证书序列号:  
    
    证书指纹:       
    
仅当证书用于预身份验证时才会提供证书信息。

预身份验证类型、票证选项和失败代码在 RFC 4120 中定义。

如果票证在传递过程中格式错误或者损坏因而无法解密，则可能无法提供此事件中的很多字段。"

    ------->Kerberos 预身份验证失败。
    
Kerberos:是一种计算机网络授权协议，用来在非安全网络中，对个人通信以安全的手段进行身份认证。

帐户登录失败。     ----->登录失败---->任务类型：Logon ----->事件ID：4625

使用者:

    安全 ID:      SYSTEM
    
    帐户名:        JIANGPENG816B$
    
    帐户域:        FS
    
    登录 ID:      0x3E7
    
登录类型:            2       ----->如果类型为7，则说明是解锁后登录。      

登录失败的帐户:

    安全 ID:      NULL SID
    
    帐户名:        Administrator
    
    帐户域:        FS
    
失败信息:

    失败原因:       未知用户名或密码错误。
    
    状态:         0xC000006D
    
    子状态:        0xC000006A
    
进程信息:

    调用方进程 ID:   0x4e0
    
    调用方进程名: C:\Windows\System32\svchost.exe
    
网络信息:

    工作站名:   JIANGPENG816B
    
    源网络地址:  127.0.0.1
    
    源端口:        0
    
详细身份验证信息:

    登录进程:       User32 
    
    身份验证数据包:    Negotiate
    
    传递服务:   -
    
    数据包名(仅限 NTLM):  -
    
    密钥长度:       0
    
登录请求失败时在尝试访问的计算机上生成此事件。

“使用者”字段指明本地系统上请求登录的帐户。这通常是一个服务(例如 Server 服务)或本地进程(例如 Winlogon.exe 或 Services.exe)。

“登录类型”字段指明发生的登录的种类。最常见的类型是 2 (交互式)和 3 (网络)。

“进程信息”字段表明系统上的哪个帐户和进程请求了登录。

“网络信息”字段指明远程登录请求来自哪里。“工作站名”并非总是可用，而且在某些情况下可能会留为空白。

“身份验证信息”字段提供关于此特定登录请求的详细信息。

    -“传递服务”指明哪些直接服务参与了此登录请求。
    
    -“数据包名”指明在 NTLM 协议之间使用了哪些子协议。
    
    -“密钥长度”指明生成的会话密钥的长度。如果没有请求会话密钥，则此字段为 0。

试图使用显式凭据登录。  ----->有人在尝试登录---->任务类型：Logon ----->事件ID：4648

使用者:

    安全 ID:      SYSTEM
    
    帐户名:        JIANGPENG816B$
    
    帐户域:        FS
    
    登录 ID:      0x3E7
    
    登录 GUID:        {00000000-0000-0000-0000-000000000000}
    
使用了哪个帐户的凭据:

    帐户名:        Administrator
    
    帐户域:        FS
    
    登录 GUID:        {00000000-0000-0000-0000-000000000000}
    
目标服务器:

    目标服务器名: localhost
    
    附加信息:   localhost
    
进程信息:

    进程 ID:      0x4e0
    
    进程名:        C:\Windows\System32\svchost.exe
    
网络信息:

    网络地址:   127.0.0.1
    
    端口:         0
    
在进程尝试通过显式指定帐户的凭据来登录该帐户时生成此事件。这通常发生在批量类型的配置中(例如计划任务) 或者使用 RUNAS 命令时。"

已成功登录帐户。    ----->登录成功---->任务类型：Logon ----->事件ID：4624

使用者:

    安全 ID:      NULL SID
    
    帐户名称:       -
    
    帐户域:        -
    
    登录 ID:      0x0
    
登录信息:

    登录类型:       2 ----->如果类型为7，则说明是解锁后登录。
    
    受限制的管理员模式:  -
    
    虚拟帐户:       否
    
    提升的令牌:      是
    
模拟级别:        委派

新登录:

    安全 ID:      SYSTEM
    
    帐户名称:       JIANGPENG816B$
    
    帐户域:        FS.COM
    
    登录 ID:      0x16E561
    
    链接的登录 ID:       0x0
    
    网络帐户名称: -
    
    网络帐户域:  -
    
    登录 GUID:        {da3595b4-ad21-ce1f-a2bb-96102f0244ee}
    
进程信息:

    进程 ID:      0x0
    
    进程名称:       -
    
网络信息:

    工作站名称:  -
    
    源网络地址:  fe80::4526:dfcb:5ca8:c20e
    
    源端口:        49796
    
详细的身份验证信息:

    登录进程:       Kerberos
    
    身份验证数据包:    Kerberos
    
    传递的服务:  -
    
    数据包名(仅限 NTLM):  -
    
    密钥长度:       0
    
创建登录会话时，将在被访问的计算机上生成此事件。

“使用者”字段指示本地系统上请求登录的帐户。这通常是一个服务(例如 Server 服务)或本地进程(例如 Winlogon.exe 或 Services.exe)。

“登录类型”字段指示发生的登录类型。最常见的类型是 2 (交互式)和 3 (网络)。

“新登录”字段指示新登录是为哪个帐户创建的，即已登录的帐户。

“网络”字段指示远程登录请求源自哪里。“工作站名称”并非始终可用，并且在某些情况下可能会留空。

“模拟级别”字段指示登录会话中的进程可以模拟到的程度。

“身份验证信息”字段提供有关此特定登录请求的详细信息。

    - “登录 GUID”是可用于将此事件与 KDC 事件关联起来的唯一标识符。
    
    -“传递的服务”指示哪些中间服务参与了此登录请求。
    
    -“数据包名”指示在 NTLM 协议中使用了哪些子协议。
    
    -“密钥长度”指示生成的会话密钥的长度。如果没有请求会话密钥，则此字段将为 0。"

----------------------->成功的登录，从日志分析来看至少会有2个事件发生，分别为ID4648、 4624

已锁定工作站。  ----->锁屏--> 任务类型：Other Logon/Logoff Events 事件ID：4800

使用者:

    安全 ID:      FS\Administrator
    
    帐户名:        Administrator
    
    帐户域:        FS
    
    登录 ID:      0x3668A
    
    会话 ID:  1

已解除工作站锁定。  ----->解除锁屏--> 任务类型：Other Logon/Logoff Events  事件ID：4801

使用者:

    安全 ID:      FS\Administrator
    
    帐户名:        Administrator
    
    帐户域:        FS
    
    登录 ID:      0x3668A
    
    会话 ID:  1

用户启动的注销:     ----->用户启动注销任务--> 任务类型：Logoff  事件ID：4647

使用者:

    安全 ID:      FS\Administrator
    
    帐户名称:       Administrator
    
    帐户域:        FS
    
    登录 ID:      0x3668A
    
启动注销时，将生成此事件。以后不会再发生用户启动的活动。此事件可以解释为注销事件。"

已注销帐户。  ----->注销用户--> 任务类型：Logoff  事件ID：4634

使用者:

    安全 ID:      FS\Administrator
    
    帐户名:        Administrator
    
    帐户域:        FS
    
    登录 ID:      0x18A6C7
    
登录类型:            7

在登录会话被破坏时生成此事件。可以使用登录 ID 值将它和一个登录事件准确关联起来。在同一台计算机上重新启动的区间中，登录 ID 是唯一的。"

事件日志服务已关闭。  ----->服务器正在准备关机--> 任务类型：服务关闭  事件ID：1100

Windows 正在启动。    ----->服务器已开启--> 任务类型：Security State Change  事件ID：4608

当 LSASS.EXE 启动且审核子系统进行初始化时，会记录此事件。"

关于登录类型的说明：
- 登录类型2：交互式登录（Interactive） 
最常见的登录方式，所谓交互式登录就是指用户在计算机的控制台上进行的登录，也就是在本地键盘上进行的登录，但不要忘记通过KVM登录仍然属于交互式登录，虽然它是基于网络的。 

- 登录类型3：网络（Network） 
当你从网络的上访问一台计算机时在大多数情况下Windows记为类型3，最常见的情况就是连接到共享文件夹或者共享打印机时。另外大多数情况下通过网络登录IIS时也被记为这种类型，但基本验证方式的IIS登录是个例外，它将被记为类型8，下面将讲述。 

- 登录类型4：批处理（Batch） 
当Windows运行一个计划任务时，“计划任务服务”将为这个任务首先创建一个新的登录会话以便它能在此计划任务所配置的用户账户下运行，当这种登录出现时，Windows在日志中记为类型4，对于其它类型的工作任务系统，依赖于它的设计，也可以在开始工作时产生类型4的登录事件，类型4登录通常表明某计划任务启动，但也可能是一个恶意用户通过计划任务来猜测用户密码，这种尝试将产生一个类型4的登录失败事件，但是这种失败登录也可能是由于计划任务的用户密码没能同步更改造成的，比如用户密码更改了，而忘记了在计划任务中进行更改。 

- 登录类型5：服务（Service） 
与计划任务类似，每种服务都被配置在某个特定的用户账户下运行，当一个服务开始时，Windows首先为这个特定的用户创建一个登录会话，这将被记为类型5，失败的类型5通常表明用户的密码已变而这里没得到更新，当然这也可能是由恶意用户的密码猜测引起的，但是这种可能性比较小，因为创建一个新的服务或编辑一个已存在的服务默认情况下都要求是管理员或serversoperators身份，而这种身份的恶意用户，已经有足够的能力来干他的坏事了，已经用不着费力来猜测服务密码了。 

- 登录类型7：解锁（Unlock） 
你可能希望当一个用户离开他的计算机时相应的工作站自动开始一个密码保护的屏保，当一个用户回来解锁时，Windows就把这种解锁操作认为是一个类型7的登录，失败的类型7登录表明有人输入了错误的密码或者有人在尝试解锁计算机。 

- 登录类型8：网络明文（NetworkCleartext） 
这种登录表明这是一个像类型3一样的网络登录，但是这种登录的密码在网络上是通过明文传输的，WindowsServer服务是不允许通过明文验证连接到共享文件夹或打印机的，据我所知只有当从一个使用Advapi的ASP脚本登录或者一个用户使用基本验证方式登录IIS才会是这种登录类型。“登录过程”栏都将列出Advapi。

- 登录类型9：新凭证（NewCredentials） 
当你使用带/Netonly参数的RUNAS命令运行一个程序时，RUNAS以本地当前登录用户运行它，但如果这个程序需要连接到网络上的其它计算机时，这时就将以RUNAS命令中指定的用户进行连接，同时Windows将把这种登录记为类型9，如果RUNAS命令没带/Netonly参数，那么这个程序就将以指定的用户运行，但日志中的登录类型是2。 

- 登录类型10：远程交互（RemoteInteractive） 
当你通过终端服务、远程桌面或远程协助访问计算机时，Windows将记为类型10，以便与真正的控制台登录相区别，注意XP之前的版本不支持这种登录类型，比如Windows2000仍然会把终端服务登录记为类型2。 

- 登录类型11：缓存交互（CachedInteractive） 
Windows支持一种称为缓存登录的功能，这种功能对移动用户尤其有利，比如你在自己网络之外以域用户登录而无法登录域控制器时就将使用这种功能，默认情况下，Windows缓存了最近10次交互式域登录的凭证HASH，如果以后当你以一个域用户登录而又没有域控制器可用时，Windows将使用这些HASH来验证你的身份。 

- 登录类型为0的解释暂时没有找到相关说明文档。
