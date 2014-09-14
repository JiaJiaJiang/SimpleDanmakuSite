/*
CopyRight(Left) iTisso
member:LuoJia
*/
function newCOL() {
	var COL = {
		/*主canvas*/
		/*The main canvas*/
		canvas: null,
		/*canvas的绘图上下文*/
		/*Canvas' context*/
		context: null,
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
		document: null,
		onoverElement: null,
		MatrixTransformMode: false,
		tmpGraphID: 0,
		fps: {
			c: 0,
			v: 0,
			i: null
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
		canvas_dom.width = canvas_dom.offsetWidth;
		canvas_dom.height = canvas_dom.offsetHeight;
		var aEL = COL.tools.addEventListener;
		aEL(canvas_dom, "selectstart",
		function(e) {
			e.preventDefault();
		});
		aEL(canvas_dom, "resize",
		function() {
			COL.document.width = canvas_dom.width = COL.width = canvas_dom.offsetWidth;
			COL.document.height = canvas_dom.height = COL.height = canvas_dom.offsetHeight;
		});
		COL.context = canvas_dom.getContext("2d");
		COL.currentcontext = COL.buffercontext || COL.context;
		COL.cct = COL.currentcontext;
		COL.document = COL.Graph.New();
		COL.document.drawtype = "image";
		COL.document.name = "document";
		COL.document.width = canvas_dom.width;
		COL.document.height = canvas_dom.height;
		COL.drawlist = [COL.document];
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
	COL.commonFunction = {
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
			newobj.GraphID = COL.generateGraphID();
			return newobj;
		},
		addChild: function(graph) {
			if (graph.GraphID) {
				this.childNode[graph.GraphID] = graph;
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
			}else{
				console.log(graph.GraphID);
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
		t: {
			vary: function(ct) {
				if (this.baseline) ct.textBaseline = this.baseline;
				if (this.textborderWidth) ct.lineWidth = this.textborderWidth;
				if (this.textborderColor) ct.strokeStyle = this.textborderColor;
				ct.fillStyle = this.color || COL.font.color || "#000";
				if (this.shadowBlur > 0) {
					ct.font = this.font;
					ct.shadowBlur = this.shadowBlur;
					if (this.shadowColor) ct.shadowColor = this.shadowColor;
					if (this.shadowOffset.x) ct.shadowOffsetX = this.shadowOffset.x;
					if (this.shadowOffset.y) ct.shadowOffsetY = this.shadowOffset.y;
				}
				ct.font = this.font;
				if (this.linedirection === 0) {
					//ct.translate(0, this.lineHeight / 2);
					ct.transform(1, 0, 0, 1, 0, this.lineHeight / 2);
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
							//ct.translate(0, this.lineHeight);
							ct.transform(1, 0, 0, 1, 0, this.lineHeight);
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
							//ct.translate(0, this.lineHeight);
							ct.transform(1, 0, 0, 1, 0, this.lineHeight);
						}
					}
				} else if (this.linedirection == 1) {
					if (this.columndirection === 0) {
						for (var i = 0; i < this.varylist.length; i++) {
							ct.save();
							//ct.translate(, );
							ct.transform(1, 0, 0, 1, i * this.lineHeight, this.fontSize / 2);
							var thisline = this.varylist[i].split("");
							for (var im = 0; im < thisline.length; im++) {
								ct.save();
								//ct.translate(, 0);
								ct.transform(1, 0, 0, 1, this.lineHeight - ct.measureText(thisline[im]).width, 0);
								if (this.fill) {
									ct.fillText(thisline[im], this.innerX, this.innerY);
								}
								if (this.textborderWidth) {
									ct.shadowBlur = 0;
									ct.strokeText(thisline[im], this.innerX, this.innerY);
								}
								ct.restore();
								//ct.translate(0, );
								ct.transform(1, 0, 0, 1, 0, this.fontSize);
							}
							ct.restore();
						}
					} else if (this.columndirection == 1) {
						for (var i = this.varylist.length - 1; i > 0; i--) {
							ct.save();
							//ct.translate(,);
							ct.transform(1, 0, 0, 1, (this.varylist.length - 1 - i) * this.lineHeight, this.fontSize / 2);
							var thisline = this.varylist[i].split("");
							for (var im = 0; im < thisline.length; im++) {
								ct.save();
								//ct.translate(, 0);
								ct.transform(1, 0, 0, 1, this.lineHeight - ct.measureText(thisline[im]).width, 0);
								if (this.fill) {
									ct.fillText(thisline[im], this.innerX, this.innerY);
								}
								if (this.textborderWidth) {
									ct.shadowBlur = 0;
									ct.strokeText(thisline[im], this.innerX, this.innerY);
								}
								ct.restore();
								//ct.translate(0,);
								ct.transform(1, 0, 0, 1, 0, this.fontSize);
							}
							ct.restore();
						}
					}
				}
				this.varylist=null;
			},
			/*prepareTextp1: function(o) {
				if ((!o.imgobj) || (!o.imgobj.getContext)) {
					o.imgobj = document.createElement("canvas");
				}
				if (!o.ct) {
					o.ct = o.imgobj.getContext("2d");
				}
				setTimeout(function(){COL.commonFunction.t.prepareTextp2(o)}, 0);
			},
			prepareTextp2: function(o) {
				o.varylist = o.text.split(/\n/g);
				var font = "";
				if (o.fontStyle || COL.font.fontStyle) font += o.fontStyle || COL.font.fontStyle;
				if (o.fontVariant || COL.font.fontVariant) font += (" " + (o.fontVariant || COL.font.fontVariant));
				if (o.fontWeight || COL.font.fontWeight) font += (" " + (o.fontWeight || COL.font.fontWeight));
				font += (" " + (o.fontSize || COL.font.fontSize) || 15) + "px";
				if (o.fontFamily || COL.font.fontFamily) font += (" " + (o.fontFamily || COL.font.fontFamily));
				else {
					font += (" " + COL.fontFamily);
				}
				o.font = font;
				o.plusoffsetX = o.shadowBlur + (o.shadowOffset.x < 0 ? -o.shadowOffset.x: 0);
				o.plusoffsetY = o.shadowBlur + (o.shadowOffset.y < 0 ? -o.shadowOffset.y: 0);
				setTimeout(function(){COL.commonFunction.t.prepareTextp3(o)}, 0);
			},
			prepareTextp3: function(o) {
				var addedwidth = o.shadowBlur * 2 + Math.abs(o.shadowOffset.x),
				addedheight = o.shadowBlur * 2 + Math.abs(o.shadowOffset.y);
				o.addedTop = addedheight / 2;
				//var ct=o.ct;
				var ct = o.ct,
				ca = o.imgobj;

				if (o.autoSize) {
					var w = 0,
					i, tw;
					ct.font = o.font;
					if (o.linedirection === 0) {
						for (i = o.varylist.length; i--;) {
							tw = ct.measureText(o.varylist[i]).width;
							w = tw > w ? tw: w;
						}
						ca.width = (o.width = (o.maxWidth >= w) ? o.maxWidth: w) + addedwidth;
						ca.height = (o.height = o.varylist.length * (o.lineHeight > o.fontSize ? o.lineHeight: o.fontSize)) + addedheight;
					} else if (o.linedirection == 1) {
						for (i = o.varylist.length; i--;) {
							tw = o.varylist[i].split("").length;
							w = tw > w ? tw: w;
						}
						w *= o.fontSize;
						ca.width = (o.width = o.varylist.length * (o.lineHeight > o.fontSize ? o.lineHeight: o.fontSize)) + addedwidth;
						ca.height = (o.height = (o.maxWidth >= w) ? o.maxWidth: w) + addedheight;
					}
				} else {
					ca.width = (o.width >= 0) ? o.width: 100;
					ca.height = (o.height >= 0) ? o.height: 30;
				}
				ct.transform(1, 0, 0, 1, o.plusoffsetX, o.plusoffsetY);
				//setTimeout((o.vary)(ct,o),0);
				o.vary(ct);
			},*/
			prepareText: function() {
				//COL.commonFunction.t.prepareTextp1(this);
				if ((!this.imgobj) || (!this.imgobj.getContext)) {
						this.imgobj = document.createElement("canvas");
					}
					var imgobj = this.imgobj;
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
					this.addedTop = addedheight / 2;
					if (this.autoSize) {
						var w = 0,
						tw;
						if (this.linedirection === 0) {
							for (var i = 0; i < this.varylist.length; i++) {
								tw = ct.measureText(this.varylist[i]).width;
								w = tw > w ? tw: w;
							}
							imgobj.width = (this.width = (this.maxWidth >= w) ? this.maxWidth: w) + addedwidth;
							imgobj.height = (this.height = this.varylist.length * (this.lineHeight > this.fontSize ? this.lineHeight: this.fontSize)) + addedheight;
						} else if (this.linedirection == 1) {
							for (var i = 0; i < this.varylist.length; i++) {
								tw = this.varylist[i].split("").length;
								w = tw > w ? tw: w;
							}
							w *= this.fontSize;
							 imgobj.width =(this.width = this.varylist.length * (this.lineHeight > this.fontSize ? this.lineHeight: this.fontSize))+addedwidth;
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
		drawDebugstat: function(cct) {
			cct.save();
			cct.setTransform(1, 0, 0, 1, 0, 0);
			cct.font = "16px Arial";
			cct.textBaseline = "top";
			cct.globalCompositeOperation = "lighter";
			cct.fillStyle = "red";
			cct.fillText(" FPS:" + COL.fps.v + " Items:" + COL.Debug.itemcount, 4, 3);
			cct.restore();
			COL.fps.c++;
			COL.Debug.itemcount = 0;
		}
	};
	COL.Graph = {
		New: function(opjson) {
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
				set: COL.commonFunction.set,
				drawpic: COL.commonFunction.drawpic,
				setZoom: COL.commonFunction.setZoom,
				useImage: COL.commonFunction.useImage,
				borderPathFun: COL.commonFunction.borderPathFun,
				zindex: COL.commonFunction.zindex,
				setRotateCenter: COL.commonFunction.setRotateCenter,
				setPositionPoint: COL.commonFunction.setPositionPoint,
				setSize: COL.commonFunction.setSize,
				New: COL.commonFunction.New,
				clone: COL.commonFunction.clone,
				addChild: COL.commonFunction.addChild,
				removeChild: COL.commonFunction.removeChild,
				setMatrix: COL.commonFunction.setMatrix
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
			t.autoVary = true;
			t.drawtype = "text";
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
			t.vary = COL.commonFunction.t.vary;
			t.prepareText = COL.commonFunction.t.prepareText;
			t.setSize = COL.commonFunction.t.setSize;
			t.setText = COL.commonFunction.t.setText;
			if (opjson) {
				for (var ob in opjson) {
					t[ob] = opjson[ob];
				}
			}
			if (t.autoVary) t.prepareText();
			return t;
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

	COL.clearElement = function(d, ct) {
		for (var i = 0; i < d.length; i++) {
			if (d[i].display) {
				ct.save();
				COL.transform(ct, d[i]);
				if (d[i].drawtype == "text") {
					ct.clearRect(0, 0, d[i].width, d[i].height);
				}
				ct.transform(1, 0, 0, 1, -d[i].rotatecenter.x, -d[i].rotatecenter.y);
				if (d[i].drawlist.length) {
					COL.clearElement(d[i].drawlist, ct);
				}
				ct.restore();
			}
		}
	}
	COL.drawElement = function(d, ct) {
		for (var i = 0; i < d.length; i++) {
			if (d[i].display) {
				cObj = d[i];
				ct.save();
				COL.transform(ct, cObj);
				if (COL.Debug.stat) {
					ct.moveTo(0, 3);
					ct.lineTo(0, -3);
					ct.moveTo(3, 0);
					ct.lineTo( - 3, 0);
					ct.stroke();
				}
				if (cObj.opacity !== null) ct.globalAlpha = cObj.opacity;
				ct.save();
				if (cObj.Composite) ct.globalCompositeOperation = cObj.Composite;
				//if (cObj.beforedrawfun) cObj.beforedrawfun(ct);
				if (cObj.backgroundColor) {
					ct.fillStyle = cObj.backgroundColor;
					ct.fillRect( - cObj.rotatecenter.x, -cObj.rotatecenter.y, cObj.width, cObj.height);
				}
				switch (cObj.drawtype) {
				case "text":
					{
						ct.transform(1, 0, 0, 1, -cObj.rotatecenter.x, -cObj.rotatecenter.y);
						if (cObj.imgobj && cObj.imgobj.width && cObj.imgobj.height) {
							ct.transform(1, 0, 0, 1, -cObj.plusoffsetX, -cObj.plusoffsetY);
							ct.drawImage(cObj.imgobj, 0, 0);
							if (COL.Debug.stat) {
								ct.save();
								ct.strokeStyle = "#ccc";
								ct.strokeRect(0, 0, cObj.imgobj.width, cObj.imgobj.height);
								ct.restore();
								ct.transform(1, 0, 0, 1, cObj.plusoffsetX, cObj.plusoffsetY);
							}
						}
						break;
					}
				case "image":
					{
						ct.transform(1, 0, 0, 1, -cObj.rotatecenter.x, -cObj.rotatecenter.y);
						if (cObj.imgobj && cObj.imgobj.width && cObj.imgobj.height) {
							ct.drawImage(cObj.imgobj, 0, 0);
						}
						break;
					}

				case "function":
					{
						ct.transform(1, 0, 0, 1, -cObj.rotatecenter.x, -cObj.rotatecenter.y);
						if (cObj.drawfunction) cObj.drawfunction(ct);
						break;
					}
				}
				//if (cObj.afterdrawfun) cObj.afterdrawfun(ct);
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
					case "text":
						{
							ct.fillText("Text", 0, 0);
							ct.font = "12px Arial";
							ct.fillText("font:" + cObj.font, 0, -12);
							break;
						}
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
					}
					ct.restore();
				}
				ct.restore();
				ct.transform(1, 0, 0, 1, -cObj.rotatecenter.x, -cObj.rotatecenter.y);
				if (cObj.drawlist.length) {
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
		//COL.cct.clearRect(0, 0, COL.canvas.width, COL.canvas.height);
		//COL.clearElement(COL.drawlist, COL.currentcontext);
		COL.drawElement(COL.drawlist, COL.cct);
		if (COL.Debug.stat) {
			COL.commonFunction.drawDebugstat(COL.cct);
		}
	};

	COL.optionalFun = {
		transformDirect: function(ct, obj) {
			if (obj.matrix) {
				ct.transform(obj.matrix[0], obj.matrix[1], obj.matrix[3], obj.matrix[4], obj.matrix[2], obj.matrix[5]);
			}
		},
		transformLinear: function(ct, obj) {
			ct.transform(1, 0, 0, 1, obj.x + obj.rotatecenter.x - obj.positionpoint.x, obj.y + obj.rotatecenter.y - obj.positionpoint.y);
			ct.rotate(obj.rotate * 0.017453);
			ct.scale(obj.zoom.x, obj.zoom.y);
		}
	};

	COL.tools = {
		multiplyMatrix: function() {
			var mats = arguments;
			if (mats) {
				if (mats.length > 1) {
					var mp, mn, ta = new Float32Array(9);
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
	if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 1000 / 60 - (currTime - lastTime));
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