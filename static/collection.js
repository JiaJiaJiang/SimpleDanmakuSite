/*
The MIT License (MIT)
Copyright (c) luojia@luojia.me
*/
!function(){
var $=document.querySelector.bind(document),
	currentVid=null;
function setText(ele,text){ele.appendChild(document.createTextNode(text));}
setText($('title'),info.name);
setText($('#collection_name'),info.name);
setText($('#desc'),info.description);
var vb=$('#video_list'),iframe=$('iframe');
info.list.forEach(function(v,i){
	var span=document.createElement('span');
	span.info=v;
	span.className='video_block';
	span.vid=v.vid;
	span.number=i+1;
	setText(span,i+1+' '+v.title);
	vb.appendChild(span);
});
vb.addEventListener('click',function(e){
	if(e.target.tagName!=='SPAN')return;
	changeVideo(e.target.vid);
});
function changeVideo(vid){
	if(currentVid==vid)return;
	var si=0;
	for(var i=vb.childNodes.length;i--;){
		var s=vb.childNodes[i];
		if(currentVid==s.vid){
			s.classList.remove('active');
			si++;
		}else if(s.vid==vid){
			location.hash=s.number;
			document.title=s.info.title+' | '+info.name;
			iframe.src='player/?id='+vid;
			s.classList.add('active');
			currentVid=s.vid;
			s.scrollIntoView(false);
			si++;
		}
		if(si==2)return;
	}
}

/*window.addEventListener('message',function(msg){
	var data=msg.data;
	if(typeof data =='object'&&data!=null&&data.upid){
		switch(data.type){
			
		}
	}
});*/

window.addEventListener('load',function(){
	var number=location.hash.match(/\#(\d+)$/);
	number=(number)?Number(number[1]):1;
	for(var i=vb.childNodes.length;i--;){
		var s=vb.childNodes[i];
		if(s.number==number){
			changeVideo(s.vid);
			break;
		}
	}	
});
}();
