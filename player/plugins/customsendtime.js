/*
中键弹幕定位其时间并在后面跟弹幕
中键发送框出现弹幕时间自定义输入框
*/
EC.addEvent("video_loadedmetadata",function(p){
	var inputstat=false,maxtime=p.video.duration*1000;
	p.sendbutton.style.zIndex=1;
	addStyle(".danmutimeinput{height:100%;width:70px;background-color: #E77C7D;position:absolute;top:0px;right:-10px;transition:right 0.5s,opacity 0.7s;opacity:0;color:#fff;border:none;z-index:0;pedding-left:3px;}");
	var timeinput=c_ele("input");
	$Attr(timeinput,{className:"danmutimeinput",type:"number",step:"10",min:"0",max:maxtime,title:"弹幕时间(毫秒)\n中键点击发送框隐藏"});
	p.sendbox.appendChild(timeinput);

	var showtimeinput=function(time){
		inputstat=true;
		if((typeof time)=="number"){
			timeinput.value=time;
		}
		timeinput.style.right="60px";
		timeinput.style.opacity=1;
	}
	var hidetimeinput=function(){
		inputstat=false;
		timeinput.style.right="-10px";
		timeinput.style.opacity=0;
		timeinput.value="";
		timeinput.blur();
	}
 
	aEL(timeinput,"input",function(){
		var val=timeinput.value;
		val=timeinput.value=val.replace(/[^\-\d]+/,'');
		if((val=Number(val))>maxtime){
			timeinput.value=maxtime;
		}else if(val<0){
			timeinput.value=0;
		}
	});

	aEL(p.danmuinput,"mousedown",function(e){
			if(e.button===1){
			e.preventDefault();
			e.stopPropagation();
				if(inputstat){
					hidetimeinput();
				}else{
					showtimeinput(p.core.video.currentTime*1000);
				}
			}
	});

	p.core.player.danmucontainer.addEvent("centerclick",function(e){
		showtimeinput(e.target.danmuobj.t+200);
	});

	EC.addEvent("senddanmu",function(o){
		if(timeinput.value!=""){
			var t=Number(timeinput.value);
			if(typeof t=="number"&&t<=maxtime&&t>=0){
				o.t=t;
			}
		}
	},true);

	EC.addEvent("danmusended",
	function() {
		hidetimeinput();
	});
});