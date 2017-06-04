/*
The MIT License (MIT)
Copyright (c) luojia@luojia.me
*/
(function(){
	var style=document.createElement("style");//style
	document.head.appendChild(style);
	var styleSheet=style.sheet;
	styleSheet.insertRule('iframe.fullPage{position: fixed;width: 100%!important;height: 100%!important;top:0!important;left: 0!important;z-index: 999999;}',styleSheet.cssRules.length);

	window.addEventListener('message',function(msg){
		var data=msg.data;
		if(typeof data =='object'&&data!=null){
			switch(data.type){
				case 'playerEvent':{
					if(data.name=='playerModeChange'){
						msg.source.focus();
						if(data.arg=='fullPage'){
							document.activeElement.classList.add('fullPage');
						}else if(data.arg=='normal'){
							document.activeElement.classList.remove('fullPage');
						}
					}
				}
			}
		}
	});
})();