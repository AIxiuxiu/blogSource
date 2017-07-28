---
title: tomcat
date: 2017-06-28 10:31:34
categories:
- java
tags:
- tomcat
---

# tomcat
## 安装
[下载地址](http://tomcat.apache.org)
将 `tomcat` 文件夹复制到 `/Library` 目录下,然后修改权限

```shell
sudo chmod 755 /Library/tomcat
```

添加环境变量

```
export PATH=$PATH:/Users/yourname/Library/tomcat/bin
```

验证tomcat是否安装成功
执行 `startup.sh` 命令启动 `tomcat`

```
startup.sh
```

<!-- more -->

打开 [http://localhost:8080](http://localhost:8080) 验证tomcat是否安装成功
![屏幕快照 2017-07-27 下午4.23.05](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-07-27 下午4.23.05.png)

##配置Tomcat启动脚本

Tomcat的目录层次结构
使用文本编辑器添加以下代码：

```sh
#!/bin/bash

case $1 in
start)
sh /Users/yourname/Library/tomcat/bin/startup.sh
;;
stop)
sh /Users/yourname/Library/tomcat/bin/shutdown.sh
;;
restart)
sh /Users/yourname/Library/tomcat/bin/shutdown.sh
sh /Users/yourname/Library/tomcat/bin/startup.sh
;;
*)
echo “Usage: start|stop|restart”
;;
esac

exit 0
```

`/Users/yourname/Library/tomcat/bin` 要根据tomcat实际的安装路径来写

将文件保存为 `tomcat` 小写并不带后缀，存放到 `/usr/local/bin` 或 `/usr/bin` 。赋予文件执行权限：

```
chmod 777 tomcat
```

之后便可以在终端中简单地输入 `tomcat start` 和 `tomcat stop` 启用和关闭tomcat了。
快捷命令如下：

```
tomcat start 
tomcat stop
tomcat restart 
```

## Tomcat 目录的结构
bin:  存放启动和关闭tomcat的脚本文件

conf：存放tomcat服务器的各种配置文件

lib:  存放tomcat服务器支撑的jar包

logs: 存放tomcat的日志文件

temp: 存放tomcat运行时产生的临时文件

webapps: web应用虽在目录，即供外界访问的web资源的存放目录

work: tomcat的工作目录

主要文件介绍
bin 
> catalina.sh 用于启动和关闭tomcat服务器
> configtest.sh 用于检查配置文件
> startup.sh 启动tomcat脚本
> shutdown.sh 关闭tomcat脚本

conf
> server.xml tomcat 的全局配置文件
> web.xml 为不同的tomcat配置的web应用设置缺省值的文件
> tomcat-users.xml tomcat用户认证的配置文件
> logging.properties tomcat通过自己内部实现的JAVA日志记录器来记录操作相关的日志
> context.xml：所有host的默认配置信息

logs
> localhost_access_log.2017-06-28.txt 访问日志
> localhost.2017-06-28.log 错误和其它日志
> manager.2017-06-28.log 管理日志
> catalina.2017-06-28.log tomcat启动或关闭日志文件

## 部署
### 静态部署
1.直接将 `web` 项目文件件拷贝到 `webapps` 目录中 
将 `war` 包直接拷贝到 `webapps` 目录中，服务器会自动解开这个 `war` 包，并在这个目录下生成一个同名的文件夹
`webapps` 这个默认的应用目录也是可以改变。打开 `tomcat` 的 `conf` 目录下的 `server.xml` 文件，找到下面内容：

```
<Host name="localhost" appBase="webapps" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false">
```
将 `appBase` 修改即可。

2.在 `server.xml` 中指定 
在 `tomcat` 的配置文件中，一个 `Web` 应用就是一个特定的 `Context` ，可以通过在 `server.xml` 中新建 `Context` 里部署一个 `JSP` 应用程序。打开 `server.xml` 文件，在 `Host` 标签内建一个 `Context` ，内容如下。

``` 
<Context path ="/hello" docBase ="/Users/yourname/workspace/hello/WebRoot" debug ="0" privileged ="true">
</Context>
```

参数说明：

> path： 是虚拟路径；
> docBase： 是应用程序的物理路径；
> workDir： 是这个应用的工作目录，存放运行时生成的与这个应用相关的文件；
> debug： 则是设定 debug level,  0 表示提供最少的信息， 9 表示提供最多的信息
> privileged： 设置为 true 的时候，才允许 Tomcat 的 Web 应用使用容器内的 Servlet
> reloadable： 如果为 true ，则 tomcat 会自动检测应用程序的 /WEB-INF/lib 和 /WEB-INF/classes 目录的变化，自动装载新的应用程序，可以在不重起 tomcat 的情况下改变应用程序，实现热部署
> antiResourceLocking 和 antiJARLocking： 热部署是需要配置的参数，默认 false 避免 更新了某个 webapp ，有时候 Tomcat 并不能把旧的 webapp 完全删除，通常会留下 WEB-INF/lib 下的某个 jar 包，必须关闭 Tomcat 才能删除，这就导致自动部署失败。设置为 true ， Tomcat 在运行对应的 webapp 时，会把相应的源文件和 jar 文件复制到一个临时目录里。

3.创建一个Context 文件 
在 `conf\Catalina\localhost` 目录中，新建一个 `xml` 文件，名字不可以随意取，要和 `path` 后的那个名字一致，按照下边这个 `path` 的配置， `xml` 的名字应该就应该是 `hello` （ hello.xml ），该 `xml` 文件的内容为：

```
<Context path ="/hello" docBase ="/Users/yourname/workspace/hello/WebRoot" debug ="0" privileged ="true">
</Context>
```

> 注：删除一个 Web 应用同时也要删除 webapps 下相应的文件夹和 server.xml 中相应的 Context ，还要将 Tomcat 的 conf/catalina/localhost 目录下相应的 xml 文件删除，否则 Tomcat 仍会去配置并加载。

### 动态部署
先了解 `tomcat` 图形管理接口
![屏幕快照 2017-07-27 下午5.03.47](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-07-27 下午5.03.47.png)

`Server Status` 主要用来查看服务器的状态
`Manager App` 主要用来管理应用程序的部署及监控
`Host Manager` 主要用来管理虚拟主机

Manager 的四个管理角色：
> manager-gui - allows access to the HTML GUI and the status pages
> manager-script - allows access to the text interface and the status pages
> manager-jmx - allows access to the JMX proxy and the status pages
> manager-status - allows access to the status pages only

在用户认证的配置文件 `tomcat-users.xml` 文件中添加用户名和密码:

```
<role rolename="tomcat"/>
<role rolename="manager-gui"/>
<role rolename="admin-gui"/>
<user username="tomcat" password="tomcat" roles="tomcat,manager-gui,admin-gui"/>
```

登陆 tomcat 管理控制台： [http://localhost:8080/manager/html](http://localhost:8080/manager/html) ，输入上面配置的用户名和密码后便可管理应用并动态发布。
![屏幕快照 2017-07-27 下午5.08.18](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-07-27 下午5.08.18.png)
在 `Context Path(required)` 中输入 `/yourwebname` ，这代表你的应用的访问地址。
`XML Configration file URL` 中要指定一个 `xml` 文件，比如我们在 /user/yourname/work/ 下建立一个 `hellow.xml` 文件，内容如下： 

```
<Context reloadable="false" />
```

其中 `docBase` 不用写了，因为在下一个文本框中填入。或者更简单点，这个文本框什么都不填，在 WAR or Directory URL: 中键入 /user/yourname/work/hello.war 即可，然后点击 Deploy 按钮，上面就可以看到了 web 应用程序，名字就 `Context Path(required)` 中的名字。
     
或者直接使用下面的 `Select WAR file uploae` 点击浏览选择 `war` 文件，然后点击`Deploy` 即可。   

### 远程部署
首先你要知道远程服务1：IP或域名，2:用户名，密码 3:远程服务器已经装有 `ssh`
登录到远程服务器（一般服务机都会提供ssh协议）：`ssh username@servername`
接下来会提示输入密码：`password`

密码正确后会进入服务提供的根目录中，这时候可以进入到tomact目录中.
关闭tomcat服务要先进入tomcat的bin目录然后输入：`./shutdown.sh`
启动tomcat服务要在bin 目录中输入：`./startup.sh`

如果要查看启动运行日志可以进入logs目录下，然后输入：

```
tail  -f catalina.out 
```

这样就可以查看动态日志, `ctrl＋c` 退出

复制本地文件到服务器

```
scp /path/filename username@servername:/path 
```

复制目录到服务器使用 `scp -r `

复制本地文件到服务器并重新启动 `tomcat` 就完成了部署。

还有一些其它操作：
删除某个文件目录（如果把 `-r` 换成 `-rf` 就不会每次让你一个一个确认了）

```
rm -r 目标文件
```
 
删除某个文件直接（执行删除时会提示是否要删除，输入：y 表示确认）

```
rm 目标文件
```

编辑文件：

```
vim server.xml
```

## 其它
### jdk版本切换
JDK的安装目录(版本号根据情况略有不同)
> JDK 1.6：/Library/Java/JavaVirtualMachines/1.6.0.jdk
> JDK 1.7：/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk
> JDK 1.8：/Library/Java/JavaVirtualMachines/jdk1.8.0_65.jdk

打开 `~/.bash_profile` 文件（zsh 打开` ~/.zshrc` ），添加如下内容

```shell
# 设置 JDK 6
export JAVA_6_HOME=`/usr/libexec/java_home -v 1.6` 
# 设置 JDK 7 
export JAVA_7_HOME=`/usr/libexec/java_home -v 1.7` 
# 设置 JDK 8 
export JAVA_8_HOME=`/usr/libexec/java_home -v 1.8`
 #默认JDK 7 
export JAVA_HOME=$JAVA_7_HOME 
#alias命令动态切换JDK版本 
alias jdk6="export JAVA_HOME=$JAVA_6_HOME” 
alias jdk7="export JAVA_HOME=$JAVA_7_HOME” 
alias jdk8="export JAVA_HOME=$JAVA_8_HOME"
```

### tomcat报错解决
启动失败，在 `catalina.2017-06-28.log` 报如下面的错误

```
org.apache.catalina.core.StandardContext.startInternal Context [/hello] startup failed due to previous errors
```

这个时候此应用就启动失败了，访问会出现404错误。但是日志里面也没有写具体是什么问题导致启动失败，对调试带来了一些困难，下面是解决方法：
在 `tomcat` 的 `conf/loggings.properties` 文件或者该应用的 `WEB-INF/classes` 目录中新建一个 `loggings.properties` 文件，再加上以下两句：

```
org.apache.catalina.core.ContainerBase.[Catalina].level = INFO
org.apache.catalina.core.ContainerBase.[Catalina].handlers = 
java.util.logging.ConsoleHandler
```

之后重启 `tomcat`，这样应用再启动失败后就可以在 `tomcat` 的 `logs/catalina.out` 或者 `logs/localhost_yyyy_mm_dd` 日志文件中找到更加详细的错误信息。

### ssh链接错误
在链接ssh时报如下错误

```
Permanently added (RSA) to the list of known hosts
```

解决给 `known_hosts` 添加权限

```
sudo chmod 600 ~/.ssh/known_hosts
```

## 参考链接
[Tomcat部署Web应用方法总结](http://blog.csdn.net/yangxueyong/article/details/6130065)
[Tomcat系列之服务器的安装与配置以及各组件详解](http://www.jianshu.com/p/3d0fb3476a26)


