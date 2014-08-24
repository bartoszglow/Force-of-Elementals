
function E(V, x, y, type, lvl){
	this.V = V;
	this.types = {
		'zombie':{ground:0, speed: 5, life:10, FX:0, FY:21, FXS:17, FYS:12, Fcount:[0], frameRate:0},
		'human':{ground:0, speed: 8, life:5, FX:18, FY:22, FXS:5, FYS:9, Fcount:[0,1], frameRate:5},
	};
	this.type = type;

	// Lvl enemy relative with count wave
	this.ELvl = lvl | 1;

	// Indyvidual properties each enemy
	// Ground/Air MoveSpeed Life XCordinateFrame YCordinateFrame XCorFrameSize YCorFrameSize NumberOfFrame
	this.ground = this.types[type].ground;
	this.speed = this.types[type].speed;
	this.life = this.types[type].life;
	this.FX = this.types[type].FX;
	this.FY = this.types[type].FY;
	this.FXS = this.types[type].FXS;
	this.FYS = this.types[type].FYS;
	this.Fcount = this.types[type].Fcount;

	// Coordinates relative to the center of mob, rotate count 0=left;
	this.x = (x+this.FXS/2)*V.sc;
	this.y = (y+this.FYS/2) *V.sc;
	this.rotate = 0;
	//actual frame, slow frame rate, slow frame rate actual
	this.frame = 0;
	this.fR = this.types[type].frameRate;
	this.fRa = 0;

};
E.prototype.move = function(){

};

E.prototype.draw = function(){

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


	V.ctx.save(); 
	V.ctx.translate(this.x, this.y);
	V.ctx.rotate(this.rotate * V.rad);
	this.rotate++;
	V.ctx.drawImage(
		V.sprite,
		this.FX+this.Fcount[this.frame]*this.FXS,
		this.FY,
		this.FXS,
		this.FYS,
		-this.FXS,
		-this.FYS,
		this.FXS*V.sc*2,
		this.FYS*V.sc*2
	);
	V.ctx.restore(); 

};