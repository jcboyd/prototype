<?php

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

echo 'Success';

?>