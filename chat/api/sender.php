<?
require __DIR__ . '/../../vendor/autoload.php';
use Dva\Chat\Core\PusherSingleton;

$message = $_POST['message'] ?? "";
$admin = $_POST['admin'] ?? "";
$err = $_POST['err'] ?? "";
$channel = json_decode($_POST["channels"]);
$app_id = $channel->app_id;
$key = $channel->app_key;
$secret = $channel->app_secretr;
$cluster = $channel->cluster;
$pusher = PusherSingleton::getPusher($key, $secret, $app_id, $cluster);
$pusher->trigger('my-channel', 'my-event', array('message' => htmlspecialchars(trim($message)), 
'admin' => htmlspecialchars(trim($admin)),
'err' => htmlspecialchars(trim($err)),
'coockieData' => $_POST["coockieData"] ?? htmlspecialchars(trim($_COOKIE['userChat'])), 
'channel'=>$channel));