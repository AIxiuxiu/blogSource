---
title: Hexo 个人博客
date: 2017-05-30 11:30:00
categories:
- other
tags:
- hexo
---

# Hexo 个人博客
## 简介
Hexo是基于**Node.js**的静态博客框架，简单、轻量，其生成的静态网页可以托管在**Github**。
使用 `GitHubPages` + `Hexo`，一种简单高效的实现方式来搭建个人的博客。

<!-- more -->

## 环境准备
### 安装node.js
去[nodejs](https://nodejs.org/en/download/)官网下载对应系统的安装包，按提示安装。

或 Homebrew 安装方式，此安装方式无需重启

```shell
brew install node
```

### 安装Git 
一般都安装了，查看是否安装 `git` 命令，没有安装会提示安装。
希望下载最新的可以去[git官网下载](https://git-scm.com/download)

### 安装hexo
使用npm安装

```shell
sudo npm install -g hexo-cli
```

安装完成创建并初始化放博客的文件夹,然后定位到存储博客的目录并安装。

```shell
hexo init <folder>
cd <folder>
npm install
```

解决 `Error: Cannot find module './build/Release/DTraceProviderBindings'` 错误
删除node中的 `lib/node_modules/hexo-cli` 和 `bin/hexo` 重新安装

目前我安装所用的本地环境如下：(可以通过hexo -v查看）

```shell
hexo: 3.3.7
hexo-cli: 1.0.3
os: Darwin 16.5.0 darwin x64
http_parser: 2.7.0
node: 6.11.0
v8: 5.1.281.102
uv: 1.11.0
zlib: 1.2.11
ares: 1.10.1-DEV
icu: 58.2
modules: 48
openssl: 1.0.2k
```

### hexo 命令
* hexo generate (hexo g) 生成静态文件，会在当前目录下生成一个新的叫做public的文件夹
* hexo server (hexo s) 启动本地web服务，用于博客的预览
* hexo deploy (hexo d) 部署播客到远端（比如github, heroku等平台）
* hexo new (hexo n) "postName" 新建文章
* hexo new (hexo n) page "pageName" 新建页面
* hexo clean 清除缓存文件和已生成的静态文件

 hexo d -g #生成部署 (-g部署之前预先生成静态文件)
 hexo s -g #生成预览
 
**选项**
 
1. hexo --safe 安全模式，在安全模式下，不会载入插件和脚本。当您在安装新插件遭遇问题时，可以尝试以安全模式重新执行。
2. hexo --debug 调试模式，在终端中显示调试信息并记录到 debug.log。当您碰到问题时，可以尝试用调试模式重新执行一次。
3. hexo --silent 简洁模式，隐藏终端信息

## 主题设置
[hexo 提供很多主题](https://hexo.io/themes/)

这里选了一个极简的主题[NexT](https://github.com/iissnan/hexo-theme-next)，也是Hexo主题中最受欢迎的一个。

### 下载主题

```shell
cd your-hexo-file #Hexo 站点目录
git clone https://github.com/iissnan/hexo-theme-next themes/next
```

失败的话直接到[NexT发布页面](https://github.com/iissnan/hexo-theme-next/releases)下载并解压所下载的压缩包至站点的 themes 目录,需要将文件名改为next。

### 启用主题
打开**站点配置文件** `_config.yml` ,找到 `theme` 字段，并将其值更改为`next`

在切换主题之后、验证之前， 我们最好清除 Hexo 的缓存

```shell
hexo clean
```

启动 Hexo 本地站点，并开启调试模式（即加上 **--debug**），整个命令是 

```shell
hexo s --debug
```

在服务启动的过程，注意观察命令行输出是否有任何异常信息,这些信息将帮助他人更好的定位错误。
使用浏览器访问 [http://localhost:4000](http://localhost:4000)，检查站点是否正确运行。

### 主题设定
#### 基础配置

```
 title:              #你博客的标题
 subtitle:           #你博客的副标题
 description:        #你博客的描述
 author:             #你的名字
 language: zh-Hans   #语言 中文
 theme: next         #安装的主题名称
 deploy:             #发布
   type: git         #使用Git 发布
   repo: https://github.com/username/username.github.io.git    #你的Github仓库
   
 url: http://yoursite.com #你的站点地址
 permalink: :title/  #url结构 
```

#### Scheme
Scheme 是 NexT 为提供多种不同的外观而添加的，目前 NexT 支持三种样式他们是：

* Muse - 默认 Scheme，这是 NexT 最初的版本，黑白主调，大量留白
* Mist - Muse 的紧凑版本，整洁有序的单栏外观
* Pisces - 双栏 Scheme，小家碧玉似的清新

更改**主题配置文件** `scheme` 关键字

#### 菜单
第一是菜单项（名称和链接），第二是菜单项的显示文本，第三是菜单项对应的图标([Font Awesome](http://fontawesome.io/))。

菜单名称在 `{language}.yml` 文件中设置。
菜单项的图标，对应的字段是 `menu_icon`，而 `enable` 可用于控制是否显示图标，你可以设置成 `false` 来去掉图标。

添加菜单需要创建页面，如标签界面

```shell
hexo new page tags
```

创建完成后，在对应的目录下找到 `index.md` 文件，进行如下的修改：

```
---
title: tags # 标签名字（可为空）
date: 2017-06-29 16:28:46
type: "tags" # 将页面的类型设置为 tags,主题将自动为这个页面显示为标签云
comments: false # 如果有启用多说 或者 Disqus 评论，默认页面也会带有评论。需要关闭的话，设置为 false
---
```

type 有分类 `categories` 标签 `tags`

#### 侧栏
`sidebar` 字段来控制侧栏的行为
其一是侧栏的位置 `sidebar.position`

* left - 靠左放置
* right - 靠右放置

其二是侧栏显示的时机 `sidebar.display`

* post - 默认行为，在文章页面（拥有目录列表）时显示
* always - 在所有页面中都显示
* hide - 在所有页面中都隐藏（可以手动展开）
* remove - 完全移除

####  头像
`avatar` 设置成头像的链接地址。其中，头像的链接地址可以是完整的互联网或站点内的地址（将头像放置主题目录下的 source/images/ 配置为avatar: /images/avatar.png）

#### 否显示阅读全文
将 `auto_excerpt` 的 `enable` 设置为 `ture` 则显示阅读全文

```
# Automatically Excerpt. Not recommend.
# Please use <!-- more --> in the post to control excerpt accurately.
auto_excerpt:
  enable: ture # 设置是否显示阅读全文
  length: 150
```

或在文章中使用 <!-- more --> 手动进行截断，Hexo 提供的方式（推荐）

#### 代码高亮
NexT 使用 [Tomorrow Theme](https://github.com/chriskempson/tomorrow-theme) 作为代码高亮，共有5款主题供你选择。 NexT 默认使用的是 白色的 normal 主题，可选的值有 `normal`，`night`， `night blue`， `night bright`， `night eighties`。

可更改 `highlight_theme` 字段

#### 社交链接
链接放置在 `social` 字段下，一行一个链接。其键值格式是 显示文本: 链接地址。
设定链接的图标，对应的字段是 `social_icons`，图标名称 是 Font Awesome 图标的名字（不必带 fa- 前缀）

#### 动画效果
`use_motion`，根据您的需求设置值为 `true` 或者 `false`，NexT 默认开启动画效果

```
use_motion: true  # 开启动画效果
use_motion: false # 关闭动画效果
```

背景动画 `canvas_nest`

```
canvas_nest: true //开启动画
canvas_nest: false //关闭动画
```

改变 `canvas` 动画的配置 打开 `layout/_scripts/vendors.swig` 文件，根据[canvas-nest.js文档](https://github.com/hustcc/canvas-nest.js)进行如下更改：

```tex
{% for name, internal in js_vendors %}
  {% set internal_script = url_for(theme.vendors._internal) + '/' + internal %}
    {% if name === 'canvas_nest' %}
      <script type="text/javascript" color="135,218,255" opacity="0.6" count="66" src="{{ theme.vendors[name] | default(internal_script) }}"></script>
    {% else %}
      <script type="text/javascript" src="{{ theme.vendors[name] | default(internal_script) }}"></script>
    {% endif %}
{% endfor %}
```

#### 背景图片 
要添加背景图片，首先将图片 `background.jpg` 放到 `/source/uploads/` 目录下，然后，在文件 `/css/_custom/custom.styl`文件中添加下面一行内容：

```
body { background:url(/uploads/background.jpg);}
```

同样可以添加其它背景，如侧栏背景 `sidebar` ，头部 `header` 等。

#### 腾讯公益404页面
[腾讯公益404页面](http://www.ixirong.com/404.html)，寻找丢失儿童，让大家一起关注此项公益事业！

新建 `404.html` 页面，放到主题的 `source` 目录下，内容如下：

```html
<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=utf-8;"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="robots" content="all" />
  <meta name="robots" content="index,follow"/>
  <link rel="stylesheet" type="text/css" href="https://qzone.qq.com/gy/404/style/404style.css">
</head>
<body>
  <script type="text/plain" src="http://www.qq.com/404/search_children.js"
          charset="utf-8" homePageUrl="/"
          homePageName="回到我的主页">
  </script>
  <script src="https://qzone.qq.com/gy/404/data.js" charset="utf-8"></script>
  <script src="https://qzone.qq.com/gy/404/page.js" charset="utf-8"></script>
</body>
</html>
```

## Github Pages设置
GitHub Pages 本用于介绍托管在GitHub的项目，不过由于他的空间免费稳定，常用来做搭建博客。

每个帐号只能有一个仓库来存放个人主页，而且仓库的名字必须是 `username/username.github.io` ，这是特殊的命名约定。你可以通过 `http://username.github.io` 来访问你的个人主页。

仓库创建好就可以部署了，要部署到github，需要在**站点配置文件**_config.xml中作如下修改：

```
deploy:
  type: git  
  repo: <repository url> #库（Repository）地址
  branch: [branch] #分支名称默认 master
  message: [message] #自定义提交信息 (默认为 Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }})

```

安装一个扩展：[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)

```shell
npm install hexo-deployer-git --save
```

然后在命令行中执行

```shell
hexo d
```

如果出现下面错误，则是因为没有设置好public key所致。

```
Permission denied (publickey).
fatal: Could not read from remote repository.
Please make sure you have the correct access rights
and the repository exists.
```
解决：在本机生成public key：

```shell
ssh-keygen -t rsa -C "youremail@example.com"
```

然后在用户主目录里找到**.ssh**目录，里面有 `id_rsa` 和 `id_rsa.pub` 两个文件。然后登陆github，在[SSH设置页面](https://github.com/settings/keys)添加上 `id_rsa.pub` 文件中的内容即可。

## 插件
### Sitemap
[Sitemap](https://github.com/hexojs/hexo-generator-sitemap) 的目的是要避免搜索引擎的爬虫没有完整的收录整个网页的内容，所以提交 Sitemap 是能够补足搜索引擎的不足，进而加速网页的收录速度，达到搜寻引擎友好的目的。

安装

```shell
npm install hexo-generator-sitemap --save
```

在 Hexo 根目录下的 `_config.yml` 里配置一下

```
sitemap:
    path: sitemap.xml
    template: ./sitemap_template.xml
```

对于国内用户还需要安装插件 [hexo-generator-baidu-sitemap](https://github.com/coneycode/hexo-generator-baidu-sitemap)

```shell
npm install hexo-generator-baidu-sitemap --save
```

添加配置

```
baidusitemap:
  path: baidusitemap.xml
```

完成之后就可以将 `sitemap` 文件提交谷歌和百度，提交过程可以查看[sunshine小小倩](https://juejin.im/post/590b451a0ce46300588c43a0)的文章。

### RSS
安装[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

```shell
npm install hexo-generator-feed --save
```

然后在 Hexo 根目录下的 `_config.yml` 里配置一下

```
feed:
   type: atom      #type 表示类型, 是 atom 还是 rss2.
   path: atom.xml  #path 表示 Feed 路径
   limit: 20       #limit 最多多少篇最近文章  
```

添加RSS链接,打开 `themes/next/_config.yml` 文件，`rss:` 部分修改为 `rss: /atom.xml`。

### Local Search
添加百度/谷歌/本地 自定义站点内容搜索

安装 [hexo-generator-searchdb](https://github.com/flashlab/hexo-generator-search)，在站点的根目录下执行以下命令：

```shell
npm install hexo-generator-searchdb --save
```

编辑**站点配置文件**，新增以下内容到任意位置：

```
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```

编辑**主题配置文件**，启用本地搜索功能：

```
# Local search
local_search:
  enable: true
```
  
## 博客管理
### 文章
可以直接把写好的文章插入到目录 `/_posts` 下面，后缀为.MD就行，在文章头部固定格式：

```
title: title   #文章的标题，这个才是显示的文章标题，其实文件名不影响
date: 2015-09-01 20:33:26   #用命令会自动生成，也可以自己写，所以文章时间可以改
categories: categories  #文章的分类，这个可以自己定义
tags: [tag]        #tag，为文章添加标签，方便搜索
```
或

```
hexo new "new article"
```

文件的开头是属性，采用统一的yaml格式，用三条短横线分隔。

分类和标签格式

```
categories:
- 日记
tags:
- Hexo
- node.js
```

### 草稿
相当于很多博客都有的“私密文章”功能。

```
hexo new draft "new draft"
```

会在 `source/_drafts` 目录下生成一个 `new-draft.md` 文件。
但是这个文件不被显示在页面上，链接也访问不到。也就是说如果你想把某一篇文章移除显示，又不舍得删除，可以把它移动到 `_drafts `目录之中。

如果你希望强行预览草稿，更改**站点配置文件**：

```
render_drafts: true
```

或者，如下方式启动server：

```shell
hexo server --drafts
```

下面这条命令可以把草稿变成文章，或者页面：

```shell
hexo publish [layout] <filename>
```

## 参考链接
[Hexo官网](https://hexo.io/zh-cn/)
[手把手教你使用Hexo + Github Pages搭建个人独立博客](https://linghucong.js.org/2016/04/15/2016-04-15-hexo-github-pages-blog/)
[Hexo搭建Github-Pages博客填坑教程](http://www.jianshu.com/p/35e197cb1273)
[NexT主题](http://theme-next.iissnan.com/)
[Hexo 入门指南](https://wizardforcel.gitbooks.io/markdown-simple-world/hexo-tutor-1.html)
[GitHubPages + Hexo — 博客搭建](https://custompbwaters.github.io/Hexo%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/GitHubPages%20+%20Hexo%E2%80%94%E5%8D%9A%E5%AE%A2%E6%90%AD%E5%BB%BA.html)
[hexo高阶教程](https://juejin.im/post/590b451a0ce46300588c43a0)


