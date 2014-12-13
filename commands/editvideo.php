<?php
needLogin();
global $args;
header("Content-Type:text/html", true);
if(hasFlag("help")){
    echo "editvideo用于修改视频\n         <b>editvideo -id 视频id 其他参数</b>\n    -t 视频标题\n    -url 视频地址\n    -cv 封面地址\n    -des 视频描述
    \nt(标题),url(视频源),cv(封面地址),des(视频描述)参数至少需要一个\n此命令不能改id和播放数";
    exit;
}
if (@$args["id"]) {
    if (connectSQL()) {
        Global $SQL;
        if(@$args["t"]){
            out("重命名");
            $stmt = mysqli_stmt_init($SQL);
            mysqli_stmt_prepare($stmt, "UPDATE  `video` SET  `title` = ? WHERE  `video`.`id` =?");
            mysqli_stmt_bind_param($stmt,"si",$args["t"],$args["id"]);
            mysqli_stmt_execute($stmt);
            out("重命名结束:".(mysqli_affected_rows($SQL)==1?"成功":"失败"));
        }
        if(@$args["url"]){
            out("更新地址");
            $stmt = mysqli_stmt_init($SQL);
            mysqli_stmt_prepare($stmt, "UPDATE  `video` SET  `address` = ? WHERE  `video`.`id` =?");
            mysqli_stmt_bind_param($stmt,"si",$args["url"],$args["id"]);
            mysqli_stmt_execute($stmt);
            out("地址更新结束:".(mysqli_affected_rows($SQL)>=1?"成功":"失败"));
        }
        if(@$args["cv"]){
            out("更新封面地址");
            $stmt = mysqli_stmt_init($SQL);
            mysqli_stmt_prepare($stmt, "UPDATE  `video` SET  `coveraddress` = ? WHERE  `video`.`id` =?");
            mysqli_stmt_bind_param($stmt,"si",$args["cv"],$args["id"]);
            mysqli_stmt_execute($stmt);
            out("封面地址更新结束:".(mysqli_affected_rows($SQL)>=1?"成功":"失败"));
        }
        if(@$args["des"]){
            out("更新描述");
            $stmt = mysqli_stmt_init($SQL);
            mysqli_stmt_prepare($stmt, "UPDATE  `video` SET  `description` = ? WHERE  `video`.`id` =?");
            mysqli_stmt_bind_param($stmt,"si",$args["des"],$args["id"]);
            mysqli_stmt_execute($stmt);
            out("描述更新结束:".(mysqli_affected_rows($SQL)>=1?"成功":"失败"));
        }
    }else{
        	  echo "数据库连接错误";
            return;
    }
} else {
    echo "参数错误，输入【editvideo --help】查看用法";
    errorlog("editvideo","Error args");
}
exit;
?>