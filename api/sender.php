<?
require __DIR__ . '/../vendor/autoload.php';
$app_id = "798784";
$key = "5bb5b14a93403d2d92c3";
$secret = "69bae25d1045cb88259b";
$cluster = "eu";
$pusher = new Pusher\Pusher($key, $secret, $app_id, array('cluster' => $cluster));
$pusher->trigger('my-channel', 'my-event', array('message' => htmlspecialchars(trim($_POST['message']))));