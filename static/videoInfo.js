/*
The MIT License (MIT)
Copyright (c) luojia@luojia.me
*/
!function(){
'use strict';
var $=document.querySelector.bind(document);
function setText(ele,text){ele.appendChild(document.createTextNode(text));}
setText($('title'),info.title);
setText($('#title'),info.title);
setText($('#playCount'),'播放数:'+info.playCount);
setText($('#danmakuCount'),'弹幕数:'+info.danmakuCount);
setText($('#desc'),info.description);
if(info.cover){
	var div=document.createElement("div"),img=new Image();
	document.body.appendChild(div);
	div.id='cover';
	div.style.opacity=0;
	div.style.backgroundImage="url('"+(img.src=info.cover)+"')";
	img.onload=function(){div.style.opacity='';}	
}
}();
