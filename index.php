<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="styles/style.css" >

	</head>
	<body>
		<table id = "tableChat">
			<tbody>
				<tr>
					<td>
						<div id = "divChat" class = "divChat">
			<?=$content?>

						</div>
					</td>
				</tr>
				<tr>
					<td id = "indicator">
					</td>
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
<script src="app/main.js"></script>