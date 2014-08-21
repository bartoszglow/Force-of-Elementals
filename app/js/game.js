window.onload = function(){
	G.sprite = new Image();
	G.sprite.src = 'assets/sprite.gif';
	G.sprite.onload = G.init;
}
VAR = {
	fps:60,
	W:0,
	H:0,
	sc:2, //scale
	rad:Math.PI/180, //radian
	lastTime:0,
	lastUpdate:-1,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}
G = {
	init:function(){

		G.canvas_bg = document.createElement('canvas');		//canvas dla otocznie //background
		G.ctx_bg = G.canvas_bg.getContext('2d');

		G.canvas = document.createElement('canvas');					//cavas do gry
		G.ctx = G.canvas.getContext('2d');


		G.layout();
		//window.addEventListener('resize', G.layout, false);		
		document.body.appendChild(G.canvas_bg);
		document.body.appendChild(G.canvas);
		//
		new Board();
		new T(160, 280, 'water', 3);
		new T(160, 80, 'earth', 5);
		new T(320, 240, 'air', 2);
		new T(160, 120, 'fire', 1);
		//
		G.animationLoop();
	},

	stop:function(){
	
	},

	onKey:function(ev){

	},

	layout:function(ev){
		VAR.W = Math.round(window.innerWidth);
		VAR.H = Math.round(window.innerHeight);

		G.canvas_bg.width = VAR.W;
		G.canvas_bg.height = VAR.H;
		G.canvas.width = VAR.W;
		G.canvas.height = VAR.H;


		G.ctx.imageSmoothingEnabled = false;
		G.ctx.mozImageSmoothingEnabled = false;
		G.ctx.oImageSmoothingEnabled = false;
		G.ctx.webkitImageSmoothingEnabled = false;
		G.ctx_bg.imageSmoothingEnabled = false;
		G.ctx_bg.mozImageSmoothingEnabled = false;
		G.ctx_bg.oImageSmoothingEnabled = false;
		G.ctx_bg.webkitImageSmoothingEnabled = false;


	},
	animationLoop:function(time){
		requestAnimationFrame( G.animationLoop );
		if(time-VAR.lastTime>=1000/VAR.fps){

			VAR.lastTime = time;
			G.ctx.clearRect(0,0,VAR.W, VAR.H);
			T.DrawT();		
		}
	}
}

