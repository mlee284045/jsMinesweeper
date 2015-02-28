var http = require('http');
var initialize = require('./initialize.js');
var counter = 0;

http.createServer(function(req, res) {
	myZone = new initialize.Zone(5,13);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('making minesweeper\n');
	console.log('Cool my second node program!', counter++);
	console.log(myZone.revealed, myZone.flagged);
	myZone.flag();
	console.log(myZone.flagged, myZone.hasMine);
	myZone.setMine();
	console.log(myZone.hasMine, myZone.adjacentMines);
	console.log('Key is', myZone.key);
	console.log('x-coord is', myZone.xcoord);
	console.log('y-coord is', myZone.ycoord);
}).listen(8124);