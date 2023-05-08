<?php

header("Access-Control-Allow-Origin: *");
require_once("Helpers/Router.php");
require_once("Helpers/helpers.php");
require_once("Models/Model.php");
require_once("Models/slots.php");
require_once("Validator.php");
require_once("Models/users.php");
require_once("Models/products.php");
require_once("Models/event.php");


$_POST = json_decode(file_get_contents('php://input'));
$_POST = convert_object_to_array($_POST);




$base = "";

$router = new Router($base);



$router->get("/event/{event}", function ($args) {
    $eventModel = new event();
    echo json_encode($eventModel->getBy("Name", str_replace("%20", " ", $args["event"])));
});


$router->get("/events", function () {
    echo "HIIIIIIIIIIIIIIII";
    $eventModel = new event();
    echo json_encode($eventModel->getAll());

});
$router->get("/users", function () {
    $usermodel = new users();
    echo json_encode($usermodel->getAll());
});

$router->post("/transaction", function () {
    $usermodel = new users();
    // echo json_encode($usermodel->getAll());
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $usermodel->Update($_POST[0], $_POST[1], $_POST[2], $_POST[3]);
});
$router->get("/products", function () {
    $productmodel = new products();
    echo json_encode($productmodel->getAll());
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

$router->route();

?>