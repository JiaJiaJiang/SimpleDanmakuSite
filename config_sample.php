<?php
//管理
define('user','用户名');
define('pass','密码');
//define('secret','动态密码秘钥');//可选定义两步验证秘钥

//数据库
define('dbHost','数据库地址');
define('dbUser','数据库用户名');
define('dbPass','数据库密码');
//define("dbUnixSocket","数据库unix socket地址");//和dbHost二选一
define("dbName","数据库名");
//define("dbPort",3306);//端口，注释即为默认

//日志
define("errorLog",false);//是否记录错误日志
define("warnLog",false);//是否记录警告
//define("logPath",'');//记录日志的目录，注释掉即使用系统临时目录/simpleDanmakuSite/

//数据
define('allowedDanmakuSize',array(20,24,36));//允许提交的弹幕大小，不定义为不限制

//开发用
//define('dev',true);

/*
//可定义requestControl函数来决定是否允许该请求访问api，比如是否来自同域
function requestControl(){
	return true||false;
}*/
?>
