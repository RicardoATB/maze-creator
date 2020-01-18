//Global variables
var cols, rows; //number of columns and rows
var cellWidth = 40; // height = width of each square cell
var cellArray = []; // unidimensional array that will store all the cells
var currentCell; // this is the cell that is current being visited
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

	// defining which cell will start the maze
	currentCell = cellArray[0]; // first cell in the arary with start the maze
	
}
/*****************************************************************************/
function draw() {
	background(100);

	//displaying all the cell objects:
	for (var i = 0; i < cellArray.length; i++)
		cellArray[i].showCell();

	//if we are drawing the cell, it means that it has been visited	
	currentCell.visited = true;
}
/*****************************************************************************/
//Constructor for the cell object
function Cell(i,j){
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true]; //(top, right, bottom, left) cell wall
	this.visited = false; //current cell not yet visited

	this.showCell = function() {
		var x = this.i*cellWidth;
		var y = this.j*cellWidth;
		
		
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

		//cell wall color
		stroke(255);
		
		//print TOP cell line
		if (this.walls[0])
			line (x,y,x + cellWidth, y);

		//print RIGHT cell line
		if (this.walls[1])
			line(x + cellWidth, y,x + cellWidth, y + cellWidth);

		//print BOTTOM cell line
		if (this.walls[2])
			line(x + cellWidth, y + cellWidth,x, y + cellWidth);

		//print LEFT cell line
		if (this.walls[3])
			line(x, y + cellWidth,x,y);
	
		// if the cell has been visited, change it's color
		if (this.visited) {
		fill(255,0,255,100);
		rect(x,y,cellWidth,cellWidth);
		}
	
		}
}

