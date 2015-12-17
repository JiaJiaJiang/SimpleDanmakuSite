<?php
needLogin();
if(hasFlag("help")){
	_toLine('listdanmu用于列出指定视频的所有弹幕',
			'   <b>listdanmu 视频id [其他选项]</b>',
			'   --d 倒序显示',
			'     -l 显示的弹幕数量');
		exit();
}
$option=$options;
header("Content-Type:text/json",true);
if(isID($option[0])){
	connectSQL();
	Global $SQL;
	Global $args;
	global $flags;
	if(array_key_exists("l",$args)){
		if(!isID($args["l"])){
				out("l参数值有误");
				exit();
		}
	}
	$SS="SELECT id,videoid,type,content,time,color,size,date FROM danmu WHERE videoid=?";
	$SS.=(in_array("d",$flags)?" order by id DESC":"").(array_key_exists("l",$args)?" limit 0,".$args["l"]:"");
	$stmt = $SQL->prepare($SS);
	$stmt->bind_param("i", $option[0]);
	$stmt->execute();
	$stmt->bind_result($id,$videoid,$type,$c,$time,$color,$size,$date);
	echo "<table>";
	out("<tr><th>ID</th><th>视频ID</th><th>弹幕类型</th><th>时间</th><th>颜色</th><th>大小</th><th>日期</th><th>内容</th></tr>");
	while($stmt->fetch()){
		out("<tr><td>".$id."</td><td>".$videoid."</td><td>".$type."</td><td>".$time."</td><td>".$color."</td><td>".$size."</td><td>".$date."</td><td>".$c."</td></tr>");
	}
	echo "</table>";
	out("查找完毕,共".$stmt->num_rows."条");
	$stmt->close();
	//$SQL->close();
}else{
	echo "参数错误，输入【listdanmu --help】查看用法";
	errorlog("listdanmu","Error args");
}
exit();
?>