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
/*function d_selectall(query) {
	if ((typeof arguments[0]) != 'string' && arguments[0] != null) {
		return arguments[0].querySelectorAll(arguments[1]);
	} else {
		return document.querySelectorAll(query);
	}
}*/
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
		var ext = _string_.removesidespace(url);
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
/*danmucount,*/
timepoint = 0,
danmucontainer,
divdanmucontainer = [];
var danmufirer, superdanmu;
var zimulist = [],
zimucontainer;
player.assvar = {};
var drawlist;
/*var danmuStyle = {
	fontsize: 30,
	color: null,
	type: 0
};*/
var videoinfo = {
	width: null,
	height: null,
	CrownHeight: null
};
var COL, Glib, moverAnimation,danmulayerAnimationFrame;
function setdom() {
	player.videoframe = d_select('#videoframe');
	player.danmuframe = d_select(player.videoframe, '#danmuframe');
	player.danmulayer = d_select(player.videoframe, '#danmulayer');
	//player.divdanmulayer = d_select(player.videoframe, '#divdanmulayer');
	player.video = d_select(player.videoframe, '#video');
	initCOL();
}
function initCOL() {
	window.COL = COL = newCOL();
	COL.font.color = '#ffffff';
	COL.font.fontFamily = "黑体";
	COL.setCanvas(player.danmulayer);
	COL.autoClear = true;
	Glib = getGraphlib(COL);
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
	COL.Graph.Eventable(danmucontainer);
	danmucontainer.zindex(200);
	/*字幕弹幕层*/
	zimucontainer = COL.Graph.New();
	zimucontainer.name = 'zimucontainer';
	COL.document.addChild(zimucontainer);
	zimucontainer.zindex(2);
}

/*function initcacheobj() {
	var a = player.cacheobj.divdanmu = c_ele('div');
	a.style.position = 'absolute';
	a.className = 'divtextdanmu';
	a.style.textAlign = 'left';
	a.style.fontWeight = 600;
}*/

function fitdanmulayer() {
	COL.adjustcanvas();
	width = player.danmulayer.width = window.innerWidth;
	tunnelheight =  player.danmulayer.height = window.innerHeight;
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

function newTimePiece(t, interval) {
	if (intervals.timer) {
		clearInterval(intervals.timer);
		intervals.timer = 0;
	}
	if (t >= timepoint) {
		for (; timepoint <= t; timepoint += 10) {
			if (timeline[timepoint]) danmufuns.fire(timepoint);
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
	/*createCommonDanmufun: {
		canvas: function(danmuobj) {
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
			COL.Graph.Eventable(TextDanmu);
			TextDanmu.addEvent('mousedown',
			function(e) {
				switch (e.button) {
				/*case 0:
					{
						if (player.video.paused) {
							danmufuns.start();
							player.video.play();
						} else {
							player.video.pause();
						}
						break;
					}
				case 2:
					{
						//danmufuns.showContextMenu(TextDanmu, danmuobj);
					}
				}
			});
			TextDanmu.setMatrix();
			danmucontainer.addChild(TextDanmu);
		},
		div: function(danmuobj) {
			if (danmuobj.hasfirstshowed === 0) {
				danmuobj.hasfirstshowed = 1;
			} else if (danmuobj.hasfirstshowed == 1) {
				danmuobj.hasfirstshowed = null;
				return;
			}
			var color = isHexColor(danmuobj.co) ? ('#' + danmuobj.co) : '#fff';
			var bordercolor = (danmuobj.co == '000000') ? '#fff': '#000';
			var TextDanmu = player.cacheobj.divdanmu.cloneNode();
			divdanmucontainer.push(TextDanmu);
			TextDanmu.innerHTML = danmuobj.c.replace(/\\n/g, '<br>');
			TextDanmu.style.color = color;
			TextDanmu.type = danmuobj.ty;
			TextDanmu.time = danmuobj.t;
			TextDanmu.style.fontSize = danmuobj.s - 5 + 'px';
			TextDanmu.style.textShadow = '-' + player.o.StorkeWidth + 'px 0 ' + bordercolor + ',0px ' + player.o.StorkeWidth + 'px ' + bordercolor + ',' + player.o.StorkeWidth + 'px 0 ' + bordercolor + ',0px -' + player.o.StorkeWidth + 'px ' + bordercolor + ',0 0 3px black';
			player.divdanmulayer.appendChild(TextDanmu);
			TextDanmu.offsetwidth = TextDanmu.offsetWidth;
			TextDanmu.tunnelobj = danmufuns.getTunnel(danmuobj.ty, TextDanmu.offsetHeight);
			switch (danmuobj.ty) {
			case 0:
				{
					TextDanmu.style.right = -TextDanmu.offsetwidth + 'px';
					TextDanmu.style.top = TextDanmu.tunnelobj[2] + 'px';
					break;
				}
			case 1:
				{
					TextDanmu.style.left = -TextDanmu.offsetwidth + 'px';
					TextDanmu.style.top = TextDanmu.tunnelobj[2] + 'px';
					break;
				}
			case 2:
				{
					addEleClass(TextDanmu, 'divbottomdanmu');
					TextDanmu.style.bottom = TextDanmu.tunnelobj[2] + 'px';
					TextDanmu.style.left = 'calc(50% - ' + TextDanmu.offsetwidth / 2 + 'px)';
					break;
				}
			case 3:
				{
					addEleClass(TextDanmu, 'divtopdanmu');
					TextDanmu.style.top = TextDanmu.tunnelobj[2] + 'px';
					TextDanmu.style.left = 'calc(50% - ' + TextDanmu.offsetwidth / 2 + 'px)';
					break;
				}
			default:
				{
					return;
				}
			}
			if (danmuobj.sended) {
				//TextDanmu.style.borderBottom = '1px solid #66ccff';
				TextDanmu.style.backgroundColor = 'rgba(255,255,255,0.4)';
			}
			TextDanmu.danmuobj = danmuobj;
		}
	},*/
	createCommonDanmu: function(danmuobj) {
			if (danmuobj.hasfirstshowed === 0) {
				danmuobj.hasfirstshowed = 1;
			} else if (danmuobj.hasfirstshowed == 1) {
				danmuobj.hasfirstshowed = null;
				return;
			}
			var color = isHexColor(danmuobj.co) ? ('#' + danmuobj.co) : '#fff';
			var bordercolor = (danmuobj.co == '000000') ? '#fff': '#000';
			setTimeout(function(){
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
			COL.Graph.Eventable(TextDanmu);
			TextDanmu.addEvent('mousedown',
			function(e) {
				switch (e.button) {
				/*case 0:
					{
						if (player.video.paused) {
							danmufuns.start();
							player.video.play();
						} else {
							player.video.pause();
						}
						break;
					}*/
				case 2:
					{
						//danmufuns.showContextMenu(TextDanmu, danmuobj);
					}
				}
			});
			TextDanmu.setMatrix();
			danmucontainer.addChild(TextDanmu);
			},0);
			
		},

	danmurefreshAnimationfun: function() {
		danmufuns.movedanmuAnimation();
		COL.draw();
		danmulayerAnimationFrame = requestAnimationFrame(danmufuns.danmurefreshAnimationfun);
	},
	danmulayerAnimation: {
		start: function() {
			if (!danmulayerAnimationFrame) {
				danmulayerAnimationFrame = requestAnimationFrame(danmufuns.danmurefreshAnimationfun);
				//player.danmuframe.style.display = 'block';
			}
		},
		stop: function() {
			if (danmulayerAnimationFrame) {
				danmucontainer.display = false;
				cancelAnimationFrame(danmulayerAnimationFrame);
				danmulayerAnimationFrame = 0;
				//player.danmuframe.style.display = 'none';
			}
		}
	},

	movedanmuAnimation: function() {
		if (danmucontainer.drawlist.length != 0) {
			//COL.draw();
			//cleanremainder = true;
			danmufuns.mover();
		} /*else if (danmucontainer.drawlist.length === 0 && cleanremainder) {
			COL.cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
			//cleanremainder = false;
		}*/
		/*moverAnimation = requestAnimationFrame(danmufuns.movedanmuAnimation);*/
	},
	/*danmumoverAnimation: {
		start: function(time) {
			if (!moverAnimation) {
				danmufuns.movedanmuAnimation();
				function movedanmu() {
					danmufuns.mover();
					if (player.o.divcommondanmu) {
						moverAnimation = setTimeout(movedanmu, 18);
					} else {
						moverAnimation = requestAnimationFrame(movedanmu, player.divdanmulayer, time);
					}
				}
				movedanmu();
			}
		},
		stop: function() {
			if (moverAnimation) {
				if (player.o.divcommondanmu) {
					clearTimeout(moverAnimation);
				} else {
					cancelAnimationFrame(moverAnimation);
				}

				moverAnimation = 0;
			}
		}
	},*/

	show: function() {
		this.showtextdanmu();
	},
	hide: function() {
		this.hidetextdanmu();
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
		ind = 1,
		i = 1;
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
		var tunnelobj = [type, tun, i, height];
		return tunnelobj;
		//轨道类号,分页号，轨道号
	},

	setDanmuArray: function() {
		//danmufirer.postMessage({danmulist:danmulist});
		for (var i = 0; i < danmulist.length; i++) {
			if (!danmuarray[danmulist[i].t]) danmuarray[danmulist[i].t] = [];
			danmuarray[danmulist[i].t].push(danmulist[i]);
		}
		danmulist=null;
	},
	addToDanmuArray: function(danmuobj) {
		if (!danmuarray[danmuobj.t]) danmuarray[danmuobj.t] = [];
		danmuarray[danmuobj.t].push(danmuobj);
	},
	/*clearfun: {
		div: function() {
			for (var i = divdanmucontainer.length; i--;) {
				player.divdanmulayer.removeChild(divdanmucontainer[i]);
				divdanmucontainer.splice(i, 1);
			}
			danmutunnel = {
				right: [],
				left: [],
				bottom: [],
				top: []
			};
		},
		canvas: function() {
			danmucontainer.drawlist.forEach(function(e) {
				e.parentNode.removeChild(e);
			});
			drawlist = danmucontainer.drawlist = [];
			danmutunnel = {
				right: [],
				left: [],
				bottom: [],
				top: []
			};
			COL.draw();
		}
	},*/
	clear: function() {
			danmucontainer.drawlist.forEach(function(e) {
				e.parentNode.removeChild(e);
			});
			drawlist = danmucontainer.drawlist = [];
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
		//clearInterval(interval.calibrationTime.i);
		//TODO:暂停所有弹幕
	},
	initFirer: function() {
		danmufuns.setDanmuArray();
	},
	mover: function() {
			if (player.assvar.isPlaying) {
				var nowtime = (player.video.currentTime * 1000 + 0.5) | 0;
			if(COL.lastmovedtime==nowtime)return;
			COL.lastmovedtime=nowtime;
				var temp;
				for (var i = 0; i < danmucontainer.drawlist.length; i++) {
					var node = danmucontainer.drawlist[i];
					if (!(node &&node.imageobj &&node.tunnelobj)) continue;
					switch (node.type) {
					case 0:
						{
							node.x = (width + node.width) * (1 - (nowtime - node.time) / moveTime / width * 520) - node.width;
							if (node.tunnelobj[1] != null && node.x < width - node.width - 150) {
								delete danmutunnel.right[node.tunnelobj[1]][node.tunnelobj[2]];
								node.tunnelobj[1] = null;
							} else if (node.x < -node.width) {
								node.parentNode.removeChild(node);
								delete node.tunnelobj;
								continue;
							}
							node.setMatrix();
							break;
						}
					case 1:
						{
							node.x = (width + node.width) * (nowtime - node.time) / moveTime / width * 520 - node.width;
							if (node.tunnelobj[1] != null && node.x > 150) {
								delete danmutunnel.left[node.tunnelobj[1]][node.tunnelobj[2]];
								node.tunnelobj[1] = null;
							} else if (node.x > width) {
								node.parentNode.removeChild(node);
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
								delete node.tunnelobj;
								COL.cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
								continue;
							}
							break;
						}
					case 3:
						{
							if (nowtime - node.time > moveTime) {
								node.parentNode.removeChild(node);
								delete danmutunnel.top[node.tunnelobj[1]][node.tunnelobj[2]];
								delete node.tunnelobj;
								COL.cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
								continue;
							}
							break;
						}
					default:
						continue;
					}
				}
			}
		
	},
	initnewDanmuObj: function(danmuobj) {
		if (typeof danmuobj == 'object') {
			//danmucount++;
			timeline[danmuobj.t] = true;
			//createDanmuDiv(danmuobj);
			danmufuns.addToDanmuArray(danmuobj);
		}
	},
	fire: function(t) {
		if (danmuarray[t]) {
			for (var i = 0; i < danmuarray[t].length; i++) {
				var tmpd = danmuarray[t][i];
				if (tmpd.ty <= 3 && tmpd.ty >= 0) {
					if (player.o.textdanmu == true && !document.hidden) {
						danmufuns.createCommonDanmu(tmpd);
					}
				} else if (tmpd.ty == 4) {} else if (tmpd.ty == 5) {
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
		//controlfuns.refreshDanmuMark();
		//console.log("重置时间轴");
	},
	zimurevoluter: function(zinuobj) {}
}

controlfuns.play = function() {
	//player.playbutton.style.display = 'none';
}
controlfuns.playing = function() {
	//controlfuns.play();
	//controlfuns.refreshprogresscanvas();
	danmufuns.start();
}
controlfuns.pause = function() {
	danmufuns.pause();
	player.assvar.isPaused = true;
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

controlfuns.zimueditMode = {
	on: function() {},
	off: function() {}
}
controlfuns.codeDanmueditMode = {
	on: function() {},
	off: function() {}
}

function initevents() {
	var video = player.video;
	COL.document.addEvent('click',
	function(e) {
		if (e.target == COL.document) {
			if (video.paused) {
				danmufuns.start();
				video.play();
			} else {
				video.pause();
			}
		}
	});
	danmucontainer.addEvent("mousedown",
	function(e) {
		if (COL.mouseright) {
			e.stopPropagation();
		}
		if(COL.mouseleft){
			if (player.video.paused) {
							//danmufuns.start();
							player.video.play();
						} else {
							player.video.pause();
						}
		}
	});

	aEL(window, 'resize',
	function() {
		fitdanmulayer();
	});
	aEL(window,"mouseleave",function(){
		if(!player.assvar.playing){
			danmufuns.danmulayerAnimation.stop();
		}
	});
	aEL(window,"mouseover",function(){
		danmufuns.danmulayerAnimation.start();
	});
	/*aEL(player.divdanmulayer, 'contextmenu',
	function(e) {
		e.preventDefault();
	});*/
	/*aEL(player.divdanmulayer, 'mousedown',
	function(e) {
		switch (e.button) {
		case 0:
			{
				if (player.video.paused) {
					danmufuns.start();
					player.video.play();
				} else {
					player.video.pause();
				}
				break;
			}
		case 2:
			{
				//danmufuns.showContextMenu(e.target, null, e);
			}
		}
	});*/

	aEL(player.danmulayer, 'contextmenu',
	function(e) {
		e.preventDefault();
	});

	aEL(player.video, 'click',
	function(e) {
		e.preventDefault();
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	});

	aEL(video, 'play',
	function() {
		//EVENT("play");
		//console.log("事件:播放");
		//controlfuns.refreshprogresscanvas();
		//controlfuns.play();
	});
	aEL(video, 'pause',
	function() {
		//console.log("事件:暂停");
		//newstat("暂停");
		//EVENT("pause");
		player.assvar.isPlaying = false;
		controlfuns.pause();
	});
	aEL(video, 'ended',
	function() {
		//EVENT("ended");
		//console.log('事件:播放结束');
		controlfuns.ended();
	});
	aEL(video, 'loadedmetadata',
	function() {
		//console.log('事件:加载视频元信息');
		//EVENT("loadedmetadata");
		//player.o.totaltime = video.duration;
		//获取媒体总时间
		//controlfuns.refreshtime();
		//controlfuns.refreshDanmuMark();
		videoinfo.width = player.video.offsetWidth;
		videoinfo.height = player.video.offsetHeight;
		videoinfo.CrownHeight = videoinfo.width / videoinfo.height;
		player.video.style.height = player.video.style.width = "100%";
		fitdanmulayer();
		//player.videopreload.parentNode.removeChild(player.videopreload);
	});
	aEL(video, 'volumechange',
	function() {
		//console.log("事件:音量");
		//EVENT("volumechange");
		//controlfuns.volumechange();
	});
	//以下两个事件在火狐中持续触发
	/*aEL(video, "canplay",
		function() {
			//console.log("事件:可以播放媒体");
		});
		aEL(video, "canplaythrough",
		function() {
			//console.log("事件:媒体可流畅播放");

		});*/
	/*aEL(video, "durationchange",
		function() {
			console.log("事件:媒体长度改变");

		});*/
	aEL(video, 'loadstart',
	function() {
		//EVENT("loadstart");
		//console.log('事件:开始加载媒体');
		//controlfuns.refreshprogresscanvas();
	});
	/*aEL(video, "abort",
		function() {
			console.log("事件:媒体加载中断");
		});*/
	aEL(video, 'playing',
	function() {
		//EVENT("playing");
		player.assvar.isPlaying = true;
		controlfuns.playing();
	});
	aEL(video, 'progress',
	function() {
		//console.log("事件:媒体加载中");
		//EVENT("progress");
		//controlfuns.refreshprogresscanvas();
	});
	aEL(video, 'seeked',
	function() {
		//console.log("事件:已跳到新位置");
		timepoint = getVideoMillionSec();
		/*EVENT("seeked");*/
		//controlfuns.refreshprogresscanvas();
		danmufuns.clear();
	});
	aEL(video, 'seeking',
	function() {
		//console.log("事件:正在跳到新位置");
		timepoint = getVideoMillionSec();
	});
	/*aEL(video, "stalled",
		function() {
			console.log("事件:无法获取媒体");

		});*/
	//aEL(video,"suspend",function(){
	//console.log("事件:浏览器故意不加载媒体（ーー；）");
	//});
	aEL(video, 'timeupdate',
	function() {
		//console.log("事件:播放时间改变  "+video.currentTime);
		if (!player.video.paused) {
			player.assvar.isPlaying = true;
		}
		//EVENT("timeupdate");
		//controlfuns.refreshprogresscanvas();
		//controlfuns.refreshtime();
		newTimePiece(getVideoMillionSec());
	});
	aEL(video, 'waiting',
	function() {
		//console.log("事件:媒体缓冲中");
		//newstat('缓冲中..');
		//EVENT("waiting");
		player.assvar.isPlaying = false;
	});
	/*aEL(video, 'error',
	function(e) {
		//console.log('事件:错误');
		//EVENT("error");
		//console.dir(e)
	});*/
	aEL(window, 'message',
	function(e) {
		if (e.data.type) {
			switch (e.data.type) {
			case "CTRL":
				{
					switch (e.data.msg.name) {
					case "videoaddress":
						{
							var videosrc = e.data.msg.src;
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
									/*var s = c_ele('source');
									videosrc[i] = _string_.removesidespace(videosrc[i]);
									s.src = videosrc[i];
									var mime = guessmime(videosrc[i]);
									if (mime) {
										s.type = mime;
									}
									player.video.appendChild(s);
									CONSOLE('指定视频地址:' + videosrc[i]);*/
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
					switch (e.data.msg) {
					case "":
						{

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
	divcommondanmu: false,
	StorkeWidth: 0.5,
	RealtimeVary: false,
	ShadowWidth: 0,
	textdanmu: true
};
player.cacheobj = {};
player.assvar.hasZimu = false;
player.assvar.hasSuperDanmu = false;
//initcacheobj();
setdom();

initevents();
danmufuns.danmulayerAnimation.start();

EVENT("ready");
//COL.Debug.on();
/*字幕对象结构*/
/*{id:id,ty:5,c:"{主要结构}}",t:null,s:null,d:"2014-05-17"}

{start:10000,end:675470,content:"我了个喵",fontSize:50,rotate:30}
{time:12000,linear:true,x:100,y:200}
{time:15000,color:"#66ccff"}*/
/*字幕对象在时间轴中的结构
danmuarray[t][i]
.ty=5;
.fun=function
.obj=zimuobj*/
