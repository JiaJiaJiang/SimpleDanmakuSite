<?php
/*
参数
GET[opt] //要进行的操作
*/
if(!function_exists('apiResult'))exit;

require_once(dirname(__FILE__).'/../utils/video.php');
require_once(dirname(__FILE__).'/../utils/access.php');

switch(@$_GET['opt']) {
	case 'add':{//添加视频
		Access::requireLogin();
		$videoOpt=new Video();
		$videoInfo=json_decode(@$_GET['value']);
		$videoID=$videoOpt->add($videoInfo);
		apiResult(0,$videoID);
	}
	case 'update':{//编辑视频
		Access::requireLogin();
		$videoOpt=new Video();
		$videoInfo=json_decode(@$_GET['value']);
		$affected=$videoOpt->update($_GET['vid'],$videoInfo);
		apiResult(0,$affected);
	}
	case 'batchUpdate':{//批量编辑视频
		Access::requireLogin();
		$videoOpt=new Video();
		$ids=parseIDList(@$_GET['vid']);
		if($ids===false)
			throw new Exception('vid错误',-1);
		$videoInfo=json_decode(@$_GET['value']);
		$affected=$videoOpt->batchUpdate($ids,$videoInfo);
		apiResult(0,$affected);
	}
	case 'delete':{//删除一个或多个视频
		Access::requireLogin();
		$videoOpt=new Video();
		$ids=parseIDList(@$_GET['vid']);
		if($ids===false)
			throw new Exception('vid错误',-1);
		$affected=$videoOpt->delete($ids);
		apiResult(0,$affected);
	}
	case 'get':{//获取视频列表
		Access::requireLogin();
		apiResult(0,(new Video())->get(json_decode(@$_GET['arg'])));
	}
	case 'video':{//获取播放器用的视频信息
		Access::requireAccess();
		$videoOpt=new Video();
		$vid=@$_GET['vid'];
		$select=(@$_GET['addressOnly']==='1')?'address':'V.*';

		$result=$videoOpt->videoInfo($vid,$select,Access::hasLoggedIn());
		if(!$result){//无结果
			apiResult(0,$result);
		}
		//解析地址
		require_once(dirname(__FILE__).'/../utils/convertLink.php');
		$result->address=convertLink($result->address);
		unset($result->hidden);
		apiResult(0,$result,false);
		//播放数+1
		$pre = dbOpt::$PDO->prepare('UPDATE `video` SET playCount=playCount+1 WHERE vid=?');
		$pre->execute(array($vid));
		exit;
	}
	case 'access':{
		$access=Access::generate();
		$_SESSION['access']=$access->accessSession;
		$_SESSION['accessTime']=$access->accessTime;
		unset($access->accessSession);
		apiResult(0,$access);
	}
	default:{
		http_response_code(404);
	    exit;
	}
}
?>