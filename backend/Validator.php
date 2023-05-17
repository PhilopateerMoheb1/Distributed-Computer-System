<?php

$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "http://dev.local:3000" || $http_origin == "http://localhost:3000") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');


function isValidDateForm(string $date, string $format = 'Y-m-d H:i:s'): bool
{
    $dateObj = DateTime::createFromFormat($format, $date);
    return $dateObj && $dateObj->format($format) == $date;
}

function isEmpty()
{
    $isValidated = true;
    foreach ($_POST as $key => $value) {
        if (empty($value)) {
            echo "The field " . "(" . $key . ")" . " can't be empty! <br>";
        }
    }
    return $isValidated;
}

function isValidDateEvent()
{
    $isValidated = true;
    $date_now = date("Y-m-d\TH:i");
    $eventDate = $_POST["Date"];
    if (isValidDateForm($eventDate, "Y-m-d\TH:i")) { // check if the time entered is valid 
        $date_now = date("Y-m-d\TH:i:s");
        if ($date_now >= $eventDate) { //check if the time entered is in the future
            echo "The Date entered have already passed!";
            $isValidated = false;
        }
    } else {
        echo "Date format entered is false!";
        $isValidated = false;
    }
    return $isValidated;

}

function isValidDateBirth()
{
    $isValidated = true;

    $eventDate = $_POST["DOB"];
    if (isValidDateForm($eventDate, "Y-m-d")) { // check if the time entered is valid 
        $date_now = date("Y-m-d");
        if ($date_now < $eventDate) { //check if the time entered is in the future
            echo "You're born in the future?";
            $isValidated = false;
        }
    } else {
        echo "Date format entered is false!";
        $isValidated = false;
    }
    return $isValidated;

}



function validateRegister()
{
    unset($_POST['ConfirmPassword']);
    $_POST['Cash_Balance']="1000";
    $_POST['Password']=md5($_POST['Password']);
    $UserModel = new users();
    $SellerModel = new sellers();

    $BuyerModel = new buyers();
    $read1 = $SellerModel->getAlldb1();
    $read2 = $BuyerModel->getAlldb2();
    $columnArray1 = array_column($read1, 'Email');
    $columnArray2 = array_column($read2, 'Email');
    $isValidated = true;

    if (in_array($_POST['Email'], $columnArray1) or in_array($_POST['Email'], $columnArray2)) {
        $isValidated = false;
        echo "Email already exists!\n";
    }

    if ($isValidated) {
        $UserModel->insertdb1($_POST);
        echo "success";
    }

}

function validateLogin()
{

    $isValidated = true;

    $UserModel = new users();
    $SellerModel = new sellers();
    $BuyerModel = new buyers();
    $SellerBasicModel = new sellersbasic();
    $read1 = $SellerModel->getAlldb1();
    $read2 = $BuyerModel->getAlldb2();
    $read3 = $SellerBasicModel->getAlldb2();
    $EmailColumn1 = array_column($read1, 'Email');
    $EmailColumn2 = array_column($read2, 'Email');



    $isValidated = isEmpty();

    if ((!in_array($_POST['uemail'], $EmailColumn1) and !in_array($_POST['uemail'], $EmailColumn2)) && $isValidated) {
        echo "Email doesn't exist!";
    } elseif ($isValidated) {
        $i = 0;
        for ($i; $i < count($read1); $i++) {
            if ($read1[$i]['Email'] == $_POST['uemail']) {
                if ($read1[$i]['Password'] == md5($_POST['upassword'])) {
                    $_SESSION['logged_in'] = true;
                    $_SESSION['Name'] = $read1[$i]['Name'];
                    $_SESSION['Email'] = $read1[$i]['Email'];
                    $_SESSION['Gender'] = $read3[$i]['Gender'];
                    $_SESSION['Role'] = $read1[$i]['Role'];
                    $_SESSION['Cash_Balance'] = $read1[$i]['Cash_Balance'];
                    $_SESSION['ID'] = $read1[$i]['ID'];
                    $_SESSION['Address'] = $read3[$i]['Address'];
                    $_SESSION['Phone_Number'] = $read3[$i]['Phone_Number'];
                    $_SESSION['DOB'] = $read3[$i]['DOB'];
                    $_SESSION['Password'] = $read1[$i]['Password'];
                    session_write_close();
                }
             else {
                echo "Wrong Password";
                } 
            }
        }
        $i = 0;
        for ($i; $i < count($read2); $i++) {
            if ($read2[$i]['Email'] == $_POST['uemail']) {
                if ($read2[$i]['Password'] == md5($_POST['upassword'])) {
                    $_SESSION['logged_in'] = true;
                    $_SESSION['Name'] = $read2[$i]['Name'];
                    $_SESSION['Email'] = $read2[$i]['Email'];
                    $_SESSION['Gender'] = $read2[$i]['Gender'];
                    $_SESSION['Role'] = $read2[$i]['Role'];
                    $_SESSION['Cash_Balance'] = $read2[$i]['Cash_Balance'];
                    $_SESSION['ID'] = $read2[$i]['ID'];
                    $_SESSION['Address'] = $read2[$i]['Address'];
                    $_SESSION['Phone_Number'] = $read2[$i]['Phone_Number'];
                    $_SESSION['DOB'] = $read2[$i]['DOB'];
                    $_SESSION['Password'] = $read2[$i]['Password'];
                    session_write_close();
                } else {
                    echo "Wrong Password";
                }
            }
        }

    }
}


?>