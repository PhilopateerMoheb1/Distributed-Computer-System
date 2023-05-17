<?php
ini_set("session.cookie_domain", '.localhost');
session_set_cookie_params(3600, '/', '.localhost');
if (!isset($_SESSION)) {
    session_start();
}
// csrf code add here (see below...)
$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "http://dev.local:3000" || $http_origin == "http://localhost:3000" || $http_origin == "http://localhost:3000/login") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');



require_once("Helpers/Router.php");
require_once("Helpers/helpers.php");
require_once("Models/Model.php");
require_once("Models/slots.php");
require_once("Validator.php");
require_once("Models/users.php");
require_once("Models/products.php");
require_once("Models/event.php");
require_once("Models/transaction.php");


$_POST = json_decode(file_get_contents('php://input'));
$_POST = convert_object_to_array($_POST);

$id;
$name;
$address;
$phone;
$email;
$gender;
$dob;
$role;
$balance;

$base = "";

$router = new Router($base);



$router->get("/products/{productID}", function ($args) {
    $productmodel = new products();
    echo json_encode($productmodel->getBy("PID", str_replace("%20", " ", $args["productID"])));
});





$router->post("/newtransaction", function () {
    $usermodel = new users();
    $productmodel = new products();
    // echo json_encode($usermodel->getAll());
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    if ($_POST[0] == "Cash_Balance") {
        $usermodel->Update($_POST[0], $_POST[1], $_POST[2], $_POST[3]);
        if (isset($_SESSION["Cash_Balance"])) {
            $_SESSION["Cash_Balance"] = $_POST[1];
        }
    } else {
        $productmodel->Update($_POST[0], $_POST[1], $_POST[2], $_POST[3]);
    }

});
$router->post("/transaction", function () {
    $transactionmodel = new transaction();
    // echo json_encode($usermodel->getAll());
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $transactionmodel->insert($_POST);
});
$router->post("/gettransaction", function () {
    $transactionmodel = new transaction();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    echo json_encode($transactionmodel->getBY("BID", $_POST));
});
$router->post("/getlistings", function () {
    $productmodel = new products();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    echo json_encode($productmodel->getBY("SID", $_POST));
});
$router->get("/products", function () {
    $productmodel = new products();
    echo json_encode($productmodel->getAll());
});
$router->post("/product", function () {
    $productmodel = new products();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $query = "(";
    foreach ($_POST as &$value) {
        $query = $query . $value["PID"] . ",";
    }
    $query = substr($query, 0, -1);
    $query = $query . ")";
    print_r(json_encode($productmodel->getByInTransaction("PID", $query)));
});


$router->post("/search", function () {
    $productmodel = new products();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $category = $_POST["category"];
    $min = $_POST["range"][0];
    $max = $_POST["range"][1];
    $regex = '%' . $_POST["search"] . '%';
    echo json_encode($productmodel->getLike($regex, $category, $min, $max));
});

$router->post("/login", function () {
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    validateLogin();
    echo json_encode($_SESSION);
});

$router->post("/register", function () {
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    validateRegister();
});

$router->get("/session", function () {
    echo json_encode($_SESSION);
});

$router->get("/logout", function () {
    session_unset();
    session_destroy();
});

$router->post("/upload", function () {
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $_POST["SID"] = $_SESSION["ID"];
    $name = $_POST["Product_Name"];
    $price = $_POST["Product_Price"];
    $quantity = $_POST["Quantity_Available"];
    $description = $_POST["Product_Description"];
    $category = $_POST["Category"];
    echo $category;
    $image = $_POST["Product_Picture"];
    $DIR = "./images/";
    $file_chunks = explode(";base64,", $image);
    $fileType = explode("image/", $file_chunks[0]);
    $image_type = $fileType[1];
    $base64Img = base64_decode($file_chunks[1]);
    $id = uniqid();
    $file = $DIR . $id . "." . $image_type;
    file_put_contents($file, $base64Img);
    $_POST["Product_Picture"] = "http://localhost/images/" . $id . "." . $image_type;
    $productmodel = new products();
    foreach ($_POST as $field) {
        //echo $field;
    }
    $productmodel->insert($_POST);
});

$router->route();

?>