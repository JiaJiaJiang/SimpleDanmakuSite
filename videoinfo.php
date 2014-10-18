<?php
//error_reporting(1);
include("funs.php");
$vid=@$_GET['id'];
if(!isID($vid))exit;
Global $SQL;
connectSQL();
$result=$SQL->query("SELECT title,count FROM video WHERE id=".$vid);
$get=$result->fetch_object();
$title=mb_convert_encoding($get->title, "utf-8", "auto");
$count=$get->count;
$result=$SQL->query("SELECT COUNT(*) from danmu WHERE videoid=".$vid);
$get=$result->fetch_object();
foreach ($get as $key => $value) {
	if($key=="COUNT(*)"){
		$danmucount=$value;
	}
}
?>
<html>
	<head>
		<meta charset="utf-8"/>
		<title><?php echo $title;?></title>
		<style>
		#title{

		}
		#info{
padding-left: 30px;
		}
		#go{
position: fixed;
bottom: 10px;
right: 10px;
display: block;
background-color: #66ccff;
color: #fff;
border-radius: 5px;
height: 50px;
width: 80px;
font-size: 30px;
line-height: 50px;
text-align: center;
text-decoration: none;
transition:background-color 0.5s;
		}
		#go:hover{
background-color: #74B0CE;
		}
		#videostat{
			width: 400px;
height: 200px;
position: absolute;
top: calc(50% - 100px);
left: calc(50% - 200px);
		}
		#vid{
font-size: 50px;
text-align: right;
margin: 19px;
position: absolute;
right: 10px;
		}
		</style>
	</head>
	<body>
	<div id="videostat">
	<h1 id="title"><?php echo $title;?></h1>
	<div id="info"><span>播放数:<?php echo $count;?></span>   <span>弹幕数:<?php echo $danmucount;?></span></div>
	<h1 id="vid"><i>#<?php echo $vid;?></i></h1>
	</div>
		<a id="go" target="_self" href="<?php echo 'miniplayer/player.php?id='.$vid;?>">载入</a>
	</body>
</html>
