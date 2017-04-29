<?php
require_once(dirname(__FILE__).'/db.php');
class Video extends commonDBOpt{
	function __construct(){
		parent::__construct('video','vid',array('title','address','cover','description','hidden','date','option'));
	}
	function add($info){
		Access::requireLogin();
		try{
			return parent::add($info);
		}catch(Exception $e){
			if(preg_match('/1062/', $e->getMessage())){
				throw new Exception("标题重复", -2);
			}
			throw $e;
		}
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
	function videoInfo($vid,$select='*',$showHidden=false){
		if(!isInt($vid))
			throw new Exception('vid错误'.$vid,-1);
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
		return parent::get($option);
	}
}
?>