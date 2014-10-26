<?php
header("Content-Type: text/javascript");
if(file_exists("plugins.cache.js")){
	readfile("plugins.cache.js");
}else{
	require_once("../funs.php");
	$file=fopen("plugins.cache.js","w");
fwrite($file, getpluginsjs("plugins"));
if(file_exists("plugins.cache.js")){
  readfile("plugins.cache.js");
}
}
?>