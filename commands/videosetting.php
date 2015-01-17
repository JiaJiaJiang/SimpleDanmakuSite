<?php
needLogin();
if(hasFlag("help")){
    _toLine("videosetting用于修改视频独立设置",
            '<b>videosetting 视频id -设置名称 设置参数 .....</b>',
            '若参数为空，将删除这个设置。');
    exit;
}
global $args;
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
            $videosetting=array();
        }
        foreach ($args as $name => $value) {
            if($value==""){
                unset($videosetting[$name]);
                out("删除设置:$name");
            }else{
                $videosetting[$name]=$value;
                out("修改设置:$name $value");
            }
        }
        out("写入数据库");
        $videosetting=json_encode($videosetting);
        mysqli_stmt_prepare($stmt, "UPDATE  `video` SET  `options` = ? WHERE  `video`.`id` =".$option[0]);
        mysqli_stmt_bind_param($stmt,"s",$videosetting);
        mysqli_stmt_execute($stmt);
        out("完成");
        echo($videosetting);
        }
        else{
        	echo "数据库连接错误";
            exit;
        }
} else {
   echo "参数错误，输入【videosetting --help】查看用法";
   errorlog("videosetting","Error args");
    exit;
}
exit;
?>