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
/*function getMin_Sec(time) {
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
}*/

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

var width, height;
var player = {},
intervals = {},
controlfuns = {};
var danmulist = [],
danmufuns = {},
danmuobjlist = [],
danmuarray = [],
danmutunnel = {
	right: [],
	left: [],
	bottom: [],
	top: []
},
moverInterval = 1000 / 60,
moveTime = 5000,
tunnelheight = 0,
timeline = [],
timepoint = 0,
danmucontainer,
drawlist;
var danmufirer, superdanmu;
var zimulist = [],
zimucontainer;
player.assvar = {};


var videoinfo = {
	width: null,
	height: null,
	CrownHeight: null
};
var COL, Glib, AnimationFrame, moverAnimation;
function setdom() {
	player.videoframe = d_select('#videoframe');
	player.danmuframe = d_select(player.videoframe, '#danmuframe');
	player.danmulayer = d_select(player.videoframe, '#danmulayer');
	/*player.divdanmulayer = d_select(player.videoframe, '#divdanmulayer');*/
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
	COL.simpleMouseCheckMode = true;
	COL.MatrixTransform.on();
}
function initTextDanmuContainer() {
	/*普通弹幕层*/
	danmucontainer = COL.Graph.New();
	danmucontainer.name = 'danmucontainer';
	danmucontainer.needsort = false;
	COL.document.addChild(danmucontainer);
	danmucontainer.zindex(200);
	drawlist=danmucontainer.drawlist;
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
}
function fireinterval(){
		if (timeline[timepoint]) {
			//danmufuns.fire(timepoint);
			postMessage(timepoint,"*");
		}
		timepoint += 10;
		if (player.video.paused) {
			clearInterval(intervals.timer);
		}
}
function newTimePiece(t,interval) {
	if (intervals.timer) {
		clearInterval(intervals.timer);
		intervals.timer = 0;
	}
	if (t >= timepoint) {
		for (var i = timepoint; i <= t; i += 10) {
			if (timeline[i]) /*danmufuns.fire(i);*/
			postMessage(i,"*");
		}
	} else {
		return;
	}
	timepoint = t + 10;
	intervals.timer = setInterval(fireinterval,
	10* player.video.playbackRate);
}
function getVideoMillionSec() {
	return ((player.video.currentTime * 100+0.5)|0) * 10;
}
danmufuns = {
	createCommonDanmu:function(danmuobj) {
		if(!danmucontainer.display)return;
			if (danmuobj.hasfirstshowed === 0) {
				danmuobj.hasfirstshowed = 1;
			} else if (danmuobj.hasfirstshowed == 1) {
				danmuobj.hasfirstshowed = null;
				return;
			}
			var color = isHexColor(danmuobj.co) ? ('#' + danmuobj.co) : '#fff';
			var bordercolor = (danmuobj.co == '000000') ? '#fff': '#000';
			var TextDanmu = COL.Graph.NewTextObj(danmuobj.c, danmuobj.s, {
				color: color,
				textborderColor: bordercolor,
				textborderWidth: player.o.StorkeWidth,
				type: danmuobj.ty,
				time: danmuobj.t,
				fontWeight: 600,
				realtimeVary: player.o.RealtimeVary,
				shadowBlur: player.o.ShadowWidth,
				shadowColor: (danmuobj.co == '000000') ? '#fff': '#000'
			});
			TextDanmu.tunnelobj = danmufuns.getTunnel(danmuobj.ty, TextDanmu.lineHeight);
			switch (danmuobj.ty) {
			case 0:
				{
					TextDanmu.set({
						x:
						width,
						y: TextDanmu.tunnelobj[2]
					});
					break;
				}
			case 1:
				{
					TextDanmu.set({
						x:
						-TextDanmu.width,
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
			if (danmuobj.sended) {
				var lineset = TextDanmu.lineHeight * TextDanmu.varylist.length - 10;
				TextDanmu.backgroundColor = 'rgba(255,255,255,0.4)';
			}
			TextDanmu.danmuobj = danmuobj;
			TextDanmu.setMatrix();
			danmucontainer.addChild(TextDanmu);
		},

	// danmulayerAnimation: {
	// 	start: function(time) {
	// 		if (!AnimationFrame) {
	// 			function danmurefresh() {
	// 				/*if(drawlist.length!=0)
	// 				COL.draw();*/
	// 				AnimationFrame = requestAnimationFrame(danmurefresh);
	// 			}
	// 			AnimationFrame = requestAnimationFrame(danmurefresh);
	// 		}
	// 	},
	// 	stop: function() {
	// 		if (AnimationFrame) {
	// 			cancelAnimationFrame(AnimationFrame);
	// 			AnimationFrame = 0;
	// 		}
	// 	}
	// },
	danmumoverAnimation: {
		start: function(time) {
			if (!moverAnimation) {
				function movedanmu() {
					danmufuns.mover();
					if(drawlist.length!=0)
					COL.draw();
					moverAnimation = requestAnimationFrame(movedanmu);
				}
				movedanmu();
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
	getTunnel: function(type, size) {
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
		ind = i = 1;
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
		return [type, tun, i];
		//轨道类号,分页号，轨道号
	},

	setDanmuArray: function() {
		//danmufirer.postMessage({danmulist:danmulist});
		for (var i = 0; i < danmulist.length; i++) {
			if (!danmuarray[danmulist[i].t]) danmuarray[danmulist[i].t] = [];
			danmuarray[danmulist[i].t].push(danmulist[i]);
		}
	},
	addToDanmuArray: function(danmuobj) {
		if (!danmuarray[danmuobj.t]) danmuarray[danmuobj.t] = [];
		danmuarray[danmuobj.t].push(danmuobj);
	},
	clear:function() {
			for (var i in danmucontainer.childNode) {
				COL.Graph.Delete(danmucontainer.childNode[i]);
			}
			danmutunnel = {
				right: [],
				left: [],
				bottom: [],
				top: []
			};
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
	mover:function() {
			if (player.assvar.isPlaying) {
				var nowtime = (player.video.currentTime * 1000+0.5)|0;
				for (var i = 0; i < danmucontainer.drawlist.length; i++) {
					var node = danmucontainer.drawlist[i];
					if (!node) continue;
					switch (node.type) {
					case 0:
						{
							var roadLength = width + node.width;
							node.x =roadLength * (1 - (nowtime - node.time) / moveTime / width * 520) - node.width;
							if (node.tunnelobj && node.x < width - node.width - 150) {
								danmutunnel.right[node.tunnelobj[1]][node.tunnelobj[2]] = null;
								node.tunnelobj = null;
							} else if (node.x < -node.width) {
								COL.Graph.Delete(node);
							}
							node.setMatrix();
							break;
						}
					case 1:
						{
							var roadLength = width + node.width;
							node.x =roadLength * (nowtime - node.time) / moveTime / width * 520 - node.width;
							if (node.tunnelobj && node.x > 150) {
								danmutunnel.left[node.tunnelobj[1]][node.tunnelobj[2]] = null;
								node.tunnelobj = null;
							} else if (node.x > width) {
								COL.Graph.Delete(node);
							}
							node.setMatrix();
							break;
						}
					case 2:
						{
							if (nowtime - node.time > moveTime) {
								COL.Graph.Delete(node);
								danmutunnel.bottom[node.tunnelobj[1]][node.tunnelobj[2]] = null;
								if(drawlist.length===0){
									COL.draw();
								}
							}
							break;
						}
					case 3:
						{
							if (nowtime - node.time > moveTime) {
								COL.Graph.Delete(node);
								danmutunnel.top[node.tunnelobj[1]][node.tunnelobj[2]] = null;
									if(drawlist.length===0){
									COL.draw();
								}
							}
							break;
						}
					}
				}
			}
		},
	initnewDanmuObj: function(danmuobj) {
		if (typeof danmuobj == 'object') {
			timeline[danmuobj.t] = true;
			danmufuns.addToDanmuArray(danmuobj);
		}
	},
	fire: function(t) {
		if (danmuarray[t]) {
			for (var i = 0; i < danmuarray[t].length; i++) {
				var tmpd = danmuarray[t][i];
				if (tmpd.ty <= 3 && tmpd.ty >= 0) {
					if (player.o.textdanmu == true) {
						danmufuns.createCommonDanmu(tmpd);
					}
				} else if (tmpd.ty == 5) {
					tmpd.fun();
				}
			}
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


/*controlfuns.play = function() {
	//player.playbutton.style.display = 'none';
}*/
controlfuns.playing = function() {
	if(player.video.currentTime==player.video.duration){
		player.video.currentTime=0;
	}
	danmufuns.danmumoverAnimation.start();
	//danmufuns.danmulayerAnimation.start();
}
controlfuns.pause = function() {
	danmufuns.pause();
	danmufuns.danmumoverAnimation.stop();
	//danmufuns.danmulayerAnimation.stop();
	player.assvar.isPaused = true;
}
controlfuns.play_pause = function() {
	if(player.video.paused){
		player.video.play();
	}else{
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
		COL.draw();
	});
	aEL(video, 'seeking',
	function() {
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
		if((typeof e.data)=="number"){
			danmufuns.fire(e.data);
		}
		else if (e.data.type) {

			switch (e.data.type) {
			case "CTRL":
				{
					switch (e.data.msg.name) {
					case "videoaddress":
						{
							var videosrc = e.data.msg.src;
							console.log(videosrc);
							for (var i = 0; i < videosrc.length; i++) {
								if (typeof videosrc[i] == 'string') {
									var s = c_ele('source');
									videosrc[i] = _string_.removesidespace(videosrc[i]);
									s.src = videosrc[i];
									var mime = guessmime(videosrc[i]);
									if (mime) {
										if(mime.match(/audio/i)&&player.video.localName=="video"){
											player.video.style.display="none";
										}
										s.type = mime;
									}
									player.video.appendChild(s);
									CONSOLE('指定视频地址:' + videosrc[i]);
								}
							}
							break;
						}
					case "danmuarray":
						{
							danmulist = e.data.msg.array;
							danmufuns.setTimeline();
							danmufuns.initFirer();
							break;
						}
						break;
					}
					break;
				}
			case "MESSAGE":
				{
					console.log(e.data.msg.message);
					break;
				}
			case "CALLBACK":
				{
					switch(e.data.msg){
						case "":{

							break;
						}
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
	StorkeWidth:0.5,
	RealtimeVary:false,
	ShadowWidth:0,
	textdanmu:true
};
player.cacheobj = {};
player.assvar.hasZimu = false;
setdom();

initevents();
danmufuns.danmumoverAnimation.start();
danmufuns.danmumoverAnimation.stop();
EVENT("ready");
