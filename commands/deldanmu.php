<?php
needLogin();
$option=$options;
header("Content-Type:text/html",true);
if(hasFlag("help")){
    echo "deldanmu用于删除指定id的弹幕\n 		<b>deldanmu 弹幕id [id id id id ....]</b>";
    exit;
}
if(isID($option[0])){
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
	if(mysqli_affected_rows($SQL)!=1){
		out("失败");
	}else{
		out("成功");
	}
	}
	
}else{
	echo "参数错误，输入【deldanmu --help】查看用法";
    exit;
}
exit;
?>