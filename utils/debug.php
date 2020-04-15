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
	private $logReady=false;
	private $logPath;
	function __construct(){
	}
	function init(){
		if($this->logReady)return;
		$this->logPath=defined('logPath')?realpath(logPath):false;
		if($this->logPath==false)return;
		global $errorLog;
		global $warnLog;
		// stdoutl('Log Path:'.$logPath);
		@mkdir($logPath,600,true);
		if($errorLog===true)$this->errorLogFile=fopen($logPath.DIRECTORY_SEPARATOR."SimpleDanmakuSite_Error.log",'a');
		if($warnLog===true)$this->warnLogFile=fopen($logPath.DIRECTORY_SEPARATOR."SimpleDanmakuSite_Warn.log",'a');
		$this->logReady=true;
	}
	function error($type,$log){
		global $errorLog;
		if($errorLog!==true)return;
		if(!$this->logReady){
			$this->init();
		}
		if(!$this->errorLogFile)return;
		$msg=gmdate(DATE_RFC822).": [$type]$log".PHP_EOL;
		fwrite($this->errorLogFile,$msg);
		fwrite(STDERR,'[error]'.$msg);
	}
	function warn($type,$log){
		global $warnLog;
		if($warnLog!==true)return;
		if(!$this->logReady){
			$this->init();
		}
		if(!$this->warnLogFile)return;
		$msg=gmdate(DATE_RFC822).": [$type]$log".PHP_EOL;
		fwrite($this->warnLogFile,$msg);
		fwrite(STDOUT,'[warn]'.$msg);
	}
}

$Logger=new Log();

?>