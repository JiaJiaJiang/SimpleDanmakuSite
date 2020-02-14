<?php
require_once(dirname(__FILE__).'/access.php');
define('STDOUT',fopen('php://stdout', 'w'));

function stdout($c){
	if(Access::devMode())fwrite(STDOUT, $c);  
}
function stdoutl($c){
	if(Access::devMode())stdout($c.PHP_EOL);  
}
?>