<?php
define('STDOUT',fopen('php://stdout', 'w'));

function stdout($c){
	if($GLOBALS['devMode']==true)fwrite(STDOUT, $c);  
}
function stdoutl($c){
	if($GLOBALS['devMode']==true)stdout($c.PHP_EOL);  
}
?>