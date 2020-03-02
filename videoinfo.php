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
	foreach ($videoInfo as $key => $value) {
		if(is_null($videoInfo->$key))$videoInfo->$key='';
	}
}catch(Exception $e){
	http_response_code(500);
	echo 'Error<BR>';
	require_once(dirname(__FILE__).'/utils/access.php');
	if(Access::hasLoggedIn()){
		echo '<pre>';
		var_dump($e);
		echo '</pre>';
	}
	exit;
}

?>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title></title>
	<script src='<?php pModTime('static/api.js');?>'></script>
	<link rel="stylesheet" type="text/css" href="<?php pModTime('static/videoInfo.css');?>">
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
<script>var info=JSON.parse(base64.decode('<?php echo base64_encode(json_encode($videoInfo,JSON_UNESCAPED_UNICODE));?>'));</script>
<script src="<?php pModTime('static/videoInfo.js');?>"></script>
</html>
