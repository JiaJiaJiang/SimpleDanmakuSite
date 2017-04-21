<?php
/*
参数
GET[opt] //要进行的操作
*/

require_once('../utils/danmaku.php');
require_once('../utils/access.php');

switch(@$_GET['opt']) {
	case 'add':{//添加弹幕
		$dnmakuOpt=new Danmaku();
		$dmInfo=json_decode(@$_GET['value']);
		if(!is_object($dmInfo))
			apiResult(-1,'value is not a valid json',true);
		if(Access::checkAccess())
			apiResult(-4,'access required',true);
		$thit=@gettimeofday()['sec'];
		if(!Access::hasLoggedIn()&&array_key_exists('lastDanmakuTime',$_SESSION)){//检查发送时间间隔
			$lst = intval($_SESSION['lastDanmakuTime']);
			if (($thit - $lst) < 5)
				apiResult(-1,'发送间隔太小',true);
		}
		$_SESSION['lastDanmakuTime']=$thit;
		try{
			$dmID=$dnmakuOpt->add($dmInfo->videoid,$dmInfo->content,$dmInfo->type,$dmInfo->time,$dmInfo->color,$dmInfo->size);
		}catch(Exception $e){
			apiResult(-1,$e->getMessage(),true);
		}
		apiResult(0,$dmID,true);
	}
	case 'delete':{//删除一个或多个弹幕
		Access::requireLogin();
		$dnmakuOpt=new Danmaku();
		$ids=parseIDList(@$_GET['did']);
		if($ids===false)apiResult(-1,'did error',true);
		try{
			$affected=$dnmakuOpt->delete($ids);
		}catch(Exception $e){
			apiResult(-1,$e->getMessage(),true);
		}
		apiResult(0,$affected,true);
	}
	case 'get':{
		$dnmakuOpt=new Danmaku();
		$vid=@$_GET['vid'];
		$limit=@$_GET['limit']?intval($_GET['limit']):1000;
		if(!is_numeric($vid)||!isIntStr($vid))
			apiResult(-1,'vid error',true);
		if(!Access::hasLoggedIn()&&Access::checkAccess())
			apiResult(-4,'access required',true);
		$cond=array('vid=?');
		$args=array($vid);
		try{
			$result=$dnmakuOpt->get(
				array(
					'condition'=>$cond,
					'args'=>$args,
					'select'=>'did,mode AS m,content AS c,time AS t,color AS co,date AS d',
					'limit'=>$limit
				)
			);
		}catch(Exception $e){
			apiResult(-1,$e->getMessage(),true);
		}
		apiResult(0,$result,true);
	}
	default:{
		http_response_code(404);
	    exit;
	}
}
?>