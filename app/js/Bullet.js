

function Bullet(V, x, y, a, type, lvl) {
	this.V = V;

	this.types = {
		'air':  {dmg:8},
		'earth':{dmg:3},
		'fire': {dmg:15},
		'water':{dmg:6}

	
	};
	this.type = type;
	this.dmg = this.types[this.type].dmg*lvl;

	this.a = a;
	this.x = x+10*V.sc;
	this.y = y+10*V.sc;
	this.ax = x + (10 + Math.sin(this.a*V.rad)*5)*V.sc;
	this.ay = y + (10 - Math.cos(this.a*V.rad)*5)*V.sc;
	


}
Bullet.prototype.draw = function(){
	this.ax += Math.sin(this.a*V.rad)*V.sc*10;
	this.ay -= Math.cos(this.a*V.rad)*V.sc*10;

	//Draw on canvas bullet

	V.ctx.fillStyle = "rgba(0,0,255,0.5)";
	V.ctx.beginPath();
	V.ctx.arc(this.ax,this.ay,5,0,2*Math.PI);
	V.ctx.fill();

}