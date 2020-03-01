<?php
require_once('../utils/access.php');
require_once('../utils/common.php');

if(!Access::hasLoggedIn()){//没有登录跳转到登录
	require_once('login.php');
	exit;
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>管理</title>
	<script src="../<?php pModTime('static/api.js');?>"></script>
	<script src="../<?php pModTime('static/vue.min.js');?>"></script>
	<script src="../<?php pModTime('static/floatWindow.js');?>"></script>
<link rel="stylesheet" type="text/css" href="../<?php pModTime('static/admin/admin.css');?>">
</head>
<body>
	<div><?php include('./templates.php');?></div>
	<div id="frame">
		<h1>管理</h1>
		<hr/>
		<button onclick="location='login.php?exit=1'" class="main">登出</button>
		<?php
			function cmp($a, $b)
			{
				return $a->index-$b->index;
			}
			$page_list=glob('page/*.php',GLOB_NOESCAPE|GLOB_NOSORT);
			$info=array();
			foreach($page_list as $name) {
				$pageInfo=include($name);
				$pageInfo->page=substr($name,5,-4);
				array_push($info,$pageInfo);
			}
			usort($info, "cmp");
			foreach($info as $page) {
				echo "<a href='?page=$page->page' class=\"main\">$page->name</a>";
			}
		?>
		<?php
		$getPage=true;
		if(($page=@$_GET['page']) && preg_match("/^[\w\d]+$/",$page)){
		}else{$page='video';}
		?>
		<div id="el_pageFrame" page="<?php echo $page;?>">
		<?php include("page/$page.php");?>
		</div>
	</div>
	<?php
		$plugin_list=glob("plugins/*.$page.php",GLOB_NOESCAPE);//页面插件
		$plugin_list=array_merge($plugin_list,glob("plugins/*.common.php",GLOB_NOESCAPE));//通用插件
		foreach($plugin_list as $name) {
			include($name);//加载插件
		}
	?>
</body>
</html>