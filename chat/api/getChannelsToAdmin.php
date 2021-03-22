<?php use Dva\Chat\Controllers\AdminController;

require __DIR__ . '/../../vendor/autoload.php';

$controller = new AdminController;
$channel = $controller->getAllChannels();

if($channel){
   echo json_encode($channel);
}