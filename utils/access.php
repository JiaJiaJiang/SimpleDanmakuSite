<?php
require_once('common.php');

class Access{
	function __construct(){
		@session_start();
		//为dev模式且登陆了的用户打开错误报告
		if(hasLoggedIn() && constant('dev')===true){
		    ini_set("display_errors", "On");
		    error_reporting(E_ALL | E_STRICT);
		}else{
			ini_set("display_errors", "Off");
		}
	}
	static function hasLoggedIn(){
		return (@$_SESSION['logged'] === 'true');
	}
	static function requireLogin(){
		if (hasLoggedIn())return;
		http_response_code(403);
		echo "login required";
		exit;
	}
	static function checkAccess(){
		$accessCode=@$_GET['access'].directIP();
		return ($accessCode===$_SESSION['access']);
	}
	static function generate(){
		$uid=array(uniqid(),uniqid(),uniqid(),uniqid());
		$inds=array(0,1,2,3);
		shuffle($inds);
		return (object)array(
			'accessSession'=>$uid[$inds[0]].$uid[$inds[1]].$uid[$inds[2]].$uid[$inds[3]].directIP();
			'accessCode'=>implode('',$inds),
			'accessText'=>implode('',$uid)
		);
	}

}

new Access();

?>