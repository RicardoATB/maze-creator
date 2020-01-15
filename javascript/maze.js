//Global variables
var cols, rows; //number of columns and rows
var cellWidth = 40; // height = width of each square cell
var cellArray = []; // unidimensional array that will store all the cells
/*****************************************************************************/
function setup() {
	createCanvas(400,400);

	//Calculating how many cols and rows, and making it an integer with floor()
	cols = floor(width/cellWidth);
	rows = floor(height/cellWidth);

	//Creating all the cell objects with a nested loop
	for(var i = 0; i < rows; i++)
		for(var j = 0; j < cols; j++ ) {
			var cell = new Cell(i,j);

			//Storing all the cell objects in an unidimensional array
			cellArray.push(cell);
		}
}
/*****************************************************************************/
function draw() {
	background(100);

	//displaying all the cell objects:
	for (var i = 0; i < cellArray.length; i++)
		cellArray[i].showCell();
}
/*****************************************************************************/
//Constructor for the cell object
function Cell(i,j){
	this.i = i;
	this.j = j;

	this.showCell = function() {
		var x = this.i*cellWidth;
		var y = this.j*cellWidth;
		stroke(255);
		noFill();
		rect(x,y,cellWidth,cellWidth);
	}

}
/*****************************************************************************/
