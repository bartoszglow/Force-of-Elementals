

function Bullet(V, type, lvl, x, y, a) {
	this.V = V;

	this.typ = {
		'Air':  {dmg:7, v:0.5, r:100, g:150, b:250, ra:25},
		'Fire': {dmg:8, v:1.3, r:255, g:090, b:020, ra:55},
		'Water':{dmg:1, v:0.8, r:020, g:090, b:255, ra:40}

	
	};
	this.type = type;
	this.ra = this.typ[this.type].ra;
	this.dmg = this.typ[this.type].dmg*lvl*lvl;
	this.lvl = lvl;
	this.v = this.typ[this.type].v;
	this.r = this.typ[this.type].r;
	this.g = this.typ[this.type].g;
	this.b = this.typ[this.type].b;
	this.a = a;
	this.x = x;
	this.y = y;
	this.ax = this.x + (10 + Math.sin(this.a*V.rad)*13)*V.sc;
	this.ay = this.y + (10 - Math.cos(this.a*V.rad)*13)*V.sc;
	
	this.timeLife = Math.round(this.ra/(V.sc*2*this.v));
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
			V.ctx.arc(this.ax,this.ay,2.2*(0.4+this.lvl/6)*V.sc,0,2*Math.PI);
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
	}
}