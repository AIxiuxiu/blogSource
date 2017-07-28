---
title: cmder
date: 2017-06-4 18:36:02
categories:
- win
tags:
- cmder
---

# cmder
## 简介
[Cmder](http://cmder.net/)是一款Windows环境下非常简洁美观易用的 `cmd` 替代者,因为它是即压即用的存在，所以点击根目录下的 `Cmder.exe` 即可运行。
下载的时候，有两个版本，分别是 `mini` 与 `full` 版；唯一的差别在于有没有内建 `msysgit` 工具，这是 `Git for Windows` 的标准配备；全安装版 Cmder自带了 `msysgit`,除了 `git` 本身这个命令之外, 里面可以使用大量的 `linux` 命令；比如 `grep`, `curl`, `tar`, `unzip`, `ssh`, `bash`, `perl` 等。

<!-- more -->
## 配置 Cmder
### 启动 Cmder
1.把 `Cmder` 加到环境变量，把 `Cmder.exe` 存放的目录添加到系统环境变量 `Path`；加完之后, `Win+r` 一下输入 `cmder`,即可使用。
2.添加 `Cmder` 到右键菜单，以管理员权限打开cmder终端输入以下语句回车即可: `Cmder.exe /REGISTER ALL`。
3.使用`AutoHotKey`热键，在`ahk`文件中添加如下代码，则使用 `Alt+c` 来打开 `cmder`	,但有些新增命令无法使用，如 `node` `npm` 等。

``` tex
!c:: run, D:\**\cmder_mini\Cmder.exe
return
```

### 修改命令提示符号
`Cmder` 预设的命列列提示符号是 `λ`;如果用着不习惯，可以将这个字元改成 `Mac/Linux` 环境下常见的 `$` 符号，具体操作如下：
打开 `cmder` 安装目录下的 `\vendor\clink.lua` 文件，将里面的 `λ` 替换为 `$`。但在使用 `powerShell` 时需要另行设置，
将 `\vendor\profile.ps1` 文件中的 `λ` 替换为 `$` 。

### 中文乱码
在设置中添加语言环境，`win+alt+p` 打开设置面板，找到 `Startup -> Envrioment` 选项
在下面的文本框里添加一行 `set LANG=zh_CN.UTF-8`，然后重启。

### 样式
背景的透明度,找到 `Features -> Transparency` 选项就可调节透明度。
`Features -> Colors` 可以调节颜色，`schemes` 可以选择主题。

### 别名
自定义 `aliases` 打开Cmder目录下的 `config` 文件夹，里面的 `user-aliases` 文件就是我们可以配置的别名文件。像下面几个。

``` tex
..=cd ..  //输入..返回上一级文件夹
gc=git commit -m $1  //git提交
sbl="D:\Program Files\Sublime Text 3\sublime_text.exe" $1 -new_console:s50H  //在窗口右边50%横向打开sublime
```

但 `user-aliase` 中的别名只能在 `cmd` 下使用，在使用 `powershell` 时需要编辑  `\vendor\profile.ps1`  文件,如

``` tex
Set-Alias sbl "C:\Program Files\Sublime Text 3\sublime_text.exe"

function Git-Status { git status }
Set-Alias gs Git-Status
```

### 快捷键

- 打开设置面板  														=> Win+Alt+P 
- 打开新的页签  														=> Ctrl+T 
- 关闭页签 																=> Ctrl+W 
- 切换页签 																=> Ctrl+Tab 
- 关闭所有页签 														=> Alt+F4 
- 快速打开一个 CMD 												=> Shift+Alt+1 
- 快速打开一个 PowerShell 									=> Shift+Alt+2 
- 快速打开一个 PowerShell(系统管理员权限) 		=> Shift+Alt+2 
- 快速切换到第 1 个页签 										=> Ctrl+1 
- 快速切换到第 n 个页签(n值无上限) 					=> Ctrl+n 
- 历史命令搜索 														=> Ctr+r 
- 全屏 																	=> Alt+Enter

## Chocolatey 软件包管理
[Chocolatey](https://chocolatey.org/packages) 是用命令行来安装应用程序的个包管理工具。

### 安装 chocolatey
使用cmd，运行如下命令即可

``` mel
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

### choco 安装软件
安装软件命令 `choco install softwareName`, 短写是 `cinst softwareName`
可安装的应用程序，默认安装在 `C:\Program Files\`，可以参见其 [Package](https://chocolatey.org/packages) 列表

以下是 `window` 下开发常用的开发环境应用:

``` cmake
choco install autohotkey.portable    #安装 AutoHotkey (Portable)
choco install nodejs.install  #安装 node
choco install git.install     #安装 git
choco install ruby            #安装 ruby
choco install python          #安装 python
choco install jdk8            #安装 JDK8
choco install googlechrome    #安装 Chrome
choco install google-chrome-x64 #Google Chrome (64-bit only)
choco install firefox         #安装 firefox
choco install notepadplusplus.install #安装 notepad++
choco install Atom                    #安装 Atom
choco install SublimeText3            #安装 SublimeText3
```

## 参考链接

[cmder 一个比cmd强n倍的神器](http://www.jianshu.com/p/7a706c0a3411)
[在 windows 下安装 Cmder](https://vxhly.github.io/2017/04/08/install-cmder-on-windows/)
[chocolatey](https://chocolatey.org/packages)
[cmder](http://cmder.net/)
