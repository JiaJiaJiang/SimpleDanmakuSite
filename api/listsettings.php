<?php
needLogin();
if(hasFlag('help')){
	_toLine('listsettings用于查看视频独立设置',
			'   <b>listsettings 视频id</b>');
	exit();
}
$option = $options;
header('Content-Type:text/html', true);
if (isID(@$option[0])) {
	connectSQL();
	Global $SQL;
	$stmt = $SQL->prepare('SELECT options  FROM `'.dbname.'`.`video` WHERE id='.$option[0].';');
	$stmt->execute();
	$stmt->bind_result($videosetting);
	$stmt->fetch();
	if(!is_null($videosetting)){
		$videosetting=json_decode($videosetting,true);
		if(is_null($videosetting)){
			$videosetting=array();
		}elseif(!is_array($videosetting)){
			$videosetting=array();
		}  
	}else{
		out('无设置');
		exit();
	}
	foreach ($videosetting as $name => $value) {
		out("$name:$value");
	}
	$stmt->close();
	//$SQL->close();
} else {
   echo '参数错误，输入【listsettings --help】查看用法';
   errorlog('listsettings','Error args');
	exit();
}
exit();
?>