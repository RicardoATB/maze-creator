//Global variables
var cols, rows; //number of columns and rows
var cellWidth = 40; // height = width of each square cell
var cellArray = []; // unidimensional array that will store all the cells
/*****************************************************************************/
function setup() {
	createCanvas(400,400);

	//Calculating how many cols and rows, and making it an integer with floor()
	cols = floor(width/cellWidth);	// number of columns
	rows = floor(height/cellWidth); // number of rows

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
		this.walls = [true, true, true, true];
		
		/*       (x, y)	   top	     (x + cellWidth, y)
					------------------
					|                |
					|                |
					| left           | right
					|                |
					|                |
					|     bottom     |
					------------------
   			(x, y + cellWidth)		 (x + cellWidth, y + cellWidth)*/
		
		stroke(255);
		//top
		if (this.walls[0])
			line (x,y,x + cellWidth, y);

		//right
		if (this.walls[1])
			line(x + cellWidth, y,x + cellWidth, y + cellWidth);

		//bottom
		if (this.walls[2])
			line(x + cellWidth, y + cellWidth,x, y + cellWidth);

		//left
		if (this.walls[3])
			line(x, y + cellWidth,x,y);
	}

}
/*****************************************************************************/
