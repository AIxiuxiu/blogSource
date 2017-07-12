---
title: git
date: 2017-06-06 21:10:00
categories:
- mac
tags:
- git
---

# Git
## 安装
在 `Mac` 上安装 `Git` 有多种方式。 最简单的方法是安装 `Xcode Command Line Tools`。 `Mavericks （10.9`） 或更高版本的系统中，在 `Terminal` 里尝试首次运行 `git` 命令即可。 如果没有安装过命令行开发者工具，将会提示你安装。

使用图形化的 Git 安装工具,[下载地址](https://git-scm.com/download/mac)

安装完成之后就是开始使用了，`git` 有两种使用方式 **GUI** 和 **命令行**。
使用 `GUI` 可以去[git提供的GUI](https://git-scm.com/downloads/guis)中选择，下面主要介绍命令行的使用方法。
<!-- more -->

## 获取 Git 仓库
有两种取得 Git 项目仓库的方法。 第一种是在现有项目或目录下导入所有文件到 Git 中； 第二种是从一个服务器克隆一个现有的 Git 仓库。

### 在现有目录中初始化仓库
在当前目录执行 `git init`
该命令将创建一个名为 `.git` 的子目录，这个子目录含有你初始化的 `Git` 仓库中所有的必须文件，这些文件是 `Git` 仓库的骨干。 但是，在这个时候，我们仅仅是做了一个初始化的操作，你的项目里的文件还没有被跟踪。
你可通过 `git add` 命令来实现对指定文件的跟踪，然后执行 `git commit` 提交：

```shell
git init
git add -a
git commit -m 'initial project version'
```

也可以新建一个目录，将其初始化为 `Git` 代码库

```shell
git init [project-name]
```

### 克隆现有的仓库
当你执行 git clone 命令的时候，默认配置下远程 Git 仓库中的每一个文件的每一个版本都将被拉取下来。 
克隆仓库的命令格式是 `git clone [url]` 。 比如，要克隆 `Git` 的可链接库 `libgit2`，可以用下面的命令：

```shell
git clone https://github.com/libgit2/libgit2
```

如果想自定义本地仓库的名字可使用：

```shell
git clone https://github.com/libgit2/libgit2 mylibgit
```

## 文件的操作
### 检查当前文件状态
使用 `git status` 查看当前文件状态,使用 `git status -s` 命令或 `git status --short` 命令，你将得到一种更为紧凑的格式输出。

```shell
git status
On branch master
Initial commit
nothing to commit (create/copy files and use "git add" to track)
```

这说明你现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过。 此外，上面的信息还表明，当前目录下没有出现任何处于未跟踪状态的新文件，否则 `Git` 会在这里列出来。 最后，该命令还显示了当前所在分支，并告诉你这个分支同远程服务器上对应的分支没有偏离。 现在，分支名是 `master`,这是默认的分支名。

现在，让我们在项目下创建一个新的 `README` 文件。 如果之前并不存在这个文件，使用 `git status` 命令，你将看到一个新的未跟踪文件 `README`：

```shell
echo "git" >  README
git status
On branch master
Initial commit
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README
nothing added to commit but untracked files present (use "git add" to track)
```

它告诉我有一个还未追踪的文件，并提示我可以使用 `git add <file>...` 把它加进去。

### 查看已暂存和未暂存的修改
如果 `git status` 命令的输出对于你来说过于模糊，你想知道具体修改了什么地方，可以用 `git diff` 命令,`git diff` 可以看文件做了哪些变化
它默认跟最新的一个commit进行比较。
红色（前面有减号-）表示删除，绿色（前面有加号+）表示添加。

`git diff --cached` 查看已暂存的将要添加到下次提交里的内容
 
假如现在想撤销这些更改 `git checkout -- .`
`git checkout -- file` 可以丢弃工作区的修改
这里有两种情况：
一种是自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
一种是已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

### 跟踪新文件
更新状态使用 `git add -A` 或 `git add .` （空格+ 点） 表示当前目录所有文件

再次使用 `git status`

```shell
git add README
git status
On branch master
Initial commit
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README
```

状态变了 `README` 处于暂存状态,说明add成功了.
`Changes to be committed` 说明现在可以执行 `commit` 了
`git rm --cached <file>...` 将文件从 `stage` 里移出

```shell
git rm --cached README
rm 'README'
```

> git reset HEAD 如果后面什么都不跟的话 就是上一次add 里面的全部撤销了 
> git reset HEAD XXX/XXX/XXX.Java 就是对某个文件进行撤销了
> **HEAD**，表示最新的版本

### 提交更新
`git commit -m "提交信息"`
将文件提交到 `repository` 里

```shell
git commit -m "first commit"
[master (root-commit) a74782d] first commit
 1 file changed, 1 insertion(+)
 create mode 100644 README
```

`git commit` 这种方式会启动文本编辑器以便输入本次提交的说明。

提交时记录的是放在暂存区域的快照。 任何还未暂存的仍然保持已修改状态。如果觉得这么做略显繁琐，可以直接跳过使用暂存区域。
只要在提交的时候，给 `git commit` 加上 `-a` 选项，`Git` 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add` 步骤。

修改 `README` 文件，直接提交：

```shell
git commit -a -m "commit"
[master 1a61fd5] commit
 1 file changed, 1 insertion(+)
```
提交之前不再需要 `git add` `README` 文件了，但是如果是未跟踪过（新建）的文件是不能被提交的，所以不建议这样用。

`git commit --amend` 重新提交,这个命令会将暂存区中的文件提交。 如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令），那么快照会保持不变，而你所修改的只是提交信息。就是代替上次提交的结果。

### 移除文件
要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。 可以用 git rm 命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。

```shell
git rm README
rm 'README'
```
相当于

```shell
rm README
git add README
```

下一次提交时，该文件就不再纳入版本管理了。 如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 `-f`（译注：即 `force` 的首字母）。 这是一种安全特性，用于防止误删还没有添加到快照的数据，这样的数据不能被 `Git` 恢复。

另外一种情况是，我们想把文件从 `Git` 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。 换句话说，你想让文件保留在磁盘，但是并不想让 `Git` 继续跟踪。 当你忘记添加 `.gitignore` 文件，不小心把一个很大的日志文件或一堆 .a 这样的编译生成文件添加到暂存区时，这一做法尤其有用。 为达到这一目的，使用 `--cached` 选项：

```shell
git rm --cached README
```

恢复文件
如果还未提交缓存区（没`add`）直接使用

```shell
git checkout -- README
```
即可恢复
如果已提交缓存区，需要回到最近一次 `git commit` 或 `git add` 时的状态，再恢复。

```shell
git reset HEAD
git checkout -- README
```

### 移动文件
要在 Git 中对文件改名 `git mv file_from file_to`

```shell
git mv README README.md
```

相当于运行了下面三条命令

```shell
mv README README.md
git rm README
git add README.md
```

### 查看提交历史
`git log` 可以看到提交的记录，会按提交时间列出所有的更新，最近的更新排在最上面。
常用的选项如：
`git log -1` 最近一次的提交
`git log -p -2` 显示最近两次提交的内容差异
`git log --stat` `--stat` 选项在每次提交的下面列出额所有被修改过的文件、有多少文件被修改了以及被修改过的文件的哪些行被移除或是添加了
`git log --pretty=oneline` 将每个提交放在一行显示，查看的提交数很大时非常有用
`git log --pretty=oneline --graph` `--graph` 选项添加了一些 `ASCII` 字符串来形象地展示你的分支、合并历史。

```shell
git log
commit a74782dd6876921c0a1fb338c4637afe722623d8
Author: yourname <youremail@email.com>
Date:   Tue Jul 4 16:29:43 2017 +0800
    first commit
```

**q**键可以退出

### 版本回退
`git log --pretty=oneline` 获取版本号的commit_id
`git reset --hard commit_id`  取版本号前7位也可以

`Git` 必须知道当前版本是哪个版本，在 `Git` 中，用**HEAD**表示当前版本，也就是最新的提交的，上一个版本就是 `HEAD^`，上上一个版本就是 `HEAD^^`，当然往上100个版本不可能写100个`^` ，应写成 `HEAD~100`。

如何回到最新版呢
`git reflog` 记录你的每一次命令。

```shell
git reflog
2008cf5 HEAD@{2}: reset: moving to HEAD
a74782d HEAD@{13}: commit (initial): first commit
```

第一行表示当前 `HEAD` 所在的版本号是 2008cf5 ，而之所以在这个版本号，是由于我们执行了 `reset` 命令。
再用一次 `reset`，将 `HEAD` 指向 a74782d
`git reset --hard a74782d`
回到第一次reset前的状态了

## 分支管理
### 创建与合并
创建dev分支，然后切换到dev分支：

```shell
git checkout -b dev
```

`git checkout` 命令加上-b参数表示创建并切换，相当于以下两条命令：
> git branch dev
> git checkout dev

`git branch` 查看当前分支
`git branch` 命令会列出所有分支，当前分支前面会标一个 * 号。

修改内容后提交，切换回 `master` 分支：

```shell
git checkout master
```

修改的内容不见了,因为那个提交是在 `dev` 分支上，而 `master` 分支此刻的提交点并没有变

把 `dev` 分支的工作成果合并到 `master` 分支上

```
git merge dev
```

`git merge` 命令用于合并指定分支到当前分支。合并后就可以看到，和dev分支的最新提交是完全一样的。

合并完成后，就可以放心地删除 `dev` 分支了(不能删除当前分支)
`git branch -d dev`

因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在 `master` 分支上工作效果是一样的，但过程更安全。

### 合并冲突
当分支中更改的内容在 `master` 分支已经更改，合并时会发生冲突。

```
git merge dev
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

`git status` 也可以告诉我们冲突的文件
Git用`<<<<<<<，=======，>>>>>>>`标记出不同分支的内容，我们修改如下后保存在提交。

```shell
git add
git commit -m   #提交
git branch -d   #最后，删除分支。
```

`git log --graph` 命令可以看到分支合并图

合并分支时，如果可能，Git会用 `Fast forward` 模式，但这种模式下，删除分支后，会丢掉分支信息
强制禁用 `Fast forward` 模式，Git就会在 `merge` 时生成一个新的 `commit`


```shell
git merge --no-ff -m "merge with no-ff" dev
```
`--no-ff` 表示禁用 Fast forward
`-m` 把 commit 描述写进去

### Bug分支
开发中，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。
当前正在分支上进行的工作还没有提交，需要先存起来。
Git还提供了 `stash` 功能，可以把当前工作现场**储藏**起来，等以后恢复现场后继续工作。

```shell
git stash
```

现在，用 `git status` 查看工作区，就是干净的。
然后再到 `master` 分支上创建分支，修改后和并，删除分支。

回到之前的分支，查看 `stash` 列表

```shell
git stash list 
```

两种方法恢复,`git stash pop` 方法，自动删除 `stash`

```shell
git stash pop
```

还有一种就是先用 `git stash apply` 恢复，再删除 `stash` 内容。

```shell
git stash apply stash@{0}
git stash drop
```

你可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令 `git stash apply stash@{0}`

删除分支 `git branch -D <name>` 强行删除

### 远程分支
当你从远程仓库克隆时，实际上Git自动把本地的 `master` 分支和远程的 `master` 分支对应起来了，并且，远程仓库的默认名称是 `origin`

```shell
git remot       #查看远程库的信息
git remote -v   #显示更详细的信息 
origin	https://github.com/AIxiuxiu/anna.git (fetch) #抓取地址
origin	https://github.com/AIxiuxiu/anna.git (push)  #推送地址
```

推送分支 
master分支 

```shell
git push origin master
```
推送其他分支比如 `dev`

```shell
git push origin dev
```

创建分支 `git checkout -b newbranch`
将新的分支推送到 `github`  `git push origin newbranch`

抓取分支  `git checkout -b dev origin/dev`
失败则需要建立本地分支和远程分支的关联

```shell
git branch --set-upstream-to=origin/newbranch
git pull
```

注：多人协作的工作模式通常是这样：

> 首先，可以试图用git push origin branch-name推送自己的修改；

> 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；

> 如果合并有冲突，则解决冲突，并在本地提交；

> 没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！

> 如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name。

### 标签管理
打标签 `git tag <name>` ，默认标签是打在当前分支上最新提交的commit上的
历史标签，找到历史提交的 `commit id`

```shell
git log --pretty=oneline --abbrev-commit
git tag <name> commit_id #提交打标签
```

查看标签 `git tag`
查看标签信息 `git show <tagname>`

创建带有说明的标签，用-a指定标签名，-m指定说明文字

```shell
git tag -a <标签名> -m "说明文字" commit_id
```

删除标签 `git tag -d <tagname>`

推送某个标签到远程 `git push origin <tagname>`

一次性推送全部尚未推送到远程的本地标签 `git push origin --tags`

如果标签已经推送到远程，要删除远程标签就麻烦一点，

```shell
git tag -d <tagname>  #先从本地删除
git push origin :refs/tags/<tagname>  #从远程删除
```

## github
### 创建 SSH 公钥
使用命令创建 `ssh-key`

```shell
ssh-keygen -t rsa -C "youremail@example.com"
```

然后在用户主目录里找到 `.ssh` 目录，里面有 `id_rsa` 和 `id_rsa.pub` 两个文件，这两个就是 `SSH Key` 的秘钥对，`id_rsa` 是私钥，不能泄露出去，`id_rsa.pub` 是公钥。
然后登陆 `GitHub`，打开 `Account settings`，`SSH Keys` 页面：
在 `Key` 文本框里粘贴 `id_rsa.pub` 文件的内容.

可以使用 `ssh -T git@github.com` 测试是否连接成功

```shell
ssh -T git@github.com
Hi yourName! You've successfully authenticated, but GitHub does not provide shell access.
```

### 添加远程库
登陆 `GitHub`，然后，在右上角找到 `Create a new repository` 按钮
填写 `Repository name` 创建 `Create repository`
新建本地仓库并关联

```shell
echo "# github" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/yourName/repositoryName.git
git push -u origin master
```

把一个已有的本地仓库与之关联

```shell
git remote add origin https://github.com/AIxiuxiu/anna.git
git push -u origin master
```

由于远程库是空的，我们第一次推送 `master` 分支时，加上了 `-u` 参数

此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master` 或 `git push` 推送最新修改。

### 从远程库克隆
假设我们从零开发，那么最好的方式是先创建远程库，然后，从远程库克隆
最好勾选 `Initialize this repository with a README`，`GitHub` 会自动为我们创建一个 `README.md` 文件，

之后用命令 `git clone` 克隆一个本地库

```shell
git clone https://github.com/AIxiuxiu/anna.git
```

`GitHub` 支持 `HTTPS` 和 `SSH` 协议(建议使用 `SSH` ，快一点)

### Fork 项目
首先在你要 `fork` 的项目点击 `fork` ，项目就会在你的空间中创建一个完全属于你的项目副本，但在你自己的计算机上并没有这个仓库的文件。使用 `clone` 把项目拷贝到本地。

通过配置 `Git` 来同步你 `fork` 的原始项目，复制原始项目的仓库 URL，命令行到本地项目目录。
输入 `git remove -v`，按下回车键，你将会看到你的 fork 当前配置的远程仓库：

```shell
git remote -v
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
```

输入 `git remote add upstream <URL>` `URL` 原项目地址。再次输入 git remote -v。你将会看到你 `fork` 的 `URL` 作为原始的地址，而原始的仓库的 `URL` 作为 `upstream`。

```shell
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
git remote -v
origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
```

从上游仓库 `fetch` 分支和提交点，提交给本地 `master`，并会被存储在一个本地分支 `upstream/master` 
切换到本地主分支(如果不在) `git checkout master`
把 `upstream/master` 分支合并到本地 `master` 上，这样就完成了同步，并且不会丢掉本地修改的内容。

```shell
git fetch upstream
git checkout master
git merge upstream/master
```

接着就是熟悉的推送本地仓库到远程仓库

```shell
git push origin master
```

其他
`github` 上最新和最酷的东西 [Explore GitHub](https://github.com/explore)
`github` 教程 [gotgithub](https://github.com/gotgit/gotgithub)

### 忽略特殊文件
需要.gitignore文件
所有配置文件可以直接在线浏览：[https://github.com/github/gitignore](https://github.com/github/gitignore)

加一个文件到Git，但发现添加不了，原因是这个文件被.gitignore忽略了,如忽略 `class` 文件。

```shell
git add App.class
The following paths are ignored by one of your .gitignore files:
App.class
Use -f if you really want to add them.
```

可以用-f强制添加到Git：

```shell
git add -f App.class
```

可能是.gitignore写得有问题，需要找出来到底哪个规则写错了，可以用git check-ignore命令检查：

```shell
git check-ignore -v App.class
.gitignore:3:*.class    App.class
```

## 配置别名
只需要敲一行命令，告诉Git，以后 `st` 就表示 `status`，如：

```shell
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
```

把暂存区的修改撤销掉（unstage）

```shell
git config --global alias.unstage 'reset HEAD'
```

配置一个git last，让其显示最后一次提交信息：

```shell
git config --global alias.last 'log -1'
```

配置lg

```shell
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

加上 `--global` 是针对当前用户起作用的,如果不加，那只针对当前的仓库起作用。

每个仓库的Git配置文件都放在 `.git/config`

```shell
cat .git/config
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true
[remote "origin"]
    url = git@github.com:michaelliao/learngit.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
    remote = origin
    merge = refs/heads/master
[alias]
    last = log -1
```

别名就在 `[alias]` 后面，要删除别名，直接把对应的行删掉即可

而当前用户的 `Git` 配置文件放在用户主目录下的一个隐藏文件 `.gitconfig` 中

## 参考链接
[廖雪峰Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
[Git](https://git-scm.com/book/zh/v2)

