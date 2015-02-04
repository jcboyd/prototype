<?php

include 'validate_token.php';

$userID = $_GET['userID'];
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

$user_position = $results_array["PositionMode1"];

// $user_position = mysqli_fetch_array($result);

// $sql =	"SELECT sq.ID, sq.Word, sq.Consensus, p.Full, d.DefinitionID, d.Definition, d.UserID, d.Votes FROM (" . 
// $sql =	"SELECT sq.ID, sq.Word, sq.Consensus, sq.PartOfSpeech, d.DefinitionID, d.Definition, d.UserID, d.Votes FROM (" . 
// 		"SELECT * FROM rankedwords " .
// 		"WHERE Rank=" . $user_position .
// 		") As sq " .
// 		"LEFT JOIN " .
// 		"definitions As d " .
// 		"ON sq.ID = d.WordID " .
// 		// "LEFT JOIN pos As p ON sq.PartOfSpeech = p.Code " .
// 		"ORDER BY d.Votes " .
// 		"LIMIT 5;";

// $result = mysqli_query($con, $sql);

// $results_array = array();

// while ($row = $result->fetch_assoc()) {
// 	$results_array[] = $row;
// }

// Retrieve ID of word with first Rank greater than user_position, i.e. the first word with a sense.
$sql =  "SELECT w.ID As ID, w.DefinitionID As DefinitionID, sq.Rank As Rank FROM ( ";
$sql .= "SELECT * FROM rankedwords WHERE Rank >= " . $user_position . " ORDER BY(Rank)"; // . " ORDER BY(Rank) LIMIT 1";
$sql .= ") As sq LEFT JOIN words As w ";
$sql .= "ON sq.Word = w.Word ";
$sql .= "LIMIT 1;";

// $sql = 	"SELECT Word, PartOfSpeech from rankedwords WHERE Rank=" . $user_position;
$result = mysqli_query($con, $sql);
$results_array = $result->fetch_assoc();

// $word = $results_array["Word"];
// $pos = $results_array["PartOfSpeech"];

// Currently we will only ever return one sense (LIMIT 1)
// $sql = "SELECT * FROM words WHERE Word='" . $word . "'AND PartOfSpeech='" . $pos . "' LIMIT 1;";
// $result = mysqli_query($con, $sql);
// $num_results = mysqli_num_rows($result);

// if($num_results == 0) { //word does not exist - enter into word table
// 	$sql = "INSERT INTO words (Word, PartOfSpeech) VALUES('" . $word . "','" . $pos . "');";
// 	$result = mysqli_query($con, $sql);
// 	$sql = "SELECT * FROM words WHERE Word='" . $word . "'AND PartOfSpeech='" . $pos . "' LIMIT 1;";
// 	$result = mysqli_query($con, $sql);
// }

// $results_array = $result->fetch_assoc();
$word_id = $results_array['ID'];
// $definitionID = $results_array['DefinitionID'];

$new_rank = $results_array['Rank'] + 1;

// increment user position
$sql =	"UPDATE users SET PositionMode1 = " . $new_rank . " WHERE UserID = " . $userID . ";";
$result = mysqli_query($con, $sql);

// Return all definitions corersponding to this GroupID
$sql =  "SELECT sq.ID As WordID, sq.Word, sq.PartOfSpeech, d.ID As DefinitionID, d.Definition, d.GroupID, d.UserID As Author ";
$sql .= "FROM (SELECT * FROM words WHERE ID=" . $word_id . ") AS sq ";
$sql .= "LEFT JOIN definitions As d ON sq.DefinitionID = d.GroupID ORDER BY Votes desc;";

$result = mysqli_query($con, $sql);

$results_array = array();

while ($row = $result->fetch_assoc()) {
	$results_array[] = $row;
}

$jsonData = json_encode($results_array);
echo $jsonData;

?>