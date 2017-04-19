<?php
require_once("config.php");



function getDomain($url) {
	if (preg_match("/^(?:http|https)\:\/\/([^\/\:]+)?\/{0,1}/", $url, $m)) {
		return $m[1];
	}
	return false;
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

function ip() {
	return @$_SERVER['HTTP_VIA'] ? @$_SERVER['HTTP_X_FORWARDED_FOR'] : @$_SERVER['REMOTE_ADDR'];
}

function out($str) {
	echo $str . PHP_EOL;
	flush();
	ob_flush();
}

?>