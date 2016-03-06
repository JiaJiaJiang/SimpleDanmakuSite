/*
Belong to iTisso
Coder:LuoJia
 */
var DanmuPlayerVersion = "0.4.0";
var SiteDomain = "";
cmd_url="../command.php"; 
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
	arr.do = select_do;
	return arr;
}
var $ = d_select,
$$ = d_selectall;
function c_ele(tag) {
	return document.createElement(tag);
}
var _string_ ;
function aEL(dom, e, fun) {
	//添加事件监听
	if (dom.addEventListener) dom.addEventListener(e, fun, false);
	else if (dom.attachEvent) dom.attachEvent('on' + e, fun);
	else {
		dom['on' + e] = fun;
	}
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
        console.log("Fullscreen API is not supported");
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
	timeouts = {},
	controlfuns = {};
	localstoragesupport = window.localStorage ? true: false;
	timeouts.fun = {};
	var danmufuns = {},
	danmuarray = [],
	danmucount,
	ready = false;
	var playersse;
	var danmumarkcan,danmumarkct;
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
		player.mainbody = $('.playermainbody');
		player.controler = $(player.mainbody, '#controler');
		player.colorinput = $(player.mainbody, '#colorinput');
		player.colorview = $(player.mainbody, '#colorview');
		player.sendcover = $(player.mainbody, '#sendbox #sendboxcover');
		player.danmuctrl = $(player.mainbody, '#controler #danmuctrl');
		player.danmuinput = $(player.mainbody, '#sendbox #danmuinput');
		//player.danmucontantor = $(player.mainbody, '#danmus');
		player.fullscreen = $(player.mainbody, '#controler #fullscreen');
		player.loop = $(player.mainbody, '#controler #loop');
		player.play_pause = $(player.mainbody, '#play_pause');
		//player.playcount = $(player.mainbody, '#playcount');
		player.progress = $(player.mainbody, '#progress');
		player.progerssdisplay = $(player.mainbody, '#progerssdisplay');
		player.videocached = $(player.mainbody, '#videocached');
		player.progersscover = $(player.mainbody, '#progersscover');
		player.playbutton = $(player.mainbody, '#play_pause #play');
		player.pausebutton = $(player.mainbody, '#play_pause #pause');
		player.ctrlcovre=$(player.mainbody, '#ctrlcovre');
		player.timepoint = $(player.mainbody, '#controler #progress #timepoint');
		player.time = $(player.mainbody, '#controler #time');
		player.tipbox = $(player.mainbody, '#tipbox');
		player.sendbox = $(player.mainbody, '#sendbox');
		player.statboard = $(player.mainbody, '#stat');
		player.videoframe = $(player.mainbody, '#videoframe');
		player.videoiframe = $(player.videoframe, '#videoiframe');
		player.videopreload = $('#videopreload');
		player.videopreload.textdiv = $(player.videopreload, '.videopreloadanimation');
		player.volume = $(player.mainbody, '#controler #volume');
		player.volumerange = $(player.mainbody, '#controler #volume #range');
		player.volumevalue = $(player.mainbody, '#controler #volume #range div');
		player.volumepercentage = $(player.mainbody, '#controler #volume span');
		player.volumestat = $(player.mainbody, '#controler #volume #voluemstat');
		danmumarkcan=$("#danmumark");
		danmumarkct=danmumarkcan.getContext("2d");
		playersse=player.mainbody.getAttribute("playersse");
	}
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
	function loadoption() {
		newstat('加载设置');
		player.o = {};
		player.assvar = {};
	}
	function loadvideo() {
		newstat('获取视频地址');
		cmd('getVideo ' + videoid, false,
		function(a) {
			if (a == 'Error') {
				newstat('地址获取错误');
				return;
			}
			try {
				var json =JSON.parse(a);
			} catch(e) {
				newstat('地址获取错误');
				player.videopreload.textdiv.innerHTML = '(๑• . •๑)';
				removeEleClass(player.videopreload.textdiv, "shakeanimation");
				player.videopreload.textdiv.parentNode.style.top = "calc(50% - 110px)";
				return;
			}
			var videosrc =JSON.parse(json.url),
			count = json.count;
			console.log('得到视频地址:');
			console.log(videosrc);
			player.videoaddress=[];
			for(var no in videosrc){
				if(videosrc[no]&&videosrc[no].length){
					player.videoaddress.push({res:no,url:videosrc[no]});
				}else{
					console.log("丢弃一个空地址");
				}
			}
			if(!player.videoaddress[0]){
				newstat('地址获取错误');
				return;
			}
			Message("CTRL", {
				name: "videoaddress",
				src: player.videoaddress[0].url
			});
		});
	}
	
	function loaddanmu() {
		newstat('加载弹幕');
		cmd('getDanmu ' + videoid+" --no_date", false,
		function(a) {
			if (a == 'Error') {
				newstat('弹幕加载失败');
				return;
			}
			try {
				var danmuarr = JSON.parse(a);
			} catch(e) {
				newstat("弹幕错误");
			};
			if (typeof danmuarr == 'object') {
				Message("CTRL", {
					name: "danmuarray",
					array: danmuarr
				});
				danmuarray=danmuarr;
				if(core.player.video.duration)
				controlfuns.refreshDanmumark();
			}
		});
	}
	
	function initInput() {
		var inputs = d_selectall(player.mainbody, 'input[name]');
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
			player.statboard.innerHTML += '<br>' + stat ;
		}
	}
	danmufuns = {
		send: function(content) {
			var c = content ? content: player.danmuinput.value;
			c = c.replace(/\\n/g, '\n');
			if (_string_.removesidespace(c) != '') {
				console.log("发送弹幕:" + player.danmuinput.value);
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
				//danmuobj.d = date.getFullYear() + '-' + date.month + '-' + date.day;
				core.danmufuns.initnewDanmuObj(danmuobj);
				//core.danmufuns.createCommonDanmu(danmuobj);
				danmuarray.push(danmuobj);
				controlfuns.refreshDanmumark();
				autocmd('adddanmu', (videoid), type, c, time, color || 'NULL', danmuStyle.fontsize,playersse,
				function(response) {
					if (Number(response) >= 0) {
						danmuobj.id = Number(response);
						if (!content) {
							player.danmuinput.value = '';
							player.sendcover.style.display = 'none';
							removeEleClass(player.sendbox,"forceopacity");
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

		}
	}
	controlfuns.play = function() {
		player.playbutton.style.display = 'none';
	}
	controlfuns.playing = function() {
		controlfuns.play();
		controlfuns.refreshprogress();
	}
	controlfuns.pause = function() {
		player.playbutton.style.display = 'block';
	}
	controlfuns.fullscreen = function() {
		console.log('打开全屏');
		addEleClass(player.sendbox, 'sendbox_fullscreen');
		addEleClass(player.videoframe, 'videoframe_fullscreen');
		addEleClass(player.controler, 'controler_fullscreen');
		player.displaystat = 'fullscreen';
	}
	controlfuns.exitfullscreen = function() {
		console.log('退出全屏');
		removeEleClass(player.sendbox, 'sendbox_fullscreen');
		removeEleClass(player.videoframe, 'videoframe_fullscreen');
		removeEleClass(player.controler, 'controler_fullscreen');
	}
	controlfuns.fullscreenchange = function() {
		if (isFullscreen()) {
			controlfuns.fullscreen();
		} else {
			controlfuns.exitfullscreen();
		}
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
	controlfuns.refreshprogress = function() {
		if(!core)return;
		var video=core.player.video;
		if(video){
			player.progerssdisplay.style.width=video.currentTime/video.duration*100+"%";
			var tr = core.player.video.buffered;
				for (var i =tr.length; i--;) {
					player.videocached.style.width=(tr.end(i)/video.duration*100+"%")
					break;
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
	controlfuns.refreshDanmumark=function(){
		var tw=danmumarkcan.width=danmumarkcan.offsetWidth;
		var th=danmumarkcan.height=16;
		var pixtime=((core.player.video.duration*1000/tw*2+0.5)|0);
		var max=0;
		var grouparr=new Array(((tw/2+0.5)|0)+1),groupnum;
		for(var i=danmuarray.length;i--;){
			groupnum=Math.floor(danmuarray[i].t/pixtime);
			if(!grouparr[groupnum])grouparr[groupnum]=0;
			grouparr[groupnum]++;
			if(grouparr[groupnum]>max){
				max=grouparr[groupnum];
			}
		}
		danmumarkct.strokeStyle="rgb(2, 149, 223)";
		danmumarkct.fillStyle="rgb(95, 186, 231)";
		danmumarkct.clearRect(0, 0, danmumarkcan.width,danmumarkcan.height);
		danmumarkct.moveTo(0,danmumarkcan.height);
		danmumarkct.lineTo(danmumarkcan.width,danmumarkcan.height);
		
		for(var i=grouparr.length;i--;){
			if(!grouparr[i])grouparr[i]=0;
			danmumarkct.lineTo(i*2,(1-grouparr[i]/max)*th);
		}
		danmumarkct.closePath();
		danmumarkct.fill();
		danmumarkct.stroke();
	}

	function playoption(){
		core.player.o.RealtimeVary = false;
		core.player.o.StorkeWidth=Number(getOption("StorkeWidth"));
		core.player.o.ShadowWidth=Number(getOption("ShadowWidth"));
		core.moveTime=(Number(getOption("DanmuSpeed")) * 1000+0.5)|0;
	}
	inputCenter = {
		colorInput: function(value) {
			if (isHexColor(value)) {
				var co = value.replace('#','');
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
		aEL(player.play_pause, 'click',
		function(e) {
			e.preventDefault();
			if (core.player.video.paused) {
				core.danmufuns.start();
				core.player.video.play();
			} else {
				core.player.video.pause();
			}
		});
		var progressmousekey = false,
		volumemousekey = false;
		

		aEL(document, 'mouseup',
		function(e) {
			e.preventDefault();
			progressmousekey = false;
			volumemousekey = false;
		});
		aEL(player.progress, 'contextmenu',
		function(e) {
			e.preventDefault();
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
				//player.assvar.pointingx = x;
				//controlfuns.refreshprogress();
			});
			aEL(player.progress, 'mousedown',
			function(e) {
				e.preventDefault();
				progressmousekey = true;
				var x = e.offsetX || e.layerX;
				core.player.video.currentTime = x / player.progress.offsetWidth * core.player.video.duration;
			});

		aEL(player.volumerange, 'mousedown',
		function(e) {
			e.preventDefault();
			volumemousekey = true;
			var y = e.offsetY || e.y || e.layerY;
			if (y > 200) {
				core.player.video.volume = 0;
			} else if (y < 0) {
				core.player.video.volume = 1;
			} else {
				core.player.video.volume = (200 - y) / player.volumerange.offsetHeight;
			}
		});
		aEL(player.volumepercentage, 'mousemove',
		function(e) {
			if (volumemousekey) {
				core.player.video.volume = 1;
			}
		});
		aEL(player.volumestat, 'mousemove',
		function(e) {
			if (volumemousekey) {
				core.player.video.volume = 0;
			}
		});
		aEL(player.volumerange, 'mousemove',
		function(e) {
			if (volumemousekey) {
				var y = e.offsetY || e.y || e.layerY;
				if (y > 200) {
					core.player.video.volume = 0;
				} else if (y < 0) {
					core.player.video.volume = 1;
				} else {
					core.player.video.volume = (200 - y) / player.volumerange.offsetHeight;
				}
			}
		});
		aEL(player.volume, 'mouseleave',
		function(e) {
			volumemousekey = false;
		});
		aEL(player.fullscreen, 'click',
		function(e) {
			e.preventDefault();
				if (isFullscreen()) {
					exitFullscreen();
				} else {
					requestFullscreen(player.mainbody);
				}
		});
		aEL($('#sendbutton'), 'click',
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
		aEL($('#fontstylebutton #danmuType'), 'click',
		function(e) {
			var selections = d_selectall(player.mainbody, '#fontstylebutton #danmuType div'),
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
						break;
					}
				case 'frombottom':
					{
						danmuStyle.type = 2;
						break;
					}
				case 'fromright':
					{
						danmuStyle.type = 0;
						break;
					}
				case 'fromleft':
					{
						danmuStyle.type = 1;
						break;
					}
				}
			}
		});
		aEL($(player.mainbody, '#fontstylebutton #fontSize'), 'click',
		function(e) {
			var selections = d_selectall(player.mainbody, '#fontstylebutton #fontSize div'),
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
			console.log('事件:全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(document, 'mozfullscreenchange',
		function() {
			console.log('事件:moz全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(document, 'webkitfullscreenchange',
		function() {
			console.log('事件:webkit全屏状态改变');
			controlfuns.fullscreenchange();
		});
		aEL(document, 'MSFullscreenChange',
		function() {
			console.log('事件:MS全屏状态改变');
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
				tip("洗脑循环");
			} else {
				//console.log("取消循环");
				core.player.video.loop = false;
				player.loop.style.color = '#000';
				tip("关闭循环");
			}
		});
		aEL(player.volumestat, 'click',
		function(e) {
			e.preventDefault();
			core.player.video.muted = !core.player.video.muted;
			if (core.player.video.muted) {
				console.log('静音');
				tip("静音");
			} else {
				console.log('取消静音');
				tip("取消静音");
			}
		});
		aEL(player.ctrlcovre,"contextmenu",function(e){
			e.preventDefault();
		});
	

		/*来自框架里视频的事件*/
		function videoevents() {
			video = core.player.video;
			aEL(player.danmuctrl, 'click',
			function() {
				if (!core.danmucontainer.display) {
					core.danmufuns.show();
					tip("显示弹幕");
				} else {
					core.danmufuns.hide();
					core.danmufuns.clear();
					tip("隐藏弹幕");
				}
			});
			aEL(video, 'loadedmetadata',
			function(e) {
				controlfuns.refreshtime();
				if(core.danmuarray)
				controlfuns.refreshDanmumark();
				player.videopreload.parentNode.removeChild(player.videopreload);
				setTimeout(function(){player.sendbox.style.opacity=0;},5000);
			});
			aEL(video, 'volumechange',
			function(e) {
				controlfuns.volumechange();
			});
			aEL(video, 'ended',
			function(e) {
				//controlfuns.ended();
			});
			aEL(video, 'pause',
			function(e) {
				controlfuns.pause();
				player.ctrlcovre.style.opacity=1;
			});
			aEL(video, 'play',
			function(e) {
				controlfuns.refreshprogress();
			});
			aEL(video, 'timeupdate',
			function(e) {
				controlfuns.refreshprogress();
				controlfuns.refreshtime();
			});
			aEL(video, 'seeked',
			function(e) {
				controlfuns.refreshprogress();
			});
			aEL(video, 'progress',
			function(e) {
				controlfuns.refreshprogress();
			});
			aEL(video, 'playing',
			function(e) {
				controlfuns.playing();
				player.ctrlcovre.style.opacity=0;
			});
			aEL(video, 'waiting',
	function() {
		console.log("事件:媒体缓冲中");
		tip("正在缓冲");
	});
			aEL(player.ctrlcovre,"click",function(){
			if(video.paused){
				video.play();
				
			}else{
				video.pause();
				
			}
		});
			aEL(window,"resize",function(){
				controlfuns.refreshDanmumark();
			});
			aEL(window,"keydown",function(e){
				if(e.target.localName!="input"){
					e.preventDefault();
					switch(e.keyCode){
						case 39:{//前进
							video.currentTime+=3;
							break;
						}
						case 37:{//后退
							video.currentTime-=3;
							break;
						}
						case 32:{//开始/暂停
							core.controlfuns.play_pause();
							break;
						}
					}
				}
			});
		}

		/*消息传递处理中心*/
		aEL(window, 'message',
		function(e) {
			if (true) {
				if (e.data.type) {
					switch (e.data.type) {
					case "EVENT":
						{
							switch (e.data.msg) {
							case "ready":
								{
									newstat("弹幕核心已加载");
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
									videoevents();
									loadvideo();
									loaddanmu();
									playoption();
									//initSwitch();
									//initRange();
									break;
								}
							
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
					}
				} else {
					console.log(e);
				}
			}else{
				console.log("错误来源");
			}
		});
	}
	setdom();
	loadoption();
	initInput();
	initevents();
	player.videoiframe.src="core/index.html";
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

var about = '此版本由完全版缩减而来，以建立一个更轻量的弹幕播放器';