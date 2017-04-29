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

function List(tableHeads){
	if(!(this instanceof List))return new List(tableHeads);
	var thisList=this;
	this.page=1;
	this.limit=20;
	this.count=0;
	this.editable=true;
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

				{_:'span',attr:{class:'page'},child:[
					{_:'input',attr:{id:'current_page'}},
					'/',
					{_:'input',attr:{id:'total_page',contenteditable:false}},
				]},
			]}
		]}
	);
	for(var list=this.frame.querySelectorAll('[id]'),i=list.length;i--;)
		__[list[i].id]=list[i];
	this.table=__.table;
	this.controls=__.controls;
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
				thisList.load();
			}
		}
	});

	this.table.addEventListener('click',function(e){
		if(e.target.id=='edit')
			thisList.edit(e.target.parentNode.parentNode.items);

	});
	this.refreshPage(1,0);
	setTimeout(function(){
		if(thisList.editable)
			trth.appendChild(O2H({_:'th',child:[' ']}));
	});
}
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
	if(this.editable)tr.appendChild(O2H({_:'td',child:[{_:'button',attr:{id:'edit'},child:['编辑']}]}));
	this.table.appendChild(tr);
};
List.prototype.load=function(){};
List.prototype.deleteSelected=function(){};
List.prototype.edit=function(i){console.log(i)};
List.prototype.refreshPage=function(current,totalCount,limit){
	this.page=this._.current_page.value=Number(current);
	if(limit!==undefined)this.limit=Number(limit);
	if(totalCount!==undefined)this.count=Number(totalCount);
	this._.total_page.value=Math.ceil(this.count/this.limit);
};


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
		danmakuList._.search.value=e.target.parentNode.items.vid;
		danmakuList.load();
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
		req.arg.condition=['vid=? || title LIKE ? || description LIKE ?'];
		req.arg.arg=[search,'%'+search+'%','%'+search+'%'];
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
		thisList.refreshPage(thisList._.current_page.value,r[0].resultCount);
	});
	
}
videoList.edit=function(i){
	editing.video=i.vid;
	var req={
		opt:'get',
		arg:{
			item:['title','cover','description','address','option','hidden'],
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
var danmakuList=new List(danmakuListItems);
_.danmaku_list.appendChild(danmakuList.frame);
danmakuList.load=function(){
	var search=this._.search.value,thisList=this;
	var req={
		opt:'list',
		arg:{
			limit:[(this.page-1)*this.limit,this.limit],
			item:Object.keys(danmakuListItems)
		}
	};
	if(search){//添加搜索条件
		req.arg.condition=['vid=?'];
		req.arg.arg=[search];
	}
	SAPI.get('danmaku',req,function(err,r){//请求列表
		if(err){
			alert(err.message);
			return;
		}
		thisList.clearTable();
		r.forEach(function(items){
			v=Object.assign({},items);
			if(typeof v.date === 'number')v.date=(new Date(v.date*1000)).toLocaleString();
			thisList.insert(v,items);
		});
	});
	req.arg.countMode=true;
	SAPI.get('danmaku',req,function(err,r){//请求总数
		if(err){
			alert(err.message);
			return;
		}
		thisList.refreshPage(thisList._.current_page.value,r[0].resultCount);
	});
	
}
danmakuList._.search.setAttribute('placeholder','视频ID');


//collection list
//video list
var collectionListItems={cid:'ID',name:'合集名',description:'描述',hidden:'隐'};
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
		req.arg.condition=['cid=? || name LIKE ? || description LIKE ?'];
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
		thisList.refreshPage(thisList._.current_page.value,r[0].resultCount);
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
	list.forEach(function(d){l.push(d.vid)});
	var req={
		opt:'delete',
		vid:l.join(','),
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

