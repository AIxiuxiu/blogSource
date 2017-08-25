---
title: Screen 命令
date: 2017-07-12 12:31:34
categories:
- other
tags:
- screen
---
# Screen 命令
## screen
`screen` 指令是一般 `UNIX/Linux` 使用者常会使用的终端管理程序，它可以让一个终端当成好几个來使用，对于以 `SSH` 连接到服务器上工作的人会很有用。

通常一个终端（terminal 或 console）只能开启一个互动式的 `shell` 來使用，而借助 `screen` 的帮助，使用者可以在一个终端下，同时开启多个互动式的 `shell`，除了自己使用之外，还可以让 `session` 分享给不同的使用者，或是让执行中的 `session` 暂时分离（detach），随后再重新连接（attach）即可继续操作。
<!-- more -->
## 安裝
某些 `Linux` 发行版可能本身就已经内建 `screen` 这个指令了，但如果你所使用的 `Linux` 系统沒有安裝，通常也都可以直接安裝编译好的版本，因为 `screen` 是一个很常用的指令之一，通常安裝起來比较简单
在 `Debian` 或 `Ubuntu Linux` 中若要安装 `screen` 可以使用 `apt-get` 來安裝：

```shell
sudo apt-get install screen
```

而 `Red Hat` 系列的 `Linux`（如 Fedora 等）则可使用 `yum`：

```shell
yum install screen
```

mac默认已安装 `screen` ,如果没有安装可使用 `Homebrew` 安装

```shell
brew install screen
```

## 使用
若要使用 screen 这个工具，就直接在终端执行它：

```shell
screen
```
这时候会出现一些信息，按下空格或回车键跳过之后，就可以看到一个新的 `shell`。执行 `exit` 退出当前窗口。进入 `screen` 所建立的新 `shell` 之后，看起來跟原本的界面一样，但是它其实是一个新的 `shell`，而在离开 `screen` 环境之后，就会回到原本的 `shell` 中。

`screen` 的快捷键是使用 `ctrl + a` 来实现，如help快捷键为 ` ？` ，需要按住`control + a` 键，然后松开按 `？` (也就是 `shift + ？`) 来打开帮助界面，如下
![help](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-08-24 下午5.02.11.png)![help1](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-08-24 下午5.03.47.png)

分离（Detach）与重新连接（Re-attach）
使用 `screen` 或 `screen -S name` (指定名字) 进入 screen 的环境，来执行需要进行的操作

如执行一个 `ping` 指令来测试网络品质。

```shell
ping aixiuxiu.github.io
```

接着按下 Ctrl + a 后，再按下 d 键（detach），这时候 screen 就会被分离，然后出现类似下面的内容

```shell
[detached]
```

这时候表示这个 screen 已经被分离了，就像是放进后台中执行一样，而这个时候你甚至可以把 终端关闭并不会影响之前 `ping` 命令的执行。

之后若要重新连接上这个 screen，可以执行

```
screen -r
```

这样就会回到之前的 `screen` 环境中，这时候你也可以看到 `ping` 指令还在执行，并沒有受到影响。

同时使用多个 `screen` 工作环境,原來的 `shell` 中再执行一次 `screen` 指令或使用 `^A + c` 来打开新的 `screen` 环境。

使用 `screen -ls` 來列出目前所有的 screen 工作环境

```shell
There are screens on:
        11826.ttys000.bogon     (Attached)
        23405.ttys003.bogon     (Attached)
2 Sockets in /var/folders/vb/lcw1_v5s2h726yfzc0l2bkpr0000gn/T/.screen.
```

若要连接第一个 `11826.ttys000.bogon` screen工作环境，则在 -r 参数之后加上这个名称或前面的数字甚至前面数字区别的数字即可：

```
screen -r 11826.ttys000.bogon
screen -r 11826.ttys000.bogon
screen -r 1
```

如果由于某种原因其中一个会话死掉了（例如人为杀掉该会话），这时 `screen -ls` 会显示该会话为 `dead` 状态。使用 `screen -wipe` 命令清除该会话。

### 常用命令
* `screen -S name` 新建一个叫name的session
* `screen -ls` 列出当前所有的session
* `screen -r name` 回到name这个session
* `screen -d name` 远程detach某个session
* `screen -d -r name` 结束当前session并回到name这个session
* `screen -wipe` 删除已经无法使用的screen作业

### 常用快捷键
* `^A + ?` 显示所有键绑定信息
* `^A + c` 创建新的screen环境
* `^A + d` 暂时断开窗口
* `^A + k` 杀死当前窗口

切换窗口：

* `^A + w` 列出所有窗口
* `^A + n` 切换上一个窗口
* `^A + n` 切换下一个窗口
* `^A + 0-9` 如果窗口太多可以通过数字切换窗口

## 参考链接
[使用 Screen 指令操控 UNIX/Linux 終端機的教學與範例](https://blog.gtwang.org/linux/screen-command-examples-to-manage-linux-terminals/)
[linux screen 命令详解](https://www.cnblogs.com/mchina/archive/2013/01/30/2880680.html)
