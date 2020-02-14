<?php
require_once(dirname(__FILE__).'/db.php');
require_once(dirname(__FILE__).'/access.php');

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
	function get($arg){
		Access::requireLogin();
		if(is_array($arg))$arg=(object)$arg;
		if(!Access::hasLoggedIn())$arg->limit=array(1);
		if(@$arg->search){
			$arg->condition=array('(cid=? || name LIKE ? || description LIKE ?)');
			$arg->arg=array($arg->search,'%'.$arg->search.'%','%'.$arg->search.'%');
		}
		if(@$arg->cid){//获取合集视频信息
			$arg->condition=array('cid=?');
			$arg->arg=array($arg->cid);
		}
		if(@$arg->withVideoCount){//获取视频数量
			$arg->extraItem=array('(select count(*) from video where cid=T.cid) as vCount');
		}
		return parent::get($arg);
	}
/* 	function getWithVideoCount($option){
		Access::requireLogin();
		if(is_array($option))$option=(object)$option;
		if(!is_object($option))
			throw new Exception('option不是一个对象',-1);
		$countMode=@$option->countMode==true;
		$condition=@$option->condition;
		$arg=is_array(@$option->arg)?$option->arg:array();
		$limit=@$option->limit;
		$rawItem=@$option->item;
		$select=is_array(@$option->item)?implode(',',dbOpt::checkSelectorArray($option->item)):'*';//item参数需要为数组，否则会变成*
		$order=@$option->order?$option->order:'DESC';

		if($select!='*' && $rawItem){
			foreach ($rawItem as $key) {
				if(!preg_match('/^\w+(\ AS \w+)?$/', $key))
					throw new Exception('项名错误:'.$key,-1);
			}
		}
		if($countMode)$select='count(*) AS resultCount';
		$sql='SELECT '.$select.' FROM `collection` AS C
left JOIN(
	SELECT cid as vcid,count(*) as `vCount` FROM `video`
	where cid is not null
	group by cid
) AS V
on C.cid=V.vcid
'.(is_array($condition)?('WHERE '.implode(' && ',$condition)):'');
		if(!$countMode){
			$sql.=' ORDER BY `'.$this->idName.'` '.$order;
			if(is_array($limit)){
				foreach ($limit as $key => $value) {
					$limit[$key]=intval($value);
				}
				$sql.=(' LIMIT '.implode(',',array_fill(0,count($limit),'?')));
				$arg=array_merge($arg,$limit);
			}
		}
		$pre = dbOpt::$PDO->prepare($sql);
		$this->execute($pre,$arg);
		return $pre->fetchAll();
	} */
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
		$this->execute($pre,array($cid));
		$videoList=$pre->fetchAll();
		$res->list=is_array($videoList)?$videoList:array();
		return $res;
	}
}
?>