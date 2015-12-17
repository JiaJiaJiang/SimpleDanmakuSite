<?php
require_once ("config.php");
session_start();
if (!@$_SESSION['logged']) $_SESSION['logged'] = false;
function connectSQL() {
	Global $SQL;
	if (@$SQL != NULL) {
		return true;
	}
	if(!dbname){
		out('未找到配置文件中的dbname项');
	}
	if(preg_match('/^p\:/',sqlAddress)){
		$address=sqlAddress;
	}else{
		$address='p:'.sqlAddress;//强制长连接
	}
	$SQL = @new mysqli($address, sqlUser, sqlPass, dbname);
	if (mysqli_connect_error()) {
		out('无法连接数据库: ' . mysqli_connect_error());
		errorlog("DB", "Cannot connect to DB:" . mysqli_connect_error());
		if(preg_match("/Unknown\ database/", mysqli_connect_error())){
			out('正在无数据库选择模式，请运行initdb命令创建数据库。');
			$SQL = @new mysqli($address, sqlUser, sqlPass);
		}else{
			exit();
			return false;
		}
	}
	$SQL->query("SET NAMES utf8");
	return $SQL;
}
function ColumnExists($table, $key) {
	Global $SQL;
	if (!$SQL) {
		connectSQL();
	}
	$result = $SQL->query("describe $table $key");
	$result = $result->fetch_array();
	if ($result === NULL) {
		return false;
	}
	return true;
}
function getDomain($url) {
	if (preg_match("/^(?:http|https)\:\/\/([^\/\:]+)?\/{0,1}/", $url, $m)) {
		return $m[1];
	}
	return false;
}
function logfile($filename, $log) {
	$f = fopen("log/" . $filename, "a");
	fwrite($f, $log . PHP_EOL);
	fclose($f);
}
function errorlog($type, $err) {
	if (@ErrorLog === true) logfile("Error_" . $type . ".log", gmdate(DATE_RFC822) . ": " . $err);
}
function warnlog($type, $warn) {
	if (@WarnLog === true) logfile("Warning_" . $type . ".log", gmdate(DATE_RFC822) . ": " . $warn);
}
function logotherref() {
	logfile("othersiteref.log", $f, $_SERVER["HTTP_REFERER"]);
}
function fromThisDomain() {
	if (@domainname) {
		$ref = $_SERVER["HTTP_REFERER"];
		if ($ref) {
			$d = getDomain($ref);
			if ($d) {
				return $d;
			} else {
				logotherref();
				return false;
			}
		} else {
			logotherref();
			return false;
		}
	} else {
		logotherref();
		return true;
	}
}
function isID($id) {
	$result = preg_match("/^\d+$/", $id);
	if ($result) return true;
	else {
		return false;
	}
}
function isLogged() {
	if ($_SESSION['logged'] === true) {
		return true;
	} else {
		return false;
	}
}
function needLogin() {
	if (!isLogged()) {
		echo "need login";
		exit;
	}
}
function toLine() {
	$s = '';
	$strs = func_get_args();
	if (is_array($strs)) {
		$strs = $strs[0];
	}
	$c = count($strs);
	for ($i = 0; $i < $c; $i++) {
		$s.= $strs[$i];
		if ($i < $c - 1) $s.= PHP_EOL;
	}
	return $s;
}
function _toLine() {
	echo toLine(func_get_args());
}
function removeSideSpe($str) {
	return preg_replace("/^\s+|\s+$/", '', $str);;
}
function ip() {
	return @$_SERVER['HTTP_VIA'] ? @$_SERVER['HTTP_X_FORWARDED_FOR'] : @$_SERVER['REMOTE_ADDR'];
}
function translateAddress($address) {
	require_once ("outlink.php");
	global $outlinkresolve;
	$resource = preg_split("/((\r(?!\n)))|((?<!\r)\n|(\r\n))/", $address); //根据行分成不同视频源
	$resultArray = array(); //结构：键名:源注释,键值:分段数组
	for ($i = count($resource); $i--;) { //处理各个源
		$resource[$i] = removeSideSpe($resource[$i]); //清除两边空格和空行
		if ($resource[$i] == '') {
			array_splice($resource, $i, 1); //清除空行
			
		} else {
			//首先尝试提出特征为(在开头并且带引号的字符串)作为源名称（无法提出则明明默认名称），如果此名称已存在于结果数组则加上标号
			$ResName = '';
			preg_match("/^(\".*\"):(.+)/", $resource[$i], $result);
			if ($result) { //如果有注释
				$resource[$i] = $result[2];
				$ResName = $result[1]; //解析外链地址时如果出现额外的标注则加在这个名称后面
				
			}
			$tmppart = explode(";", $resource[$i]); //分段
			//print_r($tmppart);
			//$resource[$i]=array();
			array_splice($resource, $i, 1); //删除元素释放空间
			for ($i2 = count($tmppart); $i2--;) { //处理视频分段
				$tempparts2 = array();
				if ($tmppart[$i2] != '') { //过滤掉空字符串
					//preg_match("/^(.+)(\:(.+$))/",$tmppart[$i2],$result);//获取地址前缀和视频地址（id）
					if (preg_match("/^(.+)(\:(.+$))/", $tmppart[$i2], $result)) {
						$videoaddress = $result /*[0]*/
						[3];
						$pre = $result /*[0]*/
						[1];
					} else {
						$pre = '';
						$videoaddress = $tmppart[$i2];
					}
					$result = null; //释放结果数组
					if (is_file("outlinkresolve/$pre.php")) { //如果解析库里可以找到对应前缀视频的解析文件
						$tmppart[$i2] = outlinkresolve($pre, $videoaddress); //用解析函数解析，获得多源数组
						if (is_array($tmppart[$i2])) { //如果转换结果是数组
							//如果返回视频里有多源，但这不是独段视频的话则选择其中一个丢弃其它源。如果是独段源则把其他源单独添加到结果数组
							foreach ($tmppart[$i2] as $note => $childsource) {
								if (count($tmppart[$i2]) > 1) { //如果视频分段多于一个,则丢弃其他源只留一个源用来和其他分段拼接
									foreach ($tmppart[$i2] as $key => $value) {
										$tempparts2 = array_merge($value, $tempparts2);
										continue;
									}
								} else { //如果只是一个段，则把返回的各个源分别命名放入结果数组
									foreach ($tmppart[$i2] as $key => $value) {
										$resultArray[$ResName == '' ? $key : $ResName . " " . $key] = $value;
									}
									break;
								}
							}
						} else { //如果转换结果不是数组
							array_unshift($tempparts2, $tmppart[$i2]);
						}
						continue;
					}
					//不用被解析的分段，直接放进结果数组
					array_unshift($tempparts2, $tmppart[$i2]);
				}
			} //处理完分段
			$resultArray[$ResName] = $tempparts2;
		}
	}
	/*返回形式
	$resource:[
	note:[p1,p2,p3],//有标注多分段
	note:[p1],//有标注单段
	[p1]//无标注单段
	]*/
	return json_encode($resultArray,JSON_UNESCAPED_UNICODE);
}
function out($str) {
	echo $str . PHP_EOL;
	flush();
	ob_flush();
}
function cutdownjs($content) {
	$open = '';
	$randpre = uniqid() . uniqid() . uniqid();
	$cou = 0;
	$strarray = array();
	while (preg_match("/\'|\"|(?:\/\*)|(?:\/\/)/", $content, $open)) {
		switch ($open[0]) {
			case "'":
			case "\"": /*找到单引号开口，推进字符串数组*/ {
						if (preg_match("/(\'|\").*?(?<!\\\\)\\1/s", $content, $strarr)) {
							$strid = $randpre . $cou;
							$cou++;
							$strarray[$strid] = $strarr[0];
							$content = preg_replace("/(\'|\").*?(?<!\\\\)\\1/s", $strid, $content, 1);
						} else {
							//找不到引号对说明代码有问题，直接退出并报错
							trigger_error('文件引号不成对，文件缩减停止', E_USER_ERROR);
							exit;
						}
						break;
				}
			case '/*': /*找到块注释开口，删了它*/ {
					if (preg_match('/\/\*.*?\*\//s', $content)) {
						$content = preg_replace('/\/\*.*?\*\//s', '', $content, 1);
					} else {
						trigger_error("块注释符号不成对，文件缩减停止", E_USER_ERROR);
						exit;
					}
					break;
				}
			case '//': /*找到行注释开口，删了它*/ {
					$content = preg_replace('/\/\/.*$/m', '', $content, 1);
					break;
				}
			}
		}
		$content = preg_replace("/^[\t\s]+/m", '', $content); /*去除每行前的tab和空格*/
		$content = preg_replace("/^[\r\n]+/m", '', $content); /*去除空白行*/
		$specahrs = '\:\{\=\+\-\*\/\,\.\;\|\?\\\\\[\]\>\<\&';
		$content = preg_replace("/[\t\s]*([$specahrs])[\t\s]*/", '$1', $content);
		$content = preg_replace("/[\r\n]*([$specahrs])[\r\n]*/", '$1', $content);
		/*最后把字符串全替换回去*/
		foreach ($strarray as $id => $str) {
			$content = preg_replace("/$id/", $str, $content, 1);
		}
		return $content;
	}
	function getpluginsjs($dir = 'player/plugins') {
		$newline = array(
			"\r\n",
			"\r"
		);
		$pluglist = array();
		$pluginsdir = @dir($dir);
		while (($file = $pluginsdir->read()) !== false) {
			if (preg_match("/.js$/", $file)) {
				$filecontent = '';
				if (file_exists("$dir/$file.preconf")) {
					$filecontent.= PHP_EOL . file_get_contents("$dir/$file.preconf");
				}
				$filecontent.= PHP_EOL . file_get_contents("$dir/$file");
				if (file_exists("$dir/$file.conf")) {
					$filecontent.= PHP_EOL . file_get_contents("$dir/$file.conf");
				}
				$filecontent = base64_encode(cutdownjs($filecontent));
				$file = @mb_convert_encoding($file, 'utf-8', 'auto');
				$pluglist[$file] = $filecontent;
			}
		}
		$jsonplugin = json_encode($pluglist);
		$content = 'function loadplugins(EC){
	console_output=EC.debug||false;
	Dinfo("%c加载模块","background-color: #001F35;color:#fff");
	var plugs=\'' . $jsonplugin . '\';
	plugs=JSON.parse(plugs);
	for(var plugname in plugs){
		Dinfo("%c加载:"+plugname,"background-color: #001F35;color:#fff");
		eval(base64.decode(plugs[plugname]));
	}
';
		$content.= '};window.console_output=false;(function(){for(var i in console){eval("window.D"+i+" = function() {if (console_output === true) console."+i+".apply(console, arguments)}")}}());';
		return $content;
	}

function echoMem($switch=false){
	if($switch)
	echo 'Mem usage:'.(memory_get_usage()/1024/1024).'M'.PHP_EOL;
}
?>