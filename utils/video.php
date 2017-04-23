<?php
class Video{
	function __construct(){
		require_once('db.php');
		require_once('common.php');
		Video::$PDO=dbOpt::$PDO;
	}
	static $PDO=null;

	function add($info){
		Access::requireLogin();
		if(is_array($info))$info=(object)$info;
		if(!is_object($info))
			throw new Exception('Info is not a object',-1);
		$pre = Video::$PDO->prepare('INSERT INTO `video` (`title`,`address`,`cover`,`description`,`hidden`,`date`,`option`) VALUES (?,?,?,?,?,?,?)');
		$pre->execute(array($info->title,$info->address,$info->cover,$info->description,$info->hidden,time(),$info->option));
		return Video::$PDO->lastInsertId();
	}
	function update($vid,$info){
		Access::requireLogin();
		if(!isInt($vid))
			throw new Exception('Invalid vid',-1);
		if(is_array($info))$info=(object)$info;
		if(!is_object($info))
			throw new Exception('Info is not a object',-1);
		$items=array();
		$values=array();
		foreach ($info as $key => $value) {
			if(!preg_match('/^[\d\w]+$/', $key))
				throw new Exception('Invalid item name',-1);
			$items[]="`$key`=?";
			$values[]=$value;
		}
		$values[]=$vid;
		$itemStr=implode(',', $items);
		$sql='UPDATE `video` SET '.$itemStr.' WHERE vid=?';
		stdoutl("value count:".count($values));
		stdoutl("SQL:".$sql);
		stdoutl("values:".implode(' ', $values));
		$pre = Video::$PDO->prepare($sql);
		$pre->execute($values);
		return $pre->rowCount();
	}
	function has($vid){
		if(!isInt($vid))
			throw new Exception('Invalid vid',-1);
		$pre = Video::$PDO->prepare('SELECT COUNT(*) AS videoCount FROM `video` WHERE vid=?');
		$pre->execute(array($vid));
		return ($pre->fetch(PDO::FETCH_OBJ)->videoCount)==1;
	}
	function delete($vid){
		Access::requireLogin();
		if(!is_array($vid))$vid=array($vid);
		$count=count($vid);
		if($count==0)return 0;
		foreach ($vid as $value) {
			if(is_int($value))
				throw new Exception('Invalid video id',-1);
		}
		$qustr=implode(',',array_fill(0,$count,'?'));//组成问号组
		$pre = Video::$PDO->prepare('DELETE FROM `video` WHERE vid IN('.$qustr.')');
		$pre->execute($vid);
		return $pre->rowCount();
	}
	function videoInfo($vid,$select){
		if(!isInt($vid))
			throw new Exception('Invalid vid',-1);
		$getOpt=array(
			'condition'=>array('vid=?','hidden=0'),
			'args'=>array($vid),
			'limit'=>1
		);
		if(is_string($select)){
			$getOpt['select']=$select;
		}elseif(is_array($select)){
			$getOpt['select']=implode(',',$select);
		}
		return (object)($this->get($getOpt)[0]);
	}
	function get($option){
		if(is_array($option))$option=(object)$option;
		$condition=@$option->condition;
		$args=@$option->args;
		$limit=@$option->limit;
		$select=is_array(@$option->item)?implode(',',$option->item):'*';
		$order=@$option->order?$option->order:'DESC';

		/*if(!is_array($condition))
			throw new Exception("condition required",-1);*/
		$sql='SELECT '.$select.' FROM `video` '.(is_array($condition)?('WHERE '.implode(' && ',$condition)):'').' ORDER BY `vid` '.$order;

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