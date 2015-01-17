<?php
needLogin();
$option = $options;
global $args;
if(hasFlag("help")){
    _toLine('addvideo用于删除视频',
                '          <b>delvideo 视频id</b>');
    exit;
}
header("Content-Type:text/html", true);
if (isID($option[0])) {
    if (connectSQL()) {
        Global $SQL;
        out("删除视频：".$option[0]);
        $stmt = mysqli_stmt_init($SQL);
        mysqli_stmt_prepare($stmt, "DELETE FROM `".dbname."`.`video` WHERE `video`.`id` = ? limit 0,1");
        mysqli_stmt_bind_param($stmt, "i",$option[0]);
        mysqli_stmt_execute($stmt);
        out("尝试删除视频".$option[0]);
            if(mysqli_affected_rows($SQL)!=1){
                out("失败");
                errorlog("deldanmu","Failed to delete video:".$option[0]);
            }else{
                out('成功');
            }
        out("开始清空视频".$option[0]."的弹幕");
            $stmt = mysqli_stmt_init($SQL);
            mysqli_stmt_prepare($stmt, "DELETE FROM `danmu` WHERE `videoid` =?");
            mysqli_stmt_bind_param($stmt,"i",$option[0]);
            mysqli_stmt_execute($stmt);
            echo "已清空ID".$option[0]."的弹幕，共".mysqli_affected_rows($SQL)."条";
        }
        else{
        	echo "数据库连接错误";
                exit;
        }
} else {
   echo "参数错误，输入【delvedio --help】查看用法";
   errorlog("delvideo","Error args");
    exit;
}
exit;
?>