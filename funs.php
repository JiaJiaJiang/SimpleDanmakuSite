<?php
require_once("config.php");
session_start();
if(!@$_SESSION['logged'])$_SESSION['logged']=false;
function connectSQL(){
	Global $SQL;
	$SQL=@mysqli_connect(sqlAddress,sqlUser,sqlPass,dbname);
if (!$SQL)
  {
  	$SQL=mysqli_connect(sqlAddress,sqlUser,sqlPass);
  	if (!$SQL)
  {
  out('无法连接数据库: ' . mysqli_connect_error());
  return false;
  }
  }
  $SQL->query("SET NAMES UTF-8");
  return true;
}
function getDomain($url){
	preg_match("/.+:\/\/(.+)\/*/", $url,$m);
	return $m[1]?$m[1]:false;
}
function logotherref(){
	$f=fopen("log/othersiteref.log","a");
	fwrite($f,$_SERVER["HTTP_REFERER"]."\n");
}
function fromThisDomain(){
	if(@domainname){
		$ref=$_SERVER["HTTP_REFERER"];
		if($ref){
			$d=getDomain($ref);
			if($d){
				return $d;
			}else{
				logotherref();
				return false;
			}
		}else{
			logotherref();
			return false;
		}
	}
	else{
		logotherref();
		return true;
	}
}
function isID($id){
	$result=preg_match("/^\d+$/", $id);
	if($result)return true;
	else{return false;}
}
function isLogged(){
	if($_SESSION['logged']===true){
		return true;
	}else{
		return false;
	}
}
function needLogin(){
	if(!isLogged()){
		echo "need login";
		exit;
	}
}
function getYouKuAddress($id){//已失效 
	return "http://m.youku.com/wap/pvs?format=3gphd&id=".$id;
}
function ip(){
	return @$_SERVER['HTTP_VIA']?@$_SERVER['HTTP_X_FORWARDED_FOR']:@$_SERVER['REMOTE_ADDR'];
}
function translateAddress($address){
	preg_match_all("/\w+/i",$address,$result);
	if($result)$pre=$result[0][0];
	$url=$address;
	switch($pre){
		case "youku":{
			$url=getYouKuAddress($result[0][1]);
			break;
		}
	}
	return $url;
}
function out($str){
	echo $str."\n";
	flush();
	ob_flush();
}
?>