
function T(V, x, y, type, lvl){
	this.V = V;
	this.types = {
		'air':  {FXmod: 3, SR: 9, r:100, g:150, b:250, dmg:2, range: 70},
		'earth':{FXmod: 2, SR: 1, r:020, g:255, b:020, dmg:1, range: 120},
		'fire': {FXmod: 1, SR: 3, r:255, g:090, b:020, dmg:5, range: 50},
		'water':{FXmod: 0, SR: 5, r:020, g:090, b:255, dmg:1.5, range: 100}
	//SR - speed rotate, r-red, g-green, b-blue
	};
	this.x = x*V.sc*20;
	this.y = y*V.sc*20;
	this.TLvl = lvl | 1;
	this.angle = 0; 				//zmienic
	
	this.type = type;
	this.FXmod = this.types[this.type].FXmod;
	this.SR = this.types[this.type].SR;
	this.r = this.types[this.type].r;
	this.g = this.types[this.type].g;
	this.b = this.types[this.type].b;
	this.dmg = this.types[this.type].dmg*this.TLvl;
	this.range = this.types[this.type].range;
	this.aRange =0;
	this.a=0;
	this.d=0;

	//Rysowanie podstawy działa
	V.ctx_bg.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.TLvl*0.2+")";
	V.ctx_bg.fillRect(this.x+1*V.sc, this.y+1*V.sc, 18*V.sc, 18*V.sc);
	V.ctx_bg.drawImage(
		V.sprite,
		0,
		0,
		20,
		20,
		this.x,
		this.y,
		20*V.sc,
		20*V.sc
	);
};

T.prototype.draw = function() { 
	//Rysowanie działka uwzgledniając kąt

	V.ctx.save(); 
	V.ctx.translate(this.x+10*V.sc, this.y+10*V.sc);
	V.ctx.rotate((this.angle) * V.rad);
	//this.angle+=this.SR;
	V.ctx.drawImage(
		V.sprite, 
		21+7*this.FXmod, 		
		0,
		7, 		
		21,		
		-3.5*V.sc,
		-17.5*V.sc,
		7*V.sc,
		21*V.sc
	);
	V.ctx.restore(); 

};

T.prototype.shoot = function(enemy) { 
	var killMe;
	for(var i=0; i<enemy.length; i++){
		this.sY=Math.round((this.y+10*V.sc)-enemy[i].y);
		this.sX=Math.round((this.x+10*V.sc)-enemy[i].x);
		this.aRange = Math.round(Math.sqrt(this.sX*this.sX+this.sY*this.sY))/V.sc;

		if(this.aRange<=this.range){			
			if(this.aRange<=this.range){	
				if(killMe) {
					if(killMe.distance < enemy[i]) 
						killMe = enemy[i];
				} else {
					killMe = enemy[i];
				}
			}
		}
	}
	if(killMe) {
		this.angle = Math.round(Math.atan2(this.sY,this.sX)/V.rad-90);
		killMe.hp -= this.dmg*this.TLvl;
	}
};



