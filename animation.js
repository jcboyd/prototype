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

function startAnimation() {
	var total_space = 2 * canvasX + 2 * canvasY;

	for(var index = 0; index < symbols.length; index++) {
		var position = (total_space / symbols.length) * index;
		var init_x, init_y, dx, dy;

		if (position < canvasX) {
			init_x = position; init_y = 0; dx = 1; dy = -1;
		}
		else if (position < canvasX + canvasY) {
			init_x = canvasX; init_y = position - canvasX; dx = -1; dy = -1;
		}
		else if (position < 2 * canvasX + canvasY) {
			init_x = position - canvasX - canvasY; init_y = canvasY; dx = -1; dy = 1;
		}
		else {
			init_x = 0; init_y = total_space - position; dx = 1; dy = -1;
		}

		symbol_objects[index] = new Symbol(symbols[index], init_x, init_y, dx, dy);
	}
	if(animationID > -1)
		clearInterval(animationID);
	animationID = setInterval(animation, 20);
}

function stopAnimation() {
	if(animationID > -1)
		clearInterval(animationID);
	clearCanvas();
}

function animation() {
	clearCanvas();
	for(var index = 0; index < symbol_objects.length; index++) {
		symbol_objects[index].draw();
	}
}

//Drawing & Animation
function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function Symbol(symbol_text, x, y, dx, dy) {
	var text = symbol_text;
	var initial_x = x, initial_y = y;
	var delta_x = dx, delta_y = dy;

	var x_pos = x, y_pos = y;

	this.draw = function () {
		x_pos += delta_x;
		y_pos += delta_y;
		context.font = "30px Xits";
		context.fillStyle = 'gray';
		context.fillText(text, x_pos, y_pos);
		if(x_pos < 0 || canvasX < x_pos || y_pos < 0 || canvasY < y_pos ) {
			x_pos = initial_x;
			y_pos = initial_y;
			delta_y = -delta_y;
		}
	}
}

startAnimation();