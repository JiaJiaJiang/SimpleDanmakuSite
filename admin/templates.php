<?php if(!isset($entry))exit();?>
<script type="text/x-template" id="template-list">
	<div class="List">
		<input v-model.trim="search" id="search" placeholder="搜索" @keypress.enter="search2" />
		<div class="controls" id="controls" ref="controls">
			<button v-show="button_selectAll" @click="select('all')">全选</button>
			<button v-show="button_selectOpposite" @click="select('opposite')">反选</button>
			<button v-show="button_delete" @click="deleteSelected()" ref="deleteButton">删除</button>
			<button v-show="button_refresh" @click="load()">刷新</button>
			<span class="page">
				<span v-show="loading">加载中..</span>
				<button @click="pageOffset(-1)">上一页</button>
				<input v-model.number="currentPage" @keypress.enter="load">/
				<input id="total_page" v-model="totalPage" contenteditable="false">
				<button @click="pageOffset(1)">下一页</button>
				<span style="margin-left: 1em;">总数:<span id="total_count" >{{totalCount}}</span></span>
				<span>
				每页:<select v-model.number="limit">
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="30">30</option>
						<option value="40">40</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</span>
			</span>
		</div>
		<table border="1" ref="table">
			<tr class="tableHead"><th v-if="selector"></th><th v-for="h in heads">{{h}}</th></tr>
			<tr v-for="data in listData"><td><input v-if="selector" v-model="checked" type="checkbox" class="selector" :value="data.itemID"></td><!--rowTemplate--></tr>
		</table>
	</div>
</script>
<script type="text/x-template" id="template-CollectionEditWindow">
	<form onsubmit="return false;" style="display: flex;">
		<input type="text" v-model.trim="name" placeholder="合集名" maxlength="100" style="flex-grow: 1;">
		<textarea v-model.trim="description" placeholder="描述"></textarea>
		<span style="line-height:2em;" class="check_span">
			<label><input type="checkbox" v-model.trim="hidden">隐藏</label>
		</span>
		<span class="strech_for_fill"></span>
		<button @click="save" class="main small" style="float:right;">保存</button>
	</form>
</script>
<script type="text/x-template" id="template-VideoEditWindow">
	<form @change="change" onsubmit="return false;" style="display: flex;">
		<input v-model.trim="title" type="text" placeholder="标题" maxlength="100" style="flex-grow: 1;">
		<input v-model.trim="cover" type="text" placeholder="封面地址" style="flex-grow: 2.5;">
		<input v-model.trim.number="cid" type="text" placeholder="合集id" style="flex-grow: 1;">
		<textarea v-model.trim="description" placeholder="描述"></textarea>
		<textarea v-model.trim="address" placeholder="地址"></textarea>
		<textarea v-model="option" placeholder="其它选项(Json)"></textarea>
		<span style="line-height:2em;" class="check_span">
			<label><input v-model="hidden" type="checkbox" value="0">隐藏</label>
		</span>
		<span class="strech_for_fill"></span>
		<button @click="save" class="main small" style="float:right;">保存</button>
	</form>
</script>