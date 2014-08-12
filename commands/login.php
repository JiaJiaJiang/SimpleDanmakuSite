<?php
$rt=hasFlag("return");
global $args;
function logsignin($s){
	$f=fopen("log/login.log","a");
	fwrite($f,gmdate(DATE_RFC822)." ip:".ip()." ".$s."\n");
}
if(@$args["u"]&&@$args["p"]){
	if(user===$args["u"]&&pass===$args["p"]){
		$_SESSION['logged']=true;
		if($rt){
			echo "true";
		}
		logsignin("success");
	}else{
		if($rt){
		echo "false";
	}
	logsignin("fail");
	exit;
	}
}else{
	if($rt){
		echo "false";
	}
	logsignin("fail");
	exit;
}

?>