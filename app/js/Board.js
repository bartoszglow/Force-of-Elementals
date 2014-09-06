
function B(V, size, cx, map){
	this.V = V;
	this.cx = cx;
	this.map = map;
	this.size = size;
	this.startPos = [];
	this.templates = [
		[
			'       X        ',
			'       W        ',
			'       W        ',
			'       W        ',
			'  DDDS W SAAA   ',
			'  W  S W S  W   ',
			'  W  DDWAA  W   ',
			'  W         W   ',
			'  WAAA   DDDW   ',
			'     W   W      ',
			'     W   W      ',
			'     Y   Y      '
		],
		[
			'   X            ',
			'   W            ',
			'   W            ',
			'   W  SAAAAAA   ',
			'   W  S     W   ',
			'   W  S     W   ',
			'   W  DDDS  W   ',
			'   W     S  W   ',
			'   W     S  W   ',
			'   WAAAAAA  W   ',
			'            W   ',
			'            Y   '
		],
		[
			'                ',
			'                ',
			'                ',
			'      SAAAAAA   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      X     Y   '
		],
		[
			'                ',
			'                ',
			'                ',
			'      SAAAAAA   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      X     Y   '
		],
		[
			'                ',
			'                ',
			'                ',
			'      SAAAAAA   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      X     Y   '
		],
		[
			'                ',
			'                ',
			'                ',
			'      SAAAAAA   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      S     W   ',
			'      X     Y   '
		],
	];
	this.elements = {
		'grass':{FXmod:0, type:'G'},
		'W':{FXmod:1, 	  type:'W'},
		'A':{FXmod:1, 	  type:'A'},
		'S':{FXmod:1,	  type:'S'},
		'D':{FXmod:1,  	  type:'D'},
		'X':{FXmod:1,  	  type:'X'},
		'Y':{FXmod:1,  	  type:'W'},
	};
	//mAin arr included grass and path
	this.b = []; 

	this.Bullets = [];

	this.Enemy = [];

	this.Towers = new Array(16);
	for (var i = 0; i < 16; i++) {
		this.Towers[i] = new Array(12);
	}
	this.parse(this.templates[map]);
	
	this.drawBg();	

	this.waves = 0;
	this.count = 0;
};

B.prototype.addTower = function(x, y, type, check, lvl){
		
	var cost = V[type]*lvl;

	if(!this.Towers[x][y] && V.score>=cost){
		if(type!='Earth'){
			if(this.b[y][x].type=='G'){
				if(check){
					return true;
				}				
				this.Towers[x][y] = new T(this.V, x, y, type, lvl);
				this.Towers[x][y].draw(x, y);
				V.score-=cost;
			};
		}else{
			if(this.b[y][x].type!='G'){
				if(check){
					return true;
				}
				this.Towers[x][y] = new T(this.V, x, y, type, lvl);
				this.Towers[x][y].draw(x, y);
				V.score-=cost;
			};
		}
	}else{
		return false;
	}
};

B.prototype.addEnemy = function(type, lvl){
	var pos = this.startPos[V.rand(0,this.startPos.length-1)];
	this.Enemy[this.Enemy.length] = new E(this.V, pos.x*V.sc, pos.y*V.sc, type, lvl);

};
B.prototype.delete = function(arr,arrIndex){
	return arr.slice(0,arrIndex).concat(arr.slice(arrIndex + 1));
};
B.prototype.draw = function(){
	for (var i = 0; i < 16; i++) {	   	
	    for(var j=0; j<12; j++){
	    	if(this.Towers[i][j]){
	    		this.Towers[i][j].draw();

	    		if(this.Towers[i][j].shoot(this.Enemy)){
	    			if(this.Towers[i][j].type == 'Air'){
	    				for(var n=0; n<24; n++){
	    				this.Bullets[this.Bullets.length] = new Bullet(this.V, this.Towers[i][j].type, this.Towers[i][j].TLvl, this.Towers[i][j].x, this.Towers[i][j].y,  15*n);
	    				}
	    			}else{
	    			this.Bullets[this.Bullets.length] = new Bullet(this.V, this.Towers[i][j].type, this.Towers[i][j].TLvl, this.Towers[i][j].x, this.Towers[i][j].y,  this.Towers[i][j].angle);
	    			}
	    		}
	    	}
	    }
	 }


 	 for(var i=0; i<this.Bullets.length; i++){
 		this.Bullets[i].draw();
 		for(var j=0; j<this.Enemy.length; j++){
	 			if(this.Bullets[i].timeLife<=0){
	 				//Misses shoot
					this.Bullets = this.delete(this.Bullets, i);
					break;
				}else if(this.Enemy[j].hit(this.Bullets[i].ax, this.Bullets[i].ay)){

	 			this.Enemy[j].hp -= this.Bullets[i].dmg;
				this.Bullets = this.delete(this.Bullets, i);
				break;}	
 		}	
	 }

	// V.ctx_hit.clearRect(0,0,V.W, V.H);
	 for(var i=0; i<this.Enemy.length; i++){
	 	if(this.Enemy[i].hp > 0){
	 	this.Enemy[i].move(this.b, this.Towers);
	 	this.Enemy[i].draw();

	 	}
	 	if(this.Enemy[i].hp <= 0){
	 		V.score += this.Enemy[i].score;
	 		this.Enemy = this.delete(this.Enemy, i);

	 		if(this.Enemy[i]){
	 			this.Enemy[i].move(this.b, this.Towers);
	 			this.Enemy[i].draw();
	 		}
	 	}
	 }

	
	if(this.Enemy.length==0 && !V.spawn.length){
	 	this.Bullets = [];
	 	this.Enemy = [];	

	 	V.timer=-541;
	 	V.score += this.waves*10;
	 	this.waves++;
	 	waves(this.waves);
	}
	V.timer++;
	if(V.spawn.length>=1){

		if(V.timer>V.spawn[3]){
			if(V.spawn[2]==0){
	
				V.spawn = this.delete(V.spawn, 3);
				V.spawn = this.delete(V.spawn, 2);
				V.spawn = this.delete(V.spawn, 1);
				V.spawn = this.delete(V.spawn, 0);
			}else{

				this.addEnemy(V.spawn[0], V.spawn[1]);
				V.spawn[2]--;		
			}
			V.timer = 0;
		}
	}
	
};

B.prototype.drawBg = function(){
	for(var i=0; i<this.b.length; i++){
		for(var j=0; j<this.b[i].length; j++){

			if(this.b[i][j].type == 'G'){
				this.cx.fillStyle = "#5fc148";
				this.cx.fillRect((j*20+2)*V.sc*this.size, (i*20+1)*V.sc*this.size, (20-3.5)*V.sc*this.size, (20-4)*V.sc*this.size);
				this.cx.drawImage(
					V.sprite,
					0,
					53,
					40,
					50,
					j*40*V.sc/2*this.size,
					(i*40*V.sc/2-5*V.sc)*this.size,
					40*V.sc/2*this.size,
					50*V.sc/2*this.size
				);

			}else{
				this.cx.fillStyle = "#bebf6a";
				this.cx.fillRect((j*20+2)*V.sc*this.size, (i*20+1)*V.sc*this.size, (20-3.5)*V.sc*this.size, (20-4)*V.sc*this.size);
					this.cx.drawImage(
						V.sprite,
						40,
						83,
						20,
						20,
						j*40*V.sc/2*this.size,
						i*40*V.sc/2*this.size,
						40*V.sc/2*this.size,
						40*V.sc/2*this.size
					);
				
			}			
		}
	}
};

B.prototype.parse = function(arr){
	for(var i=0; i<arr.length; i++){
		this.b.push([]);
		for(var j=0; j<arr[i].length; j++){
			this.b[i].push(this.elements[arr[i].charAt(j)==' ' ? 'grass' : arr[i].charAt(j)]);
			if(arr[i].charAt(j)=='Y'){
				this.startPos.push({x:j*10+2, y:i*10+5});
			}
		}
	}
};

B.prototype.clearBlock = function(x, y){
	if(this.b[y][x].type=='G'){
		V.ctx_bg.fillStyle = "#5fc148";
		V.ctx_bg.fillRect((x*20+2)*V.sc, (y*20+1)*V.sc, (20-3.5)*V.sc, (20-4)*V.sc);
		V.ctx_bg.drawImage(
			V.sprite,
			0,
			53,
			40,
			50,
			x*40*V.sc/2,
			y*40*V.sc/2-5*V.sc,
			40*V.sc/2,
			50*V.sc/2
		);
	}else{
		V.ctx_bg.fillStyle = "#bebf6a";
		V.ctx_bg.fillRect((x*20+2)*V.sc, (y*20+1)*V.sc, (20-3.5)*V.sc, (20-4)*V.sc);
			V.ctx_bg.drawImage(
				V.sprite,
				40,
				83,
				20,
				20,
				x*40*V.sc/2,
				y*40*V.sc/2,
				40*V.sc/2,
				40*V.sc/2
			);
	}
};