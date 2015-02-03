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

$sql = "SELECT * FROM users WHERE UserID='" . $userID . "';";
$result = mysqli_query($con, $sql);
$results_array = $result->fetch_assoc();

$user_position = $results_array["PositionMode2"];

// increment user position
$sql =	"UPDATE users " .
		"SET PositionMode2 = PositionMode2 + 1 " .
		"WHERE UserID = " . $userID . ";";

$result = mysqli_query($con, $sql);

$sql =  "SELECT w.ID As ID, w.DefinitionID As DefinitionID FROM ( ";
$sql .= "SELECT * FROM rankedwords WHERE Rank >= " . $user_position . "ORDER BY(Rank) LIMIT 1";
$sql .= ") As sq, words As w ";
$sql .= "WHERE sq.Word = w.Word ";
$sql .= "LIMIT 1;";

$result = mysqli_query($con, $sql);
$results_array = $result->fetch_assoc();
$word_id = $results_array["ID"];
$definitionID = $results_array['DefinitionID'];

$sql =  "SELECT sq.ID, sq.Word, sq.PartOfSpeech, sq.DefinitionID, d.Definition FROM ";
$sql .= "FROM (SELECT * FROM words WHERE ID=" . $word_id . ") AS sq ";
$sql .= "LEFT JOIN definitions As d ON sq.DefinitionID = d.GroupID "
$sql .= "ORDER BY Votes desc LIMIT 1;";


// $sql = 	"SELECT sq.ID, sq.Definition, r.Word, r.PartOfSpeech FROM " .
// 		"(SELECT * FROM definitions ORDER BY RAND() LIMIT 1) As sq, rankedwords As r " . 
// 		"WHERE sq.WordID = r.ID;";

// $sql = 	"SELECT sq.ID, sq.Word, sq.PartOfSpeech, sq.DefinitionID, d.Definition FROM " .
// 		"(SELECT * FROM words WHERE DefinitionID IS NOT NULL ORDER BY RAND() LIMIT 1) As sq " .
// 		"LEFT JOIN definitions As d " . 
// 		"ON sq.DefinitionID = d.GroupID ORDER By Votes LIMIT 1;";

$results_array = mysqli_query($con, $sql)->fetch_assoc();

$jsonData = json_encode($results_array);
echo $jsonData;

?>