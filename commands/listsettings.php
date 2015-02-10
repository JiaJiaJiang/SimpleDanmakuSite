<?php
needLogin();
if(hasFlag("help")){
    _toLine("listsettings用于查看视频独立设置",
            '   <b>listsettings 视频id</b>');
    exit;
}
$option = $options;
header("Content-Type:text/html", true);
if (isID(@$option[0])) {
    if (connectSQL()) {
        Global $SQL;
        $stmt = mysqli_stmt_init($SQL);
        mysqli_stmt_prepare($stmt, "SELECT options  FROM `".dbname."`.`video` WHERE id=".$option[0].";");
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt,$videosetting);
        mysqli_stmt_fetch($stmt);
        if(!is_null($videosetting)){
            $videosetting=json_decode($videosetting,true);
            if(is_null($videosetting)){
                $videosetting=array();
            }elseif(!is_array($videosetting)){
                $videosetting=array();
            }  
        }else{
            out("无设置");
            exit;
        }
        foreach ($videosetting as $name => $value) {
            out("$name:$value");
        }
        }
        else{
        	echo "数据库连接错误";
            exit;
        }
} else {
   echo "参数错误，输入【listsettings --help】查看用法";
   errorlog("listsettings","Error args");
    exit;
}
exit;
?>