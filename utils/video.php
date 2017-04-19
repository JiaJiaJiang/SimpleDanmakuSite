<?php
class Video{
	function __construct(){
		require_once('db.php');
		require_once('common.php');
		Video::$PDO=(new dbOpt())::$PDO;
	}
	static $PDO=null;

	function add($title,$address,$cover,$description,$options){
		requireLogin();
		$pre = Video::$PDO->prepare('INSERT into `video` (`title`, `address`, `cover`, `description`, `options`) VALUES (?, ?, ?, ?, ?)');
		$pre->execute(array($title,$address,$cover,$description,$options));
		return Video::$PDO->lastInsertId();
	}
	function has($vid){
		$pre = Video::$PDO->prepare('SELECT COUNT(*) AS videoCount FROM `video` WHERE vid=?');
		$pre->execute(array($vid));
		return ($pre->fetch(PDO::FETCH_OBJ)->videoCount)==1;
	}
	function delete($vid){
		requireLogin();
		if(!is_array($vid))$vid=array($vid);
		$count=count($vid);
		if($count==0)return 0;
		foreach ($vid as $value) {
			if(is_int($value))
				throw new Exception('Invalid video id');
		}
		$qustr=implode(',',array_fill(0,$count,'?'));//组成问号组
		$pre = Video::$PDO->prepare('DELETE FROM `video` WHERE vid IN('.$qustr.')');
		$pre->execute($vid);
		return $pre->rowCount();
	}
	function videoInfo($vid,$select){
		if(!isInt($vid))return false;
		$getOpt=array(
			'condition'=>array('vid=?'),
			'args'=>array($vid)
		);
		if(is_string($select)){
			$getOpt['select']=$select;
		}elseif(is_array($select)){
			$getOpt['select']=implode(',',$select);
		}
		return $this->get($getOpt)[0];
	}
	function get($option){
		if(is_array($option))$option=(object)$option;
		$condition=$option->condition;
		$args=$option->args;
		$limit=$option->limit;
		$select=$option->select?$option->select:'*';
		$order=$option->order?'DESC':'ASC';

		if(!is_array($conditions))
			throw new Exception("condition required");
		$sql='SELECT '.$select.' FROM `video` WHERE '.implode(' && ',$conditions).' ORDER BY `vid` '.$order;

		if(is_array($limit)){
			$sql.=(' LIMIT '.implode(',',array_fill(0,count($limit),'?')));
			$args=array_merge($args,$limit);
		}
		$pre = Video::$PDO->prepare($sql);
		$pre->execute($args);
		return $pre->fetchAll();
	}
}
?>