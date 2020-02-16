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
	scriptVer=50,
	NyaPTime=<?php modTime('static/NyaP');?>;
try{//es2016 version feature test
	'use strict';
	[
		'class a{}',//class
		'()=>{}',//lambda
		'{window}',//concise property
		'[...[]]',//expand array
		'let a;const b=1;',//let const
		'fetch.name==="fetch"',//fetch api
	].forEach(function(s){eval(s)});
}catch(e){
	console.log('not supported feature:',e);
	scriptVer=80;
}
var playerName='NyaP'+(touchMode?"Touch":"");
console.log('load player',playerName,scriptVer);
document.write(
	"<style>@import url('"+"../static/NyaP/"+playerName+".css?"+NyaPTime+"')</style>"+
	"<script src='../static/NyaP/"+playerName+"."+scriptVer+".js?"+NyaPTime+"'><\/script>"
);
var NyaP_plugins=JSON.parse('<?php
	$plugin_list=glob('plugins/*.js');
	if(count($plugin_list)>0){
		$name_list=array();
		foreach($plugin_list as $name) {
			array_push($name_list, $name.'?'.modTime('player/'.$name,false));
		}
		echo json_encode($name_list);
	}else{
		echo '""';
	}
?>');
var playerOpt='<?php echo defined("playerOpt")?base64_encode(playerOpt):'';?>';

</script>
<script src='../static/api.js?<?php modTime('static/api.js');?>'></script>
<script src='../static/playPage.js?<?php modTime('static/playPage.js');?>'></script>
</html>