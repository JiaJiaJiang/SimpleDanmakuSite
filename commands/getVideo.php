<?php
$option = $options;
header('Content-Type:text/json', true);
if (isID($option[0])) {
	connectSQL();
	Global $SQL;
	Global $flags;
	$stmt = $SQL->prepare('SELECT title,address,count,coveraddress,description,options FROM video WHERE id=?');
	$stmt->bind_param('i', $option[0]);
	$stmt->execute();
	$stmt->bind_result($title,$address,$count,$coveraddress,$description,$options);
	$stmt->fetch();
	if (! $address) {
		echo 'Error';
		errorlog('getVideo','No address got');
		return;
	}
	if (!$count) {
		$count = 0;
	} 
	$addr=translateAddress($address);
	$json=array('url'=> $addr,'count'=>$count);
	if(in_array('t',$flags)){
		$json['t']=$title;
	}
	if(in_array('des',$flags)){
		$json['des']=$description;
	}
	if(in_array('cv',$flags)){
		$json['cv']=$coveraddress;
	}
	if(in_array('opt',$flags)){
		$json['opt']=json_decode($options);
	}
	echo json_encode($json,JSON_UNESCAPED_UNICODE);
	$stmt->close();
	$SQL->query('UPDATE video SET count=count+1 WHERE id='.$option[0]);
	$SQL->close();
} else {
	echo 'Error';
	errorlog('getVideo','Error args');
}
exit();
?>