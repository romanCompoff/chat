<?
require __DIR__ . '/../../vendor/autoload.php';

$message = $_POST['message'];

$channel = json_decode($_POST["channels"]);
$app_id = $channel->app_id;
$key = $channel->app_key;
$secret = $channel->app_secretr;
$cluster = $channel->cluster;
$pusher = new Pusher\Pusher($key, $secret, $app_id, array('cluster' => $cluster));
$pusher->trigger('my-channel', 'my-event', array('message' => htmlspecialchars(trim($message)), 'history' => htmlspecialchars(trim($history))));