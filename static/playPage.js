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
	SAPI.get('video',{
		opt:'video',
		vid:2,
		access:SAPI.getAccess()
	},function(){

	})
}


//获取弹幕
function getDanmaku(){

}