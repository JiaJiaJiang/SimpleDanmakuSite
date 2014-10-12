<?php
require_once("../funs.php");
$vid = @$_GET['id'];
if (!isID($vid))exit;
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="danmu.css">
		<script src="../command.js"></script>
		<script src="danmu.js"></script>
	</head>
	<body style="margin:0px;padding:0px;">
		<video type="danmuplayer" videoid="<?php echo $vid;?>"></video>
	</body>
	<script type="text/javascript">
			UseDanmuPlayer();
		</script>
</html>

