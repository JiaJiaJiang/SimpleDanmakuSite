<?php
require_once(dirname(__FILE__).'/db.php');
class Video extends commonDBOpt{
	function __construct(){
		parent::__construct('video','vid',array('title','address','cover','description','hidden','date','option','cid'));
	}
	static $errorInfo=array(
		1062=>'标题重复',
		1452=>'无对应合集',
	);
	function add($info){
		Access::requireLogin();
		if(!isset($info->date))$info->date=time();
		return parent::add($info);
	}
	function update($vid,$info){
		Access::requireLogin();
		return parent::update($vid,$info);
	}
	function delete($vid){
		Access::requireLogin();
		require_once(dirname(__FILE__).'/danmaku.php');
		if(!is_array($vid))$vid=array($vid);
		$count=count($vid);
		if($count==0)return 0;
		$rowCount=parent::delete($vid);
		$dnmakuOpt=new Danmaku();
		$dnmakuOpt->deleteByVid($vid);
		return $rowCount;
	}
	function videoInfo($vid,$select='V.*',$showHidden=false){//此函数不会检查select的内容，调用前需注意
		if(!isInt($vid))
			throw new Exception('vid错误'.$vid,-1);
		if(!is_array($select))$select=array($select);
		if(count($select)==0)$select='V.*';
		dbOpt::checkSelectorArray($select);
		$select=implode(',',$select);
		$sql='SELECT '.$select.' FROM `video` AS V
LEFT JOIN `collection` AS C
ON V.cid=C.cid
WHERE V.vid=?'.($showHidden?'':' && V.hidden=0 && (ISNULL(C.hidden)||C.hidden=0)');
		$pre = dbOpt::$PDO->prepare($sql);
		$pre->execute(array($vid));
		$result=$pre->fetch();
		require_once(dirname(__FILE__).'/../utils/convertLink.php');
		if(@$result->cover)$result->cover=convertLink($result->cover,true);
		return $result;
	}
	function get($arg){
		Access::requireLogin();
		if(!is_array(@$arg->condition))$arg->condition=array();
		if(!is_array(@$arg->arg))$arg->arg=array();
		if(@$arg->search){//添加搜索条件
			array_push($arg->condition,'(vid=? || cid=? || title LIKE ? || description LIKE ?)');
			array_push($arg->arg,$arg->search,$arg->search,'%'.$arg->search.'%','%'.$arg->search.'%');
		}
		if(isValidId(@$arg->vid)){//获取单个视频信息
			array_push($arg->condition,'vid=?');
			array_push($arg->arg,$arg->vid);
		}
		if(isValidId(@$arg->cid)){//获取合集视频信息
			array_push($arg->condition,'cid=?');
			array_push($arg->arg,$arg->cid);
		}
		if(count($arg->condition)===0)$arg->condition=NULL;
		return parent::get($arg);
	}
}
?>