<?php
$option=$options;
if(hasFlag('help')){
	 _toLine('getDanmu用于获取弹幕',
			'         <b>getDanmu 视频id');
		exit();
}
header('Content-Type:text/json',true);
if(isID($option[0])){
	$odate=true;
	if(hasFlag('no_date')){
		$odate=false;
	}
	connectSQL();
	Global $SQL;
	$stmt = $SQL->prepare('SELECT id,type,content,time,color,size,date FROM danmu WHERE videoid=?');
	$stmt->bind_param('i', $option[0]);
	$stmt->execute();
	$stmt->bind_result($id,$type,$content,$time,$color,$size,$date);
	$arr=Array();
	for($i=0;$stmt->fetch();$i++){
		if(!($id>=0)){
			echo 'Error';
			errorlog('getDanmu','Get a error danmaku id:'.$id);
			return;
		}
		$dmobj=array();
		$dmobj['id']=$id;
		$dmobj['ty']=$type;
		$dmobj['c']=$content;
		if($time>=0)$dmobj['t']=($time?$time:0);
		if($color)$dmobj['co']=$color;
		if($size)$dmobj['s']=$size;
		if($odate)$dmobj['d']=($date?$date:'0000-00-00');
		array_push($arr,$dmobj);
	}
	if(count($arr)>=0){
		echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	}else{
		echo 'Error';
		errorlog('getDanmu','Unknow error because of:'.$arr);
	}
	$stmt->close();
	$SQL->close();
}else{
	echo '参数错误，输入【getDanmu --help】查看用法';
	errorlog('getDanmu','Error args');
}
exit();
?>