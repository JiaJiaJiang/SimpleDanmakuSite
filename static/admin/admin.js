
function clamp(value,min,max){//limit value
	return value<min?min:(value>max?max:value);
}
function padTime(n){//pad number to 2 chars
	return n>9&&n||'0'+n;
}

var adminPanel=new Vue({
	el:'#frame',
	methods:{
		createVideo(){
			new VideoEditWindow({
				location:'center',
				parent:document.body,
			}).center().returnValue.then(v=>v&&videoList.load());;//关闭窗口后刷新列表
		},
		createCollection(){
			new CollectionEditWindow({
				location:'center',
				parent:document.body,
			}).center().returnValue.then(v=>v&&collectionList.load());;//关闭窗口后刷新列表
		},
		danmakuViewer(){
			new DanmakuListWindow({
				title:`弹幕列表`,
				location:'center',
				parent:document.body,
			}).center().returnValue.then(v=>v&&this.load());//关闭窗口后刷新列表
		}
	}
});

class List{
	static listTemplate=`<div class="List">
	<input v-model.trim="search" id="search" placeholder="搜索" @keypress.enter="load" />
	<table border="1">
		<tr class="tableHead"><th v-if="selector"></th><th v-for="h in heads">{{h}}</th></tr>
		<tr v-for="data in listData"><td><input v-if="selector" v-model="checked" type="checkbox" class="selector" v-bind:value="data.itemID"></td><!--rowTemplate--></tr>
	</table>
	<div class="controls" id="controls">
		<span v-if="selector">
		<button @click="select('all')">全选</button>
		<button @click="select('opposite')">反选</button>
		<button @click="deleteSelected()">删除</button>
		</span>
		<button @click="load()">刷新</button>
		<span class="page">
			<span v-show="loading">加载中..</span>
			<button @click="pageOffset(-1)">上一页</button>
			<input id="current_page" v-model.number="currentPage" @keypress.enter="load">
			/
			<input id="total_page" v-model="totalPage" contenteditable="false">
			<button @click="pageOffset(1)">下一页</button>
			<span style="margin-left: 1em;">总数:<input id="total_count" v-model="totalCount" placeholder="0" contenteditable="false"></span>
		</span>
	</div>
</div>`;
	constructor(options){
		let opt=this.opt=Object.assign({},options);
		//generate row template and heads
		let rowTemplate='',heads=[];
		let listItems=opt.listItems||this.constructor.listItems||[];
		for(let [name,h,content] of listItems){
			heads.push(h);
			rowTemplate+=`<td itemname="${name}">${content}</td>`;
		}
		let listTemplate=List.listTemplate.replace('<!--rowTemplate-->',rowTemplate);
		let THIS=this;
		this.vue=new Vue({
			el:opt.el||document.createElement('div'),
			mixins:opt.vueMixins?[opt.vueMixins]:undefined,
			template:listTemplate,
			data:{
				loading:false,
				search:'',
				currentPage:1,
				totalPage:1,
				limit:20,
				totalCount:0,
				listData:[],
				checked:[],
				heads:heads,
				selector:opt.selector||true
			},
			filters:{
				formatDate(timestamp){
					return (new Date(timestamp*1000)).toLocaleString();
				},
				isHidden(v){
					return v?'Y':'';
				}
			},
			methods:{
				select(target){
					THIS.select(target);
				},
				deleteSelected(){
					THIS.delete(THIS.vue.$data.checked.slice());
				},
				load(){
					THIS.load();
				},
				pageOffset(v){
					THIS.page+=v;
				},
			}
		});
	}
	clearTable(){
		this.vue.$data.listData.splice(0);
	}
	delete(){}
	load(){
		this.page=this.page;
	}
	select(target){
		let boxes=[].slice.call(this.$$('input.selector'));
		switch(target){
			case 'all':boxes.forEach(i=>i.checked=true);break;
			case 'opposite':boxes.forEach(i=>i.checked=!i.checked);break;
		}
	}
	insert(data){
		this.vue.$data.listData.push(data);
	}
	$(selector){return this.vue.$el.querySelector(selector)}
	$$(selector){return this.vue.$el.querySelectorAll(selector)}
	get selected(){return this.vue.$data.checked;}
	get el_table(){return this.$('table')}
	get limit(){return this.vue.limit;}
	set limit(v){this.vue.limit=clamp(v,1,Infinity);}
	get page(){return this.vue.currentPage;}
	set page(v){
		let p=clamp(v,1,this.totalPage);
		if(p===this.page)return;
		this.vue.currentPage=p;
		this.load();
	}
	get totalPage(){return this.vue.totalPage;}
	set totalPage(v){this.vue.totalPage=clamp(v,1,Infinity);}
	get totalCount(){return this.vue.totalCount;}
	set totalCount(v){
		this.vue.totalCount=clamp(v,0,Infinity);
		this.totalPage=Math.ceil(this.totalCount/this.limit);
	}
}
class SimpleList  extends List{
	async load(api,req,itemIDName){
		this.vue.$data.loading=true;
		super.load();
		try{
			let getList=SAPI.get(api,req);//列表
			req.arg.countMode=true;
			let getTotalCount=SAPI.get(api,req);//请求总数
			let [rows,[countResult]]=await Promise.all([getList,getTotalCount]);
			this.clearTable();
			rows.forEach((data)=>{
				data.itemID=data[itemIDName];
				this.insert(data);
			});
			this.totalCount=countResult.resultCount;
		}catch(err){
			alert(err.message||err);
			return;
		}
		this.vue.$data.loading=false;
	}
	async delete(api,arg,ids,name){
		try{
			let affected=await SAPI.get(api,{
				opt:'delete',
				[arg]:ids.join(','),
			});//请求删除
			this.load();
			alert('已删除'+affected+'个'+name);
		}catch(err){
			alert(err.message||err);
		}
	}
}
class VideoList extends SimpleList{
	static listItems=[
		['vid','ID',`<a v-bind:href="'../videoinfo.php?id='+data.itemID" target="_blank">{{data.itemID}}</a>`],
		['title','标题',`<a v-bind:href="'../player?id='+data.itemID" target="_blank">{{data.title}}</a>`],
		['description','描述',`{{data.description}}`],
		['date','日期',`{{data.date | formatDate}}`],
		['danmakuCount','弹',`<button id="danmaku" v-bind:itemID="data.itemID">{{data.danmakuCount}}</button>`],
		['playCount','播',`{{data.playCount}}`],
		['hidden','隐',`{{data.hidden|isHidden}}`],
		['cid','合',`{{data.cid}}`],
		['','',`<button id="edit" v-bind:itemID="data.itemID">编辑</button>`],
	];
	constructor(ele,cid){
		super({
			el:ele,
		});
		this.cid=cid;
		this.el_table.addEventListener('click',e=>{
			let t=e.target;
			if(t.id=='danmaku'){
				let vid=Number(t.getAttribute('itemID'));
				let wid=DanmakuListWindow.formatId(vid);
				if(FWindow.focus(wid))return;
				//新建弹幕列表窗口
				new DanmakuListWindow({
					title:`弹幕列表:${vid}`,
					id:wid,
					vid:vid,
					location:'center',
					parent:document.body,
				}).center().returnValue.then(v=>v&&this.load());//关闭窗口后刷新列表
			}else if(t.id=='edit'){
				let vid=Number(t.getAttribute('itemID'));
				let wid=VideoEditWindow.formatId(vid);
				if(FWindow.focus(wid))return;
				//新建视频编辑窗口
				new VideoEditWindow({
					vid:vid,
					location:'center',
					parent:document.body,
				}).center().returnValue.then(v=>v&&this.load());;//关闭窗口后刷新列表
			}
		});
		this.load();
	}
	async load(){
		let req={
			opt:'get',
			arg:{
				limit:[(this.page-1)*this.limit,this.limit],
				item:['vid','title','description','date','danmakuCount','playCount','hidden','cid'],
				search:this.vue.$data.search,
				cid:this.cid,
			}
		};
		return super.load('video',req,'vid');
	}
	async delete(ids){
		return super.delete('video','vid',ids,'视频');
	}
}
class CollectionList extends SimpleList{
	static listItems=[
		['cid','ID',`{{data.itemID}}`],
		['name','合集名',`<a v-bind:href="'../collection.php?id='+data.itemID" target="_blank">{{data.name}}</a>`],
		['description','描述',`{{data.description}}`],
		['vCount','视频',`<button id="video_list" v-bind:itemID="data.itemID">{{data.vCount}}</button>`],
		['hidden','隐',`{{data.hidden|isHidden}}`],
		['editButton','',`<button id="edit" v-bind:itemID="data.itemID">编辑</button>`],
	];
	constructor(ele){
		super({
			el:ele,
		});
		this.el_table.addEventListener('click',e=>{
			let t=e.target;
			if(t.id=='edit'){
				let cid=Number(t.getAttribute('itemID'));
				let wid=CollectionEditWindow.formatId(cid);
				if(FWindow.focus(wid))return;
				(new CollectionEditWindow({
					cid,
					location:'center',
					parent:document.body,
				})).returnValue.then(v=>this.load());;//关闭窗口后刷新列表;
			}else if(t.id=='video_list'){
				let cid=Number(t.getAttribute('itemID'));
				let wid=CollectionListWindow.formatId(cid);
				if(FWindow.focus(wid))return;
				(new CollectionListWindow({
					title:`合集视频:${cid}`,
					cid,
					id:wid,
					location:'center',
					parent:document.body,
				})).returnValue.then(v=>this.load());;//关闭窗口后刷新列表;
			}
		});
		this.load();
	}
	async load(){
		var req={
			opt:'get',
			arg:{
				limit:[(this.page-1)*this.limit,this.limit],
				item:['cid','name','description','hidden'],
				search:this.vue.$data.search,
				withVideoCount:true,
			}
		};
		return super.load('collection',req,'cid');
	}
	async delete(ids){
		return super.delete('collection','cid',ids,'合集');
	}
}
class DanmakuList extends SimpleList{
	static listItems=[
		['did','ID',`{{data.did}}`],
		['vid','视频',`{{data.vid}}`],
		['content','内容',`{{data.content}}`],
		['mode','模式',`{{data.mode}}`],
		['time','时间',`{{data.time | formatTime}}`],
		['color','颜色',`{{data.color}}`],
		['size','大小',`{{data.size}}`],
		['date','日期',`{{data.date | formatDate}}`],
	];
	constructor(ele,vid){
		super({
			el:ele,
			vueMixins:{
				filters:{
					formatTime(sec,total){
						let r,s=sec|0,h=(s/3600)|0;
						if(total>=3600)s=s%3600;
						r=[padTime((s/60)|0),padTime(s%60)];
						(total>=3600)&&r.unshift(h);
						return r.join(':');
					}
				}
			}
		});
		this.vid=vid;
		this.load();
	}
	async load(){
		let req={
			opt:'list',
			arg:{
				limit:[(this.page-1)*this.limit,this.limit],
				item:DanmakuList.listItems.map(i=>i[0]),
				search:this.vue.$data.search,
				vid:this.vid,
			}
		};
		return super.load('danmaku',req,'did');
	}
	async delete(ids){
		return super.delete('danmaku','did',ids,'弹幕');
	}
}
class EditWindow extends FWindow{
	constructor(opt){
		super(opt);
		this.el_content.innerHTML='<div></div>';
		let THIS=this;
		this.changed=0;
		this.vue=new Vue({
			el:this.el_content.firstChild,
			template:this.constructor.template,
			data:opt.data,
			mixins:opt.vueMixins,
			methods:{
				save(){
					THIS.save();
				},
				change(){
					THIS.changed++;
				}
			}
		});
	}
	beforeClose(){
		if(this.changed){
			this.focus();
			return confirm('此窗口有内容未保存，确定退出？');
		}
		return true;
	}
}
class CollectionEditWindow extends EditWindow{
	static formatId(v){
		return `window_collection_${v}`
	}
	static template=`<form onsubmit="return false;" style="display: flex;">
		<input type="text" v-model.trim="name" placeholder="合集名" maxlength="100" style="flex-grow: 1;">
		<textarea v-model.trim="description" placeholder="描述"></textarea>
		<span style="line-height:2em;" class="check_span">
			<label><input type="checkbox" v-model.trim="hidden">隐藏</label>
		</span>
		<span class="strech_for_fill"></span>
		<button @click="save" class="main small" style="float:right;">保存</button>
	</form>`;
	constructor(opt){
		let o={
			width:350,
			height:200,
			data:{
				name:'',
				description:'',
				hidden:false,
			},
		};
		super(Object.assign({},o,opt));
		if(opt.cid)
			this.load(opt.cid);
		this.setCid(opt.cid);
	}
	setCid(cid){
		this.id=this.constructor.formatId((cid!==undefined)?cid:this.constructor.random());
		this.setTitle(cid?`编辑合集:${cid}`:`新建合集`);
	}
	async load(cid){
		var req={
			opt:'get',
			arg:{
				item:['name','description','hidden'],
				cid,
			}
		};
		try{
			let r=await SAPI.get('collection',req);//请求列表
			if(!r.length)
				throw('未找到');
			r=r[0];
			r.hidden=r.hidden===1?true:false;
			Object.assign(this.vue.$data,r);
		}catch(err){
			alert(err.message||err);
		}
	}
	async save(){
		let info={};
		Object.assign(info,this.vue.$data);
		if(info.hidden===true)info.hidden=1;
		else if(info.hidden===false)info.hidden=0;
		if(!info.name){alert('没有标题');return;}
		let opt=this.opt;
		var mode=(typeof this.opt.cid ==='number')?'update':'add';
		try{
			let r=await SAPI.get('collection',{opt:mode,value:JSON.stringify(info),cid:opt.cid});
			if(mode=='update'&&r==0)throw new Error('未改动');
			if(!opt.cid){
				opt.cid=Number(r);
				this.setCid(opt.cid);
			}
			collectionList.load();
			this.changed=0;
			this.close(true);
		}catch(e){
			alert('错误:'+(e.message||e));
		}
	}
}
class VideoEditWindow extends EditWindow{
	static formatId(v){
		return `window_video_${v}`
	}
	static template=`<form @change="change" onsubmit="return false;" style="display: flex;">
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
</form>`;
	constructor(opt){
		let o={
			width:720,
			height:322,
			data:{
				title:'',
				cover:'',
				cid:'',
				description:'',
				address:'',
				option:'',
				hidden:false,
			},
			vueMixins:{
			},
		};
		super(Object.assign({},o,opt));
		if(opt.vid)
			this.load(opt.vid);
		this.setVid(opt.vid);
	}
	setVid(vid){
		this.id=this.constructor.formatId((vid!==undefined)?vid:this.constructor.random());
		this.setTitle(vid?`编辑视频:${vid}`:`新建视频`);
	}
	async load(vid){
		var req={
			opt:'get',
			arg:{
				item:['title','cover','description','address','option','cid','hidden'],
				vid,
			}
		};
		try{
			let r=await SAPI.get('video',req);//请求列表
			if(!r.length){
				alert('未找到');
				return;
			}
			r=r[0];
			r.hidden=r.hidden===1?true:false;
			Object.assign(this.vue.$data,r);
		}catch(err){
			alert(err.message||err);
		}
	}
	async save(){
		let info={};
		Object.assign(info,this.vue.$data);
		if(info.hidden===true)info.hidden=1;
		else if(info.hidden===false)info.hidden=0;
		if(!info.title){alert('没有标题');return;}
		if(!info.cid)info.cid=null;
		let opt=this.opt;
		var mode=(typeof this.opt.vid ==='number')?'update':'add';
		try{
			let r=await SAPI.get('video',{opt:mode,value:JSON.stringify(info),vid:opt.vid});
			if(mode=='update'&&r==0)throw new Error('未改动');
			if(!opt.vid){
				opt.vid=Number(r);
				this.setVid(opt.vid);
			}
			videoList.load();
			this.changed=0;
			this.close(true);
		}catch(e){
			alert('错误:'+(e.message||e));
		}
	}
}
class FillListWindow extends FWindow{
	constructor(opt){
		super(Object.assign({},{width:627,height:565},opt));
		this.el_content.innerHTML='<div></div>';
		this.el_content.style.width='100%';
		this.el_content.firstChild.style.width='100%';
	}
}
class DanmakuListWindow extends FillListWindow{
	static formatId(v){
		return `window_danmakuList_${v}`
	}
	constructor(opt){
		super(Object.assign({},{width:627,height:565},opt));
		new DanmakuList(this.el_content.firstChild,opt.vid);
	}
}
class CollectionListWindow extends FillListWindow{
	static formatId(v){
		return `window_collectionVideoList_${v}`
	}
	constructor(opt){
		super(Object.assign({},{width:950,height:565},opt));
		new VideoList(this.el_content.firstChild,opt.cid);
		this.el_content.firstChild.append('此删除会删掉视频条目，而非从合集移除。');
	}
}


var videoList=new VideoList('#video_List');
var collectionList=new CollectionList('#collection_List');
