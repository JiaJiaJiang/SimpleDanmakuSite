/*
CopyRight(Left) iTisso
member:LuoJia
*/
function newCOL() {
	var COL = {
		keys: [],
		/*主canvas*/
		/*The main canvas*/
		canvas: null,
		/*canvas的绘图上下文*/
		/*Canvas' context*/
		context: null,
		buffercanvas: null,
		buffercontext: null,
		font: {
			fontStyle: null,
			fontWeight: null,
			textInput: null,
			fontVariant: null,
			color: "#000",
			lineHeight: null,
			fontSize: "15px",
			fontFamily: "Arial"
		},
		currentcontext: null,
		cct: null,
		mouseleft: false,
		mouseright: false,
		mousecenter: false,
		mouseX: null,
		mouseY: null,
		focus: null,
		canvasonfocus: false,
		document: null,
		onoverElement: null,
		simpleMouseCheckMode: false,
		MatrixTransformMode: false,
		mousestatuechanged:true,
		tmpGraphID: 0,
		tmpEventID: 0,
		fps: {
			c: 0,
			v: 0,
			i: null
		},
		e: {
			mouseoutcanvas: function() {
				COL.mouseX = null;
				COL.mouseY = null;
				if (COL.onoverElement) {
					var eve = COL.event();
					COL.onoverElement.fireEvent("mouseout", eve);
				}
				COL.onoverElement = null;
			}
		},
		tosign: {
			click: false,
			centerclick: false,
			rightcilck: false,
			onmoveele: null,
			draging: false
		},
		event: function() {
			return {
				stopPropagation: function() {
					this.Propagation = false;
				},
				Propagation: true
			}
		},

		/*在当前基础上新建一个对象*/
		/*Create a new gui obj based on the current obj*/
		New: function() {
			return Object.create(this);
		}
	};
	COL.generateGraphID = function() {
		return (++COL.tmpGraphID);
	};
	COL.imageSmoothing = {
		on: function() {
			if (COL.buffercontext) COL.buffercontext.imageSmoothingEnabled = true;
			COL.context.imageSmoothingEnabled = true;
		},
		off: function() {
			if (COL.buffercontext) COL.buffercontext.imageSmoothingEnabled = false;
			COL.context.imageSmoothingEnabled = false;
		}
	};
	COL.setrelPosition = function() {
		switch (COL.tools.getBrowser()) {
		case "msie":
		case "trident":
		case "opera":
			{
				COL.mousePosition.fun = COL.mousePosition.ie;
				break;
			}
		case "firefox":
			{
				COL.mousePosition.fun = COL.mousePosition.firefox;
				break;
			}
		default:
			{
				COL.mousePosition.fun = COL.mousePosition.chrome;
				break;
			}
		}

	};

	/*创建图形用的画布*/
	/*A canvas to create picture*/
	COL.imagecreater = {
		creatercanvas: null,
		creatercontext: null,
		init: function() {
			COL.imagecreater.creatercanvas = document.createElement("canvas");
			COL.imagecreater.creatercontext = COL.imagecreater.creatercanvas.getContext("2d");
		},
		drawpic: function(_width, _height, _draw) {
			if (!COL.imagecreater.creatercontext) COL.imagecreater.init();
			var ct = COL.imagecreater.creatercontext,
			cv = COL.imagecreater.creatercanvas;
			COL.imagecreater.creatercanvas.width = _width;
			COL.imagecreater.creatercanvas.height = _height;
			_draw(ct);
			var c = document.createElement("canvas");
			c.width = _width;
			c.height = _height;
			c.getContext("2d").drawImage(cv, 0, 0);
			return c;
		}
	};

	/*设置主画布*/
	/*set main canvas*/
	COL.setCanvas = function(canvas_dom) {
		COL.canvas = canvas_dom;
		COL.setrelPosition();
		canvas_dom.width = canvas_dom.offsetWidth;
		canvas_dom.height = canvas_dom.offsetHeight;
		/*Solve events*/
		var aEL = COL.tools.addEventListener;
		aEL(canvas_dom, "mouseover",
		function(e) {
			COL.canvasonfocus = true;
			COL.mousestatuechanged=true;
		});
		aEL(canvas_dom, "mousemove",
		function(e) {
			//e.preventDefault();
			var eve = COL.event();
			eve.target = COL.onoverElement;
			COL.mousestatuechanged=true;
			COL.mousePosition.fun(e);
			if (COL.onoverElement) {
				COL.onoverElement.fireEvent("mousemove", eve);
			}
		});
		aEL(canvas_dom, "mousedown",
		function(e) {
			COL.canvasonfocus = true;
			COL.mousestatuechanged=true;
			//e.preventDefault();
			var eve = COL.event();
			eve.target = COL.onoverElement;
			eve.button = e.button;
			COL.tosign.click = true;
			switch (eve.button) {
			case 0:
				COL.tosign.click = COL.mouseleft = true;
				break;
			case 1:
				COL.tosign.centerclick = COL.mousecenter = true;
				break;
			case 2:
				COL.tosign.rightclick = COL.mouseright = true;
				break;
			}
			if (COL.onoverElement) {
				COL.onoverElement.fireEvent("mousedown", eve);
				if (COL.onoverElement.eventable) {
					COL.focus = COL.onoverElement;
				}

			}
		});
		aEL(canvas_dom, "mouseup",
		function(e) {
			COL.mousestatuechanged=true;
			var eve = COL.event();
			eve.target = COL.onoverElement;
			eve.button = e.button;
			switch (eve.button) {
			case 0:
				COL.mouseleft = false;
				if (COL.tosign.click && eve.target) {
					eve.target.fireEvent("click", eve);
				}
				break;
			case 1:
				COL.mousecenter = false;
				if (COL.tosign.centerclick && eve.target) {
					eve.target.fireEvent("centerclick", eve);
				}
				break;
			case 2:
				COL.mouseright = false;
				if (COL.tosign.rightclick && eve.target) {
					eve.target.fireEvent("rightclick", eve);
				}
				break;
			}
			if (COL.onoverElement) {
				COL.onoverElement.fireEvent("mouseup", eve);
			}
		});
		aEL(canvas_dom, "mouseout",
		function() {
			COL.mousestatuechanged=true;
			COL.e.mouseoutcanvas();
		});
		aEL(document, "mousedown",
		function(e) {
			if (e.target != COL.canvas) {
				COL.canvasonfocus = false;
			}
		});

		/*aEL(canvas_dom, "contextmenu",
		function(e) {
			e.preventDefault();
		});*/
		aEL(canvas_dom, "selectstart",
		function(e) {
			e.preventDefault();
		});
		aEL(window, "mouseout",
		function() {
			COL.e.mouseoutcanvas();
		});

		aEL(canvas_dom, "resize",
		function() {
			COL.document.width = canvas_dom.width = COL.width = canvas_dom.offsetWidth;
			COL.document.height = canvas_dom.height = COL.height = canvas_dom.offsetHeight;
			if (COL.buffercanvas) {
				COL.buffercanvas.width = canvas_dom.offsetWidth;
				COL.buffercanvas.height = canvas_dom.offsetHeight;
			}
		});

		var _mousewheele = (COL.tools.getBrowser() == "firefox") ? "DOMMouseScroll": "mousewheel";
		aEL(canvas_dom, _mousewheele,
		function(e) {
			e = e || window.event;
			var eve = COL.event();
			eve.target = COL.onoverElement;
			var data = e.wheelDelta ? e.wheelDelta: e.detail;
			if (data == -3 || data == 120) {
				eve.wheel = 0;
			} else if (data == 3 || data == -120) {
				eve.wheel = 1;
			}
			if (COL.onoverElement) {
				COL.onoverElement.fireEvent("mousewheel", eve);
			}

		});
		aEL(window, "keydown",
		function(e) {
			if (COL.canvasonfocus) {

				if (!COL.keys[e.keyCode]) {
					//e.preventDefault();
					var eve = COL.event();
					eve.keyCode = e.keyCode;
					COL.keys[e.keyCode] = true;
					if (COL.focus) {
						COL.focus.fireEvent("keydown", eve);
					}
				}
			}
		});
		aEL(window, "keyup",
		function(e) {
			if (COL.canvasonfocus) {
				if (COL.keys[e.keyCode]) {
					var eve = COL.event();
					eve.keyCode = e.keyCode;
					COL.keys[e.keyCode] = false;
					if (COL.focus) {
						COL.focus.fireEvent("keyup", eve);
					}
				}
				// e.preventDefault();
			}
		});
		aEL(window, "keypress",
		function(e) {
			if (COL.canvasonfocus) {
				var eve = COL.event();
				eve.keyCode = e.keyCode;
				COL.keys[e.keyCode] = false;
				if (COL.focus) {
					COL.focus.fireEvent("keypress", eve);
				}
				// e.preventDefault();
			}
		});
		COL.context = canvas_dom.getContext("2d");
		COL.currentcontext = COL.buffercontext || COL.context;
		COL.cct = COL.currentcontext;
		COL.document = COL.Graph.New();
		COL.Graph.Eventable(COL.document);
		COL.document.drawtype = "image";
		COL.document.name = "document";
		COL.document.width = canvas_dom.width;
		COL.document.height = canvas_dom.height;
		COL.drawlist = [COL.document];
		COL.MatrixTransform.off();
	};

	COL.MatrixTransform = {
		on: function() {
			COL.MatrixTransformMode = true;
			COL.transform = COL.optionalFun.transformDirect;
		},
		off: function() {
			COL.MatrixTransformMode = false;
			COL.transform = COL.optionalFun.transformLinear;
		}
	}

	COL.setBuffCanvas = function(buf) {
		COL.buffercanvas = buf;
		COL.buffercontext = COL.buffercanvas.getContext("2d");
		COL.currentcontext = COL.buffercontext || COL.context;
	};

	COL.Graph = {
		New: function(opjson) {
			var cF = COL.Graph.commonFunction;
			var g = {
				name: null,
				GraphID: COL.generateGraphID(),
				y: 0,
				x: 0,
				width: 1,
				height: 1,
				positionpoint: {
					x: 0,
					y: 0
				},
				rotate: 0,
				rotatecenter: {
					x: 0,
					y: 0
				},
				zoom: {
					x: 1,
					y: 1
				},
				display: true,
				opacity: null,
				beforedrawfun: null,
				afterdrawfun: null,
				overflow: null,
				drawtype: "function",
				//function、image、text
				drawfunction: null,
				backgroundColor: null,
				eventable: false,
				imageobj: null,
				needsort: true,
				matrix: COL.MatrixTransformMode ? new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) : null,
				z_index: null,
				clipBy: "border",
				drawlist: [],
				childNode: [],
				parentNode: null,
				set: cF.set,
				drawpic: cF.drawpic,
				setZoom: cF.setZoom,
				useImage: cF.useImage,
				borderPathFun: cF.borderPathFun,
				zindex: cF.zindex,
				setRotateCenter: cF.setRotateCenter,
				setPositionPoint: cF.setPositionPoint,
				setSize: cF.setSize,
				New: cF.New,
				clone: cF.clone,
				addChild: cF.addChild,
				removeChild: cF.removeChild,
				fireEvent: cF.Event.fireEvent,
				setMatrix: cF.setMatrix
			};
			if (opjson) {
				for (var ob in opjson) {
					g[ob] = opjson[ob];
				}
			}
			return g;
		},
		NewImageObj: function(image) {
			var m = COL.Graph.New();
			if (image) {
				m.userImage(image);
			}
		},
		NewTextObj: function(text, fontsize, opjson) {
			var t = COL.Graph.New();
			t.drawtype = "text";
			t.autoVary = true;
			t.realtimeVary = false;
			t.text = text || " ";
			t.varylist = [];
			t.linedirection = 0; //"0:left-right;1:up-down"
			t.columndirection = 0; //"0:+ 1:-"
			t.baseline = "middle";
			t.fontStyle = null;
			t.fontWeight = null;
			t.textInput = null;
			t.fontVariant = null;
			t.lineHeight = t.fontSize = fontsize || 15;
			t.fontFamily = null;
			//t.overflow="hidden";
			t.innerX = 0;
			t.innerY = 0;
			t.color = "#000";
			t.autoSize = true;
			t.editable = false;
			t.textborderWidth = 0;
			t.textborderColor = "#fff";
			t.fill = true;
			t.shadowBlur = 0;
			t.shadowColor = "#CCC";
			t.shadowOffset = {
				x: 0,
				y: 0
			};
			t.maxWidth = 0;
			if (opjson) {
				for (var ob in opjson) {
					t[ob] = opjson[ob];
				}
			}
			t.vary = COL.Graph.commonFunction.t.vary;
			t.prepareText = COL.Graph.commonFunction.t.prepareText;
			t.setSize = COL.Graph.commonFunction.t.setSize;
			t.setText = COL.Graph.commonFunction.t.setText;
			if (t.autoVary) t.prepareText();
			return t;
		},
		Eventable: function(graph) {
			graph.eventable = true;
			graph.overPath = null;
			graph.events = {};
			graph.addEvent = COL.Graph.commonFunction.Event.addEvent;
			graph.removeEvent = COL.Graph.commonFunction.Event.removeEvent;
		},
		commonFunction: {
			set: function(json) {
				if (json) {
					for (var ob in json) {
						this[ob] = json[ob];
					}
				}
			},
			drawpic: function(width, height, _draw) {
				this.width = width;
				this.height = height;
				this.imageobj = COL.imagecreater.drawpic(width, height, _draw);
			},
			setZoom: function(x, y) {
				if (arguments.length == 1) this.zoom.x = this.zoom.y = x;
				else if (arguments.length == 2) {
					this.zoom.x = x;
					this.zoom.y = y;
				}
			},
			useImage: function(image) {
				if (!this.imageobj) {
					this.imageobj = document.createElement("canvas");
				}
				var _this = this;
				function set() {
					_this.width = _this.imageobj.width = image.width;
					_this.height = _this.imageobj.height = image.height;
					_this.imageobj.getContext("2d").drawImage(image, 0, 0);
				}
				if (!image.complete) {
					image.onload = function() {
						set();
					};
				}
				try {
					set();
				} catch(e) {
					console.log(e);
				}

			},
			borderPathFun: function(ct) {
				ct.rect(0, 0, this.width, this.height);
			},
			zindex: function(index) {
				this.z_index = index;
				if (this.parentNode) {
					COL.tools.arraybyZ_index(this.parentNode);
				}
			},
			setRotateCenter: function() {
				if (arguments.length == 2) {
					this.rotatecenter.x = arguments[0];
					this.rotatecenter.y = arguments[1];
				} else if (arguments.length == 1) {
					switch (arguments[0]) {
					case "center":
						{
							this.rotatecenter.x = this.width / 2;
							this.rotatecenter.y = this.height / 2;
							break;
						}
					}
				}
			},
			setPositionPoint: function() {
				if (arguments.length == 2) {
					this.positionpoint.x = arguments[0];
					this.positionpoint.y = arguments[1];
				} else if (arguments.length == 1) {
					switch (arguments[0]) {
					case "center":
						{
							this.positionpoint.x = this.width / 2;
							this.positionpoint.y = this.height / 2;
							break;
						}
					}
				}
			},
			setSize: function(w, h) {
				this.width = w;
				this.height = h;

			},
			New: function() {
				var newobj = Object.create(this);
				newobj.parentNode = null;
				newobj.childNode = [];
				newobj.drawlist = [];
				newobj.GraphID=COL.generateGraphID();
				return newobj;
			},
			clone: function() {
				var newobj = Object.create(this);
				return newobj;
			},
			addChild: function(graph) {
				if (graph.GraphID) {
					//console.log(graph.GraphID)
					//this.childNode.push(graph);
					this.childNode[graph.GraphID] = graph;
					//this.childNode.pop(graph);
					graph.parentNode = this;
					if (this.needsort) {
						COL.tools.arraybyZ_index(this);
					} else {
						this.drawlist.unshift(graph);
					}
				}
			},
			removeChild: function(graph) {
				if (this.childNode[graph.GraphID]) {
				graph.parentNode = null;
				this.childNode[graph.GraphID] = null;
				delete this.childNode[graph.GraphID];
				var ind=this.drawlist.lastIndexOf(graph);
				if(ind>=0){
					this.drawlist.splice(ind, 1);
				}
			}
			},
			setMatrix: function(floatarrayMatrix) {
				if (!floatarrayMatrix) {
					var rotate = this.rotate * 0.0174532925,
					cos = Math.cos(rotate),
					sin = Math.sin(rotate);
					if (!this.matrix) this.matrix = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
					this.matrix.set(COL.tools.multiplyMatrix([this.zoom.x, 0, 0, 0, this.zoom.y, 0, 0, 0, 0], [cos, -sin, 0, sin, cos, 0, 0, 0, 0], [1, 0, this.x + this.rotatecenter.x - this.positionpoint.x, 0, 1, this.y + this.rotatecenter.y - this.positionpoint.y, 0, 0, 0]));
				} else {
					this.matrix = floatarrayMatrix;
				}
			},
			isPointInPath:function(ct,cObj){
				if (cObj.overPath) {
								cObj.overPath(ct);
							} else if (cObj.drawfunction) {
								cObj.drawfunction(ct);
							} else {
								COL.tools.defaultPathFun(ct, cObj);
							}
							if (ct.isPointInPath(COL.mouseX, COL.mouseY)) {
								COL.newonoverElement = cObj;
							}
			},
			drawDebugstat:function(cct){
				cct.save();
			cct.setTransform(1, 0, 0, 1, 0, 0);
			cct.font = "16px Arial";
			cct.textBaseline = "bottom";
			cct.globalCompositeOperation = "lighter";
			cct.fillStyle = "red";
			cct.fillText("mouseX:" + COL.mouseX + " Y:" + COL.mouseY + " mouseL:" + COL.mouseleft + " C:" + COL.mousecenter + " R:" + COL.mouseright + " FPS:" + COL.fps.v + " Items:" + COL.Debug.itemcount, 0, COL.canvas.height);
			cct.fillText("onmouseoverGraphID:" + (COL.onoverElement ? COL.onoverElement.GraphID: "null") + " onfocusGraphID:" + (COL.focus ? COL.focus.GraphID: "null"), 0, COL.canvas.height - 20);
			cct.strokeStyle = "red";
			cct.globalCompositeOperation = "source-over";
			cct.moveTo(COL.mouseX, COL.mouseY + 6);
			cct.lineTo(COL.mouseX, COL.mouseY - 6);
			cct.moveTo(COL.mouseX - 6, COL.mouseY);
			cct.lineTo(COL.mouseX + 6, COL.mouseY);
			cct.stroke();
			cct.restore();
			COL.fps.c++;
			},
			t: {
				vary: function(ct) {
					if(this.baseline)ct.textBaseline = this.baseline;
					if(this.textborderWidth)ct.lineWidth = this.textborderWidth;
					if(this.textborderColor)ct.strokeStyle = this.textborderColor;
					ct.fillStyle = this.color || COL.font.color || "#000";
					if (this.shadowBlur > 0) {
						ct.font = this.font;
						ct.shadowBlur = this.shadowBlur;
						if(this.shadowColor)ct.shadowColor = this.shadowColor;
						if(this.shadowOffset.x)ct.shadowOffsetX = this.shadowOffset.x;
						if(this.shadowOffset.y)ct.shadowOffsetY = this.shadowOffset.y;
					}
					ct.font = this.font;
					if (this.linedirection === 0) {
						ct.translate(0, this.lineHeight / 2);
						if (this.columndirection === 0) {
							for (var i = 0; i < this.varylist.length; i++) {
								ct.save();
								if (this.fill) {
									ct.fillText(this.varylist[i], this.innerX, this.innerY);
								}
								if (this.textborderWidth) {
									ct.shadowBlur = 0;
									ct.strokeText(this.varylist[i], this.innerX, this.innerY);
								}
								ct.restore();
								ct.translate(0, this.lineHeight);
							}
						} else if (this.columndirection == 1) {
							for (var i = this.varylist.length - 1; i > 0; i--) {
								ct.save();
								if (this.fill) {
									ct.fillText(this.varylist[i], this.innerX, this.innerY);
								}
								if (this.textborderWidth) {
									ct.shadowBlur = 0;
									ct.strokeText(this.varylist[i], this.innerX, this.innerY);
								}
								ct.restore();
								ct.translate(0, this.lineHeight);
							}
						}
					} else if (this.linedirection == 1) {
						if (this.columndirection === 0) {
							for (var i = 0; i < this.varylist.length; i++) {
								ct.save();
								ct.translate(i * this.lineHeight, this.fontSize / 2);
								var thisline = this.varylist[i].split("");
								for (var im = 0; im < thisline.length; im++) {
									ct.save();
									ct.translate(this.lineHeight - ct.measureText(thisline[im]).width, 0);
									if (this.fill) {
										ct.fillText(thisline[im], this.innerX, this.innerY);
									}
									if (this.textborderWidth) {
										ct.shadowBlur = 0;
										ct.strokeText(thisline[im], this.innerX, this.innerY);
									}
									ct.restore();
									ct.translate(0, this.fontSize);
								}
								ct.restore();
							}
						} else if (this.columndirection == 1) {
							for (var i = this.varylist.length - 1; i > 0; i--) {
								ct.save();
								ct.translate((this.varylist.length - 1 - i) * this.lineHeight, this.fontSize / 2);
								var thisline = this.varylist[i].split("");
								for (var im = 0; im < thisline.length; im++) {
									ct.save();
									ct.translate(this.lineHeight - ct.measureText(thisline[im]).width, 0);
									if (this.fill) {
										ct.fillText(thisline[im], this.innerX, this.innerY);
									}
									if (this.textborderWidth) {
										ct.shadowBlur = 0;
										ct.strokeText(thisline[im], this.innerX, this.innerY);
									}
									ct.restore();
									ct.translate(0, this.fontSize);
								}
								ct.restore();
							}
						}
					}
				},
				prepareText: function() {
					if ((!this.imageobj) || (!this.imageobj.getContext)) {
						this.imageobj = document.createElement("canvas");
					}
					var imgobj = this.imageobj;
					var ct = imgobj.getContext("2d");
					ct.clearRect(0, 0, imgobj.width, imgobj.height);
					this.varylist = this.text.split(/\n/g);
					var font = "";
					if (this.fontStyle || COL.font.fontStyle) font += this.fontStyle || COL.font.fontStyle;
					if (this.fontVariant || COL.font.fontVariant) font += (" " + (this.fontVariant || COL.font.fontVariant));
					if (this.fontWeight || COL.font.fontWeight) font += (" " + (this.fontWeight || COL.font.fontWeight));
					font += (" " + (this.fontSize || COL.font.fontSize) || 15) + "px";
					if (this.fontFamily || COL.font.fontFamily) font += (" " + (this.fontFamily || COL.font.fontFamily));
					else {
						font += (" " + COL.fontFamily);
					}
					this.font = font;
					ct.font = font;
					this.plusoffsetX = this.shadowBlur + (this.shadowOffset.x < 0 ? -this.shadowOffset.x: 0);
					this.plusoffsetY = this.shadowBlur + (this.shadowOffset.y < 0 ? -this.shadowOffset.y: 0);
					var addedwidth = this.shadowBlur * 2 + Math.abs(this.shadowOffset.x),
					addedheight = this.shadowBlur * 2 + Math.abs(this.shadowOffset.y);
					if (this.autoSize) {
						var w = 0,
						tw;
						if (this.linedirection === 0) {
							for (var i = 0; i < this.varylist.length; i++) {
								tw = ct.measureText(this.varylist[i]).width;
								w = tw > w ? tw: w;
							}
							imgobj.width = (this.width = (this.maxWidth >= w) ? this.maxWidth: w) + addedwidth;
							imgobj.height = (this.height = this.varylist.length *  (this.lineHeight > this.fontSize ? this.lineHeight: this.fontSize)) + addedheight;
						} else if (this.linedirection == 1) {
							for (var i = 0; i < this.varylist.length; i++) {
								tw = this.varylist[i].split("").length;
								w = tw > w ? tw: w;
							}
							w *= this.fontSize;
							 imgobj.width =(this.width = this.varylist.length *  (this.lineHeight > this.fontSize ? this.lineHeight: this.fontSize))+addedwidth;
							 imgobj.height =(this.height = (this.maxWidth >= w) ? this.maxWidth: w)+addedheight;
						}

					} else {
						imgobj.width = (this.width >= 0) ? this.width: 100;
						imgobj.height = (this.height >= 0) ? this.height: 30;
					}
					ct.transform(1, 0, 0, 1, this.plusoffsetX, this.plusoffsetY);
					this.vary(ct);
				},
				setSize: function(width, height) {
					this.autoSize = false;
					this.width = width;
					this.height = height;
					this.prepareText();
				},
				setText: function(text) {
					this.text = text || " ";
					this.prepareText();
				}
			},
			Event: {
				addEvent: function(name, fun) {
					if (typeof name == "string") name = name.replace(/^on/, "");
					if (!this.events[name]) this.events[name] = [];
					if (typeof(fun) == "function" && this.events[name]) {
						this.events[name].push(fun);
						var eid = (++COL.tmpEventID);
						this.events[name][this.events[name].length - 1].EventID = eid;
						var ev = {
							ename: name,
							EventID: eid
						};
						return ev;
					} else {
						return false;
					}
				},
				removeEvent: function(ev) {
					if (typeof ev.ename == "string") ev.ename.replace(/^on/, "");
					if (this.events && this.events[ev.ename]) {
						var earr = this.events[ev.ename];
						var middleindex, starti = 0,
						endi = earr.length - 1,
						evid = ev.EventID;
						while (endi - starti) { //当前后定位不重合
							middleindex = Math.floor((starti + endi) / 2);
							if (earr[middleindex].EventID == evid) {
								earr.splice(middleindex, 1);
								break;
							} else if (earr[middleindex + 1].EventID > evid) {
								endi = middleindex;
							} else {
								starti = middleindex + 1;
							}
						}
					}

				},
				fireEvent: function(evename, eobj) {
					var events = this.events;
					if (events && events[evename]) {
						for (var i = events[evename].length; i--;) {
							if (typeof(events[evename][i]) == "function") {
								events[evename][i](eobj);
							}
						}
					}
					if (eobj.Propagation) {
						if (this.parentNode) {
							this.parentNode.fireEvent(evename, eobj);
						}
					}
				}
			}
		},
		Delete: function(graph) {
			if (graph) {
				if (graph.parentNode) {
					graph.parentNode.removeChild(graph);
				}
				delete graph;
				return true;
			}
			return false;
		}
	};

	COL.drawElement = function(d, ct) {
		for (var i = 0; i < d.length; i++) {
			if (d[i].display) {
				cObj = d[i];
				ct.save();
				COL.transform(ct, cObj);
				if(COL.Debug.stat){
					ct.moveTo(0,3);
					ct.lineTo(0,-3);
					ct.moveTo(3,0);
					ct.lineTo(-3,0);
					ct.stroke();
				}
				if (cObj.opacity !== null) ct.globalAlpha = cObj.opacity;
				if (cObj.overflow == "hidden") {
					ct.beginPath();
					switch (cObj.clipBy) {
					case "border":
						{
							cObj.borderPathFun ? cObj.borderPathFun(ct) : COL.tools.defaultPathFun(ct, cObj);
							break;
						}
					case "drawfunction":
						{
							cObj.drawfunction ? cObj.drawfunction(ct) : COL.tools.defaultPathFun(ct, cObj);
							break;
						}
					default:
						{
							COL.tools.defaultPathFun(ct, cObj);
						}
					}
					ct.clip();
				}
				ct.save();
				if (cObj.Composite) ct.globalCompositeOperation = cObj.Composite;
				if (cObj.beforedrawfun) cObj.beforedrawfun(ct);
				if (cObj.backgroundColor) {
					ct.fillStyle = cObj.backgroundColor;
					ct.fillRect( - cObj.rotatecenter.x, -cObj.rotatecenter.y, cObj.width, cObj.height);
				}
				switch (cObj.drawtype) {
				case "function":
					{
						ct.transform(1,0,0,1,- cObj.rotatecenter.x,-cObj.rotatecenter.y);
						if (cObj.drawfunction) cObj.drawfunction(ct);
						break;
					}
				case "image":
					{
						ct.transform(1,0,0,1,- cObj.rotatecenter.x,-cObj.rotatecenter.y);
						if (cObj.imageobj && cObj.imageobj.width && cObj.imageobj.height) {
							ct.drawImage(cObj.imageobj, 0, 0);
						}

						break;
					}
				case "text":
					{
						ct.transform(1,0,0,1,- cObj.rotatecenter.x,-cObj.rotatecenter.y);
						if (cObj.realtimeVary) {
							ct.save();
							cObj.vary(ct);
							ct.restore();
						} else {
							if (cObj.imageobj && cObj.imageobj.width && cObj.imageobj.height) {
								ct.save();
								ct.transform(1,0,0,1,- cObj.plusoffsetX, -cObj.plusoffsetY);
								ct.drawImage(cObj.imageobj, 0, 0);
								if(COL.Debug.stat){
									ct.strokeStyle="#ccc";
									ct.strokeRect(0, 0, cObj.imageobj.width, cObj.imageobj.height);
									ct.transform(1,0,0,1, cObj.plusoffsetX, cObj.plusoffsetY);
								}
								ct.restore();
							}

						}

						break;
					}
				}
				ct.save();
				if (cObj.eventable) {
					if (COL.simpleMouseCheckMode) {
						if (COL.mouseX&&COL.mouseY
							) {
							if(COL.mouseX+ cObj.positionpoint.x  <= cObj.x+ cObj.width &&
							 COL.mouseY +cObj.positionpoint.y <= cObj.y+ cObj.height&&
							  COL.mouseX+cObj.positionpoint.x>= cObj.x && 
							COL.mouseY+ cObj.positionpoint.y>= cObj.y 
							){
								if(COL.mousestatuechanged){
									COL.Graph.commonFunction.isPointInPath(ct,cObj);
								}
							}
						}
					}else if(COL.mousestatuechanged){
						COL.Graph.commonFunction.isPointInPath(ct,cObj);
						// COL.mousestatuechanged=false;
					}
					
				}
				if (COL.Debug.stat) {
					COL.Debug.itemcount++;
					ct.save();
					ct.beginPath();
					ct.strokeRect(0, 0, cObj.width, cObj.height);
					var zx = cObj.zoom.x,
					zy = cObj.zoom.y;
					if (cObj.parentNode) {
						zx *= cObj.parentNode.zoom.x;
						zy *= cObj.parentNode.zoom.y;
					}
					ct.scale(1 / zx, 1 / zy);
					ct.textBaseline = "top";
					ct.fillStyle = "rgba(0,0,0,1)";
					ct.font = "20px Arial";
					switch (cObj.drawtype) {
					case "function":
						{
							ct.fillText("Function", 0, 0);
							break;
						}

					case "image":
						{
							ct.fillText("Image", 0, 0);
							break;
						}
					case "text":
						{
							ct.fillText("Text", 0, 0);
							ct.font = "12px Arial";
							ct.fillText("font:" + cObj.font, 0, -12);
							break;
						}
					}
					if (COL.Debug.eleinfo) {
						ct.font = "10px Arial";
						ct.fillText("X:" + cObj.x + " " + "Y:" + cObj.y, 0, 21);
						ct.fillText("rotate:" + cObj.rotate, 0, 31);
						ct.fillText("zoom:" + cObj.zoom.x + "," + cObj.zoom.y, 0, 41);
						ct.fillText("RotatePotint:" + cObj.rotatecenter.x + " " + cObj.rotatecenter.y, 0, 51);
						ct.fillText("Size:" + cObj.width + "*" + cObj.height, 0, 61);
					}
					ct.restore();
				}
				ct.restore();
				if (cObj.afterdrawfun) cObj.afterdrawfun(ct);
				ct.restore();
				ct.transform(1,0,0,1,- cObj.rotatecenter.x, -cObj.rotatecenter.y);
				//ct.translate( - cObj.rotatecenter.x, -cObj.rotatecenter.y);
				if (cObj.childNode.length) {
					COL.drawElement(cObj.drawlist, ct);
				}
				ct.restore();
			}
		}

	};

	/*把队列中的图形按index绘制出来*/
	/*draw all graphs whose [display=true]*/
	// var cct;
	COL.draw = function() {
		COL.newonoverElement = null;
		var cct = COL.cct;
		COL.Debug.itemcount = 0;
		if (COL.autoClear) {
			cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
			if (COL.buffercontext) COL.buffercontext.clearRect(0, 0, COL.document.width, COL.document.height);
		}
		COL.drawElement(COL.drawlist, COL.currentcontext);
		if (COL.Debug.stat) {
			COL.Graph.commonFunction.drawDebugstat(cct);
		}
		COL.mousestatuechanged=false;
		if (COL.newonoverElement!=null&&COL.newonoverElement != COL.onoverElement) {
			if (COL.onoverElement) {
				var eve = COL.event();
				eve.target = COL.onoverElement;
				COL.onoverElement.fireEvent("mouseout", eve);
				COL.tosign.click = COL.tosign.centerclick = COL.tosign.rightcilck = false;
			}
			COL.onoverElement = COL.newonoverElement;
			if (COL.onoverElement) {
				var eve = COL.event();
				eve.target = COL.onoverElement;
				COL.onoverElement.fireEvent("mouseover", eve);
			}
		}
	};

	COL.optionalFun = {
		transformDirect: function(ct, obj) {
			if (obj.matrix) {
				ct.transform(obj.matrix[0], obj.matrix[1], obj.matrix[3], obj.matrix[4], obj.matrix[2], obj.matrix[5]);
			}

		},
		transformLinear: function(ct, obj) {
			ct.transform(1,0,0,1,obj.x + obj.rotatecenter.x - obj.positionpoint.x, obj.y + obj.rotatecenter.y - obj.positionpoint.y);
			ct.rotate(obj.rotate * 0.017453);
			ct.scale(obj.zoom.x, obj.zoom.y);
		}
	};
	COL.mousePosition = {
		fun: null,
		offsetx: 0,
		offsety: 0,
		chrome: function(e) {
			COL.mouseX = e.offsetX;
			COL.mouseY = e.offsetY;
		},
		ie: function(e) {
			COL.mouseX = e.offsetX;
			COL.mouseY = e.offsetY;
		},
		firefox: function(e) {
			COL.mouseX = e.layerX;
			COL.mouseY = e.layerY;
		}
	};

	COL.tools = {
		multiplyMatrix: function() {
			var mats = arguments;
			if (mats) {
				if (mats.length > 1) {
					var mp, mn;
					var ta = new Float32Array(9);
					for (var i = mats.length; i--;) {
						var pm = i - 1;
						if (pm >= 0) {
							mp = mats[pm];
							mn = mats[i];
							ta[0] = mp[0] * mn[0] + mp[1] * mn[3] + mp[2] * mn[6];
							ta[1] = (mp[0] + mn[4]) * mn[1] + mp[2] * mn[7];
							ta[2] = (mp[0] + mn[8]) * mn[2] + mp[1] * mn[5];
							ta[3] = mp[3] * (mn[0] + mp[4]) + mp[5] * mn[6];
							ta[4] = mp[3] * mn[1] + mp[4] * mn[4] + mp[5] * mn[7];
							ta[5] = mp[3] * mn[2] + (mp[4] + mn[8]) * mn[5];
							ta[8] = ta[7] = ta[6] = 0;
							mats[pm] = ta;
						}
					}
					return mats[0];
				}
			} else {
				return mats[0];
			}
		},
		getnum: function(string) { //提取字符串里首次出现的数字串
			if (!string) return 0;
			else {
				var a = Number(string.match(/\d+/)[0]);
				if (a) return a;
				else return 0;
			}
		},
		findEmptyPlace: function(array) {
			var i = 0;
			while (array[i]) i++;
			return i;
		},
		Linear: {
			go: function(start, end, time, func, _hz) {
				if (!window.linear) window.linear = [];
				var ind = COL.tools.findEmptyPlace(window.linear);
				var linear = window.linear[ind] = {};
				linear.start = start;
				linear.end = end;
				linear.time = time;
				linear.process = linear.c = linear.precentage = 0;
				linear.func = func;
				linear.hz = _hz || 30;
				linear.totalc = time / 1000 * linear.hz;
				linear.part = (end - start) / linear.totalc;
				linear.i = setInterval(function() {
					linear.c++;
					linear.process += linear.part;
					linear.precentage = linear.c / linear.totalc;
					if (linear.c > linear.totalc) {
						clearInterval(linear.i);
						func(linear.end);
						for (var n in linear) {
							delete linear[n];
						}
						linear = null;
						return;
					}
					func(linear.process);
				},
				1000 / linear.hz);
				return linear;
			},
			continue: function(linear) {
				if (!linear.i) {
					linear.i = setInterval(function() {
						linear.c++;
						linear.process += linear.part;
						linear.precentage = linear.c / linear.totalc;
						if (linear.c > linear.totalc) {
							clearInterval(linear.i);
							linear.func(linear.end);
							for (var n in linear) {
								delete linear[n];
							}
							linear = null;
							return;
						}
						linear.func(linear.process);
					},
					1000 / linear.hz);
				}

			},
			pause: function(linear) {
				clearInterval(linear.i);
				linear.i = null;
			},
			stop: function(linear) {
				clearInterval(linear.i);
				for (var n in linear) {
					delete n;
				}
				linear = null;
			},
			setProcess: function(linear, precentage) {
				if (! (linear.func && precentage >= 0 && precentage <= 1)) return;
				linear.c = linear.time * precentage / 1000 * linear.hz;
				linear.precentage = linear.c / linear.totalc;
				linear.process = linear.c * linear.part;
				linear.func(linear.process);
			}
		},
		paixurule: function(a, b) { //index的排序规则
			return a.z_index - b.z_index;
		},
		arraybyZ_index: function(graph) { //让图形的子元素排序
			if (graph.childNode) {
				graph.drawlist = graph.childNode.slice(0);
				graph.drawlist.sort(COL.tools.paixurule);
				for (var i = 0; graph.drawlist[i]; i++) {}
				graph.drawlist.length = i;
			}
			//if (graph.childNode) graph.drawlist = graph.childNode.sort(COL.tools.paixurule);
		},
		defaultPathFun: function(ct, graph) {
			ct.rect(0, 0, graph.width, graph.height);
		},
		addEventListener: function(dom, e, fun) {
			if (dom.addEventListener) dom.addEventListener(e, fun, false);
			else if (dom.attachEvent) dom.attachEvent(e, fun);
			else {
				dom[e] = fun;
			}
		},
		getBrowser: function() { //识别浏览器
			var b = navigator.userAgent.toLowerCase().match(/MSIE|Firefox|Opera|Safari|Chrome|trident/i);
			if (b.length) b = b[0];
			else b = "unknow";
			return b;
		},
		rand: function(min, max) { //范围随机数
			return Math.floor(min + Math.random() * (max - min));
		},
		fpscounter: function() {
			COL.fps.v = COL.fps.c;
			COL.fps.c = 0;
		}
		/*,
		dichotomySearch:function(array,fun){
			if(typeof array=="object")
		}*/
	};

	COL.Debug = {
		stat: false,
		eleinfo: false,
		itemcount: 0,
		on: function() {
			if (!COL.Debug.stat) {
				COL.Debug.stat = true;
				clearInterval(COL.fps.i);
				COL.fps.c = 0;
				COL.fps.i = setInterval(COL.tools.fpscounter, 1000);
			}
		},
		off: function() {
			if (COL.Debug.stat) {
				COL.Debug.stat = false;
				clearInterval(COL.fps.i);
			}
		}
	};
	return COL;
} (function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelRequestAnimationFrame = window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element,interval) {
		var currTime = new Date().getTime();
		var timeToCall =interval||( Math.max(0, 1000 / 60 - (currTime - lastTime)));
		callback(0);
		var id = window.setTimeout(function() {
			callback(currTime + timeToCall);
		},
		timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};
	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
} ());

