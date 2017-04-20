<?php
require_once('../utils/common.php');

if(@$_GET['cred']){//验证请求
	$cred=json_decode(base64_decode($_GET['cred']));
	if(!$cred){
		http_response_code(500);
		exit;
	}
	if(Access::login($cred->user,$cred->pass,$cred->code)){
		apiResult(0,'true',true);
	}
	sleep(rand(0,9));
	apiResult(0,'false',true);
	exit;
}
?>
