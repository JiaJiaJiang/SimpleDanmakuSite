EC.addEvent("CoreReady",function(p){
	var specol="color:#fff;background:#000";
	Dinfo("%c执行菜单模块",specol);
	//菜单标签页样式
	addStyle("#menu_tagbar{height:100%;width:50px;background-color: rgba(126,160,168,0.9);position:absolute;top:0px;right:0px;transition:right 0.4s ease 0s;color:#fff;z-index:251;}");
	//菜单内容框样式
	addStyle("#menu_contentbar{height:100%;width:250px;background-color: rgba(202, 236, 249,0.8);position:absolute;top:0px;right:50px;overflow:hidden;transition:right 0.4s ease 0s;color:#fff;z-index:250;}");
	//标签容器样式
	addStyle("#menu_tagcontainer{height:auto;width:50px;overflow:hidden;position:absolute;top:30%;right:0px;color:#fff;}");
	//标签外壳样式
	addStyle(".menu_tagdiv{height:50px;width:50px;overflow:hidden;position:relative;cursor:pointer;transition:background-color 0.2s;font-size:40px;line-height:50px;text-align:center;}");
	addStyle(".menu_tagdiv:hover{background-color:rgba(255,255,255,0.3);}");
	//区块外壳样式
	addStyle(".menu_blockdiv{width:100%;right:-100%;overflow:hidden;position:relative;transition:right 0.3s ease-in-out,height 0.2s,opacity 0.2s;display:none;}");
	//按钮样式
	addStyle(".menu_button{width:100%;position:relative;transition:background-color 0.3s;cursor:pointer;font-size:30px;color:rgb(31, 89, 34);}");
	//按钮cover样式
	addStyle(".menu_buttoncover{width:100%;height:100%;position:absolute;transition:opacity 0.3s;opacity:0.4;background-color:#fff;top:0px;left:0px;}");
	addStyle(".menu_buttoncover:hover{opacity:0.1;}");
	//进度条样式
	addStyle(".menu_progerss{width:100%;height:100%;transition:width 0.3s;position:absolute;background-color:rgb(41,210,126);top:0px;left:0px;}");
	//范围条样式
	addStyle(".menu_range{width:100%;position:relative;}");
	//范围条覆盖层样式
	addStyle(".menu_range_cover{width:100%;height:100%;position:absolute;top:0px;left:0px;}");
	//范围条百分比样式
	addStyle("menu_range_precentage{height:100%;position:absolute;top:0px;right:0px;}");
	//范围条文字样式
	addStyle("menu_range_zi{width:100%;height:100%;}");
	//菜单对象
	function menuobj(){
		var m=this;
		m.currentTag="";
		m.display=true;
		m.movein=function(){
			m.display=true;
			m.tagbar.style.right="0px";
			m.contentbar.style.right="50px";
		}
		m.moveout=function(){
			m.display=false;
			m.tagbar.style.right="-50px";
			m.contentbar.style.right="-310px";
		}
		m.addTab=function(name,innerHTML){
			if(!name||!innerHTML||m.tags[name])return;
			var tag=c_ele("div");
			$Attr(tag,{name:name,className:"menu_tagdiv",innerHTML:innerHTML,addBlock:addBlock,removeBlock:removeBlock,remove:removetab,onclick:shifttab});
			m.tags[name]=tag;
			m.tagcontainer.appendChild(tag);
			if(!m.currentTag){
				m.currentTag=name;
			}
		}
		function shifttab(){
			var t=0;
			var cn=m.contentbar.childNodes;
			for(var i=cn.length;i--;){
				if(cn[i].tagname!=this.name){
					setTimeout(function(d){
						d.style.display="none";
					},t,cn[i]);
				}else{
					setTimeout(function(d){
						d.style.display="block";
					},t,cn[i]);
				}
			}
		}
		function addBlock(){
			var b=c_ele("div");
			b.className="menu_blockdiv";
			b.tagname=this.name;
			m.contentbar.appendChild(b);
			if(this.name==m.currentTag){
				b.style.display="block";
				setTimeout(function(){b.style.right="0%";},0);
			}else{
				$Attr(b.style,{right:"0px"});
			}
			return b;
		}
		function removeBlock(b){
			if(b&&b.tagname==this.name){
				if(b.tagname==m.currentTag){
					b.height=b.offsetHeight;
					setTimeout(function(){b.height=0;},0);
					setTimeout(function(){m.contentbar.removeChild(b);},200);
				}else{
					m.contentbar.removeChild(b);
				}
			}
		}
		function removetab(){
			var o=m.tags[this.name];
			if(o){
				m.tagcontainer.removeChild(o);
				for(var d in m.contentbar.childNode){
					if(d.tagname=this.name){
						m.contentbar.removeChild(d)
					}
				}
				delete m.tags[this.name];
			}
		}
		m.widget={
			button:function(text,fun){//按钮被点击即触发一次函数
				var but=c_ele("div"),butco=c_ele("div");
				$Attr(but,{className:"menu_button",innerHTML:"&nbsp;"+text,onclick:fun});
				butco.className="menu_buttoncover";
				but.appendChild(butco);
				addEleClass(but,"cantselect");
				return but;
			},
			switchbutton:function(text,fun,name,defaultvalue,donotsave){//参数函数接受0和1两个参数
				var swi=m.widget.button(text,m.widget.funs.switchbutton);
				swi.s=0;
				swi.fun=fun;
				if(name)swi.name=name;
				swi.save=(typeof donotsave=="boolean")?donotsave:true;
				swi.style.backgroundColor="#ccc";
				if(swi.save&&name){
					swi.s=getOption(name,"number");
					if(swi.onclick){
						swi.s=1^swi.s;
						swi.onclick();
					}
				}
				return swi;
			},
			progerss:function(style){
				var pro=c_ele("div");
				pro.className="menu_progerss";
				if(typeof style=="object")$Attr(pro.style,style);
				return pro;
			},
			range:function(text,min,max,step,fun,name,defaultvalue,donotsave){//参数函数接受滑动时所有的数值
				var far=c_ele("div");//范围条框架
				far.zi=c_ele("div");//说明文字
				far.co=c_ele("div");//cover
				far.pre=c_ele("div");//百分比
				far.progerss=m.widget.progerss();
				far.className="menu_range";
				far.co.className="menu_range_cover";
				far.pre.className="menu_range_precentage";
				far.zi.innerHTML=text;
				far.zi.className="menu_range_zi";
				far.appendChild(far.progerss);
				far.appendChild(far.pre);
				far.appendChild(far.zi);
				far.appendChild(far.co);


				addEleClass(far,"cantselect");
				return far;
			},
			funs:{
				switchbutton:function(){
					if(this.s===0){
						this.s=1;
						if(this.save&&this.name){
							setOption(this.name,1);
						}
						this.fun(1);
						this.style.backgroundColor="rgba(52, 164, 52, 0.55)";
					}else{
						this.s=0;
						if(this.save&&this.name){
							setOption(this.name,0);
						}
						this.fun(0);
						this.style.backgroundColor="rgba(173, 180, 176, 0.69)";
					}
				}
			}
		};
		m.tags={};
		(m.tagbar=c_ele("div")).id="menu_tagbar";
		(m.contentbar=c_ele("div")).id="menu_contentbar";
		(m.tagcontainer=c_ele("div")).id="menu_tagcontainer";
		addEleClass(m.tagbar,"cantselect");
		m.tagbar.appendChild(m.tagcontainer);
		p.videoframe.appendChild(m.tagbar);
		p.videoframe.appendChild(m.contentbar);

	}

	//设置菜单开关
	var menuswitch=$(p.mainbody,"#unknownbutton");
	$Attr(menuswitch,{id:"menuswitch",innerHTML:"Ħ"});
	document.styleSheets[document.styleSheets.length-1].insertRule("#menuswitch:hover{color:#33B888}",0);
	$Attr(menuswitch.style,{right:"25px",fontSize:"16px",lineHeight:"25px"});

	//创建菜单
	p.menu=new menuobj();

	aEL(menuswitch,"click",function(e){
		if(e.button===0){
			if(p.menu.display){
				p.menu.moveout();
			}else{
				p.menu.movein();
			}
		}
	});

	//首次视频开始播放时隐藏菜单
	var Eready=EC.addEvent("videoready",function(){
		function a(){
				p.menu.moveout();
				rEL(p.video,"playing",a);
		}
		aEL(p.video,"playing",a);
	});
	EC.fireEvent("menuready",p.menu);
});

/*
/
	添加标签(name,icondom对象)
	标签列表{}
		标签/
				添加区块(name) //返回区块div对象
				移除区块(对象)
	控件/
			按钮(callbackfunction)
			滑条(callbackfunction)
			开关(callbackfunction)
			输入框(callbackfunction)
	
*/