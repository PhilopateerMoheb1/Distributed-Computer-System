<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

function isValidDateForm(string $date, string $format = 'Y-m-d H:i:s'): bool
{
    $dateObj = DateTime::createFromFormat($format, $date);
    return $dateObj && $dateObj->format($format) == $date;
}

function isEmpty(){
    $isValidated = true;
    foreach ($_POST as $key => $value) {
        if(empty($value)){
            echo "The field ". "(".$key.")"." can't be empty! <br>";
        }
    }
    return $isValidated;
}

function isValidDateEvent(){
    $isValidated = true;
    $date_now = date("Y-m-d\TH:i");
    $eventDate = $_POST["Date"];
    if(isValidDateForm($eventDate,"Y-m-d\TH:i")){ // check if the time entered is valid 
        $date_now = date("Y-m-d\TH:i:s");
        if ($date_now >= $eventDate) { //check if the time entered is in the future
            echo "The Date entered have already passed!";
            $isValidated = false;
        }
    }
    else{
        echo "Date format entered is false!";
        $isValidated = false;
    }
    return $isValidated;

}

function isValidDateBirth(){
    $isValidated = true;

    $eventDate = $_POST["DOB"];
    if(isValidDateForm($eventDate,"Y-m-d")){ // check if the time entered is valid 
        $date_now = date("Y-m-d");
        if ($date_now < $eventDate) { //check if the time entered is in the future
            echo "You're born in the future?";
            $isValidated = false;
        }
    }
    else{
        echo "Date format entered is false!";
        $isValidated = false;
    }
    return $isValidated;

}



 function validateRegister(){
    $_POST['Role'] = "user";
    unset($_POST['ConfirmPassword']);
    $UserModel = new users();
    $read = $UserModel->getAll();
    $columnArray  = array_column($read, 'Email');


    $isValidated = true;

    $isValidated = isEmpty();
    $isValidated = isValidDateBirth();

    if(in_array($_POST['Email'],$columnArray)){

        $isValidated = false;
        echo "Email already exists!\n";
    }

    if($isValidated){
        $UserModel->insert($_POST);
    }

 }

 function validateLogin(){

    $isValidated = true;

    $UserModel = new users();
    $read = $UserModel->getAll();
    $EmailColumn  = array_column($read, 'Email');
    
   
    $isValidated = isEmpty();

    if(!in_array($_POST['Email'],$EmailColumn) && $isValidated){
        echo "Email doesn't exist!";
    }
    elseif($isValidated){
            $i =0;
            for($i;$i<count($read);$i++){
                if($read[$i]['Email'] ==$_POST['Email']){
                    if($read[$i]['Password']==$_POST['Password']){
                        echo "Success";
                    }
                    else{
                        echo "Wrong Password";
                    }
                }
            }

    }
 }



?>