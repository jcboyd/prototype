// The controller is a regular JavaScript function. It is called
// once when AngularJS runs into the ng-controller declaration.

var default_value = '✎ I can write a great definition!';
var min_length = 4;

function InlineEditorController($scope){

	// $scope is a special object that makes
	// its properties available to the view as
	// variables. Here we set some default values:

	$scope.showtooltip = false;
	$scope.value = default_value;

	// Some helper functions that will be
	// available in the angular declarations

	$scope.hideTooltip = function(){

		// When a model is changed, the view will be automatically
		// updated by by AngularJS. In this case it will hide the tooltip.

		$scope.showtooltip = false;
		if ($scope.value == '') {
			$scope.value = default_value;
			document.getElementById("user_definition").className = "inactive_definition";
		}
	}

	$scope.toggleTooltip = function(e){
		e.stopPropagation();

		$scope.showtooltip = !$scope.showtooltip;
		
		if($scope.showtooltip) {
			// $scope.value = '✎ I can write a great definition!';
			remove_active();
			document.getElementById("user_definition").className = "active_definition";
			if($scope.value == default_value) {
				$scope.value = '';

			}
			// document.getElementById("input_tool_box").focus();
        	document.getElementById("input_tool_box").disable = 'false';
		}
		else {
			if ($scope.value == '') {
				$scope.value = default_value;
				document.getElementById("user_definition").className = "inactive_definition";
			}
		}
	}

	$scope.clear = function(e) {
		e.stopPropagation();
		$scope.value = default_value;
	}
}

function add_user_definition() {
	document.getElementById("add_delete").src = "media/delete.png";
	document.getElementById("add_delete").onclick = delete_user_definition;
	// var ul = document.getElementById("definitions");
	// var li = document.createElement("li");
	document.getElementById("user_definition").style.display = "inline-block";
	// li.classList.add("inactive_definition");
	// li.id = "user_definition";
	// ul.appendChild(li);
}

function delete_user_definition() {
	// var ul = document.getElementById("definitions");
	// var li = document.getElementById("user_definition");
	// ul.removeChild(li);
	// document.getElementById("add_delete").src = "media/add.png";
	// document.getElementById("add_delete").onclick = add_user_definition;
	// document.getElementById("user_definition").style.display = "none";
	// document.getElementById("input_tool_box").value = "";
}

function initialise() {
	get_ranked();
	get_user_stats();
	get_user_trophies();
}

function enter_game() {
	document.getElementById("welcome").style.display = "none";
	document.getElementById("game").style.display = "inline-block";
	pause_animation();
}

function display_about() {
	document.getElementById("game").style.display = "none";
	document.getElementById("about").style.display = "inline-block";
}

function display_profile() {
	document.getElementById("game").style.display = "none";
	document.getElementById("profile").style.display = "inline-block";
}

function return_to_game() {
	document.getElementById("about").style.display = "none";
	document.getElementById("profile").style.display = "none";
	document.getElementById("game").style.display = "inline-block";
}

function display_welcome() {
	document.getElementById("game").style.display = "none";
	document.getElementById("welcome").style.display = "inline-block";
	continue_animation();
}

function animate_logo() {
	document.getElementById("logo").classList.add("animatelogo");
	document.getElementById("enter1").classList.remove("shaded_enter");
	document.getElementById("enter1").classList.add("animateenter");
	document.getElementById("enter2").classList.remove("shaded_enter");
	document.getElementById("enter2").classList.add("animateenter");
}

// function display_definition_window() {
//  	document.getElementById("game").style.display = "none";
// 	document.getElementById("insert").style.display = "inline-block";
// }

function set_word(word, pos) {
	//document.getElementById("word").innerHTML = word + "; " + pos + "; proposed by: " + userID;
	document.getElementById("word").innerHTML = word; // + "; proposed by: " + userID;
	document.getElementById("pos").innerHTML = pos;
}

function set_avatar(userID) {
    document.getElementById("avatar").src = "https://graph.facebook.com/" + userID + "/picture";
    document.getElementById("profile_avatar").src = "https://graph.facebook.com/" + userID + "/picture";
}

function set_profile_data(userID, points) {
	document.getElementById("profile_votes").innerHTML = "Points: " + points;
}

function remove_active() {
	var ul = document.getElementById("definitions");
	var li =  ul.getElementsByTagName("li");

	for(var i = 0; i < li.length; i++) {
		li[i].className = "inactive_definition";
	}
}

function clear_definitions() {
	var ul = document.getElementById("definitions");
	var li =  ul.getElementsByTagName("li");

	for(var i = li.length - 1; i > 0; i = i - 1) {
		ul.removeChild(li[i]);
	}
	delete_user_definition();
}

function add_definition(id, definition) {
	var ul = document.getElementById("definitions");
	var li = document.createElement("li");
	li.classList.add("inactive_definition");
	var div_main = document.createElement("div");
	div_main.classList.add("button_div_main");
	var div_footer = document.createElement("div");
	div_footer.classList.add("button_div_footer");
	div_main.innerHTML = definition;
	var img1 = document.createElement("img");
	img1.src = 'media/up.png';
	img1.classList.add('vote_button');
	var img2 = document.createElement("img");
	img2.src = 'media/down.png';
	img2.classList.add('vote_button');
	div_footer.appendChild(img1);
	div_footer.appendChild(img2);

	// li.innerHTML = definition;
	img1.onmousedown = (function(id_num) {
		return function () {
			definitionID = id_num;
			if (this.className == "active_definition") {
				remove_active();
			}
			else {
				remove_active();
				this.className = "active_definition";
			}
		};
	})(id);

	img2.onmousedown = (function(id_num) {
		return function () {
			definitionID = id_num;
			report_spam(definitionID);
		};
	})(id);

	li.appendChild(div_main);
	li.appendChild(div_footer);
	ul.appendChild(li);
}

// function clear_definitions() {
// 	var table = document.getElementById("definitions");
// 	while (table.rows[1]) {
// 		table.rows[1].
// 		table.deleteRow(1);
// 	}
// }

// function add_definition(id, definition) {
// 	var table = document.getElementById("definitions");
// 	var row = table.insertRow(0);
// 	var cell1 = row.insertCell(0);
// 	var cell2 = row.insertCell(1);
// 	cell1.classList.add("left_cell");
// 	cell2.classList.add("right_cell");
// 	cell1.innerHTML = definition;
// 	var img1 = document.createElement("img");
// 	img1.src = 'media/up.png';
// 	img1.classList.add('vote_button');
// 	var img2 = document.createElement("img");
// 	img2.src = 'media/down.png';
// 	img2.classList.add('vote_button');
// 	//NOTE THIS PROBABLY CAUSES A MEMORY LEAK - TO BE REVIEWED
// 	img1.onclick = (function(definition_id) { return function() { vote(definition_id, 1); playClick(); }; })(id);
// 	img2.onclick = (function(definition_id) { return function() { vote(definition_id, -1); playClick(); }; })(id);
// 	cell2.appendChild(img1);
// 	cell2.appendChild(img2);
// }

function vote() {
	var user_definition = document.getElementById("input_tool_box").value;
	if(definitionID != -1) {
		submit_vote(definitionID, 1);
	}
	else if(user_definition != default_value && user_definition.length >= min_length) {
		submit_definition(document.getElementById("input_tool_box").value);
	}
}