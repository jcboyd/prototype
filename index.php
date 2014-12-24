<?php

session_start();

function generateToken() {
	// generate token from random value
	$token = md5(rand(pow(2, 32), pow(2, 33)));  

	// Store token in session superglobal
	$_SESSION['token'] = $token; 

	return $token;
}

?>

<!DOCTYPE>
<html>
<head>
	<title>Kamusi GAME</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="styles/style.css"/>
	<link rel="stylesheet" type="text/css" href="styles/mstyle.css"/> <!-- media="only screen and (max-device-width: 480px)" -->
	<!-- <link rel="stylesheet" type="text/css" media="only screen and (-moz-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)" href="styles/mstyle.css"/> -->
</head>

<?php
	$newToken = generateToken();   
?>

<body>
	<div id="main" ng-app ng-controller="InlineEditorController" ng-click="hideTooltip()">
		<div id="portal">
			<div id="welcome">
				<canvas width="930" height="550" id="animation">Your browser doesn't support HTML5.</canvas>
				<img id="logo" src="media/logo.png" onmousedown="animate_logo();">
				<img id="enter1" class="shaded_enter" src="media/book.png" onmousedown="playClick();enter_game1();">
				<img id="enter2" class="shaded_enter" src="media/quill.png" onmousedown="playClick();enter_game2();">
			</div>
			<div id="game">
				<div id="controls">
					<div id="controlheader">
						<img id="controltitle" src="media/banner.png">
					</div>
					<img title="Profile" id="user" class="control" src="media/user.png" onclick="playClick();display_profile();">
					<img title="Invite" id="shield" class="control" src="media/invite.png" onclick="playClick();request();">
					<img title="Share" id="gossip" class="control" src="media/balloon.png" onclick="playClick();share();">
					<img title="Info" id="information" class="control" src="media/info.png" onclick="playClick();display_about();">
					<img title="Home" id="auction" class="control" src="media/home.png" onclick="playClick();display_welcome();">
				</div>
				<div id="gamezone">
					<div id="gamezone-main1">
						<div id="entry">
							<p id="word"></p>
							<p id="pos"></p>
							<p id="consensus"></p>
						</div>
						<div id="definitions_wrapper">
							<!-- This is the tooltip. It is shown only when the showtooltip variable is truthful -->
							<div class="input_tool" ng-click="$event.stopPropagation()" ng-show="showtooltip">
								<!-- ng-model binds the contents of the text field with the "value" model.
								 Any changes to the text field will automatically update the value, and
								 all other bindings on the page that depend on it.  -->
								<input id="input_tool_box" type="text" ng-model="value" ng-keypress="searchEnter($event);" onFocus="this.select()"/>
							</div>
							<table id="definitions">
								<tr>
									<td>
										<li ng-click="toggleTooltip($event)" id="user_definition" class="inactive_definition">{{value}}</li>
									</td>
								</tr>
							</table>
						</div>
					</div>
					<div id="gamezone-main2">
						<p>SECOND GAME MODE HERE SOON</p>
						<img title="Return" class="control" src="media/leftarrow.png" onclick="playClick();display_welcome();">
					</div>
					<div id="gamezone-footer">
						<div id="footer-greeting"><!-- 
							<p id="greeting"></p>
							<span><img id="avatar" src="" width="50"></span> -->
							<a class="tooltip">
								<p id="greeting"></p>
								<span><img id="avatar" src="" width="50"></span>
							</a>
							<span id="login_button">
								<fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>
							</span>
							<p id="token"></p>
						</div>
						<div id="footer-next1">
							<img title="Report spam" id="add_delete" class="control" src="media/alert.png" onclick="playClick();report_spam()">
							<img title="Next" id="next1" ng-click="clear($event)" class="control" src="media/rightarrow.png" onclick="playClick();vote();get_ranked();">
						</div>
						<div id="footer-next2">
							<img title="Next" id="next2" ng-click="clear($event)" class="control" src="media/rightarrow.png" onclick="playClick();submit_translation();get_random_def();">
						</div>
					</div>
				</div>
				<div id="gamezone2">
					
				</div>
			</div>
			<div id="about">
				<div id="about-main">
					<div id="about-data">
						<h2>About</h2>
						<p>
						The Kamusi Project (<a href="http://kamusi.org/" target="_blank">http://kamusi.org/</a>) is a participatory international effort dedicated to improving knowledge of the world's languages. Our long term mission is to produce dictionaries and other language resources for every language, and to make those resources available for free to everyone.
						</p>
						</br>
						<h2>How to write a great definition</h2>
						<p>
						Definitions are explanations of what a word means. They are not single words (those are synonyms). You can usually use a definition instead of the actual word. Stick to these rules:
						</p>
						<ul>
							<li> Short and sweet: A definition should be as brief as possible to explain the concept, but long enough to describe it fully. If the same word has different meanings, those are different concepts with different definitions- a definition in Kamusi only explains *one* concept.
							</li>
							<li> Easy does it: Use the simplest words you can -definitions should not force readers to jump around the dictionary more, unless technical terms are absolutely necessary.
							</li>
							<li> No circles: Definitions should NOT contain the word that is being defined, nor its close relatives. "Happiness" is "A feeling of joy.", not "The feeling of being happy." Definitions should not be circular - we cannot now say "joy" is "A feeling of happiness."
							</li>
							<li> No fluff: Do not start with "A term meaning", or "This is a", or "X refers to", etc. Style: Begin with a Capital letter and end with a period.
							</li>
						</ul>
						</br>
						For more information, you can watch this video: <a href="https://www.youtube.com/watch?v=aaqOQQOYuHA" target="_blank">https://www.youtube.com/watch?v=aaqOQQOYuHA</a>
					</div>
				</div>
				<div id="about-footer">
					<img title="Return" class="control" src="media/leftarrow.png" onclick="playClick();return_to_game();">
				</div>
			</div>
			<div id="profile">
				<div id="profile-main">
					<div id="profile-avatar-wrapper">
						<img id="profile_avatar" src="" width="200">
					</div>
					<div id="profile-info-wrapper">
						<table id="profile_info">
							<tr>
								<td>Name</td>
								<td id="profile_name"></td>
							</tr>
							<tr>
								<td>Points</td>
								<td id="profile_points"></td>
							</tr>
							<tr>
								<td>Attempts</td>
								<td id="profile_attempts"></td>
							</tr>
						</table>
					</div>
					<div id="profile_trophies_wrapper">
						<table id="profile_trophies"></table>
					</div>
				</div>
				<div id="profile-footer">
					<img title="Return" class="control" src="media/leftarrow.png" onclick="playClick();return_to_game();">
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript"> var token = "<?php echo $newToken; ?>"; </script>
	<script src="js/server_requests.js"></script>
	<script src="js/login.js"></script>
	<script src="js/sound.js"></script>
	<script src="js/menu.js"></script>	
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min.js"></script>
	<script src="js/animation.js"></script>
</body>
</html>