//初始化播放器


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

	})
}


//获取弹幕
function getDanmaku(){
	SAPI.get('danmaku',{opt:'get',vid:vid,access:SAPI.getAccess()},function(err,r){
		
	})
}

//关闭loading
window.addEventListener('load',function(){
	document.body.parentNode.style.backgroundImage='none';
});