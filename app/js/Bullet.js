

function Bullet(V, x, y, a, type, lvl) {
	this.V = V;

	this.types = {
		'air':  {dmg:8, r:100, g:150, b:250, range:70},
		'earth':{dmg:3, r:020, g:255, b:20, range:90},
		'fire': {dmg:15, r:020, g:090, b:255, range:50},
		'water':{dmg:6, r:020, g:090, b:255, range:80}

	
	};
	this.type = type;
	this.range = this.types[this.type].range;
	this.dmg = this.types[this.type].dmg*lvl;
	this.r = this.types[this.type].r;
	this.g = this.types[this.type].g;
	this.b = this.types[this.type].b;
	this.a = a;
	this.x = x+10*V.sc;
	this.y = y+10*V.sc;
	this.ax = x + (10 + Math.sin(this.a*V.rad)*1)*V.sc;
	this.ay = y + (10 - Math.cos(this.a*V.rad)*1)*V.sc;
	
	this.timeLife = Math.round(this.range/(V.sc*2));
}
Bullet.prototype.draw = function(){
	this.ax += Math.sin(this.a*V.rad)*V.sc*4;
	this.ay -= Math.cos(this.a*V.rad)*V.sc*4;
	this.timeLife--;
	//Draw on canvas bullet

	V.ctx.fillStyle = "rgba(0,0,255,0.5)";
	V.ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+",0.8)";
	V.ctx.beginPath();
	V.ctx.arc(this.ax,this.ay,4,0,2*Math.PI);
	V.ctx.fill();

}