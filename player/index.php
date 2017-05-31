<?php
require_once('../utils/common.php');
?>
<!DOCTYPE html>
<html>
<head>
	<title>加载中</title>
	<meta charset="utf-8">
	<style>
		html{position: absolute;width: 100%;height:100%;background-repeat: no-repeat;background-position: center;}
	</style>
</head>
<body>
</body>

<script>
var touchMode=navigator.userAgent.match(/mobile/i) && ('ontouchstart' in window),//touch player
	scriptVer='es2016',
	NyaPTime=<?php modTime('static/NyaP');?>;
try{
	'use strict';
	[
		'class a{}',//class
		'()=>{}',//lambda
		'{window}',//concise property
		'[...[]]',//expand array
		'let a;const b=1;',//let const
	].forEach(function(s){eval(s)});
}catch(e){
	scriptVer='es2015';
}
var playerName='NyaP'+(touchMode?"Touch":"");
console.log('load player',playerName,scriptVer);
document.write(
	"<style>@import url('"+"../static/NyaP/"+playerName+".min.css?"+NyaPTime+"')</style>"+
	"<script src='../static/NyaP/"+playerName+"."+scriptVer+".min.js?"+NyaPTime+"'><\/script>"
);
</script>
<script src='../static/api.js?<?php modTime('static/api.js');?>'></script>
<script src='../static/playPage.js?<?php modTime('static/playPage.js');?>'></script>
</html>