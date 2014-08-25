
function E(V, x, y, type, lvl){
	this.V = V;
	this.types = {
		'zombie':{ground:1, speed: 0.6, life:10, rise:0.75, FX:0,  FY:21, FXS:17, FYS:12, Fcount:[0],   frameRate:0, Frotate:0},
		'orc':{ ground:1, speed: 1.2, life:5,  rise:1, FX:18, FY:22, FXS:5,  FYS:9,  Fcount:[0,1], frameRate:4, Frotate:0},
		'dragon':{ground:0, speed: 0.8,   life:20, rise:0.9, FX:0,  FY:33, FXS:25, FYS:19, Fcount:[0,1], frameRate:8, Frotate:90},
		'man':{ ground:1, speed: 0.7, life:2,  rise:1, FX:45, FY:21, FXS:8,  FYS:14,  Fcount:[0,1], frameRate:7, Frotate:90},
		'knight':{  ground:1, speed: 0.6, life:2,  rise:0.75, FX:45, FY:48, FXS:15,  FYS:15, Fcount:[0], frameRate:0, Frotate:-90},
		'worm':{  ground:1, speed: 0.9, life:2,  rise:0.75, FX:29, FY:22, FXS:14,  FYS:9, Fcount:[0], frameRate:0, Frotate:180},
	};
	this.type = type;

	// Lvl enemy relative with count wave
	this.ELvl = lvl | 1;

	// Indyvidual properties each enemy
	// Ground/Air MoveSpeed Life RiseLargeEnemy XCordinateFrame YCordinateFrame XCorFrameSize YCorFrameSize NumberOfFrame RotateForFlipSprite
	this.ground = this.types[type].ground;
	this.speed = this.types[type].speed*V.sc;
	this.life = this.types[type].life;
	this.hp = this.life;
	this.rise = this.types[type].rise;
	this.FX = this.types[type].FX;
	this.FY = this.types[type].FY;
	this.FXS = this.types[type].FXS;
	this.FYS = this.types[type].FYS;
	this.Fcount = this.types[type].Fcount;
	this.Frotate = this.types[type].Frotate;

	// Coordinates relative to the center of mob, rotate count 0=left;
	this.x = (x+this.FXS/2)*V.sc;
	this.y = (y+this.FYS/2)*V.sc;
	this.rotate = 90;
	//actual frame, slow frame rate, slow frame rate actual
	this.frame = 0;
	this.fR = this.types[type].frameRate;
	this.fRa = 0;
};

E.prototype.move = function(arr){
	//calculate coordinate on array
	this.bx =  Math.floor(this.x/(20*V.sc));
	this.by =  Math.floor(this.y/(20*V.sc));

	//set direction
	if(arr[this.by][this.bx].type == 'W'){
		this.rotate==-360 ? this.rotate=0 : this.rotate;
		if(this.rotate!=90 && this.rotate<90 ){
			this.rotate+=5;
		}else if(this.rotate!=90){
			this.rotate-=5;
		}
	}else if(arr[this.by][this.bx].type == 'S'){
		this.rotate==180 ? this.rotate=-180 : this.rotate;
		if(this.rotate!=-90 && this.rotate<-90 ){
			this.rotate+=5;
		}else if(this.rotate!=-90){
			this.rotate-=5;
		}
	}else if(arr[this.by][this.bx].type == 'A'){//
		this.rotate==-270 ? this.rotate=-90 : this.rotate;
		if(this.rotate!=0  && this.rotate<0 ){
			this.rotate+=5;
		}else if(this.rotate!=0){
			this.rotate-=5;
		}
	}else if(arr[this.by][this.bx].type == 'D'){
		this.rotate==-90 ? this.rotate=270 : this.rotate;
		if(this.rotate!=180 && this.rotate<180 ){
			this.rotate+=5;
		}else if(this.rotate!=180){
			this.rotate-=5;
		}
	}
	//calculate speed relative to angle
	this.x += Math.sin(Math.PI/180*(this.rotate-90))*this.speed;
	this.y -= Math.cos(Math.PI/180*(this.rotate-90))*this.speed;
};


E.prototype.draw = function(){
	//Create hp bar
	V.ctx.fillStyle = 'rgba(250,10,10,0.5)';
	V.ctx.fillRect(this.x-(this.FXS/3*V.sc*this.rise),this.y-(this.FYS*V.sc*this.rise),V.sc*10,1*V.sc);
	V.ctx.fillStyle = 'rgba(0,240,100,0.9)';
	V.ctx.fillRect(this.x-(this.FXS/3*V.sc*this.rise),this.y-(this.FYS*V.sc*this.rise),this.hp/this.life*V.sc*10,1*V.sc);
	//Income actual frame
	if(this.frame < this.Fcount.length-1 && this.fRa >= this.fR){
		this.frame++;
		this.fRa=0;
	}else {
		this.fRa++;
	}
	if(this.frame == this.Fcount.length-1 && this.fRa >= this.fR){
		this.frame=0;
		this.fRa=0;
	}
	//Draw on canvas enemy
	V.ctx.save(); 
	V.ctx.translate(this.x, this.y);
	V.ctx.rotate((this.rotate+this.Frotate) * V.rad);
	V.ctx.drawImage(
		V.sprite,
		this.FX+this.Fcount[this.frame]*this.FXS,
		this.FY,
		this.FXS,
		this.FYS,
		-this.FXS,
		-this.FYS,
		this.FXS*V.sc*this.rise,
		this.FYS*V.sc*this.rise
	);
	V.ctx.restore(); 
};