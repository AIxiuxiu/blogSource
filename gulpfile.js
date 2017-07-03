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