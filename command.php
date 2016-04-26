<?php
require_once("funs.php");
if(!fromThisDomain())exit;
if(@$_POST['cmd']){
    $command=$_POST['cmd'];
}elseif(@$_GET['cmd']){
    $command=$_GET['cmd'];
}
if(!defined('JSON_UNESCAPED_UNICODE'))define('JSON_UNESCAPED_UNICODE',256);
if ($command) {
    //设置允许使用命令的域
    $allow=@domainname?@domainname:"*";
    if(@$_SERVER['SERVER_NAME']){
        $allow=$_SERVER['SERVER_NAME'];
    }
    header("Access-Control-Allow-Origin:".$allow);
    /*在这里增加一些命令或许可检测*/
    if(array_key_exists("fromconsole",$_GET)||array_key_exists("fromconsole",$_POST)){
        global $fromconsole;
        $fromconsole=true;
        if (isLogged()&&@ErrorLog) {
            ini_set("display_errors", "On");
            error_reporting(E_ALL | E_STRICT);
        }
    }
    if (true) { //查找指令前判断是否要执行
        function decodeChar($val){
            $val=$val[0];
             $c = "";
                if (substr($val, 0, 1) != "%") {
                    $c .= $val;
                } elseif (substr($val, 1, 1) != "u") {
                    $x = hexdec(substr($val, 1, 2));
                    $c .= chr($x);
                } else {
                    $val = intval(substr($val, 2), 16);
                    if ($val < 0x7F) 
                        {
                        $c .= chr($val);
                    } elseif ($val < 0x800) 
                        {
                        $c .= chr(0xC0 | ($val / 64));
                        $c .= chr(0x80 | ($val % 64));
                    } else
                        {
                        $c .= chr(0xE0 | (($val / 64) / 64));
                        $c .= chr(0x80 | (($val / 64) % 64));
                        $c .= chr(0x80 | ($val % 64));
                    }
                }
                return $c;
        }
        function unescape($escstr)//此函数来自网络
        {
            $regrole="/%u[0-9A-Za-z]{4}|%.{2}|[0-9a-zA-Z.+-_]+/";
            $escstr=preg_replace_callback($regrole, "decodeChar", $escstr);
            return $escstr;
        }

        function isArgName($string){
            if(preg_match("/^\-([\w]+)/",$string,$match)){return $match[1];}
            else{return false;}
        }
        function isFlag($string){
            if(preg_match("/^\-\-([\w]+)/",$string,$match)){return $match[1];}
                else{return false;}
        }
        function hasFlag($f){
            global $flags;
            if(in_array($f, $flags)){
                return true;
            }else{
                return false;
            }
        }
        function recovminus($str){
            $str=preg_replace("/^`\-`\-/", "--", $str);
            $str=preg_replace("/^`\-/", "-", $str);
            return $str;
        }
        function cmd($cmd)
        {
            global $options;
            global $cmdstring;
            $cmdstring=base64_decode($cmd);
            $options = explode(" ", $cmdstring);
            $script  =unescape(recovminus(array_shift($options)));
            $count=count($options);
            //查找有名字的参数
            global $args;
            $args=array();
            for($ind = 0; $ind < $count; $ind++){//遍历参数数组
                $argname=isArgName($options[$ind]);
                if($argname){//查找参数名
                    if($ind<=$count-1){//如果不是最后一个
                        //如果下一个不是参数名或标记就当作参数值
                        if(array_key_exists($argname,$args)){
                            trigger_error("参数名重复：$argname",E_USER_ERROR);
                            exit();
                        }
                        if($ind==$count-1){
                            $args[$argname]="";
                            continue;
                        }
                        if(!isArgName($options[$ind+1])||!isFlag($options[$ind+1])){
                            $args[$argname]=$options[$ind+1];
                        }else{//不然使参数名对应的值为""
                            $args[$argname]="";
                        }
                        //Note:可用array_key_exists(key, $args)来判断是否有这个参数
                    }
                }
            }
            //查找标记
            global $flags;
            $flags=array();
            for($ind = 0; $ind < $count; $ind++){//遍历参数数组
                $flagname=isFlag($options[$ind]);
                if($flagname){//查找标记
                    array_push($flags,$flagname);//把标记名放入flags数组，可用in_array("标记名",$flags)来查找是否存在指定标记
                }
            }
            //恢复参数值
            for ($ind = $count; $ind--; ) {
                //恢复字符串和+号
                $options[$ind] =unescape(recovminus($options[$ind]));
            }
            foreach ($args as $key => $value) {
                 $args[$key] =unescape(recovminus($value));
            }
            foreach ($flags as $key => $value) {
                $flags[$key] =unescape(recovminus($value));
            }

            if (is_file("commands/" . $script . ".php")) {
                require_once("commands/" . $script . ".php");
            } else {
                echo "未找到命令:" . $script;
            }
        }
        cmd($command);
    } else {
        echo "无法执行";
    }
}
?>
