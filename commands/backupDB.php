<?php
needLogin();
if(hasFlag("help")){
    echo "backupDB用于备份数据库\n  <b>backupDB</b>\n如果成功，将会保存一个sql文件在backup文件夹，此文件夹已被.htaccess保护";
    exit;
}
global $args;
header("Content-Type:text/html", true);
    if (connectSQL()) {
        Global $SQL;
       $filename=date("Y-m-d_H-i-s")."-".dbname.".sql"; 
$dbname = dbname; //数据库名称
// 摘自http://www.oschina.net/code/snippet_105637_14996并小作修改，我不保证可靠性
out("开始备份");

$SQL->query("set names 'utf8'");
$mysql = "set charset utf8;\r\n";
$q1 = $SQL->query("show tables");

while ($t = mysqli_fetch_array($q1))
{
    $table = $t[0];
    out("数据表".$table);
    $q2=$SQL->query("show create table `$table`");
    $sql= mysqli_fetch_array($q2);
    $mysql.=$sql['Create Table'] . ";\r\n";
    $q3=$SQL->query("select * from $table");
    $fieldsnum=$q3->field_count;
    $keys=array();
    for($i=0;$i<$fieldsnum;$i++){
         array_push($keys,$q3->fetch_field_direct($i)->name);
    }
        $keys = array_map('addslashes', $keys);
        $keys = join('`,`', $keys);
        $keys = "`" . $keys . "`";
    $mysql .= "insert into `$table` ($keys) values\r\n";
    while ($data = mysqli_fetch_assoc($q3))
    {
        $vals = array_values($data);
        $vals = array_map('addslashes', $vals);
        $vals = join("','", $vals);
        $vals = "'" . $vals . "'";
        $mysql .="($vals),\r\n";
    } 
    $mysql=rtrim($mysql,"\r\n\,");//移除多出的逗号
    $mysql.=";\r\n";//加个分号
} 
$fp = fopen("backup/".$filename, 'w');
fputs($fp, $mysql);
fclose($fp);
out("数据备份成功，文件:backup/".$filename);
}else{
    out("数据库连接错误");
}
exit;
?>