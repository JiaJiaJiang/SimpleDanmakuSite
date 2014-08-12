<?php
needLogin();
$option = $options;
global $args;
if(hasFlag("help")){
    echo "addvideo用于删除视频\n          <b>delvideo 视频id</b>";
    exit;
}
header("Content-Type:text/html", true);
if (isID($option[0])) {
    if (connectSQL()) {
        Global $SQL;
        out("删除视频：".$option[0]);
        $stmt = mysqli_stmt_init($SQL);
        mysqli_stmt_prepare($stmt, "DELETE FROM `".dbname."`.`video` WHERE `video`.`id` = ?");
        mysqli_stmt_bind_param($stmt, "i",$option[0]);
        mysqli_stmt_execute($stmt);
        out("尝试删除视频".$option[0]);
            if(mysqli_affected_rows($SQL)!=1){
                out("失败");
            }else{
                out('成功');
            }
        }
        else{
        	echo "数据库连接错误";
                exit;
        }
} else {
   echo "参数错误，输入【delvedio --help】查看用法";
    exit;
}
exit;
?>