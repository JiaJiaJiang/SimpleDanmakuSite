<?php
needLogin();
$option = $options;
header('Content-Type:text/html', true);
if(hasFlag('help')){
	_toLine('clearplaycount用于清空指定视频播放数',
			'         <b>clearplaycount 视频id</b>');
	exit();
}
if (isID($option[0])) {
	connectSQL();
	Global $SQL;
	out('清零视频'.$option[0].'的播放数');
	$stmt = $SQL->prepare('UPDATE  `video` SET  `count` = 0 WHERE  `video`.`id` =?');
	$stmt->bind_param('i',$option[0]);
	$stmt->execute();
	if($stmt->affected_rows==1){
		out ('已清零');
	}else{
		out( '失败');
		errorlog('clearplaycount','Error to clear danmakus whose videoid='.$option[0]);
	}
	$stmt->close();
	//$SQL->close();
} else {
	echo '参数错误，输入【editvideo --help】查看用法';
	errorlog('clearplaycount','Err args');
}
exit();
?>