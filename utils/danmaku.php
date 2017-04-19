<?php

class Danmaku{
	function __construct(){
		require_once('db.php');
		require_once('common.php');
		Danmaku::$PDO=(new dbOpt())::$PDO;
		$this->$writableColumn=array('vid','content','type','time','color','size');
	}
	static $PDO=null;
	
	function add($vid,$content,$type,$time,$color,$size){//添加弹幕，返回id
		if(!is_int($vid)&&!isIntStr($vid))
			throw new Exception('Invalid video id');
		if((!is_int($time)&&!isIntStr($time))||$time<0)
			throw new Exception('Invalid danmaku time');
		if(trim($content)=='')
			throw new Exception('Invalid danmaku content');
		if(($color=trim($color))&&!($color=isValidColor($color)))
			throw new Exception('Invalid danmaku color');

		$type=intval($type);
		$time=intval($time);
		$size=intval($size);
		$date=@date_timestamp_get(date_create());
		if($type<0||$type>3)$type=0;

		$pre = Danmaku::$PDO->prepare('INSERT into `danmaku` (`vid`, `mode`, `content`, `time`, `color`, `size`,`date`) VALUES (?, ?, ?, ?, ?, ?,?)');
		$pre->execute(array($vid,$type,$content,$time,$color,$size,$date));
		return Danmaku::$PDO->lastInsertId();
	}
	function has($id){//返回是否有对应id的弹幕
		$this->checkID($id);
		$pre = Danmaku::$PDO->prepare('SELECT COUNT(*) AS danmakuCount FROM `danmaku` WHERE did=?');
		$pre->execute(array($id));
		return ($pre->fetch(PDO::FETCH_OBJ)->danmakuCount)==1;
	}
	function delete($id){//删除一条或多条弹幕，返回影响的行数
		requireLogin();
		if(!is_array($id))$id=array($id);
		$count=count($id);
		if($count==0)return 0;
		foreach ($id as $value) {//检查所有id
			$this->checkID($value);
		}
		$qustr=implode(',',array_fill(0,$count,'?'));
		$pre = Danmaku::$PDO->prepare('DELETE FROM `danmaku` WHERE did IN('.$qustr.')');
		$pre->execute($id);
		return $pre->rowCount();
	}
	function update($id,$opt){
		requireLogin();
		$this->checkID($id);
		if(is_array($opt))$opt=(object)$opt;
		$name=array();
		$args=array();
		foreach ($opt as $key => $value) {
			if(!in_array($key,$this->$writableColumn))
				throw new Exception('Invalid option name');
			$name[]=$key;
			$args[]=$value;
		}

		$pre = Danmaku::$PDO->prepare('DELETE FROM `danmaku` WHERE `vid` =?');
		$pre->execute($args);
		return $pre->rowCount();
	}
	function deleteAllOf($vid){//删除一个视频的所有弹幕，返回影响的行数
		requireLogin();
		$this->checkID($vid);
		$pre = Danmaku::$PDO->prepare('DELETE FROM `danmaku` WHERE `vid` =?');
		$pre->execute(array($vid));
		return $pre->rowCount();
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
		$sql='SELECT '.$select.' FROM `danmaku` WHERE '.implode(' && ',$conditions).' ORDER BY `did` '.$order;

		if(is_array($limit)){
			$sql.=(' LIMIT '.implode(',',array_fill(0,count($limit),'?')));
			$args=array_merge($args,$limit);
		}
		$pre = Danmaku::$PDO->prepare($sql);
		$pre->execute($args);
		return $pre->fetchAll();
	}
	function checkID($id){
		if(!isInt($id))
			throw new Exception('Invalid danmaku id');
	}
}
?>