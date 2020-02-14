<?php
require_once(dirname(__FILE__).'/common.php');

class Access{
	function __construct(){
		@session_start();
		//为dev模式且登陆了的用户打开错误报告
		if(Access::hasLoggedIn() && @constant('dev')===true){
		    ini_set("display_errors", "On");
		    error_reporting(E_ALL | E_STRICT);
		}else{
			ini_set("display_errors", "Off");
		}
	}
	static function logout(){
		@$_SESSION['logged']='0';
	}
	static function login($user,$pass,$code){
		$GoogleAuth=defined('secret');
		if($GoogleAuth){
			require_once('GoogleAuthenticator.php');
			$auth=new GoogleAuthenticator();
		}
		if($user==user && $pass==pass && ($GoogleAuth?$auth->verifyCode(secret,$code):true)){
			$_SESSION['logged']='1';
			return true;
		}
		return false;
	}
	static function hasLoggedIn(){
		return (@$_SESSION['logged'] === '1');
	}
	static function requireLogin(){
		if (Access::hasLoggedIn())return;
		http_response_code(403);
		echo "login required";
		exit;
	}
	static function devMode(){
		return Access::hasLoggedIn()&&(@constant('dev')===true);
	}
	static function checkAccess(){
		$accessCode=@$_GET['access'];
		return (@$_SESSION['access']===@$_GET['access'])
			&&(@time()-intval(@$_SESSION['accessTime']))<=300;
	}
	static function requireAccess(){
		if(!@$_GET['access'])
			throw new Exception('access required', -4);
		if(!Access::checkAccess()){
			$errMsg='access error';
			if(Access::devMode()){
				$errMsg.="\nstored access:".@$_SESSION['access'];
				$errMsg.="\nget access:".@$_GET['access'];
				$errMsg.="\naccess time:".@$_SESSION['accessTime'];
			}
			throw new Exception($errMsg, -5);
		}
	}
	static function generate(){
		$uid=array(uniqid(),uniqid(),uniqid(),uniqid());
		$inds=array(0,1,2,3);
		$time=@time();
		shuffle($inds);
		return (object)array(
			'accessSession'=>$uid[$inds[0]].$uid[$inds[1]].$uid[$inds[2]].$uid[$inds[3]],
			'accessCode'=>implode('',$inds),
			'accessText'=>implode('',$uid),
			'accessTime'=>$time
		);
	}

}

new Access();

?>