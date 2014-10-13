<?php

$user = 'root';
$pass = '';
$db = 'testdb';

$con = mysql_connect('localhost', $user, $pass);

if (!$con) {
	die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db($db, $con);

$sql = "SELECT Word, Definition FROM wordnet_data ORDER BY RAND() LIMIT 1";
$result = mysql_query($sql, $con);

echo mysql_result($result, 0, 1);
mysql_close($con);

?>