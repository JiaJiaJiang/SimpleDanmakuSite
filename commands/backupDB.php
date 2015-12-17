<?php
needLogin();
if (hasFlag('help')) {
	_toLine('backupDB用于备份数据库',
			'	<b>backupDB</b>\n如果成功，将会保存一个sql文件在backup文件夹，此文件夹已被.htaccess保护',
			'        <b>--output            写入磁盘后再输出到浏览器</b>');
	exit();
}
$output = false;
if (hasFlag('output')) $output = true;
global $args;
header('Content-Type:text/html', true);
connectSQL();
Global $SQL;
$filename = date('Y-m-d_H-i-s') . '-' . dbname . '.sql';
$dbname = dbname; //数据库名称
// 摘自http://www.oschina.net/codesnippet_105637_14996并小作修改，我不保证可靠性
out('本命令无法保证可靠性，请尽量使用专业的数据库工具进行备份。');
out('开始备份');
//$SQL->query('set names 'utf8'');
$mysql = 'set charset utf8;'.PHP_EOL;
$q1 = $SQL->query('show tables');
$filepath=sys_get_temp_dir().DIRECTORY_SEPARATOR.$filename;
while ($t = $q1->fetch_array()) {
	$table = $t[0];
	out('数据表' . $table);
	$q2 = $SQL->query("show create table `$table`");
	$sqlresult = $q2->fetch_array();
	$mysql.= $sqlresult['Create Table'] . ';'.PHP_EOL;
	$q3 = $SQL->query('select * from '.$table);
	$fieldsnum = $q3->field_count;
	$keys = array();
	for ($i = 0; $i < $fieldsnum; $i++) {
		array_push($keys, $q3->fetch_field_direct($i)->name);
	}
	$keys = array_map('addslashes', $keys);
	$keys = join('`,`', $keys);
	$keys = '`' . $keys . '`';
	$mysql.= "insert into `$table` ($keys) values".PHP_EOL;
	while ($data = mysqli_fetch_assoc($q3)) {
		$vals = array_values($data);
		$vals = array_map('addslashes', $vals);
		$vals = join('","', $vals);
		$vals ="\"$vals\"";
		$mysql.= "($vals),".PHP_EOL;
	}
	$mysql = rtrim($mysql,PHP_EOL.','); //移除多出的逗号
	$mysql.= ';'.PHP_EOL; //加个分号
	
}
$fp = fopen($filepath, 'w');
fputs($fp, $mysql);
fclose($fp);
if ($output) {
	out('--------------------------------------------------------------------------------------------\n' . $mysql . '\n--------------------------------------------------------------------------------------------');
}
out('数据备份成功，文件:'.$filepath);
//$SQL->close();
exit();
?>
