<?php
needLogin();
global $args;
header('Content-Type:text/html', true);
if(hasFlag('help')){
	_toLine('editvideo用于修改视频',
				'    <b>editvideo -id 视频id 其他参数</b>',
				'    -t 视频标题',
				'    -url 视频地址',
				'    -cv 封面地址',
				'    -des 视频描述','',
				't(标题),url(视频源),cv(封面地址),des(视频描述)参数至少需要一个',
				'此命令不能改id和播放数');
	exit();
}
if (isID(@$args['id'])) {
	connectSQL();
	Global $SQL;
	out('将对视频做以下改动');
	if(@$args['t']){
		out('重命名');
		$stmt = $SQL->prepare('UPDATE  `video` SET  `title` = ? WHERE  `video`.`id` =?');
		$stmt->bind_param('si',$args['t'],$args['id']);
		$stmt->execute();
		out('重命名结束:'.($stmt->affected_rows==1?'成功:'.$args['t']:'失败'));
	}
	if(@$args['url']){
		out('更新地址');
		$stmt = $SQL->prepare('UPDATE  `video` SET  `address` = ? WHERE  `video`.`id` =?');
		$stmt->bind_param('si',$args['url'],$args['id']);
		$stmt->execute();
		out('地址更新结束:'.($stmt->affected_rows>=1?'成功:'.$args['url']:'失败'));
	}
	if(@$args['cv']){
		out('更新封面地址');
		$stmt = $SQL->prepare('UPDATE  `video` SET  `coveraddress` = ? WHERE  `video`.`id` =?');
		$stmt->bind_param('si',$args['cv'],$args['id']);
		$stmt->execute();
		out('封面地址更新结束:'.($stmt->affected_rows>=1?'成功:'.$args['cv']:'失败'));
	}
	if(@$args['des']){
		out('更新描述');
		$stmt = $SQL->prepare('UPDATE  `video` SET  `description` = ? WHERE  `video`.`id` =?');
		$stmt->bind_param('si',$args['des'],$args['id']);
		$stmt->execute();
		out('描述更新结束:'.($stmt->affected_rows>=1?'成功:'.$args['des']:'失败'));
	}
	$stmt->close();
	//$SQL->close();
} else {
	echo '参数错误，输入【editvideo --help】查看用法';
	errorlog('editvideo','Error args');
}
exit();
?>