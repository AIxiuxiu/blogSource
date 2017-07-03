---
title: Hexo 优化和备份
date: 2017-06-1 12:30:02
categories:
- other
tags:
- hexo
---

# Hexo 优化和备份
## gulp精简博客代码
`Next` 主题在 `Hexo` 引擎解析 `md` 时生成的代码会包含大量的无用空白。这些空白会增加文档的大小,使得网站在响应上不够迅速,影响体验。
使用的 `gulp` 是一个前端项目构建工具,用自动化构建工具增强你的工作流程[gulp中文官网](http://www.gulpjs.com.cn/)。

<!-- more -->

### gulp简介
首先是 `gulp` 的一些简单介绍：
gulp是基于**nodejs**流的自动化构建工具，可以快速构建项目并减少频繁的I/0操作。你可以利用gulp插件完成各种自动化任务：测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。

#### 安装
安装有两种方式：
1.全局安装`gulp`

```shell
npm install -g -d gulp
```

运行 `gulp -v` ,如果正常打印版本号则安装成功。

2.安装到项目本地
先CD到你的项目根目录

```shell
npm install gulp --save-dev
```
`--save-dev` 保存 `gulp` 到项目依赖文件 `package.json` 的`devDependencies` 里面。

#### 插件
gulp的插件列表可以参考gulp的[插件官网](http://gulpjs.com/plugins/)。

以下是比较常用的插件

* gulp-minify-css 压缩css
* gulp-htmlmin 压缩html
* gulp-uglify 压缩js
* gulp-rename 重命名文件,通常压缩后的带.min后缀
* gulp-jshint jshint,js静态检查
* gulp-concat 合并多个文件
* gulp-imagemin 压缩图片
* gulp-clean 清理文件或目录
* gulp-load-plugins 自动加载插件
* run-sequence 控制任务执行顺序

npm install [plugins-name] --save
上述命令安装插件的同时也会把插件作为项目依赖写入package.json文件.

#### gulp API
##### gulp.src（gobs[, options])
> 输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。 将返回一个 [Vinyl files](https://github.com/gulpjs/vinyl-fs) 的 [stream](https://nodejs.org/api/stream.html) 它可以被 [piped](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options) 到别的插件中。

```js
gulp.src('src/js/*.js') //模糊匹配src/js文件夹下所有js文件
  .pipe( concat('app.js')) //合并后的文件名
  .pipe(gulp.dest('pub/dist/js'));//合并后文件路径
```

gulp.src通配符匹配：
*.js匹配当前目录下的所有js文件,不指名扩展名则匹配所有类型
*/*.js匹配所有**第一层子文件夹**的js文件,第二层请用*/*/.js
**/*.js匹配**所有文件夹层次**下的js文件, 包括当前目录
?匹配文件路径中的一个字符(不会匹配路径分隔符)
[...]匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个.
!匹配任何与括号中给定的任一模式都不匹配的

下面以一系列例子来加深理解：

```
*能匹配 a.js,x.y,abc,abc/,但不能匹配a/b.js
*.*能匹配 a.js,style.css,a.b,x.y
*/*/*.js能匹配 a/b/c.js,x/y/z.js,不能匹配a/b.js,a/b/c/d.js
**能匹配 abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b,能用来匹配所有的目录和文件
**/*.js 能匹配 foo.js,a/foo.js,a/b/foo.js,a/b/c/foo.js
a/**/z能匹配 a/z,a/b/z,a/b/c/z,a/d/g/h/j/k/z
a/**b/z 能匹配 a/b/z,a/sb/z,但不能匹配a/x/sb/z,因为只有单**单独出现才能匹配多级目录
?.js 能匹配 a.js,b.js,c.js
a??能匹配 a.b,abc,但不能匹配ab/,因为它不会匹配路径分隔符
[xyz].js只能匹配 x.js,y.js,z.js,不会匹配xy.js,xyz.js等,整个中括号只代表一个字符
[^xyz].js能匹配 a.js,b.js,c.js等,不能匹配x.js,y.js,z.js
```

##### gulp.dest(path[, options])
> 能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。

```
gulp.src('./client/templates/*.jade') 
  .pipe(jade())
  .pipe(gulp.dest('./build/templates'))
  .pipe(minify())
  .pipe(gulp.dest('./build/minified_templates'));
```

文件被写入的路径是以所给的相对路径根据所给的目标目录计算而来。类似的，相对路径也可以根据所给的 base 来计算。

##### gulp.task(name[, deps], fn)
定义一个使用 [Orchestrator](https://github.com/robrich/orchestrator) 实现的任务（task）。

```
gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
  // 做一些事
});
```
##### gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])
监视文件，并且可以在文件发生改动时候做一些事情。它总会返回一个 EventEmitter 来发射（emit） change 事件。

需要在文件变动后执行的一个或者多个通过 gulp.task() 创建的 task 的名字，

```js
var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

每次变动需要执行的 callback。

```
gulp.watch('js/**/*.js', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

### gulp优化
在**hexo顶层**目录运行以下代码来安装 `gulp` 和插件

```shell
npm install --save-dev gulp gulp-clean gulp-load-plugins gulp-minify-css gulp-htmlmin gulp-imagemin gulp-uglify run-sequence
```

在**hexo顶层**目录下创建 `gulpfile.js` 文件

内容如下

```js
var gulp = require('gulp'),
   plugins = require('gulp-load-plugins')(); //自动插件引用

var Hexo = require('hexo');
var runSequence = require('run-sequence');

// 清除public文件夹
gulp.task("clean",function() {
    return gulp.src("public/*")
    .pipe(plugins.clean());           
});

// 压缩css文件
gulp.task("minify-css",function() {
    return gulp.src(["public/**/*.css","!public/**/*.min.css"])
    .pipe(plugins.minifyCss({compatibility: "ie8"}))
    .pipe(gulp.dest("./public"));      
});

// 压缩js文件
gulp.task("minify-js",function() {
    return gulp.src(["public/**/*.js","!public/**/*.min.js"])
    .pipe(plugins.uglify())
    .pipe(gulp.dest("./public"));
});

// 压缩html文件
gulp.task("minify-html",function() {
    return gulp.src("public/**/*.html")
    .pipe(plugins.htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
    }))
    .pipe(gulp.dest("./public"));
});

// 压缩 public/images 和 /public/uploads目录内图片
gulp.task('minify-images', function() {
    gulp.src(['./public/images/**/*.{png,jpg,gif,ico}','./public/uploads/**/*.{png,jpg,gif,ico}'])
    .pipe(plugins.imagemin({
       optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
       progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
       interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
       multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('./public/uploads'));
});


// 利用Hexo API 来生成博客内容， 效果和在命令行运行： hexo g 一样
var hexo = new Hexo(process.cwd(), {});
gulp.task('generate', function(cb) {
    hexo.init().then(function() {
        return hexo.call('generate', {
            watch: false
        });
    }).then(function() {
        return hexo.exit();
    }).then(function() {
        return cb()
    }).catch(function(err) {
        hexo.exit(err);
        return cb(err);
    })
});

// 利用Hexo API 来发布博客， 效果和在命令行运行： hexo d 一样
gulp.task('deploy', function(cb) {
    hexo.init().then(function() {
        return hexo.call('deploy', {
            watch: false
        });
    }).then(function() {
        return hexo.exit();
    }).then(function() {
        return cb()
    }).catch(function(err) {
        hexo.exit(err);
        return cb(err);
    })
});

// 用run-sequence并发执行，同时处理html，css，js，img
gulp.task('minify', function(cb) {
    runSequence(['minify-html', 'minify-css', 'minify-js', 'minify-images'], cb);
});

// 执行顺序： 清除public目录 -> 产生原始博客内容 -> 执行压缩混淆
gulp.task('build', function(cb) {
    runSequence('clean', 'generate', 'minify', 'deploy', cb)
});

gulp.task('default', ['build']);
```

到这里对 `gulp` 的配置就完成了，只需要每次在执行 `gulp` 就可以生成静态文件并实现发布。

```shell
gulp
```

但是每次都要把 `public` 中的文件都删除，重新生成静态文件并发布会比较慢，先记下这个问题，以后解决。

## hexo备份
### 备份
新建仓库 `blog` 来存储博客原始文件，先看一下哪些文件是必须备份的：
像站点配置 `_config.yml`，主题 `theme`，博客文件 `source`，文章的模板 `caffolds`，安装包 `package.json`， 提交忽略配置 `.gitignore` 这些文件是需要备份的。其它可以不需要，则 `.gitignore` 如下配置(已经配置好了):

```tex
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

直接在博客顶层目录使用以下命令：

```shell
git init
git add -A
git commit -m "first commit"
git remote add origin git@github.com:yourName/blog.git
git push -u origin master
```

这样就把博客备份到仓库中了。
在本地对博客进行修改（添加新博文、修改样式等等）后，通过下面的流程进行备份和发布：

```shell
git add .
git commit -m "..."
git push   #备份
hexo g -d  #发布
```

### 还原
使用 `clone`  拷贝仓库

```
git init 
git clone git@github.com:yourName/blog.git
```

在本地新拷贝的文件夹下通过以下命令：

```
cd blog
npm install #模块安装
hexo s -g  #预览
```

**注**：这里没用 `hexo init` 初始化 此时用了 `hexo init`，则站点的配置文件 `_config.yml` 里面内容会被清空使用默认值，所以**不要用 `hexo init`**。

预览[http://localhost:4000/](http://localhost:4000/)没有问题，就可以使用了。


## 参考链接
[gulp中文官网](http://www.gulpjs.com.cn/)
[优化Hexo博客 - 压缩 HTML、CSS、JS、IMG 等](https://www.karlzhou.com/articles/compress-minify-hexo/)
[hexo api](https://hexo.io/zh-cn/api/index.html)
[知乎 CrazyMilk 和 skycrown 的回答](https://www.zhihu.com/question/21193762)
