<?php
require_once('../utils/access.php');

if(!Access::hasLoggedIn()){//没有登录跳转到登录
	require_once('login.php');
	exit;
}


?>

logined
