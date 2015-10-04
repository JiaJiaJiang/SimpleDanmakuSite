<?php
$rt=hasFlag('return');
if(@$_SESSION['logged']===true){
	out('已经登录');
	exit();
}
global $args;
function logsignin($s){
	logfile('login.log',gmdate(DATE_RFC822).' ip:'.ip().' '.$s);
}
global $fromconsole;
if(@$args['u']&&@$args['p']){
	if(user===$args['u']&&pass===$args['p']){
		$_SESSION['logged']=true;
		if($rt){
			echo 'true';
		}
		if($fromconsole){
			out('登录成功');
			out('服务器时间:'.gmdate(DATE_RFC822));
		}
		logsignin('success');
	}else{
		if($rt){
		echo 'false';
	}
	logsignin('fail');
	exit();
	}
}else{
	if($rt){
		echo 'false';
	}
	logsignin('fail');
	exit();
}

?>