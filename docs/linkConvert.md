# 链接转换

链接转换机制用于灵活处理一些已知将来可能会变动的链接，或者一些链接的解析。

链接转换作用于视频地址和封面地址，作用范围是视频信息页面和播放器页面，后台显示的视频信息不会被转换。

# 使用方法

把转换脚本放在`convertScript`目录下，如`poi.php`。
在其中定义`convertScript`函数，并返回转换结果。

```php
function convertScript($url){
	//do something...
	return $result;
}
```
而后在视频信息中填写以`poi:`为前缀的地址，转换过程将会把`poi:`后面的部分作为参数传给`convertScript`函数。

*视频的地址结果为数组，因此对于经过转换的地址，会把结果保存在数组中对应脚本名的属性下，所以如果在一个地址中定义了多个同前缀的地址，那么后面的结果会覆盖已有的结果。*

> 如果在`convertScript`目录中未找到相应前缀的转换脚本，或者脚本中未定义`convertScript`函数，将直接返回原始链接。


## 示例

* 定义脚本`poi.php` 
```php
<?php
function convertScript($url){
	$result="http://simple.danmaku.site/$url";
	return $result;
}
?>
```

* 视频信息中填写地址:`poi:video/testvideo.mp4`

* 转换结果:`http://simple.danmaku.site/video/testvideo.mp4`
