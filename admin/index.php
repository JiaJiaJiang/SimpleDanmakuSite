<?php
require_once('../utils/access.php');

if(!Access::hasLoggedIn()){//没有登录跳转到登录
	require_once('login.php');
	exit;
}
require_once('../utils/common.php');
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>管理</title>
	<script src="../<?php pModTime('static/api.js');?>"></script>
	<script src="../<?php pModTime('static/vue.min.js');?>"></script>
	<!-- <script src="../<?php pModTime('static/vue-router.js');?>"></script> -->
	<script src="../<?php pModTime('static/floatWindow.js');?>"></script>
<link rel="stylesheet" type="text/css" href="../<?php pModTime('static/admin/admin.css');?>">
</head>
<body>
	<div id="frame">
		<h1>管理</h1>
		<hr/>
		<button onclick="location='login.php?exit=1'" class="main">登出</button>
		<button @click="danmakuViewer" class="main">全局弹幕搜索</button>
		<div class="setting_block" id="block_video">
			<h2>视频</h2>
			<hr/>
			<div id="video_list">
				<div id="video_List"></div>
			</div>

			<button id="new_video" class="main small" @click="createVideo">新建</button>
		</div>
		<div class="setting_block" id="block_collection">
			<h2>合集</h2>
			<hr/>
			<div id="collection_list">
				<div id="collection_List"></div>
			</div>
			<button id="new_collection" class="main small" @click="createCollection">新建</button>
			
		</div>
	</div>
<script src="../<?php pModTime('static/admin/admin.js');?>"></script>
</body>
</html>