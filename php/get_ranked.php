<?php

include 'validate_token.php';

$userID = $_GET['userID'];
$token = $_GET['token'];

if(!validate_token($token)) {
	die();
}

// session_start();

// $userID = $_GET['userID'];
// $token = $_GET['token'];

// if($token != $_SESSION['token']) {
// 	die();
// }

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql = "SELECT Position FROM users WHERE UserID='" . $userID . "';";
$result = mysqli_query($con, $sql);
$results_array = $result->fetch_assoc();
$user_position = $results_array["Position"];

$sql =	"SELECT sq.ID, sq.Word, sq.Consensus, p.Full, d.DefinitionID, d.Definition, d.UserID, d.Votes FROM (" . 
		"SELECT * FROM rankedwords " . 
		"WHERE Rank=" . $user_position .
		") As sq " .
		"LEFT JOIN " .
		"definitions As d " .
		"ON sq.ID = d.WordID " .
		"LEFT JOIN pos As p ON sq.PartOfSpeech = p.Code " .
		"ORDER BY d.Votes " .
		"LIMIT 5;";
		
$result = mysqli_query($con, $sql);

$results_array = array();

while ($row = $result->fetch_assoc()) {
	$results_array[] = $row;
}

$sql =	"UPDATE users " .
		"SET Position = Position + 1 " . 
		"WHERE UserID = " . $userID . ";";

$result = mysqli_query($con, $sql);
$user_position = mysqli_fetch_array($result);

$jsonData = json_encode($results_array);
echo $jsonData;

?>