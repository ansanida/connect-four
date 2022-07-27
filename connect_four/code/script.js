(function() {

	var ConnectFourGame = function() {

		connect4board = {};
		curr = 'red';
		rows = 6;
		cols = 7;
		countTurn = 0;
		
		_init = function() {			
			var columns;			
			columns = document.querySelectorAll('.column');			
			Array.prototype.forEach.call(columns, function(col) {
				col.addEventListener('click', function() {
					markAsFree(col.getAttribute('data-x'));
				});
			});			
			for(var x = 0; x <= rows; x++) {			
				connect4board[x] = {};				
				for(var y = 0; y <= cols; y++) {
					connect4board[x][y] = 'free';
				}
			}			
		};
		
		var markAsFree = function(x) {
			var nextY;			
			nextY = false;			
			for(var y = 0; y < rows; y++) {
				if(connect4board[x][y] === 'free') {
					nextY = y;
					break;
				}
			}			
			if(nextY === false) {
				alert('there are no free spaces left in this column. try a different one!');
				return false;
			}			
			connect4board[x][nextY] = curr;			
			document.querySelector('#column-'+x+' .row-'+nextY+' circle').setAttribute(
					'class', curr
			);			
			if(checkWinner(parseInt(x), nextY)) {
				alert(curr+' wins!');
				emptyBoard();
				return true;
			}
			countTurn = countTurn + 1;
			if(countTurn >= rows * cols) {
				alert('it\'s a tie!');
				emptyBoard();
				return true;				
			}
			curr = curr === 'red' ? 'yellow' : 'red';
		};
		
		var emptyBoard = function() {			
			Array.prototype.forEach.call(document.querySelectorAll('circle'), function(piece) {
				piece.setAttribute('class', 'free');
			});			
			connect4board = {};
			for(var x = 0; x <= rows; x++) {
				connect4board[x] = {};
				for(var y = 0; y <= cols; y++) {
					connect4board[x][y] = 'free';
				}
          console.log(connect4board);
			}
			countTurn = 0;
			return connect4board;

		};

		var checkWinner = function(currentX, currentY) {
			return direction(currentX, currentY, 'vertical') || 
				direction(currentX, currentY, 'diagonal') || 
				direction(currentX, currentY, 'horizontal');
		};
		
		var checkBounds = function(x, y) {
			return (connect4board.hasOwnProperty(x) && typeof connect4board[x][y] !== 'undefined');
		};

		var direction = function(currentX, currentY, direction) {		
			var chainSize, directions;			
			directions = {
				horizontal: [
					[0, -1], [0, 1]
				],
				vertical: [
					[-1, 0], [1, 0]
				],
				diagonal: [
					[-1, -1], [1, 1], [-1, 1], [1, -1]
				]
			};			
			chainSize = 1;			
			directions[direction].forEach(function(coords) {				
				var i = 1;
				while( checkBounds(currentX + (coords[0] * i), currentY + (coords[1] * i)) && 
					(connect4board[currentX + (coords[0] * i)][currentY + (coords[1] * i)] === curr)
				) {
					chainSize = chainSize + 1; 
					i = i + 1; 
				};				
			});			
			return (chainSize >= 4);			
		};		
		_init();		
	};
	ConnectFourGame();
})();