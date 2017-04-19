<?php
require_once('./utils/video.php');
require_once('./utils/common.php');
$vid=@$_GET['id'];
if(!isIntStr($vid)){
	http_response_code(404);
	exit;
}
$videoOpt=new Video();

try{
	$videoInfo=$videoOpt->videoInfo($vid,'title,playCount,cover,description,danmakuCount');
	if(!$videoInfo){
		http_response_code(404);
		exit;
	}
}catch(Exception $e){
	http_response_code(500);
	echo 'Error';
	exit;
}



$title=htmlentities($videoInfo->title,ENT_QUOTES,"UTF-8");
$cove$descriptionr=htmlentities($videoInfo->cover,ENT_QUOTES,"UTF-8");
$description=htmlentities($videoInfo->description,ENT_QUOTES,"UTF-8");
?>
<html>
	<head>
		<meta charset="utf-8"/>
		<title><?php echo $title;?></title>
		<link rel="stylesheet" type="text/css" href="static/videoInfo.css">
	</head>
	<body>
		<div id="videostat">
			<h1 id="title"><?php echo $title;?></h1>
			<div id="count"><span>播放数:<?php echo $videoInfo->playCount;?></span>   <span>弹幕数:<?php echo $videoInfo->danmakuCount;?></span>
				<span id="des"><?php echo $description;?></span>
			</div>
		</div>
		<a id="play" target="_self" href="<?php echo 'player/?id='.$vid;?>">播放</a>
	</body>
	<?php if(@$cover){?>
	<script>
		var div=document.createElement("div"),img=new Image();
		document.body.appendChild(div);
		div.id='cover';
		div.style.opacity=0;
		div.style.backgroundImage="url('"+(img.src="<?php echo $cover;?>")+"')";
		img.onload=function(){div.style.opacity='';}
	</script>
	<?php } ?>
</html>
