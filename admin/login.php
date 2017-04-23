<?php
require_once('../utils/access.php');

if(@$_GET['exit']==1){//登出
	Access::logout();
	http_response_code(302);
	header('Location:index.php');
	exit;
}

if(Access::hasLoggedIn()){//已经登录了就跳转到index
	http_response_code(302);
	header('Location:index.php');
	exit;
}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>登录</title>
	<script src="../static/api.js"></script>
	<style>
		html,body{height: 100%;}
		input{
		    margin: 0.7em;
		    display: block;
		    font-size: 26px;
		    padding: 0.3em 0.7em;
		}
		button{
	        margin: 1em;
		    display: block;
	        cursor: pointer;
		    font-size: 20px;
		    border-radius: 6px;
		    background-color: #fff;
		    border: 1.2px solid #636363;
		}
		center{
			top: 24%;
		    position: relative;
		}
	</style>
</head>
<body>
<center>
	<form onsubmit="return false;">
		<h1>登录</h1>
		<input type="text" name="user" placeholder="用户名">
		<input type="password" name="pass" placeholder="密码">
		<input type="text" name="code" placeholder="动态密码(未设置留空)" maxlength="6">
		<button name="submit">登录</button>
		<span></span>
	</form>
</center>
<script>
var $=document.querySelector.bind(document),eles=$('form').elements,
	info=$('span');
eles.submit.onclick=function(){
	var json=base64.encode(JSON.stringify({user:eles.user.value,pass:eles.pass.value,code:eles.code.value}));
	info.innerHTML='登录中';
	SAPI.get('login',{cred:json},function(err,xhr){
		if(err){
			info.innerHTML=err.message;
			return;
		}
		try{
			var r=JSON.parse(xhr.responseText);
		}catch(e){
			info.innerHTML=e.message;
			return;
		}
		if(r.code===0 && r.result==='true'){
			location.reload();
			return;
		}
		info.innerHTML='失败';
	});
}
</script>
</body>
</html>
