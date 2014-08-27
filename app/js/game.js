window.onload = function(){
	V.sprite = new Image();
	V.sprite.src = 'assets/sprite.gif';
	V.sprite.onload = game.init();
};

var game = (function () {
	this.V = {
		fps:20,
		W:0,
		H:0,
		sc:2, //scale
		rad:Math.PI/180, //radian
		lastTime:0,
		lastUpdate:-1,
		sprite: {},
		ctx: {},
		ctx_bg: {},
		ctx_hit: {},
		rand:function(min,max){
			return Math.floor(Math.random()*(max-min+1))+min;
		},
		imagedata:function(){
			console.log(V.ctx.getImageData(1,1,1,1).data[1]);
		}
	};
	this.Board = {};
	this.init = function(){
		
		var canvas_bg = document.createElement('canvas');
		V.ctx_bg = canvas_bg.getContext('2d');

		var canvas = document.createElement('canvas');				
		V.ctx = canvas.getContext('2d');

		var canvas_hit = document.createElement('canvas');				
		V.ctx_hit = canvas_hit.getContext('2d');

		layout(canvas, canvas_bg, canvas_hit);		
		document.body.appendChild(canvas_bg);
		document.body.appendChild(canvas);
		document.body.appendChild(canvas_hit);
		//		
		setTimeout(create, 100);
	};
	this.layout = function(canvas, canvas_bg, canvas_hit){
		V.W = 320*V.sc;
		V.H = 240*V.sc;
		canvas_hit.width = V.W;
		canvas_hit.height = V.H;
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
		Board.addEnemy(240, 230, 'worm', 2);
		Board.addEnemy(240, 230, 'man', 2);
		Board.addEnemy(240, 230, 'knight', 2);
		Board.addEnemy(240, 230, 'orc', 2);
		Board.addEnemy(240, 230, 'zombie', 2);
		Board.addEnemy(240, 230, 'dragon', 2);


		Board.addTower(2, 1, 'fire', 2);
		Board.addTower(9, 7, 'water', 1);
		Board.addTower(5, 7, 'air', 1);
		Board.addTower(9, 5, 'earth', 2);

		animationLoop();
	}
	this.animationLoop = function(time){
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
