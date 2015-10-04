<?php
needLogin();
$option = $options;
header('Content-Type:text/html', true);
if(hasFlag('help')){
	_toLine('cleardanmu用于清空指定视频的所有弹幕',
			'	<b>cleardanmu 视频id</b>');
	exit();
}
if (isID($option[0])) {
	connectSQL();
	Global $SQL;
	out('开始清空视频'.$option[0].'的弹幕');
	$stmt = $SQL->prepare('DELETE FROM `danmu` WHERE `videoid` =?');
	$stmt->bind_param('i',$option[0]);
	$stmt->execute();
	echo '已清空ID'.$option[0].'的弹幕，共'.$stmt->affected_rows.'条';
	$stmt->close();
	$SQL->close();
} else {
	echo 'cleardanmu --help】查看用法';
	errorlog('cleardanmu','Error args');
}
exit();
?>