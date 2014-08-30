<?php
needLogin();
if(hasFlag("help")){
    echo "addvideo用于添加视频\n  <b>addvideo -t 视频标题 -url 视频地址</b>";
    exit;
}
global $args;
header("Content-Type:text/html", true);
if (@$args["t"]&&@$args["url"]) {
    if (connectSQL()) {
        Global $SQL;
        $stmt = mysqli_stmt_init($SQL);
        mysqli_stmt_prepare($stmt, "INSERT INTO  `".dbname."`.`video` (`id` ,`title` ,`address` ,`count`) VALUES (NULL ,?,?,'0');");
        mysqli_stmt_bind_param($stmt, "ss",$args["t"], $args["url"]);
        mysqli_stmt_execute($stmt);
        echo "已尝试添加,获取的视频id:".$SQL->insert_id;
        }
        else{
        	echo "数据库连接错误";
                exit;
        }
} else {
   echo "参数错误，输入【addvideo --help】查看用法";
   errorlog("addvideo","Error args");
    exit;
}
exit;
?>