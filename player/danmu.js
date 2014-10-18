/*
Belong to iTisso
Coder:LuoJia
 */
const DanmuPlayerVersion = "0.3.5";
const SiteDomain = "*";
var defaultOption={
	TwoDCodeDanmu:true,
	ThreeDCodeDanmu: true,
	ProgressDanmumark:false,
	StorkeWidth:0.4,
	ShadowWidth:10,
	DanmuSpeed:5,
	Debug:false,
	DefaultHideSideBar:false,
	DivCommonDanmu:false,
	RealtimeVary:false
};
function select_do(fun) {
	if (typeof fun != "function") {
		console.log(fun);
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
	arr.__proto__.do = select_do;
	return arr;
}
const $ = d_select,
$$ = d_selectall;
function c_ele(tag) {
	return document.createElement(tag);
}
var _string_ ;
 /*{
	removesidespace: function(string) {
		if (typeof string == 'string') {
			var s = string.replace(/\s+$/, '');
			s = s.replace(/^\s+/, '');
			return s;
		} else {
			return false;
		}
	}
};*/
function aEL(dom, e, fun) {
	//添加事件监听
	if (dom.addEventListener) dom.addEventListener(e, fun, false);
	else if (dom.attachEvent) dom.attachEvent('on' + e, fun);
	else {
		dom['on' + e] = fun;
	}
}
/*function guessmime(url) {
	//猜测媒体mime类型
	var mimelist = {
		'mp4': 'video/mp4',
		'mp3': 'audio/mp3',
		'wav': 'audio/x-wav',
		'webm': 'video/webm'
	};
	var ext = getext(url);
	if (mimelist[ext]) {
		return mimelist[ext];
	} else {
		return false;
	}
}*/
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
	t.min = Math.floor(time / 60);
	t.sec = Math.floor(time - t.min * 60);
	return t;
}
function getMin_Sec_By_Million(time) {
	time /= 1000;
	var t = {};
	t.min = Math.floor(time / 60);
	t.sec = Math.floor(time - t.min * 60);
	return t;
}
function setOption(name, value) {
	if ((typeof name != 'string')) {
		console.error('错误的设置参数');
		return false;
	}
	if (localstoragesupport) {
		window.localStorage['playeroption:' + name] = value;
	} else {
		setCookie('playeroption:' + name, value);
	}
}
/*function changeTabTo(){

}*/

/*function makeTabGroup(obj) {
	//[[tab1,block1],[tab2,block2]]
	if (!window.TabGroups) window.TabGroups = [];
	if (obj) {
		for (var i = 0; i < obj.length; i++) {
			obj[i][0].pointTo = obj[i][1];
			obj[i][0].TabGroup = obj;
			obj[i][0].onmousedown = function(e) {
				if (e.button != 0) return;
				for (var inn = 0; inn < this.TabGroup.length; inn++) {
					this.TabGroup[inn][1].style.display = 'none';
				}
				this.pointTo.style.display = 'block';
			}
		}
	}
}*/
function getOption(name) {
	if (localstoragesupport) {
		var re = window.localStorage['playeroption:' + name];
		if (re) {
			return window.localStorage['playeroption:' + name];
		} else {
			if(defaultOption[name]){
				return defaultOption[name];
			}else{
				return false;
			}
		}
	} else {
		var re;
		if (re = getCookie('playeroption:' + name)) {
			return re;
		} else {
			if(defaultOption[name]){
				return defaultOption[name];
			}else{
				return false;
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
      }
      else if (dom.msRequestFullscreen) {
        dom.msRequestFullscreen();
      }
      else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen();
      }
      else if (dom.webkitRequestFullscreen) {
        dom.webkitRequestFullscreen(dom['ALLOW_KEYBOARD_INPUT']);
      } else {
        console.warn("Fullscreen API is not supported");
      } 
}
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	} 
}
function isFullscreen() {
	if (document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement) return true;
}
function removeEleClass(e, classname) {
	if (classname != '' && classname != ' ' && e) 
		e.classList.remove(classname);
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
		var x = e.offsetX || e.layerX;
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
	/*e.ondrag=function(e){
		e.preventDefault();
		var x=e.layerX||e.x||offsetX;
			this.point.style.left=x+"px";
			var va=this.min+(x/this.offsetWidth)*(this.max-this.min);
			this.title=Math.round((this.value=va)*100)/100;
			this.sendValue(this.name,va);
	}*/

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
	const videoid = _in_videoid;
	var width, height;
	var player = {},
	intervals = {},
	controlfuns = {},
	danmufuns = {};
	localstoragesupport = window.localStorage ? true: false;
	var danmulist = [],
	danmuarray = [],
	danmucount,
	ready = false;
	var playersse;
	player.EC=new SimpleEvent();
	player.EC.debug=true;
	if(typeof loadplugins=="function"){
		loadplugins(player.EC);
	}

	var Message = function() {},
	core;
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
		mainbody=player.mainbody;
		player.controler = $(mainbody, '#controler');
		player.colorinput = $(mainbody, '#colorinput');
		player.colorview = $(mainbody, '#colorview');
		player.sendcover = $(mainbody, '#sendbox #sendboxcover');
		player.danmuctrl = $(mainbody, '#controler #danmuctrl');
		//player.danmucount = $(mainbody, '#sidebar #ctrlpannel #danmucount');
		player.danmuinput = $(mainbody, '#sendbox #danmuinput');
		player.danmucontantor = $(mainbody, '#danmus');
		//player.danmulistbutton = $(mainbody, '#sidebar #ctrlpannel #danmulistbutton');
		player.fullscreen = $(mainbody, '#controler #fullscreen');		
		player.loop = $(mainbody, '#controler #loop');
		player.optionbutton = $(mainbody, '#optionbutton');
		player.optionpannel = $(mainbody, '#optionpannel');
		player.play_pause = $(mainbody, '#play_pause');
		player.playcount = $(mainbody, '#playcount');
		player.progress = $(mainbody, '#progress');
		player.progressbar = $(mainbody, '#progress #progressbar');
		player.playbutton = $(mainbody, '#play_pause #play');
		player.pausebutton = $(mainbody, '#play_pause #pause');
		player.timepoint = $(mainbody, '#controler #progress #timepoint');
		player.time = $(mainbody, '#controler #time');
		player.tipbox = $(player.mainbody, '#tipbox');
		//player.tabpages = d_selectall(mainbody, '.tabpage');
		//player.ctrlbuttons = d_selectall(mainbody, '.ctrlbutton');
		player.sidebarSwitch = $(mainbody, '#controler #sidebarctrl');
		//player.sidebar = $(mainbody, '#sidebar');
		player.sendbox = $(mainbody, '#sendbox');
		//player.statboard = $(mainbody, '#sidebar #ctrlpannel #statboard');
		//player.superdanmubutton = $(mainbody, '#sidebar #ctrlpannel #superdanmubutton');
		/*player.video = $(player.mainbody, '#videoframe #video');*/
		player.videoframe = $(mainbody, '#videoframe');
		player.videoiframe = $(player.videoframe, '#videoiframe');
		player.videopreload = $(player.videoframe, '#videopreload');
		player.videopreload.textdiv = $(videopreload, '.videopreloadanimation');
		player.volume = $(mainbody, '#controler #volume');
		player.volumerange = $(mainbody, '#controler #volume #range');
		player.volumevalue = $(mainbody, '#controler #volume #range div');
		player.volumepercentage = $(mainbody, '#controler #volume span');
		player.volumestat = $(mainbody, '#controler #volume #stat');
		//player.loadinfo.ctx = player.loadinfo.getContext('2d');
		//makeTabGroup([[player.danmulistbutton, $(player.sidebar, '#danmupool')], [player.superdanmubutton, $(player.sidebar, '#superdanmueditor')], [player.optionbutton, player.optionpannel]]);
		//makeTabGroup([[$(player.sidebar, '#chooseText'), $(player.sidebar, '#SuperTextTab')], [$(player.sidebar, '#chooseCode'), $(player.sidebar, '#SupeCodeTab')]]);
		player.danmumark=$(mainbody,"#danmumark");
		danmumarkct=player.danmumark.getContext("2d");
		progressct=player.progressbar.getContext("2d");
		player.progressbar.height=9;
		//player.loadinfo.height = player.progress.offsetHeight; 
		(player.danmuContextMenu = c_ele('div')).className = 'textContextMenu';
		playersse=player.mainbody.getAttribute("playersse");
	}
	/*function setPlayOption() {
		player.o.recycle = false;
	}*/
	function tip(str){
		var td=c_ele("div");
		td.className="tip";
		td.innerHTML=str;
		player.tipbox.appendChild(td);
		setTimeout(function(){
			td.style.display="block";
			setTimeout(function(){
				player.tipbox.removeChild(td);
				td=null;
			},4000);
		},20);
	}
	/*function setDefaultOption() {
		var ver = DanmuPlayerVersion;
		if (getOption('DefaultSetted') != ver) {
			var settings = {
				DefaultSetted: 'true',
				TwoDCodeDanmu: 'true',
				ThreeDCodeDanmu: 'true',
				PlaySpeed: '1',
				ProgressDanmumark: 'false',
				DivCommonDanmu: 'false'
			}
			for (var st in settings) {
				if (getOption(st) == false) {
					setOption(st, settings[st]);
				}
			}
			setOption('DefaultSetted', ver);
		}
	}*/
	function loadoption() {
		//console.log("加载设置");
		newstat('加载设置');
		player.o = {},
		player.assvar = {},
		player.switchs = {};
		//player.ZiMu={};
		player.cacheobj = {};
		player.assvar.hasZimu = false;
		player.assvar.hasSuperDanmu = false;
		var optioncategory = [],
		tmpcategory = $$(player.optionpannel, 'h3'),
		tmpoption = $$(player.optionpannel, 'h3+div');
		for (var i = 0; i < tmpcategory.length; i++) {
			optioncategory.push([tmpcategory[i], tmpoption[i]]);
		}
		resetprocess();
	}
	function loadvideo() {
		//console.log("加载视频");
		newstat('获取视频地址');
		cmd('getVideoAddress ' + videoid, false,
		function(a) {
			if (a == 'Error') {
				newstat('地址获取错误');
				player.playcount.innerHTML = '视频错误';
				player.EC.fireEvent("VideoAddressError");
				return;
			}
			try {
				var json =JSON.parse(a),
				videosrc = JSON.parse(json.url);
			} catch(e) {
				newstat('地址获取错误');
				player.EC.fireEvent("VideoAddressParseError");
				//player.playcount.innerHTML = '视频错误';
				player.videopreload.textdiv.innerHTML = '(๑• . •๑)';
				removeEleClass(player.videopreload.textdiv, "shakeanimation");
				player.videopreload.textdiv.parentNode.style.top = "calc(50% - 110px)";
				return;
			}
			var count = json.count;
			player.videoaddress=[];
			for(var no in videosrc){
				if(videosrc[no]&&videosrc[no].length){
					player.videoaddress.push({res:no,url:videosrc[no]});
				}else{
					console.warn("丢弃一个空地址");
				}
			}
			if(!player.videoaddress[0]){
				newstat('地址获取错误');
				return;
			}
			if ((count = Number(count)) >= 0) {
				//player.playcount.innerHTML = '播放数:' + count;
			}
			console.info('得到视频地址:' , videosrc);
			Message("CTRL", {
				name: "videoaddress",
				src: player.videoaddress[0].url
			});
		});
	}
	/*function createDanmuDiv(obj) {
		var danmudiv = c_ele('div');
		danmudiv.className = 'danmudiv';
		danmudiv.danmuid = obj.id||"";
		danmudiv.time = obj.t;
		danmudiv.type = obj.ty;
		var time = getMin_Sec_By_Million(obj.t);
		danmudiv.innerHTML = '<span class="danmutime">' + (time.min < 10 ? '0' + time.min: time.min) + ':' + (time.sec < 10 ? '0' + time.sec: time.sec) + '</span> <span class="danmucontent" title="' + obj.c + '">' + obj.c + '</span> <span class="danmudate">' + obj.d + '</span>';
		if (obj.ty == 4) {
			//高级弹幕
			danmudiv.style.backgroundColor = '#CCC';
		}
		if (obj.ty == 5) {
			//字幕
			danmudiv.style.backgroundColor = 'green';
		}
		player.danmucontantor.appendChild(danmudiv);
	}*/
	/*function listdanmu(danmuobj) {
		if (danmuobj) {
			createDanmuDiv(danmuobj);
		} else {
			for (var i = 0; i < danmulist.length; i++) {
				createDanmuDiv(danmulist[i]);
			}
		}
	}*/
	function loaddanmu() {
		//console.log("加载弹幕");
		newstat('加载弹幕');
		//danmufuns.show();
		cmd('getDanmu ' + videoid, false,
		function(a) {
			if (a == 'Error') {
				newstat('弹幕加载失败');
				player.danmucount.innerHTML = '弹幕错误';
				return;
			}
			try {
				var danmuarr = JSON.parse(a);
			} catch(e) {
				//newstat("弹幕错误");
				danmucount = 0;
				//player.danmucount.innerHTML = "弹幕错误";
			};
			if (typeof danmuarr == 'object') {
				for (var i = 0; i < danmuarr.length; i++) {
					try {
						//danmuarr[i] = eval('(' + danmuarr[i] + ')');
						//danmuarr[i].c=danmuarr[i].c.replace(/\n/m,"\n");
						danmuarr[i] = JSON.parse(danmuarr[i]);
					} catch(e) {
						newstat('弹幕错误');
						//console.log(e)
					}
				}
				danmulist = danmuarr;
				danmucount = danmuarr.length;
				//listdanmu();
				Message("CTRL", {
					name: "danmuarray",
					array: danmuarr
				});
				//danmuarray=danmuarr;
				danmufuns.refreshnumber();
			}
		});
	}
	function resetprocess() {
		player.danmumark.width = player.progressbar.width = player.progressbar.offsetWidth;
		controlfuns.refreshprogresscanvas();
		controlfuns.refreshDanmuMark();
	}
	function initSwitch() {
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
	}
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

	function newstat(stat) {
		if (typeof stat == 'string') {
			//player.statboard.innerHTML = '&nbsp;' + stat + '<br>' + player.statboard.innerHTML;
		}
	}
	danmufuns = {
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
					player.danmuinput.blur();
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
				danmuobj.hasfirstshowed = 0;
				var date = new Date();
				date.day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
				date.month = date.getMonth() + 1;
				date.month = (date.month < 10) ? '0' + date.month: date.month;
				danmuobj.d = date.getFullYear() + '-' + date.month + '-' + date.day;
				core.danmufuns.initnewDanmuObj(danmuobj);
				//createDanmuDiv(danmuobj);
				//core.danmufuns.createCommonDanmu(danmuobj, core.danmufuns.getTunnel(danmuobj.ty, danmuobj.s));
				danmulist.push(danmuobj);
				//danmucount++;
				danmufuns.refreshnumber();
				//controlfuns.refreshDanmumark();
				autocmd('adddanmu', (videoid), type, c, time, color || 'NULL', danmuStyle.fontsize,playersse,
				function(response) {
					if (Number(response) >= 0) {
						danmuobj.id = Number(response);
						if (!content) {
							player.danmuinput.value = '';
							player.sendcover.style.display = 'none';
						}
					} else {
						try{
							var err=response.match(/^Error:(.+)$/)[1];
							tip(err);
						}catch(e){
							console.log(response);
						}
						if (!content) player.sendcover.style.display = 'none';
					}
				});
				if (!content) {
					player.assvar.danmusendTimeout = setTimeout(function() {
						if (player.sendcover.style.display != 'none') {
							player.sendcover.style.display = 'none';
						}
					},
					10000);
				}
			}
		},

		addToDanmuList: function(danmuobj) {
			danmulist.push(danmuobj);
			if (core)core.addToDanmuArray(danmuobj);
		},

		pause: function() {
			//clearInterval(interval.calibrationTime.i);
			//TODO:暂停所有弹幕
		},
		refreshnumber: function() {
			if (danmulist.length >= 0) {
				//player.danmucount.innerHTML = '弹幕数:' + danmucount;
			} else {
				//player.danmucount.innerHTML = '弹幕错误';
			}
			/*player.assvar.danmumark.drawpic(player.loadinfo.width, 25, player.assvar.danmumark.drawfunction);*/
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
		console.info('打开全屏');
		addEleClass(player.sendbox, 'sendbox_fullscreen');
		addEleClass(player.videoframe, 'videoframe_fullscreen');
		addEleClass(player.controler, 'controler_fullscreen');
		//addEleClass(player.sidebar, "sidebar_fullscreen");
		//controlfuns.sidebar_hide();
		player.displaystat = 'fullscreen';
		resetprocess();
	}
	controlfuns.exitfullscreen = function() {
		console.info('退出全屏');
		removeEleClass(player.sendbox, 'sendbox_fullscreen');
		removeEleClass(player.videoframe, 'videoframe_fullscreen');
		removeEleClass(player.controler, 'controler_fullscreen');
		//removeEleClass(player.sidebar, "sidebar_fullscreen");
		//controlfuns.sidebar_show();
		resetprocess();
	}
	controlfuns.fullscreenchange = function() {
		if (isFullscreen()) {
			controlfuns.fullscreen();
		} else {
			controlfuns.exitfullscreen();
		}
	}
	controlfuns.fullpage = function() {
		exitFullscreen();
		addEleClass(player.mainbody, 'fullpage');
		addEleClass(player.sendbox, 'fullpage_sendbox');
		addEleClass(player.videoframe, 'fullpage_videoframe');
		player.displaystat = 'fullpage';
		resetprocess();
	}
	controlfuns.exitfullpage = function() {
		removeEleClass(player.mainbody, 'fullpage');
		removeEleClass(player.sendbox, 'fullpage_sendbox');
		removeEleClass(player.videoframe, 'fullpage_videoframe');
		player.displaystat = 'normal';
		resetprocess();
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
		if(!core)return;
		var dmk=player.danmumark;
		var tw=dmk.width;
		var th=dmk.height=16;
		danmumarkct.clearRect(0, 0,tw,16);
		var pixtime=((core.player.video.duration*1000/tw*2+0.5)|0);
		var max=0;
		var grouparr=new Array(((tw/2+0.5)|0)+1),groupnum;
		for(var i=danmulist.length;i--;){
			groupnum=Math.floor(danmulist[i].t/pixtime);
			if(!grouparr[groupnum])grouparr[groupnum]=0;
			grouparr[groupnum]++;
			if(grouparr[groupnum]>max){
				max=grouparr[groupnum];
			}
		}
		danmumarkct.strokeStyle="rgb(2, 149, 223)";
		danmumarkct.fillStyle="rgba(95, 186, 231,0.5)";
		
		danmumarkct.moveTo(0,dmk.height);
		danmumarkct.lineTo(dmk.width,dmk.height);
		
		for(var i=grouparr.length;i--;){
			if(!grouparr[i])grouparr[i]=0;
			danmumarkct.lineTo(i*2,(1-grouparr[i]/max)*th);
		}
		danmumarkct.closePath();
		danmumarkct.fill();
		danmumarkct.stroke();
	}
	controlfuns.refreshprogresscanvas = function() {
		if (progressct&&core) {
			var ct =progressct,video=core.player.video;
			if (video) {
				var Xw = player.progressbar.width,
				d = video.duration;
				ct.save();
				ct.clearRect(0, 0, Xw, 9);
				//player.progressbar.height=9;
				ct.lineCap="round";
				//绘制已播放区域
				ct.beginPath();
				ct.strokeStyle = '#ffcc66';
				ct.lineWidth =1;
				var tr = video.played;
				for (var i = 0; i < tr.length; i++) {
					ct.moveTo(tr.start(i) / d * Xw, 8);
					ct.lineTo(tr.end(i) / d * Xw, 8);
					ct.stroke();
				}

				//绘制已缓冲区间
				ct.beginPath();
				ct.strokeStyle = '#C0BBBB';
				ct.lineWidth =3;
				var tr = video.buffered;
				for (var i = 0; i < tr.length; i++) {
					ct.moveTo(tr.start(i) / d * Xw, 6);
					ct.lineTo(tr.end(i) / d * Xw, 6);
					ct.stroke();
				}
				
				//绘制普通进度条
				ct.beginPath();
				ct.strokeStyle = '#66CCFF';
				ct.lineWidth =5;
				ct.moveTo(0, 3);
				ct.lineTo(video.currentTime / d * Xw, 3);
				//ct.stroke();

				ct.stroke();
				ct.restore();
			}
			
		}
	}
	controlfuns.refreshtime = function() {
		var currentTime = player.assvar.pointingtime||getMin_Sec(core.player.video.currentTime);
		totaltime = getMin_Sec(core.player.video.duration);
		if (currentTime.min >= 0 && currentTime.sec >= 0 && totaltime.min >= 0 && totaltime.sec >= 0) {
			player.time.innerHTML =(currentTime.min<10?"0"+currentTime.min:currentTime.min)+ ':' + (currentTime.sec<10?"0"+currentTime.sec:currentTime.sec) + '/' + (totaltime.min<10?"0"+totaltime.min:totaltime.min) + ':' + (totaltime.sec<10?"0"+totaltime.sec:totaltime.sec);
		} else {
			player.time.innerHTML = '视频错误';
		}
	}
	/*controlfuns.sidebar_hide = function() {
		if (player.videoframe.className.search('sidebarhide_videoframe') == -1) {
			//console.log("隐藏边栏");
			addEleClass(player.videoframe, 'sidebarhide_videoframe');
			addEleClass(player.sendbox, 'sidebarhide_videoframe');
			addEleClass(player.sidebar, 'sidebarhide_sidebar');
			resetprocess();
		}
	}
	controlfuns.sidebar_show = function() {
		//console.log("显示边栏");
		removeEleClass(player.videoframe, 'sidebarhide_videoframe');
		removeEleClass(player.sendbox, 'sidebarhide_videoframe');
		removeEleClass(player.sidebar, 'sidebarhide_sidebar');
		window.danmusidebarstat = true;
		resetprocess();
	}*/

	/*CB={
		//currentTime:
	}*/
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
		/*DivCommonDanmu: {
			type: "core",
			on: function() {
				core.danmufuns.danmumoverAnimation.stop();
				core.player.o.divcommondanmu = true;
				core.danmufuns.danmumoverAnimation.start();
				core.danmucontainer.display = false;
				core.danmufuns.clear();
				core.danmufuns.mover = core.danmufuns.moverfun.div;
				core.danmufuns.createCommonDanmu =core. danmufuns.createCommonDanmufun.div;
				//core.console.log(danmufuns.createCommonDanmu)
				core.danmufuns.clear = core.danmufuns.clearfun.div;
				player.o.divcommondanmu = true;
				player.switchs['RealtimeVary'].disable();
				setOption('DivCommonDanmu', 'true');
			},
			off: function() {
				core.danmufuns.danmulayerAnimation.start();
				core.danmufuns.danmumoverAnimation.stop();
				core.player.o.divcommondanmu = false;
				core.danmufuns.danmumoverAnimation.start();
				core.danmucontainer.display = true;
				core.danmufuns.clear();
				core.danmufuns.mover = core.danmufuns.moverfun.canvas;
				core.danmufuns.createCommonDanmu = core.danmufuns.createCommonDanmufun.canvas;
				core.danmufuns.clear = core.danmufuns.clearfun.canvas;
				player.o.divcommondanmu = false;
				player.switchs['RealtimeVary'].enable();
				setOption('DivCommonDanmu', 'false');
			}
		}*/
	};
	rangeCenter = {
		PlaySpeed: function(value) {
			if (value > 0) core.player.video.playbackRate=value;
		},
		StorkeWidth: function(value) {
			core.player.o.StorkeWidth=value;
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
			core.moveTime=moveTime;
			setOption('DanmuSpeed', speed);
		}
	};
	inputCenter = {
		relativeTo: function(value) {
			console.log(value);
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

	function getcorecontent(){
		_string_=core._string_;
		getVideoMillionSec=core.getVideoMillionSec;
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
			if (isFullscreen() || player.displaystat == 'fullpage') {
				resetprocess();
			}
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
		var progressmousekey = false,
		volumemousekey = false;
		aEL(player.mainbody, 'resize',
		function() {
			resetprocess();
		});

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

		aEL(document, 'mouseup',
		function(e) {
			e.preventDefault();
			progressmousekey = false;
			volumemousekey = false;
		});
		aEL(player.volumerange, 'mousedown',
		function(e) {
			e.preventDefault();
			volumemousekey = true;
			var y = e.offsetY || e.y || e.layerY;
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
				var y = e.offsetY || e.y || e.layerY;
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
		/*aEL(player.sidebarSwitch, 'click',
		function(e) {
			if (player.videoframe.className.search('sidebarhide_videoframe') != -1) {
				controlfuns.sidebar_show();
			} else {
				controlfuns.sidebar_hide();
			}
		});*/
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
		aEL($(player.mainbody, '#sendbox #sendbutton'), 'click',
		function(e) {
			danmufuns.send();
		});
		aEL(player.danmuinput, 'keydown',
		function(e) {
			if (e.keyCode == 13) {
				danmufuns.send();
			}
		});
		aEL(player.danmuinput,"input",function(){
			if(player.danmuinput.value!=""){
				addEleClass(player.sendbox,"forceopacity");
			}else{
				removeEleClass(player.sendbox,"forceopacity");
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
			console.info('事件:全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(document, 'mozfullscreenchange',
		function() {
			console.info('事件:moz全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(document, 'webkitfullscreenchange',
		function() {
			console.info('事件:webkit全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(document, 'MSFullscreenChange',
		function() {
			console.info('事件:MS全屏状态改变');
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
				console.info('静音');
			} else {
				console.info('取消静音');
			}
		});
		/*aEL(video, 'play',
		function() {
			//console.log("事件:播放");
			controlfuns.refreshprogresscanvas();
			//controlfuns.play();
		});
		aEL(video, 'pause',
		function() {
			//console.log("事件:暂停");
			//newstat("暂停");
			player.assvar.isPlaying = false;
			controlfuns.pause();
		});
		aEL(video, 'ended',
		function() {
			console.log('事件:播放结束');
			controlfuns.ended();
		});
		aEL(video, 'loadedmetadata',
		function() {
			console.log('事件:加载视频元信息');
			player.o.totaltime = video.duration;
			//获取媒体总时间
			controlfuns.refreshtime();
			controlfuns.refreshDanmuMark();
			videoinfo.width=player.video.offsetWidth;
			videoinfo.height=player.video.offsetHeight;
			videoinfo.CrownHeight=videoinfo.width/videoinfo.height;
			//console.log("宽:"+videoinfo.width+" 高:"+videoinfo.height+" 宽高比:"+videoinfo.CrownHeight)
			player.video.style.height=player.video.style.width="100%";
			resetprocess();
			player.videopreload.parentNode.removeChild(player.videopreload);
		});

*/

		/*来自框架里视频的事件*/
		function videoevents() {
			video = core.player.video;
			aEL(player.danmuctrl, 'click',
			function() {
				if (core.player.danmuframe.style.display == 'none') {
					//danmufuns.show();
				} else {
					//danmufuns.hide();
					//danmufuns.clear();
				}
			});
			aEL(player.videoiframe, 'mouseover',
			function() {
				core.focus();
			});
		aEL(player.progress, 'mouseleave',
		function(e) {
			player.assvar.pointingtime = null;
			controlfuns.refreshtime();
		});
			aEL(player.progress, 'mousemove',
			function(e) {
				e.preventDefault();
				if(!core)return;
				var x = e.offsetX || e.layerX;
				var time = x / player.progress.offsetWidth * core.player.video.duration;
				if (progressmousekey) {
					core.player.video.currentTime = time;
				}
				player.assvar.pointingtime =getMin_Sec(time);
				controlfuns.refreshtime();
				controlfuns.refreshprogresscanvas();
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
				player.videopreload.parentNode.removeChild(player.videopreload);
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
		console.info("事件:媒体缓冲中");
		tip('缓冲中..');
	});
		}

		/*消息传递处理中心*/
		aEL(window, 'message',
		function(e) {
			//console.log(e.data);
			if (SiteDomain == "*" || (SiteDomain.search(e.origin) != -1)) {
				if (e.data.type) {
					//console.log(e);
					switch (e.data.type) {
						/*case "CTRL":{
							switch(e.data.msg){
								//case "play"
							}
							break;
						}*/
					case "EVENT":
						{
							switch (e.data.msg) {
							case "ready":
								{
									console.info("弹幕核心已加载");
									core = e.source;
									getcorecontent();
									player.video = core.player.video;
									Message=function(type, content) {
										var msg = {
											type: type,
											msg: content
										};
										core.postMessage(msg, "*");
									}
									player.EC.fireEvent("danmucoreloaded");
									videoevents();
									loadvideo();
									loaddanmu();
									initSwitch();
									initRange();
									break;
								}
							/*case "play":
								{
									controlfuns.refreshprogresscanvas();
									break;
								}*/
							/*case "pause":
								{
									controlfuns.pause();
									break;
								}*/
							/*case "ended":
								{
									controlfuns.ended();
									break;
								}*/
							/*case "loadedmetadata":
								{
									controlfuns.refreshtime();
									controlfuns.refreshDanmuMark();
									player.videopreload.parentNode.removeChild(player.videopreload);
									break;
								}*/
							/*case "volumechange":
								{
									controlfuns.volumechange();
									break;
								}*/
							/*case "loadstart":
								{
									controlfuns.refreshprogresscanvas();
									break;
								}*/
							/*case "playing":
								{
									controlfuns.playing();
									break;
								}*/
							/*case "seeked":
								{
									controlfuns.refreshprogresscanvas();
									break;
								}*/
							/*case "timeupdate":
								{
									controlfuns.refreshprogresscanvas();
									controlfuns.refreshtime();
									break;
								}*/
							case "waiting":
								{

									break;
								}
							case "error":
								{

									break;
								}
							}
							break;
						}
					case "MESSAGE":
						{
							console.log(e.data.msg);
							break;
						}
						/*case "CONSOLE":{
							console.log(e.data.msg);
							break;
						}*/
					case "CALLBACK":
						{
							if (callbackArray[e.data.msg.id]) {
								callbackArray[e.data.id](e.data.msg.
								return);
								callbackArray.splice(e.data.id, 1);
							}
							break;
						}
					}
				} else {
					console.log(e);
				}
			}
		});
	}
	setdom();
	loadoption();
	initInput();
	initevents();
}
/*
                                              ###              ###
                                      #####################
                                                ##             ##
             #########                                                                   #######
             ##          ##          #################                 #####         ###                  #####
             ##          ##          ##           ##           ##           #####                  ###        ##		##
             #########          ##           ##           ##                                            ######
                                         #################
                                         ##           ##           ##
                                         ##           ##           ##
                                         #################
*/

var i喵i = '不要卖萌눈_눈';
/*自定义事件发射器*/
function SimpleEvent(){this.eventid=1;this.eventlist={};this.eventargrule={};this.debug=false;this.addEvent=function(ename,fun){if(typeof ename!="string"){if(this.debug===true)console.error("事件名不是字符串:",ename);return}if(!this.eventlist[ename]||typeof this.eventlist[ename].join!="function"){this.eventlist[ename]=[];if(this.debug===true)console.info("添加事件:",ename)}return[ename,this.eventlist[ename][this.eventlist[ename].push(fun)-1].id=this.eventid++,fun]};this.removeEvent=function(eobj){if(!eobj||typeof eobj!="object"||!eobj.join)return;if(this.eventlist[eobj[0]]&&this.eventlist[eobj[0]].indexOf){var ind=this.eventlist[eobj[0]].indexOf(eobj[2]);if(ind>=0){this.eventlist.splice(ind,1);if(this.debug===true)console.info("移除事件:",eobj[0])}}else if(this.debug===true){console.warn("移除未定义的事件:",eobj[0])}};this.setargrule=function(ename,rulefun){if(typeof ename!="string"){if(this.debug===true)console.error("事件名不是字符串:",ename);return}if(typeof rulefun=="function"){this.eventargrule[ename]=rulefun}else if(his.debug===true){console.error("参数规则不是函数")}};this.fireEvent=function(ename){if(typeof ename!="string"){if(this.debug===true)console.error("事件名不是字符串:",ename);return}if(this.debug===true){console.info("发射事件:",ename)}if((typeof this.eventlist[ename])=="object"){var th=this;this.eventlist[ename].forEach(function(value){if(this.debug===true){console.info("事件触发事件列表:",ename)}if(typeof value=="function"){setTimeout(function(){if(th.eventargrule[ename]){value(th.eventargrule[ename]());return}value()},0)}else if(typeof value=="string"){setTimeout(function(){try{eval(value)}catch(e){if(th.debug===true){console.error("无法执行事件:",e)}}},0)}})}else if(this.debug===true){console.warn("未定义的事件:",ename)}}}