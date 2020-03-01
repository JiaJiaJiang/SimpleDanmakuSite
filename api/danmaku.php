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
		Access::requireAccess();
		$danmakuOpt=new Danmaku();
		$dmInfo=json_decode(@$_GET['value']);
		$thit=time();
		if(!Access::hasLoggedIn()&&array_key_exists('lastDanmakuTime',$_SESSION)){//检查发送时间间隔
			$lst = intval($_SESSION['lastDanmakuTime']);
			if (($thit - $lst) < 5)
				throw new Exception('发送速度过快', -1);
		}
		$_SESSION['lastDanmakuTime']=$thit;
		$dmInfo->date=$thit;
		apiResult(0,$danmakuOpt->add($dmInfo));
	}
	case 'batchAdd':{
		Access::requireLogin();
		$count=0;
		$dmList=json_decode(file_get_contents('php://input'));//获取body中的json
		$danmakuOpt=new Danmaku();
		apiResult(0,$danmakuOpt->batchAdd($dmList));
	}
	case 'clear':{
		Access::requireLogin();
		$danmakuOpt=new Danmaku();
		$ids=parseIDList(@$_GET['vid']);
		if($ids===false)
			throw new Exception('vid error',-1);
		apiResult(0,$danmakuOpt->deleteByVid(parseIDList($ids)));
	}
	case 'delete':{//删除一个或多个弹幕
		Access::requireLogin();
		$danmakuOpt=new Danmaku();
		$ids=parseIDList(@$_GET['did']);
		if($ids===false)
			throw new Exception('did error',-1);
		$affected=$danmakuOpt->delete($ids);
		apiResult(0,$affected);
	}
	case 'get':{
		$danmakuOpt=new Danmaku();
		$vid=@$_GET['vid'];
		$limit=@$_GET['limit']?intval($_GET['limit']):1000;
		if(!is_numeric($vid)||!isIntStr($vid))
			throw new Exception('vid error', -1);
		if(!Access::hasLoggedIn()){
			Access::requireAccess();
		}
		$result=$danmakuOpt->get(
			array(
				'vid'=>$vid,
				'item'=>array('did','mode AS m','content AS c','color AS co','time AS t','size AS s','date AS d'),
				'limit'=>$limit
			)
		);
		apiResult(0,$result);
	}
	case 'list':{
		Access::requireLogin();
		$danmakuOpt=new Danmaku();
		$result=$danmakuOpt->get(json_decode(@$_GET['arg']));
		apiResult(0,$result);
	}
	default:{
		http_response_code(404);
		throw new Exception("Not found", -1);
	}
}
?>