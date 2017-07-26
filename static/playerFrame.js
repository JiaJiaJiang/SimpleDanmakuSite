/*
The MIT License (MIT)
Copyright (c) luojia@luojia.me
*/
(function(){
	var style=document.createElement("style");//style
	document.head.appendChild(style);
	var styleSheet=style.sheet;
	var iframeCache={};
	styleSheet.insertRule('iframe.fullPage{position: fixed;width: 100%!important;height: 100%!important;top:0!important;left: 0!important;z-index: 999999;}',styleSheet.cssRules.length);


	window.addEventListener('message',function(msg){
		var data=msg.data,iframe;
		if(typeof data =='object'&&data!=null&&data.upid&&(iframe=findIframe(data.upid,msg.source))){
			switch(data.type){
				case 'playerEvent':{
					if(data.name=='playerModeChange'){
						if(!iframe)return;
						if(data.arg=='fullPage'){
							iframe.classList.add('fullPage');
						}else if(data.arg=='normal'){
							iframe.classList.remove('fullPage');
						}
					}
				}
			}
		}
	});

	function findIframe(upid,win){
		var i=iframeCache[upid];
		if(!i){
			var fs=document.querySelectorAll('iframe');
			for(var is=fs.length;is--;){
				if(fs[is].contentWindow==win){
					i=iframeCache[upid]=fs[is];
					break;
				}
			}
		}
		return i;
	}

})();
