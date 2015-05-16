<?php
$option = $options;
header("Content-Type:text/json", true);
if (isID($option[0])) {
    if (connectSQL()) {
        Global $SQL;
        Global $flags;
        $stmt = mysqli_stmt_init($SQL);
        mysqli_stmt_prepare($stmt, "SELECT title,address,count,coveraddress,description,options FROM video WHERE id=?");
        mysqli_stmt_bind_param($stmt, "i", $option[0]);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $title,$address,$count,$coveraddress,$description,$options);
        mysqli_stmt_fetch($stmt);
            if (! $address) {
                echo "Error";
                errorlog("getVideo","No address got");
                return;
            }
            if (!$count) {
                $count = 0;
            } 
            $addr=translateAddress($address);
            $json=array("url"=> $addr,"count"=>$count);
            if(in_array("t",$flags)){
                $json["t"]=$title;
            }
            if(in_array("des",$flags)){
                $json["des"]=$description;
            }
            if(in_array("cv",$flags)){
                $json["cv"]=$coveraddress;
            }
            if(in_array("opt",$flags)){
                $json["opt"]=json_decode($options);
            }
            echo json_encode($json,JSON_UNESCAPED_UNICODE);
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
    errorlog("getVideo","Error args");
}
exit;
?>