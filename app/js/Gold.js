function G(V, xx, yy){
	this.x = V.rand(-5 , 5)*V.sc + xx+7*V.sc;
	this.y = V.rand(-5 , 5)*V.sc + yy+10*V.sc;
	this.angle = V.rand(-20,20)
}
G.prototype.draw = function(){

	V.ctx_bg.save(); 
	V.ctx_bg.translate(this.x, this.y);
	V.ctx_bg.rotate(this.angle * V.rad);
	V.ctx_bg.drawImage(
		V.sprite,
		32,
		15,
		13,
		7,
		-4,
		-7,
		20*V.sc/2,
		10*V.sc/2
	);
	V.ctx_bg.restore(); 
}
