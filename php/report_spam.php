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

$sql = "SELECT Mute FROM users WHERE userID='" . $userID . "';";
$result = mysqli_query($con, $sql);
$result_array = $result->fetch_assoc();

if($result_array["Mute"]) { //User has been muted before--ignore
	exit();
}

$sql =	"SELECT * FROM admin;";
$result = mysqli_query($con, $sql);

while ($row = $result->fetch_assoc()) {
	$alias = $row["Alias"];
	$to = $row["Email"];

	$root_link = "http://ec2-54-186-29-34.us-west-2.compute.amazonaws.com/php/";
	$remove_link = $root_link . "remove_spam.php?definitionID=" . $definitionID;
	$mute_link = $root_link . "mute_user.php?userID=" . $userID;

	$headers = "From: " . "Kamusi GAME" . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	$message = '<html><body>';
	$message .= '<img src="http://kamusi.org/sites/kamusi.org/themes/bs_Kamusi/logo.png" alt="Kamusi GAME" />';
	$message .= "</br>";

	$message .= '<table style="border-color: #000;" cellpadding="10">';
	$message .= "<tr style='background: #ccc;'><td><strong>User:</strong> </td><td>" . $userID . "</td></tr>";
	$message .= "<tr><td><strong>Word:</strong> </td><td>" . $wordID . "</td></tr>";
	$message .= "<tr style='background: #ccc;'><td><strong>Definition:</strong> </td><td>" . $definitionID . "</td></tr>";
	$message .= '<tr><td><a href="' . $remove_link . '">Remove spam</a></td><td><a href="' . $mute_link . '">Mute user</a></td></tr>';
	$message .= "</table>";
	$message .= "</body></html>";

	$subject = "Kamusi GAME spam report";

	if (mail($to, $subject, $message, $headers)) {
		echo("<p>Email successfully sent!</p>");
	}
	else {
		echo("<p>Email delivery failed…</p>");
	}
}

?>