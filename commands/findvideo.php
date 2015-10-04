<?php
needLogin();
if(hasFlag('help')){
	_toLine('findvideo用于通过标题查找视频',
				'     <b>findvideo 标题</b>',
				'此命令使用正则匹配查找，你可以直接输入标题或者一部分，或者使用正则表达式');
	exit();
}
$option = $options;
header('Content-Type:text/html', true);
if (@$option[0]) {
	connectSQL();
	Global $SQL;
	$stmt = $SQL->prepare('SELECT id,title,address,count,coveraddress,description FROM video WHERE title REGEXP ?');
	$stmt->bind_param('s', $option[0]);
	$stmt->execute();
	$stmt->bind_result($id,$title,$address, $count,$coveraddress,$description);
	echo '<table>';
	out('<tr><th>ID</th><th>播放数</th><th>标题</th><th>地址</th><th>封面地址</th><th>描述</th></tr>');
	while($stmt->fetch()){
		out('<tr><td>'.$id.'</td><td>'.$count.'</td><td>'.$title.'</td><td>'.$address.'</td><td>'.$coveraddress.'</td><td>'.$description.'</td></tr>');
	}
	echo '</table>';
	out('查找完毕,共'.$stmt->num_rows.'条');
	$stmt->close();
	$SQL->close();
} else {
	echo '参数错误，输入【findvideo --help】查看用法';
	errorlog('finddanmu','Error args');
}
exit();
?>