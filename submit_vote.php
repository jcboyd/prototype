<?php

include 'notification.php';

$definitionID = $_GET['definitionID'];
$vote = $_GET['vote'];

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql = 	"UPDATE definitions " .
		"SET Votes = Votes + " . $vote . " " . 
		"WHERE DefinitionID = " . $definitionID . ";";
$query = mysqli_query($con, $sql);

$sql = 	"SELECT UserID, Votes FROM definitions " .
		"WHERE DefinitionID = " . $definitionID . ";";

$result = mysqli_query($con, $sql);

$results_array = $result->fetch_assoc();

$user_id = $results_array["UserID"];
$votes = $results_array["Votes"];

echo $votes;

if($votes == 15) {
	send_notification('1629333623960388');
}

echo 'Success';

?>