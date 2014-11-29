<?php
//error_reporting(1);
include("funs.php");
$vid=@$_GET['id'];
if(!isID($vid))exit;
Global $SQL;
connectSQL();
$result=$SQL->query("SELECT title,count,coveraddress,description FROM video WHERE id=".$vid);
$get=$result->fetch_object();
$title=htmlentities(mb_convert_encoding($get->title, "utf-8", "auto"),ENT_QUOTES,"UTF-8");
$count=$get->count;
$cv=$get->coveraddress;
$des=$get->description;
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
			margin: 0px 7px;
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
margin: 0px 21px;
position: absolute;
right: 10px;
		}
		#newwindowplayerbutton{
			position: absolute;
top: 0px;
right: 0px;
font-size: 24px;
background-color: #EDEDED;
cursor: pointer;
width: 27px;
height: 27px;
line-height: 27px;
text-align: center;
		}
		body{
			margin:0px;
			padding: 0px;
		}
		.des{
			display: block;
width: 343px;
height: 68px;
overflow: auto;
font-size: medium;
color: #594D4D;
		}
		</style>
		<script>
		function openFullPlayer(){
			var w=window.open("player/?id=<?php echo $vid;?>",'<?php echo $title;?>',"width=900,height=580,menubar=no,toolbar=no, location=no,directories=no,status=no,scrollbars=no,resizable=yes");
			w.document.title='<?php echo $title;?>';
		}
		</script>
	</head>
	<body>
	<div id="newwindowplayerbutton" onclick="openFullPlayer()">⿻</div>
	<div id="videostat">
		<h1 id="title"><?php echo $title;?></h1>
		<div id="info"><span>播放数:<?php echo $count;?></span>   <span>弹幕数:<?php echo $danmucount;?></span>
		<span class="des"><?php echo $des;?></span>
		</div>
		<h1 id="vid"><i>#<?php echo $vid;?></i></h1>
	</div>
		<a id="go" target="_self" href="<?php echo 'miniplayer/player.php?id='.$vid;?>">载入</a>
	</body>
	<?php if(@$cv){?>
	<style>
	#bg{
		position: fixed;
		z-index: -1;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		opacity: 0;
		transition:opacity 0.5s;
		background-size: cover;
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
	}
	#videostat {
top: calc(50% - 104px) !important;
left: calc(50% - 204px) !important;
background-color: rgba(63, 56, 56, 0.18);
border-radius: 5px;
padding: 8px;
text-shadow: 0px 0px 22px #fff;
transition: background-color 0.4s;
}
#videostat:hover{
background-color: rgba(166, 176, 175, 0.53);
}
#vid{
	font-size: 67px  !important;
}
#info{
font-size: 18px;
font-family: "微软雅黑","黑体";
}
	</style>
	<script>
	var body=document.body,cvadd="<?php echo $cv;?>";
	if(cvadd){
		window.onmouseover=function(){
			var bgimg=new Image(),div=document.createElement("div"),on=true;
			div.id="bg";
			body.appendChild(div);
			bgimg.onload=function(){//利用统一资源机制把此img和背景设置成同样的资源，此处onload即表示背景图也加载好了,我真是太机智了
				console.log("背景已载入");
				if(on==true){
					div.style.opacity=0.7;
				}else{
					div.style.opacity=0.4;
				}
				div.style.backgroundImage="url('"+cvadd+"')";
			}
			div.style.backgroundImage="url('"+cvadd+"')";
			bgimg.src=cvadd;
			window.onmouseover=function(){
				on=true;
				div.style.opacity=0.7;
			}
			window.onmouseout=function(){
				on=false;
				div.style.opacity=0.4;
			}
		}
	}
	</script>
	<?php } ?>
</html>
