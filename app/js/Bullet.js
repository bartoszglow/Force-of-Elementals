

function Bullet(V, type, lvl, x, y, a) {
	this.V = V;

	this.types = {
		'Air':  {dmg:10, v:0.5, r:100, g:150, b:250, range:20},
		'Earth':{dmg:0, v:1, r:020, g:255, b:20, range:0},
		'Fire': {dmg:15, v:1.2, r:255, g:090, b:020, range:60},
		'Water':{dmg:2, v:0.4, r:020, g:090, b:255, range:35}

	
	};
	this.type = type;
	this.range = this.types[this.type].range;
	this.dmg = this.types[this.type].dmg*lvl*lvl;
	this.lvl = lvl;
	this.v = this.types[this.type].v;
	this.r = this.types[this.type].r;
	this.g = this.types[this.type].g;
	this.b = this.types[this.type].b;
	this.a = a;
	this.x = x;
	this.y = y;
	this.ax = this.x + (10 + Math.sin(this.a*V.rad)*13)*V.sc;
	this.ay = this.y + (10 - Math.cos(this.a*V.rad)*13)*V.sc;
	
	this.timeLife = Math.round(this.range/(V.sc*2*this.v));
}
Bullet.prototype.draw = function(){

	this.timeLife--;
	//Draw on canvas bullet	
	V.ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+",0.8)";
	switch(this.type){
		case 'Water':
			this.ax += Math.sin(this.a*V.rad)*V.sc*4*this.v;
			this.ay -= Math.cos(this.a*V.rad)*V.sc*4*this.v;

			V.ctx.beginPath();
			V.ctx.arc(this.ax,this.ay,2*(0.4+this.lvl/6)*V.sc,0,2*Math.PI);
			V.ctx.fill();
			break;
		case 'Fire':
			this.ax += Math.sin(this.a*V.rad)*V.sc*4*this.v;
			this.ay -= Math.cos(this.a*V.rad)*V.sc*4*this.v;
			
			V.ctx.beginPath();
			V.ctx.arc(this.ax,this.ay,3*(0.4+this.lvl/6)*V.sc,0,2*Math.PI);
			V.ctx.fill();
			break;
		case 'Air':
			this.ax += Math.sin(this.a*V.rad)*V.sc*4*this.v;
			this.ay -= Math.cos(this.a*V.rad)*V.sc*4*this.v;

			V.ctx.beginPath();
			V.ctx.arc(this.ax,this.ay,2*(0.4+this.lvl/6)*V.sc,0,2*Math.PI);
			V.ctx.fill();
			break;
		case 'Earth':
			break;
	}
}