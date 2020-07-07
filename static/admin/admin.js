/*
The MIT License (MIT)
Copyright (c) luojia@luojia.me
*/
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
				parent:document.firstElementChild,
			}).center().returnValue.then(v=>v&&window.videoList&&videoList.load());;//关闭窗口后刷新列表
		},
		createCollection(){
			new CollectionEditWindow({
				location:'center',
				parent:document.firstElementChild,
			}).center().returnValue.then(v=>v&&window.collectionList&&collectionList.load());;//关闭窗口后刷新列表
		},
		danmakuViewer(){
			new DanmakuListWindow({
				title:`弹幕列表`,
				location:'center',
				parent:document.firstElementChild,
			}).center().returnValue.then(v=>v&&this.load());//关闭窗口后刷新列表
		}
	}
});

class List{
	static listTemplate=document.querySelector('#template-list').innerHTML;
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
				selector:opt.selector||true,
				button_selectAll:true,
				button_selectOpposite:true,
				button_delete:true,
				button_refresh:true,
			},
			watch:{
				limit:()=>this.load()
			},
			filters:{
				toSec(mills){
					return mills/1000;
				},
				formatTime(sec,total=sec){
					let r,s=sec|0,h=(s/3600)|0;
					if(total>=3600)s=s%3600;
					r=[padTime((s/60)|0),padTime(s%60)];
					(total>=3600)&&r.unshift(h);
					return r.join(':');
				},
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
				search2(){
					THIS.vue.$data.currentPage=1;
					THIS.load();
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
	delete(){
		return confirm('确定要删除吗？');
	}
	load(){
		this.page=this.page;
	}
	select(target){
		let boxes=[].slice.call(this.$$('input.selector'));
		switch(target){
			case 'all':boxes.forEach(i=>i.checked||i.click());break;
			case 'opposite':boxes.forEach(i=>i.click());break;
		}
	}
	insert(data){
		this.vue.$data.listData.push(data);
	}
	$(selector){return this.vue.$el.querySelector(selector)}
	$$(selector){return this.vue.$el.querySelectorAll(selector)}
	get selected(){return this.vue.$data.checked;}
	get el_table(){return this.vue.$refs.table}
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
		if(this.page>this.totalPage){
			this.page=this.totalPage;
			this.load();
			return;
		}
		this.vue.$data.loading=false;
	}
	addBottomButton(text,ev){
		let b=document.createElement('button');
		b.innerHTML=text;
		b.className='main small';
		b.addEventListener('click',ev);
		this.vue.$el.appendChild(b);
	}
	async delete(api,arg,ids,name){
		if(!super.delete())return;
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
		['title','标题',`<a v-bind:href="'../player/?id='+data.itemID" target="_blank">{{data.title}}</a>`],
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
					parent:document.firstElementChild,
				}).center().returnValue.then(v=>v&&this.load());//关闭窗口后刷新列表
			}else if(t.id=='edit'){
				let vid=Number(t.getAttribute('itemID'));
				let wid=VideoEditWindow.formatId(vid);
				if(FWindow.focus(wid))return;
				//新建视频编辑窗口
				new VideoEditWindow({
					vid:vid,
					location:'center',
					parent:document.firstElementChild,
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
					parent:document.firstElementChild,
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
					parent:document.firstElementChild,
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
class CollectionVideoList extends VideoList{
	constructor(ele,cid){
		super(ele,cid);
		this.vue.$refs.deleteButton.innerHTML='移除';
	}
	async delete(ids){
		if(!confirm('确定要移除吗？'))return;
		try{
			let affected=await SAPI.get('video',{
				opt:'batchUpdate',
				vid:ids.join(','),
				value:{cid:null},
			});//请求删除合集id
			this.load();
			alert('已移除'+affected+'个视频');
		}catch(err){
			alert(err.message||err);
		}
	}
}
class DanmakuList extends SimpleList{
	static listItems=[
		['did','ID',`{{data.did}}`],
		['vid','视频',`{{data.vid}}`],
		['content','内容',`{{data.content}}`],
		['mode','模式',`{{data.mode}}`],
		['time','时间',`{{data.time | toSec | formatTime}}`],
		['color','颜色',`{{data.color}}`],
		['size','大小',`{{data.size}}`],
		['date','日期',`{{data.date | formatDate}}`],
	];
	constructor(ele,vid){
		super({
			el:ele,
			vueMixins:{
			}
		});
		this.vid=vid;
		this.load();
	}
	async load(){
		this.page=this.page;
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
			template:document.querySelector(this.constructor.template).innerHTML,
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
	static template='#template-CollectionEditWindow';
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
			window.collectionList&&collectionList.load();
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
	static template='#template-VideoEditWindow';
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
		if(opt.vid>=0)
			this.load(opt.vid);
		this.setVid(opt.vid);
	}
	setVid(vid){
		this.id=this.constructor.formatId((vid!==undefined)?vid:this.constructor.random());
		this.setTitle(vid>=0?`编辑视频:${vid}`:`新建视频`);
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
		var mode=(typeof opt.vid ==='number')?'update':'add';
		try{
			let r=await SAPI.get('video',{opt:mode,value:JSON.stringify(info),vid:opt.vid});
			if(mode=='update'&&r==0)throw new Error('未改动');
			if(mode==='add'){
				opt.vid=Number(r);
				this.setVid(opt.vid);
			}
			window.videoList&&videoList.load();
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
		super(Object.assign({},{width:820,height:565},opt));
		this.list=new DanmakuList(this.el_content.firstChild,opt.vid);
	}
}
DanmakuListWindow.addDefaultEvent('afterContent',win=>{
	setTimeout(() => {
		win.list.addBottomButton('清空弹幕',async ()=>{
			if(!confirm('确定要清空此视频的弹幕吗？\n删除大量弹幕可能耗时较长，请等待。'))return;
			try{
				let affected=await SAPI.get('danmaku',{
					opt:'clear',
					vid:win.list.vid,
				});//批量删除视频弹幕
				win.list.load();
				alert('已删除'+affected+'条弹幕');
			}catch(err){
				alert(err.message||err);
			}
		});
	});
});
class CollectionAddVideoWindow extends FillListWindow{
	//addToCollection
	static formatId(v){
		return `window_videoList_${v}`
	}
	constructor(opt){
		super(Object.assign({},{width:820,height:730},opt));
		this.setTitle(`向合集${opt.cid}添加视频`)
		this.list=new VideoList(this.el_content.firstChild);
		this.list.addBottomButton('添加选中视频',async e=>{
			try{
				let affected=await SAPI.get('video',{
					opt:'batchUpdate',
					vid:this.list.vue.$data.checked.join(','),
					value:{cid:opt.cid},
				});//批量修改视频cid
				this.list.load();
				alert('已添加'+affected+'个视频');
			}catch(err){
				alert(err.message||err);
			}
		});
	}
}
class CollectionListWindow extends FillListWindow{
	static formatId(v){
		return `window_collectionVideoList_${v}`
	}
	constructor(opt){
		super(Object.assign({},{width:950,height:565},opt));
		this.list=new CollectionVideoList(this.el_content.firstChild,opt.cid);
		this.list.addBottomButton('添加',e=>{
			new CollectionAddVideoWindow({
				location:'center',
				parent:document.firstElementChild,
				cid:opt.cid
			}).center().returnValue.then(v=>v&&this.list.load());;//关闭窗口后刷新列表
		});
	}
}

switch(el_pageFrame.getAttribute('page')){
	case 'video':
		var videoList=new VideoList('#video_List');
		break;
	case 'collection':
		var collectionList=new CollectionList('#collection_List');
		break;
}
