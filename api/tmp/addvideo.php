<?php
needLogin();
if(hasFlag('help')){
	_toLine('addvideo用于添加视频',
				'  <b>addvideo 参数</b>',
				'    -t 视频标题',
				'    -url 视频地址',
				'    -cv 封面地址',
				'    -des 视频描述');
	exit();
}
global $args;
header('Content-Type:text/html', true);
if (@$args['t']&&@$args['url']) {
	connectSQL();
	Global $SQL;
	$cv=@$args['cv']?$args['cv']:NULL;
	$des=@$args['des']?$args['des']:NULL;
	if(!array_key_exists('des',$args)){
		$args['des']=NULL;
	}
	$stmt = $SQL->prepare('INSERT INTO  `'.dbname.'`.`video` (`id` ,`title` ,`address` ,`coveraddress`,`description`,`count`) VALUES (NULL ,?,?,?,?,0);');
	$stmt->bind_param('ssss',$args['t'], $args['url'],$cv,$des);
	$stmt->execute();
	out('已尝试添加,获取的视频id:'.$SQL->insert_id);
	out('标题:'.$args['t']);
	out('视频地址:'.$args['url']);
	out('封面地址:'.($cv?$cv:'无'));
	out('描述:'.($des?$des:'无'));
	$stmt->close();
	//$SQL->close();
} else {
   echo '参数错误，输入【addvideo --help】查看用法';
   errorlog('addvideo','Error args');
	exit();
}
exit();
?>