<?php
$cid=@$_GET['id'];

require_once(dirname(__FILE__).'/utils/collection.php');
require_once(dirname(__FILE__).'/utils/common.php');
require_once(dirname(__FILE__).'/utils/access.php');
if(!isIntStr($cid)){
	http_response_code(400);
	exit;
}
$collOpt=new collection();

try{
	$collInfo=$collOpt->collection($cid,Access::hasLoggedIn());
	if(!$collInfo){
		http_response_code(404);
		exit;
	}
	foreach ($collInfo as $key => $value) {
		if(is_null($collInfo->$key))$collInfo->$key='';
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
	<title>Loading</title>
	<script src='<?php pModTime('static/api.js');?>'></script>
	<link rel="stylesheet" type="text/css" href="<?php pModTime('static/collection.css');?>">
	<script src="<?php pModTime('static/playerFrame.js');?>"></script>
</head>
<body>
<div id="collection_info">
	<h2 id="collection_name"></h2> <span id="desc"></span>
</div>
<div id="video_list"></div>
<iframe id="player_iframe" allowfullscreen></iframe>
</body>
<script>var info=JSON.parse(base64.decode('<?php echo base64_encode(json_encode($collInfo,JSON_UNESCAPED_UNICODE));?>'));</script>
<script src="<?php pModTime('static/collection.js');?>"></script>
</html>
