<?php
session_start();
if (!isset($_SESSION['ID'])){
    header("Location: ../home.php");
    exit();
}

session_unset();
session_destroy();
header("Location: ../home.php");
exit();

?>