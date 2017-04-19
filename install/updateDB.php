<?php
needLogin();
if(hasFlag('help')){
	_toLine('updateDB用于进行后续更新对数据库的修改',
			'    <b>updateDB</b>',
			'使用前请确定数据库已存在,且备份完成',
			'本来已有数据不会被改动');
		exit();
}
Global $SQL;
$addcol=array(
	'danmu'=>array(

	),
	'video'=>array(
		'coveraddress'=>'varchar(500) DEFAULT NULL',
		'description'=>'varchar(600) DEFAULT NULL',
		'options'=>'varchar(1000) DEFAULT NULL',
	)
);

$dbstruct=array(
	'danmu'=>array(
		'id'=>"`id` bigint(20) NOT NULL AUTO_INCREMENT",
		'videoid'=>"`videoid` bigint(20) unsigned NOT NULL",
		'type'=>"`type` int(11) DEFAULT '0'",
		'content'=>"`content` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL",
		'time'=>"`time` bigint(11) DEFAULT '0'",
		'color'=>"`color` varchar(9) DEFAULT NULL",
		'size'=>"`size` tinyint(6) DEFAULT NULL",
		'date'=>"`date` date DEFAULT '0000-00-00'",
	),
	'video'=>array(
		'id'=>"`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT",
		'title'=>"`title` text NOT NULL",
		'address'=>"`address` varchar(500) NOT NULL",
		'count'=>"`count` bigint(10) unsigned NOT NULL DEFAULT '0'",
		'coveraddress'=>'`coveraddress` varchar(500) DEFAULT NULL',
		'description'=>'`description` varchar(600) DEFAULT NULL',
		'options'=>'`options` varchar(1000) DEFAULT NULL',
	)
);

Global $SQL;
connectSQL();
out('更新数据库');
out('检查新字段');
foreach($addcol as $tablename =>$tablestruct){
	foreach($tablestruct as $column => $setting){
		if($tablename&&!ColumnExists($tablename,$column)){
			out("在 $tablename 表添加字段 $column");
			//addcolumn($tablename,$column);
			$SQL->query("alter table $tablename add $column ".$addcol[$tablename][$column]);
		}
	}
}
//修改字段
foreach ($dbstruct as $tablename => $tablestruct) {
	out("确认表$tablename");
	foreach ($tablestruct as $column => $setting) {
		out("确认字段$column:$setting");
		$SQL->query("alter table `$tablename` change `$column` $setting");
	}
}
out('数据库更新结束');
//$SQL->close();
?>
