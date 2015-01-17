EC.addEvent("menuready",
function(m) {
	setTimeout(function(){
		m.addTab("options",'<svg width="50.0px" baseProfile="full" zoomAndPan="magnify"  height="50px" preserveAspectRatio="xMidYMid meet"><polygon fill="#fff" points="31.777779,11.888889 25.88889,7.4444447 17.666666,17.11111 21.333334,24.0 8.555554,36.44863 14.794547,41.777775 25.444445,28.333334 33.121593,31.76939 42.555557,23.777779 38.190777,18.251572 32.11111,23.222221 26.666666,18.11111"/></svg>');
	setTimeout(function(){
		var d=m.tags["options"].addBlock("commomoptions");
		var altbut=m.widget.button("喵",function(){alert(123);});
		d.appendChild(altbut);

		var swi=m.widget.switchbutton("我是开关",function(e){console.log(e)});
		d.appendChild(swi);

		var rangetest=m.tags["options"].addBlock("rangetest");
		var range=m.widget.range("喵",3,9,1,function(){},"rangetest");
		rangetest.appendChild(range);
	},0);
},100);
		
});