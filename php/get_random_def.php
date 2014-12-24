<?php

include 'validate_token.php';

$token = $_GET['token'];

if(!validate_token($token)) {
	die();
}

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql = "SELECT * FROM definitions ORDER BY RAND() LIMIT 1;";
$results_array = mysqli_query($con, $sql)->fetch_assoc();

$jsonData = json_encode($results_array);
echo $jsonData;

?>