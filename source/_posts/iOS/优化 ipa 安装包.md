---
title: 优化 ipa
date: 2017-07-05 11:30:34
categories:
- iOS
tags:
- ios
- ipa
---
# 优化 ipa 安装包
下面介绍了 `iOS` 优化 `ipa` 安装包大小的几种方法。

## 配置编译选项 
### Generate Debug Symbols 
`Generate Debug Symbols` 这个设置在 `Debug` 和 `Release` 下 均默认为 YES。
当 `Generate Debug Symbols` 设置为 `Yes` 时，编译产生的 `.o` 文件会大一些，当然最终生成的可执行文件也大一些。
当 `Generate Debug Symbols` 设置为 `No` 的时候，在 `Xcode` 中设置的断点不会中断，同样生成的 `ipa` 安装包也会小一些。
<!-- more -->
![屏幕快照 2017-08-14 下午4.36.43](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-08-14 下午4.36.43.png)

### 舍弃架构armv7
armv7用于支持4s和4，4s是2011年11月正式上线，虽然还有小部分人在使用，但是追求包体大小的完全可以舍弃了。
![屏幕快照 2017-08-14 下午4.44.52](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-08-14 下午4.44.52.png)

### Dead Code Stripping
`build setting` 里 `DEAD_CODE_STRIPPING` = `YES`（默认就是 `YES` ）。 确定 `dead code`（代码被定义但从未被调用）被剥离，去掉冗余的代码，即使一点冗余代码，编译后体积也是很可观的。
![屏幕快照 2017-08-14 下午4.33.30](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-08-14 下午4.33.30.png)

### 编译器优化级别
`Build Settings` -> `Optimization Level` 有几个编译优化选项，`release` 版应该选择 `Fastest, Smalllest[-Os]`，这个选项会开启那些不增加代码大小的全部优化，并让可执行文件尽可能小。

![屏幕快照 2017-08-14 下午4.35.55](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-08-14 下午4.35.55.png)

### 去除符号信息
`Strip Debug Symbols During Copy` 和 `Symbols Hidden by Default ` 在`release` 版本应该设为 `yes`，可以去除不必要的调试符号。
`Symbols Hidden by Default` 会把所有符号都定义成”private extern”，设了后会减小体积。

![屏幕快照 2017-08-14 下午4.39.09](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-08-14 下午4.39.09.png)
![屏幕快照 2017-08-14 下午4.39.34](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-08-14 下午4.39.34.png)

### Strip Linked Product
DEBUG下设为NO，RELEASE下设为YES，用于RELEASE模式下缩减app的大小
![屏幕快照 2017-08-14 下午4.42.57](http://oimhz3xpl.bkt.clouddn.com/屏幕快照 2017-08-14 下午4.42.57.png)

## 其他
### 去除无用的三方库、代码、readme
删除项目中无用的文件，如被弃用的类、第三方库等，有些文件在项目中文件中，但是没有添加到项目中，这时需要到项目文件中去看。我就有很多添加到项目中却没使用的文件。

### 图片
1.将图片加入到 `Assets.xcassets` 中。打包后在 `ipa` 中会生成 `Assets.car` 文件来存储 `Assets.xcassets` 中的图片，并且文件大小方面也大大降低。

2.删除不需要的图片
查找 iOS 工程无用图片资源工具 [LSUnusedResources](https://github.com/tinymind/LSUnusedResources)

使用方法
> 点击 Browse.. 选择一个文件夹；
> 点击 Search 开始搜索；
> 等待片刻即可看到结果。

3.压缩图片
基于Mac的图像“瘦身”软件 [imageoptim](https://imageoptim.com/)

一些比较大体积的背景图片压缩成.jpg格式, `imageoptim` 可优化jpg格式的图片

因为 `xcode` 里的工程配置，`Compress PNG Files` 是 `YES` 的，会对 `png` 的图片进行压缩，这时使用 `imageoptim` 压缩之后，不会减小 `ipa` 大小。

## 参考链接
[iOS 优化ipa包，减小安装包大小](http://www.jianshu.com/p/a49d59b01669)
[ipa文件“减肥”初探](http://www.jianshu.com/p/a72d03e92c80)

