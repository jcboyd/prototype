<?php

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql =	"SELECT sq.ID, sq.Word, sq.PartOfSpeech, d.Definition FROM  (" . 
		"SELECT * FROM rankedwords " . 
		"WHERE Rank BETWEEN 1 and 20 " .
		"ORDER BY RAND() LIMIT 1" .
		") As sq " .
		"LEFT JOIN " . 
		"definitions As d " .
		"ON sq.ID = d.WordID;";

$result = mysqli_query($con, $sql);

$results_array = array();

while ($row = $result->fetch_assoc()) {
  $results_array[] = $row;
}

$jsonData = json_encode($results_array);
echo $jsonData;

?>