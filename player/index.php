<?php
require_once("../funs.php");
$vid = @$_GET['id'];
if (!isID($vid))exit;
$pluginreq='';
if(file_exists("plugins.cache.js")){
	$pluginreq="?".@filemtime('plugins.cache.js');
}
$purl=parse_url($_SERVER['HTTP_REFERER']);
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="danmu.css?<?php echo @filemtime('danmu.css');?>">
		<script src="../command.js?<?php echo @filemtime('../command.js');?>"></script>
		<script type="text/javascript" src="plugin.php<?php echo $pluginreq;?>"></script>
		<script src="danmu.js?<?php echo @filemtime('danmu.js');?>"></script>
	</head>
	<body style="margin:0px;padding:0px;">
		<video type="danmuplayer" videoid="<?php echo $vid;?>"></video>
	</body>
	<script type="text/javascript">
			UseDanmuPlayer();
		</script>
</html>

