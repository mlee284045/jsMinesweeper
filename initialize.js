module.exports = {
	Zone: function(n, key) {
		this.revealed = false;
		this.hasMine = false;
		this.flagged = false;
		this.key = key;
		this.xcoord = Math.floor(key/n);
		this.ycoord = key % n;
		this.neighbors = [];
		this.adjacentMines = 0;

		this.flag = function() {
			this.flagged = !this.flagged;
		};

		this.setMine = function() {
			this.hasMine = true;
		};

		this.reveal = function(endgame) {
			this.revealed = true;
			if (this.hasMine) {
				endgame();
			}
			else if (this.adjacentMines === 0) {
				for (var i = 0; i<this.neighbors.length(); i++) {
					this.neighbors[i].reveal(endgame);
				}
			}
		};
	},

};



function createBoard(n, boardArray) {
	for(var i = 0; i<n*n;i++) {
		newZone = new Zone(n, i);
		newZone.neighbors.push();
	}
}

function startGame() {
	createBoard(6);

}