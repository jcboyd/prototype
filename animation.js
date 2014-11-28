//Global variables
var canvas = document.getElementById("animation"); //Canvas element
var context = canvas.getContext("2d"); //Canvas context
var canvasX = canvas.width; //930;
var canvasY = canvas.height; //550;
var animationID = -1; //Game loop time interval

var symbols = 	["قاموس", "ਕੋਸ਼", "字典", "речник", "orðabók", "מילון",
				 "tự điển", "kamus", "isichazamazwi", "k'amus",
				 "maanatiira", "rimayqillqa", "geiriadur"];

var symbol_objects = new Array();

function start_animation() {
	var total_space = 2 * canvasX + 2 * canvasY;

	// for(var index = 0; index < symbols.length; index++) {
	// 	var position = (total_space / symbols.length) * index;
	// 	var init_x, init_y, dx, dy;

	// 	if (position < canvasX) {
	// 		init_x = position; init_y = 0; dx = 1; dy = -1;
	// 	}
	// 	else if (position < canvasX + canvasY) {
	// 		init_x = canvasX; init_y = position - canvasX; dx = -1; dy = -1;
	// 	}
	// 	else if (position < 2 * canvasX + canvasY) {
	// 		init_x = position - canvasX - canvasY; init_y = canvasY; dx = -1; dy = 1;
	// 	}
	// 	else {
	// 		init_x = 0; init_y = total_space - position; dx = 1; dy = -1;
	// 	}

	// 	symbol_objects[index] = new Symbol(symbols[index], init_x, init_y, dx, dy);
	// }

	for(var index=0; index < symbols.length; index++) {
		var init_x = Math.random() * canvasX;
		var init_y = Math.random() * canvasY;
		symbol_objects[index] = new Symbol(symbols[index], init_x, init_y, 0, 0, -1000 + index*100);
	}

	if(animationID > -1)
		clearInterval(animationID);
	animationID = setInterval(animation, 20);
}

function stop_animation() {
	if(animationID > -1)
		clearInterval(animationID);
	clear_canvas();
}

function pause_animation() {
	if(animationID > -1)
		clearInterval(animationID);
}

function continue_animation() {
	if(animationID > -1)
		clearInterval(animationID);
	animationID = setInterval(animation, 20);
}

function animation() {
	clear_canvas();
	for(var index = 0; index < symbol_objects.length; index++) {
		symbol_objects[index].draw();
	}
}

//Drawing & Animation
function clear_canvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function Symbol(symbol_text, x, y, dx, dy, opacity) {
	var text = symbol_text;
	// var initial_x = x, initial_y = y;
	// var delta_x = dx, delta_y = dy;

	var x_pos = x, y_pos = y;

	var opacity = opacity;

	var delta = 5;

	this.draw = function () {
		// x_pos += delta_x;
		// y_pos += delta_y;

		context.font = "30px Tahoma";

		opacity += delta;

		if(Math.abs(opacity) == 1000)
			delta = -delta;

		if(opacity == -1000) {
			x_pos = Math.random() * canvasX;
			y_pos = Math.random() * canvasY;
		}

		context.fillStyle = "rgba(150, 150, 150," + opacity/1000.0 + ")";

		context.fillText(text, x_pos, y_pos);

		// if(x_pos < 0 || canvasX < x_pos || y_pos < 0 || canvasY < y_pos ) {
		// 	x_pos = initial_x;
		// 	y_pos = initial_y;
		// 	delta_y = -delta_y;
		// }
	}
}

start_animation();