var Zone = function(xcoord, ycoord) {
	this.revealed = false;
	this.hasMine = false;
	this.flagged = false;
	this.position = {x:xcoord, y:ycoord};
	this.neighbors = [];
	this.adjacentMines = 0;

	this.flag = function() {
		this.flagged != this.flagged;
	}

	this.setMine = function() {
		this.hasMine = true;
		for(var i = 0; i<this.neighbors.length(); i++) {
			this.neighbors[i].adjacentMines++;
		}
	}

	this.reveal = function() {
		this.revealed = true;

	}
}

