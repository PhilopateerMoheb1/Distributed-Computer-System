<?php 
    session_start();
    if (isset($_SESSION['ID']))
        header("Location: ../home.php");
    else{
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>

    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" href="../bootstrap-5.0.2-dist/css/bootstrap.min.css">

    <script src="../bootstrap-5.0.2-dist/js/bootstrap.bundle.js"></script>
</head>
<body class ="register_body">
    <div class="container min-vh-100 d-flex justify-content-center align-items-center">
        <form class="register_form" action = "register_validator.php" method="post">
            <h2 class="form_header">Register</h2>

            <?php if(isset($_GET['error'])) { ?>
                <p class="reg_error_p"> <?php echo $_GET['error']; ?></p>

            <?php } else if (isset($_GET['sucess'])) { ?>
                <p class="reg_sucess_p"> <?php echo $_GET['sucess']; ?></p>
            <?php } ?>
            <!-- Name -->
            <div class="mb-3">
                <label for="reg_name" class="form-label login_label">Full Name</label>
                <input type="text" class="form-control" id="reg_Name" name="rName"
                 placeholder="full name" required 
                 value = "<?php if(isset($_GET['name'])) echo $_GET['name'] ?>">
                
                <?php if(isset($_GET['errname'])) { ?>
                    <p class="reg_error_p"> <?php echo $_GET['errname']; ?></p>

                <?php } ?>

            </div>

            <!-- Email -->
            <div class="mb-3">
                <label for="reg_email" class="form-label login_label">Email address</label>
                <input type="email" class="form-control" id="reg_Email" aria-describedby="emailHelp"
                name="rEmail" placeholder="Email address" required 
                value="<?php if(isset($_GET['email'])) echo $_GET['email'] ?>">
                            
                <?php if(isset($_GET['erremail'])) { ?>
                    <p class="reg_error_p"> <?php echo $_GET['erremail']; ?></p>
                <?php } ?>

            </div>
            
            <!-- personal information -->
            <div class="mb-3">
                <label for="street-address" class="form-label login_label">Street address</label>
                <input type="text" class="form-control" id="street-address" name="rAddress"
                 autocomplete="street-address" placeholder="street address" required
                 value="<?php if(isset($_GET['address'])) echo $_GET['address'] ?>"></input>
            
                <?php if(isset($_GET['erraddress'])) { ?>
                    <p class="reg_error_p"> <?php echo $_GET['erraddress']; ?></p>
                <?php } ?>
            
            </div>

            <div class="mb-3">
                <label for="reg_phone" class="form-label login_label">Phone number</label>
                <input type="tel" class="form-control" id="reg_phone" name="rPhone"
                 placeholder="Phone number" required
                 value="<?php if(isset($_GET['phone'])) echo $_GET['phone'] ?>">
            
                <?php if(isset($_GET['errphone'])) { ?>
                    <p class="reg_error_p"> <?php echo $_GET['errphone']; ?></p>
                <?php } ?>
            
            </div>
            
            <div class="mb-4 col-md-4">
                <label for="reg_birthday" class="form-label login_label" >Birthday:</label>
                <input type="date" class="form-control" id="reg_birthday" name="rDOB" required
                min="1900-01-01" max="2005-12-31"
                value="<?php if(isset($_GET['dob'])) echo $_GET['dob'] ?>">   

                

            </div>
            <?php if(isset($_GET['errdob'])) { ?>
                    <p class="reg_error_p"> <?php echo $_GET['errdob']; ?></p>
                <?php } ?>
            <div class="mb-4 col-md-4">
                <label for="reg_gender" class="form-label login_label">Gender</label>

                <select id="reg_gender_select" class="form-select" aria-label="Default select example"
                 name="rGender" required>
                    <option value ="default" selected disabled>Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    
                </select>

                <?php if(isset($_GET['errgender'])) { ?>
                    <p class="reg_error_p"> <?php echo $_GET['errgender']; ?></p>
                <?php } ?>
            
            </div>

            <div class="form-group mb-4 col-md-4">
                <label for="reg_Role" class="form-label login_label">Role</label>
                <select id="reg_role_select" class="form-select" aria-label="Default select example" name="rRole" required>
                    <option value ="default" selected disabled>Choose...</option>
                    <option>User</option>
                    <option>Seller</option>
                </select>

                <?php if(isset($_GET['errrole'])) { ?>
                    <p class="reg_error_p"> <?php echo $_GET['errrole']; ?></p>
                <?php } ?>

            </div>

            <!-- Password -->
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label login_label">Password</label>
                <input type="password" name="rPassword" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
            
                <?php if(isset($_GET['errpass'])) { ?>
                    <p class="reg_error_p"> <?php echo $_GET['errpass']; ?></p>
                <?php } ?>
            
            </div>
            
            <div class="mb-3">
                
                <label for="exampleInputPassword1" class="form-label login_label">Confirm Password</label>
                
                <input type="password" name="rConfirmPassword" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password" required>
                
                <?php if(isset($_GET['errcpass'])) { ?>
                    <p class="reg_error_p"> <?php echo $_GET['errcpass']; ?></p>
                <?php } ?>
            </div>

            <!-- Buttons -->
            <div class="mb-3 justify-content-center align-items-center">
                <button type="submit" class="btn btn-outline-primary form_btn">Register</button>
                <br><br>
                
                <a href="../Login/login_page.php" class="new_user_link">
                    <button type="button" class="btn btn-outline-primary form_btn">
                        have an account? Login
                    </button>
                </a>
            </div>

        </form>
    </div>



    <script type="text/javascript">
    function sel(){
        const ag = {default:0, Male:1, Female:2};
        const rg = {default:0, User:1, Seller:2};

        var gender = "<?php if(isset($_GET['gender'])) echo $_GET['gender']; ?>";

        if (gender != '') {
            document.getElementById('reg_gender_select').selectedIndex = ag[gender];
        }else {
            document.getElementById('reg_gender_select').selectedIndex = "default";
        }
        var role = "<?php if(isset($_GET['role'])) echo $_GET['role']; ?>";
        if (role != '') {
            document.getElementById('reg_role_select').selectedIndex = rg[role];
        }
    }
    sel();
</script>
</body>
</html>
<?php } ?>