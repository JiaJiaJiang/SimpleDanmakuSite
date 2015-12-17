<?php
$option = $options;
header('Content-Type:text/json', true);
global $fromconsole;
if (isID($option[0])) {
	connectSQL();
	Global $SQL;
	Global $flags;
	$stmt = $SQL->prepare('SELECT title,address,count,coveraddress,description,options FROM video WHERE id=?');
	$stmt->bind_param('i', $option[0]);
	$stmt->execute();
	$stmt->bind_result($vtitle,$vaddr,$c,$cv,$des,$opt);
	$stmt->fetch();

	if (!$vaddr) {
		echo 'Error';
		errorlog('getVideo','No address got');
		return;
	}
	if (!$c) {
		$c = 0;
	} 
	$addr=translateAddress($vaddr);
	$json=array('url'=> $addr,'count'=>$c);
	if(in_array('t',$flags)){
		$json['t']=$vtitle;
	}
	if(in_array('des',$flags)){
		$json['des']=$des;
	}
	if(in_array('cv',$flags)){
		$json['cv']=$cv;
	}
	if(in_array('opt',$flags)){
		$json['opt']=json_decode($opt);
	}
	echo json_encode($json,JSON_UNESCAPED_UNICODE);
	$stmt->close();
	$SQL->query('UPDATE video SET count=count+1 WHERE id='.$option[0]);
	//$SQL->close();
} else {
	echo 'Error';
	errorlog('getVideo','Error args');
}
exit();
?>