<?php
needLogin();
$option = $options;
header("Content-Type:text/html", true);
if(hasFlag("help")){
    echo "cleardanmu用于清空指定视频的所有弹幕\n         <b>cleardanmu 视频id</b>";
    exit;
}
if (isID($option[0])) {
    if (connectSQL()) {
        Global $SQL;
        out("开始清空视频".$option[0])."的弹幕");
            $stmt = mysqli_stmt_init($SQL);
            mysqli_stmt_prepare($stmt, "DELETE FROM `danmu`
WHERE `videoid` =?");
            mysqli_stmt_bind_param($stmt,"i",$option[0]);
            mysqli_stmt_execute($stmt);
            echo "已清空ID".$option[0]."的弹幕，共".mysqli_affected_rows($SQL)."条";
        }
        else{
        	echo "数据库连接错误";
                return;
        }
} else {
    echo "cleardanmu --help】查看用法";
    errorlog("cleardanmu","Error args");
}
exit;
?>