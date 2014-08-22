
T.all = {};
T.count = 0;
T.type = {
	'air':{  FXmod: 3, SR: 9, r:100, g:150, b:250, dmg:1},
	'earth':{FXmod: 2, SR: 1, r:020, g:255, b:020, dmg:1},
	'fire':{ FXmod: 1, SR: 3, r:255, g:020, b:020, dmg:1},
	'water':{FXmod: 0, SR: 5, r:020, g:020, b:255, dmg:1}
//SR - speed rotate, r-red, g-green, b-blue
};

function T(x, y, type, lvl){
	T.count++;
	T.all[T.count] = this;
	this.x = x*VAR.sc*20;
	this.y = y*VAR.sc*20;
	this.TLvl = lvl;
	this.round = 0;
	
	this.type = type;
	this.FXmod = T.type[this.type].FXmod;
	this.SR = T.type[this.type].SR;
	this.r = T.type[this.type].r;
	this.g = T.type[this.type].g;
	this.b = T.type[this.type].b;

	//Rysowanie podstawy działa
	G.ctx_bg.fillStyle = "white";
	G.ctx_bg.fillRect(this.x, this.y, 20*VAR.sc, 20*VAR.sc);
	G.ctx_bg.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.TLvl*0.2+")";
	G.ctx_bg.fillRect(this.x, this.y, 20*VAR.sc, 20*VAR.sc);
	G.ctx_bg.drawImage(
		G.sprite, 
		0,
		0,
		20,
		20,
		this.x,
		this.y,
		20*VAR.sc,
		20*VAR.sc
	);
	}

T.prototype.draw = function(x, y) { 
	//Rysowanie działka uwzgledniając kąt
	G.ctx.save(); 
	G.ctx.translate(x+10*VAR.sc, y+10*VAR.sc);
	G.ctx.rotate(this.round * VAR.rad);
	this.round+=this.SR;
	G.ctx.drawImage(
		G.sprite, 
		21+7*this.FXmod, 		
		0,
		7, 		
		21,		
		-3.5*VAR.sc,
		-17.5*VAR.sc,
		7*VAR.sc,
		21*VAR.sc
	);
	G.ctx.restore(); 
}

T.DrawT = function(){
	for(var t in T.all){
		T.all[t].draw(T.all[t].x, T.all[t].y);
		
	}
}



