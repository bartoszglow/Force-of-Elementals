
function B(V){
	this.V = V;
	this.templates = [
		[
			'            W   ',
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
	this.elements = {
		'grass':{FXmod:0, type:'G'},
		'W':{FXmod:1, 	  type:'W'},
		'A':{FXmod:1, 	  type:'A'},
		'S':{FXmod:1,	  type:'S'},
		'D':{FXmod:1,  	  type:'D'},
	};
	//main arr included grass and path
	this.b = []; 
<<<<<<< HEAD

	this.Enemies = [];
	this.Enemies.push({x: 100, y: 100});
	this.Bullets = [];
=======
	this.Enemy = [];
>>>>>>> c21e93c89698bfd736137d502c8fd6fff1c2bbe5
	this.Towers = new Array(16);
	for (var i = 0; i < 16; i++) {
		this.Towers[i] = new Array(12);
	}
	this.parse(this.templates[0]);
	
	this.drawBg();	
};

B.prototype.addTower = function(x, y, type, lvl){
	this.Towers[x][y] = new T(this.V, x, y, type, lvl);
	this.Towers[x][y].draw(x, y);
};
B.prototype.addEnemy = function(x, y, type, lvl){
	this.Enemy[this.Enemy.length] = new E(this.V, x, y, type, lvl);
	this.Enemy[this.Enemy.length-1].draw();
};

B.prototype.draw = function(){
	for (var i = 0; i < 16; i++) {	   	
	    for(var j=0; j<12; j++){
	    	if(this.Towers[i][j]){
	    		if(this.Towers[i][j].draw(this.Enemies)) {
	    			console.log('t');
	    		}
	    	}
	    }
	 }
	 for(var i=0; i<this.Enemy.length; i++){
	 	this.Enemy[i].draw();
	 }
	 
};

B.prototype.drawBg = function(){
	for(var i=0; i<this.b.length; i++){
		for(var j=0; j<this.b[i].length; j++){

			if(this.b[i][j].type == 'G'){
				V.ctx_bg.fillStyle = "#5fc148";
				V.ctx_bg.fillRect((j*20+2)*V.sc, (i*20+1)*V.sc, (20-3.5)*V.sc, (20-4)*V.sc);
				V.ctx_bg.drawImage(
					V.sprite,
					0,
					53,
					40,
					50,
					j*40*V.sc/2,
					i*40*V.sc/2-5*V.sc,
					40*V.sc/2,
					50*V.sc/2
				);

			}else{
				V.ctx_bg.fillStyle = "#bebf6a";
				V.ctx_bg.fillRect((j*20+2)*V.sc, (i*20+1)*V.sc, (20-3.5)*V.sc, (20-4)*V.sc);
				for(var n=0;n<2;n++){
					V.ctx_bg.drawImage(
						V.sprite,
						40,
						63+n*20,
						10,
						20,
						j*40*V.sc/2+n*10*V.sc,
						i*40*V.sc/2,
						20*V.sc/2,
						40*V.sc/2
					);
				}
			}			
		}
	}
};

B.prototype.parse = function(arr){
	for(var i=0; i<arr.length; i++){
		this.b.push([]);
		for(var j=0; j<arr[i].length; j++){
			this.b[i].push(this.elements[arr[i].charAt(j)==' ' ? 'grass' : arr[i].charAt(j)]);
		}
	}
}
// B.mouse = function(e){
// 	B.mx = Math.floor(e.offsetX/(20*VAR.sc));
// 	B.my = Math.floor(e.offsetY/(20*VAR.sc));
// 	console.log('click: ' + B.mx + '/' + B.my + ' type:' + Map.b[B.my][B.mx].type);
// 	G.ctx_bg.fillRect(B.mx*20*VAR.sc, B.my*20*VAR.sc, 20*VAR.sc, 20*VAR.sc);
// }
