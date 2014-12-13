<?php
needLogin();
if(hasFlag("help")){
    echo "addvideo用于添加视频\n  <b>addvideo 参数</b>\n    -t 视频标题\n    -url 视频地址\n    -cv 封面地址\n    -des 视频描述";
    exit;
}
global $args;
header("Content-Type:text/html", true);
if (@$args["t"]&&@$args["url"]) {
    if (connectSQL()) {
        Global $SQL;
        $cv=@$args["cv"]?$args["cv"]:NULL;
        $des=@$args["des"]?$args["des"]:NULL;
        if(!array_key_exists("des",$args)){
            $args["des"]=NULL;
        }
        $stmt = mysqli_stmt_init($SQL);
        mysqli_stmt_prepare($stmt, "INSERT INTO  `".dbname."`.`video` (`id` ,`title` ,`address` ,`coveraddress`,`description`,`count`) VALUES (NULL ,?,?,?,?,0);");
        mysqli_stmt_bind_param($stmt, "ssss",$args["t"], $args["url"],$cv,$des);
        mysqli_stmt_execute($stmt);
        out( "已尝试添加,获取的视频id:".$SQL->insert_id);
        out("标题:".$args['t']);
        out("视频地址:".$args['url']);
        out("封面地址:".($cv?$cv:"无"));
        out("描述:".($des?$des:"无"));
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