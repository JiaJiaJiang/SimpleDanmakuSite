<?php
needLogin();
?><h4>弹幕控制台帮助</h4>
<h2 class="green">首次使用先执行一次【initdb】命令来创建数据库</h2>

<h4>命令说明</h4>
1.命令由commands文件夹里的php文件组成，命令即文件名。
2.由于命令需要经过网络传输给服务器，所以请尽量确保登录时的网络环境安全,バカ佳佳没有做加密。
3.如果参数里包含除了字母和数字以外的其它字符(如：中文、标点、其它符号、空格等)，请一定要给这个参数包上一对`号，以免发生不必要的后果。
例：
		<b>addvideo -t `我感受到了来自佳佳深深的恶意눈_눈` -url `http://blog.luojia.me/.....`</b>

4.使用【命令  --help】可以看到该命令的用法，但并不是所有命令都写了用法
例：
		<b>adddanmu --help</b>
		
5.命令是异步的，你可以在结果返回前发送另一条命令。

控制台内置命令：
	clear				清空
	echo				输出字符串
	vinfoframe			获取某id视频的视频信息页面iframe代码

默认服务器命令：(【】中的内容代表适合用在何处)
	adddanmu			【播放器】添加一条弹幕(不建议在控制台使用)
	addvideo			【控制台】添加视频记录
	backupDB			【控制台】备份数据库
	cacheplugins			【控制台】合并(更新)插件到缓存文件
	clearplaycount			【控制台】清除指定id视频的播放数
	cleardanmu			【控制台】清除某个视频的所有弹幕
	commands			【控制台】显示所有命令
	deldanmu			【控制台】使用id删除弹幕
	delvideo			【控制台】删除视频
	editvideo			【控制台】修改视频信息
	findvideo			【控制台】查找视频
	finddanmu			【控制台】使用正则查找弹幕（谨慎使用
	getDanmu			【播放器】获取json格式弹幕表
	getVideo			【播放器】获取视频地址和播放数
	help 				【控制台】查看帮助
	initdb				【控制台】初始化数据库(表) 
	listdanmu			【控制台】列出指定视频的所有弹幕       
	login 				【控制台】登录(无help)
	teststr				【控制台】测试命令到服务器后是什么样子(无help)
	updateDB			【控制台】升级数据库

`号的使用:
`号在这里用来区分包含空格的参数和转换内部字符到服务器可以识别的状态
`号也可以防止-和--开头的参数被识别成参数名和标记
`号在普通键盘上的ESC键下面，大概长这个样：<div style="display: inline-block;border: 1px solid #fff;width: 40px;height: 40px;line-height: 20px;font-size: 20px;padding: 5px;">~<br>`</div>
如果出现这样【命令 `lala sdad asdah aklsdhf a什么的】的情况，将会把从`号开始的所有字符当作一个参数转义，你可以在发送命令前用【echo `你要发的命令`】来预览将会发给服务器的转义后命令
也可以用teststr命令代替原命令查看服务器接收到的具体参数

<span class="red">所有命令均无再次确认过程和撤销技能，所以请不要手滑</span>

如果使用过程中出现什么问题(除了不会用命令)，可以发送问题(越详细越好，标题包含“弹幕播放器”)到<a href="mailto:luojia@luojia.me">luojia@luojia.me</a>,或者在<a target="_blank" href="http://luojia.me">我的博客</a>的相关地方留言
