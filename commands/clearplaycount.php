<?php
needLogin();
$option = $options;
header("Content-Type:text/html", true);
if(hasFlag("help")){
    echo "clearplaycount用于清空指定视频播放数\n         <b>clearplaycount 视频id</b>";
    exit;
}
if (isID($option[0])) {
    if (connectSQL()) {
        Global $SQL;
        out("清零视频".$option[0]."的播放数");
            $stmt = mysqli_stmt_init($SQL);
            mysqli_stmt_prepare($stmt, "UPDATE  `video` SET  `count` = '0' WHERE  `video`.`id` =?");
            mysqli_stmt_bind_param($stmt,"i",$option[0]);
            mysqli_stmt_execute($stmt);
            if(mysqli_affected_rows($SQL)==1){
                out ("已清零");
            }else{
                out( "失败");
                errorlog("clearplaycount","Error to clear danmakus whose videoid=".$option[0]);
            }
            
        }
        else{
        	echo "数据库连接错误";
                return;
        }
} else {
    echo "参数错误，输入【editvideo --help】查看用法";
    errorlog("clearplaycount","Err args");
}
exit;
?>