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

		G.canvas = document.createElement('canvas');				
		G.ctx = G.canvas.getContext('2d');

		G.layout();
		window.addEventListener('resize', G.layout, false);		
		document.body.appendChild(G.canvas);
		//
		new T(200, 100, 'water', 1);
		new T(200, 300, 'fire', 1);
		new T(200, 400, 'earth', 1);
		new T(200, 200, 'air', 1);
		new T(250, 100, 'water', 2);
		new T(250, 300, 'fire', 2);
		new T(250, 400, 'earth', 2);
		new T(250, 200, 'air', 2);
		new T(300, 100, 'water', 3);
		new T(300, 300, 'fire', 3);
		new T(300, 400, 'earth', 3);
		new T(300, 200, 'air', 3);
		new T(350, 100, 'water', 4);
		new T(350, 300, 'fire', 4);
		new T(350, 400, 'earth', 4);
		new T(350, 200, 'air', 4);
		new T(400, 100, 'water', 5);
		new T(400, 300, 'fire', 5);
		new T(400, 400, 'earth', 5);
		new T(400, 200, 'air', 5);
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

		G.canvas.width = VAR.W;
		G.canvas.height = VAR.H;


		G.ctx.imageSmoothingEnabled = false;
		G.ctx.mozImageSmoothingEnabled = false;
		G.ctx.oImageSmoothingEnabled = false;
		G.ctx.webkitImageSmoothingEnabled = false;


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

