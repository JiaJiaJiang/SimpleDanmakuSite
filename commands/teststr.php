<?php
needLogin();
global $cmdstring;
$option=$options;
global $args;
global $flags;
echo '原始命令串:'.$cmdstring.PHP_EOL;
echo '参数表';
print_r($option);
echo '命名参数';
print_r($args);
echo '标记';
print_r($flags);
exit();
?>