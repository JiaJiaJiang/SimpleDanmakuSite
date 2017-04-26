<?php
require_once(dirname(__FILE__)."/../config.php");

function logfile($filename, $log) {
	$path=constant('logPath')?@logPath:sys_temp_dir();
	file_put_contents($path.$filename,$log.PHP_EOL,FILE_APPEND);
}
function errorlog($type, $err) {
	if(@errorLog === true)logfile("Error_".$type.".log",gmdate(DATE_RFC822).": ".$err);
}
function warnlog($type, $warn) {
	if(@warnLog === true)logfile("Warning_".$type.".log",gmdate(DATE_RFC822).": ".$warn);
}
?>