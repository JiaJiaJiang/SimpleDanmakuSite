SelfDanmakuSite
===============

个人弹幕站

===============
原谅我根本不会写着什么mark，所以就很普通的介绍一下了。

食用方法：

	使用git或点下载zip，把此站点弄到你的网站目录去(PHP)
	在网站根目录创建config.php内容如下
	
	<?php
	define("user","用户名");
	define("pass","密码");
	define("sqlUser","数据库用户");
	define("sqlPass","数据库密码");//请定义成字符串
	define("sqlAddress","数据库地址");
	define("dbname","数据库名");
	define("domainname","此站点的域名(或ip)");//这是用来阻止从其他站点直接向这里发起的请求，删除此行表示不阻止
	?>
	
	然后从浏览器打开此站点的管理页面面(/admin/,如http://xxx.xxx.xx/admin/)
	
	接着在下面的命令输入框输入login -u 用户名 -p 密码
	
	然后你可以用help命令查看帮助，包括使用方法。