B.templates = [
	[
		'            W   ',
		'   DDDDDDDDDW   ',
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
B.elements = {
	'grass':{FXmod:0, type:'G'},
	'W':{FXmod:1, 	  type:'W'},
	'A':{FXmod:1, 	  type:'A'},
	'S':{FXmod:1,	  type:'S'},
	'D':{FXmod:1,  	  type:'D'},

};
function B(){
	//
	this.parse(B.templates[VAR.rand(0,B.templates.length-1)]);
	this.draw();
	this.test = 10;
	// 
	
}
B.prototype.draw = function(){
	for(var x=0; x<2; x++){
		for(var y=0; y<2; y++){
			for(var i=0; i<this.b.length; i++){
				// 
				for(var j=0; j<this.b[i].length; j++){
					//
					G.ctx_bg.drawImage(
						G.sprite,
						20*this.b[i][j].FXmod,
						53,
						20,
						20,
						j*20*VAR.sc+x*20*VAR.sc/2,
						i*20*VAR.sc+y*20*VAR.sc/2,
						20*VAR.sc/2,
						20*VAR.sc/2
					);
				}
			}
		}
	}
}

B.prototype.parse = function(arr){
	this.b = [];
	for(var i=0; i<arr.length; i++){
		this.b.push([]);
		for(var j=0; j<arr[i].length; j++){
			this.b[i].push(B.elements[arr[i].charAt(j)==' ' ? 'grass' : arr[i].charAt(j)]);
		}
	}
}
B.mouse = function(e){
	B.mx = Math.floor(e.offsetX/(20*VAR.sc));
	B.my = Math.floor(e.offsetY/(20*VAR.sc));
	console.log('click: ' + B.mx + '/' + B.my + ' type:' + Map.b[B.my][B.mx].type);
}
