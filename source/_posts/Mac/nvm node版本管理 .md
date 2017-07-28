---
title: nvm node版本管理 
date: 2017-06-5 12:30:02
categories:
- mac
tags:
- nvm
- node
---

# nvm 
管理 node 版本，[nvm 地址](https://github.com/creationix/nvm#install-script)

##安装 
使用 `curl` 方式

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```
<!-- more -->
或 `Wget`

```shell
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

验证是否安装成功

```shell
command -v nvm
```

成功返回 `nvm`

完成后 `nvm` 就被安装在了 `~/.nvm` 下，接下来就需要配一下环境变量，使用的 `zsh` 的话，就需要在 `~/.zshrc` 这个配置文件中配置，否则在 `~/.profile` 或 `~/.bash_profile` 中配置。
在配置文件中添加

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

但是 `. "$NVM_DIR/nvm.sh"` 会拖慢终端的启动。
解决方案 [issue#860](https://github.com/creationix/nvm/issues/860) 使用 `--no-use` 和 手动指定默认 `node` 路径来加快执行速度
默认路径可以通过 `nvm which default` 获取

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  --no-use
export PATH=$HOME/.nvm/versions/node/v8.0.0/bin/:$PATH
```

输入 `nvm` 可以看到如下信息


```shell
Node Version Manager
Note: <version> refers to any version-like string nvm understands. This includes:
  - full or partial version numbers, starting with an optional "v" (0.10, v0.1.2, v1)
  - default (built-in) aliases: node, stable, unstable, iojs, system
  - custom aliases you define with `nvm alias foo`

 Any options that produce colorized output should respect the `--no-colors` option.

Usage:
  nvm --help                                Show this message
  nvm --version                             Print out the latest released version of nvm
  nvm install [-s] <version>                Download and install a <version>, [-s] from source. Uses .nvmrc if available
    --reinstall-packages-from=<version>     When installing, reinstall packages installed in <node|iojs|node version number>
    --lts                                   When installing, only select from LTS (long-term support) versions
    --lts=<LTS name>                        When installing, only select from versions for a specific LTS line
  nvm uninstall <version>                   Uninstall a version
  nvm uninstall --lts                       Uninstall using automatic LTS (long-term support) alias `lts/*`, if available.
  nvm uninstall --lts=<LTS name>            Uninstall using automatic alias for provided LTS line, if available.
  nvm use [--silent] <version>              Modify PATH to use <version>. Uses .nvmrc if available
    --lts                                   Uses automatic LTS (long-term support) alias `lts/*`, if available.
    --lts=<LTS name>                        Uses automatic alias for provided LTS line, if available.
  nvm exec [--silent] <version> [<command>] Run <command> on <version>. Uses .nvmrc if available
    --lts                                   Uses automatic LTS (long-term support) alias `lts/*`, if available.
    --lts=<LTS name>                        Uses automatic alias for provided LTS line, if available.
  nvm run [--silent] <version> [<args>]     Run `node` on <version> with <args> as arguments. Uses .nvmrc if available
    --lts                                   Uses automatic LTS (long-term support) alias `lts/*`, if available.
    --lts=<LTS name>                        Uses automatic alias for provided LTS line, if available.
  nvm current                               Display currently activated version
  nvm ls                                    List installed versions
  nvm ls <version>                          List versions matching a given <version>
  nvm ls-remote                             List remote versions available for install
    --lts                                   When listing, only show LTS (long-term support) versions
  nvm ls-remote <version>                   List remote versions available for install, matching a given <version>
    --lts                                   When listing, only show LTS (long-term support) versions
    --lts=<LTS name>                        When listing, only show versions for a specific LTS line
  nvm version <version>                     Resolve the given description to a single local version
  nvm version-remote <version>              Resolve the given description to a single remote version
    --lts                                   When listing, only select from LTS (long-term support) versions
    --lts=<LTS name>                        When listing, only select from versions for a specific LTS line
  nvm deactivate                            Undo effects of `nvm` on current shell
  nvm alias [<pattern>]                     Show all aliases beginning with <pattern>
  nvm alias <name> <version>                Set an alias named <name> pointing to <version>
  nvm unalias <name>                        Deletes the alias named <name>
  nvm reinstall-packages <version>          Reinstall global `npm` packages contained in <version> to current version
  nvm unload                                Unload `nvm` from shell
  nvm which [<version>]                     Display path to installed node version. Uses .nvmrc if available
  nvm cache dir                             Display path to the cache directory for nvm
  nvm cache clear                           Empty cache directory for nvm

Example:
  nvm install v0.10.32                  Install a specific version number
  nvm use 0.10                          Use the latest available 0.10.x release
  nvm run 0.10.32 app.js                Run app.js using node v0.10.32
  nvm exec 0.10.32 node app.js          Run `node app.js` with the PATH pointing to node v0.10.32
  nvm alias default 0.10.32             Set default node version on a shell

Note:
  to remove, delete, or uninstall nvm - just remove the `$NVM_DIR` folder (usually `~/.nvm`)
```

可以看到 `nvm` 的全部命令
各项命令的详细用法及含义可参考 [nvm文档](https://github.com/creationix/nvm)

## 使用

查看可用的安装版本：

```shell
nvm ls-remote
```

最好使用 `LTS`(Long Term Support) 版本

安装 `node`

```shell
nvm install v6.11.0
nvm install node #最新版本
```

如果您想查看已安装的版本：

```shell
nvm ls
```

注：如果已经安装了 `node`，最好先删除已安装的 `node` 和全局 `node` 模块(node_modules)。
`node` 命令在 `/usr/local/bin/node `
`npm` 命令在 `/usr/local/lib[lib64]/node_modules/npm`

`npm ls -g --depth=0` // 查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 `node` 版本重新进行全局安装

```shell
npm ls -g --depth=0 // 查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
sudo rm -rf /usr/local/lib/node_modules // 删除全局 node_modules 目录
sudo rm /usr/local/bin/node // 删除 node
cd /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm #删除全局 node 模块注册的软链
```

安装完成，`nvm` 会将各个版本的node安装在 `~/.nvm/versions/node` 目录下

看看目录下有些什么，安装的版本文件

```shell
ls -a ~/.nvm/versions/node
.       ..      v6.11.0
```

`nvm` 会在 `$PATH` 前面安插指定版本的目录，可以确认实际的 `$PATH` 看看：

```shell
echo $PATH
```

接下来我们可以使用 `nvm use <version>` 切换版本：

```
nvm use v6.11.0
```

指定一个默认的 `node` 版本

```shell
nvm alias default v6.11.0
nvm current #查看当前版本
```

设置别名 `nvm alias my_alias <name>`，方便选择版本

```shell
nvm alias 6 v6.11.0
```

`nvm install` 命令经常执行失败，这时你需要到 `nodejs` 官网下载你想安装的版本，解压缩，然后复制到 `~/.nvm/versions/node/` 文件夹中，同样可以使用 `nvm` 切换。


使用 `.nvmrc` 文件配置项目所使用的 `node` 版本

如果你的默认 `node` 版本（通过 `nvm alias` 命令设置的）与项目所需的版本不同，则可在项目根目录或其任意父级目录中创建 `.nvmrc` 文件，在文件中指定使用的 `node` 版本号

```shell
cd <项目根目录>  #进入项目根目录
echo "v6.11.0" > .nvmrc #添加 .nvmrc 文件并指定版本
nvm use #无需指定版本号，会自动使用 .nvmrc 文件中配置的版本
node -v #查看 node 是否切换为对应版本
```
##  nvm 切换镜像源
根据 nvm 官方提供的帮助文档，我们可以通过以下命令进行切换

```shell
export NVM_NODEJS_ORG_MIRROR="http://npm.taobao.org/mirrors/node"
```

[http://npm.taobao.org/mirrors/node](http://npm.taobao.org/mirrors/node) 是 [淘宝NPM镜像](https://npm.taobao.org) 提供的国内 `Node.js` 的安装镜像源。

但是种方式，在每次重启终端都会失效。如果并不想每次打开终端，都需要重新设置 `NVM_NODEJS_ORG_MIRROR` 环境变量。需要在终端配置文件中添加：

```shell
export NVM_NODEJS_ORG_MIRROR="http://npm.taobao.org/mirrors/node"
source ~/.nvm/nvm.sh
```

 Windows 系统我们可以找到 `nvm-windows` 软件的安装目录中的 `settings.txt` 文件，增加以下内容:

```shell
node_mirror=http://npm.taobao.org/mirrors/node/
```

## npm 镜像
`npm` 默认从国外的源 [https://registry.npmjs.org/](https://registry.npmjs.org/) 获取和下载包信息，国内访问速度很不理想。

国内 `npm` 镜像源

`cnpmjs` 镜像：
搜索地址：[https://cnpmjs.org/](https://cnpmjs.org/)
registry: [https://r.cnpmjs.org/](https://r.cnpmjs.org/)

淘宝 `npm` 镜像：
搜索地址：[https://npm.taobao.org/](https://npm.taobao.org/)
registry: [https://registry.npm.taobao.org/](https://registry.npm.taobao.org/)

使用方法
1.临时使用(不建议)

```shell
npm install express --registry https://r.cnpmjs.org/
```

2.持久使用

命令行修改 `npm` 配置

```shell
npm config set registry https://r.cnpmjs.org/ #配置 registry
npm config get registry #验证配置是否修改成功
```

或添加 `npm` 配置文件 `.npmrc` 编辑 `~/.npmrc` 加入下面内容

```shell
registry = https://r.cnpmjs.org
```

## 参考链接
[node版本管理工具nvm-Mac下安装及使用](https://segmentfault.com/a/1190000004404505)
[使用nvm安装管理多个版本的node.js(适用于Mac和Windows系统)](https://segmentfault.com/a/1190000007998600)
[国内优秀npm镜像推荐及使用](http://riny.net/2014/cnpm/)

