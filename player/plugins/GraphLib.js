function getGraphlib(lib){
var Glib={};
Glib.Graph=[];
Glib.SetCanvasLib=function(lib){
	if(lib)
	this.lib=lib;
};
Glib.SetCanvasLib(lib);
Glib.getGraphObj=function(type,optionjson){
	if(!this.lib){console.log("未设置绘图库");return false;}
	if(!Glib.Graph[type]){console.log("没有此图形:"+type);return false;}
	return Glib.Graph[type](optionjson);
}
Glib.Graph['star']=function(optionjson){
	var g=Glib.lib.Graph.New();
	if(optionjson){
			for(op in optionjson){
				g[op]=optionjson[op];
			}
		}
	g.r=g.r||10;
	g.width=2*g.r;
	g.height=2*g.r;
	g.graphFun=function(ct,color){
		//ct.translate(g.r, g.r);
		ct .rotate(Math.PI/2*3);
		ct.beginPath();
		ct.fillStyle =color||g.color||"#000";
		ct.moveTo(g.r, 0);
		for (var i = 0; i < 9; i++) {
			ct.rotate(Math.PI / 5);
			if (i % 2 == 0) {
				ct.lineTo(g.r*0.3819653, 0);
			} else {
				ct.lineTo(g.r, 0);
			}
		}
		//ct .rotate(Math.PI*7/10);
		//ct.translate(-g.r, -g.r);
	}
	g.setR=function(r){
		g.r=r;
		g.width=2*r;
		g.height=2*r;
	}
	g.drawfunction=function(ct,color){
		g.graphFun(ct,color);
		ct.fill();
	}
	g.eventRange=g.drawfunction;
	return g;
};

Glib.Graph['arc'] = function(optionjson) {
	var g = Glib.lib.Graph.New();
	if(optionjson){
		for(op in optionjson){
			g[op]=optionjson[op];
		}
	}
	g.r = g.r || 10;
	g.width = 2 * g.r;
	g.height = 2 * g.r;
	g.startAngle=0;
	g.endAngle=2*Math.PI;
	g.anticlockwise=false;
	g.graphFun = function(ct) {
		ct.beginPath();
		ct.moveTo(g.r+g.r*Math.cos(g.startAngle),g.r+g.r*Math.sin(g.startAngle));
		ct.arc(g.r, g.r, g.r, g.startAngle, g.endAngle, g.anticlockwise);
		ct.closePath();
	}
	g.setR = function(r) {
		g.r = r;
		g.width = 2 * r;
		g.height = 2 * r;
	}
	g.drawfunction = function(ct,color) {
		ct.fillStyle = color||g.fillColor|| "#66CCFF";
		if(!color&&g.borderWidth){
			ct.strokeStyle = g.borderColor || "#000";
			ct.lineWidth =g.borderWidth|| 0;
		}
		g.graphFun(ct);
		ct.fill();
		if(!color&&g.borderWidth){
			ct.stroke();
		}
	}
	g.eventRange=g.drawfunction;
	return g;
}
Glib.Graph['rect'] = function(optionjson) {
		var g = Glib.lib.Graph.New();
		if(optionjson){
			for(op in optionjson){
				g[op]=optionjson[op];
			}
		}

		g.width = g.width || 50;
		g.height = g.height || 50;
		if(g.iffill===null)g.iffill = true;
		g.graphFun = function(ct) {
			ct.rect(0, 0, g.width, g.height);
		}
		g.drawfunction = function(ct,color) {
			g.graphFun(ct);
			if (g.iffill||color) {
				ct.fillStyle  = color||g.fillColor|| "#000";
				ct.fill();
			}
			if(!color&&g.borderWidth  > 0) {
				ct.strokeStyle = g.borderColor|| "#000";
				ct.lineWidth = g.borderWidth ;
				ct.stroke();
			}
		}
		g.eventRange=g.drawfunction;
		return g;
	}
return Glib;
}
