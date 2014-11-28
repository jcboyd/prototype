<?php

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql =	"SELECT sq.ID, sq.Word, p.Full, d.DefinitionID, d.Definition, d.UserID, d.Votes FROM (" . 
		"SELECT * FROM rankedwords " . 
		"WHERE Rank BETWEEN 1 and 100 " .
		"ORDER BY RAND() LIMIT 1" .
		") As sq " .
		"LEFT JOIN " .
		"definitions As d " .
		"ON sq.ID = d.WordID " .
		"LEFT JOIN pos As p ON sq.PartOfSpeech = p.Code " .
		"ORDER BY d.Votes;";

$result = mysqli_query($con, $sql);

$results_array = array();

while ($row = $result->fetch_assoc()) {
  $results_array[] = $row;
}

$jsonData = json_encode($results_array);
echo $jsonData;

?>