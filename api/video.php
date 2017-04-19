<?php
/*
参数
GET[opt] //要进行的操作
*/

require_once('../utils/video.php');
require_once('../utils/access.php');

switch(@$_GET['opt']) {
	case 'add':{//添加视频
		Access::requireLogin();
		$videoOpt=new Video();
		$videoInfo=json_decode(@$_GET['value']);
		if(!is_object($videoInfo))
			apiResult(-1,'value is not a valid json',true);
		$timestamp=@gettimeofday()['sec'];
		try{
			$videoID=$videoOpt->add($videoInfo->title,$videoInfo->address,$videoInfo->cover,$videoInfo->description,$videoInfo->options);
		}catch(Exception $e){
			apiResult(-1,$e->getMessage(),true);
		}
		apiResult(0,$videoID,true);
	}
	case 'delete':{//删除一个或多个视频
		Access::requireLogin();
		$videoOpt=new Video();
		$ids=parseIDList(@$_GET['vid']);
		if($ids===false)apiResult(-1,'vid error',true);
		try{
			$affected=$videoOpt->delete($ids);
		}catch(Exception $e){
			apiResult(-1,$e->getMessage(),true);
		}
		apiResult(0,$affected,true);
	}
	case 'get':{//获取视频列表
		$videoOpt=new Video();
		$vid=@$_GET['vid'];
		$logged=Access::hasLoggedIn();
		$withAddress=(@$_GET['withAddress']==='1' && $logged)?true:false;
		$limit=($logged&&@$_GET['limit'])?explode(',',$_GET['limit']):array(1);
		if(!$logged && $limit>100)$limit=100;//未登录限制最大100条
		if(!is_numeric($vid)||!isIntStr($vid))
			apiResult(-1,'vid error',true);
		$cond=array('vid=?');
		$args=array($vid);
		$select='title,cover,description,options'.($withAddress?',address':'');
		try{
			$result=$videoOpt->get(
				array(
					'condition'=>$cond,
					'args'=>$args,
					'select'=>$select,
					'limit'=>$limit
				)
			);
		}catch(Exception $e){
			apiResult(-1,$e->getMessage(),true);
		}
		apiResult(0,$result,true);
	}
	case 'video':{//获取播放器用的视频信息
		if(Access::checkAccess())
			apiResult(-1,'access required',true);
		$videoOpt=new Video();
		$vid=@$_GET['vid'];
		$select=(@$_GET['addressOnly']==='1')?'address':'*';

		if(!isInt($vid))
			apiResult(-1,'vid error',true);
		try{
			$result=$videoOpt->videoInfo($vid,$select);
		}catch(Exception $e){
			apiResult(-1,$e->getMessage(),true);
		}
		//解析地址
		require_once('../utils/convertLink.php');
		$result->address=convertLink($result->address);
		apiResult(0,$result,true);

	}
	case 'access':{
		$access=Access::generate();
		$_SESSION['access']=$access->accessSession;
		setcookie('accessText',$access->accessText);
		setcookie('accessCode',$access->accessCode);
		apiResult(0,$result,true);
/*
js解码
var accStr=document.cookie.match(/access=(\w{13})(\w{13})(\w{13})(\w{13})/);
accStr.shift();
var access='';
for(let i=0;i<accCode.length;i++)
	access+=accStr[1*accCode[i]];
*/
	}
	default:{
		http_response_code(404);
	    exit;
	}
}
?>