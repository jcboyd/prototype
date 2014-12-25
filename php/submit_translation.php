<?php

$languageID = 1; //French by default
$definitionID = $_GET['definitionID'];
$userID = $_GET['userID'];
$word = $_GET['word'];

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql = 	"INSERT INTO translations " .
		"(LanguageID, DefinitionID, UserID, Word) VALUES " .
		"(" . $languageID . "," . $definitionID . ",'" . $userID . "','" . $word . "');";

$query = mysqli_query($con, $sql);

echo 'Success';

?>