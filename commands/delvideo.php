<?php
needLogin();
$option = $options;
global $args;
if(hasFlag('help')){
	_toLine('addvideo用于删除视频',
				'          <b>delvideo 视频id</b>');
	exit();
}
header('Content-Type:text/html', true);
if (isID($option[0])) {
	connectSQL();
	Global $SQL;
	out('删除视频：'.$option[0]);
	$stmt = $SQL->prepare('DELETE FROM `'.dbname.'`.`video` WHERE `video`.`id` = ?');
	$stmt->bind_param('i',$option[0]);
	$stmt->execute();
	out('尝试删除视频'.$option[0]);
	if($stmt->affected_rows!=1){
		out('失败');
		errorlog('deldanmu','Failed to delete video:'.$option[0]);
	}else{
		out('成功');
	}
	out('开始清空视频'.$option[0].'的弹幕');
	$stmt = $SQL->prepare('DELETE FROM `danmu` WHERE `videoid` =?');
	$stmt->bind_param('i',$option[0]);
	$stmt->execute();
	echo '已清空ID'.$option[0].'的弹幕，共'.$stmt->affected_rows.'条';
	$stmt->close();
	$SQL->close();
} else {
   echo '参数错误，输入【delvedio --help】查看用法';
   errorlog('delvideo','Error args');
	exit();
}
exit();
?>