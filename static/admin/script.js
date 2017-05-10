var $=document.querySelector.bind(document),
	$$=document.querySelectorAll.bind(document),
	_={};

//把所有有id的元素存入_对象
for(var list=$$('[id]'),i=list.length;i--;)
	_[list[i].id]=list[i];

function addEvents(target,events){
	if(!Array.isArray(target))target=[target];
	for(let e in events)
		e.split(/\,/g).forEach(function(e2){
			target.forEach(function(t){
				t.addEventListener(e2,events[e])
			});
		});
}

function limitIn(value,min,max){
	return value<min?min:(value>max?max:value);
}
function formatTime(sec,total){
	let r,s=sec|0,h=(s/3600)|0;
	if(total>=3600)s=s%3600;
	r=[padTime((s/60)|0),padTime(s%60)];
	(total>=3600)&&r.unshift(h);
	return r.join(':');
}
function padTime(n){//pad number to 2 chars
	return n>9&&n||'0'+n;
}

function _Obj(t){return (typeof t == 'object');}
function Object2HTML(obj,func){
	let ele,o,e;
	if(typeof obj==='string' ||typeof obj==='number')return document.createTextNode(obj);//text node
	if(obj===null || typeof obj !=='object' || '_' in obj === false || typeof obj._ !== 'string' || obj._=='')return;//if it dont have a _ prop to specify a tag
	ele=document.createElement(obj._);
	//attributes
	if(_Obj(obj.attr))for(o in obj.attr)ele.setAttribute(o,obj.attr[o]);
	//properties
	if(_Obj(obj.prop))for(o in obj.prop)ele[o]=obj.prop[o];
	//events
	if(_Obj(obj.event))for(o in obj.event)ele.addEventListener(o,obj.event[o]);
	//childNodes
	if(_Obj(obj.child)&&obj.child.length>0)
		obj.child.forEach(o=>{
			e=(o instanceof Node)?o:Object2HTML(o,func);
			(e instanceof Node)&&ele.appendChild(e);
		});
	func&&func(ele);
	return ele;
}
var O2H=Object2HTML;

function List(tableHeads,opt){
	if(!(this instanceof List))return new List(tableHeads);
	this.option={
		editable:true,
	};
	Object.assign(this.option,opt);
	var thisList=this;
	this.listInfo={
		page:1,
		totalPage:1,
		totalCount:0,
		limit:20,
	};
	
	var __=this._={};
	this.frame=O2H(
		{_:'div',attr:{class:'List'},child:[
			{_:'input',attr:{id:'search',placeholder:'搜索',class:'search'}},
			{_:'table',attr:{id:'table',border:1},child:[
				{_:'tr',attr:{class:'tableHead'},child:[{_:'th'}]}
			]},
			{_:'div',attr:{class:'controls',id:'controls'},child:[
				{_:'button',attr:{id:'selectAll'},child:['全选'],event:{click:function(){thisList.select('all')}}},
				{_:'button',attr:{id:'selectOpposite'},child:['反选'],event:{click:function(){thisList.select('opposite')}}},
				{_:'button',attr:{id:'deleteSelected'},child:['删除'],event:{click:function(){thisList.deleteSelected(thisList.getSelectedItem())}}},
				{_:'button',attr:{id:'refresh'},child:['刷新'],event:{click:function(){thisList.load()}}},

				{_:'span',attr:{class:'page'},child:[
					{_:'button',attr:{id:'prePage'},child:['上一页']},
					{_:'input',attr:{id:'current_page',value:1}},
					'/',
					{_:'input',attr:{id:'total_page',value:1,contenteditable:false}},
					{_:'button',attr:{id:'aftPage'},child:['下一页']},
					{_:'span',attr:{style:'margin-left: 1em;'},child:[
						'总数:',
						{_:'input',attr:{id:'total_count',placeholder:'0'}},
					]},
				]},
			]}
		]}
	);
	for(var list=this.frame.querySelectorAll('[id]'),i=list.length;i--;)
		__[list[i].id]=list[i];
	var trth=this.frame.querySelector('tr');
	this.tableItems=[];
	for(var n in tableHeads){
		this.tableItems.push(n);
		trth.appendChild(O2H({_:'th',child:[tableHeads[n]]}));
	}

	addEvents([__.search,__.current_page],{
		keydown:function(e){
			if(e.keyCode==13){
				thisList.page=1*__.current_page.value;
			}
		}
	});
	addEvents([__.prePage,__.aftPage],{
		click:function(e){
			var p=thisList.page,total=Math.ceil(this.count/this.limit);
			if(e.target.id=='prePage'){
				p-=1;
			}else{
				p+=1;
			}
			thisList.page=p;
		}
	});
	this.table.addEventListener('click',function(e){
		if(e.target.id=='edit')
			thisList.edit(e.target.parentNode.parentNode.items);

	});
	if(this.option.editable)
		trth.appendChild(O2H({_:'th',child:[' ']}));
}
Object.defineProperties(List.prototype,{
	limit:{
		get:function(){return this.listInfo.limit;},
		set:function(v){
			v=limitIn(v,1,Infinity);
			this.listInfo.limit=v;
		},
	},
	page:{
		get:function(){return this.listInfo.page;},
		set:function(v){
			v=limitIn(v,1,this.totalPage);
			this.listInfo.page=v;
			this._.current_page.value=v;
			this.load();
		},
	},
	totalPage:{
		get:function(){return this.listInfo.totalPage;},
		set:function(v){
			v=limitIn(v,1,Infinity);
			this.listInfo.totalPage=v;
			this._.total_page.value=v;
		},
	},
	totalCount:{
		get:function(){return this.listInfo.totalCount;},
		set:function(v){
			v=limitIn(v,0,Infinity);
			this.listInfo.totalCount=v;
			this.totalPage=Math.ceil(this.totalCount/this.limit);
			this._.total_count.value=v;
		},
	},
	table:{
		get:function(){return this._.table;}
	},
	controls:{
		get:function(){return this._.controls;}
	}
});
List.prototype.clearTable=function(){
	for(var i=this.table.childNodes.length;--i;)
		this.table.removeChild(this.table.childNodes[i]);
};
List.prototype.checkboxList=function(){
	return [].slice.call(this.table.querySelectorAll('input.selector'));
};
List.prototype.select=function(opt){
	this.checkboxList().forEach(function(i){
		var v=(opt=='all'?true:false);
		switch(opt){
			case 'opposite':{
				v=!i.checked;break;
			}
		}
		i.checked=v;
	});
};
List.prototype.getSelectedCheckBox=function(){
	var list=[];
	this.checkboxList().forEach(function(i){i.checked&&list.push(i);});
	return list;
};
List.prototype.getSelectedItem=function(){
	var list=[];
	this.checkboxList().forEach(function(i){i.checked&&list.push(i.parentNode.parentNode.items);});
	return list;
};
List.prototype.insert=function(items,rawItems){
	var tr=O2H({_:'tr',child:[{_:'td',child:[{_:'input',attr:{type:'checkbox',class:'selector'}}]}]});
	tr.items=rawItems||items;
	this.tableItems.forEach(function(i){
		tr.appendChild(O2H({_:'td',attr:{itemName:i},child:[items[i]]}));
	});
	if(this.option.editable)tr.appendChild(O2H({_:'td',child:[{_:'button',attr:{id:'edit'},child:['编辑']}]}));
	this.table.appendChild(tr);
};
List.prototype.load=function(){};
List.prototype.deleteSelected=function(){};
List.prototype.edit=function(i){console.log(i)};

var editing={//保存正在编辑的内容的id,undefined为新建
	video:undefined,
	danmaku:undefined,
	collection:undefined,
}

var Editor={
	name:null,
	$:function(name){
		this.name=name;
		return this;
	},
	display:function(bool){
		if(bool==undefined)bool=_['edit_'+this.name+'_form'].hidden;
		_['edit_'+this.name+'_form'].hidden=!bool;
		_['edit_'+this.name+'_form'].style.display=bool?'flex':'none';
		return this;
	},
	setID:function(id){
		editing[this.name]=id;
		if(id==undefined)id='新建';
		_['editing_'+this.name+'_id'].innerHTML=id;
		return this;
	}
}


//video list
var videoListItems={vid:'ID',title:'标题',description:'描述',date:'日期',danmakuCount:'弹',playCount:'播',hidden:'隐',cid:'合'};
var videoList=new List(videoListItems);
_.video_list.appendChild(videoList.frame);
videoList.table.addEventListener('click',function(e){
	if(e.target.getAttribute('itemname')=='danmakuCount'){
		danmakuList.vid=e.target.parentNode.items.vid;
		danmakuList._.search.value='';
		danmakuList.page=1;
		danmakuList.frame.scrollIntoView(false);
	}
});
videoList.load=function(){
	var search=this._.search.value,thisList=this;
	var req={
		opt:'get',
		arg:{
			limit:[(this.page-1)*this.limit,this.limit],
			item:Object.keys(videoListItems)
		}
	};
	if(search){//添加搜索条件
		req.arg.condition=['vid=? || cid=? || title LIKE ? || description LIKE ?'];
		req.arg.arg=[search,search,'%'+search+'%','%'+search+'%'];
	}
	SAPI.get('video',req,function(err,r){//请求列表
		if(err){
			alert(err.message);
			return;
		}
		thisList.clearTable();
		r.forEach(function(items){
			v=Object.assign({},items);
			if(typeof v.date === 'number')v.date=(new Date(v.date*1000)).toLocaleString();
			v.title=O2H({_:'a',attr:{href:'../player?id='+v.vid,target:target="_blank"},child:[v.title]});
			v.vid=O2H({_:'a',attr:{href:'../videoinfo.php?id='+v.vid,target:target="_blank"},child:[v.vid]});
			v.hidden=v.hidden?'Y':'';
			thisList.insert(v,items);
		});
	});
	req.arg.countMode=true;
	SAPI.get('video',req,function(err,r){//请求总数
		if(err){
			alert(err.message);
			return;
		}
		thisList.totalCount=r[0].resultCount;
	});
	
}
videoList.edit=function(i){
	editing.video=i.vid;
	var req={
		opt:'get',
		arg:{
			item:['title','cover','description','address','option','cid','hidden'],
			condition:['vid=?'],
			arg:[i.vid]
		}
	};
	SAPI.get('video',req,function(err,r){//请求列表
		if(err){
			alert(err.message);
			return;
		}
		if(!r.length){
			alert('未找到');
			return;
		}
		r=r[0];
		for(var n in r){
			_.edit_video_form.elements[n].value=r[n];
		}
		_.edit_video_form.elements.hidden.checked=(r.hidden=='1');
		Editor.$('video').setID(i.vid).display(true);
		_.edit_video_form.scrollIntoView(false);
	});
}
videoList.deleteSelected=function(list){
	var l=[];
	list.forEach(function(d){l.push(d.vid)});
	var req={
		opt:'delete',
		vid:l.join(','),
	};
	SAPI.get('video',req,function(err,affected){//请求列表
		if(err){
			alert(err.message);
			return;
		}
		videoList.load();
		alert('已删除'+affected+'个视频');
	});
}
videoList.load();

//danmaku list
var danmakuListItems={did:'ID',vid:'视频',content:'内容',mode:'模式',time:'时间',color:'颜色',size:'大小',date:'日期'};
var danmakuList=new List(danmakuListItems,{editable:false});
_.danmaku_list.appendChild(danmakuList.frame);
danmakuList.vid=null;//用于video加载模式
addEvents(danmakuList._.search,{
	'input,keydown':function(){
		danmakuList.vid=null;
	}
});
danmakuList.load=function(){
	var search=this._.search.value,thisList=this;
	var req={
		opt:'list',
		arg:{
			limit:[(this.page-1)*this.limit,this.limit],
			item:Object.keys(danmakuListItems)
		}
	};
	if(search){
		if(search){//添加搜索条件
			req.arg.condition=['did=? || content LIKE ?'];
			req.arg.arg=[search,'%'+search+'%'];
		}else{return;}
		
	}else{
		req.arg.condition=['vid=?'];
		req.arg.arg=[danmakuList.vid];
	}
	SAPI.get('danmaku',req,function(err,r){//请求列表
		if(err){
			alert(err.message);
			return;
		}
		thisList.clearTable();
		r.forEach(function(items){
			d=Object.assign({},items);
			if(typeof d.date === 'number')d.date=(new Date(d.date*1000)).toLocaleString();
			d.time=formatTime((d.time/1000)|0);
			thisList.insert(d,items);
		});
	});
	req.arg.countMode=true;
	SAPI.get('danmaku',req,function(err,r){//请求总数
		if(err){
			alert(err.message);
			return;
		}
		thisList.totalCount=r[0].resultCount;
	});
	
}
danmakuList.deleteSelected=function(list){
	var l=[];
	list.forEach(function(d){l.push(d.did)});
	var req={
		opt:'delete',
		did:l.join(','),
	};
	SAPI.get('danmaku',req,function(err,affected){//请求列表
		if(err){
			alert(err.message);
			return;
		}
		danmakuList.load();
		videoList.load();
		alert('已删除'+affected+'个弹幕');
	});
}
//danmakuList._.search.setAttribute('placeholder','视频ID');


//collection list
var collectionListItems={cid:'ID',name:'合集名',description:'描述',vCount:'视频',hidden:'隐'};
var collectionList=new List(collectionListItems);
_.collection_list.appendChild(collectionList.frame);
collectionList.load=function(){
	var search=this._.search.value,thisList=this;
	var req={
		opt:'get',
		arg:{
			limit:[(this.page-1)*this.limit,this.limit],
			item:Object.keys(collectionListItems)
		}
	};
	if(search){//添加搜索条件
		req.arg.condition=['C.cid=? || name LIKE ? || description LIKE ?'];
		req.arg.arg=[search,'%'+search+'%','%'+search+'%'];
	}
	SAPI.get('collection',req,function(err,r){//请求列表
		if(err){
			alert(err.message);
			return;
		}
		thisList.clearTable();
		r.forEach(function(items){
			c=Object.assign({},items);
			c.cid=O2H({_:'a',attr:{href:'../collection.php?id='+c.cid,target:target="_blank"},child:[c.cid]});
			c.hidden=c.hidden?'Y':'';
			thisList.insert(c,items);
		});
	});
	req.arg.countMode=true;
	SAPI.get('collection',req,function(err,r){//请求总数
		if(err){
			alert(err.message);
			return;
		}
		thisList.totalCount=r[0].resultCount;
	});
}
collectionList.edit=function(i){
	editing.collection=i.cid;
	var req={
		opt:'get',
		arg:{
			item:['name','description','hidden'],
			condition:['cid=?'],
			arg:[i.cid]
		}
	};
	SAPI.get('collection',req,function(err,r){//请求列表
		if(err){
			alert(err.message);
			return;
		}
		if(!r.length){
			alert('未找到');
			return;
		}
		r=r[0];
		for(var n in r){
			_.edit_collection_form.elements[n].value=r[n];
		}
		_.edit_collection_form.elements.hidden.checked=(r.hidden=='1');
		Editor.$('collection').setID(i.cid).display(true);
		_.edit_collection_form.scrollIntoView(false);
	});
}
collectionList.deleteSelected=function(list){
	var l=[];
	list.forEach(function(d){l.push(d.cid)});
	var req={
		opt:'delete',
		cid:l.join(','),
	};
	SAPI.get('collection',req,function(err,affected){//请求列表
		if(err){
			alert(err.message);
			return;
		}
		collectionList.load();
		alert('已删除'+affected+'个合集');
	});
}
collectionList.load();


//事件
var events=[
//video editor
[_.new_video,{
	click:function(){
		_.edit_video_form.reset();
		Editor.$('video').setID(undefined).display(true);
	}
}
],

[_.submit_video,{
	click:function(){
		var info={},eles;
		for(var eles=_.edit_video_form.elements,i=eles.length;i--;){
			if(!eles[i].name)continue;
			info[eles[i].name]=eles[i].value;
			if(eles[i].name=='hidden'){info.hidden=1*eles.hidden.checked;}
		}
		if(!info.cid||!Number.isInteger(1*info.cid))info.cid=null;
		console.log(info)
		var mode=(typeof editing.video ==='number')?'update':'add';
		SAPI.get('video',{opt:mode,value:JSON.stringify(info),vid:editing.video},function(err,r){
			try{
				if(err)throw(err);
				if(mode=='update'&&r==0)throw new Error('未改动');
				if(!editing.video)editing.video=Number(r);
				videoList.load();
				Editor.$('video').display(false);
			}
			catch(e){
				console.error(e);
				alert('错误:'+e.message);
				return;
			}
		});
	}
}
],

[_.hide_video_editor,{
	click:function(){Editor.$('video').display(false)}
}],

//collection editor
[_.new_collection,{
	click:function(){
		_.edit_collection_form.reset();
		Editor.$('collection').setID(undefined).display(true);
	}
}
],

[_.submit_collection,{
	click:function(){
		var info={},eles;
		for(var eles=_.edit_collection_form.elements,i=eles.length;i--;){
			if(!eles[i].name)continue;
			info[eles[i].name]=eles[i].value;
			if(eles[i].name=='hidden'){info.hidden=1*eles.hidden.checked;}
		}
		console.log(info)
		var mode=(typeof editing.collection ==='number')?'update':'add';
		SAPI.get('collection',{opt:mode,value:JSON.stringify(info),cid:editing.collection},function(err,r){
			try{
				if(err)throw(err);
				if(mode=='update'&&r==0)throw new Error('未改动');
				if(!editing.collection)editing.collection=Number(r);
				collectionList.load();
				Editor.$('collection').display(false);
			}
			catch(e){
				console.error(e);
				alert('错误:'+e.message);
				return;
			}
		});
	}
}
],

[_.hide_collection_editor,{
	click:function(){Editor.$('collection').display(false)}
}],

];

events.forEach(function(e){
	addEvents(e[0],e[1]);
});

