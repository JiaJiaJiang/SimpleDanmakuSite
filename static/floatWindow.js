/*
The MIT License (MIT)
Copyright (c) luojia@luojia.me
*/
(function () {
var windowTemplate =`<div>
	<div id="fWindowUIFrame">
		<div id="fWindowTitleBar">
			<div id="fWindowTitle" mousedragevent="true"></div>
			<div id="fWindowFrameController">
				<div type="normalize">*</div>
				<div type="maximize">+</div>
				<div type="close">×</div>
			</div>
		</div>
		<div id="fWindowContentFrame">
			<div id="fWindowContent"></div>
		</div>
	</div>
	<div id="fWindowResizer"></div>
</div>
`;
var windowStyles=[
	'$frame {position:absolute;top:50%;left:50%;width:20em;height:10em;}',
	'$frame #fWindowUIFrame{border-radius: 0.3em;overflow: hidden;background:#fff;border:2px solid #bdbdbd;box-sizing:border-box;position:absolute;top:0;left:0;height:100%;width:100%;display:flex;flex-direction:column;align-content:stretch;}',
	'$frame.maximize{top:0!important;left:0!important;width:100%!important;height:100%!important;}',
	'$frame #fWindowTitleBar{flex-shrink:0;background:linear-gradient(45deg, #a2a2a2, transparent);height:1.5em;line-height:1em;width:100%;position:relative;flex-grow:0;}',
	'$frame.active #fWindowTitleBar{background:linear-gradient(45deg, #4498fb, transparent);} ',
	'$frame #fWindowTitleBar>#fWindowTitle{width:100%;position:absolute;border:none;cursor:default;padding:0.3em;box-sizing:border-box;height:100%;color:#4e4e4e;overflow:hidden;word-break:keep-all;}',
	'$frame #fWindowTitleBar>#fWindowFrameController{user-select: none;height:100%;font-size:1.2em;width:fit-content;position:absolute;right:0;top:0;}',
	'$frame #fWindowTitleBar>#fWindowFrameController>div{font-weight:700;font-family:monospace;background:#e8e8e8;display:inline-block;border:1px solid #ccc;cursor:pointer;box-sizing:border-box;width:1.7em;height:100%;text-align:center;text-shadow:1px 1px 1px #7d7d7d;vertical-align:middle;line-height:1.5em;}',
	'$frame #fWindowTitleBar>#fWindowFrameController>div[type="close"]{background:red;color:#fff;}',
	'$frame.maximize #fWindowTitleBar>#fWindowFrameController>div[type="maximize"]{display:none;}',
	'$frame #fWindowTitleBar>#fWindowFrameController>div[type="normalize"]{display:none;}',
	'$frame.maximize #fWindowTitleBar>#fWindowFrameController>div[type="normalize"]{display:inline-block;}',
	'$frame #fWindowContentFrame{flex-grow:1;overflow:auto;width:100%;background:#f3f3f3;}',
	'$frame #fWindowContent{display: inline-block;}',
	'$frame #fWindowResizer>div{position:absolute;width:4px;height:4px;}',
	'$frame #fWindowResizer>div[type="vertical"]{height:100%;top:0;cursor:e-resize;}',
	'$frame #fWindowResizer>div[type="horizontal"]{width:100%;left:0;cursor:n-resize;}',
	'$frame #fWindowResizer>div#L{left:-2px;}',
	'$frame #fWindowResizer>div#R{right:-2px;}',
	'$frame #fWindowResizer>div#T{top:-2px;}',
	'$frame #fWindowResizer>div#B{bottom:-2px;}',
	'$frame #fWindowResizer>div#LT{left:-2px;top:-2px;cursor:nwse-resize;}',
	'$frame #fWindowResizer>div#LB{left:-2px;top:100%;cursor:nesw-resize;}',
	'$frame #fWindowResizer>div#RT{right:-2px;top:-2px;cursor:nesw-resize;}',
	'$frame #fWindowResizer>div#RB{right:-2px;top:100%;cursor:nwse-resize;}',
	'',
];

class FWindow{
	static random(){return (Math.random()*0xFFFFFFFFFFFFFF).toString(16);}
	static randomPrefix=this.random();
	static defaultOpt={
		parent:null,
		title:'untitled',
		width:300,
		left:0,
		top:0,
		height:200,
		focus:true,
		minWidth:168,
		minHeight:62,
		get id(){let newid;do{newid='window_'+FWindow.random();}while(FWindow.windows.has(newid));return newid;},
		// beforeClose(){return true;},
	};
	static windows=new Map();//wid=>FWindow
	static windowStyles=windowStyles;
	static windowTemplate=windowTemplate;
	static vars={
		zIndex:99,//zIndex for actived window
		actived:null,//actived FWindow
	};
	static $(id){
		return this.windows.get(id);
	}
	static focus(id) {
		let w=this.$(id);
		if(w){
			w.focus();
			return true;
		}
		return false;
	}
	get el_content(){return this.ele.fWindowContent;}
	get id(){return this.opt.id;}
	set id(v){
		if(this.constructor.windows.has(v))
			throw(new Error(`id[${v}] already exists`));
		let w=this.constructor.$(this.id);
		if(w===this){
			this.constructor.windows.delete(this.id);
		}
		this.constructor.windows.set(v,this);
		this.opt.id=v;
	}
	//return a promise,resolve to the return value when closed
	get returnValue(){return this.vars.returnValue||(this.vars.returnValue=new Promise((ok)=>{this.vars.return=ok;}));}
	constructor(options={}){
		let opt=this.opt = Object.assign({},this.constructor.defaultOpt,options);
		this.ele={};
		this.vars={
			definedEvents:[],
		};
		//parse the template
		let tmpEle=document.createElement('div');
		tmpEle.innerHTML=this.constructor.windowTemplate;
		this.el_frame=tmpEle.firstChild;
		this.el_frame.fWindow=this;
		//frame css class
		this.el_frame.classList.add(`fWindowFrame_${this.constructor.randomPrefix}`);
		//collect elements
		[...this.el_frame.querySelectorAll('[id]')].forEach(e=>{this.ele[e.id]=e;});
		//resize areas
		['L', 'T', 'R', 'B', 'LT', 'LB', 'RT', 'RB'].forEach( i=> {
			let e=ele('div', { id: i }, this.ele.fWindowResizer);
			e.setAttribute('mousedragevent','true');//drag to resize
			if(i.length===2){
				e.setAttribute('type','corner');//4 corners
			}else{
				switch(i){
					case 'L':case 'R':e.setAttribute('type','vertical');break;
					default:e.setAttribute('type','horizontal');break;
				}
			}
		});
		//add to parent
		if(opt.parent)opt.parent.appendChild(this.el_frame);
		//set title
		if(opt.title)this.setTitle(opt.title);
		//set id
		this.id=opt.id;
		//set size
		this.width=opt.width;
		this.height=opt.height;
		//set location
		requestAnimationFrame(()=>{
			if(opt.location){
				switch(opt.location){
					case 'center':this.center();
				}
				return;
			}
			if('left' in opt && 'top' in opt){
				this.left=opt.left;
				this.top=opt.top;
			}else{
				this.center();
			}
		});
		//set content
		if('content'in opt){
			this.setContent(opt.content);
		}
		//active return promise
		this.returnValue;
		//prevent page scroll
		this._makeItLocalScroll(this.ele.fWindowContentFrame);
		//defined events
		this._defineEvents();
		//focus
		if(opt.focus)this.focus();
	}
	$(selector){
		return this.el_frame.querySelector(selector);
	}
	blur(){
		this.el_frame.classList.remove('active');
		if(this===this.constructor.vars.actived){
			this.constructor.vars.actived=null;
		}
		return this;
	}
	center(){
		this.left=(this.el_frame.parentNode.offsetWidth-this.width)/2;
		this.top=(this.el_frame.parentNode.offsetHeight-this.height)/2;
		return this;
	}
	close(returnValue){
		let beforeClose=this.opt.beforeClose||this.beforeClose;
		if(typeof beforeClose==='function'){
			if(!beforeClose.call(this))return false;//not ready to close
		}
		this.blur();
		this.ele=null;
		this.constructor.windows.delete(this.id);
		this.el_frame.parentNode&&this.el_frame.parentNode.removeChild(this.el_frame);
		this.el_frame.fWindow=undefined;
		this._removeAllEvents();
		this.vars.return(returnValue);
		return true;
	}
	event(selector,event,func){
		let el=(selector instanceof Node)?selector:this.$(selector);
		el.addEventListener(event,func);
		this.vars.definedEvents.push([el,event,func]);
	}
	fitContent(){
		requestAnimationFrame(e=>{
			this.height=this.el_frame.offsetHeight-this.ele.fWindowContentFrame.offsetHeight+this.el_content.offsetHeight;
			this.width=this.el_frame.offsetWidth-this.ele.fWindowContentFrame.offsetWidth+this.el_content.offsetWidth;
		});
		return this;
	}
	focus(){
		let cons=this.constructor;
		if(this===cons.vars.actived)return;
		cons.vars.actived && cons.vars.actived.blur();
		this.el_frame.classList.add('active');
		this.el_frame.style.zIndex=cons.vars.zIndex++;
		cons.vars.actived = this;
		return this;
	}
	setContent(content){
		if(content instanceof Node){
			this.el_content.innerHTML='';
			this.el_content.appendChild(content);
		}else{
			this.el_content.innerHTML=content;
		}
	}
	setTitle(title){this.ele.fWindowTitle.innerHTML=title;}
	maximize(bool=!this.isMaximized()){
		this.el_frame.classList[bool?'add':'remove']('maximize');
	}
	isMaximized(){
		return this.el_frame.classList.contains('maximize');
	}
	_defineEvents(){
		this.event(this.el_frame,'mousedown',e=>this.focus());//active window
		// this.event('#fWindowFrameController>div[type="close"]','click',e=>this.close());
		this.event('#fWindowResizer','mousedrag',e=>{
			let id=e.target.id;
			let rect=this.el_frame.getBoundingClientRect();
			if(id.indexOf('L')>-1){
				if(e.clientX>rect.left && this.width===this.opt.minWidth);
				else{
					let offset=e.clientX-rect.left;
					this.width-=offset;
					this.left+=offset;
				}
			}else if(id.indexOf('R')>-1){
				if(e.clientX<rect.left+rect.width && this.width===this.opt.minWidth);
				else this.width=e.clientX-rect.left;
			}
			if(id.indexOf('T')>-1){
				if(e.clientY>rect.top && this.height===this.opt.minHeight);
				else{
					let offset=e.clientY-rect.top;
					this.height-=offset;
					this.top+=offset;
				}
			}else if(id.indexOf('B')>-1){
				if(e.clientY<rect.top+rect.height && this.height===this.opt.minHeight);
				else this.height=e.clientY-rect.top;
			}
		});
		this.event('#fWindowTitle','mousedrag',e=>{
			if(this.isMaximized()){//cancel maximized
				let //thisRect=this.el_frame.getBoundingClientRect(),
					parentRect=this.el_frame.parentNode.getBoundingClientRect();
				this.left=e.clientX-parentRect.left-/* e.layerX/parentRect.width* */this.width/2;
				this.top=e.clientY-parentRect.top+5;
				this.maximize();
			}
			this.left+=e.movementX;
			this.top+=e.movementY;
		});
		this.event('#fWindowTitle','dblclick',e=>{
			this.maximize();
		});
		this.event('#fWindowFrameController','click',e=>{
			switch(e.target.getAttribute('type')){
				case 'maximize':this.maximize(true);break;
				case 'normalize':this.maximize(false);break;
				case 'close':this.close();break;//close window
			}
		});
	}
	_removeAllEvents(){
		for(let [el,event,func] of this.vars.definedEvents){
			el.removeEventListener(event,func);
		}
	}
	_makeItLocalScroll(i){
		this.event(i,'wheel', e=>{
			var t=e.target,x=0,y=0;
			if(i!=t && t.clientHeight<t.scrollHeight)return;
			if(i!=t && t.clientWidth<t.scrollWidth)return;
			e.preventDefault();
			e.deltaY && (i.scrollTop += e.deltaY);
			e.deltaX && (i.scrollLeft += e.deltaX);
		});
	}
	get left(){return getStyleNumber(this.el_frame,'left');}
	set left(v){this.el_frame.style.left=v+'px';}
	get top(){return getStyleNumber(this.el_frame,'top');}
	set top(v){this.el_frame.style.top=v+'px';}
	get width(){return getStyleNumber(this.el_frame,'width');}
	set width(v){this.el_frame.style.width=clamp(v,this.opt.minWidth,Infinity)+'px';}
	get height(){return getStyleNumber(this.el_frame,'height');}
	set height(v){this.el_frame.style.height=clamp(v,this.opt.minHeight,Infinity)+'px';}
}


(function(){//load window styles
	let url=URL.createObjectURL(new Blob([windowStyles.map(s=>s.replace('$frame',`.fWindowFrame_${FWindow.randomPrefix}`)).join('\n')],{type:'text/css'}));
	let dom_link=ele('link',{rel:'stylesheet',type:'text/css',href:url});
	document.head.appendChild(dom_link);
})();

//页面关闭前关闭窗口,如果窗口的数据没有保存就提示一下
window.addEventListener('beforeunload',e=>{
	var preventClose = false;
	for(let [wid,w] of FWindow.windows){
		if (!w.close()) {
			preventClose = true;
		}
	}
	if (preventClose) return '确定离开？似乎还有东西没有保存';
});
//check if click on a window
window.addEventListener('mousedown',e=>{
	let frame=findInEleChain(e.target,ele=>{
		if(ele.fWindow&&ele.fWindow instanceof FWindow)return true;
	},document.body);
	if(frame){
		frame.fWindow.focus();
	}else{
		if(FWindow.vars.actived)
			FWindow.vars.actived.blur();
	}
});

function getStyleNumber(ele,style){
	let s;
	if(!(ele.style[style])){
		s=document.defaultView.getComputedStyle(ele);
	}
	return Number((ele.style[style]||s[style]).replace('px',''))||0;
	
}
function ele(tag, proto, parent) {
	var e = document.createElement(tag);
	if (proto) Object.assign(e,proto);
	if (parent)parent.appendChild(e);
	return e;
}
function findInEleChain(ele,fun,topParent,maxCheck){
	var cure=ele,r;
	if(typeof maxCheck !== 'number' && maxCheck<1)maxCheck=-1;
	topParent||(topParent=document.documentElement);
	while(cure){
		maxCheck--;
		if(cure&&fun(cure))return cure;
		if(cure===topParent || maxCheck===0)break;
		cure=cure.parentNode;
	}
	return false;
}
var extendEvent={//扩展事件
	touchdrag:function(element,opt){
		var stats={},opt=Object.assign({},{
			preventDefault:true,//阻止触摸移动的默认行为
			allowMultiTouch:false//允许在多点触控时也触发这个事件
		},opt);
		element.addEventListener('touchstart',function(e){
			if(!opt.allowMultiTouch && e.changedTouches.length>1){stats={};return;}
			var ct=e.changedTouches;
			for(var t=ct.length;t--;){
				stats[ct[t].identifier]={x:ct[t].clientX,y:ct[t].clientY};
			}
		});
		element.addEventListener('touchmove',function(e){
			if(!opt.allowMultiTouch && e.touches.length>1){stats={};return;}
			var ct=e.changedTouches;
			for(var t=ct.length;t--;){
				var id=ct[t].identifier;
				if(!id in stats)continue;//不属于这个元素的事件
				var event=new TouchEvent('touchdrag',e);
				event.movementX=ct[t].clientX-stats[id].x;
				event.movementY=ct[t].clientY-stats[id].y;
				stats[id].x=ct[t].clientX;
				stats[id].y=ct[t].clientY;
				element.dispatchEvent(event);
			}
			if(opt.preventDefault)e.preventDefault();
		});
		element.addEventListener('touchend',function(e){
			var ct=e.changedTouches;
			for(var t=ct.length;t--;){
				var id=ct[t].identifier;
				if(id in stats)delete stats[id];
			}
		});
	},
	enableMouseDrag:function(){
		let dragging=null,dragged=false;
		window.addEventListener('mousedown',function(e){
			if(e.target.getAttribute('mousedragevent')!=='true')return;
			dragged=false;
			dragging=e.target;
		});
		window.addEventListener('mousemove',function(e){
			if(!dragging)return;
			if(!dragged){dragged=true;return;}
			e.preventDefault();
			e.movementX/=devicePixelRatio;
			e.movementY/=devicePixelRatio;
			var event=new MouseEvent('mousedrag',e);
			dragging.dispatchEvent(event);
		});
		window.addEventListener('mouseup',function(e){
			dragged=false;
			dragging=null;
		});
	},
};
extendEvent.enableMouseDrag();
function clamp(value,min,max){//limit value
	return value<min?min:(value>max?max:value);
}


window.FWindow=FWindow;
})();