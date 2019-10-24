---
title: "解决Linux系统中出现You have new mail in /var/spool/mail/root的问题"
layout: post
date: 2019-10-24 17:13
headerImage: false
tag:
- mail
- linux
category: blog
author: 夏潇熙
description: 解决Linux系统中出现You have new mail in /var/spool/mail/root的问题
---

依次运行以下命令：

```bash
echo "unset MAILCHECK">> /etc/profile
source /etc/profile
ls -lth /var/spool/mail/
cat /dev/null > /var/spool/mail/root
```

完成。
