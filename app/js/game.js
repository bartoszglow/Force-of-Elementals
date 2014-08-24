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
		Board.addTower(1, 1, 'fire', 3);
		Board.addTower(4, 3, 'water', 1);
		Board.addTower(5, 7, 'air', 2);
		Board.addTower(9, 8, 'earth', 3);
		Board.addTower(10, 8, 'earth', 1);
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



// window.onload = function(){
// 	G.sprite = new Image();
// 	G.sprite.src = 'sprite.gif';
// 	G.sprite.onload = G.init;
// }
// VAR = {
// 	fps:60,
// 	W:0,
// 	H:0,
// 	sc:2, //scale
// 	rad:Math.PI/180, //radian
// 	lastTime:0,
// 	lastUpdate:-1,
// 	rand:function(min,max){
// 		return Math.floor(Math.random()*(max-min+1))+min;
// 	}
// }
// G = {
// 	init:function(){
// 		G.canvas_bg = document.createElement('canvas');		//canvas dla otocznie //background
// 		G.ctx_bg = G.canvas_bg.getContext('2d');

// 		G.canvas = document.createElement('canvas');					//cavas do gry
// 		G.ctx = G.canvas.getContext('2d');

// 		G.layout();
// 		G.canvas.addEventListener('click', B.mouse, false);		
// 		document.body.appendChild(G.canvas_bg);
// 		document.body.appendChild(G.canvas);
// 		//
// 		Map = new B();
// 		new T(4, 4, 'water', 3);
// 		new T(1, 8, 'earth', 5);
// 		new T(3, 2, 'air', 2);
// 		new T(1, 6, 'fire', 1);
// 		//
// 		G.animationLoop();
// 	},

// 	stop:function(){
	
// 	},

// 	onKey:function(ev){

// 	},

// 	layout:function(ev){
// 		VAR.W = 400*VAR.sc;
// 		VAR.H = 400*VAR.sc;

// 		G.canvas_bg.width = VAR.W;
// 		G.canvas_bg.height = VAR.H;
// 		G.canvas.width = VAR.W;
// 		G.canvas.height = VAR.H;

// 		G.ctx.imageSmoothingEnabled = false;
// 		G.ctx.mozImageSmoothingEnabled = false;
// 		G.ctx.oImageSmoothingEnabled = false;
// 		G.ctx.webkitImageSmoothingEnabled = false;
// 		G.ctx_bg.imageSmoothingEnabled = false;
// 		G.ctx_bg.mozImageSmoothingEnabled = false;
// 		G.ctx_bg.oImageSmoothingEnabled = false;
// 		G.ctx_bg.webkitImageSmoothingEnabled = false;


// 	},
// 	animationLoop:function(time){
// 		requestAnimationFrame( G.animationLoop );
// 		if(time-VAR.lastTime>=1000/VAR.fps){

// 			VAR.lastTime = time;
// 			G.ctx.clearRect(0,0,VAR.W, VAR.H);
// 			T.DrawT();		
// 		}
// 	}
// }


