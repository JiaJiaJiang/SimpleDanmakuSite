/*响应VideoInfoGet事件并填充视频信息*/
(function(){
	var infobox=c_ele("div"),
	title=c_ele("div"),
	des=c_ele("div"),
	d2=c_ele("div"),
	pc=c_ele("div"),
	dc=c_ele("div");
	infobox.style.backgroundColor="rgba(54,174,184,0.41)";
	infobox.style.wordBreak="break-all";
	title.innerHTML="...";
	$Attr(title.style,{fontSize:"22px",padding:"3px",position:"relative"});
	$Attr(des.style,{paddingLeft:"3px",color:"#F5EEEE",fontSize:"15px"});
	$Attr(pc.style,{display:"inline-block",width:"50%"});
	$Attr(dc.style,{display:"inline-block",width:"50%"});
	$Attr(d2.style,{fontSize:"15px",backgroundColor:"rgb(130,165,190)"});
	infobox.appendChild(title);
	infobox.appendChild(des);
	infobox.appendChild(d2);
	d2.appendChild(pc);
	d2.appendChild(dc);
function pct(c){
	var q="...";
	if(c){q=c;}
	pc.innerHTML='PC:'+q;
}
function dct(c){
	var q="...";
	if(c){q=c;}
	dc.innerHTML='DC:'+q;
}
pct();dct();
EC.addEvent("menuready",function(m){
	m.addTab("home","〓");
	var d=m.tags["home"].addBlock("videoinfo");
	d.appendChild(infobox);
});
	
EC.addEvent("VideoInfoGet",function(p){
	var i=p.info;
	pct(i.count);
	title.innerHTML=i.title;
	des.innerHTML=i.des;
});
EC.addEvent("DanmakuCount",function(c){
	dct(c);
});
})();