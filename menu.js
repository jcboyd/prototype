function enter_game() {
	document.getElementById("welcome").style.display = "none";
	document.getElementById("game").style.display = "inline-block";
	get_ranked();
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
	document.getElementById("insert").style.display = "none";
	document.getElementById("profile").style.display = "none";
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
	document.getElementById("word").innerHTML = word + "; " + pos + "; proposed by: " + userID;
}

function set_avatar(userID) {
    document.getElementById("avatar").src = "https://graph.facebook.com/" + userID + "/picture";
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

	while(ul.firstChild){
 		ul.removeChild(ul.firstChild);
	}
}

function add_input() {
	var ul = document.getElementById("definitions");
	//Add textbox to list
}

function add_definition(id, definition) {
	var ul = document.getElementById("definitions");
	var li = document.createElement('li');
	li.classList.add("inactive_definition");

	li.innerHTML = definition;
	li.onclick = function () { remove_active(); this.className = "active_definition"; };
	ul.appendChild(li);
}

function vote(definition_number, vote) {
	submit_vote(definition_number, vote);
}