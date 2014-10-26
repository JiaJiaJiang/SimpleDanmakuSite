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
	g.graphFun=function(ct){
		ct.translate(g.r, g.r);
		ct .rotate(Math.PI/2*3);
		ct.beginPath();
		ct.fillStyle =g.color||"#000";
		ct.moveTo(g.r, 0);
		for (var i = 0; i < 9; i++) {
			ct.rotate(Math.PI / 5);
			if (i % 2 == 0) {
				ct.lineTo(g.r*0.3819653, 0);
			} else {
				ct.lineTo(g.r, 0);
			}
		}
		ct .rotate(Math.PI*7/10);
		ct.translate(-g.r, -g.r);
	}
	g.setR=function(r){
		g.r=r;
		g.width=2*r;
		g.height=2*r;
	}
	g.drawfunction=function(ct){
		g.graphFun(ct);
		ct.fill();
	}
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
	g.graphFun = function(ct) {
		ct.arc(g.r, g.r, g.r, g.startAngle || 0, g.endAngle || 2*Math.PI, g.anticlockwise || true);
		ct.closePath();
	}
	g.setR = function(r) {
		g.r = r;
		g.width = 2 * r;
		g.height = 2 * r;
	}
	g.drawfunction = function(ct) {
		ct.beginPath();
		ct.fillStyle = g.fillColor|| "#66CCFF";
		ct.strokeStyle = g.borderColor || "#000";
		ct.lineWidth =g.borderWidth|| 0;
		g.graphFun(ct);
		ct.closePath();
		ct.fill();
	}
	return g;
}
Glib.Graph['rect'] = function(optionjson) {
		var g = Glib.lib.Graph.New();
		if(optionjson){
			for(op in optionjson){
				g[op]=optionjson[op];
			}
		}

		g.width = g.width>=0? g.width:50;
		g.height = g.height>=0? g.height:50;
		if(g.iffill===null)g.iffill = true;
		g.graphFun = function(ct) {
			ct.rect(0, 0, g.width, g.height);
		}
		g.drawfunction = function(ct) {
			ct.beginPath();g.graphFun(ct);
			if (g.iffill) {
				ct.fillStyle= g.fillColor|| "#000";
				ct.fillRect(0,0,g.width,g.height);
				ct.fill();
			}
			if (g.borderWidth  > 0) {
				
				ct.strokeStyle = g.borderColor|| "#000";
				ct.lineWidth = g.borderWidth ;
				ct.stroke();
			}
		}
		return g;
	}
return Glib;
}
