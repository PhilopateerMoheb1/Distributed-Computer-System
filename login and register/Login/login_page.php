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
    <title>LOGIN</title>
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" href="../bootstrap-5.0.2-dist/css/bootstrap.min.css">

    <script src="../bootstrap-5.0.2-dist/css/bootstrap.bundle.js"></script>
</head>
<body class="login_body">
    <div class="container min-vh-100 d-flex justify-content-center align-items-center ">
        <form class="login_form" action = "login.php" method="post">
            <h2 class="form_header">LOGIN</h2>
            <?php if(isset($_GET['error'])) { ?>
                <p class="login_error_p"> <?php echo $_GET['error']; ?></p>

            <?php } ?>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label login_label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="uemail" required>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label login_label">Password</label>
                <input type="password" name="upassword" class="form-control" id="exampleInputPassword1"  required>
            </div>

            <div class="mb-3 justify-content-center align-items-center">
                <button type="submit" class="btn btn-outline-primary form_btn">Submit</button>
                <br><br>
                
                <a href="../Register/register_page.php" class="new_user_link">
                    <button type="button" class="btn btn-outline-primary form_btn">
                        new user? Register
                    </button>
                </a>
            </div>
        </form>
    </div>
    
</body>
</html>

<?php } ?>