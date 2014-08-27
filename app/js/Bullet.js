

function Bullet(V, x, y, a, type, tx, ty, d) {
	this.V = V;

	this.types = {
		'air':  {sieze:1},
		'earth':{size:1},
		'fire': {size:1},
		'water':{size:1}

	//SR - speed rotate, r-red, g-green, b-blue
	};
	this.a = a;
	this.x = x+10*V.sc;
	this.y = y+10*V.sc;
	this.ax = x + (10 + Math.sin(this.a*V.rad)*8)*V.sc;
	this.ay = y + (10 - Math.cos(this.a*V.rad)*8)*V.sc;
	this.type = type;
	//coordinate target, distance to target
	this.tx = tx;		//niepotrzebne narazie delete?@@@@@@@@@@@@@
	this.ty = ty;
	this.d = d;
	//this.aD = 0;
	

}
Bullet.prototype.draw = function(){
	this.ax += Math.sin(this.a*V.rad)*V.sc*10;
	this.ay -= Math.cos(this.a*V.rad)*V.sc*10;

	//Draw on canvas bullet

	V.ctx.fillStyle = "rgba(0,0,255,0.5)";
	V.ctx.beginPath();
	V.ctx.arc(this.ax,this.ay,5,0,2*Math.PI);
	V.ctx.fill();


	if(V.ctx_hit.getImageData(this.ax,this.ay,1,1).data[0]!=0){
		console.log('aa');

		return true;
	}
	return false;

}