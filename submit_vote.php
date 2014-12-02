<?php

include 'notification.php';

$wordID = $_GET['wordID'];
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

if($votes == 1 && $user_id != 'wordnet') {
	$sql = 	"UPDATE users " .
			"SET Points = Points + 1 " . 
			"WHERE UserID = '" . $user_id . "';";
	$query = mysqli_query($con, $sql);

	send_notification($user_id, $wordID);
}

$sql = 	"SELECT Consensus FROM rankedwords " .
		"WHERE WordID=" . $wordID . ";";
$query = mysqli_query($con, $sql);
$results_array = $result->fetch_assoc();

if($results_array["Consensus"]) {
	$sql = 	"SELECT * FROM definitions " .
			"WHERE WordID= " . $wordID . " " .
			"ORDER BY Votes DESC " .
			"LIMIT 1;";

	$query = mysqli_query($con, $sql);
	$results_array = $result->fetch_assoc();

	$sql = 	"SELECT COUNT(*) As Count FROM definitions " .
			"WHERE WordID= " . $wordID . ";";
	$query = mysqli_query($con, $sql);
	$results_array = $result->fetch_assoc();

	$rand_exp = 1/min(5, $results_array["Count"]);

	if($definition = $results_array['DefinitionID']) { //User selected correctly
		$sql = 	"UPDATE users SET Rating = Rating + " . (1 - $rand_exp) . ";";
	}
	else { //User did not select correctly
		$sql = 	"UPDATE users SET Rating = Rating + " . -$rand_exp . ";";
	}
	$query = mysqli_query($con, $sql);
}

echo 'Success';

?>