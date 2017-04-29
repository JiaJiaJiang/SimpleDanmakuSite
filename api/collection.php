<?php
/*
参数
GET[opt] //要进行的操作
*/
if(!function_exists('apiResult'))exit;

require_once(dirname(__FILE__).'/../utils/collection.php');
require_once(dirname(__FILE__).'/../utils/access.php');

switch(@$_GET['opt']) {
	case 'add':{//添加合集
		Access::requireLogin();
		$collectionOpt=new Collection();
		$colInfo=json_decode(@$_GET['value']);
		apiResult(0,$collectionOpt->add($colInfo));
	}
	case 'delete':{//删除一个或多个合集（删除合集不会影响其中的视频）
		Access::requireLogin();
		$collectionOpt=new Collection();
		$ids=parseIDList(@$_GET['cid']);
		if($ids===false)
			throw new Exception('cid error',-1);
		$affected=$collectionOpt->delete($ids);
		apiResult(0,$affected);
	}
	case 'update':{
		Access::requireLogin();
		$colOpt=new Collection();
		$colInfo=json_decode(@$_GET['value']);
		$affected=$colOpt->update($_GET['cid'],$colInfo);
		apiResult(0,$affected);
	}
	case 'get':{
		apiResult(0,
			(new Collection())->get(json_decode(@$_GET['arg']))
		);
	}
	default:{
		http_response_code(404);
		throw new Exception("Not found", -1);
	}
}
?>