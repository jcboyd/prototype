<?php

// include 'validate_token.php';

// $token = $_GET['token'];

// if(!validate_token($token)) {
// 	die();
// }

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$result = mysqli_query($con, $sql);
// $sql = 	"SELECT sq.ID, sq.Definition, r.Word, r.PartOfSpeech FROM " .
// 		"(SELECT * FROM definitions ORDER BY RAND() LIMIT 1) As sq, rankedwords As r " . 
// 		"WHERE sq.WordID = r.ID;";

$sql = 	"SELECT sq.ID, sq.Word, sq.PartOfSpeech, sq.DefinitionID, d.Definition FROM " .
		"(SELECT * FROM words WHERE DefinitionID IS NOT NULL ORDER BY RAND() LIMIT 1) As sq " .
		"LEFT JOIN definitions As d " . 
		"ON sq.DefinitionID = d.GroupID ORDER By Votes LIMIT 1;";

$results_array = mysqli_query($con, $sql)->fetch_assoc();

$jsonData = json_encode($results_array);
echo $jsonData;

?>