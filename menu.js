function enter_game() {
	document.getElementById("welcome").style.display = "none";
	document.getElementById("game").style.display = "inline-block";
}

function display_about() {
	document.getElementById("game").style.display = "none";
	document.getElementById("about").style.display = "inline-block";
}

function return_to_game() {
	document.getElementById("about").style.display = "none";
	document.getElementById("game").style.display = "inline-block";
}

function animate_logo() {
	document.getElementById("logo").classList.add("animatelogo");
	document.getElementById("enter").classList.remove("shaded_enter");
	document.getElementById("enter").classList.add("animateenter");
}

function set_word(word, pos) {
	document.getElementById("word").innerHTML = word + " " + pos + ";";
}

function clear_definitions() {
	var table = document.getElementById("definitions");
	while (table.rows[0]) {
		table.deleteRow(0);
	}

	// var ul = document.getElementById("definitions");
 //    while (ul.firstChild) {
 //  		ul.removeChild(ul.firstChild);
 //    }
}

function add_definition(definition) {
	var table = document.getElementById("definitions");

	var row = table.insertRow(0);

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);

	cell1.classList.add("left_cell");
	cell2.classList.add("right_cell");

	cell1.innerHTML = definition;

	var img1 = document.createElement("img");
	img1.src = 'media/up.png';
	var img2 = document.createElement("img");
	img2.src = 'media/down.png';

	img1.onclick = function() {get_ranked();};
	img2.onclick = function() {get_ranked();};

	cell2.appendChild(img1);
	cell2.appendChild(img2);

	// var ul = document.getElementById("definitions");
	// li = document.createElement("li");
	// li.innerHTML = definition;
	// ul.appendChild(li);	
}