/*
Belong to iTisso
Coder:LuoJia
 */
var DanmuPlayerVersion = "0.3.6";
var SiteDomain = "*";
var defaultOption = {
	TwoDCodeDanmu: true,
	ThreeDCodeDanmu: true,
	StorkeWidth: 0.25,
	ShadowWidth: 0,
	DanmuSpeed: 5,
	Debug: false,
	DefaultHideSideBar: false,
	DivCommonDanmu: false,
	RealtimeVary: false
};
function select_do(fun) {
	if (typeof fun != "function") {
		Dwarn("回调函数不是一个函数",fun);
		return;
	};
	for (var i = 0; i < this.length; i++) {
		fun(this[i], i, this.length);
	}
}
function d_select(query) {
	var root;
	if ((typeof arguments[0]) != 'string' && arguments[0] != null) {
		root = arguments[0];
		arguments[0] = arguments[1];
	} else {
		root = document;
	}
	return root.querySelector(arguments[0]);
}
function d_selectall(query) {
	var arr = [],
	root;
	if ((typeof arguments[0]) != 'string' && arguments[0] != null) {
		root = arguments[0];
		arguments[0] = arguments[1];
	} else {
		root = document;
	}
	arr = root.querySelectorAll(arguments[0]);
	arr.do = select_do;
	return arr;
}
function $Attr(obj,attrs){
	if(typeof attrs!="object")return;
	for (var i in attrs){
		obj[i]=attrs[i];
	}
}
var $ = d_select,
$$ = d_selectall;
function c_ele(tag) {
	return document.createElement(tag);
}
function addStyle(cssstr){
	document.styleSheets[document.styleSheets.length-1].insertRule(cssstr,0);
}

var _string_ = {
	removesidespace: function(string) {
		if (typeof string == 'string') {
			var s = string.replace(/\s+$/, '');
			s = s.replace(/^\s+/, '');
			return s;
		} else {
			return false;
		}
	}
};
function clone(obj){
  if(typeof(obj) != 'object') return obj;
  if(obj == null) return obj;
  var myNewObj ={};
  for(var i in obj)
    myNewObj[i] = clone(obj[i]);
  return myNewObj;
}
function rand(min, max) {
	return (min + Math.random() * (max - min)+0.5)|0;
}
function aEL(dom, e, fun) {
	//添加事件监听
	dom.addEventListener(e, fun, false)
}
function rEL(dom, e, fun) {
	//删除事件监听
	dom.removeEventListener(e, fun);
}
function getext(url) {
	//获取后缀
	if (typeof url == 'string') {
		ext = _string_.removesidespace(url);
		if (ext == '') return false;
		ext = ext.match(/(\.([0-9a-zA-Z]+))$/i);
		if (ext) {
			return ext[2].toLowerCase();
		} else {
			return false;
		}
	}
}
function getMin_Sec(time) {
	var t = {};
	t.min =(time-(time%60))/60;
	t.sec = Math.floor(time%60);
	return t;
}
function getMin_Sec_By_Million(time) {
	time /= 1000;
	return getMin_Sec(time);
}

var optioncache={};
function setOption(name, value,type) {
	if ((typeof name != 'string')) {
		Derror('错误的设置参数');
		return false;
	}
	if (localstoragesupport) {
		window.localStorage['playeroption:' + name] = value;
	} else {
		setCookie('playeroption:' + name, value);
	}
	if(!type)type=typeof value;
	if(type){
		switch(type){
			case "number":{
				optioncache[name]=Number(value);
				break;
			}
			case "boolean":{
				optioncache[name]=value?true:false;
				break;
			}
		}
	}else{
		optioncache[name]=value;
	}
}
function getOption(name,type) {
	if(optioncache[name]!=undefined)return optioncache[name];
	var value;
	if (localstoragesupport) {
		var re = window.localStorage['playeroption:' + name];
		if (re) {
			value=re;
		}
	} else {
		var re;
		if (re = getCookie('playeroption:' + name)) {
			value=re;
		} 
	}
	if(!value){
			if (defaultOption[name]) {
				value=defaultOption[name];
			} else {
				return false;
			}
		}
	if(!type){return optioncache[name]=value;}else{
		switch(type){
			case "number":{
				return optioncache[name]=Number(value);
				break;
			}
			case "boolean":{
				return optioncache[name]=value?true:false;
				break;
			}
		}
	}
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + '=');
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(';', c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return false;
}
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '': ';expires=' + exdate.toGMTString())
}
function requestFullscreen(dom) {
	if (dom.requestFullscreen) {
		dom.requestFullscreen();
	} else if (dom.msRequestFullscreen) {
		dom.msRequestFullscreen();
	} else if (dom.mozRequestFullScreen) {
		dom.mozRequestFullScreen();
	} else if (dom.webkitRequestFullscreen) {
		dom.webkitRequestFullscreen(dom['ALLOW_KEYBOARD_INPUT']);
	} else {
		Dwarn("Fullscreen API is not supported");
	}
}
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
}
function isFullscreen() {
	if (document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement) return true;
}
function removeEleClass(e, classname) {
	if (classname != '' && classname != ' ' && e) e.classList.remove(classname);
}
function addEleClass(e, classname) {
	if (classname != '' && classname != ' ' && e) {
		e.classList.add(classname);
	}
}
function createswitch(in_name, in_bool, in_colorleft, in_colorright, out_object) {
	if (out_object) {
		var e = out_object;
	} else {
		var e = c_ele('div');
	}
	if (in_name) {
		e.name = in_name;
	}
	e.setAttribute('type', 'switch');
	e.event = new Object();
	e.event.disabled = false;
	e.event.on = function() {
		e.event.bool = true;
		e.getElementsByTagName('div')[0].style.left = e.offsetWidth - 15 + 'px';
	}
	e.event.off = function() {
		e.event.bool = false;
		e.getElementsByTagName('div')[0].style.left = '0px';
	}
	if (in_bool || in_bool == 'true') {
		e.event.bool = true;
	} else {
		e.event.bool = false;
	}
	if (!in_colorleft) {
		in_colorleft = '#17B85E';
	}
	if (!in_colorright) {
		in_colorright = '#616161';
	}
	e.onclick = function() {
		if (e.event.disabled) return;
		if (e.event.bool) {
			e.event.off();
		} else {
			e.event.on();
		}
	}
	if (!e.style.position) e.style.position = 'relative';
	/*e.style.width = "70px";
	e.style.height = "20px";*/
	//e.style.overflow = "hidden";
	e.innerHTML = '<div class="switch_center" style="left:' + (e.event.bool ? '41px': '0px') + '""><div class="switch_left" style="background-color:' + in_colorleft + '"></div><div class="switch_right" style="background-color:' + in_colorright + '"></div></div>';
	if (!out_object) {
		return e;
	}
}
function createRange(in_name, min, max, value, out_object) {
	if (out_object) {
		var e = out_object;
	} else {
		var e = c_ele('div');
	}
	if (in_name) {
		e.name = in_name;
	}
	e.setAttribute('type', 'range');
	var bg = c_ele('div');
	e.appendChild(bg);
	e.appendChild(e.point = c_ele('div'));
	e.appendChild(e.cover = c_ele('div'));
	e.point.className = 'rangePoint';
	e.cover.className = 'rangeCover';
	bg.className = 'rangebg';
	e.min = (min || min === 0) ? min: 0;
	e.max = (max || max === 0) ? max: 1;
	e.title = e.value = ((value || value === 0) ? value: (e.defaultvalue ? e.defaultvalue: ((max + min) / 2)));
	e.point.style.left = (e.value - e.min) / (e.max - e.min) * 251 + 'px';
	e.
default = (e.defaultvalue || e.defaultvalue === 0) ? e.defaultvalue: e.value;
	e.onmousedown = function(e) {
		e.preventDefault();
		if (e.button === 0) {
			this.ranging = true;
			var x = e.offsetX || e.layerX;
			this.point.style.left = x + 'px';
			var va = this.min + (x / this.offsetWidth) * (this.max - this.min);
			this.sendValue(this.name, va);
		} else if (e.button == 2) {
			var x = this.offsetWidth * (this.
		default - this.min) / (this.max - this.min);
			this.point.style.left = x + 'px';
			this.sendValue(this.name, this.
		default);
		}
	}
	e.oncontextmenu = function(e) {
		e.preventDefault();
	}
	e.onmousemove = function(e) {
		e.preventDefault();
		var x = e.offsetX ||e.layerX;
		if (this.ranging) {
			this.point.style.left = x + 'px';
			var va = this.min + (x / this.offsetWidth) * (this.max - this.min);
			//this.title=Math.round((this.value=va)*100)/100;
			this.sendValue(this.name, va);
		}
		this.title = (this.min + (x / this.offsetWidth) * (this.max - this.min)).toFixed(3);
	}
	e.onmouseleave = function() {
		this.ranging = false;
	}
	e.onmouseup = function() {
		this.ranging = false;
	}

	e.sendValue = function() {};
	if (!e.style.position) e.style.position = 'relative';
	if (!out_object) {
		return e;
	}
}
function replaceCommonVideo(videodom) {
	var id;
	if ((id = Number(videodom.getAttribute('videoid'))) >= 0) {
		autocmd('danmuplayer', id,
		function(html) {
			videodom.outerHTML = html;
			initPlayer(id);
		})
	}
}
function UseDanmuPlayer() {
	var videos = $$('video[type="danmuplayer"]');
	for (var i = 0; i < videos.length; i++) {
		replaceCommonVideo(videos[i]);
	}
}
function isHexColor(color) {
	if (color) {
		if (color.length == 6 && color.match(/[\w\d]{6}/i)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
function toHexColor(colorString) {
	var c = colorString.match(/(\d+)/g);
	if (!c || c.length != 3) return false;
	var cs = '';
	for (var i = 0; i < c.length; i++) {
		if (c[i] <= 16) cs += '0';
		cs += Number(c[i]).toString(16);
	}
	return cs;
}
function initPlayer(_in_videoid) {
	var videoid = _in_videoid;
	var width, height;
	var player = {},
	intervals = {},
	controlfuns = {},
	danmufuns = {};
	localstoragesupport = window.localStorage ? true: false;
	player.info={
		id:_in_videoid,
		dc:0
	};
	var danmulist = player.danmulist=[],
	danmuarray = [],
	ready = false;
	var playersse;
	player.EC = new SimpleEvent();
	if (typeof loadplugins == "function") {
		loadplugins(player.EC);
		player.EC.fireEvent("pluginsloaded",player);
		//插件行为从这里开始有效
	}
	player.videoid=videoid;
	var core;
	player.assvar = {};
	var danmuStyle = {
		fontsize: 30,
		color: null,
		type: 0
	};
	var getVideoMillionSec;
	function setdom() {
		player.displaystat = 'normal';
		player.mainbody = $('.playermainbody[videoid="' + videoid + '"]');
		var mainbody = player.mainbody;
		player.controler = $(mainbody, '#controler');
		player.colorinput = $(mainbody, '#colorinput');
		player.colorview = $(mainbody, '#colorview');
		player.sendcover = $(mainbody, '#sendbox #sendboxcover');
		player.danmuctrl = $(mainbody, '#controler #danmuctrl');
		player.danmuinput = $(mainbody, '#sendbox #danmuinput');
		player.fullscreen = $(mainbody, '#controler #fullscreen');
		player.loop = $(mainbody, '#controler #loop');
		player.play_pause = $(mainbody, '#play_pause');
		player.progress = $(mainbody, '#progress');
		player.progressbar = $(mainbody, '#progress #progressbar');
		player.progresscover = $(mainbody, '#progress #progresscover');
		player.playbutton = $(mainbody, '#play_pause #play');
		player.pausebutton = $(mainbody, '#play_pause #pause');
		player.time = $(mainbody, '#controler #time');
		player.tipbox = $(player.mainbody, '#tipbox');
		player.sendbox = $(mainbody, '#sendbox');
		player.sendbutton=$(mainbody, '#sendbox #sendbutton');
		player.videoframe = $(mainbody, '#videoframe');
		player.videoframein = $(mainbody, '#videoframein');
		player.volume = $(mainbody, '#controler #volume');
		player.volumerange = $(mainbody, '#controler #volume #range');
		player.volumevalue = $(mainbody, '#controler #volume #range div');
		player.volumepercentage = $(mainbody, '#controler #volume span');
		player.volumestat = $(mainbody, '#controler #volume #stat');
		//makeTabGroup([[player.danmulistbutton, $(player.sidebar, '#danmupool')], [player.superdanmubutton, $(player.sidebar, '#superdanmueditor')], [player.optionbutton, player.optionpannel]]);
		//makeTabGroup([[$(player.sidebar, '#chooseText'), $(player.sidebar, '#SuperTextTab')], [$(player.sidebar, '#chooseCode'), $(player.sidebar, '#SupeCodeTab')]]);
		player.danmumark = $(mainbody, "#danmumark");
		danmumarkct = player.danmumark.getContext("2d");
		progressct = player.progressbar.getContext("2d");
		player.progressbar.height = 9;
		(player.danmuContextMenu = c_ele('div')).className = 'textContextMenu';
		playersse = player.mainbody.getAttribute("playersse"); 
		player.EC.fireEvent("PlayerReady",player);
		(player.core = new window.danmuplayer.DanmuCore()).bind(player);
		player.EC.fireEvent("CoreReady",player);
	}
	function tip(str) {
		for(var i=0;i<player.tipbox.childNodes.length;i++){
			if(player.tipbox.childNodes[i].innerHTML==str)return;
		}
		var td = c_ele("div");
		td.className = "tip";
		td.innerHTML = str;
		player.tipbox.appendChild(td);
		setTimeout(function() {
			td.style.display = "block";
			setTimeout(function() {
				player.tipbox.removeChild(td);
				td = null;
			},
			4000);
		},
		20);
	}
	function loadoption() {
		Dinfo('加载设置');
		player.o = {},
		player.assvar = {},
		player.switchs = {};
		player.cacheobj = {};
		player.assvar.hasZimu = false;
		player.assvar.hasSuperDanmu = false;
		resetprocess();
	}
	function loadvideo() {
		//console.log("加载视频");
		Dinfo('获取视频地址');
		cmd('getVideo ' + videoid+' --t --des --cv --opt', false,
		function(a) {
			if (a == 'Error') {
				Derror('地址获取错误');
				player.EC.fireEvent("VideoAddressError");
				return;
			}
			try {
				var json = JSON.parse(a),
				videosrc = JSON.parse(json.url);
			} catch(e) {
				Derror('地址获取错误');
				player.EC.fireEvent("VideoAddressParseError");
				return;
			}
			document.title=player.info.title=json.t;
			player.info.count=json.count;
			player.info.des=json.des;
			player.info.cv=json.cv;
			player.info.options=json.opt||{};
			player.EC.fireEvent("VideoInfoGet",player);

			player.videoaddress = [];
			for (var no in videosrc) {
				if (videosrc[no] && videosrc[no].length) {
					player.videoaddress.push({
						res: no,
						url: videosrc[no]
					});
				} else {
					Dwarn("丢弃一个空地址");
				}
			}
			if (!player.videoaddress[0]) {
				Derror('地址获取错误');
				return;
			}
			Dinfo('得到视频地址:', videosrc);
			Message("CTRL", {
				name: "videoaddress",
				src: player.videoaddress[0].url
			});
		});
	}
	function loaddanmu() {
		Dinfo('加载弹幕');
		cmd('getDanmu ' + videoid, false,
		function(a) {
			if (a == 'Error') {
				Derror('弹幕加载失败');
				return;
			}
			try {
				var danmuarr = JSON.parse(a);
			} catch(e) {
				player.info.dc = 0;
			};
			if (typeof danmuarr == 'object') {
				danmulist = danmuarr;
				player.info.dc = danmuarr.length;
				Message("CTRL", {
					name: "danmuarray",
					array: danmuarr
				});
				danmufuns.refreshnumber();
			}
		});
	}
	function resetprocess() {
		player.danmumark.width = player.progressbar.width = player.progressbar.offsetWidth;
		controlfuns.refreshprogresscanvas();
		controlfuns.refreshDanmuMark();
	}
	/*function initSwitch() {
		var switchs = $$(player.optionpannel, 'div[switch]');
		for (var i = 0; i < switchs.length; i++) {
			var sw = switchs[i];
			var name = sw.getAttribute('name');
			var bool = (getOption(name) == 'true') ? true: false;
			createswitch(name, bool, null, null, sw);
			sw.disable = function() {
				this.event.disabled = true;
				addEleClass(this, 'gray');
			}
			sw.enable = function() {
				this.event.disabled = false;
				removeEleClass(this, 'gray');
			}
			//sw.disable();
			player.switchs[name] = sw;
		}
		for (var sn in player.switchs) {
			if (switchCenter[sn]) {
				if (player.switchs[sn].event.bool) {
					switchCenter[sn].on();
				} else {
					switchCenter[sn].off();
				}
			}
		}
	}
	function initRange() {
		var ranges = $$(player.optionpannel, 'div[range]');
		player.ranges = {};
		for (var i = 0; i < ranges.length; i++) {
			var rg = ranges[i];
			var name = rg.getAttribute('name');
			var min = Number(rg.getAttribute('min'));
			var max = Number(rg.getAttribute('max'));
			var defaultvalue = Number(rg.getAttribute('default'));
			rg.defaultvalue = defaultvalue;
			var value = getOption(name) ? Number(getOption(name)) : defaultvalue;
			createRange(name, min, max, value, rg);
			rg.sendValue = function(name, value) {
				if (rangeCenter[name]) {
					rangeCenter[name](value);
				}
			}
			player.ranges[name] = rg;
		}
		for (var rg in player.ranges) {
			rangeCenter[rg](player.ranges[rg].value);
		}
	}*/
	function initInput() {
		var inputs = $$(player.mainbody, 'input[name]');
		player.inputs = {};
		var ipt;
		for (var i = 0; i < inputs.length; i++) {
			ipt = inputs[i];
			var name = ipt.getAttribute('name');
			if (!name) continue;
			player.inputs[name] = ipt;
			if (inputCenter[name] && (typeof inputCenter[name]) == "function") {
				aEL(ipt, "input",
				function() {
					inputCenter[name](ipt.value);
				});
			}

		}
	}

	player.danmufuns=danmufuns = {
		initContextMenu: function() {
			/*弹幕右键菜单*/
			player.ContextMenu = c_ele('div');
			player.ContextMenu.content = c_ele('span');
			player.ContextMenu.plusone = c_ele('div');
			player.ContextMenu.copy = c_ele('div');
			player.ContextMenu.className = 'danmuContextMenu';
			player.ContextMenu.plusone.innerHTML = '+1';
			player.ContextMenu.copy.innerHTML = '复制';
			player.ContextMenu.content.style.color = 'rgb(44, 123, 138)';
			player.ContextMenu.appendChild(player.ContextMenu.content);
			player.ContextMenu.appendChild(player.ContextMenu.plusone);
			player.ContextMenu.appendChild(player.ContextMenu.copy);
			player.danmuframe.appendChild(player.ContextMenu);
			aEL(player.ContextMenu, 'click',
			function(e) {
				e.stopPropagation();
				if (e.target == player.ContextMenu.plusone) {
					danmufuns.send(player.ContextMenu.danmuobj.c);
					danmufuns.hideContextMenu();
				} else if (e.target == player.ContextMenu.copy) {
					//复制内容到剪贴板
					//window.clipboardData.setData("text/plain",player.ContextMenu.danmuobj.c);
					danmufuns.hideContextMenu();
				}
			});
			aEL(player.ContextMenu, 'contextmenu',
			function(e) {
				e.stopPropagation();
				e.preventDefault();
			});
		},
		showContextMenu: function(textobj, danmuobj, e) {
			player.ContextMenu.style.display = 'block';
			player.ContextMenu.danmuobj = danmuobj || textobj.danmuobj;
			player.ContextMenu.content.innerHTML = player.ContextMenu.danmuobj.c;
			var x = COL.mouseX
			/*||(e.offsetX?e.offsetX:e.x)+*/
			,
			y = COL.mouseY;
			if (x > width - player.ContextMenu.offsetWidth) x = width - player.ContextMenu.offsetWidth;
			if (y > tunnelheight - player.ContextMenu.offsetHeight) y = tunnelheight - player.ContextMenu.offsetHeight;
			player.ContextMenu.style.left = x + 'px';
			player.ContextMenu.style.top = y + 'px';
		},
		hideContextMenu: function() {
			if (player.ContextMenu) player.ContextMenu.style.display = 'none';
		},

		send: function(content) {
			var c = content ? content: player.danmuinput.value;
			c = c.replace(/\\n/g, '\n');
			if (_string_.removesidespace(c) != '') {
				//console.log("发送弹幕:" + player.danmuinput.value);
				if (!content) {
					if (player.assvar.danmusendTimeout) {
						clearTimeout(player.assvar.danmusendTimeout);
						player.assvar.danmusendTimeout = 0;
					}
					player.sendcover.style.display = 'block';
					//player.danmuinput.blur();
					player.danmuinput.disabled="disabled";
				}
				var time = getVideoMillionSec();
				var type;
				//console.log(danmuStyle.type);
				if (danmuStyle.type >= 0) {
					type = danmuStyle.type;
				} else {
					type = 0;
				}
				var color = player.colorinput.value.replace('#', '');
				if(color=="$$$$$$"){
					color=toHexColor(rand(0,255)+" "+rand(0,255)+" "+rand(0,255));
				}
				if (!isHexColor(color)) {
					color = null;
				}
				var danmuobj = {};
				danmuobj.t = time;
				danmuobj.id = 0;
				danmuobj.c = c;
				danmuobj.co = color;
				danmuobj.s = danmuStyle.fontsize;
				danmuobj.ty = type;
				danmuobj.sended = true;
				player.EC.fireEvent("newOLdanmaku",Object.create(danmuobj));
				var date = new Date();
				date.day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
				date.month = date.getMonth() + 1;
				date.month = (date.month < 10) ? '0' + date.month: date.month;
				danmuobj.d = date.getFullYear() + '-' + date.month + '-' + date.day;
				player.EC.fireEvent("senddanmu",danmuobj);
				core.danmufuns.initnewDanmuObj(danmuobj);
				if(!core.player.assvar.isPlaying){
					core.danmufuns.createCommonDanmu(danmuobj, core.danmufuns.getTunnel(danmuobj.ty, danmuobj.s));
				}
				danmulist.push(danmuobj);
				danmufuns.refreshnumber();
				autocmd('adddanmu', (videoid), danmuobj.ty, danmuobj.c, danmuobj.t, danmuobj.co || 'NULL', danmuStyle.fontsize, playersse,
				function(response) {
					if(response.match(/^\d+$/)){
						danmuobj.id= Number(response);
						if (typeof danmuobj.id=="number") {
						if (!content) {
							player.EC.fireEvent("danmusended",danmuobj);
							player.danmuinput.value = '';
							player.sendcover.style.display = 'none';
							player.danmuinput.disabled=false;
							removeEleClass(player.sendbox, "forceopacity");
							player.danmuinput.focus();
						}
					} 
					}else{
						try {
							var err = response.match(/^Error:(.+)$/)[1];
							tip(err);
						} catch(e) {
							console.error(response);
						}
						if (!content){
							player.danmuinput.disabled=false;
							player.sendcover.style.display = 'none';
						} 
					}
				});
				if (!content) {
					player.assvar.danmusendTimeout = setTimeout(function() {
						if (player.sendcover.style.display != 'none') {
							player.sendcover.style.display = 'none';
							player.danmuinput.disabled=false;
						}
					},
					10000);
				}
			}
		},

		addToDanmuList: function(danmuobj) {
			danmulist.push(danmuobj);
			if (core) core.danmufuns.addToDanmuArray(danmuobj);
		},

		pause: function() {
			//clearInterval(interval.calibrationTime.i);
		},
		refreshnumber: function() {
			if (danmulist.length >= 0) {
				player.info.dc=danmulist.length;
				player.EC.fireEvent("DanmakuCount",player.info.dc);
			}
			controlfuns.refreshDanmuMark();
		}
	}
	controlfuns.play = function() {
		player.playbutton.style.display = 'none';
	}
	controlfuns.playing = function() {
		controlfuns.play();
		controlfuns.refreshprogresscanvas();
	}
	controlfuns.pause = function() {
		player.playbutton.style.display = 'block';
	}
	controlfuns.fullscreen = function() {
		Dinfo('打开全屏');
		addEleClass(player.sendbox, 'sendbox_fullscreen');
		addEleClass(player.videoframe, 'videoframe_fullscreen');
		addEleClass(player.controler, 'controler_fullscreen');
		player.displaystat = 'fullscreen';
		resetprocess();
	}
	controlfuns.exitfullscreen = function() {
		Dinfo('退出全屏');
		removeEleClass(player.sendbox, 'sendbox_fullscreen');
		removeEleClass(player.videoframe, 'videoframe_fullscreen');
		removeEleClass(player.controler, 'controler_fullscreen');
		resetprocess();
	}
	controlfuns.fullscreenchange = function() {
		if (isFullscreen()) {
			controlfuns.fullscreen();
		} else {
			controlfuns.exitfullscreen();
		}
		core.fitdanmulayer();
	}
	controlfuns.fullpage = function() {
		exitFullscreen();
		addEleClass(player.mainbody, 'fullpage');
		addEleClass(player.sendbox, 'fullpage_sendbox');
		addEleClass(player.videoframe, 'fullpage_videoframe');
		player.displaystat = 'fullpage';
		if(parentframehost){
			try{
				console.log("send msg");
				var m={
					type:"dmplayermsg",
					msg:"fullpage",
					id:player.videoid
				};
				window.parent.postMessage(m,parentframehost);
			}catch(e){
				console.log("err");
			}
		}else{
			Dinfo("无父窗口");
		}
		resetprocess();
		core.fitdanmulayer();
	}
	controlfuns.exitfullpage = function() {
		removeEleClass(player.mainbody, 'fullpage');
		removeEleClass(player.sendbox, 'fullpage_sendbox');
		removeEleClass(player.videoframe, 'fullpage_videoframe');
		player.displaystat = 'normal';
		if(window.parentframehost){
			try{
				var m={
					type:"dmplayermsg",
					msg:"cancelfullpage"
				};
				window.parent.postMessage(m,parentframehost);
			}catch(e){}
		}else{
			Dinfo("无父窗口");
		}
		resetprocess();
		core.fitdanmulayer();
	}
	controlfuns.gototime = function() {}
	controlfuns.loading = function() {}
	controlfuns.ended = function() {
		danmutunnel = {
			right: [],
			left: [],
			bottom: [],
			top: []
		}
		//danmufuns.clear();
	}
	controlfuns.volumestatchange = function() {}
	controlfuns.volumechange = function() {
		player.volumepercentage.innerHTML = Math.round(core.player.video.volume * 100);
		player.volumevalue.style.height = (1 - core.player.video.volume) * 100 + '%';
		if (core.player.video.muted) player.volumestat.innerHTML = 'ϖ';
		else {
			player.volumestat.innerHTML = 'Д';
		}
	}
	//刷新弹幕标记
	controlfuns.refreshDanmuMark = function() {
		if (!core) return;
		var dmk = player.danmumark;
		var tw = dmk.width;
		var th = dmk.height = 16;
		danmumarkct.clearRect(0, 0, tw, 16);
		var pixtime = ((core.player.video.duration * 1000 / tw * 2 + 0.5) | 0);
		var max = 0;
		var grouparr = new Array(((tw / 2 + 0.5) | 0) + 1),
		groupnum;
		for (var i = danmulist.length; i--;) {
			groupnum = Math.floor(danmulist[i].t / pixtime);
			if (!grouparr[groupnum]) grouparr[groupnum] = 0;
			grouparr[groupnum]++;
			if (grouparr[groupnum] > max) {
				max = grouparr[groupnum];
			}
		}
		danmumarkct.strokeStyle = "rgb(2,149,223)";
		danmumarkct.fillStyle = "rgba(95,186,231,0.5)";
		danmumarkct.moveTo(0, dmk.height);
		danmumarkct.lineTo(dmk.width, dmk.height);
		for (var i = grouparr.length; i--;) {
			if (!grouparr[i]) grouparr[i] = 0;
			danmumarkct.lineTo(i * 2, (1 - grouparr[i] / max) * th);
		}
		danmumarkct.closePath();
		danmumarkct.fill();
		danmumarkct.stroke();
	}
	controlfuns.refreshprogresscanvas = function() {
		if (progressct && core) {
			var ct = progressct,
			video = core.player.video;
			if (video) {
				var Xw = player.progressbar.width,
				d = video.duration;
				ct.save();
				ct.clearRect(0, 0, Xw, 9);
				//player.progressbar.height=9;
				ct.lineCap = "round";
				//绘制已播放区域
				ct.beginPath();
				ct.strokeStyle = '#ffcc66';
				ct.lineWidth = 1;
				var tr = video.played;
				for (var i = 0; i < tr.length; i++) {
					ct.moveTo(tr.start(i) / d * Xw, 8);
					ct.lineTo(tr.end(i) / d * Xw, 8);
					ct.stroke();
				}

				//绘制已缓冲区间
				ct.beginPath();
				ct.strokeStyle = '#C0BBBB';
				ct.lineWidth = 3;
				var tr = video.buffered;
				for (var i = 0; i < tr.length; i++) {
					ct.moveTo(tr.start(i) / d * Xw, 6);
					ct.lineTo(tr.end(i) / d * Xw, 6);
					ct.stroke();
				}

				//绘制普通进度条
				ct.beginPath();
				ct.strokeStyle = '#66CCFF';
				ct.lineWidth = 5;
				ct.moveTo(0, 3);
				ct.lineTo(video.currentTime / d * Xw, 3);
				//ct.stroke();
				ct.stroke();
				ct.restore();
			}

		}
	}
	controlfuns.refreshtime = function() {
		var currentTime = player.assvar.pointingtime || getMin_Sec(core.player.video.currentTime);
		totaltime = getMin_Sec(core.player.video.duration);
		if (currentTime.min >= 0 && currentTime.sec >= 0 && totaltime.min >= 0 && totaltime.sec >= 0) {
			player.time.innerHTML = (currentTime.min < 10 ? "0" + currentTime.min: currentTime.min) + ':' + (currentTime.sec < 10 ? "0" + currentTime.sec: currentTime.sec) + '/' + (totaltime.min < 10 ? "0" + totaltime.min: totaltime.min) + ':' + (totaltime.sec < 10 ? "0" + totaltime.sec: totaltime.sec);
		} else {
			player.time.innerHTML = '00:00/00:00';
		}
	}

	controlfuns.zimueditMode = {
		on: function() {},
		off: function() {}
	}
	controlfuns.codeDanmueditMode = {
		on: function() {},
		off: function() {}
	}

	switchCenter = {
		RealtimeVary: {
			type: "core",
			on: function() {
				player.o.RealtimeVary = true;
				core.player.o.RealtimeVary = true;
				setOption('RealtimeVary', 'true');
			},
			off: function() {
				player.o.RealtimeVary = false;
				core.player.o.RealtimeVary = false;
				setOption('RealtimeVary', 'false');
			}
		},
		Debug: {
			type: "core",
			on: function() {
				core.COL.Debug.on();
				setOption('Debug', 'true');
			},
			off: function() {
				core.COL.Debug.off();
				setOption('Debug', 'false');
			}
		},
		DefaultHideSideBar: {
			on: function() {
				setOption('DefaultHideSideBar', 'true');
			},
			off: function() {
				setOption('DefaultHideSideBar', 'false');
			}
		},
		TwoDCodeDanmu: {
			type: "core",
			on: function() {
				setOption('TwoDCodeDanmu', 'true');
			},
			off: function() {
				setOption('TwoDCodeDanmu', 'false');
			}
		},
		ThreeDCodeDanmu: {
			type: "core",
			on: function() {
				setOption('ThreeDCodeDanmu', 'true');
			},
			off: function() {
				setOption('ThreeDCodeDanmu', 'false');
			}
		},
		ProgressDanmumark: {
			type: "player",
			on: function() {
				player.o.ProgressDanmumark = true;
				controlfuns.refreshprogresscanvas();
				setOption('ProgressDanmumark', 'true');
			},
			off: function() {
				player.o.ProgressDanmumark = false;
				setOption('ProgressDanmumark', 'false');
			}
		},
	};
	rangeCenter = {
		PlaySpeed: function(value) {
			if (value > 0) core.player.video.playbackRate = value;
		},
		StorkeWidth: function(value) {
			core.player.o.StorkeWidth = value;
			setOption('StorkeWidth', value);
		},
		ShadowWidth: function(value) {
			core.player.o.ShadowWidth = value;
			setOption('ShadowWidth', value);
		},
		DanmuSpeed: function(speed) {
			var moveTime = (speed * 1000).toFixed();
			/*Message("CTRL", {
				name: "moveTime",
				value: moveTime
			});*/
			core.moveTime = moveTime;
			setOption('DanmuSpeed', speed);
		}
	};
	inputCenter = {
		relativeTo: function(value) {
			Dlog(value);
		},
		colorInput: function(value) {
			if (isHexColor(value)) {
				var co = value.replace('#', '');
				player.colorview.style.backgroundColor = '#' + co;
				if (co.toLowerCase() != "ffffff") player.danmuinput.style.color = '#' + co;
			} else {
				player.colorview.style.backgroundColor = '#ffffff';
				player.danmuinput.style.color = '#000';
			}
		}
	};

	function getcorecontent() {
		getVideoMillionSec = core.getVideoMillionSec;
	}

	function initevents() {
		aEL(player.colorinput, 'input',
		function() {
			if (isHexColor(player.colorinput.value)) {
				var co = player.colorinput.value.replace('#', '');
				player.colorview.style.backgroundColor = '#' + co;
			} else {
				player.colorview.style.backgroundColor = '#ffffff';
			}
		});
		aEL(window, 'resize',
		function() {
				resetprocess();
		});
		aEL(player.play_pause, 'click',
		function(e) {
			e.preventDefault();
			if (core.video.paused) {
				core.danmufuns.start();
				core.video.play();
			} else {
				core.video.pause();
			}
		});
		/*aEL(player.mainbody, 'resize',
		function() {
			resetprocess();
		});*/

		aEL(player.progress, 'contextmenu',
		function(e) {
			e.preventDefault();
		});
		/*aEL(player.sidebar, "mousedown",
		function(e) {
			switch (e.target.id) {
			case "danmulistbutton":
			case "superdanmubutton":
			case "optionbutton":
				{
					changetab(e.target.id);
					break;
				}
			}
		});*/
		/*aEL(player.optionpannel, 'click',
		function(e) {
			var ele = e.target.parentNode;
			var name;
			if (ele.parentNode.getAttribute('type') == 'switch') {
				name = ele.parentNode.getAttribute('name');
				ele = ele.parentNode;
			} else if (ele.getAttribute('type') == 'switch') {
				name = ele.getAttribute('name');
			}
			if (name && switchCenter[name]) {
				if (ele.event.bool) {
					if (switchCenter[name].on) switchCenter[name].on();
				} else {
					if (switchCenter[name].off) switchCenter[name].off();
				}
			}
		});*/
		/*aEL(player.danmucontantor, 'dblclick',
		function(e) {
			e.preventDefault();
			switch (e.target.className) {
			case 'danmutime':
			case 'danmucontent':
			case 'danmudate':
				{
					var time = e.target.parentNode.time;
					if (time <= 200) {
						core.player.video.currentTime = time / 1000;
					} else {
						core.player.video.currentTime = time / 1000 - 0.2;
					}
					break;
				}
			}
		});*/

		aEL(player.mainbody, 'keydown',
		function(e) {
			switch (e.keyCode) {
			case 84:
				{
					if (e.altKey && e.ctrlKey) {
						e.preventDefault();
						player.inputs.gettime.value = core.getVideoMillionSec();
					}
					break;
				}
			}
		});

		
		aEL(player.fullscreen, 'click',
		function(e) {
			e.preventDefault();
			if (e.target.id == 'fullpage') {
				if (player.displaystat != 'fullpage') {
					controlfuns.fullpage();
				} else {
					controlfuns.exitfullpage();
				}
			} else {
				if (isFullscreen()) {
					exitFullscreen();
				} else {
					requestFullscreen(player.mainbody);
				}
			}
		});
		aEL(player.sendbutton, 'click',
		function(e) {
			danmufuns.send();
		});
		aEL(player.danmuinput, 'keydown',
		function(e) {
			if (e.keyCode == 13) {
				danmufuns.send();
			}
		});
		aEL(player.danmuinput, "input",
		function() {
			if (player.danmuinput.value != "") {
				addEleClass(player.sendbox, "forceopacity");
			} else {
				removeEleClass(player.sendbox, "forceopacity");
			}
		});
		aEL($(player.mainbody, '#fontstylebutton #danmuType'), 'click',
		function(e) {
			var selections = $$(player.mainbody, '#fontstylebutton #danmuType div'),
			id = e.target.id;
			if (id == 'fromtop' || id == 'frombottom' || id == 'fromright' || id == 'fromleft') {
				for (var i = 0; i < selections.length; i++) {
					removeEleClass(selections[i], 'selected');
				}
				addEleClass(e.target, 'selected');
				switch (e.target.id) {
				case 'fromtop':
					{
						danmuStyle.type = 3;
						//console.log(danmuStyle.type);
						break;
					}
				case 'frombottom':
					{
						danmuStyle.type = 2;
						//console.log(danmuStyle.type);
						break;
					}
				case 'fromright':
					{
						danmuStyle.type = 0;
						//console.log(danmuStyle.type);
						break;
					}
				case 'fromleft':
					{
						danmuStyle.type = 1;
						//console.log(danmuStyle.type);
						break;
					}
				}
			}
		});
		aEL($(player.mainbody, '#fontstylebutton #fontSize'), 'click',
		function(e) {
			var selections = $$(player.mainbody, '#fontstylebutton #fontSize div'),
			id = e.target.id;
			if (id == 'Sizesmall' || id == 'Sizemiddle' || id == 'Sizebig') {
				for (var i = 0; i < selections.length; i++) {
					removeEleClass(selections[i], 'selected');
				}
				addEleClass(e.target, 'selected');
				switch (e.target.id) {
				case 'Sizesmall':
					{
						danmuStyle.fontsize = 25;
						break;
					}
				case 'Sizemiddle':
					{
						danmuStyle.fontsize = 30;
						break;
					}
				case 'Sizebig':
					{
						danmuStyle.fontsize = 45;
						break;
					}
				}
			}
		});
		aEL(document, 'fullscreenchange',
		function() {
			Dinfo('事件:全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(document, 'mozfullscreenchange',
		function() {
			Dinfo('事件:moz全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(document, 'webkitfullscreenchange',
		function() {
			Dinfo('事件:webkit全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(document, 'MSFullscreenChange',
		function() {
			Dinfo('事件:MS全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(player.loop, 'click',
		function(e) {
			e.preventDefault();
			player.o.loop = !player.o.loop;
			if (player.o.loop) {
				//console.log("循环播放");
				core.player.video.loop = true;
				player.loop.style.color = '#66ccff';
			} else {
				//console.log("取消循环");
				core.player.video.loop = false;
				player.loop.style.color = '#000';
			}
		});
		aEL(player.volumestat, 'click',
		function(e) {
			e.preventDefault();
			video.muted = !video.muted;
			if (video.muted) {
				Dinfo('静音');
			} else {
				Dinfo('取消静音');
			}
		});
		

	}
	/*来自框架里视频的事件*/
	function videoevents() {
		video = core.player.video;
		aEL(player.danmuctrl, 'click',
		function() {
			if (core.player.danmucontainer.display ===true) {
				core.player.danmucontainer.display=false;
			} else {
				core.player.danmucontainer.display=true;
			}
		});

		var progressmousekey = false,
		volumemousekey = false;
		aEL(player.progress, 'mouseleave',
		function(e) {
			player.assvar.pointingtime = null;
			controlfuns.refreshtime();
		});
		aEL(player.progress, 'mousemove',
		function(e) {
			e.preventDefault();
			if (!core) return;
			var x = e.offsetX ||e.layerX;
			var time = x / player.progress.offsetWidth * core.player.video.duration;
			if (progressmousekey) {
				core.player.video.currentTime = time;
			}
			player.assvar.pointingtime = getMin_Sec(time);
			controlfuns.refreshtime();
			controlfuns.refreshprogresscanvas();
		});
		aEL(player.volumerange, 'mousedown',
		function(e) {
			e.preventDefault();
			volumemousekey = true;
			var y = e.layerY;
			if (y > 200) {
				player.video.volume = 0;
			} else if (y < 0) {
				player.video.volume = 1;
			} else {
				player.video.volume = (200 - y) / player.volumerange.offsetHeight;
			}
		});

		aEL(player.volumepercentage, 'mousemove',
		function(e) {
			if (volumemousekey) {
				player.video.volume = 1;
			}
		});

		aEL(player.volumestat, 'mousemove',
		function(e) {
			if (volumemousekey) {
				player.video.volume = 0;
			}
		});

		aEL(player.volumerange, 'mousemove',
		function(e) {
			if (volumemousekey) {
				var y = e.layerY;
				if (y > 200) {
					player.video.volume = 0;
				} else if (y < 0) {
					player.video.volume = 1;
				} else {
					player.video.volume = (200 - y) / player.volumerange.offsetHeight;
				}
			}
		});

		aEL(player.volume, 'mouseleave',
		function(e) {
			volumemousekey = false;
		});
		aEL(document, 'mouseup',
		function(e) {
			e.preventDefault();
			progressmousekey = false;
			volumemousekey = false;
		});
		aEL(player.progress, 'mousedown',
		function(e) {
			e.preventDefault();
			progressmousekey = true;
			var x = e.offsetX || e.layerX;
			core.player.video.currentTime = x / player.progress.offsetWidth * core.player.video.duration;
		});
		aEL(video, 'loadedmetadata',
		function(e) {
			controlfuns.refreshtime();
			controlfuns.refreshDanmuMark();
			player.EC.fireEvent("video_loadedmetadata",player);
		});
		aEL(video, 'volumechange',
		function(e) {
			controlfuns.volumechange();
		});
		aEL(video, 'ended',
		function(e) {
			controlfuns.ended();
		});
		aEL(video, 'pause',
		function(e) {
			controlfuns.pause();
		});
		aEL(video, 'play',
		function(e) {
			controlfuns.refreshprogresscanvas();
		});
		aEL(video, 'timeupdate',
		function(e) {
			controlfuns.refreshprogresscanvas();
			controlfuns.refreshtime();
		});
		aEL(video, 'seeked',
		function(e) {
			controlfuns.refreshprogresscanvas();
		});
		aEL(video, 'playing',
		function(e) {
			controlfuns.playing();
		});
		aEL(video, 'loadstart',
		function(e) {
			controlfuns.refreshprogresscanvas();
		});
		aEL(video, 'waiting',
		function() {
			Dinfo("事件:媒体缓冲中");
			tip('缓冲中..');
		});
	}

	/*自定义事件*/

	function customEvents() {
		player.EC.addEvent("CoreReady",
		function() {
			console.info("弹幕核心已加载");
			core = player.core;
			getcorecontent();
			player.video = core.player.video;
			Message = function(type, content) {
				var msg = {
					type: type,
					msg: content
				};
				core.message(msg);
			}
			player.EC.fireEvent("CoreLoaded");
			videoevents();
			loadvideo();
			loaddanmu();
			//initSwitch();
			//initRange();
		});
	}
	player.EC.fireEvent("beforeinit");
	customEvents();
	setdom();
	loadoption();
	initInput();
	initevents();
	player.EC.fireEvent("inited",player);
}
/*
                                              ###              ###
                                      #####################
                                                ##             ##
             #########                                                                   #######
             ##          ##          #################                 #####         ###                  #####
             ##          ##          ##           ##         ##           #####                  ###        ##		##
             #########           ##           ##         ##                                            ######
                                        #################
                                        ##           ##         ##
                                        ##           ##         ##
                                        #################
*/

var i喵i = '不要卖萌눈_눈';
/*自定义事件发射器*/
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(36)};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'[3-9abd-u]'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('b SimpleEvent(){3.n=1;3.6={};3.9=false;3.a="background-color: #C1D579;";3.addEvent=b(4,g,h){5(e 4!="o"){5(3.9===7)d.p("%c事件名不是字符串:"+4,3.a);i}5(!3.6[4]||e 3.6[4].q!="b"){3.6[4]=[];5(3.9===7)d.j("%c添加事件:"+4,3.a)}5(h===7)g.h=7;i[4,3.6[4][3.6[4].push(g)-1].id=3.n++,g]};3.removeEvent=b(8){5(!8||e 8!="r"||!8.q)i;5(3.6[8[0]]&&3.6[8[0]].s){t k=3.6[8[0]].s(8[2]);5(k>=0){3.6[8[0]].splice(k,1);5(3.9===7)d.j("%c移除事件:"+8[0],3.a)}}l 5(3.9===7){d.u("%c移除未定义的事件:"+8[0],3.a)}};3.fireEvent=b(4,m){5(e 4!="o"){5(3.9===7)d.p("%c事件名不是字符串:"+4,3.a);i}5(3.9===7){d.j("%c发射事件:"+4,3.a)}5((e 3.6[4])=="r"){t th=3;5(3.9===7){d.j("%c事件触发事件列表:"+4,3.a)}3.6[4].forEach(b(f){5(e f=="b"){5(f.h===7){f(m)}l{setTimeout(b(){f(m)},0)}}})}l 5(3.9===7){d.u("%c无事件处理:"+4,3.a)}}}',[],31,'|||this|ename|if|eventlist|true|eobj|debug|spebgcolor|function||console|typeof|value|fun|block|return|info|ind|else|argobj|eventid|string|error|join|object|indexOf|var|warn'.split('|'),0,{}));
