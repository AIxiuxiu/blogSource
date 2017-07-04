---
title: iTerm2 + oh my zsh
date: 2017-06-2 18:36:02
categories:
- mac
tags:
- iterm
- zsh
---

# iTerm2 + oh my zsh
## iTerm2
iTerm2 下载地址 [http://www.iterm2.com](http://www.iterm2.com)

### 偏好设置
1. 打开热键 `Preferences - Keys`，勾选 `Hotkey` 中的 `Show/hide iTerm2 with a system-wide hotkey`，然后设定一个热键。如 `Command + .`，然后按 `Command + .` 就可以随时调出或者隐藏 `iTerm2` 了。
2. 颜色主题 `Preferences - Profiles - Colors` 右下角 `Color Presets` 选择主题。或从 [iTerm Themes](http://iterm2colorschemes.com/) 网站中下载第三方主题包，选择主题下的 `import` 操作，把下载的主题导入。
<!-- more -->
3. 终端灰蒙蒙 `Preferences - Profiles - Text - Text Rendering`，将 Draw bold text in bright colors 前面的勾去掉。
4. 复用上个会话的目录 `Preferences - Profiles - Working Directory` 勾选 Reuse previous session’s directory。

### Solarized主题
更改配色方案为 [Solarized](http://ethanschoonover.com/solarized)
直接去主页下载或者使用 Git

```
git clone git://github.com/altercation/solarized.git
```
然后双击 `solarized/iterm2-colors-solarized/` 双击里面的文件，或 `import` 导入，然后再偏好设置中选择相应的主题。
也有terminal的配色 `solarized/osx-terminal.app-colors-solarized` 双击，然后再偏好设置中更改默认主题。

### Vim主题配置
将 `solarized/vim-colors-solarized/colors` 中的 `solarized.vim` 文件复制到 `~/.vim/colors` 目录下。定修改 `.vimrc` 文件。命令如下：


```shell
$ cd solarized/vim-colors-solarized/colors
$ mkdir -p ~/.vim/colors
$ cp solarized.vim ~/.vim/colors/
$ vi ~/.vimrc

syntax enable
set background=dark
colorscheme solarized
```
### item2启动慢
#### 插件
oh-my-zsh加载的插件太多

```
vi ~/.zshrc
plugins=(git autojump zsh-syntax-highlighting)
```

#### 缓存
清理系统日志

```
sudo rm /private/var/log/asl/*.asl
```

打开 item2 时使用 `/usr/bin/login` 命令使用户登录 `login` 命令需要读取 `asl` 文件，当 `asl` 文件很大时就会拖慢启动速度。所以也可以不让 `login` 命令显示上次登录时间：
打开 `iTerm2` 的偏好设置里，在 `Profiles - General - Command` 里选择为 `Command`，然后里边写入  `/usr/bin/login -pfq xxx` 其中 `xxx` 是你的用户名。

#### nvm
`. "$NVM_DIR/nvm.sh"` 会拖慢了终端的启动。
解决方案 [issue#860](https://github.com/creationix/nvm/issues/860) 使用 `--no-use` 和 手动指定默认 `node` 路径来加快执行速度

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  --no-use
export PATH=$HOME/.nvm/versions/node/v8.0.0/bin/:$PATH

```

### iTerm2快捷键
标签

* 新建标签：command + t
* 关闭标签：command + w
* 切换标签：command + 数字 / command + 左右方向键

分屏

* 垂直分屏：command + d
* 水平分屏：command + shift + d
* 
屏幕

* 切换全屏：command + enter
* 清屏1：command + r
* 清屏2：ctrl + l
* 查找：command + f
* 查看历史命令：command + ;
* 查看剪贴板历史：command + shift + h
* 搜索命令历史：ctrl + r

文本编辑

* 交换光标处文本：ctrl + t
* 前进后退：ctrl + f/b (相当于左右方向键)
* 到行首：ctrl + a
* 到行尾：ctrl + e
* 删除当前光标的字符：ctrl + d
* 删除光标之前的字符：ctrl + h
* 删除到文本末尾：ctrl + k（光标后）
* 删除到文本开始：ctrl + u（光标前）
* 删除光标之前的单词：ctrl + w

## zsh
Mac系统自带了 `zsh`,但不是最新版本的 `zsh`，使用 `zsh --version` 查看版本号，需要使用 **5.x** 版本，如果不是可以用 `brew install` 安装最新的 5.x。

```shell
brew install zsh
sudo rm /bin/zsh    # 替换系统自带 zsh
sudo ln -s `brew --prefix zsh`/bin/zsh /bin/zsh
chsh -s /bin/zsh  # 切换系统当前用户的默认 shell 为 zsh
```

安装完毕，`Command + W` 关闭 `iTerm2` 当前窗口，然后按 `Command + .` 重新打开，此时 `shell` 已经换成 `zsh` 了。
切换到 `bash` 系统

```shell
chsh -s /bin/bash
```

## oh-my-zsh 
`oh-my-zsh` 是一套十分强大的 `zsh` 配置方案。具有自动补全参数和自定义配置功能。

### 安装 
`curl` 方式

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
`wget` 方式

```shell
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

### 配置 zshrc

修改 .zshrc(~/.zshrc) 文件

```tex
ZSH_THEME="agnoster"           # 使用 agnoster 主题，颜值高
DEFAULT_USER="你的用户名"       # 增加这一项，可以隐藏掉路径前面那串用户名
plugins=(git autojump zsh-autosuggestions)    # 自己按需把要用的 plugin 写上
```

`.oh-my-zsh/themes` 文件中是所有的主题文件，可任意挑选，Oh My Zsh提供的所有主题[在线预览](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes)。

修改完后，刷新配置文件，然后重新启动 `iTerm` 主题就有了。

```shell
source ~/.zshrc 
```

会有乱码问题，这时还需要安装一个Mac的字体库 [Powerline-patched font](https://github.com/powerline/fonts)

```shell
# clone
git clone https://github.com/powerline/fonts.git
# install
cd fonts
./install.sh
# clean-up a bit
cd ..
rm -rf fonts
```

安装完成之后，在偏好设置中把 `Anti-aliased Font` 和 `Non-ASCII Font` 都改为 `powerline` 的字体。

或者直接安装 `Menlo` 字体补丁
下载并安装

```shell
git clone https://github.com/abertsch/Menlo-for-Powerline.git
```

`Profiles / Text`，把 `Anti-aliased Font` 和 `Non-ASCII Font` 都换成 `Menlo`。

如果使用 `MacVim` 选择相应的字体添加配置到 `.vimrc`: 

```shell
set guifont=Menlo\ for\ Powerline
```

### 命令别名
如更新 `cocoapods` 时  输入  `pod update --verbose --no-repo-update`  
可使用命令别名来简化命令行的输入：

```
alias pod_update='pod update --verbose --no-repo-update'  
```

可以使用alias命令来显示所有命令别名
永久添加，添加到.zshrc中

```text
alias zshconfig="vim ~/.zshrc"
alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g’"
alias pod_update='pod update --verbose --no-repo-update'
alias pod_install='pod install --verbose --no-repo-update'
```
### 其它
#### 补全
`zsh` 的命令补全功能非常强大，可以补齐路径，补齐命令，补齐参数等。
按下 `tab` 键显示出所有待选项后，再按一次 tab 键即进入选择模式，进入选择模式后，按 `tab` 切向下一个选项，按 `shift+tab` 键切向上一个选项，`ctrl+f/b/n/p` 可以向前后左右切换，或使用 上下左右 来切换。

#### 跳转
`zsh` 的目录跳转更为智能，你无需输入 `cd`，直接输入路径即可。`..` 表示后退一级目录，`../../` 表示后退两级，依次类推。（ `...` 的作用和 `../../` 相同）。
输入d，将列出当前 `session` 访问过的所有目录，再按提示的数字即可进入相应目录。

#### 历史记录
历史记录支持受限查找。比如，输入 `git`，再按向上箭头，会搜索用过的所有 `git` 命令。

#### 通配符
`ls *.png` 查找当前目录下所有 `png` 文件，`ls **/*.png` 递归查找。

#### Command 键
按住 `Command` 键:

* 可以拖拽选中的字符串；
* 点击 `url`：调用默认浏览器访问该网址；
* 点击文件夹：在 `finder` 中打开该文件夹；
* 点击文件：调用默认程序打开文件；
* 同时按住 `option` 键，可以以矩形选中，类似于 `vim` 中的 `ctrl v` 操作。

#### 高亮当前鼠标的位置
一个标签页中开的窗口太多，有时候会找不到当前的鼠标，`Command+/` 找到它。

## 参考链接
[iTerm2 & Oh My Zsh：完爆mac终端](http://www.jianshu.com/p/93506ab34949)
[Iterm2+solarized+zsh+oh my zsh](http://www.jianshu.com/p/e45160d0ae27)
[item2启动慢的解决](http://jiaolonghuang.github.io/2016/04/21/item2/)
[让 iTrem 2 + zsh 启动不再等待](https://www.logcg.com/archives/2376.html)
[一些命令行效率工具](http://wulfric.me/2015/08/zsh/)


