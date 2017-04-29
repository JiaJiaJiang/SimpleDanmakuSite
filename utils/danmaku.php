<?php
require_once(dirname(__FILE__).'/db.php');

class Danmaku extends commonDBOpt{
	function __construct(){
		parent::__construct('danmaku','did',array('vid','content','type','time','color','size'));
	}

	function add($it){//添加弹幕，返回id
		if(is_array($it))$it=(object)$it;
		if(!is_object($it))
			throw new Exception('Items is not a object',-1);
		if(!isInt(@$it->vid))
			throw new Exception('Invalid video id');
		if(!isInt(@$it->$time)|| $it->$time<0)
			throw new Exception('Invalid danmaku time');
		if(trim(@$it->$content)=='')
			throw new Exception('Invalid danmaku content');
		if((@$it->$color=trim(@$it->$color))&&!(@$it->$color=isValidColor(@$it->$color)))
			throw new Exception('Invalid danmaku color');

		$it->$type=intval(@$it->$type);
		$it->$time=intval(@$it->$time);
		$it->$size=intval(@$it->$size);
		if($it->$type<0||$it->$type>3)$it->$type=0;

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
	function get($option){
		return parent::get($option);
	}
}
?>