
function T(V, x, y, type, lvl){
	this.V = V;
	this.types = {
		'air':  {reloaded: 30, r:100, g:150, b:250, range: 40, FX:32,  FY:0, FXS:15, FYS:15, RX:7.5, RY:7.5, AR:3},
		'earth':{reloaded: 10, r:140, g:155, b:20, range: 10, FX:47,  FY:0, FXS:14, FYS:14, RX:7, RY:7, AR:2},
		'fire': {reloaded: 25, r:255, g:090, b:020, range: 80, FX:25,  FY:0, FXS:7, FYS:20, RX:3.5, RY:16.5, AR:0},
		'water':{reloaded: 2,  r:020, g:090, b:255, range: 60, FX:18,  FY:0, FXS:7, FYS:20, RX:3.5, RY:16.5, AR:0}
	};
	this.x = x*V.sc*20;
	this.y = y*V.sc*20;
	this.TLvl = lvl | 1;
	this.angle = 0;
	
	this.type = type;
	this.reloaded = this.types[this.type].reloaded;
	this.aReloaded = this.reloaded;
	this.r = this.types[this.type].r;
	this.g = this.types[this.type].g;
	this.b = this.types[this.type].b;
	this.range = this.types[this.type].range;
	this.aRange =0;
	this.FX = this.types[type].FX;
	this.FY = this.types[type].FY;
	this.FXS = this.types[type].FXS;
	this.FYS = this.types[type].FYS;
	this.RX = this.types[type].RX;
	this.RY = this.types[type].RY;
	this.AR = this.types[type].AR; //auto rotate
	this.aAR = 0;

	//Rysowanie podstawy działa
	if(this.type!='earth'){
		V.ctx_bg.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.TLvl*0.2+")";
		V.ctx_bg.fillRect(this.x+1*V.sc, this.y+1*V.sc, 18*V.sc, 18*V.sc);
		V.ctx_bg.drawImage(
			V.sprite,
			0,
			0,
			18,
			18,
			this.x+1*V.sc,
			this.y+1*V.sc,
			18*V.sc,
			18*V.sc
		);
	}else{//Draw earth tower
		for(var i=0; i<2; i++){
			for(var j=0; j<2; j++){
				V.ctx_bg.drawImage(
					V.sprite,
					this.FX,
					this.FY,
					this.FXS,
					this.FYS,
					this.x+3*V.sc+14*i*V.sc/2,
					this.y+3*V.sc+14*j*V.sc/2,
					this.FXS*V.sc/2,
					this.FYS*V.sc/2
				);
				V.ctx_bg.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.TLvl*0.2+")";
				V.ctx_bg.fillRect(this.x+4.5*V.sc+14*i*V.sc/2, this.y+4.5*V.sc+14*j*V.sc/2, this.FXS*V.sc/2-3*V.sc, this.FYS*V.sc/2-3*V.sc);
			}
		}
	}
};

T.prototype.draw = function() { 
	//Rysowanie działka uwzgledniając kąt
	V.ctx.save(); 
	V.ctx.translate(this.x+10*V.sc, this.y+10*V.sc);
	V.ctx.rotate((this.angle) * V.rad);
	V.ctx.drawImage(
		V.sprite, 
		this.FX, 		
		this.FY,
		this.FXS, 		
		this.FYS,		
		-this.RX*V.sc*(0.8+this.TLvl/20),
		-this.RY*V.sc*(0.8+this.TLvl/20),
		this.FXS*V.sc*(0.8+this.TLvl/20),
		this.FYS*V.sc*(0.8+this.TLvl/20)
	);
	V.ctx.restore(); 
};

T.prototype.shoot = function(enemy) { 
	var killMe;
	var sY, sX;
	for(var i=0; i<enemy.length; i++){
		this.sY=Math.round((this.y+10*V.sc)-enemy[i].y);
		this.sX=Math.round((this.x+10*V.sc)-enemy[i].x);
		this.aRange = Math.round(Math.sqrt(this.sX*this.sX+this.sY*this.sY))/V.sc;
		if(this.aRange<=this.range){	
			if(killMe > -1) {
				if(enemy[killMe].distance < enemy[i].distance){ 
					killMe = i;
					sY = this.sY;
					sX = this.sX;
				}
			} else {
				killMe = i;
				sY = this.sY;
				sX = this.sX;
			}
		}
	}

	if(this.AR){
		this.angle+=this.AR+Math.abs(this.aAR);
		this.aAR > 10 ? this.aAR-=0.2 : (this.aAR > 0 ? this.aAR-=0.1 : this.aAR);
	}

	if(killMe>-1) {
		this.AR ? this.aAR+=0.2 : this.angle = Math.round(Math.atan2(sY,sX)/V.rad-90);
		if(this.aReloaded >= this.reloaded){
			this.aReloaded=0;		
			return true;
		}
		this.aReloaded++;
	}
};



