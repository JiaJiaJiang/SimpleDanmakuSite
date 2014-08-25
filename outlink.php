<?php
/*
返回格式:array
(
	源1注释:[分段1,分段2....]
	源2注释:[同上]
)


*/
global $outlinkresolve;
$outlinkresolve=array();
$outlinkresolve["bilibili"]=function($id){

};
$outlinkresolve["youku"]=function($id){
	require_once("outlinkresolve/youku.php");
	$re=Youku::parse($id);
	return $re;
};

?>