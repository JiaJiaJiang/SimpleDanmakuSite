<?php
header("Content-Type: text/javascript");
if(file_exists("plugins.cache.js")){
	header("Cache-Control: public");
 	header("Pragma: cache");
  $cachetime = 7*60*60*24;
  header("Expires: ".gmdate("D, d M Y H:i:s", time() + $cachetime)." GMT");
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