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
		timer:0,
		spawn:[],
		sprite: {},
		ctx: {},
		ctx_bg: {},
		//ctx_hit: {},
		water:20,
		fire:20,
		earth:40,
		air:40,
		rand:function(min,max){
			return Math.floor(Math.random()*(max-min+1))+min;
		},
	};
	//this.Board = {};
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

		animationLoop();
	}
	this.waves = function(n){
		//console.log(V.timer);
		//console.log(n);
		
			switch(n){
				case 1: //typ,lvl,count,wait
					V.spawn.push('orc', 1, 4, 20);
					V.spawn.push('man', 1, 2, 50);
				break;
				case 2:
					V.spawn.push('man', 2, 4, 50);
					V.spawn.push('orc', 2, 2, 50);
				break;
				case 3:
					V.spawn.push('knight', 1, 3, 100);
				break;
				case 4:
					V.spawn.push('orc', 1, 20, 30);
					V.spawn.push('man', 2, 10, 30);
					V.spawn.push('knight', 2, 2, 50);
				break;
				case 5:
					V.spawn.push('dragon', 3, 5, 100);
				break;
				case 6:
					V.spawn.push('knight', 3, 10, 50);
					V.spawn.push('dragon', 4, 10, 50);
				break;
		}


	}
	this.animationLoop = function(time){
		requestAnimationFrame( animationLoop );
		if(time-V.lastTime>=1000/V.fps){
			V.lastTime = time;

				V.ctx.clearRect(0,0,V.W, V.H);
				Board.draw();
				Menu.fill();
				
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
