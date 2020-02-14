<?php
require_once(dirname(__FILE__).'/db.php');

class Danmaku extends commonDBOpt{
	function __construct(){
		parent::__construct('danmaku','did',array('vid','content','mode','time','color','size','date'));
	}

	function add($it){//添加弹幕，返回id
		stdoutl(json_encode($it));
		if(is_array($it))$it=(object)$it;
		if(!is_object($it))
			throw new Exception('Items is not a object',-1);
		if(!isInt(@$it->vid))
			throw new Exception('Invalid video id');
		if(!isInt(@$it->time)|| $it->time<0)
			throw new Exception('Invalid danmaku time');
		if(trim(@$it->content)=='')
			throw new Exception('Invalid danmaku content');
		if((@$it->color=trim(@$it->color))&&!(@$it->color=isValidColor(@$it->color)))
			throw new Exception('Invalid danmaku color');

		$it->mode=intval(@$it->mode);
		$it->time=intval(@$it->time);
		$it->size=intval(@$it->size);
		if(defined('allowedDanmakuSize')){
			$list=json_decode(allowedDanmakuSize);
			if(!in_array($it->size,$list)){
				$nearest=0;
				$minabs=0x7fffffff;
				foreach ($list as $s) {
					$abs=abs($s-$it->size);
					if($abs<$minabs){
						$minabs=$abs;
						$nearest=$s;
					}
				}
				$it->size=$nearest;
			}
		}
		if($it->mode<0||$it->mode>3)$it->mode=0;

		return parent::add(@$it);
	}
	function delete($id){//删除一条或多条弹幕，返回影响的行数
		Access::requireLogin();
		return parent::delete($id);
	}
	function deleteByVid($vid){//删除一个或多个视频的弹幕，返回影响的行数
		Access::requireLogin();
		$this->idName='vid';
		$row=parent::delete($vid);
		$this->idName='did';
		return $row;
	}
	function update($id,$opt){
		Access::requireLogin();
		return parent::update($id,$opt);
	}
	function get($arg){
		if(!is_array(@$arg->condition))$arg->condition=array();
		if(!is_array(@$arg->arg))$arg->arg=array();
		if(@$arg->search){//添加搜索条件
			array_push($arg->condition,'(did=? || content LIKE ?)');
			array_push($arg->arg,$arg->search,'%'.$arg->search.'%');
		}
		if(@$arg->vid){
			array_push($arg->condition,'(vid=?)');
			array_push($arg->arg,$arg->vid);
		}
		if(count($arg->condition)===0)$arg->condition=NULL;
		return parent::get($arg);
	}
}
?>