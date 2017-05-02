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
	function collection($cid,$showHidden=false){
		if(!isInt($cid))
			throw new Exception('cid错误'.$cid,-1);
		$pre = dbOpt::$PDO->prepare(
			'SELECT name,description FROM `collection` WHERE cid=?'.($showHidden?'':' && hidden=0')
		);
		$this->execute($pre,array($cid));
		$res=$pre->fetch();
		if(!$res)return null;
		$pre = dbOpt::$PDO->prepare(
			'SELECT vid,title FROM `video` WHERE cid=?'.($showHidden?'':' && hidden=0')
		);
		$videoList=$pre->fetchAll();
		$res->list=is_array($videoList)?$videoList:array();
		return $res;
	}
}
?>