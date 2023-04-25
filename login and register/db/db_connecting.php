<?php
    $sname = "localhost";
    $uname = "root";
    $password = "";

    $db_name = "test_db";
    $connection = mysqli_connect($sname,$uname,$password,$db_name);

    if (!$connection){
        echo "Connection Failed!";
    }
    else
        // echo "Connection is Success :)";
?>