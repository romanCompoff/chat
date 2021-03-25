<?php use Dva\Chat\Controllers\MainController;

require __DIR__ . '/../../vendor/autoload.php';

$controller = new MainController;
$channel = $controller->connectToChannel();

if ($channel) {
    if (!isset($_COOKIE['userChat'])) {
        setcookie("userChat", time(), 0, "/", $_SERVER['SERVER_NAME']);
    } else {
        $coockieValue = $_COOKIE['userChat'] .= "|=|" . time();
        setcookie("userChat", $coockieValue, 0, "/", $_SERVER['SERVER_NAME']);
    }
    $c = explode("|=|", $_COOKIE["userChat"]);
    $channel['coockieData'] = $c[0];
    $controller->upTime($channel["id"]);
    echo json_encode($channel);
}