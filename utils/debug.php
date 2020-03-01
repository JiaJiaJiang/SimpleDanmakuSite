<?php
require_once(dirname(__FILE__)."/../config.php");
require_once(dirname(__FILE__).'/access.php');
define('STDOUT',fopen('php://stdout', 'a'));
define('STDERR',fopen('php://stderr', 'a'));

global $errorLog;
global $warnLog;
global $Logger;
$errorLog=defined('errorLog')&&errorLog===true;
$warnLog=defined('warnLog')&&warnLog===true;


function stdout($c){
	if(Access::devMode())fwrite(STDOUT, $c);
}
function stdoutl($c){
	if(Access::devMode())stdout($c.PHP_EOL);
}

class Log{
	private $errorLogFile;
	private $warnLogFile;
	function __construct(){
		global $errorLog;
		global $warnLog;
		$logPath=defined('logPath')?realpath(logPath):sys_get_temp_dir().DIRECTORY_SEPARATOR.'SimpleDanmakuSite';
		stdoutl('Log Path:'.$logPath);
		@mkdir($logPath,600,true);
		if($errorLog===true)$this->errorLogFile=fopen($logPath.DIRECTORY_SEPARATOR."SimpleDanmakuSite_Error.log",'a');
		if($warnLog===true)$this->warnLogFile=fopen($logPath.DIRECTORY_SEPARATOR."SimpleDanmakuSite_Warn.log",'a');
	}
	function error($type,$log){
		if(!$this->errorLogFile)return;
		$msg=gmdate(DATE_RFC822).": [$type]$log".PHP_EOL;
		fwrite($this->errorLogFile,$msg);
		fwrite(STDERR,'[error]'.$msg);
	}
	function warn($type,$log){
		if(!$this->warnLogFile)return;
		$msg=gmdate(DATE_RFC822).": [$type]$log".PHP_EOL;
		fwrite($this->warnLogFile,$msg);
		fwrite(STDOUT,'[warn]'.$msg);
	}
}

$Logger=new Log();

?>