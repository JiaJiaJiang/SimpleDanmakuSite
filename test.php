<?php
class m{
	public $r=123;
	static $e=234;
	const time=date_timestamp_get(date_create());
	function __construct(){
		$this->k=2;
	}
	static function a(){
		echo 'a'.PHP_EOL;
	}
}
$f=new m();
sleep(5);
var_dump(m::time);
var_dump(@date_timestamp_get(date_create()));
?>