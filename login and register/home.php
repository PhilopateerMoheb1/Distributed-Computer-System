<?php 
    session_start()
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
<?php 
    if(isset($_SESSION['ID'])){ ?>
        <h1><?php echo "Hallo";
        if ($_SESSION['Role'] == 0)
            echo " user ";
        else if ($_SESSION['Role'] == 1)
            echo " seller ";
        echo $_SESSION['Name'];?> </h1>
        <a href="Login/logout.php"><button>Logout</button></a>

    <?php
    } 
    else {
?>
    <a href="Login/login_page.php"><button>Login</button></a>
    <?php } ?>
    
</body>
</html>