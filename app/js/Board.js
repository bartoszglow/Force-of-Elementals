Board.templates = [
	[
		'            W   ',
		'   WDDDDDDDDW   ',
		'   W            ',
		'   W            ',
		'   W            ',
		'   W   SAAAAA   ',
		'   W   S    W   ',
		'   W   S    W   ',
		'   WAAAA    W   ',
		'            W   ',
		'            W   '
	],
];
Board.elements = {
	'grass':{FXmod:0},
	'W':{FXmod:1},
	'A':{FXmod:1},
	'S':{FXmod:1},
	'D':{FXmod:1},

};
function Board(){
	//
	this.parse(Board.templates[VAR.rand(0,Board.templates.length-1)]);
	this.draw();
	// 
	
}
Board.prototype.draw = function(){
	for(var i=0; i<this.b.length; i++){
		// 
		for(var j=0; j<this.b[i].length; j++){
			//
			G.ctx_bg.drawImage(
				G.sprite,
				5*this.b[i][j].FXmod,
				53,
				5,
				5,
				j*50,
				i*50,
				50,
				50
			);
		}
	}
}

Board.prototype.parse = function(arr){
	this.b = [];
	for(var i=0; i<arr.length; i++){
		this.b.push([]);
		for(var j=0; j<arr[i].length; j++){
			this.b[i].push(Board.elements[arr[i].charAt(j)==' ' ? 'grass' : arr[i].charAt(j)]);
		}
	}
	console.log(this.b)
}
