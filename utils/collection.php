<?php
require_once(dirname(__FILE__).'/db.php');

class Collection extends commonDBOpt{
	function __construct(){
		parent::__construct('collection','cid',array('name','description','hidden'));
	}
	static $errorInfo=array(
		1062=>'合集名重复',
		1451=>'还存在绑定于此合集的视频',
		1452=>'无对应合集',
	);

	function add($info){
		Access::requireLogin();
		return parent::add($info);
	}
	function update($cid,$info){
		Access::requireLogin();
		return parent::update($cid,$info);
	}
	function delete($cid){
		Access::requireLogin();
		if(!is_array($cid))$cid=array($cid);
		$count=count($cid);
		if($count==0)return 0;
		return parent::delete($cid);
	}
	function get($option){
		Access::requireLogin();
		if(is_array($option))$option=(object)$option;
		require_once(dirname(__FILE__).'/access.php');
		if(!Access::hasLoggedIn())$option->limit=array(1);
		return parent::get($option);
	}

	function execute($pdostat,$arg){
		try{
			return $pdostat->execute($arg);
		}catch(Exception $e){
			$vioCode=dbOpt::getViolationCode($e);
			$msg=@Collection::$errorInfo[$vioCode];
			if($msg)throw new Exception($msg,$vioCode);
			throw $e;
		}
	}
}
?>