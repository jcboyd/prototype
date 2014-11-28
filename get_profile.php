<?php

$userID = $_GET['userID'];

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql =  "SELECT u.UserID, u.Points, r.Word, d.Definition FROM " .
		"users As u LEFT JOIN definitions As d " .
		"ON u.UserID=d.UserID " .
		"LEFT JOIN rankedwords As r " .
		"ON r.ID=d.WordID " .
		"WHERE u.UserID='" . $userID . "' AND d.Votes=1;";

$query = mysqli_query($con, $sql);
$profileData = mysqli_fetch_array($query);

$jsonData = json_encode($profileData);
echo $jsonData;

?>