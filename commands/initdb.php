<?php
needLogin();
if(hasFlag('help')){
	_toLine('initdb用于初始化数据库',
			'    <b>initdb</b>',
			'使用前请在config.php中配置好有关数据库的参数',
			'首次出现失败请尝试再次执行此命令',
			'数据库和数据表已存在时不会覆盖数据');
		exit();
}
Global $SQL;
connectSQL();
out('初始化弹幕数据库');
out('如果数据库不存在将创建之');
if(!dbname){
	out('<b class="red">错误：没有在config.php里设置数据库名</b>');
	exit();
}
if($SQL->query('CREATE DATABASE  IF NOT EXISTS `'.dbname.'`')===true){
	out('<b class="green">成功</b>');
}else{out('<b class="red">失败</b>');};
out('开始创建弹幕数据表');
if($SQL->query("CREATE TABLE IF NOT EXISTS `".dbname."`.`danmu` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`videoid` bigint(20) unsigned NOT NULL,
	`type` int(11) DEFAULT '0',
	`content` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
	`time` bigint(11) DEFAULT '0',
	`color` varchar(9) DEFAULT NULL,
	`size` tinyint(6) DEFAULT NULL,
	`date` date DEFAULT '0000-00-00',
	PRIMARY KEY (`id`,`videoid`),
	UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=397")===true){
	out('<b class="green">成功</b>');
}else{out('<b class="red">失败</b>');};
out('开始创建视频数据表');
if($SQL->query("CREATE TABLE IF NOT EXISTS `".dbname."`.`video` (
	`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
	`title` text NOT NULL,
	`address` mediumtext NOT NULL,
	`count` bigint(10) unsigned NOT NULL DEFAULT '0',
	`coveraddress` mediumtext DEFAULT NULL,
	`description` mediumtext DEFAULT NULL,
	`options` mediumtext DEFAULT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ")===true){
	out('<b class="green">成功</b>');
}else{out('<b class="red">失败</b>');};
out('初始化结束');
$SQL->close();
exit();
?>
