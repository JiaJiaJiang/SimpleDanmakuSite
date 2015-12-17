<?php
if (hasFlag('help')) {
		_toLine("adddanmu用于添加一条弹幕，此命令通常由播放器调用', '        <b>adddanmu 视频id 弹幕类型 内容 所在时间 颜色 大小 存在服务器对应视频id的session</b>', '想手动调用此命令需要先打开对应视频页面获取playersse");
		exit();
}
$option = $options;
if (count($option) == 7) {
	if ($option[6] != $_SESSION['access' . $option[0]]) {
			echo ('Error:无法发送，请刷新页面');
			errorlog('adddanmu', 'Invalid access');
			exit();
	}
	$thit = gettimeofday();
	$thit = $thit['sec'];
	if (@$_SESSION['logged'] != true && array_key_exists('lastdanmutime:' . $option[0], $_SESSION)) {
			$lst = intval($_SESSION['lastdanmutime:' . $option[0]]);
			if (($thit - $lst) < 5) {
					echo 'Error:发送送间隔太小';
					flush();
					errorlog('adddanmu', 'Too small send interval');
					exit();
			}
	}
	$_SESSION['lastdanmutime:' . $option[0]] = $thit;
	connectSQL();
	Global $SQL;
	$videoid = $option[0];
	$type = $option[1];
	$content = $option[2];
	$time = $option[3];
	$color = $option[4];
	$size = intval($option[5]);
	if (!isID($videoid)) {
			echo 'Error:无效id.';
			errorlog('adddanmu', 'Invalid ID:' . $videoid);
			exit();
	}
	if ($type > 5 || $type < 0) {
			warnlog('adddanmu', 'A invalid type[.' . $type . '] received,replace it to 0');
			$type = 0;
	}
	if (($time % 1) != 0) {
			echo 'Error:时间错误';
			errorlog('adddanmu', 'Error time');
			exit();
	} else {
			$time = intval($time);
			$time = floor($time / 10) * 10;
	}
	if ($color != 'NULL') {
			preg_match('/[\w\d]{6}/i', $color, $matches);
			if ($matches[0]) {
					$color = $matches[0];
			} else {
					warnlog('adddanmu', 'A invalid color[.' . $color . '] received,replace it to NULL');
					$color = 'NULL';
			}
	} else {
			$color = NULL;
	}
	if ($size == 25 || $size == 30 || $size == 45) {
	} else {
			warnlog('adddanmu', 'A invalid size[.' . $size . '] received,replace it to 30');
			$size = 30;
	}
	$date = date('Y-m-d');
	$stmt = $SQL->prepare('INSERT into danmu (`id`, `videoid`, `type`, `content`, `time`, `color`, `size`,`date`) VALUES (NULL,?, ?, ?, ?, ?, ?,?)');
	$stmt->bind_param( 'iisisis', $videoid, $type, $content, $time, $color, $size, $date);
	$stmt->execute();
	if (mysqli_error($SQL)) {
			echo (mysqli_error($SQL));
			errorlog('adddanmu', 'A error returned after query the adddanmu sql:' . mysqli_error($SQL));
	} else {
			echo $SQL->insert_id;
	}
	$stmt->close();
	//$SQL->close();
	exit();
} else {
		echo 'Error:参数数量错误:';
		errorlog('adddanmu', 'Error arguments number');
		for ($i = 0; $i < count($option); $i++) {
				echo $option[$i] . ';';
		}
}
exit();
?>
