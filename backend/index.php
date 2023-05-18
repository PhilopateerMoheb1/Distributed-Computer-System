<?php
ini_set("session.cookie_domain", '.localhost');
session_set_cookie_params(3600, '/', '.localhost');
if (!isset($_SESSION)) {
    session_start();
}
// csrf code add here (see below...)
$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "http://dev.local:3000" || $http_origin == "http://localhost:3000" || $http_origin == "http://localhost:3000/login" || $http_origin == "http://lumia.com" || $http_origin == "http://moon.com") {
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
require_once("Models/sellers.php");
require_once("Models/buyers.php");
require_once("Models/sellersbasic.php");
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

$router->get("/getproducts", function () {
    $productmodel = new products();
    echo json_encode($productmodel->getAlldb3());
});
$router->post("/getSellers", function () {
    $SellerModel = new sellers();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    echo json_encode($SellerModel->getBYdb1("ID", $_POST));
});
$router->post("/payseller", function () {
    $SellerModel = new sellers();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $SellerModel->Updatedb1($_POST[0], $_POST[1], $_POST[2], $_POST[3]);
});

$router->post("/delete", function ($args) {
    $productmodel = new products();
    $productmodel->Deletedb3("PID", $_POST["PID"]);
});



$router->post("/newtransaction", function () {
    $SellerModel = new sellers();
    $BuyersModel = new buyers();
    $productmodel = new products();
    // echo json_encode($usermodel->getAll());
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    if ($_POST[0] == "Cash_Balance") {
        if ($_SESSION['Role'] == "Seller") {
            $SellerModel->Updatedb1($_POST[0], $_POST[1], $_POST[2], $_POST[3]);
        } else {
            $BuyersModel->Updatedb2($_POST[0], $_POST[1], $_POST[2], $_POST[3]);
        }
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
    print_r($_POST);
    $transactionmodel->insertdb3($_POST);
});
$router->post("/gettransaction", function () {
    $transactionmodel = new transaction();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    echo json_encode($transactionmodel->getBY("BID", $_POST));
});
$router->post("/getsold", function () {
    $transactionmodel = new transaction();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    echo json_encode($transactionmodel->getBY("SID", $_POST));
});
$router->post("/getlistings", function () {
    $productmodel = new products();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    echo json_encode($productmodel->getBY("SID", $_POST));
});
$router->get("/products", function () {
    $productmodel = new products();
    echo json_encode($productmodel->getAlldb3());
});
$router->post("/product", function () {
    $productmodel = new products();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $query = "(";
    foreach ($_POST[0] as &$value) {
        $query = $query . $value["PID"] . ",";
    }
    $query = substr($query, 0, -1);
    $query = $query . ")";
    print_r(json_encode($productmodel->getByInTransaction("PID", $query,$_POST[1])));
});
$router->post("/sold", function () {
    $productmodel = new products();
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $query = "(";
    foreach ($_POST[0] as &$value) {
        $query = $query . $value["PID"] . ",";
    }
    $query = substr($query, 0, -1);
    $query = $query . ")";
    print_r(json_encode($productmodel->getByInSold("PID", $query,$_POST[1])));
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

$router->post("/edit", function () {
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
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
    $productmodel->Updatedb3($_POST["Product_Name"], $_POST["Product_Price"], $_POST["Quantity_Available"], $_POST["Category"], $_POST["Product_Description"], $_POST["Product_Picture"], "PID", $_POST["PID"]);
});

$router->post("/upload", function () {
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $_POST["SID"] = $_SESSION["ID"];
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
    $productmodel->insertdb3($_POST);
});

$router->route();

?>