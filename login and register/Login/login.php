<?php 
    session_start();
    if (isset($_SESSION['ID'])){
        header("Location: ../home.php");
        exit();
    }
    else if (! ($_SERVER["REQUEST_METHOD"] == "POST")){
        header("Location: login_page.php?error=dont access to login page direct");
        exit();
    }
    else{
        include "../db/db_connecting.php"; 

        if(isset($_POST['uemail']) && isset($_POST['upassword'])){
            
            function validate($data){
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
                return $data;
            }

            $uEmail = validate($_POST['uemail']);
            $uPass = validate($_POST['upassword']);
            
            if (!filter_var($uEmail, FILTER_VALIDATE_EMAIL) || empty($uEmail)) {
                header("Location: Login_page.php?error=this Email is not valid");
                exit();
            }else if (empty($uPass)){
                header("Location: Login_page.php?error=password cannot be empty");
                exit();
            }
            else{
                $hashed_pass = md5($uPass);
                $sql = "SELECT * FROM users WHERE Email='$uEmail' AND Password='$hashed_pass' ";
                $result = mysqli_query($connection, $sql);
                print_r($result);
                if (mysqli_num_rows($result) == 1){
                    $row = mysqli_fetch_assoc($result);
                    if ($row['Email'] === $uEmail && $row['Password'] === $hashed_pass){
                        $_SESSION['Name'] = $row['Name'];
                        $_SESSION['Email'] = $row['Email'];
                        $_SESSION['Gender'] = $row['Gender'];
                        $_SESSION['Role'] = $row['Role'];
                        $_SESSION['Cach Balance'] = $row['Cach_Balance'];
                        $_SESSION['ID'] = $row['ID'];


                        $_SESSION['Address'] = $row['Address'];
                        $_SESSION['Phone Number'] = $row['Phone_Number'];
                        $_SESSION['DOB'] = $row['DOB'];
                        $_SESSION['Password'] = $row['Password'];

                        header("Location: ../home.php");
                        exit();
                    }
                    else {
                        if ($row['Email'] === $uEmail)
                            header("Location: Login_page.php?error=Wrong Email or Password!");
                        else if ($row['Password'] === md5($uPass))
                            header("Location: Login_page.php?error=Wrong Email or Password!");
                        exit();
                    }
                }
                else {
                    header("Location: Login_page.php?error=Wrong Email or Password");
                    exit();
                }
                
            }
        }else{
            header("Location: Login_page.php?error=");
            exit();
        }
    }
?>