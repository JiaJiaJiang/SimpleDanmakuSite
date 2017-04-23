<?php
/*
解析文件格式
function convertScript(地址){//解析入口
	//返回结果
}
*/

/*
返回形式
[
	转换脚本名:转换脚本返回的结果,
	转换脚本名:转换脚本返回的结果,
	0:未经过转换过程的地址,
	1:同上
]
*/
function convertLink($address) {
	$resource = explode(PHP_EOL, $address); //根据行分成不同源
	$resultArray = array(); //结构：键名:源注释,键值:分段数组
	for ($i = count($resource); $i--;) { //处理各个源
		$resource[$i] = trim($resource[$i]); //清除两边空格和空行
		if ($resource[$i] == '' || $resource[$i][0]==='#') {//清除空行和被注释掉的行
			array_splice($resource, $i, 1); 
			continue;
		}
		//提取地址
		preg_match("/^((\".*\")\:)?(.+)$/", $resource[$i], $result);
		if($result[2] && is_file('../convertScript/'.$result[2].'.php')){//有前缀，有对应的转换脚本
			//转换
			require_once('../convertScript/'.$result[2].'.php');
			if(function_exists("convertScript")){
				$resultArray[$result[2]]=convertScript($result[3]);
				continue;
			}
		}else{
			//直接加进结果数组
			$resultArray[]=$resource[$i];	
		}
		return $resultArray;
	}
}
?>