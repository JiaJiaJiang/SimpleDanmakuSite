<?php
/*
返回格式:array
(
	源1注释:[分段1,分段2....]
	源2注释:[同上]
)
或
地址


解析文件格式
function resolveVideo($id){//解析入口
	//返回结果
}
*/
function outlinkresolve($pre,$id){
	if(is_file("outlinkresolve/$pre.php")){
		require_once("outlinkresolve/$pre.php");
		if(function_exists("resolveVideo")){
			return resolveVideo($id);
		}else{
			return "ERROR";
		}
		
	}
}
/*global $outlinkresolve;
$outlinkresolve=array();
$outlinkresolve["bilibili"]=function($id){

};
$outlinkresolve["youku"]=function($id){
	require_once("outlinkresolve/youku.php");
	$re=Youku::parse($id);
	return $re;
};
$outlinkresolve["xiami"]=function($id){
	require_once("outlinkresolve/xiami.php");
	$re=getxiamiurl($id);
	return $re;
};*/
?>