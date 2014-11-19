//Global variables
var canvasX = 930;
var canvasY = 550;
var canvas = document.getElementById("animation"); //Canvas element
var context = canvas.getContext("2d"); //Canvas context
var animationID = -1; //Game loop time interval
var dx = 1;

var symbols = ["قاموس", "ਕੋਸ਼", "字典", "речник", "orðabók", "מילון"];
var delta_xs = [1, -1, 1, -1, 1, -1];
var delta_ys = [1, 1, -1, -1, -1, 1];
var init_x = [0, 930, 0, 930, 0, 930];
var symbol_objects = new Array();

function startAnimation() {
	for(var index = 0; index < symbols.length; index++) {
		symbol_objects[index] = new Symbol(symbols[index], init_x[index], (index + 1) * 75, delta_xs[index], delta_ys[index]);
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
	var initial_x = x;
	var initial_y = y;
	var x_pos = x;
	var y_pos = y;
	var delta_x = dx;
	var delta_y = dy;

	this.draw = function () {
		x_pos += delta_x;
		y_pos += delta_y;
		context.font = "50px Arial";
		context.fillText(text, x_pos, y_pos);
		if(x_pos < 0 || canvasX < x_pos || y_pos < 0 || canvasY < y_pos ) {
			x_pos = initial_x;
			y_pos = initial_y;
			delta_y = -delta_y;
		}
	}
}

startAnimation();