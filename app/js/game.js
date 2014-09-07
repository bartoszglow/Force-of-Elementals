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
		score:0,
		lifes:10,
		rad:Math.PI/180,
		lastTime:0,
		timer:0,
		map:0,
		mainmenu:1,
		countWaves:0,
		spawn:[],
		sprite: {},
		ctx: {},
		ctx_bg: {},
		Water:20,
		Fire:30,
		Earth:50,
		Air:60,
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
		Board = new B(V, 1, V.ctx_bg, 0);

		animationLoop();
	};
	this.mainmenu = function(){
		for(var i=0; i<6; i++){
			var a = String(i);

			V.canvas_map[i] = document.createElement('canvas');				
			V.ctx_map[i] = V.canvas_map[i].getContext('2d');

			V.canvas_map[i].width = V.W*0.2;
			V.canvas_map[i].height = V.H*0.2;

			document.getElementById("level"+(i+1)).appendChild(V.canvas_map[i]);
			V.MenuMap[i] = new B(V, 0.2, V.ctx_map[i], i);
			document.getElementById("level"+(i+1)).addEventListener("mousedown", this.levelchoose, false);

		}
	};
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
	this.create = function(n){
		V.fps=50;
		V.timer=-601;
		V.map=n;
		V.mainmenu=0;
		delete Board;
		delete Menu;
		Menu = new M(V);
		Board = new B(V, 1, V.ctx_bg, V.map-1);

		document.getElementById("main-menu").style.display = 'none';

		this.waves(V.map, 0)

		document.getElementsByClassName("box")[0].addEventListener("mousedown", this.mouse, false);


		
	};

	this.levelchoose = function(e){
		//console.log(document.getElementById("main-menu").getElementsByClassName("level"+(1+1))[0].innerHTML)
		switch(e.toElement.innerHTML){
			case 'Level 1':
				document.getElementById("level1").className == "level1" ? create(1) : V.map;
				break;
			case 'Level 2':
				document.getElementById("level2").className == "level2" ? create(2) : V.map;
				break;
			case 'Level 3':
				document.getElementById("level3").className == "level3" ? create(3) : V.map;
				break;
			case 'Level 4':
				document.getElementById("level4").className == "level4" ? create(4) : V.map;
				break;
			case 'Level 5':
				document.getElementById("level5").className == "level5" ? create(5) : V.map;
				break;
			case 'Level 6':
				document.getElementById("level6").className == "level6" ? create(6) : V.map;
				break;
		}
	};

	this.waves = function(map, lvl){
		//Editor for creating waves
		//case n == number of waves
		//V.spawn.push('type', lvl, count_of_mobs, time_between_spawn);
		switch(map){
			case 1:
			switch(lvl){
				case 0:
					V.score=90;
					V.lifes=10;
					V.countWaves=1;
					Board.addGold();
				break;
				case 1:
					V.spawn.push('orc', 1, 5, 25);
				break;
				case 3:
					V.spawn.push('orc', 1, 5, 15);
					V.spawn.push('orc', 5, 5, 25);
				break;
				case 3:
					for(var i = 0; i < 5; i++) {
						V.spawn.push('orc', 1, 2, 15);
						V.spawn.push('orc', 10, 1, 25);
					}
				break;
				case 4:
					V.spawn.push('orc', 3, 10, 15);
					V.spawn.push('man', 1, 10, 25);
				break;
				case 5:
					V.spawn.push('orc', 1, 30, 5);
					V.spawn.push('man', 2, 10, 25);
					V.spawn.push('orc', 3, 15, 15);
				break;
				case 6:
					V.spawn.push('man', 3, 10, 25);
					V.spawn.push('orc', 4, 15, 15);
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
				case 2:
					V.mainmenu=1;
					document.getElementById("level2").className = "level2";
				break;
			}
			break;

			case 2:
			switch(lvl){
				case 0:
					V.score=40;
					V.lifes=10;
					V.countWaves=2;
				break;
				case 1:
					V.spawn.push('orc', 1, 4, 25);
				break;
				case 2:
					V.spawn.push('orc', 1, 8, 25);
					V.spawn.push('man', 1, 4, 40);
				break;
				case 3:
					V.mainmenu=1;
					document.getElementById("level3").className = "level3";
				break;
			}
			break;

			case 3:
			switch(lvl){
				case 0:
					V.score=400;
					V.lifes=10;
					V.countWaves=2;
				break;
				case 1:
					V.spawn.push('dragon', 3, 4, 25);
				break;
				case 2:
					V.spawn.push('orc', 1, 8, 25);
					V.spawn.push('man', 1, 4, 40);
				break;
				case 3:
					V.mainmenu=1;
					document.getElementById("level4").className = "level4";
				break;
			}
			break;

			case 4:
			switch(lvl){
				case 0:
					V.score=20;
					V.lifes=10;
					V.countWaves=2;
				break;
				case 1:
					V.spawn.push('orc', 1, 6, 25);
				break;
				case 2:
					V.spawn.push('orc', 1, 8, 25);
				break;
				case 3:
					V.mainmenu=1;
					document.getElementById("level5").className = "level5";
				break;
			}
			break;

			case 5:
			switch(lvl){
				case 0:
					V.score=100;
					V.lifes=10;
					V.countWaves=2;
				break;
				case 1:
					V.spawn.push('worm', 1, 4, 25);
				break;
				case 2:
					V.spawn.push('orc', 1, 8, 25);
					V.spawn.push('zombie', 2, 1, 40);
				break;
				case 3:
					V.mainmenu=1;
					document.getElementById("level6").className = "level6";
				break;
			}
			break;

			case 6:
			switch(lvl){
				case 0:
					V.score=200;
					V.lifes=10;
					V.countWaves=2;
				break;
				case 1:
					V.spawn.push('knight', 1, 4, 25);
				break;
				case 2:
					V.spawn.push('orc', 1, 8, 25);
					V.spawn.push('man', 1, 4, 40);
				break;
				case 3:
					V.mainmenu=1;
				break;
			}
			break;
		}
	};

	this.animationLoop = function(time){
		requestAnimationFrame( animationLoop );
		if(time-V.lastTime>=1000/V.fps){
			V.lastTime = time;

				if(!V.mainmenu){
					V.ctx.clearRect(0,0,V.W, V.H);
					Board.draw();
					Menu.fill();

				}else{
					document.getElementById("main-menu").style.display = 'block';
					if(V.timer%V.rand(50,150)==0){
						var n = V.rand(1,4);
						switch(n){
							case 1:
							Board.addEnemy('orc', 2);
							break;
							case 2:
							Board.addEnemy('orc', 2);
							break;
							case 2:
							Board.addEnemy('man', 2);
							break;
							case 3:
							Board.addEnemy('dragon', 2);
							break;							
						}
					}
					V.ctx.clearRect(0,0,V.W, V.H);
					Board.draw();
				}			
		};
	};
	this.drop = function(what, xx, yy, check) {
		var x = Math.floor(xx / (20 * V.sc));
		var y = Math.floor(yy / (20 * V.sc));
		
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
