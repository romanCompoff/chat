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
	<table data-id="<?=$channel["app_id"]?>" data-key="<?=$channel["app_key"]?>" data-secret="<?=$channel["app_secret"]?>" data-cluster="<?=$channel["cluster"]?>" id = "tableChat">
		<tbody>
			<tr>
				<td>
					<div id = "divChat" class = "divChat"></div>
				</td>
			</tr>
			<tr>
				<td id = "indicator"></td>
			</tr>
			<tr class = "input">
				<td class = "input">
					<form id="sendMessageForm"> 
						<input class = "text" type="text"  name = "message" id = "message" >
						<input type="submit"  value="Отправить (ENTER)">
					</form>
				</td>
			</tr>
		<tbody>
	</table>
	<input type="submit"  value="Спрятать/показать" id = "hideChat">
    </body>
</html>


<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
<script src="/chat/app/main.js"></script>
<script src="/chat/app/admin.js"></script>