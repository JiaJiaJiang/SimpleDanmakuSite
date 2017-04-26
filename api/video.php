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
		apiResult(0,$videoID,true);
	}
	case 'update':{//编辑视频
		Access::requireLogin();
		$videoOpt=new Video();
		$videoInfo=json_decode(@$_GET['value']);
		$affected=$videoOpt->update($_GET['vid'],$videoInfo);
		apiResult(0,$affected,true);
	}
	case 'delete':{//删除一个或多个视频
		Access::requireLogin();
		$videoOpt=new Video();
		$ids=parseIDList(@$_GET['vid']);
		if($ids===false)
			throw new Exception('vid error',-1);
		$affected=$videoOpt->delete($ids);
		apiResult(0,$affected,true);
	}
	case 'get':{//获取视频列表
		Access::requireLogin();
		$videoOpt=new Video();
		$arg=json_decode(@$_GET['arg']);
		/*$items=is_string(@$_GET['items'])?json_decode($_GET['items']):array('*');
		$select=implode(',',$items);
		$page=is_numeric(@$_GET['page'])?intval($_GET['page']):0;
		$limit=is_numeric(@$_GET['limit'])?intval($_GET['limit']):15;*/
		$result=$videoOpt->get($arg);
		apiResult(0,$result,true);
	}
	case 'video':{//获取播放器用的视频信息
		Access::requireAccess();
		$videoOpt=new Video();
		$vid=@$_GET['vid'];
		$select=(@$_GET['addressOnly']==='1')?'address':'V.*';

		$result=$videoOpt->videoInfo($vid,$select,Access::hasLoggedIn());
		//解析地址
		require_once(dirname(__FILE__).'/../utils/convertLink.php');
		$result->address=convertLink($result->address);
		apiResult(0,$result,true);

	}
	case 'access':{
		$access=Access::generate();
		$_SESSION['access']=$access->accessSession;
		unset($access->accessSession);
		apiResult(0,$access,true);
	}
	default:{
		http_response_code(404);
	    exit;
	}
}
?>