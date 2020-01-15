//Global variables
var cols, rows;
var cellWidth = 40;

function setup() {
	createCanvas(400,400);
}

function draw() {
	background(50);
}

//Constructor for the cell object
function cell(x,y){
	this.x = x;
	this.y = y;
}