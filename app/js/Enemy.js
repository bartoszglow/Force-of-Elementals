
function E(V, x, y, type, lvl){
	this.V = V;
	this.types = {
		'zombie':{ground:1, speed: 0.4, life:100, rise:0.75, FX:0,  FY:21, FXS:17, FYS:12, Fcount:[0],   frameRate:0, Frotate:0},
		'orc':{ ground:1, speed: 1.2, life:20,  rise:1, FX:18, FY:22, FXS:5,  FYS:9,  Fcount:[0,1], frameRate:8, Frotate:0},
		'dragon':{ground:0, speed: 1,   life:150, rise:0.9, FX:1,  FY:34, FXS:25, FYS:19, Fcount:[0,1], frameRate:16, Frotate:90},
		'man':{ ground:1, speed: 0.9, life:50,  rise:1, FX:45, FY:19, FXS:8,  FYS:14,  Fcount:[0,1], frameRate:10, Frotate:90},
		'knight':{  ground:1, speed: 0.6, life:200,  rise:0.75, FX:46, FY:47, FXS:15,  FYS:15, Fcount:[0], frameRate:0, Frotate:-90},
		'worm':{  ground:1, speed: 1.3, life:40,  rise:1, FX:29, FY:22, FXS:14,  FYS:9, Fcount:[0], frameRate:0, Frotate:180},
	};
	this.type = type;

	// Lvl enemy relative with count wave
	this.ELvl = lvl | 1;

	// Indyvidual properties each enemy
	// Ground/Air MoveSpeed Life RiseLargeEnemy XCordinateFrame YCordinateFrame XCorFrameSize YCorFrameSize NumberOfFrame RotateForFlipSprite
	this.ground = this.types[type].ground;
	this.speed = this.types[type].speed*V.sc;
	this.aSpeed = this.speed;
	this.life = this.types[type].life*this.ELvl;
	this.hp = this.life;
	this.rise = this.types[type].rise;
	this.FX = this.types[type].FX;
	this.FY = this.types[type].FY;
	this.FXS = this.types[type].FXS;
	this.FYS = this.types[type].FYS;
	this.Fcount = this.types[type].Fcount;
	this.Frotate = this.types[type].Frotate;
	this.distance=0;

	// Coordinates relative to the center of mob, rotate count 0=left;
	this.x = (x+this.FXS/2)*V.sc;
	this.y = (y+this.FYS/2)*V.sc;
	this.rotate = 90;
	//actual frame, slow frame rate, slow frame rate actual
	this.frame = 0;
	this.fR = this.types[type].frameRate;
	this.fRa = 0;
};

E.prototype.move = function(arrB, arrT){
	//calculate coordinate on array
	this.bx =  Math.floor(this.x/(20*V.sc));
	this.by =  Math.floor(this.y/(20*V.sc));

	//set direction
	switch(arrB[this.by][this.bx].type){
		case 'W':
			this.rotate==-360 ? this.rotate=0 : this.rotate;
			if(this.rotate!=90 && this.rotate<90 ){
				this.rotate+=2;
			}else if(this.rotate!=90){
				this.rotate-=2;
			}
			break;
		case 'S':
			this.rotate==180 ? this.rotate=-180 : this.rotate;
			if(this.rotate!=-90 && this.rotate<-90 ){
				this.rotate+=2;
			}else if(this.rotate!=-90){
				this.rotate-=2;
			}
			break;
		case 'A'://
			this.rotate==-270 ? this.rotate=-90 : this.rotate;
			if(this.rotate!=0  && this.rotate<0 ){
				this.rotate+=2;
			}else if(this.rotate!=0){
				this.rotate-=2;
			}
			break;
		case 'D':
			this.rotate==-90 ? this.rotate=270 : this.rotate;
			if(this.rotate!=180 && this.rotate<180 ){
				this.rotate+=2;
			}else if(this.rotate!=180){
				this.rotate-=2;
			}
			break;
	}
		//earth tower
		if(arrT[this.bx][this.by] && this.ground){
			this.aSpeed=this.speed/(arrT[this.bx][this.by].TLvl+1);
		}

	//calculate speed relative to angle
	this.x += Math.round((Math.sin(V.rad*(this.rotate-90))*this.aSpeed)*10)/20;
	this.y -= Math.round((Math.cos(V.rad*(this.rotate-90))*this.aSpeed)*10)/20;
	this.distance += this.aSpeed;
	this.aSpeed = this.speed;

};

E.prototype.draw = function(){ 
	//Create hp bar
	if(this.hp < this.life){
		V.ctx.fillStyle = 'rgba(250,10,10,0.5)';
		V.ctx.fillRect(this.x-(this.FXS/3*V.sc*this.rise),this.y-(this.FYS*V.sc*this.rise),V.sc*10,1*V.sc);
		V.ctx.fillStyle = 'rgba(0,240,100,0.9)';
		V.ctx.fillRect(this.x-(this.FXS/3*V.sc*this.rise),this.y-(this.FYS*V.sc*this.rise),this.hp/this.life*V.sc*10,1*V.sc);
	}
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
E.prototype.hit = function(x,y){
	if(this.x-this.FXS*V.sc/3<x && this.x+this.FXS*V.sc/3>x && this.y-this.FYS*V.sc/3<y && this.y+this.FYS*V.sc/3>y){
		// V.ctx_hit.save(); 
		// V.ctx_hit.translate(this.x, this.y);
		// V.ctx_hit.rotate((this.rotate+this.Frotate) * V.rad);
		// V.ctx_hit.drawImage(
		// 	V.sprite,
		// 	this.FX+this.Fcount[this.frame]*this.FXS,
		// 	this.FY,
		// 	this.FXS,
		// 	this.FYS,
		// 	-this.FXS,
		// 	-this.FYS,
		// 	this.FXS*V.sc*this.rise,
		// 	this.FYS*V.sc*this.rise
		// );
		// V.ctx_hit.restore(); 

		//if(V.ctx_hit.getImageData(this.x,this.y,1,1).data[0]!=0){
			return true
		//}
	}
	return false
	
};