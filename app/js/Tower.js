
function T(V, x, y, type, lvl){
	this.V = V;
	this.tr = {//reload, red, green, blue, range,
		'Air':  {rel: 30, r:100, g:150, b:250, ra: 35, FX:32,  FY:0, FXS:15, FYS:15, RX:7.5, RY:7.5, AR:3},
		'Earth':{rel: 10, r:132, g:100, b:37, ra: 10, FX:47,  FY:0, FXS:14, FYS:14, RX:7, RY:7, AR:0.2},
		'Fire': {rel: 25, r:255, g:090, b:020, ra: 55, FX:25,  FY:0, FXS:7, FYS:20, RX:3.5, RY:16.5, AR:0},
		'Water':{rel: 2,  r:020, g:090, b:255, ra: 40, FX:18,  FY:0, FXS:7, FYS:20, RX:3.5, RY:16.5, AR:0}
	};
	this.x = x*V.sc*20;
	this.y = y*V.sc*20;
	this.TLvl = lvl;
	this.angle = 0;
	
	this.type = type;
	this.rel = this.tr[this.type].rel;
	this.aRel = this.rel;
	this.r = this.tr[this.type].r;
	this.g = this.tr[this.type].g;
	this.b = this.tr[this.type].b;
	this.ra = this.tr[this.type].ra;
	this.aRa = 0;
	this.FX = this.tr[this.type].FX;
	this.FY = this.tr[this.type].FY;
	this.FXS = this.tr[this.type].FXS;
	this.FYS = this.tr[this.type].FYS;
	this.RX = this.tr[this.type].RX;
	this.RY = this.tr[this.type].RY;
	this.AR = this.tr[this.type].AR; //auto rotate
	this.aAR = 0;

	//Draw base of tower
	if(this.type!='Earth'){
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
		//for(var i=0; i<2; i++){
		//	for(var j=0; j<2; j++){
				// V.ctx_bg.drawImage(
				// 	V.sprite,
				// 	this.FX,
				// 	this.FY,
				// 	this.FXS,
				// 	this.FYS,
				// 	this.x+3*V.sc+14*i*V.sc/2,
				// 	this.y+3*V.sc+14*j*V.sc/2,
				// 	this.FXS*V.sc/2,
				// 	this.FYS*V.sc/2
				// );
				V.ctx_bg.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.TLvl*0.05+")";
				V.ctx_bg.fillRect(this.x+5*V.sc, this.y+5*V.sc, 10*V.sc, 10*V.sc);
		//	}
		//}
	}
};

T.prototype.draw = function() { 
	//Draw only turret
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
	//Shoot test in range
	var killMe;
	var sY, sX;
	for(var i=0; i<enemy.length; i++){
		this.sY=Math.round((this.y+10*V.sc)-enemy[i].y);
		this.sX=Math.round((this.x+10*V.sc)-enemy[i].x);
		this.aRa = Math.round(Math.sqrt(this.sX*this.sX+this.sY*this.sY))/V.sc;
		if(this.aRa<=this.ra){	
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

	if(killMe>-1 && this.type != 'Earth') {
		this.AR ? this.aAR+=0.2 : this.angle = Math.round(Math.atan2(sY,sX)/V.rad-90);
		if(this.aRel >= this.rel){
			this.aRel=0;		
			return true;
		}
		this.aRel++;
	}
};



