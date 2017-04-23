var $=document.querySelector.bind(document),
	$$=document.querySelectorAll.bind(document),
	_={};

//把所有有id的元素存入_对象
for(var list=$$('[id]'),i=list.length;i--;)
	_[list[i].id]=list[i];

function addEvents(target,events){
	for(let e in events)
		e.split(/\,/g).forEach(e2=>target.addEventListener(e2,events[e]));
}

function _Obj(t){return (typeof t == 'object');}
function Object2HTML(obj,func){
	let ele,o,e;
	if(typeof obj==='string' ||typeof obj==='number')return document.createTextNode(obj);//text node
	if('_' in obj === false || typeof obj._ !== 'string' || obj._=='')return;//if it dont have a _ prop to specify a tag
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
	this._={};
	this.frame=O2H(
		{_:'div',attr:{class:'List'},child:[
			{_:'input',attr:{id:'search',placeholder:'搜索',class:'search'}},
			{_:'table',attr:{id:'table',border:1},child:[
				{_:'tr',attr:{class:'tableHead'},child:[{_:'th'}]}
			]},
			{_:'div',attr:{class:'controls',id:'controls'},child:[
				{_:'button',attr:{id:'selectAll'},child:['全选']},
				{_:'button',attr:{id:'selectOpposite'},child:['反选']},
				{_:'span',attr:{class:'page'},child:[
					{_:'input',attr:{id:'current_page'}},
					'/',
					{_:'input',attr:{id:'total_page',contenteditable:false}},
				]},
			]}
		]}
	);
	for(var list=this.frame.querySelectorAll('[id]'),i=list.length;i--;)
		this._[list[i].id]=list[i];
	this.table=this._.table;
	this.controls=this._.controls;
	var trth=this.frame.querySelector('tr');
	this.tableItems=[];
	for(var n in tableHeads){
		this.tableItems.push(n);
		trth.appendChild(O2H({_:'th',child:[tableHeads[n]]}));
	}
	trth.appendChild(O2H({_:'th',child:[' ']}));
	this._.selectAll.onclick=function(){
		thisList.select('all');
	}
	this._.selectOpposite.onclick=function(){
		thisList.select('opposite');
	}
	this.refreshPage(1,0);
}
List.prototype.clear=function(){
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
List.prototype.getSelected=function(){
	var list=[];
	this.checkboxList().forEach(function(i){i.checked&&list.push(i);});
	return list;
};
List.prototype.insert=function(items){
	var tr=O2H({_:'tr',child:[{_:'td',child:[{_:'input',attr:{type:'checkbox',class:'selector'}}]}]});
	tr.items=items;
	this.tableItems.forEach(function(i){
		tr.appendChild(O2H({_:'td',prop:{itemName:i},child:[items[i]||'']}));
	});
	tr.appendChild(O2H({_:'td',child:[{_:'button',child:['编辑']}]}));
	this.table.appendChild(tr);
};
List.prototype.load=function(){};
List.prototype.refreshPage=function(current,total){
	this._.current_page.value=current;
	if(total!==undefined)this._.total_page.value=total;
};
List.prototype.resetLimit=function(limit) {
	this.limit=limit;
	this.refreshPage(1,Math.ceil(this.count/limit));
	this.load();
}


var editing={//保存正在编辑的内容的id,undefined为新建
	video:undefined,
	danmaku:undefined,
	collection:undefined,
}

//video
var videoList=new List({vid:'ID',title:'标题',description:'描述',danmakuCount:'弹幕数',playCount:'播放数',hidden:'隐藏',cid:'合集',data:'日期'});
_.video_list.appendChild(videoList.frame);
videoList.load=function(){
	var search=_.search_video.value;
	if(search){//添加搜索条件

	}

}


//事件
var events=[

[$('#new_video'),{
	click:function(){
		editing.video=undefined;
		_.edit_video_form.reset();
		_.edit_video_form.hidden=!_.edit_video_form.hidden;
	}
}
],

[$('#submit_video'),{
	click:function(){
		var info={},eles;
		for(var eles=_.edit_video_form.elements,i=eles.length;i--;){
			if(!eles[i].name)continue;
			info[eles[i].name]=eles[i].value;
			if(eles[i].name=='hidden'){info.hidden=1*eles.hidden.checked;}
		}
		console.log(info)
		var mode=(typeof editing.video ==='number')?'update':'add';
		SAPI.get('video',{opt:mode,value:JSON.stringify(info),vid:editing.video},function(err,xhr){
			try{
				var r=JSON.parse(xhr.responseText);
				if(err)throw(err);
				if(r.code!=0)throw new Error(r.result);
				if(mode=='update'&&r.result==0)throw new Error('未改动');
				if(!editing.video)editing.video=Number(r.result);
				alert('成功');
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

];

events.forEach(function(e){
	addEvents(e[0],e[1]);
});

