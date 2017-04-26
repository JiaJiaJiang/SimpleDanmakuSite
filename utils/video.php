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
			if(!is_int($value))
				throw new Exception('Invalid video id:'.$value,-1);
		}
		$qustr=implode(',',array_fill(0,$count,'?'));//组成问号组
		$pre = Video::$PDO->prepare('DELETE FROM `video` WHERE vid IN('.$qustr.')');
		$pre->execute($vid);
		return $pre->rowCount();
	}
	function videoInfo($vid,$select='*',$showHidden=false){
		if(!isInt($vid))
			throw new Exception('Invalid vid',-1);
		if(is_array($select)){
			dbOpt::checkSelectorArray($select);
			$getOpt['select']=implode(',',$select);
		}
		$sql='SELECT '.$select.' FROM `video` AS V
LEFT JOIN `collection` AS C
ON V.cid=C.cid
WHERE V.vid=?'.($showHidden?'':' && V.hidden=0 && (ISNULL(C.hidden)||C.hidden=0)');
		$pre = Video::$PDO->prepare($sql);
		$pre->execute(array($vid));
		return $pre->fetch();
	}
	function get($option){
		Access::requireLogin();
		if(is_array($option))$option=(object)$option;
		if(!is_object($option))
			throw new Exception('Option is not a object',-1);
		$countMode=@$option->countMode==true;
		$condition=@$option->condition;
		$arg=@$option->arg?$option->arg:array();
		$limit=@$option->limit;
		$select=is_array(@$option->item)?implode(',',dbOpt::checkSelectorArray($option->item)):'*';//item参数需要为数组，否则会变成*
		$order=@$option->order?$option->order:'DESC';

		if($select!='*' && @$option->limit){
			foreach ($option->limit as $key => $value) {
				if(!preg_match('/^[\d\w]+$/', $key))
					throw new Exception('Invalid item name',-1);
			}
		}
		if($countMode)$select='count(*) AS resultCount';
		$sql='SELECT '.$select.' FROM `video` '.(is_array($condition)?('WHERE '.implode(' && ',$condition)):'');
		if(!$countMode){
			$sql.=' ORDER BY `vid` '.$order;
			if(is_array($limit)){
				foreach ($limit as $key => $value) {
					$limit[$key]=intval($value);
				}
				$sql.=(' LIMIT '.implode(',',array_fill(0,count($limit),'?')));
				$arg=array_merge($arg,$limit);
			}
		}
//stdoutl("value count:".count($values));
//stdoutl("values:".implode(' ', $values));

		
stdoutl("SQL:".$sql);
stdoutl("values:".implode(' ', $arg));


		$pre = Video::$PDO->prepare($sql);
		$pre->execute($arg);
		return $pre->fetchAll();
	}
}
?>