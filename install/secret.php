<?php
require_once(dirname(__FILE__).'/../utils/GoogleAuthenticator.php');
$auth=new GoogleAuthenticator;
$secret=$auth->createSecret();
?>
	
<center>
<h2>secret: <?php echo $secret;?></h2>
<img src="<?php echo $auth->getQRCodeUrl('SimpleDanmakuSite',$secret);?>">
</center>