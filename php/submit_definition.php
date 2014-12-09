<?php

$wordID = $_GET['wordID'];
$definition = $_GET['definition'];
$userID = $_GET['userID'];

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql = 	"INSERT INTO definitions " .
		"(WordID, Definition, UserID) VALUES " . 
		"(" . $wordID . ",'" . $definition . "','" . $userID . "');";
$query = mysqli_query($con, $sql);

echo 'Success';

?>