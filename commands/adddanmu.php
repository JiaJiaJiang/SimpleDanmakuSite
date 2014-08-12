<?php
if(hasFlag("help")){
    echo "adddanmu用于添加一条弹幕，此命令通常由播放器调用\n        <b>adddanmu 视频id 弹幕类型 内容 所在时间 颜色 大小</b>";
    exit;
}
$option = $options;
if (count($option) == 6) {
    connectSQL();
    Global $SQL;
    $videoid = $option[0];
    $type    = $option[1];
    $content = mb_convert_encoding($option[2], "utf-8", "auto");
    $time    = $option[3];
    $color   = $option[4];
    $size    = intval($option[5]);
    if (!isID($videoid)) {
        echo "Error:No video id.";
        return;
    }
    if ($type > 5 || $type < 0) {
        $type = 0;
    }
    if (($time % 1) != 0) {
        echo "Error:invalid time.";
        return;
    }
    if ($color != "NULL") {
            preg_match("/[\w\d]{6}/i", $color, $matches);
            if ($matches[0]) {
                $color = $matches[0];
            } else {
                $color = "NULL";
            }
    }else{
    	$color=NULL;
    }
    
    //mysql_query( "SELECT LAST_INSERT_ID()" )
    if ($size==25||$size==30||$size==45)) {}else{
    $size=30;
}
    $stmt = mysqli_stmt_init($SQL);
    $date=date("Y-m-d");
    mysqli_stmt_prepare($stmt, "INSERT into danmu (`id`, `videoid`, `type`, `content`, `time`, `color`, `size`,`date`) VALUES (NULL,?, ?, ?, ?, ?, ?,?)");
    mysqli_stmt_bind_param($stmt, "iisisis", $videoid, $type, $content, $time, $color, $size,$date);
    mysqli_stmt_execute($stmt);
    if (mysqli_error($SQL)) {
        echo (mysqli_error($SQL));
    } else {
        //echo mysqli_insert_id($SQL);
       // echo mysqli_query($SQL, 'SELECT LAST_INSERT_ID()');
        echo $SQL->insert_id;
    }
} else {
    echo "Error:参数数量错误:";
    for ($i = 0; $i < count($option); $i++) {
        echo $option[$i] . ";";
    }
}
exit;
?>