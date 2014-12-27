<?php
needLogin();
$option=$options;
header("Content-Type:text/html",true);
if(hasFlag("help")){
    echo "deldanmu用于删除指定id的弹幕\n 		<b>deldanmu 弹幕id [id id id id ....]</b><br>id参数支持范围值，如\"50-100\"。<br>示例:deldanmu 1 2 3 4 9-20 50 51 56-100";
    exit;
}
if(@$option[0]){
	connectSQL();
	Global $SQL;
	$count=count($option);
	$idstr='';
	for($i=0;$i<$count;$i++){
		if(isID($option[$i])){
			$idstr.=$option[$i];
		}else{
			if(preg_match("/^(\d+)\-(\d+)$/",$option[$i],$ids)){
				$startid=intval($ids[1]);
				$endid=intval($ids[2]);
				if($startid<=$endid){
					for(;$startid<=$endid;$startid++){
						$idstr.=$startid;
						if($startid!=$endid)$idstr.=',';
					}
				}
			}
		}
		if($i!=$count-1){
			$idstr.=',';
		}
	}
	out("尝试删掉弹幕:".$idstr);
	$SQL->query("DELETE FROM `danmu` WHERE `id` in (".$idstr.")");
	out('完成');
	out('删除了'.mysqli_affected_rows($SQL).'行');
}else{
	echo "参数错误，输入【deldanmu --help】查看用法";
	errorlog("deldanmu","Error args");
    exit;
}
exit;
?>