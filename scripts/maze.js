//Global variables
var cols, rows; //number of columns and rows
var cellWidth = 40; // height = width of each square cell
var cellArray = []; // unidimensional array that will store all the cells
var currentCell; // this is the cell that is current being visited
var stack = []; // creating a stack (empty array)

p5.disableFriendlyErrors = true; //disables FES to improve performance
/*****************************************************************************/
function setup() {
	createCanvas(400,400);

	//Calculating how many cols and rows, and making it an integer with floor()
	cols = floor(width/cellWidth);	// number of columns
	rows = floor(height/cellWidth); // number of rows

	//setting framerate
	frameRate(7);

	//Creating all the cell objects with a nested loop
	for(var j = 0; j < rows; j++)
		for(var i = 0; i < cols; i++ ) {

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
	currentCell.highlight();

	var nextCell = currentCell.checkNeighbors(); // nextCell is one of the
												 // available neighbors
	
	//visiting all the neighbors
	if (nextCell) {
		nextCell.visited = true; //mark nextCell as visited
		stack.push(currentCell);
		removeWalls(currentCell, nextCell);
		currentCell = nextCell;	 //nextCell is now the current cell
	} else if (stack.length > 0) { // stack is not empty
		currentCell = stack.pop();
	}

}
/*****************************************************************************/
function removeWalls (a, b) {

	var x = a.i - b.i;

	if ( x === 1) {
		a.walls[3] = false; // left wall removed
		b.walls[1] = false; // right wall removed
	} else if ( x === -1 ) {
		a.walls[1] = false; // right wall removed
		b.walls[3] = false; // left wall removed
	}

	var y = a.j - b.j;

	if ( y === 1) {
		a.walls[0] = false; // top wall removed
		b.walls[2] = false; // bottom wall removed
	} else if ( y === -1 ) {
		a.walls[2] = false; // bottom wall removed
		b.walls[0] = false; // top wall removed
	}

}
/*****************************************************************************/
// index used to know the position of the neighbor cells in relation to
// the current cell.
function uniDimIndex(i,j){

	//neighbor cells can not be found out of the boundaries of the canvas
	if (i < 0 || j < 0 || i > cols -1 || j > rows -1) {
		return -1; // return an invalid index
	}
	
	return (i + (j * cols)); // "magical formula" used to know the unidimensional
						 	 // array position when you have 2 coordinates
}
/*****************************************************************************/
//Constructor for the cell object
function Cell(i,j){
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true]; //(top, right, bottom, left) cell wall
	this.visited = false; //cell born with "not yet visited" status

	/*-----------------------------------------------------------------------*/
	this.checkNeighbors = function() {

		var neighbors = []; // list of neighbors that hasn't being visited yet
		
		/*			(i,j-1)

		(i-1,j)		current		(i+1,j)
					 cell		
					 
					(i,j+1)*/

		var topNeighbor = cellArray[uniDimIndex(i,j-1)];
		var rightNeighbor = cellArray[uniDimIndex(i+1,j)];
		var bottomNeighbor = cellArray[uniDimIndex(i,j+1)];
		var leftNeighbor = cellArray[uniDimIndex(i-1,j)];

		// if top neighbor is NOT invalid ("returned -1") and has
		// not been visited, add to the "to be visited" array
		if (topNeighbor && !topNeighbor.visited) {
			neighbors.push(topNeighbor);
		}

		// if right neighbor is NOT invalid ("returned -1") and has
		// not been visited, add to the "to be visited" array
		if (rightNeighbor && !rightNeighbor.visited){
			neighbors.push(rightNeighbor);
		}

		// if bottom neighbor is NOT invalid ("returned -1") and has
		// not been visited, add to the "to be visited" array	
		if (bottomNeighbor && !bottomNeighbor.visited){
			neighbors.push(bottomNeighbor);
		}

		// if left neighbor is NOT invalid ("returned -1") and has
		// not been visited, add to the "to be visited" array
		if (leftNeighbor && !leftNeighbor.visited){
			neighbors.push(leftNeighbor);
		}




		
		//selecting randomly a neighbor to be the next cell to be visited
		if (neighbors.length > 0) {
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		}
		else	
			return undefined; // this line should never run
		


		/*
		//selecting first neighbor to be the next cell to be visited
		if (neighbors.length > 0)
			return neighbors[0];
		*/
	
	}
	/*-----------------------------------------------------------------------*/
	// Draws another rectangle to show which is the current cell
	this.highlight = function() {

		var x = this.i*cellWidth;
		var y = this.j*cellWidth;
		noStroke();
		fill(0, 0, 255, 100);
		rect(x, y, cellWidth, cellWidth);

	}

	/*-----------------------------------------------------------------------*/
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
			noStroke();
			fill(255,0,255,100);
			rect(x,y,cellWidth,cellWidth);
		}
		/*-----------------------------------------------------------------------*/
	}
}

