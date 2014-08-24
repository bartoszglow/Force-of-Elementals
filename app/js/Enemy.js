
function E(V, x, y, type, lvl){
	this.V = V;
	this.types = {
		'zombie':{  FXmod: 3, ground:true, speed: 9, life:10, FX:0}
	};
	this.x = x;
	this.y = y;
	this.ELvl = lvl | 1;
};
E.prototype.move = function(){

}
E.prototype.draw = function(){

}