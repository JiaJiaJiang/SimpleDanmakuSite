<?php
//本解析来自http://www.iippcc.com/phpjie-xi-xia-mi-xiamiyin-le-di-zhi-jie-xi-jiu.html
function ipcxiami($location){
$count = (int)substr($location, 0, 1);
$url = substr($location, 1);
$line = floor(strlen($url) / $count);
$loc_5 = strlen($url) % $count;
$loc_6 = array();
$loc_7 = 0;
$loc_8 = '';
$loc_9 = '';
$loc_10 = '';
while ($loc_7 < $loc_5){
$loc_6[$loc_7] = substr($url, ($line+1)*$loc_7, $line+1);
$loc_7++;
}
$loc_7 = $loc_5;
while($loc_7 < $count){
$loc_6[$loc_7] = substr($url, $line * ($loc_7 - $loc_5) + ($line + 1) * $loc_5, $line);
$loc_7++;
}
$loc_7 = 0;
while ($loc_7 < strlen($loc_6[0])){
$loc_10 = 0;
while ($loc_10 < count($loc_6)){
$loc_8 .= @$loc_6[$loc_10][$loc_7];
$loc_10++;
}
$loc_7++;
}
$loc_9 = str_replace('^', 0, urldecode($loc_8));
return $loc_9;
}
function resolveVideo($id){
$content=file_get_contents('http://www.xiami.com/widget/xml-single/sid/'.$id); //获取组合地址内容
preg_match("/<location><\!\[CDATA\[([^\]].*)\]\]><\/location>/i",$content,$location);//匹配location内容
$xiami=ipcxiami($location[1]); //转码得到正确的地址
if(@$xiami){
    return $xiami;
}else{
    return "ERROR";
}
}
?>