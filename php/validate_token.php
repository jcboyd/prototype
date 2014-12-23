<?php

function validate_token($token) {
	if($token == $_SESSION['token']) {
		return true;
	}
	return false;
}

?>