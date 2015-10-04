<?php
needLogin();
if(hasFlag('help')){
	_toLine('updateDB用于进行后续更新对数据库的修改',
			'    <b>updateDB</b>',
			'使用前请确定数据库已存在',
			'本来已有数据不会被改动');
		exit();
}
Global $struct; 
$struct=array(
	'danmu'=>array(

	),
	'video'=>array(
		'coveraddress'=>'mediumtext DEFAULT NULL',
		'description'=>'mediumtext DEFAULT NULL',
		'options'=>'mediumtext DEFAULT NULL',
	)
);
function addcolumn($table,$column){
	Global $SQL;
	Global $struct; 
	$SQL->query('alter table $table add $column '.$struct[$table][$column]);
		//out(mysqli_affected_rows($SQL));
}
Global $SQL;
connectSQL();
out('更新数据库');
foreach($struct as $tablename =>$tablestruct){
	foreach($tablestruct as $column => $setting){
		if($tablename&&!ColumnExists($tablename,$column)){
			out("在 $tablename 表添加字段 $column");
			addcolumn($tablename,$column);
		}
	}
}
out('数据库更新结束');
$SQL->close();
?>
