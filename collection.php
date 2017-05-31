<?php
$cid=@$_GET['id'];

require_once(dirname(__FILE__).'/utils/collection.php');
require_once(dirname(__FILE__).'/utils/common.php');
require_once(dirname(__FILE__).'/utils/access.php');
if(!isIntStr($cid)){
	http_response_code(400);
	exit;
}
$collOpt=new collection();

try{
	$collInfo=$collOpt->collection($cid,Access::hasLoggedIn());
	if(!$collInfo){
		http_response_code(404);
		exit;
	}
	foreach ($collInfo as $key => $value) {
		if(is_null($collInfo->$key))$collInfo->$key='';
	}
}catch(Exception $e){
	http_response_code(500);
	echo 'Error<BR>';
	require_once(dirname(__FILE__).'/utils/access.php');
	if(Access::hasLoggedIn()){
		echo '<div style="white-space:pre;">';
		var_dump($e);
		echo '</div>';
	}
	exit;
}
?>
<html>
<head>
	<meta charset="utf-8"/>
	<title></title>
	<script src='static/api.js?<?php modTime('static/api.js');?>'></script>
	<link rel="stylesheet" type="text/css" href="static/collection.css?<?php modTime('static/collection.css');?>">
</head>
<body>
<div id="collection_info">
	<h2 id="collection_name"></h2> <span id="desc"></span>
</div>
<div id="video_list"></div>
<iframe id="player_iframe" allowfullscreen></iframe>
</body>
<script>
var info=JSON.parse(base64.decode('<?php echo base64_encode(json_encode($collInfo,JSON_UNESCAPED_UNICODE));?>')),
	$=document.querySelector.bind(document);
function setText(ele,text){ele.appendChild(document.createTextNode(text));}
setText($('title'),info.name);
setText($('#collection_name'),info.name);
setText($('#desc'),info.description);
var vb=$('#video_list'),iframe=$('iframe');
info.list.forEach(function(v,i){
	var span=document.createElement('span');
	span.info=v;
	span.className='video_block';
	span.vid=v.vid;
	span.number=i+1;
	setText(span,i+1+' '+v.title);
	vb.appendChild(span);
});
vb.addEventListener('click',function(e){
	if(e.target.tagName!=='SPAN')return;
	changeVideo(e.target.vid);
});
function changeVideo(vid){
	for(var i=vb.childNodes.length;i--;){
		var s=vb.childNodes[i];
		if(s.vid==vid){
			location.hash=s.number;
			document.title=s.info.title+' | '+info.name;
			iframe.src='player/?id='+vid;
			s.scrollIntoView(false);
			return;
		}
	}
}
window.addEventListener('message',function(msg){
  var data=msg.data;
    if(typeof data =='object'&&data!=null){
      switch(data.type){
        case 'playerEvent':{
          if(data.name=='playerModeChange'){
            if(data.arg=='fullPage'){
              iframe.classList.add('fullPage');
            }else if(data.arg=='normal'){
              iframe.classList.remove('fullPage');
            }
          }
        }
      }
    }
});


window.addEventListener('load',function(){
	var number=location.hash.match(/\#(\d+)$/);
	number=(number)?Number(number[1]):1;
	for(var i=vb.childNodes.length;i--;){
		var s=vb.childNodes[i];
		if(s.number==number){
			changeVideo(s.vid);
			break;
		}
	}	
});

</script>
</html>
