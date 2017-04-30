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
		console.log(d);
		let d2={_:'text',text:d.text,time:d.time,mode:d.mode,style:{fontSize:d.size},date:Date.now(),id:0}
		if(d.color){
			d2.style.color=d.color;
		}
		callback(d2);
	}
});
document.body.appendChild(NP.player);


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
	SAPI.get('video',{opt:'video',vid:vid,access:SAPI.getAccess()},function(err,r){
		if(err){
			console.error(err);
			return;
		}
		document.title=r.title;
		NP.video.src=r.address[0];
	})
}


//获取弹幕
function getDanmaku(){
	SAPI.get('danmaku',{opt:'get',vid:vid,access:SAPI.getAccess()},function(err,r){
		if(err){
			console.error(err);
			return;
		}
		var list=[];
		r.forEach(function(d){
			list.push({
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
	})
}

//关闭loading
window.addEventListener('load',function(){
	document.body.parentNode.style.backgroundImage='none';
});