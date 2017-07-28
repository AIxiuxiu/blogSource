---
title: 修改AppStore中的公司名称
date: 2017-06-6 14:36:02
categories:
- iOS
tags:
- ios
- AppStore
---

# 修改AppStore中的公司名称
公司更改了名字，所以appstore里的开发商名称需要更改，现在改好了，把过程记录一下，并不一定是最正确的方法。

## 代理人(agent)
苹果客服必须确认你是**苹果开发者账号代理人**，才会给你修改。
如果你不知道这个代理人是谁，或者这个代理人已经离职，而你拥有这个开发者账号和密码，那么登陆 `Developer` 打开 `Membership` 就能看见代理人是谁。
<!-- more -->
![agent](http://oimhz3xpl.bkt.clouddn.com/agent.png)

如果已经离职，你可以修改代理人信息，但是还要和代理人认证，所以直接对苹果客服声称自己就是代理人就即可。也可以添加管理员然后更换代理人。

## 更改名称
### 联系苹果客服
拨打苹果开发者(中国)电话 400-670-1855 告诉客服你要更改公司名称，必须要说你是代理人。或者用代理人的邮箱直接写邮件：“我需要更改公司名称”发送到 chinadev@asia.apple.com。

然后客服会给你发一封邮件，邮件中包括需要你提供的信息和邓白氏的联系方式。

```tex
您好：

感谢您对开发者计划的支持。我是XXX，很高兴为您服务。

请回复此电子邮件并提供以下信息，以协助我们处理您的申请：

1) 您原来组织的中英文名称是什么？
2) 您原来的组织是否有应用在 App Store 上发布或处于审核状态？
3) 您请求更新是否是因为您的应用或原来的组织已被收购？如果是，请回答以下问题：
     • 只有应用被收购？还是组织也被收购？
     • 组织被全盘收购？还是其中的某些部门被收购？
     • 原来的组织仍在运营？还是已经解散？
4) 您的新组织的中英文名称是什么？
5) 您的新组织的地址和电话号码是什么（如果原来的地址和电话号码已更改）？
6) 您的组织是否具有新的法人实体类型（例如 LLC）？
7) 您的组织是否有新的“税务登记号”？如果有，请提供该编号。

如果我们需要其他文件来验证此变更，我们将通知您。
如果贵组织有 D-U-N-S 编号，建议您发送电子邮件至 D&B，以确认您的档案处于最新状态：

Dun & Bradstreet 全球支持部门
appdeveloper@dnb.com
```
如果你需要更该英文名称，你需要联系邓白氏，因为一个公司只有一个邓白氏编码，为了保证，你现在的新名称公司将沿用之前的邓白氏码。

### 联系邓白氏
发送邮件到 appdeveloper@dnb.com，邮件内容是你需要修改的信息，并且一定要备注下：“请下单到中国邓白氏”！

```tex
公司名称需要做一下更改：
1.XXXX技术有限公司改为“xxxx有限公司”
2.xxxx Technology Co., Ltd.改为"xxxx Co., Ltd.”
备注：“请下单到中国邓白氏”
```
然后会收到苹果邓白氏的回复，大概如下：

```tex
Thank you for submitting your D-U-N-S Number request / update to D&B. 
It should be completed by 07/05/2017, or sooner.

Your request id is: 100000-100000. 

A D&B representative may be contacting you directly.  
Your cooperation will help to expedite the resolution of this request.

Please contact applecs@dnb.com if you have any questions.
```

然后差不多第二天华夏邓白氏会联系你进行公司的信息核实。

```tex
您好，
 
我们是上海华夏邓白氏，现收到您在苹果网站提交的申请，在给到编码之前我们需要核实信息，原订单有给到编码是属于XXXX技术有限公司，若您不是该公司请不要使用编码，我们核实好信息后，系统会发送正确的编码给到您，拨打座机02988993783，该订单是6/28 到期，请最晚于6/28 下午1点前回复邮件，若不能及时取得联系，该订单只能无法确认处理了，谢谢
 
以下是需要核实的内容
 
公司的注册名字 中英文
公司若更过注册名字，请写出之前名字
公司的实际办公地址及邮编（邮编请写详细的）  中英文
公司电话（请与办公地址的城市保持一致）
公司有无分公司或办事处
公司有无英文缩写或简称，有请写出
公司企业性质（营业执照上的公司类型）
公司大致的员工人数
公司主营业务(一个最主要的业务)
贵公司苹果项目负责人的名字，职务，性别，联系电话
```

回复之后等待回复，下面是华夏邓白氏回复的信息

```tex
稍后办理好，24小时内系统会自动发编码到苹果注册邮箱内，最晚14个工作日编码才能使用。
若着急使用，可以在一周后尝试，但请注意尝试次数不要超过3次，超过次数编码会被锁住，
解锁及注册方面问题请找苹果客服，电话：4006701855
注：包含邓白氏编码的邮件是由系统自动发送的，里面的信息是当时您自己在苹果网站上提交的原始信息，并不是核实好的内容。
由于使用编码时需要再次填写公司信息，请和今天核实好的公司名字与地址保持一致。
```

最后收到苹果发来的邓白氏编码，就说明已将更新完成了。

```tex
Your D-U-N-S Number request/update submitted on 6/21/2017 with ID Number 1000000-100000 has been completed.  
You may start using your number in 14 days.

D-U-N-S Number: 111111111

Resolution Description: Match Found via host investigation, host database updated

The following information was submitted as part of your request:
Business Name: xxxx co., LTD
City: xx
Country: xxxx

Thank you for using D&B's Mini Investigation Service.
```

邮件会附带你公司之前的信息，而且说明最晚14天之后才会更新到苹果的数据库。这我也不知道如何去查询是否已更新。我是等了一个星期，然后使用 [D-U-N-S Number look up tool](https://developer.apple.com/enroll/duns-lookup/) 工具来查询的。
更新之后就可以给苹果客服回复了(也就是第一封邮件)，所以如果要更新邓白氏最好新联系邓白氏，然后再联系苹果客服。

之后苹果会让你将你公司的营业执照以及公司变更名称证明发送给他。

```tex
您好：

我们负责跟进您对于更新帐户中所示公司名称的请求。

关于您的请求，我们需要更进一步的信息。我已经开通您的上传功能。
请您尝试使用以下的链接上传贵公司的营业执照以及公司变更名称证明：

https://developer.apple.com/contact/file-upload/

我们建议您使用 Apple 的 Safari 浏览器。请注意档案大小不可超过 5MB。
我们接受以下档案类型：JPG、PNG、TIFF、以及 PDF。

上传后请您回复此邮件。

请使用 Safari 浏览器来上载您的文件。

若您只是需要更新您的英文公司名称，请直接联系 Dun & Bradstreet (D&B)，并请求更新您的 D&B 档案：

Dun & Bradstreet 全球支持部门

appdeveloper@dnb.com

在他们确认已更新您的英文公司名称后，请回复此电子邮件。

请注意，我们最长可能需要 14 个工作日才能从 D&B 收到更新后的公司名称并在我们的系统中进行更新。

如果您有任何问题或需要进一步的帮助，欢迎与我们联系。
我们的办公时间是北京时间周一至周五，09:00 至 17:00，电话号码是 4006 701 855。
当您来电时请告知我们案例编号: 10000000000 以便我们可以快速的找到您的申请。
```
上传证明之后一两天就会把公司名称改过来。

看到这好像更改英文名称只需要联系邓白氏，更改 appstore 里的中文名称才需要联系苹果开发者。

## 参考链接
[如何修改AppStore中的公司名称](http://www.jianshu.com/p/1d2262f69a6a)
