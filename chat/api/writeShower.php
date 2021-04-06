<?
require __DIR__ . '/../../vendor/autoload.php';
use Dva\Chat\Core\PusherSingleton;

$client = $_POST['client'] ?? "";
$admin = $_POST['admin'] ?? "";
$err = $_POST['err'] ?? "";
$channel = json_decode($_POST["channels"]);
$app_id = $channel->app_id;
$key = $channel->app_key;
$secret = $channel->app_secretr;
$cluster = $channel->cluster;

$pusher = PusherSingleton::getPusher($key, $secret, $app_id, $cluster);

$pusher->trigger('my-channel', 'writeShower', array(
    'client' => htmlspecialchars(trim($client)), 
    'admin' => htmlspecialchars(trim($admin)),
    'coockieData' => $_POST["coockieData"] ?? htmlspecialchars(trim($_COOKIE['userChat']))));