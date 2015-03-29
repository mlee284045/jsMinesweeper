var zone = function(xcoord, ycoord){
	this.revealed = false;
	this.flagged = false;
	this.x = xcoord;
	this.y = ycoord;
	this.mines = 0; // if zone has mine, this.mines = -1, else it contains adjacent mines

	this.flag = function() {
		this.flagged = !this.flagged;
	};

	this.setMine = function() {
		this.mines = -1;
	};

	this.adjacentMines = function() {
		if (this.mines !== -1) {
			this.mines ++;
		}
	};

	this.reveal = function() {
		this.revealed = true;
		return this.mines;
	};
};

var gridToList = function(x, y, n) {
	return x+((y-1)*n);
};

var listToGrid = function(idx, n) {
	var y = Math.ceil(idx/n);
	var x = idx-n*(y-1);
	return [x, y];
};

var neighbors = function(x, y, n) {
	var neighbor = [];
	// Checks right three neighbors, then left three neighbors, then top and bottom neighbors

	// Check if there are neighbors on the right side
	// Basic condition for neighbors on the right side: it is not on the right side edge
	if (x<n && y===n) {
		// Check if there is a neighbor on the bottom right
		neighbor.push(gridToList(x+1, y-1, n));
		neighbor.push(gridToList(x+1, y, n));
	} else if (x<n && y===1) {
		// check if there is a neighbor on the top right
		neighbor.push(gridToList(x+1, y, n));
		neighbor.push(gridToList(x+1, y+1, n));
	} else if (x<n) {
		// else all zones not on the right side edge have all right side neighbors
		neighbor.push(gridToList(x+1, y-1, n));
		neighbor.push(gridToList(x+1, y, n));
		neighbor.push(gridToList(x+1, y+1, n));		
	}
	// Check if there are neighbors on the left side with the same logic
	if (x>1 && y===n) {
		neighbor.push(gridToList(x-1, y-1, n));
		neighbor.push(gridToList(x-1, y, n));
	} else if (x>1 && y===1) {
		neighbor.push(gridToList(x-1, y, n));
		neighbor.push(gridToList(x-1, y+1, n));
	} else if (x>1) {
		neighbor.push(gridToList(x-1, y-1, n));
		neighbor.push(gridToList(x-1, y, n));
		neighbor.push(gridToList(x-1, y+1, n));		
	}

	if (y<n) {
		neighbor.push(gridToList(x, y+1, n));
	}

	if (y>1) {
		neighbor.push(gridToList(x, y-1, n));
	}

	return neighbor;
};

var createBoard = function(n) {
	var board = [], size = n*n+1;

	for (var i = 1; i<size; i++) {
		var coords = listToGrid(i, n);
		var x = coords[0], y = coords[1];
		board[i] = new zone(x, y);
	}

	return board;
};

var setRandomMines = function(board, n, size) {
	for (var i = 0; i<size; i++) {
		var random = Math.floor(Math.random()*n*n)+1;
		if (board[random].mines !== -1) {
			board[random].setMine();
			var coords = listToGrid(random, n);
			var x = coords[0], y = coords[1];
			var randomNeighbors = neighbors(x,y,n);
			for (var j = 0; j<randomNeighbors.length; j++) {
				var neighbor = randomNeighbors[j];
				board[neighbor].adjacentMines();
			}
		} else {i--;}
	}
};

var canvas = document.getElementById('minesweeper');
console.log(canvas.width);
console.log("changed canvas test");
document.getElementById('minesweeper').width = 600;
console.log(canvas.width);
var context = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;
var cellSize = 50, n = 8;
// console.log(width, height);
context.fillStyle = "grey";
context.fillRect(0,0,400,400);
context.strokeStyle = "black";
for (var i = 0; i<n; i++) {
	context.beginPath();
	context.moveTo(i*cellSize,0);
	context.lineTo(i*cellSize,400);
	context.closePath();
	context.stroke();
	context.beginPath();
	context.moveTo(0,i*cellSize);
	context.lineTo(400,i*cellSize);
	context.closePath();
	context.stroke();
	// for (var j = 0; j<n; j++){
	// 	context.strokeRect(1+cellSize*i,1+cellSize*j,cellSize,cellSize);
	// }
}
context.strokeStyle = "red";
context.lineWidth = 2;
context.beginPath();
context.moveTo(20,0);
context.lineTo(20,400);
context.closePath();
context.stroke();

context.lineWidth = 10;
context.beginPath();
context.moveTo(10,0);
context.lineTo(500,400);
context.closePath();
context.stroke();

// context.line
context.strokeRect(50,50,50,50);

context.fillStyle = "yellow";
context.fillRect(250,250,50,50);




// canvas.onClick(console.log("Clicked!"));

var tests = function() {
	console.log(gridToList(2,2,4)); // Should return 6
	console.log(listToGrid(6, 4)); // Should return 2,2
	console.log(listToGrid(16, 4)); // Should return 4,4
	console.log(neighbors(2,2,4)); // Should return array with 8 elements
	console.log(neighbors(2,1,4)); // Should return array with 5 elements
	console.log(neighbors(1,2,4)); // Should return array with 5 elements
	console.log(neighbors(1,1,4)); // Should return array with 3 elements

	var testBoard = createBoard(4);
	console.log(testBoard);

	setRandomMines(testBoard, 4, 5);
	console.log(testBoard);
};

tests();