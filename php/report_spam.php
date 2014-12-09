<?php

$wordID = $_GET['wordID'];
$definitionID = $_GET['definitionID'];
$userID = $_GET['userID'];

$user = 'root';
$pass = '';
$db = 'kamusi';

$con = mysqli_connect('localhost', $user, $pass, $db);

if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

$sql =	"SELECT * FROM admin;";
$result = mysqli_query($con, $sql);

while ($row = $result->fetch_assoc()) {
	$alias = $row["Alias"];
	$to = $row["Email"];

	$subject = "Spam report!";
	$body = "Hi " . $alias . ",\n\n" .
	"We have received a report from user: " . $userID . " " .
	"that definition '" . $definitionID . "' for word '" . $wordID . "' " .
	"is spam.\n\n" .
	"Please note that this email is auto-generated.";

	if (mail($to, $subject, $body)) {
		echo("<p>Email successfully sent!</p>");
	}
	else {
		echo("<p>Email delivery failed…</p>");
	}
}

?>