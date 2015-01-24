<?php

$wordID = $_GET['wordID'];//82605; //$_GET['wordID'];
$groupID = $_GET['groupID'];//200594278; //$_GET['groupID'];
$definition = $_GET['definition'];//'something to test'; //$_GET['definition'];
$userID = $_GET['userID'];//1479788208970002;//$_GET['userID'];

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

if ($groupID == 'null') {
	$sql = 	"SELECT MAX(GroupID) FROM definitions;";
	$results_array = mysqli_query($con, $sql)->fetch_assoc();;
	$groupID = $results_array['MAX(GroupID)'] + 1;
	$sql = 	"UPDATE words SET GroupID=" . $groupID . "WHERE ID=" . $wordID . ";";
}

$sql = 	"INSERT INTO definitions " .
		"(Definition, GroupID, UserID) VALUES " . 
		"('" . $definition . "'," . $groupID . ",'" . $userID . "');";
$query = mysqli_query($con, $sql);

echo 'Success';

?>