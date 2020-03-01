<?php 
if(!isset($getPage)){
	return (object)array(
		"index"=>2,
		"name"=>'合集'
	);
}
?>
<div class="setting_block">
	<h2>合集</h2>
	<hr/>
	<div id="collection_list">
		<div id="collection_List"></div>
	</div>
	<button id="new_collection" class="main small" @click="createCollection">新建</button>
</div>
<script src="../<?php pModTime('static/admin/admin.js');?>"></script>
