<?php
needLogin();
$dir = dir("commands");
while (($file = $dir->read()) !== false)
{
	 out($file);
}

?>