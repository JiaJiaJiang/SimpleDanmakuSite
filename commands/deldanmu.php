<?php
needLogin();
$option=$options;
header("Content-Type:text/html",true);
if(hasFlag("help")){
    echo "deldanmu用于删除指定id的弹幕\n 		<b>deldanmu 弹幕id [id id id id ....]</b><br>对删除弹幕是否成功的判定还存在问题，所以显示出来的结果不一定是真的";
    exit;
}
if(isID(@$option[0])){
	connectSQL();
	Global $SQL;
	$count=count($option);
	for($i=$count;$i--;){
		if(!isID($option[$i]))continue;
		$stmt = mysqli_stmt_init($SQL);
	mysqli_stmt_prepare($stmt, "DELETE FROM `danmu` WHERE `id` = ?");
	mysqli_stmt_bind_param($stmt, "i", $option[$i]);
	 mysqli_stmt_execute($stmt);
      out("尝试删掉弹幕:".$option[$i]);
	if(mysqli_affected_rows($SQL)==1){
		out($option[$i].":成功");
		errorlog("deldanmu","Failed to delete danmaku".$option[$i]);
	}else{
		out($option[$i].":失败");
	}
	}
	
}else{
	echo "参数错误，输入【deldanmu --help】查看用法";
	errorlog("deldanmu","Error args");
    exit;
}
exit;
?>