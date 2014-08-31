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
		score:50,
		lifes:10,
		rad:Math.PI/180,
		lastTime:0,
		lastUpdate:-1,
		sprite: {},
		ctx: {},
		ctx_bg: {},
		//ctx_hit: {},
		water:20,
		fire:20,
		earth:40,
		air:40,
		a: -600,
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

		//var canvas_hit = document.createElement('canvas');				
		//V.ctx_hit = canvas_hit.getContext('2d');

		layout(canvas, canvas_bg);		
		document.body.appendChild(canvas_bg);
		document.body.appendChild(canvas);
		//document.body.appendChild(canvas_hit);
		//		

		setTimeout(create, 100);
	};
	this.layout = function(canvas, canvas_bg){
		V.W = 320*V.sc;
		V.H = 240*V.sc;
		//canvas_hit.width = V.W;
		//canvas_hit.height = V.H;
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
		Menu = new M(V);
		Board = new B(V);

		Board.addEnemy(240, 230, 'worm', 1);
		Board.addEnemy(240, 230, 'man', 1);
		Board.addEnemy(240, 230, 'knight', 1);
		Board.addEnemy(240, 230, 'orc', 1);
		Board.addEnemy(240, 230, 'zombie', 1);
		Board.addEnemy(240, 230, 'dragon', 1);

		animationLoop();
	}
	this.animationLoop = function(time){
		requestAnimationFrame( animationLoop );
		if(time-V.lastTime>=1000/V.fps){
			V.lastTime = time;

				V.ctx.clearRect(0,0,V.W, V.H);
				Board.draw();
				Menu.fill();
				if(V.a%120==1){
					Board.addEnemy(240, 230, 'knight', 1);
				}
				V.a++;

		};
	};
	this.drop = function(what, xx, yy) {
		var x = Math.floor(xx / (20 * V.sc));
		var y = Math.floor(yy / (20 * V.sc));

		Board.addTower(x, y, what, 1);
	};

	return {
		init: init,
		drop: drop,
	}
})();
