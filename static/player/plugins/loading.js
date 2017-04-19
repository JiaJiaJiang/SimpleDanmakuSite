(function(EC){
	var ani;
	var lof=c_ele("div"),
	zi=c_ele("div");
	EC.addEvent("PlayerReady",function(p){
		addStyle("#videopreload{position:absolute;width:100%;height:100%;cursor:dafault;background-color:#fff;}");
		addStyle("#videopreload_animation{font-size:80px;height:114px;left:calc(50% - 172px);position:absolute;top:calc(50% - 57px);transition:transform 0.08s linear;width: 360px;}");
		lof.id="videopreload";
		zi.id="videopreload_animation";
		zi.innerHTML="(๑•́ ω •̀๑)";
		lof.appendChild(zi);
		p.videoframe.appendChild(lof);
		ani=setInterval(function(){
			zi.style.transform="translate("+rand(-30,30)+"px,"+rand(-30,30)+"px) rotate("+rand(-18,18)+"deg)";
		},80);
	},true);

	var e2=EC.addEvent("VideoAddressParseError",function(){
		clearInterval(ani);
		zi.innerHTML = '(๑• . •๑)';
		zi.style.transform="none";
		EC.removeEvent(e2);
 	});
 	var e1=EC.addEvent("video_loadedmetadata",function(p){
 		lof.parentNode.removeChild(lof);
 		clearInterval(ani);
		EC.removeEvent(e1);
 	});
})(EC);