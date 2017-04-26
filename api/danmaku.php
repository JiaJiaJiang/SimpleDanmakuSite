<?php
/*
参数
GET[opt] //要进行的操作
*/
if(!function_exists('apiResult'))exit;

require_once(dirname(__FILE__).'/../utils/danmaku.php');
require_once(dirname(__FILE__).'/../utils/access.php');

switch(@$_GET['opt']) {
	case 'add':{//添加弹幕
		$dnmakuOpt=new Danmaku();
		$dmInfo=json_decode(@$_GET['value']);
		Access::requireAccess();
		$thit=time();
		if(!Access::hasLoggedIn()&&array_key_exists('lastDanmakuTime',$_SESSION)){//检查发送时间间隔
			$lst = intval($_SESSION['lastDanmakuTime']);
			if (($thit - $lst) < 5)
				throw new Exception('发送间隔太小', -1);
		}
		$_SESSION['lastDanmakuTime']=$thit;
		$dmID=$dnmakuOpt->add($dmInfo);
		apiResult(0,$dmID,true);
	}
	case 'delete':{//删除一个或多个弹幕
		Access::requireLogin();
		$dnmakuOpt=new Danmaku();
		$ids=parseIDList(@$_GET['did']);
		if($ids===false)
			throw new Exception('did error',-1);
		$affected=$dnmakuOpt->delete($ids);
		apiResult(0,$affected,true);
	}
	case 'get':{
		$dnmakuOpt=new Danmaku();
		$vid=@$_GET['vid'];
		$limit=@$_GET['limit']?intval($_GET['limit']):1000;
		if(!is_numeric($vid)||!isIntStr($vid))
			throw new Exception('vid error', -1);
		if(!Access::hasLoggedIn())
			Access::requireAccess();
		$cond=array('vid=?');
		$args=array($vid);
		$result=$dnmakuOpt->get(
			array(
				'condition'=>$cond,
				'args'=>$args,
				'select'=>'did,mode AS m,content AS c,time AS t,color AS co,date AS d',
				'limit'=>$limit
			)
		);
		apiResult(0,$result,true);
	}
	default:{
		http_response_code(404);
		throw new Exception("Not found", -1);
	}
}
?>