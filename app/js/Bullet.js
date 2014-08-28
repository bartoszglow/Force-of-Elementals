

function Bullet(V, type, lvl, x, y, a) {
	this.V = V;

	this.types = {
		'air':  {dmg:6, v:0.5, r:100, g:150, b:250, range:20},
		'earth':{dmg:3, v:1, r:020, g:255, b:20, range:90},
		'fire': {dmg:15, v:1, r:020, g:090, b:255, range:70},
		'water':{dmg:1, v:0.5, r:020, g:090, b:255, range:50}

	
	};
	this.type = type;
	this.range = this.types[this.type].range;
	this.dmg = this.types[this.type].dmg*lvl;
	this.v = this.types[this.type].v;
	this.r = this.types[this.type].r;
	this.g = this.types[this.type].g;
	this.b = this.types[this.type].b;
	this.a = a;

	this.ax = x + (10 + Math.sin(this.a*V.rad)*13)*V.sc;
	this.ay = y + (10 - Math.cos(this.a*V.rad)*13)*V.sc;
	
	this.timeLife = Math.round(this.range/(V.sc*2*this.v));
}
Bullet.prototype.draw = function(){

	this.timeLife--;
	//Draw on canvas bullet

	V.ctx.fillStyle = "rgba(0,0,255,0.5)";
	V.ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+",0.8)";
	if(this.type=='water'){
		this.ax += Math.sin(this.a*V.rad)*V.sc*4*this.v;
		this.ay -= Math.cos(this.a*V.rad)*V.sc*4*this.v;

		V.ctx.beginPath();
		V.ctx.arc(this.ax,this.ay,6,0,2*Math.PI);
		V.ctx.fill();
	}else if(this.type=='fire'){
		this.ax += Math.sin(this.a*V.rad)*V.sc*4*this.v;
		this.ay -= Math.cos(this.a*V.rad)*V.sc*4*this.v;
		
		V.ctx.beginPath();
		V.ctx.arc(this.ax,this.ay,2,0,2*Math.PI);
		V.ctx.fill();
	}else if(this.type=='air'){
		this.ax += Math.sin(this.a*V.rad)*V.sc*4*this.v;
		this.ay -= Math.cos(this.a*V.rad)*V.sc*4*this.v;

		V.ctx.beginPath();
		V.ctx.arc(this.ax,this.ay,5,0,2*Math.PI);
		V.ctx.arc(this.ax,this.ay,5,0,2*Math.PI);
		V.ctx.fill();
	}else if(this.type=='earth'){
		this.ax += Math.sin(this.a*V.rad)*V.sc*4*this.v;
		this.ay -= Math.cos(this.a*V.rad)*V.sc*4*this.v;
		
		V.ctx.beginPath();
		V.ctx.arc(this.ax,this.ay,4,0,1*Math.PI);
		V.ctx.fill();
	}
}