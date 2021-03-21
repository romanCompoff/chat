<?php use Dva\Chat\Controllers\MainController;

require __DIR__ . '/../vendor/autoload.php';

?>
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