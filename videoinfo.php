<?php
$vid=@$_GET['id'];

require_once(dirname(__FILE__).'/utils/video.php');
require_once(dirname(__FILE__).'/utils/common.php');
require_once(dirname(__FILE__).'/utils/access.php');
if(!isIntStr($vid)){
	http_response_code(404);
	exit;
}
$videoOpt=new Video();

try{
	$videoInfo=$videoOpt->videoInfo($vid,'title,playCount,cover,V.description AS description,danmakuCount',Access::hasLoggedIn());
	if(!$videoInfo){
		http_response_code(404);
		exit;
	}
}catch(Exception $e){
	http_response_code(500);
	echo 'Error<BR>';
	require_once(dirname(__FILE__).'/utils/access.php');
	if(Access::hasLoggedIn()){
		echo '<div style="white-space:pre;">';
		var_dump($e);
		echo '</div>';
	}
	exit;
}

?>
<html>
<head>
	<meta charset="utf-8"/>
	<title></title>
	<link rel="stylesheet" type="text/css" href="static/videoInfo.css">
</head>
<body>
	<h1 id="title"></h1>
	<div id="info">
		<div id="count">
			<span id="playCount"></span>   <span id="danmakuCount"></span>
		</div>
		<span id="desc"></span>
	</div>
	<div>
		<a id="play" target="_self" href="<?php echo 'player/?id='.$vid;?>">播放</a>
	</div>
</body>
<script>
var info=JSON.parse('<?php echo str_replace('\'','\\\'',json_encode($videoInfo,JSON_UNESCAPED_UNICODE));?>'),
	$=document.querySelector.bind(document);
function setText(ele,text){ele.appendChild(document.createTextNode(text));}
setText($('title'),info.title);
setText($('#title'),info.title);
setText($('#playCount'),'播放数:'+info.playCount);
setText($('#danmakuCount'),'弹幕数:'+info.danmakuCount);
setText($('#desc'),info.description);
if(info.cover){
	var div=document.createElement("div"),img=new Image();
	document.body.appendChild(div);
	div.id='cover';
	div.style.opacity=0;
	div.style.backgroundImage="url('"+(img.src=info.cover)+"')";
	img.onload=function(){div.style.opacity='';}	
}
</script>
</html>
