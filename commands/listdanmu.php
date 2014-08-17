<?php
needLogin();
if(hasFlag("help")){
    echo "listdanmu用于列出指定视频的所有弹幕\n        <b>adddanmu 视频id 弹幕类型 内容 所在时间 颜色 大小</b>";
    exit;
}
$option=$options;
header("Content-Type:text/json",true);
if(isID($option[0])){
	connectSQL();
	Global $SQL;
	$stmt = mysqli_stmt_init($SQL);
	mysqli_stmt_prepare($stmt, "SELECT id,videoid,type,content,time,color,size,date FROM danmu WHERE videoid=?");
	mysqli_stmt_bind_param($stmt, "i", $option[0]);
	 mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $id,$videoid,$type,$c,$time,$color,$size,$date);
     echo "<table>";
            out("<tr><th>ID</th><th>视频ID</th><th>弹幕类型</th><th>时间</th><th>颜色</th><th>大小</th><th>日期</th><th>内容</th></tr>");
        while(mysqli_stmt_fetch($stmt)){
            out("<tr><td>".$id."</td><td>".$videoid."</td><td>".$type."</td><td>".$time."</td><td>".$color."</td><td>".$size."</td><td>".$date."</td><td>".$c."</td></tr>");
        }
        echo "</table>";
        out("查找完毕,共".$stmt->num_rows."条");
	
}else{
	echo "Error";
}
exit;
?>