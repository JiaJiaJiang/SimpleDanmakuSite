<?php
$option = $options;
header("Content-Type:text/json", true);
if (isID($option[0])) {
    if (connectSQL()) {
        Global $SQL;
        $stmt = mysqli_stmt_init($SQL);
        mysqli_stmt_prepare($stmt, "SELECT address,count FROM video WHERE id=?");
        mysqli_stmt_bind_param($stmt, "i", $option[0]);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $address, $count);
        mysqli_stmt_fetch($stmt);
            if (! $address) {
                echo "Error";
                errorlog("getVideoAddress","No address got");
                return;
            }
            if (!$count) {
                $count = 0;
            } 
            $addr=translateAddress($address);
            $json=array("url"=> $addr,"count"=>$count);
            echo json_encode($json);
            $newc=abs($count)+1;
            mysqli_stmt_prepare($stmt, 'UPDATE  `video` SET  `count` =? WHERE  `id` =?');
        mysqli_stmt_bind_param($stmt, "ii",$newc, $option[0]);
        mysqli_stmt_execute($stmt);
        }
        else{
        	echo "Error";
                return;
        }
} else {
    echo "Error";
    errorlog("getVideoAddress","Error args");
}
exit;
?>