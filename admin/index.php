<?php
require_once('../utils/access.php');

if(!Access::hasLoggedIn()){//没有登录跳转到登录
	require_once('login.php');
	exit;
}


?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>管理</title>
	<script src="../static/api.js"></script>
</head>
<body>

</body>
</html>
