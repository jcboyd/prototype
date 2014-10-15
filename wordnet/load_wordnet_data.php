<?php
ini_set('max_execution_time', 300); //300 seconds = 5 minutes

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
	$db = 'kamusi';

	$con = mysqli_connect('localhost', $user, $pass, $db);

	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}

	$var = 0; $entryID = 0;
	$currentWord = ''; $currentDefinition = '';
	$gotWord = False; $gotDefinition = False;
	
    while (!feof($handle)) {
        $buffer = fgets($handle, 4096);
        $currentEntryID = getField($buffer, '/wn31/', '-n');

        if($currentEntryID != $entryID) {
        	$entryID = $currentEntryID;
        }

        $lineType = getField($buffer, '#', '>');

        switch ($lineType) {
        	case 'label':
        		$currentWord = getField($buffer, 'label> "', '"');
        		$gotWord = True;
        		break;
        	case 'gloss':
        		$currentDefinition = getField($buffer, 'gloss> "', '"');
        		$gotDefinition = True;
        		break;
        }

        if($gotWord and $gotDefinition) {
        	$sql = "INSERT INTO wordnet (ID, Word, Definition) VALUES (" . $entryID . ",'" . $currentWord . "','" . $currentDefinition . "')";
			$retval = mysqli_query($con, $sql);
			$gotWord = False;
			$gotDefinition = False;
        }
        $var++;
    }
    fclose($handle);

	mysqli_close($con);
}

echo 'Running.../n';

import_file();

echo 'Finished/n';

?>