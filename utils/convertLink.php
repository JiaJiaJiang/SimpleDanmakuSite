<?php
/*
解析文件格式
function convertScript(地址){//解析入口
	//返回结果
}

convertScript返回格式
格式1
(string)地址

格式2
(array)
array(
	Object(name:名字,addr:地址),
	...
)

*/

/*
convertLink返回形式
[
	Object(name:名字,addr:地址),
	...
]
*/
function convertLink($address,$onlyone=false) {
	$resource = explode(PHP_EOL, $address); //根据行分成不同源
	$resultArray = array(); //结构：键名:源注释,键值:分段数组
	for ($i = count($resource); $i--;) { //处理各个源
		$resource[$i] = trim($resource[$i]); //清除两边空格和空行
		if ($resource[$i] == '' || $resource[$i][0]==='#') {//清除空行和被注释掉的行
			array_splice($resource, $i, 1); 
			continue;
		}
		//提取地址
		preg_match("/^(\"(.*)\"\:)?(.+)$/", $resource[$i], $result);
		if($result[2] && is_file(dirname(__FILE__).'/../convertScript/'.$result[2].'.php')){//有前缀，有对应的转换脚本
			//转换
			require_once(dirname(__FILE__).'/../convertScript/'.$result[2].'.php');
			if(function_exists("convertScript")){
				$convertResult=convertScript($result[3]);
				if(is_object($convertResult)){
					$resultArray[]=$convertResult;
					continue;
				}
				if(!is_array($convertResult)){
					$resultArray[]=addrPack($result[2],$convertResult);
					continue;
				}
				foreach($convertResult as $value) {
					if(is_array($value))$value=(object)$value;
					if(is_object($value)){
						$resultArray[]=$value;
					}
				}
				continue;
			}
		}else{
			//直接加进结果数组
			$resultArray[]=addrPack('',$resource[$i]);
		}
	}
	if($onlyone){
		return $resultArray[0]->addr;
	}
	return $resultArray;
}
function addrPack($name,$addr){
	return (object)array('name'=>$name,'addr'=>$addr);
}
?>