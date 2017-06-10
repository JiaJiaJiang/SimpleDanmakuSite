# 链接转换

链接转换机制用于灵活处理一些已知将来可能会变动的链接，或者一些链接的解析。

链接转换作用于视频地址和封面地址，作用范围是视频信息页面和播放器页面，后台显示的视频信息不会被转换。

# 使用方法

把转换脚本放在`convertScript`目录下，如`poi.php`。
在其中定义`convertScript`函数，并返回转换结果。

```php
function convertScript($url){
	//do something...
	return 地址;
	//or
	return addrPack(地址名,地址);
}
```
而后在视频信息中填写以`"poi":`为前缀的地址，转换过程将会把`"poi":`后面的部分作为参数传给`convertScript`函数。

> 如果在`convertScript`目录中未找到相应前缀的转换脚本，或者脚本中未定义`convertScript`函数，将在结果数组中添加一个没有名字的地址。


## 示例

* 定义脚本`poi.php` 

```php
<?php
//格式一
function convertScript($url){
	$result="http://simple.danmaku.site/$url";
	return $result;
}

//格式二
function convertScript($url){
	$result="http://simple.danmaku.site/$url";
	return addrPack('io',$result);
}
?>
```

* 视频信息中填写地址:`"poi":video/testvideo.mp4`

* 转换结果:
```
//格式一
[
	{name:'',addr:'http://simple.danmaku.site/video/testvideo.mp4'}
]

//格式二
[
	{name:'io',addr:'http://simple.danmaku.site/video/testvideo.mp4'}
]
```