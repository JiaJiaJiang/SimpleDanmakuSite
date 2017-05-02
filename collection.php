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
	<link rel="stylesheet" type="text/css" href="static/collection.css">
</head>
<body>
<iframe id="player_iframe"></iframe>
<div id="collection_info">
	<h2 id="collection_name">test</h2> <span id="desc">balabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabalbalabalbalabalalabalabal</span>
</div>
<div id="video_list">
	
</div>
</body>
<script>
	
</script>
</html>
