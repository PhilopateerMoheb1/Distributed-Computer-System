<?php
    $sname = "localhost";
    $uname = "root";
    $password = "";

    $db1_name = "db3";
    $connectionDB1 = mysqli_connect($sname,$uname,$password,$db1_name);

    $db2_name = "db4";
    $connectionDB2 = mysqli_connect($sname,$uname,$password,$db2_name);
    if (!$connectionDB1 || !$connectionDB2){
        echo "Connection Failed!";
    }
    else
        echo "Connection is Success to db1 :)";

    // $connectionBuyer = mysqli_connect($sname,$uname,$password,"distributed2");
    // if (!$connectionBuyer){
    //     echo "Connection Failed!";
    // }
    // else
    //     echo "Connection is Success to db2 :)";

    // $connection_Basic_info = mysqli_connect($sname,$uname,$password,"seller_info");


    // $sql = "SELECT * FROM seller ";
    // $result = mysqli_query($connectionSeller, $sql);
    // echo "<br>";
    // print_r($result);
    // echo "<br>";
    // $sq2 = "SELECT * FROM buyer";
    // $result2 = mysqli_query($connectionBuyer, $sq2);
    // print_r($result2);


    
?>
