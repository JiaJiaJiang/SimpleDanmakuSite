简易弹幕站
=======

## 仓库

[https://github.com/JiaJiaJiang/SimpleDanmakuSite]()

## 需求环境

* PHP >= 5.4
* MySQL

## 安装

新建一个数据库，把install目录下的`simpleDanmakuSite.sql`结构文件导入此库。

复制一份`config_sample.php`文件，并改名为`config.php`,内容说明见[配置文件](config.md)。

## 使用

本弹幕站的主要形式是被其它页面引用播放器，所以没有自己的视频列表之类的页面。

### 引用播放器

在需要插入视频的页面使用这样的`iframe`

```html
<iframe style="width: 宽度;height:高度;" src="//你的弹幕站地址/videoinfo.php?id=视频id" allowfullscreen></iframe>
```

同时在页面上要包含以下脚本，这是处理播放器需要框架外页面做出相应动作的响应脚本（比如把播放器拉伸到整个页面）
```html
<script src="//你的弹幕站地址/static/playerFrame.js"></script>
```

如果你的弹幕站只支持`http`或`https`中的一种，请在以上两个地址中添加对应的前缀。

*注意：如果你的iframe是插入在尺寸随内容调整的元素中（比如在wordpress中插入），则宽高不可以设置成百分比，否则尺寸会不正确。*