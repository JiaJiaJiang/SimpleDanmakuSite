<?php
define('STDOUT',fopen('php://stdout', 'w'));

function stdout($c){
	fwrite(STDOUT, $c);  
}
function stdoutl($c){
	stdout($c.PHP_EOL);  
}
?>