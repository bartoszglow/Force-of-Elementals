window.onload = function(){
	V.sprite = new Image();
	V.sprite.src = 'assets/sprite.gif';
	V.sprite.onload = game.init();
};

var game = (function () {
	this.V = {
		fps:50,
		W:0,
		H:0,
		sc:2, //scale
		score:500,
		lifes:10,
		rad:Math.PI/180,
		lastTime:0,
		timer:0,
		spawn:[],
		sprite: {},
		ctx: {},
		ctx_bg: {},
		Water:20,
		Fire:30,
		Earth:60,
		Air:50,
		canvas_map:[],
		ctx_map:[],
		MenuMap:[],
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


		layout(canvas, canvas_bg);	

		document.getElementById("game").appendChild(canvas_bg);
		document.getElementById("game").appendChild(canvas);
		

		mainmenu();
		
		setTimeout(create, 100);
	};
	this.mainmenu = function(){
		for(var i=0; i<6; i++){
			var a = String(i);

			V.canvas_map[i] = document.createElement('canvas');				
			V.ctx_map[i] = V.canvas_map[i].getContext('2d');

			V.canvas_map[i].width = V.W*0.2;
			V.canvas_map[i].height = V.H*0.2;

			document.getElementById("main-menu").getElementsByClassName("level"+(i+1))[0].appendChild(V.canvas_map[i]);
			V.MenuMap[i] = new B(V, 0.2, V.ctx_map[i], i);
			document.getElementById("main-menu").getElementsByClassName("level"+(i+1))[0].addEventListener("mousedown", this.levelchoose, false);

		}
	};
	this.levelchoose = function(e){
		//console.log(document.getElementById("main-menu").getElementsByClassName("level"+(1+1))[0].innerHTML)
		switch(e.toElement.innerHTML){
			case 'Level 1':
				console.log('1');
				break;
			case 'Level 2':
				console.log('2');
				break;
			case 'Level 3':
				console.log('3');
				break;
			case 'Level 4':
				console.log('4');
				break;
			case 'Level 5':
				console.log('5');
				break;
			case 'Level 6':
				console.log('6');
				break;
		}
	}
	this.layout = function(canvas, canvas_bg, canvas_menu){
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
		Board = new B(V, 1, V.ctx_bg, 0);

		document.getElementsByClassName("box")[0].addEventListener("mousedown", this.mouse, false);

		animationLoop();
	}
	this.waves = function(n){
		//Editor for creating waves
		//case n == number of waves
		//V.spawn.push('type', lvl, count_of_mobs, time_between_spawn);
		
			switch(n){
				case 1:
					V.spawn.push('orc', 1, 4, 25);
					V.spawn.push('orc', 20, 4, 25);
					V.spawn.push('dragon', 2, 2, 50);
					V.spawn.push('dragon', 20, 2, 50);
				break;
				case 2:
					V.spawn.push('orc', 1, 8, 25);
					V.spawn.push('man', 1, 4, 40);
				break;
				case 3:
					V.spawn.push('orc', 2, 10, 25);
				break;
				case 4:
					V.spawn.push('man', 2, 10, 40);
					V.spawn.push('knight', 3, 1, 40);
				break;
				case 5:
					V.spawn.push('dragon', 2, 5, 50);
				break;
				case 6:
					V.spawn.push('orc', 4, 20, 25);
					V.spawn.push('man', 5, 10, 35);
				break;
				case 7:
					V.spawn.push('knight', 3, 8, 40);
				break;
				case 8:
					V.spawn.push('knight', 4, 6, 40);
				break;
				case 9:
					V.spawn.push('orc', 6, 20, 25);
					V.spawn.push('dragon', 3, 8, 70);
				break;
				case 10:
					V.spawn.push('zombie', 10, 3, 180);
				break;

		}


	};
	this.animationLoop = function(time){
		requestAnimationFrame( animationLoop );
		if(time-V.lastTime>=1000/V.fps){
			V.lastTime = time;

				V.ctx.clearRect(0,0,V.W, V.H);
				Board.draw();
				Menu.fill();
				
		};
	};
	this.drop = function(what, xx, yy, check) {
		var x = Math.floor(xx / (20 * V.sc));
		var y = Math.floor(yy / (20 * V.sc));

		//Board.addTower(x, y, what, check, 1);
		return Board.addTower(x, y, what, check, 1);
	};
	this.mouse = function(e){
		var mx = Math.floor(e.offsetX/(20*V.sc));
		var my = Math.floor(e.offsetY/(20*V.sc));

		Menu.upgradeInfo.style.visibility = "hidden";
		if(Board.Towers[mx][my] && V.fps!=0){
			Menu.upgrade(mx, my, Board.Towers[mx][my].type, Board.Towers[mx][my].TLvl);
		}
	};

	return {
		init: init,
		drop: drop,
	}
})();
