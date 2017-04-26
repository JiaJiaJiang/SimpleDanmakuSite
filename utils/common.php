<?php
require_once(dirname(__FILE__)."/../config.php");

global $devMode;
$devMode=(@constant('dev')===true);
if($devMode)require_once('debug.php');

function isIntStr($num) {
	return @preg_match('/^\d+$/',$num);
}
function isInt($num){
	if(is_int($num))return true;
	if(is_string($num))return isIntStr($num);
	return false;
}
function isValidColor($c){
	preg_match("/^\#?((?:[\da-f\$]{3}){1,2})$/i",$c,$result);
	return count($result)?$result[1]:false;
}

function allowedRequest(){
	if(function_exists('requestControl'))
		return requestControl();
	return true;
}

function parseIDList($arr){
	if(is_string($arr))$arr=explode(',',$arr);
	if(!is_array($arr))return false;
	$list=array();
	foreach ($arr as $value) {
		if(is_string($value)){
			if(isIntStr($value)){//是个整数
				$list[]=intval($value);
			}elseif(preg_match('/^(\d+)\-(\d+)$/',$value,$ids)){//连续型参数
				$startid=intval($ids[1]);
				$endid=intval($ids[2]);
				$list=array_merge($list,range($startid,$endid));
			}else{
				return false;
			}
			
		}else{//独立型或错误型
			if($value>=0&&isInt($value)){
				$list[]=$value;
			}else{
				return false;
			}
		}
	}
	return $list;
}

function directIP(){
	return @$_SERVER['REMOTE_ADDR'];
}


//兼容无此参数的PHP版本
define('JSON_UNESCAPED_UNICODE',256);

?>