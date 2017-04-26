<?php
require_once(dirname(__FILE__)."/../utils/common.php");
require_once(dirname(__FILE__)."/../utils/access.php");


if(!allowedRequest()){
    http_response_code(403);
    exit;
}

$api=@$_GET['api'];//获取api
if(!$api || $api=='index'){
    http_response_code(400);
    exit;
}elseif(!preg_match('/^[\d\w]+$/',$api) || !is_file('./'.$api.'.php')) {
    http_response_code(404);
    exit;
}

function apiResult($code,$content,$exit=false){
	header('Content-Type:text/json',true);
	echo json_encode(array('code'=>$code,'result'=>$content),JSON_UNESCAPED_UNICODE);
	flush();
	if($exit===true)exit;
}
function errApiResuult($e,$exit=true){
    apiResult($e->getCode()===0?-1:$e->getCode(),$e->getMessage(),$exit);
}


try{
    require_once(dirname(__FILE__).'/'.$api.'.php');
}catch(Exception $e){
    errApiResuult($e);
}


?>
