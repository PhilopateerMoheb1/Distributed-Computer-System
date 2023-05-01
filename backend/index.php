<?php
require_once("Helpers/Router.php");
require_once("Helpers/helpers.php");
require_once("Models/Model.php");
require_once("Models/slots.php");
require_once("Validator.php");
require_once("Models/users.php");
require_once("Models/event.php");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$_POST = json_decode(file_get_contents('php://input'));
$_POST = convert_object_to_array($_POST);





$base = "";

$router = new Router($base);



$router->get("/event/{event}", function($args){
	$eventModel = new event();
    echo json_encode($eventModel->getBy("Name",str_replace("%20"," ",$args["event"])));
});


$router->get("/events", function(){
    $eventModel = new event();
    echo json_encode($eventModel->getAll());

});


$router->route();

?>
