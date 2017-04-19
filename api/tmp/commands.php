<?php
needLogin();
$dir = dir('commands');
while (($file = $dir->read()) !== false)
{
	 if(preg_match("/\.php$/", $file)){
	 	out(preg_replace("/\.php$/", '', $file));
	 }
}

?>