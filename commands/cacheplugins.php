<?php 
needLogin();
if(hasFlag("help")){
    echo "cacheplugins用于合并插件到缓存文件\n  <b>cacheplugins</b>";
    exit;
}
$file=fopen("player/plugins.cache.js","w");
fwrite($file, getpluginsjs());
if(file_exists("player/plugins.cache.js")){
  out("done");
}else{
  out("failed");
}
?>