<?php
require_once('../utils/access.php');

if(!Access::hasLoggedIn()){//没有登录跳转到登录
	require_once('login.php');
	exit;
}


?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>管理</title>
	<script src="../static/api.js"></script>
	<link rel="stylesheet" type="text/css" href="../static/admin/style.css">
</head>
<body>
	<div id="frame">
		<h1>管理</h1>
		<hr/>
		<button onclick="location='login.php?exit=1'" class="main">登出</button>
		<div class="setting_block" id="block_video">
			<h2>视频</h2>
			<hr/>
			<div id="video_list"></div>

			<button id="new_video" class="main small">新建</button>
			<form id="edit_video_form" hidden onsubmit="return false;" style="display: none;">
				<h3 style="width:100%">正在编辑:<span class="strech_for_fill" id="editing_video_id"></span></h3>
				<input type="text" name="title" placeholder="标题" maxlength="100" style="flex-grow: 1;">
				<input type="text" name="cover" placeholder="封面地址" style="flex-grow: 2.5;">
				<input type="text" name="cid" placeholder="合集id" style="flex-grow: 1;">
				<textarea name="description" placeholder="描述"></textarea>
				<textarea name="address" placeholder="地址"></textarea>
				<textarea name="option" placeholder="其它选项(Json)"></textarea>
				<span style="line-height:2em;" class="check_span"><input type="checkbox" name="hidden" id="video_hidden_checkbox"><label for="video_hidden_checkbox">隐藏</label></span>
				<span class="strech_for_fill"></span>
				<button id="hide_video_editor" class="main small" style="float:right;">关闭</button>
				<button id="submit_video" class="main small" style="float:right;">保存</button>
			</form>
			<div class="setting_block" id="block_danmaku">
				<h3>弹幕</h3>
				<hr/>
				<div id="danmaku_list"></div>
			</div>
		</div>
		<div class="setting_block" id="block_collection">
			<h2>合集</h2>
			<hr/>
			<div id="collection_list"></div>
			<button id="new_collection" class="main small">新建</button>
			<form id="edit_collection_form" hidden onsubmit="return false;" style="display: none;">
				<h3 style="width:100%">正在编辑:<span class="strech_for_fill" id="editing_collection_id"></span></h3>
				<input type="text" name="name" placeholder="合集名" maxlength="100" style="flex-grow: 1;">
				<textarea name="description" placeholder="描述"></textarea>
				<span style="line-height:2em;" class="check_span"><input type="checkbox" name="hidden" id="collection_hidden_checkbox"><label for="collection_hidden_checkbox">隐藏</label></span>
				<span class="strech_for_fill"></span>
				<button id="hide_collection_editor" class="main small" style="float:right;">关闭</button>
				<button id="submit_collection" class="main small" style="float:right;">保存</button>
			</form>
		</div>
	</div>
</body>
<script src="../static/admin/script.js"></script>
</html>
