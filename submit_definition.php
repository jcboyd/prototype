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

//$sql = "SELECT MAX(DefinitionID) FROM definitions";
//$query = mysqli_query($con, $sql);
//$row = mysqli_fetch_array($query);

$definitionID = 1;

$sql = "INSERT INTO definitions (DefinitionID, WordID, Definition, UserID) VALUES (" . $definitionID . "," . $wordID . ",'" . $definition . "','" . $userID . "');";
$query = mysqli_query($con, $sql);

echo 'Success';

?>