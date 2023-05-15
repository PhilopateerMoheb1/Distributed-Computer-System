<?php 
    session_start();
    if (! ($_SERVER["REQUEST_METHOD"] == "POST")){
        header("Location: register_page.php?error=dont access to validator page direct");
        exit();
    }

    include "../db/db_connecting.php"; 
    

    if(isset($_POST['rName']) && isset($_POST['rEmail']) && isset($_POST['rAddress'])
        && isset($_POST['rPhone']) && isset($_POST['rDOB']) && isset($_POST['rGender']) 
        && isset($_POST['rRole']) && isset($_POST['rPassword']) && isset($_POST['rConfirmPassword']))
    {
        
        function validate($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        // data variables
        $name = validate($_POST['rName']);
        $email = validate($_POST['rEmail']);
        $address = validate($_POST['rAddress']);
        $phone = validate($_POST['rPhone']);
        $dob = validate($_POST['rDOB']);
        $gender = validate($_POST['rGender']);
        $role = validate($_POST['rRole']);
        $pass = validate($_POST['rPassword']);
        $cpass = validate($_POST['rConfirmPassword']);
        
        // error variables
        $errname = $erremail = $erraddress = $errphone = $errdob = $errgender = $errrole = $errpass = $errcpass = "";

        // ----------------- validate data --------------------

        // validate Name
        //echo $name;
        if (!preg_match ("/^[a-zA-z ]*$/", $name) ) {  
            $errname = "Only alphabets and whitespace are allowed.";  
        }

        // validate phone
        //$test = "+201201304860";
        //echo $test . "<br>" . (preg_match('/^[+][0-9]{9,14}+$/', $test)||preg_match('/^[0-9]{9,14}+$/', $test)) . "<br>";
        
        if ( !(preg_match('/^[+][0-9]{9,14}+$/', $phone)||preg_match('/^[0-9]{9,14}+$/', $phone)) ){
            $errphone = "phone must be numbers only";
        }
        $checkphone = mysqli_query($connection,"SELECT * FROM users WHERE Phone_Number = '$phone'");
        if (mysqli_num_rows($checkphone)){
            $errphone = "This phone is already exist!";
        }

        // validate address
        $specialChcAddr = "/[\'^£$%&*()}{@#~?><>|=_+¬]/";
        // echo $address . "<br>";
        // echo preg_match($specialChcAddr, "5st gamal,55a#") . "<br>";
        if(preg_match($specialChcAddr, $address)){
            $erraddress = "invalid address";
        }
        // validate Email
        $specialChcEmail = "/[\'^£$%&*()}{#~?><>,|=_+¬-]/";

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($email) || preg_match($specialChcEmail, $email)) {
            $erremail = "invalid email address";
        }
                //------- check if this email is exist
        else{
            $check = mysqli_query($connection,"SELECT * FROM users WHERE Email = '$email'");
            if (mysqli_num_rows($check)){
                $erremail = "This email is already exist!";
            }
        }


        // validate password
        if (empty($pass)){
            $errpass = "empty password"; 
        }else if (strlen($pass) < 8){
            $errpass = "Password must be 8 character at least";
            echo "wrong pass";
        }

        // validate confirm password
        if ($cpass != $pass){
            echo "not equal";
            $errcpass = "not the same password";
        }

        //------------- check choices
        // check data
        //$dd = "2023-02-29";
        list($year,$month,$day)=explode("-", $dob);
        echo $dob . "<br>";
        $dob_c = new DateTime($dob);
        $now = new DateTime();
        $age = $now->diff($dob_c);
        echo $age->y;

        if ( !preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/",$dob) 
            || !checkdate($month,$day,$year) ){
            $errdob = "Invalid DOB";
        } else if($age->y > 130 || $age->y < 18){
            $errdob = "inappropriate Age, minimum 18 year and max 130 year";
        }
        // check gender
        if ($gender != "Male" && $gender != "Female" ){
            $errgender = "Invalid Gender";
        }
        
        // check role
        if ($role != "User" && $role != "Seller"){
            $errrole = "Invalid Role";
        }

        // entered data
        $user_data = '&name=' . $name . "&email=" . $email . "&address=" . $address . 
                    "&phone=" . $phone . "&dob=" . $dob . "&gender=" . $gender . "&role=" . $role;
        // all is right
        if($errname =="" && $erremail =="" &&  $erraddress =="" && $errphone =="" &&
         $errdob =="" && $errgender =="" && $errrole =="" && $errpass =="" && $errcpass == "")
        {
            echo "all is right";
            $hashed_pass = md5($pass);

            $Role_aa = array("User"=>"0", "Seller"=>"1"); 
            $sql_Insert = "INSERT INTO users(Name, Address, Phone_Number, Email, Password, Gender, DOB, Role, Cash_Balance) 
                                    VALUES('$name', '$address', '$phone', '$email', '$hashed_pass', '$gender', '$dob', '$Role_aa[$role]', '0')";
            $result = mysqli_query($connection, $sql_Insert);
            if ($result){
                header("Location: register_page.php?sucess=Your Account has been registered successfully!");
                exit();
            }else{
                header("Location: register_page.php?some thing wrong happened!&$user_data");
                exit();
            }
            
        } else{
            $forword = "Location: register_page.php?error=invalid data";
            if (!empty($errname)){
                $forword = $forword . "&errname=" . $errname; 
            }
            if (!empty($erraddress)){
                $forword = $forword . "&erraddress=" . $errname; 
            }
            if (!empty($erremail)){
                $forword = $forword . "&erremail=" . $erremail; 
            }
            if (!empty($errphone)){
                $forword = $forword . "&errphone=" . $errphone; 
            }
            if (!empty($errpass)){
                $forword = $forword . "&errpass=" . $errpass; 
            }
            if (!empty($errcpass)){
                $forword = $forword . "&errcpass=" . $errcpass; 
            }
            if (!empty($errdob)){
                $forword = $forword . "&errdob=" . $errdob; 
            }
            if (!empty($errgender)){
                $forword = $forword . "&errgender=" . $errgender; 
            }
            if (!empty($errrole)){
                $forword = $forword . "&errrole=" . $errrole; 
            }
            if (!empty($erraddress)){
                $forword = $forword . "&erraddress=" . $erraddress; 
            }
            
            header($forword . $user_data);
            exit();
        }
    }else{
        header("Location: register_page.php?error=empty");
        exit();
    }
?>
