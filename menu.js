function enter_game() {
	document.getElementById("welcome").style.display = "none";
	document.getElementById("game").style.display = "inline-block";
	get_ranked();
}

function display_about() {
	document.getElementById("game").style.display = "none";
	document.getElementById("about").style.display = "inline-block";
}

function return_to_game() {
	document.getElementById("about").style.display = "none";
	document.getElementById("insert").style.display = "none";
	document.getElementById("game").style.display = "inline-block";
}

function animate_logo() {
	document.getElementById("logo").classList.add("animatelogo");
	document.getElementById("enter").classList.remove("shaded_enter");
	document.getElementById("enter").classList.add("animateenter");
}

 function display_definition_window() {
 	document.getElementById("game").style.display = "none";
	document.getElementById("insert").style.display = "inline-block";
}

function set_word(word, pos, userID) {
	document.getElementById("word").innerHTML = word + " " + pos + "; proposed by: " + userID;
}

function set_avatar(userID) {
    document.getElementById("avatar").src = "https://graph.facebook.com/" + userID + "/picture";
}

function clear_definitions() {
	var table = document.getElementById("definitions");
	while (table.rows[0]) {
		table.deleteRow(0);
	}
}

function add_definition(id, definition) {
	var table = document.getElementById("definitions");

	var row = table.insertRow(-1);

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);

	cell1.classList.add("left_cell");
	cell2.classList.add("right_cell");

	cell1.innerHTML = definition;

	var img1 = document.createElement("img");
	img1.src = 'media/up.png';
	img1.classList.add('vote_button');
	var img2 = document.createElement("img");
	img2.src = 'media/down.png';
	img2.classList.add('vote_button');
	//NOTE THIS PROBABLY CAUSES A MEMORY LEAK - TO BE REVIEWED
	img1.onclick = (function(definition_id) { return function() { vote(definition_id, 1); playClick(); }; })(id);
	img2.onclick = (function(definition_id) { return function() { vote(definition_id, -1); playClick(); }; })(id);

	// img1.onclick = vote_closure(id, 1);
	// img1.onclick = vote_closure(id, -1);

	cell2.appendChild(img1);
	cell2.appendChild(img2);
}

// function vote_closure(definition_number, vote) {
// 	return function () {vote(definition_number, vote);};
// }

function vote(definition_number, vote) {
	submit_vote(definition_number, vote);
}