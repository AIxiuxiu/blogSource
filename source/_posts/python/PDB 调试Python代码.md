---
title: PDB 调试Python代码
date: 2017-08-02 12:31:34
categories:
- python
tags:
- Python
---
# PDB 调试Python代码
##Sublime Text
使用 `sublime` 开发 `Python` 需要插件 `Anaconda` (Python代码自动补全、PEP8格式化) 和 `SublimeREPL` (Python代码交互式解释器)

Anaconda 用户配置

```json
{
    //忽略各种空格不对, 超过80字, import的函数没有使用的提醒
    "pep8_ignore": ["E501", "W292", "E303", "W391", "E225", "E302", "W293", "E402"],
    "pyflakes_explicit_ignore":
    [
        "UnusedImport"
    ],
    //保存文件后自动pep8格式化
    "auto_formatting": true,
    //库函数的提示
    "enable_signatures_tooltip": true,
    "merge_signatures_and_doc":true,
    //禁止代码分析检查
    "anaconda_linting": false,
}
```
<!-- more -->
SublimeREPL 快捷键设置
根据 Preferences-->Browse Packages-->SublimeREPL-->config-->Python-->Default.sublime-commands 文件在**按键绑定-用户**中添加快捷键    

```json
[
  {
      //按F5执行Python编译
      "keys":["f5"],
      "caption": "SublimeREPL: Python - RUN current file",
      "command": "run_existing_window_command", "args":
      {
          "id": "repl_python_run",
          "file": "config/Python/Main.sublime-menu"
      }
  },
  {
      //按F6打开Python交互式窗口
      "keys":["f6"],
      "caption": "SublimeREPL: Python",
      "command": "run_existing_window_command", "args":
      {
          "id": "repl_python",
          "file": "config/Python/Main.sublime-menu"
      }
  },
  {
      //按F7执行当前Python代码片段编译
      "keys":["f7"],
      "caption": "SublimeREPL: Python - PDB current file",
      "command": "run_existing_window_command", "args":
      {
          "id": "repl_python_pdb",
          "file": "config/Python/Main.sublime-menu"
      }
  },
]
```
`SublimeREPL` 和 `Editor` 各占一个标签，为了方便查看，可点击 视图-->布局-->行：2 即可。

## pdb
pdb 是 python 自带的一个包，为 python 程序提供了一种交互的源代码调试功能，主要特性包括设置断点、单步调试、进入函数调试、查看当前代码、查看栈片段、动态改变变量的值等。pdb 提供了一些常用的调试命令:

|命令	|解释|
| --- | --- |
|break 或 b |设置断点|
|continue 或 c	|继续执行程序|
|list 或 l	 |查看当前行的代码段|
|step 或 s	 |进入函数|
|return 或 r	|执行代码直到从当前函数返回|
|exit 或 q	 |中止并退出|
|next 或 n	 |执行下一行|
|p |打印变量的值|
|help	|帮助|

基本用法
导入 `pdb`，添加 `pdb.set_trace()`

```
import pdb
def sum(x, y):
    return x + y
a = 1
pdb.set_trace()
b = 2
c = sum(a, b)
print(c)
```
F5 运行 会在代码 `b = 2` 处停下，如下

```
> /Users/youname/python/test.py(8)<module>()
-> b = 2
(Pdb) 
```
n执行下一条语句

```
> /Users/youname/python/test.py(9)<module>()
-> print(a + b)
(Pdb) 
```
备注：再按下回车会执行之前的命令语句。

`p` 命令打印变量

```
(Pdb) p a
1
```

`l` 查看当前代码所调试在的位置

```
(Pdb) l
  7  	def sum(x, y):
  8  	    return x + y
  9  	a = 1
 10  	pdb.set_trace()
 11  	b = 2
 12  ->	c = sum(a, b)
 13  	print(c)
[EOF]
```
箭头所指向的位置就是当前调试的位置。

进入函数
输入 `n` 会直接执行函数的不会进入函数内部，在调试有函数语句的地方直接输入 `s`,可进入函数进行单步调试。输入 `r` 执行到当前函数返回，在执行 `r` 或 `n` 退出当前函数

```
(Pdb) s
--Call--
> /Users/xayq-fanxl/anna/python/first.py(7)sum()
-> def sum(x, y):
(Pdb) r
--Return--
> /Users/xayq-fanxl/anna/python/first.py(8)sum()->3
-> return x + y
(Pdb) 
> /Users/xayq-fanxl/anna/python/first.py(13)<module>()
-> print(c)
```

调试中改变变量的值
!变量名可以改变调试的变量值，如下将 `c` 的值给变，正常运行打印结果为3，改变值之后打印为修改的结果。

```
(Pdb) !c = 4
(Pdb) n
4
```

退出调试，使用 `quit` 或者 `q` 可以退出当前的 Pdb，但是这会以一种非常粗鲁的方式退出程序，其结果是直接 crash。

```
(Pdb) q
Traceback (most recent call last):
  File "test.py", line 11, in <module>
    b = 2
  File "test.py", line 11, in <module>
    b = 2
  File "/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/bdb.py", line 49, in trace_dispatch
    return self.dispatch_line(frame)
  File "/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/bdb.py", line 68, in dispatch_line
    if self.quitting: raise BdbQuit
bdb.BdbQuit

***Repl Closed***
```

停止调试继续执行程序

```
(Pdb) c
3

***Repl Closed***
```
