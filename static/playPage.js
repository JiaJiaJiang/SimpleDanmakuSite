'use strict';
//config
var Config={
	set:function(name,value){
		localStorage.setItem('NyapConfig:'+name,value);
	},
	get:function(name){
		localStorage.getItem('NyapConfig:'+name);
	},
	delete:function(name){
		localStorage.removeItem('NyapConfig:'+name);
	}
}

//初始化播放器
var tmp,NP=new NyaP({
	volume:(tmp=Config.get('volume'))!=undefined?tmp:1,
	danmakuOption:{
		allowLines:true,
		screenLimit:0,
	},
	danmakuSend:(d,callback)=>{
		var data={
			vid:vid,
			content:d.text,
			mode:d.mode,
			time:d.time,
			color:d.color,
			size:d.size
		};
		console.log(d);
		let d2={_:'text',text:d.text,time:d.time,mode:d.mode,style:{fontSize:d.size},date:Date.now(),did:null}
		if(d.color){
			d2.style.color=d.color;
		}
		callback(d2);
		SAPI.getAccess(function(access) {
			SAPI.get('danmaku',{opt:'add',value:data,access:access},function(err,r){
				console.log(err,r);
				if(err){
					console.error(err);
					return;
				}
				d2.did=Number(r);
			});
		});
	}
});
document.body.appendChild(NP.player);
NP.player.focus();

if(self != top){//在iframe中，向父窗口发送信号
	NP.globalHandle=function(e,arg){
		window.parent.postMessage({
			type:'playerEvent',
			name:e,
			arg:arg
		},'*');
	}
	window.addEventListener("message",function(msg){
		var data=msg.data;
		if(typeof data =='object'&&data!=null){
			switch(data.type){
				case 'playerControl':{
					playerControl(data.name,data.arg);
				}
			}
		}
	});
}
function playerControl(name,arg){
}


function getSearchArg(name){
	try{
		var reg=new RegExp(name+'=([^&]+)');
		var r=document.location.search.match(reg);
		return r[1];
	}catch(e){
		return undefined;
	}
}
var vid=getSearchArg('id');

SAPI.refreshAccess(accessCallback);

function accessCallback(r){
	if(!r){
		alert('请刷新重试');
		return;
	}
	getVideo();
	getDanmaku();
}
//获取视频信息
function getVideo(){
	SAPI.getAccess(function(access){
		SAPI.get('video',{opt:'video',vid:vid,access:access},function(err,r){
			if(err)return;
			document.title=r.title;
			NP.video.src=r.address[0];
		});
	});
}


//获取弹幕
function getDanmaku(){
	SAPI.getAccess(function(access){
		SAPI.get('danmaku',{opt:'get',vid:vid,access:access},function(err,r){
			if(err)return;
			var list=[];
			r.forEach(function(d){
				list.push({
					_:'text',
					text:d.c,
					time:d.t,
					mode:d.m,
					style:{
						fontSize:d.s,
						color:(d.co||'fff')
					},
					date:d.d,
					did:d.did
				});
			});
			NP.loadDanmakuList(list);
		});	
	});
}


