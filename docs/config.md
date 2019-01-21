# config.php说明

** 配置文件以定义常量的形式定义配置 **

## 后台

* user : 用于登录后台的用户名
* pass : 用于登录后台的密码
* secret : 用于登录后台的动态密码的密钥(不定义此项即不使用动态密码)

#### 动态密码

为了增加被暴力破解的难度，这个版本的后台登录中添加了动态密码验证。
要获取一个动态密码配置，可以访问`install/secret.php`，页面上将显示一个secret字符串和一个二维码，把secret字符串复制到配置文件中对应的位置并取消注释，然后用手机上类似`谷歌身份验证器`的二次认证App扫描二维码即可保存下动态密码的密钥。以后登录后台时需要同时输入正确密码和6位数字动态密码。


## 数据库

* dbHost : 数据库地址
* dbUser : 数据库用户名
* dbPass : 数据库密码
* dbUnixSocket : 数据库unix socket地址
* dbName : 数据库名
* dbPort : 数据库端口

`dbPort`仅和`dbHost`同时存在，端口默认时可注释掉`dbPort`。
使用unix socket连接时，取消`dbUnixSocket`的注释，并注释掉`dbPort`和`dbHost`。

## 数据

* allowedDanmakuSize: (string)限制提交的弹幕字号大小。值为序列化的尺寸数组，比如"[20,24,36]"。

## 日志
目前日志并没有使用到，这是上个版本留下的配置项，由于可能会用到所以先放着了。

* errorLog : (boolean)开关错误日志
* warnLog : (boolean)开关警告日志
* logPath : 日志目录，默认为系统临时目录

## 播放器

* playerOpt : (string)一个json文本，包含播放器初始化时需要的配置。具体配置项请看`NayP`播放器项目（的代码，因为我并没有写文档）。举例:`define('playerOpt','{plugins:[]}');`,配置一个插件列表。

## 开发

* dev : (boolean)是否打开开发模式(在已登录状态下输出页面错误报告，用于调试)

## 访问控制

这是一个特殊的配置项，用于控制对API的访问。
返回`true`将继续对API请求的处理，返回`false`将退出。可不定义。

```php
function requestControl(){
	//do something...
	return true||false;
}

```