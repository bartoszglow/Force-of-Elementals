window.onload = function(){
	V.sprite = new Image();
	V.sprite.src = 'assets/sprite.gif';
	V.sprite.onload = game.init();
};

var game = (function () {
	this.V = {
		fps:60,
		W:0,
		H:0,
		sc:2, //scale
		rad:Math.PI/180, //radian
		lastTime:0,
		lastUpdate:-1,
		sprite: {},
		ctx: {},
		ctx_bg: {},
		rand:function(min,max){
			return Math.floor(Math.random()*(max-min+1))+min;
		}
	};
	this.Board = {};
	this.init = function(){
		


		var canvas_bg = document.createElement('canvas');
		V.ctx_bg = canvas_bg.getContext('2d');

		var canvas = document.createElement('canvas');				
		V.ctx = canvas.getContext('2d');

		layout(canvas, canvas_bg);		
		document.body.appendChild(canvas_bg);
		document.body.appendChild(canvas);
		//		
		setTimeout(create, 100);
	};
	this.layout = function(canvas, canvas_bg){
		V.W = 320*V.sc;
		V.H = 240*V.sc;

		canvas_bg.width = V.W;
		canvas_bg.height = V.H;
		canvas.width = V.W;
		canvas.height = V.H;

		V.ctx.imageSmoothingEnabled = false;
		V.ctx.mozImageSmoothingEnabled = false;
		V.ctx.oImageSmoothingEnabled = false;
		V.ctx.webkitImageSmoothingEnabled = false;
		V.ctx_bg.imageSmoothingEnabled = false;
		V.ctx_bg.mozImageSmoothingEnabled = false;
		V.ctx_bg.oImageSmoothingEnabled = false;
		V.ctx_bg.webkitImageSmoothingEnabled = false;
	};
	this.create = function(){

		Board = new B(V);
		Board.addEnemy(240, 165, 'worm', 1);
		Board.addEnemy(240, 185, 'man', 1);
		Board.addEnemy(240, 230, 'knight', 1);
		Board.addEnemy(240, 215, 'human', 1);
		Board.addEnemy(240, 200, 'zombie', 1);
		Board.addEnemy(240, 210, 'dragon', 1);
		Board.addTower(1, 1, 'fire', 3);
		Board.addTower(4, 3, 'water', 1);
		Board.addTower(5, 7, 'air', 2);
		Board.addTower(9, 8, 'earth', 3);

		animationLoop();
	}
	this.animationLoop = function(time){

		
		//

		requestAnimationFrame( animationLoop );
		if(time-V.lastTime>=1000/V.fps){
			V.lastTime = time;
				V.ctx.clearRect(0,0,V.W, V.H);
				Board.draw();
		};
	};
	return {
		init: init
	}
})();
