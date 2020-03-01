<?php
require_once(dirname(__FILE__).'/db.php');

class Danmaku extends commonDBOpt{
	function __construct(){
		parent::__construct('danmaku','did',array('vid','content','mode','time','color','size','date'));
	}
	static function validateDanmaku(&$dmObj){
		if(is_array($dmObj))$dmObj=(object)$dmObj;
		if(!is_object($dmObj))
			throw new Exception('Items is not a object',-1);
		if(!isInt(@$dmObj->vid)||$dmObj->vid<0)
			throw new Exception('Invalid video id :'.$dmObj->vid);
		if(!isInt(@$dmObj->time)|| $dmObj->time<0)
			throw new Exception('Invalid danmaku time :'.$dmObj->time);
		if(trim(@$dmObj->content)=='')
			throw new Exception('Invalid danmaku content');
		if((@$dmObj->color=trim(@$dmObj->color))&&!(@$dmObj->color=isValidColor(@$dmObj->color)))
			throw new Exception('Invalid danmaku color :'.$dmObj->color);

		$dmObj->mode=intval(@$dmObj->mode);
		$dmObj->time=intval(@$dmObj->time);
		$dmObj->size=intval(@$dmObj->size);
		if(defined('allowedDanmakuSize')){
			$list=json_decode(allowedDanmakuSize);
			if(!is_array($list)){
				$Logger->error('setting','allowedDanmakuSize is not a json type array');
				return;
			}
			
			if(!in_array($dmObj->size,$list)){
				$nearest=0;
				$minabs=0x7fffffff;
				foreach($list as &$s) {
					$abs=abs($s-$dmObj->size);
					if($abs<$minabs){
						$minabs=$abs;
						$nearest=$s;
					}
				}
				$dmObj->size=$nearest;
			}
		}
		if($dmObj->mode<0||$dmObj->mode>3)$dmObj->mode=0;
		if(!isset($dmObj->date))$dmObj->date=time();
	}
	function add($it){//添加弹幕，返回id
		// stdoutl(json_encode($it));
		Danmaku::validateDanmaku($it);
		return parent::add(@$it);
	}
	function batchAdd($list){
		foreach($list as &$info){
			Danmaku::validateDanmaku($info);
		}
		return parent::batchAdd($list);
	}
	function delete($id){//删除一条或多条弹幕，返回影响的行数
		Access::requireLogin();
		return parent::delete($id);
	}
	function deleteByVid($vid){//删除一个或多个视频的弹幕，返回影响的行数
		Access::requireLogin();
		$this->idName='vid';
		$row=parent::delete($vid);
		$this->idName='did';//恢复idName
		return $row;
	}
	function update($id,$opt){
		Access::requireLogin();
		return parent::update($id,$opt);
	}
	function get($arg){
		if(is_array($arg))$arg=(object)$arg;
		if(!is_array(@$arg->condition))$arg->condition=array();
		if(!is_array(@$arg->arg))$arg->arg=array();
		if(@$arg->search){//添加搜索条件
			array_push($arg->condition,'(did=? || content LIKE ?)');
			array_push($arg->arg,$arg->search,'%'.$arg->search.'%');
		}
		if(isValidId(@$arg->vid)){
			array_push($arg->condition,'(vid=?)');
			array_push($arg->arg,$arg->vid);
		}
		if(count($arg->condition)===0)$arg->condition=NULL;
		return parent::get($arg);
	}
}
?>