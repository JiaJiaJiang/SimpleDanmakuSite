<?php
require_once(dirname(__FILE__).'/db.php');

class Collection extends commonDBOpt{
	function __construct(){
		parent::__construct('collection','cid',array('name','description','hidden'));
	}

	function add($info){
		Access::requireLogin();
		try{
			return parent::add($info);
		}catch(Exception $e){
			if(preg_match('/1062/', $e->getMessage())){
				throw new Exception("合集名重复", -2);
			}
			throw $e;
		}
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
}
?>