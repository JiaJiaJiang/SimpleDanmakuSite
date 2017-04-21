<?php
require_once ("../config.php");


function initPDO(){
	if(dbOpt::PDO)return dbOpt::PDO;
	if(!dbName)throw new Exception('dbName is not defined');
	$connectionInfo='mysql:';
	if(constant('dbHost'))$connectionInfo.=('host='.dbHost.';');
	if(constant('dbPort'))$connectionInfo.=('port='.dbPort.';');
	if(constant('dbUnixSocket'))$connectionInfo.=('unix_socket='.dbUnixSocket.';');
	$connectionInfo.=('dbname='.dbName.';');
	dbOpt::$PDO=new PDO($connectionInfo,dbUser,dbPass,array(
	    PDO::$MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
	));
}

class dbOpt{
	function __construct(){
		if(dbOpt::$PDO)return;
		initPDO();
	}
    static $PDO=null;
}

new dbOpt();
/*
function ColumnExists($table, $key) {
	Global $SQL;
	if (!$SQL) {
		connectSQL();
	}
	$result = $SQL->query("describe $table $key");
	$result = $result->fetch_array();
	if ($result === NULL) {
		return false;
	}
	return true;
}*/

?>