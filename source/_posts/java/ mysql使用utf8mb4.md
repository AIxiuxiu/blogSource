---
title: mysql使用utf8mb4
date: 2017-08-02 12:31:34
categories:
- java
tags:
- mysql
---
# mysql使用utf8mb4
最近开发微信项目时遇到了*emoji*表情符号如何被 **mysql** 支持的问题，原因是*emoji*表情符号为**4个字节**的字符，而 `utf8` 字符集只支持**1-3个字节**的字符，导致无法写入数据库。所以只能修改MySQL数据库字符集， 把数据库字符集从 `utf8` 修改为支持**1-4个字节**字符的`utf8mb4`。
<!-- more -->
## utf8 与 utf8mb4
MySQL在 5.5.3 之后增加了 `utf8mb4` 字符编码，`mb4` 即 `most bytes 4`。简单说 `utf8mb4` 是 `utf8` 的超集并完全兼容 `utf8`，能够用四个字节存储更多的字符。
 
> 但抛开数据库，标准的 UTF-8 字符集编码是可以用 1~4 个字节去编码21位字符，这几乎包含了是世界上所有能看见的语言了。然而在MySQL里实现的utf8最长使用3个字节，也就是只支持到了 Unicode 中的 基本多文本平面（U+0000至U+FFFF），包含了控制符、拉丁文，中、日、韩等绝大多数国际字符，但并不是所有，最常见的就算现在手机端常用的表情字符 emoji和一些不常用的汉字，如 “墅” ，这些需要四个字节才能编码出来。

也就是当你的数据库里要求能够存入这些表情或宽字符时，可以把字段定义为 `utf8mb4`，同时要注意连接字符集也要设置为 `utf8mb4`，否则在 严格模式 下会出现 `Incorrect string value: /xF0/xA1/x8B/xBE/xE5/xA2… for column 'name'` 这样的错误，非严格模式下此后的数据会被截断。

## utf8mb4_unicode_ci 与 utf8mb4_general_ci
字符除了需要存储，还需要排序或比较大小，涉及到与编码字符集对应的 排序字符集（collation）。`ut8mb4` 对应的排序字符集常用的有 `utf8mb4_unicode_ci`、`utf8mb4_general_ci`，到底采用哪个在 `stackoverflow` 上有个讨论，[What’s the difference between utf8_general_ci and utf8_unicode_ci](https://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci)

主要从排序准确性和性能两方面看：

* 准确性     
    `utf8mb4_unicode_ci` 是基于标准的 `Unicode` 来排序和比较，能够在各种语言之间精确排序
    `utf8mb4_general_ci` 没有实现 `Unicode` 排序规则，在遇到某些特殊语言或字符是，排序结果可能不是所期望的。
    **但是在绝大多数情况下，这种特殊字符的顺序一定要那么精确吗**。比如 `Unicode` 把`ß`、`Œ` 当成 `ss` 和 `OE` 来看；而 `general` 会把它们当成 `s`、`e`，再如 `ÀÁÅåāă` 各自都与 `A` 相等。
* 性能     
    `utf8mb4_general_ci` 在比较和排序的时候更快
    `utf8mb4_unicode_ci` 在特殊情况下，`Unicode` 排序规则为了能够处理特殊字符的情况，实现了略微复杂的排序算法。
    **但是在绝大多数情况下，不会发生此类复杂比较**。`general` 理论上比 `Unicode` 可能快些，但相比现在的CPU来说，它远远不足以成为考虑性能的因素，索引涉及、SQL设计才是。 我个人推荐是 `utf8mb4_unicode_ci`。

## utf8转为utf8mb4
一旦你决定使用 `utf8mb4`，强烈建议你要修改服务端 `character-set-server=utf8mb4`，不同的语言对它的处理方法不一样，c++, php, python可以设置 `character-set`，但java驱动依赖于 `character-set-server` 选项。下面是更改步骤

首先我们修改配置文件my.cnf参数

```
[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
skip-character-set-client-handshake = true
init_connect = 'SET NAMES utf8mb4'
```
> 为了实现在连接到mysql后，使用的是 `utf8mb4` 字符集，就在 `mysqld` 配置中配置了 `init_connect='SET NAMES utf8mb4'` 表示初始化连接都设置为 `utf8mb4` 字符集，再配置一个 `skip-character-set-client-handshake = true` 忽略客户端字符集设置，不论客户端是何种字符集，都按照 `init_connect` 中的设置进行使用，这样就满足了应用的需求。

更改数据库，表和列的字符集和归类属性以使用utf8mb4代替utf8。**要先备份数据**

```mysql
# 将数据库转换为utf8mb4
ALTER DATABASE database_name CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
# 将已经建好的表也转换成utf8mb4 
ALTER TABLE table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
# 将需要使用emoji的字段设置类型为utf8mb4
ALTER TABLE table_name CHANGE column_name column_name VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

重启数据库服务器使之生效

注：也可以先将数据导出，然后更改数据库编码为utf8mb4，再将数据重新导入，可能因**字段长度**或**索引长度**出现无法导入的问题，后面有写。

## java驱动使用
java语言里面所实现的 `UTF-8` 编码就是**支持4字节**的，所以不需要配置 `mb4` 这样的字眼，但如果从MySQL读写emoji，MySQL驱动版本要在 5.1.13 及以上版本，数据库连接依然是 `characterEncoding=UTF-8` 。
java驱动会自动检测服务端 **character_set_server** 的配置，如果为**utf8mb4**，驱动在建立连接的时候设置 `SET NAMES utf8mb4`。然而其他语言没有依赖于这样的特性。
如果没有设置 `skip-character-set-client-handshake = true` 和
`init_connect = 'SET NAMES utf8mb4'` ，则将characterEncoding参数去掉。

## 使用utf8mb4后需要注意的地方
由于utf8mb4的字节长度是1-4个字节，而utf8的字节长度是1-3个字节，所以会有一些限制的变化。

* 字段长度限制  
    MySQL中的字段类型都有长度限制，比如varchar的最长字节长度是**65535**，所以使用utf8编码的时候，可以指定字段最长为65535/3=**21845**。如果使用utf8mb4编码的话，由于字符最长会占用4个字节，所以字段最长只能为65535/4=**16383**。
* 索引长度限制    
    MySQL中的索引也有长度限制： **767字节**，所以使用utf8编码的的时候，可以指定索引字段最长为**255字节**，但是指定utf8mb4的话，只能索引**191字节**。
* 行长度限制  
    MySQL中的行也有长度限制： **65535**字节，所以当字段编码从utf8变为utf8mb4的时候，可能也会需要缩短部分字段的长度来满足行的长度限制。

## 参考链接
[mysql使用utf8mb4经验吐血总结](http://seanlook.com/2016/10/23/mysql-utf8mb4/)
[How to support full Unicode in MySQL databases](https://mathiasbynens.be/notes/mysql-utf8mb4)
[MySQL支持emoji字符](http://nobodyiam.com/2016/05/29/mysql-emoji/)
[10分钟学会理解和解决MySQL乱码问题](http://cenalulu.github.io/mysql/mysql-mojibake/)


