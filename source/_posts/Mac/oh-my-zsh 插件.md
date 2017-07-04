---
title: oh-my-zsh 插件
date: 2017-06-3 20:30:02
categories:
- mac
tags:
- plugin
- zsh
---
# oh-my-zsh 插件
`oh-my-zsh` 自带很多插件，有兴趣可以看[wiki的插件介绍](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins)

## [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
高亮 `zsh` 的关键字。
### 安装

```
 git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
在 `~/.zshrc` 中的 `plugins=()` 处添加 `zsh-syntax-highlighting`

<!-- more -->

## [autojump](https://github.com/wting/autojump)
目录快速跳转，它会根据你 `cd` 的历史纪录智能判断你想去到哪个目录。也可以用 `oh-my-zsh` 自带的插件 `z`。
### 安装

```
brew install autojump
```

或

```
git clone git://github.com/joelthelion/autojump.git

cd autojump #解压缩后进入目录
./install.py 
```
根据提示在~/.zshrc 或 ~/.bash_profile 中添加

```
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
```

在 `~/.zshrc` 中的 `plugins=()` 处添加 `autojump`

### 使用 
`cd 目录` 之后，使用 `j 文件名` 就可以到文件目录

`j -h` 查看help 
`jc` 打开子目录
`jo` 打开目录的文件管理器
`jco` 打开子目录的文件管理器

`j --stat` 各个目录的权重

`j -i` [权重] // 增加
`j -d` [权重] // 减少

## [git](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git)
`oh-my-zsh` 默认开启的插件，提供了大量 `git` 的 `alias`。

提供**git**的 `aliase` 常用有：

| Alias | Command |
| --- | --- |
| gaa | git add -all |
| gst | git status |
| glola | git log --graph --pretty = format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all |
| gd | git diff |
| gcmsg | git commit -m |
| gpoat | git push origin —all && git push origin —tags |
| gl | git pull |


## [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
这是模仿 `fish shell` 的一个插件，作用基本上就是根据历史记录即时提示。
### 安装

```
git clone git：//github.com/zsh-users/zsh-autosuggestions $ ZSH_CUSTOM / plugins / zsh-autosuggestions
```
添加插件 `plugins=(zsh-autosuggestions)`

### 使用
使用 `→按键` 、 `End` 或 `ctrl+E` 来完成。

更改颜色：
将 [配置文件](https://github.com/zsh-users/zsh-autosuggestions/blob/master/src/config.zsh) 放到 $ZSH_CUSTOM （/Users/user/.oh-my-zsh/custom） 文件下更改 `ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=8'` 颜色为iTerm的偏好设置（写颜色或数字0-15）。
或者直接更改 **Black Bright** 的颜色。
![color](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-06-28 下午5.37.32.png)

## [icdiff](https://github.com/jeffkaufman/icdiff)
### 安装

```
brew install icdiff
```

### 使用
比较两个文件的差异 

```
icdiff <file_1> <file_2>
```

git 用法

```
git difftool --extcmd icdiff
```

精简用法

```
git icdiff
```

如果你想直接git diff的时候直接用icdiff取代

在 `/usr/local/bin/` 创建脚本 `ext-diff` 添加内容：

```
#!/bin/sh
icdiff $2 $5
```

给脚本权限

```
chmod +x ext-diff
```

在git配置文件 `~/.gitconfig` 中添加

```
[diff]
    external = /usr/local/bin/ext-diff
```

更新 `source ~/.gitconfig`

这样就替换git默认的diff，但不建议这样使用。

### 错误

```bash
UnicodeDecodeError: 'ascii' codec can't decode byte 0xc3 in position 32: ordinal not in range(128)
```

根据 [issues36](https://github.com/jeffkaufman/icdiff/issues/36) 可知，需要使用**Python3**，更改 `/usr/local/Cellar/icdiff/1.9.0/bin/icdiff` 文件的 `#!/usr/bin/env python` 为 `#!/usr/bin/env python3`。（已经安装python3）。

## [extract](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/extract)
功能强大的解压插件，所有类型的文件解压一个命令x全搞定，再也不需要去记tar后面到底是哪几个参数了。

直接添加插件 `plugins=(extract)`

## sublime
该插件可以使用命令行打开sublime。
常用命令如下：

```
st          # 直接打开sublime
st file_a   # 用sublime打开文件 file
st dir_a    # 用sublime打开目录 dir
stt         # 在sublime打开当前目录，相当于 st .
```

直接添加插件 `plugins=(sublime)`

## sudo 
它的作用就是连按两下 Esc 键在命令的开头加上或去掉 sudo 关键字。

直接添加插件 `plugins=(sudo)`

## 参考链接
[一些命令行效率工具](http://wulfric.me/2015/08/zsh/)
[我常用的 oh-my-zsh 插件](http://blog.yxjxx.com/2016/01/22/Most-useful-oh-my-zsh-plugins.html)
[issues14](https://github.com/jeffkaufman/icdiff/issues/14)
[issues36](https://github.com/jeffkaufman/icdiff/issues/36)


