<?php
needLogin();
global $args;
if(hasFlag("help")){
    echo "finddanmu用于通过查找弹幕(正则查找，弹幕很多时谨慎使用)\n     <b>finddanmu 内容 [-option arg]</b>\n     <b>options</b>\n         <b>-v 指定视频id</b>\n此命令使用正则匹配查找，你可以直接输入弹幕或者其一部分，或者使用正则表达式";
    exit;
}
$option = $options;
header("Content-Type:text/html", true);
$sql="SELECT id,videoid,type,time, color,size,`date`,content FROM danmu WHERE `content` REGEXP ?";
if(array_key_exists("v",$args)&&isID($args["v"])){
    $sql.=(" AND `videoid`=".$args["v"]);
}
if (@$option[0]) {
    if (connectSQL()) {
        Global $SQL;
        $stmt = mysqli_stmt_init($SQL);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "s", $option[0]);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt,$id,$videoid,$type,$time, $color,$size,$date,$c);
        echo "弹幕类型说明 0:← 1:→ 2:底 3:顶 4:高级弹幕 5:字幕";
        echo "<table>";
            out("<tr><th>ID</th><th>视频ID</th><th>弹幕类型</th><th>时间</th><th>颜色</th><th>大小</th><th>日期</th><th>内容</th></tr>");
        while(mysqli_stmt_fetch($stmt)){
            out("<tr><td>".$id."</td><td>".$videoid."</td><td>".$type."</td><td>".$time."</td><td>".$color."</td><td>".$size."</td><td>".$date."</td><td>".$c."</td></tr>");
        }
        echo "</table>";
        out("查找完毕,共".$stmt->num_rows."条");
        }
        else{
        	echo "数据库连接错误";
                return;
        }
} else {
    echo "参数错误，输入【findanmu --help】查看用法";
    errorlog("finddanmu","Error args");
}
exit;
?>