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
                $sql_buyer = "SELECT * FROM buyer WHERE Email='$uEmail' AND Password='$hashed_pass' ";
                $resultBuyer = mysqli_query($connectionDB2, $sql_buyer);
                $result = null;
                if (mysqli_num_rows($resultBuyer) == 1){
                    $result = $resultBuyer;
                }else{
                    $resultSeller = mysqli_query($connectionDB1, "SELECT * FROM seller WHERE Email='$uEmail' AND Password='$hashed_pass' ");
                    if (mysqli_num_rows($resultSeller) == 1){
                        $result = $resultSeller; 
                    }
                }   

                print_r($result);
                if ($result != null){
                    $row = mysqli_fetch_assoc($result);
                    if ($row['email'] === $uEmail && $row['password'] === $hashed_pass){
                        $_SESSION['Name'] = $row['name'];
                        $_SESSION['Email'] = $row['email'];
                        $_SESSION['Password'] = $row['password'];
                        $_SESSION['Role'] = $row['role'];
                        $_SESSION['Cach Balance'] = $row['cash_balance'];

                        if($_SESSION['Role'] == 1){
                            $id = $row['id'];
                            $resultSeller = mysqli_query($connectionDB2, "SELECT * FROM seller_basic_data WHERE ID='$id' ");
                            $row = mysqli_fetch_assoc($resultSeller);
                        }
                        $_SESSION['Gender'] = $row['gender'];
                        $_SESSION['Address'] = $row['address'];
                        $_SESSION['Phone Number'] = $row['phone_number'];
                        $_SESSION['DOB'] = $row['DOB'];
                        $_SESSION['ID'] = $row['id'];

                        header("Location: ../home.php");
                        exit();
                    }
                    else {
                        if ($row['email'] === $uEmail)
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
