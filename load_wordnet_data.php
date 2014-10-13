<?php
ini_set('max_execution_time', 300); //300 seconds = 5 minutes

echo 'Running...';

//Extract the substring of #line between #head and #tail substrings
function getField($line, $head, $tail) {
	$headpos = strpos($line, $head) + strlen($head);
	$tailpos = $headpos + strpos(substr($line, $headpos), $tail);
	return substr($line, $headpos, $tailpos - $headpos);
}

function import_file() {
	//File to import
	$filename = 'wn31.nt';
	$handle = fopen($filename, "r") or die("Couldn't get handle");

	//Connect to database
	$user = 'root';
	$pass = '';
	$db = 'testdb';

	$con = mysql_connect('localhost', $user, $pass);

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}

	$db_selected = mysql_select_db($db, $con);

	//if ($handle) {
	$var = 0;
	$entryID = 0;
	$currentWord = '';
	$currentDefinition = '';
	$gotWord = False;
	$gotDefinition = False;

    while (!feof($handle)) {
        $buffer = fgets($handle, 4096);
        $currentEntryID = getField($buffer, '/wn31/', '-n');

        if($currentEntryID != $entryID) {
        	$entryID = $currentEntryID;
        	//echo $entryID . '</br>';
        }

        $lineType = getField($buffer, '#', '>');

        switch ($lineType) {
        	case 'label':
        		$currentWord = getField($buffer, 'label> "', '"');
        		//echo 'Word:' . $currentWord . '</br>';
        		$gotWord = True;
        		break;
        	case 'gloss':
        		$currentDefinition = getField($buffer, 'gloss> "', '"');
        		//echo 'Definition:' . $currentDefinition . '</br>';
        		$gotDefinition = True;
        		break;
        }

        if($gotWord and $gotDefinition) {
        	//echo 'INSERT ATTEMPT MADE';
        	$sql = "INSERT INTO wordnet_data (ID, Word, Definition) VALUES (" . $entryID . ",'" . $currentWord . "','" . $currentDefinition . "')";
			$retval = mysql_query($sql, $con);
			$gotWord = False;
			$gotDefinition = False;
        }

        $var++;
		//if($var > 10000) { break; }
    }
    fclose($handle);

	//echo mysql_result($result, 0);
	mysql_close($con);
}

import_file();

//$result = mysql_query($sql, $con);

echo 'Finished';

?>