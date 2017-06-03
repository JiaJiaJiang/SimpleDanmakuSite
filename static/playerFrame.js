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