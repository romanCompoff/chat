<?php use Dva\Chat\Controllers\MainController;

require __DIR__ . '/../vendor/autoload.php';

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="/chat/styles/style.css" >
	</head>
	<body>
		<div id="previewChats"></div>
		<div id="dialog"></div>
    </body>
</html>


<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
<script src="/chat/app/main.js"></script>
<script src="/chat/app/admin.js"></script>