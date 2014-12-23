<?php

session_start();

$userID = $_GET['userID'];
$token = $_GET['token'];

if($token == $_SESSION['token']) {
	echo 'success';
}
else {
	echo $token . ' ' . $_SESSION['token'];
}

exit();

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql =  "SELECT * FROM users WHERE UserID='" . $userID . "';";

$query = mysqli_query($con, $sql);
$profileData = mysqli_fetch_array($query);

$jsonData = json_encode($profileData);
echo $jsonData;

?>