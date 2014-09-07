
function B(V, size, cx, map){
	this.V = V;
	this.cx = cx;
	this.map = map;
	this.size = size;
	this.startPos = [];
	this.templates = [
		[
			'   X            ',
			'  RW     R      ',
			'   W RSAAAAAA R ',
			'   W  S     W   ',
			'   WR DDS  RW   ',
			'   W  R S   W   ',
			' R W  SAA   W  R',
			'   WR SR   RW   ',
			'   W  DDS   W   ',
			'   W R  S   W   ',
			'R  WAAAAA   WR  ',
			'      R     Y   '		
		],
		[
			'                ',
			'   SAAAR SAAAA  ',
			'  SA  W  S R W  ',
			' RS  RW SA  DW  ',
			'XAA   WAA   W R ',
			'    R    R  WA  ',
			'   DDDS      W  ',
			'  DW  DS   R W  ',
			'  WR   DS   DW  ',
			'  WAA   DDDDW   ',
			' R  W   R       ',
			'    Y        R  '
		],
		[
			'          R     ',
			'      RDDDDDDDDX',
			'   R   W W  R   ',
			' RDDDDDWDWAAAA  ',
			' DW  R   R   WA ',
			' W          R W ',
			' W  R         W ',
			' WR       R   W ',
			' WA    R    RDW ',
			'  WAAAAADDDDDW  ',
			'   R   WW R     ',
			'       YY       '
		],
		[
			' V        R     ',
			' S     RWDDDS R ',
			' SR    DW   DS  ',
			' S     W  R DS  ',
			' S    RWA    S  ',
			' SR     W    SR ',
			' S   R  W   SA  ',
			'RDDDDDDDW  RS   ',
			' W      R   SR  ',
			' W R        DS  ',
			'>W        R  DDX',
			'                '
		],
		[
			'     X       V  ',
			'   DDW     R S  ',
			'  DDWR  RSAARS  ',
			'  W      S W S  ',
			'  W  RSAAA WAA  ',
			' RW   S R R     ',
			'  W   SAAA SAA  ',
			'  W   S  W S W  ',
			'  WR  S RWAARW  ',
			'  AAAAA   R  W  ',
			'  RAAA       W  ',
			'     R       Y  '
		],
		[
			'   VR    V   R  ',
			'   DS    DDS    ',
			'  R DS   R DS   ',
			'   DDDSR    S R ',
			'  DWR DS   RS   ',
			'>DWW   DS RSSR  ',
			'  R   R DS SSSA<',
			'    R   RDDSSS  ',
			'   SAAAA R SS   ',
			'  RS R W R SAR  ',
			'XAAA   WAAAA    ',
			'   R   R    R   '
		],
	];
	this.elements = {
		'grass':{FXmod:0, type:'G'},
		'W':{FXmod:1, 	  type:'W'},
		'A':{FXmod:1, 	  type:'A'},
		'S':{FXmod:1,	  type:'S'},
		'D':{FXmod:1,  	  type:'D'},
		'>':{FXmod:1,  	  type:'>'},//right start
		'<':{FXmod:1,  	  type:'<'},//left start
		'V':{FXmod:1,  	  type:'V'},//down start
		'Y':{FXmod:1,  	  type:'Y'},//up start
		'X':{FXmod:1,  	  type:'X'},
		'R':{FXmod:1,  	  type:'R'},
	};
	//mAin arr included grass and path
	this.b = []; 

	this.defeatAnimTimer=20;
	this.Bullets = [];

	this.Enemy = [];

	this.gold = {x:0, y:0}
	this.Golds = [];

	this.Towers = new Array(16);
	for (var i = 0; i < 16; i++) {
		this.Towers[i] = new Array(12);
	}
	this.parse(this.templates[map]);
	if(size<1){
		this.drawBg();
	}
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
			if(this.b[y][x].type!='G' && this.b[y][x].type!='R'){
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
	this.Enemy[this.Enemy.length] = new E(this.V, pos.x, pos.y, type, lvl);

};
B.prototype.addGold = function(){
	for (var i = 0; i<V.lifes; i++){
			this.Golds[i] = new G(this.V, this.gold.x, this.gold.y);
			this.Golds[i].draw();
		}
}
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

	 //Animation on defeat
	 if(V.lifes<=0 && V.mainmenu==0 && this.defeatAnimTimer>=0){
	 	this.defeatAnimTimer--;
	 	V.ctx.beginPath();
		V.ctx.lineWidth=(30-this.defeatAnimTimer)*V.sc*9;
		V.ctx.strokeStyle = 'rgba(200,150,100,' + (30-this.defeatAnimTimer)/35 + ')'
	 	V.ctx.rect(0,0,V.W,V.H);
	 	V.ctx.stroke();
	 	if(this.defeatAnimTimer<=0){
	 		V.life=0;
	 		V.mainmenu=1;
	 	}
	 }
	
	//End of wave
	if(this.Enemy.length==0 && !V.spawn.length && V.mainmenu==0){
	 	this.Bullets = [];
	 	this.Enemy = [];	

	 	V.timer=-601;
	 	V.fps = 50;
	 	V.score += this.waves*5;
	 	this.waves++;
	 	waves(V.map, this.waves);
	 	
	}

	//Spawner new enemy
	V.timer++;
	if(V.spawn.length>=1 && V.mainmenu==0){

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
	//Clear circle showed range
};
B.prototype.drawBg = function(){
	for(var i=0; i<this.b.length; i++){
		for(var j=0; j<this.b[i].length; j++){

			if(this.b[i][j].type == 'G' || this.b[i][j].type == 'R'){
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
				
				if(this.b[i][j].type == 'R'){
					this.cx.save(); 
					this.cx.translate((j*40+20)*V.sc/2*this.size, ((i*40+30)*V.sc/2-5*V.sc)*this.size);
					this.cx.rotate(V.rand(-20,100) * V.rad);
					this.cx.drawImage(
						V.sprite,
						51,
						34,
						10,
						10,
						-10*this.size,
						-10*this.size,
						20*V.sc/2*this.size,
						20*V.sc/2*this.size
					);
					this.cx.restore(); 
				}

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
				if(this.b[i][j].type == 'X'){
					this.gold.x = j*40*V.sc/2;
					this.gold.y = i*40*V.sc/2;
					this.gold.i = i;
					this.gold.j = j;

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
			if(arr[i].charAt(j)=='Y' || arr[i].charAt(j)=='V' || arr[i].charAt(j)=='<' || arr[i].charAt(j)=='>'){
				this.startPos.push({x:(j*10+2)*2, y:(i*10+3)*2});
			}
		}
	}
};
B.prototype.goldDraw = function(){
	this.Golds = this.delete(this.Golds, 0);
	this.clearBlock(this.gold.j,this.gold.i);
	for (var i = 0; i<this.Golds.length; i++){
		this.Golds[i].draw();
	}
}
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