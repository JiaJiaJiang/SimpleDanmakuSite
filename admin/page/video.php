<?php 
if(!isset($getPage)){
	return (object)array(
		"index"=>1,
		"name"=>'视频'
	);
}
?>
<div class="setting_block">
	<h2>视频</h2>
	<hr/>
	<div id="video_list">
		<div id="video_List"></div>
	</div>
	<button id="new_video" class="main small" @click="createVideo">新建</button>
	<button @click="danmakuViewer" class="main small">全局弹幕搜索</button>
</div>
<script src="../<?php pModTime('static/admin/admin.js');?>"></script>
