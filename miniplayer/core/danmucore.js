"use strict";
/*
Belong to iTisso
Coder:LuoJia
 */
function Message(type, content) {
	var msg = {
		type: type,
		msg: content
	};
	window.parent.postMessage(msg, "*");
}
function EVENT(msg) {
	Message("EVENT", msg);
}
function CONSOLE(str) {
	console.log("来自核心的消息--" + str);
}
function d_select(query) {
	if ((typeof arguments[0]) != 'string' && arguments[0] != null) {
		return arguments[0].querySelector(arguments[1]);
	} else {
		return document.querySelector(query);
	}
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
function c_ele(tag) {
	return document.createElement(tag);
}

function aEL(dom, e, fun) {
	//添加事件监听
	if (dom.addEventListener) dom.addEventListener(e, fun, false);
	else if (dom.attachEvent) dom.attachEvent('on' + e, fun);
	else {
		dom['on' + e] = fun;
	}
}
function guessmime(url) {
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
function removeEleClass(e, classname) {
	if (classname != '' && classname != ' ' && e) e.classList.remove(classname);
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

var width, height; //画布宽高
var player = {},
//播放器相关内容
intervals = {},
//定时器相关内容
controlfuns = {}; //控制函数
var danmulist = [],
//存放从danmu.js发送过来的弹幕原始列表
danmufuns = {},
//弹幕函数
danmuarray = [],
//以时间为下标存放所有弹幕的数组
danmutunnel = { //初始化轨道
	right: [],
	left: [],
	bottom: [],
	top: []
},
tunnelrecord=[],
moverInterval = 1000 / 60,
//没用了
moveTime = 5000,
//弹幕在屏幕上移动的时间基准(非实际时间)
tunnelheight = 0,
//记录轨道高度
timeline = [],
//作为时间点是否有弹幕的标记
timepoint = 0,
//当前弹幕时间
danmucontainer,
//所有文字弹幕的容器
drawlist,
//绘制列表的链接
varyflag = true; //标记是否进行渲染，用于降帧
var zimulist = [],
zimucontainer;
player.assvar = {};
var cleanremainder = false; //空闲时强制清除全屏的标记
var cleartop = 0,
clearbottom = 0; //clearRect用的范围
var prevarydanmu = true; //是否预渲染弹幕
var videoinfo = {
	width: null,
	height: null,
	CrownHeight: null
};
var COL, AnimationFrame, moverAnimation;
function setdom() {
	player.videoframe = d_select('#videoframe');
	player.danmuframe = d_select(player.videoframe, '#danmuframe');
	player.danmulayer = d_select(player.videoframe, '#danmulayer');
	player.video = d_select(player.videoframe, '#video');
	initCOL();
}
function initCOL() {
	window.COL = COL = newCOL();
	COL.font.color = '#ffffff';
	COL.font.fontFamily = "黑体";
	COL.setCanvas(player.danmulayer);
	COL.autoClear = true;
	initTextDanmuContainer();
	COL.MatrixTransform.on();
}
function initTextDanmuContainer() {
	/*普通弹幕层*/
	danmucontainer = COL.Graph.New();
	danmucontainer.name = 'danmucontainer';
	danmucontainer.needsort = false;
	COL.document.addChild(danmucontainer);
	danmucontainer.zindex(200);
	drawlist = danmucontainer.drawlist;
	/*字幕弹幕层*/
	zimucontainer = COL.Graph.New();
	zimucontainer.name = 'zimucontainer';
	COL.document.addChild(zimucontainer);
	zimucontainer.zindex(2);
}

function fitdanmulayer() {
	width = COL.document.width = player.danmulayer.width = window.innerWidth;
	tunnelheight = COL.document.height = player.danmulayer.height = window.innerHeight;
	for (var i in danmucontainer.childNode) {
		if (danmucontainer.childNode[i].type == 2) {
			danmucontainer.childNode[i].set({
				x: width / 2,
				y: tunnelheight - danmucontainer.childNode[i].tunnelobj[2]
			});
		} else if (danmucontainer.childNode[i].type == 3) {
			danmucontainer.childNode[i].set({
				x: width / 2,
				y: danmucontainer.childNode[i].tunnelobj[2]
			});
		}
		danmucontainer.childNode[i].setMatrix();
	}
	COL.draw();
}
function fireinterval() {
	if (timeline[timepoint]) {
		danmufuns.fire(timepoint);
	}
	timepoint += 10;
	if (!player.assvar.isPlaying) {
		clearInterval(intervals.timer);
	}
}
function newTimePiece(t) {
	if (intervals.timer) {
		clearInterval(intervals.timer);
		intervals.timer = 0;
	}
	if (t >= timepoint) {
		for (; timepoint <= t; timepoint += 10) {
			if (timeline[timepoint])
			danmufuns.fire(timepoint);
		}
	} else {
		return;
	}
	intervals.timer = setInterval(fireinterval, 10 / player.video.playbackRate);
}
function getVideoMillionSec() {
	return ((player.video.currentTime * 100 + 0.5) | 0) * 10;
}
danmufuns = {
	createCommonDanmu: function(danmuobj) {
		if (!danmucontainer.display) return;
		if (!danmuobj.textobj) {
						danmufuns.inittextobj(danmuobj);
						danmufuns.varydanmu(danmuobj);
					}
		var TextDanmu = danmuobj.textobj;
		if(!TextDanmu.imgobj){
			TextDanmu.prepareText();
		}
		//console.log(danmuobj) ;
		TextDanmu.tunnelobj = danmufuns.getTunnel(danmuobj.ty, TextDanmu.lineHeight,TextDanmu.height);
		//danmuobj.textobj.tunnelobj= danmufuns.getTunnel(danmuobj.ty,danmuobj.textobj);
		switch (danmuobj.ty) {
		case 0:
			{
				TextDanmu.set({
					x:width,
					y: TextDanmu.tunnelobj[2]
				});
				break;
			}
		case 1:
			{
				TextDanmu.set({
					x:-TextDanmu.width,
					y: TextDanmu.tunnelobj[2]
				});
				break;
			}
		case 2:
			{
				TextDanmu.setPositionPoint(TextDanmu.width / 2, TextDanmu.height);
				TextDanmu.set({
					x: width / 2,
					y: tunnelheight - TextDanmu.tunnelobj[2]
				});
				break;
			}
		case 3:
			{
				TextDanmu.setPositionPoint(TextDanmu.width / 2, 0);
				TextDanmu.set({
					x: width / 2,
					y: TextDanmu.tunnelobj[2]
				});
				break;
			}
		default:
			{
				return;
			}
		}
		TextDanmu.danmuobj = danmuobj;
		TextDanmu.setMatrix();
		danmucontainer.addChild(TextDanmu);
	},
movedanmuAnimation: function() {
	//varyflag=1^varyflag;
	//frame change:取消前面的注释可以把帧数减半
	if (varyflag && drawlist.length != 0) {

		if (COL.Debug.stat) {
			COL.cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
			COL.cct.fillStyle = "rgba(0,255,0,0.2)";
			COL.cct.fillRect(0, cleartop, COL.canvas.width, clearbottom - cleartop);
		} else {
			COL.cct.clearRect(0, cleartop-5, COL.canvas.width, clearbottom - cleartop+5);
		}
		COL.draw();
		cleanremainder = true;
		setTimeout(danmufuns.mover, 0);
	} else if (drawlist.length === 0 && cleanremainder) {
		COL.cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
		cleanremainder = false;
	}
	moverAnimation = requestAnimationFrame(danmufuns.movedanmuAnimation);
},

	danmumoverAnimation: {
		start: function(time) {
			if (!moverAnimation) {
					danmufuns.movedanmuAnimation();
			}
		},
		stop: function() {
			if (moverAnimation) {
				cancelAnimationFrame(moverAnimation);
				moverAnimation = 0;
			}
		}
	},

	show: function() {
		danmucontainer.display = true;
	},
	hide: function() {
		danmucontainer.display = false;
	},
	getTunnel: function(type, size,height) {
		var tunnel;
		switch (type) {
		case 0:
			{
				tunnel = danmutunnel.right;
				break;
			}
		case 1:
			{
				tunnel = danmutunnel.left;
				break;
			}
		case 2:
			{
				tunnel = danmutunnel.bottom;
				break;
			}
		case 3:
			{
				tunnel = danmutunnel.top;
				break;
			}
		}
		var tun = 0,
		ind  = 1,
		i=1;
		if (!tunnel[tun]) tunnel[tun] = [];
		while (ind < (i + size)) {
			if (tunnel[tun][ind]) {
				i = ind + tunnel[tun][ind];
				ind = i;
				if (ind > (tunnelheight - size)) {
					tun++;
					i = ind = 1;
					if (!tunnel[tun]) tunnel[tun] = [];
				}
			} else if (ind == (i + size - 1)) {
				break;
			} else {
				ind++;
			};
		}
		tunnel[tun][i] = size;
		var tunnelobj=[type, tun, i,height];
		tunnelrecord.push(tunnelobj);
		return tunnelobj;
		//轨道类号,分页号，轨道号
	},

	setDanmuArray: function() {
		danmulist.forEach(function(e){
			if (!danmuarray[e.t]) danmuarray[e.t] = [];
			danmuarray[e.t].unshift(e);
		});
		danmulist = [];
	},
	addToDanmuArray: function(danmuobj) {
		if (!danmuarray[danmuobj.t]) danmuarray[danmuobj.t] = [];
		danmuarray[danmuobj.t].push(danmuobj);
	},
	clear: function() {
		danmucontainer.drawlist.forEach(function(e){
			e.parentNode.removeChild(e);
		});
		drawlist=danmucontainer.drawlist=[];
		danmutunnel = {
			right: [],
			left: [],
			bottom: [],
			top: []
		};
		tunnelrecord=[];
		COL.draw();
	},
	start: function() {
		newTimePiece(getVideoMillionSec());
	},
	pause: function() {
		//已废
	},
	initFirer: function() {
		danmufuns.setDanmuArray();
	},
	mover: function() {
		if (player.assvar.isPlaying) {
			var nowtime = (player.video.currentTime * 1000 + 0.5) | 0;
			var node, r = false;
			for (var i = danmucontainer.drawlist.length; i--;) {
				node = danmucontainer.drawlist[i];
				if (!node||!node.imgobj||!node.tunnelobj){
					//node.parentNode.removeChild(node);
					console.log(node);
					continue;
				} 
				switch (node.type) {
				case 0:
					{
						node.x = (width + node.width) * (1 - (nowtime - node.time) / moveTime / width * 520) - node.width;
						if (node.tunnelobj[1]!=null && node.x < width - node.width - 150) {
							delete danmutunnel.right[node.tunnelobj[1]][node.tunnelobj[2]];
							node.tunnelobj[1]=null;
						} else if (node.x < -node.width) {
							node.parentNode.removeChild(node);
							r=true;
							tunnelrecord.splice(tunnelrecord.indexOf(node.tunnelobj),1);
							delete node.tunnelobj;
							continue;
						}
						node.setMatrix();
						break;
					}
				case 1:
					{
						node.x = (width + node.width) * (nowtime - node.time) / moveTime / width * 520 - node.width;
						if (node.tunnelobj[1]!=null&& node.x > 150) {
							delete danmutunnel.left[node.tunnelobj[1]][node.tunnelobj[2]];
							node.tunnelobj[1]=null;
						} else if (node.x > width) {
							node.parentNode.removeChild(node);
							r=true;
							tunnelrecord.splice(tunnelrecord.indexOf(node.tunnelobj),1);
							delete node.tunnelobj;
							continue;
						}
						node.setMatrix();
						break;
					}
				case 2:
					{
						if (nowtime - node.time > moveTime) {
							node.parentNode.removeChild(node);
								delete danmutunnel.bottom[node.tunnelobj[1]][node.tunnelobj[2]];
								tunnelrecord.splice(tunnelrecord.indexOf(node.tunnelobj),1);
							delete node.tunnelobj;
								COL.cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
							r=true;
							continue;
						}
						break;
					}
				case 3:
					{
						if (nowtime - node.time > moveTime) {
							node.parentNode.removeChild(node);
							delete danmutunnel.top[node.tunnelobj[1]][node.tunnelobj[2]];
							tunnelrecord.splice(tunnelrecord.indexOf(node.tunnelobj),1);
							delete node.tunnelobj;
								COL.cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
							r=true;
							continue;
						}
						break;
					}
				default:
					continue;
				}
			}
			if(r){
				danmufuns.changeCleanRect();
			}
		}/*else{
			console.log(0);
		}*/
	},
changeCleanRect: function() {
	var p = true,
	tmpyt, tmpyb;
	tunnelrecord.forEach(function(t) {
		if (t[0] == 2) {
			tmpyt = tunnelheight - t[2] - t[3] - 10;
			tmpyb = tunnelheight - t[2] +10;
		} else {
			tmpyt = t[2] - 10;
			tmpyb = t[2] + t[3] + 10;
		}
		if (p) {
			cleartop = tmpyt;
			clearbottom = tmpyb;
			p = false;
		} else {
			if (cleartop > tmpyt) {
				cleartop = tmpyt;
			}
			if (clearbottom < tmpyb) {
				clearbottom = tmpyb;
			}
		}
		if (clearbottom - cleartop >= tunnelheight) return;
	});

},

	varyLink:function(ind){//渲染链
		if(ind>danmulist.length-1){
			console.log("弹幕渲染结束");
			return;
		}
		if(!danmulist[ind].textobj){
			danmufuns.inittextobj(danmulist[ind]);
			danmufuns.varydanmu(danmulist[ind]);
		}
		ind++;
		setTimeout(
			function(){
				danmufuns.varyLink(ind);
			},250);
	},
	initnewDanmuObj: function(danmuobj) {
		if (typeof danmuobj == 'object') {
			timeline[danmuobj.t] = true;
			danmufuns.addToDanmuArray(danmuobj);
			danmufuns.inittextobj(danmuobj);
			danmufuns.varydanmu(danmuobj);
		}
	},
	fire: function(t) {
		if (danmuarray[t]) {
			danmufuns.displaydanmuontime(t);
		}
	},
displaydanmuontime: function(t) {
	for (var i = danmuarray[t].length; i--;) {
		var tmpd = danmuarray[t][i];
		if (tmpd.ty <= 3 && tmpd.ty >= 0) {
			if (player.o.textdanmu == true) {
				danmufuns.displaydanmuontime_text(tmpd);
				setTimeout(function(){danmufuns.changeCleanRect();},0);
			}
		} else if (tmpd.ty == 5) {
			tmpd.fun();
		}
	}
},
displaydanmuontime_text:function(tmpd){
		danmufuns.createCommonDanmu(tmpd);
},
	inittextobj: function(obj, vary) {
		if (obj.hasfirstshowed === 0) {
			obj.hasfirstshowed = 1;
		} else if (obj.hasfirstshowed == 1) {
			obj.hasfirstshowed = null;
			return;
		}
		var color = isHexColor(obj.co) ? ('#' + obj.co) : '#fff';
		var bordercolor = (obj.co == '000000') ? '#fff': '#000';
		 obj.textobj = COL.Graph.NewTextObj(obj.c, obj.s, {
			color: color,
			textborderColor: bordercolor,
			textborderWidth: player.o.StorkeWidth,
			type: obj.ty,
			time: obj.t,
			fontWeight: 600,
			realtimeVary: player.o.RealtimeVary,
			shadowBlur: player.o.ShadowWidth,
			shadowColor: (obj.co == '000000') ? '#fff': '#000',
			autoVary: vary ? vary: false
		});
		if (obj.sended) {
			obj.textobj.backgroundColor = 'rgba(255,255,255,0.4)';
		}
	},

	varydanmu: function(obj) {
		obj.textobj.prepareText();
		//if(prevarydanmu)
		delete obj.cl;
		if(prevarydanmu){
			delete obj.textobj.text;
		}
	},
	addTimepoint: function(t) {
		timeline[t] = true;
	},
	setTimeline: function() {
		var tarr = [];
		for (var i = 0; i < danmulist.length; i++) {
			if (danmulist[i].t >= 0) {
				tarr[danmulist[i].t] = true;
			}
		}
		timeline = tarr;
		//console.log("重置时间轴");
	},
	zimurevoluter: function(zinuobj) {}
}

controlfuns.playing = function() {
	if (player.video.currentTime == player.video.duration) {
		player.video.currentTime = 0;
	}
	danmufuns.danmumoverAnimation.start();
}
controlfuns.pause = function() {
	danmufuns.pause();
	danmufuns.danmumoverAnimation.stop();
	player.assvar.isPaused = true;
}
controlfuns.play_pause = function() {
	if (player.video.paused) {
		player.video.play();
	} else {
		player.video.pause();
	}
}
controlfuns.ended = function() {
	danmutunnel = {
		right: [],
		left: [],
		bottom: [],
		top: []
	}
}

function initevents() {
	var video = player.video;

	aEL(window, 'resize',
	function() {
		fitdanmulayer();
	});

	aEL(player.danmulayer, 'contextmenu',
	function(e) {
		e.preventDefault();
	});

	aEL(video, 'pause',
	function() {
		player.assvar.isPlaying = false;
		controlfuns.pause();
	});
	aEL(video, 'ended',
	function() {
		controlfuns.ended();
	});
	aEL(video, 'loadedmetadata',
	function() {
		player.o.totaltime = video.duration;
		videoinfo.width = player.video.offsetWidth;
		videoinfo.height = player.video.offsetHeight;
		videoinfo.CrownHeight = videoinfo.width / videoinfo.height;
		player.video.style.height = player.video.style.width = "100%";
		fitdanmulayer();
	});
	aEL(video, 'playing',
	function() {
		player.assvar.isPlaying = true;
		controlfuns.playing();
	});
	aEL(video, 'seeked',
	function() {
		timepoint = getVideoMillionSec();
		danmufuns.clear();
		COL.cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
		COL.draw();
	});
	aEL(video, 'seeking',
	function() {
		player.assvar.isPlaying = false;
		timepoint = getVideoMillionSec();
	});
	aEL(video, 'timeupdate',
	function() {
		if (!player.video.paused) {
			player.assvar.isPlaying = true;
		}
		newTimePiece(getVideoMillionSec());
	});
	aEL(video, 'waiting',
	function() {
		player.assvar.isPlaying = false;
	});
	aEL(window, 'message',
	function(e) {
		if ((typeof e.data) == "number") {
			danmufuns.fire(e.data);
		} else if (e.data.type) {
			switch (e.data.type) {
			case "CTRL":
				{
					switch (e.data.msg.name) {
					case "videoaddress":
						{
							var videosrc =player.videoaddress= e.data.msg.src;
							//videosrc为一个包含某一源分段地址的数组
							//TODO:解决分段视频播放
							//console.log(videosrc);
							for (var i = 0; i < videosrc.length; i++) {
								if (typeof videosrc[i] == 'string') {
									var s = c_ele('source');
									videosrc[i] = _string_.removesidespace(videosrc[i]);
									s.src = videosrc[i];
									/*var mime = guessmime(videosrc[i]);
									if (mime) {
										if (mime.match(/audio/i)) {
											player.video.style.display = "none";
										}
										s.type = mime;
									}*/
									player.video.appendChild(s);
									CONSOLE('指定视频地址:' + videosrc[i]);
									break;
								}
							}
							break;
						}
					case "danmuarray":
						{
							danmulist = e.data.msg.array;
							danmufuns.setTimeline();
							if(prevarydanmu){
								danmufuns.varyLink(0);
							}
							danmufuns.initFirer();
							break;
						}
						break;
					}
					break;
				}
			}
		} else {
			console.log(e);
		}
	});
}
player.o = {
	StorkeWidth: 0.5,
	RealtimeVary: false,
	ShadowWidth: 0,
	textdanmu: true
};
player.cacheobj = {};
player.assvar.hasZimu = false;
setdom();
//COL.Debug.on();
initevents();
danmufuns.danmumoverAnimation.start();
danmufuns.danmumoverAnimation.stop();
EVENT("ready");