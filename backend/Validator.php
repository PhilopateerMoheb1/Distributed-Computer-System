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
    $_POST['Role'] = "user";
    unset($_POST['ConfirmPassword']);
    $UserModel = new users();
    $read = $UserModel->getAll();
    $columnArray = array_column($read, 'Email');


    $isValidated = true;

    $isValidated = isEmpty();
    $isValidated = isValidDateBirth();

    if (in_array($_POST['Email'], $columnArray)) {

        $isValidated = false;
        echo "Email already exists!\n";
    }

    if ($isValidated) {
        $UserModel->insert($_POST);
    }

}

function validateLogin()
{

    $isValidated = true;

    $UserModel = new users();
    $read = $UserModel->getAll();
    $EmailColumn = array_column($read, 'Email');


    $isValidated = isEmpty();

    if (!in_array($_POST['uemail'], $EmailColumn) && $isValidated) {
        echo "Email doesn't exist!";
    } elseif ($isValidated) {
        $i = 0;
        for ($i; $i < count($read); $i++) {
            if ($read[$i]['Email'] == $_POST['uemail']) {
                if ($read[$i]['Password'] == md5($_POST['upassword'])) {
                    echo "Success";
                    $_SESSION['logged_in'] = true;
                    $_SESSION['Name'] = $read[$i]['Name'];
                    $_SESSION['Email'] = $read[$i]['Email'];
                    $_SESSION['Gender'] = $read[$i]['Gender'];
                    $_SESSION['Role'] = $read[$i]['Role'];
                    $_SESSION['Cash_Balance'] = $read[$i]['Cash_Balance'];
                    $_SESSION['ID'] = $read[$i]['ID'];
                    $_SESSION['Address'] = $read[$i]['Address'];
                    $_SESSION['Phone Number'] = $read[$i]['Phone_Number'];
                    $_SESSION['DOB'] = $read[$i]['DOB'];
                    $_SESSION['Password'] = $read[$i]['Password'];
                    session_write_close();
                } else {
                    echo "Wrong Password";
                }
            }
        }

    }
}


?>