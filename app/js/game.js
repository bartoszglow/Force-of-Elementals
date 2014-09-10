window.onload = function(){
	V.sprite = new Image();
	V.sprite.src = 'assets/sprite.gif';
	V.sprite.onload = game.init();
};

var game = (function () {
	this.V = {
		fps:40,
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
		s:[],
		sprite: {},
		ctx: {},
		ctx_bg: {},
		ctx_r: {},
		Water:10,
		Fire:15,
		Earth:25,
		Air:30,
		WaterR:40,
		FireR:55,
		AirR:35,
		EarthR:10,
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

		var canvas_r = document.createElement('canvas');				
		V.ctx_r = canvas_r.getContext('2d');

		layout(canvas, canvas_bg, canvas_r);	

		document.getElementById("game").appendChild(canvas_bg);
		document.getElementById("game").appendChild(canvas);
		document.getElementById("game").appendChild(canvas_r);

		mainmenu();
		Menu = new M(V);
		Board = new B(V, 1, V.ctx_bg, 0);
		Board.drawBg();

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
	this.layout = function(canvas, canvas_bg, canvas_r){
		V.W = 320*V.sc;
		V.H = 240*V.sc;
		//canvas_hit.width = V.W;
		//canvas_hit.height = V.H;
		canvas_bg.width = V.W;
		canvas_bg.height = V.H;
		canvas.width = V.W;
		canvas.height = V.H;
		canvas_r.width = V.W;
		canvas_r.height = V.H;

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
		if(V.mainmenu==1){
			V.fps=40;
			V.map=n;
			V.mainmenu=0;

			Board.drawBg();
			delete Board;
			delete Menu;
			V.s.length = 0;
			Menu = new M(V);
			Board = new B(V, 1, V.ctx_bg, V.map-1);
			
			for(var i=0; i<=31; i++){
				Menu.animCreating(i);
			}
			
			this.waves(V.map, 0)
			document.getElementsByClassName("box")[0].addEventListener("mousedown", this.mouse, false);
		}
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
		//V.s.push('type', lvl, count_of_mobs, time_between_s);
		switch(map){
			case 1:
			switch(lvl){
				case 0:
					V.score=80;
					V.lifes=10;
					V.countWaves=10;
				break;
				case 1:
					V.s.push('orc', 1, 4, 40);
				break;
				case 2:
					V.s.push('orc', 1, 5, 40);
				break;
				case 3:
					V.s.push('orc', 1, 10, 35);
					V.s.push('orc', 2, 1, 60);		
				break;
				case 4:
					V.s.push('man', 1, 5, 50);
				break;
				case 5:
					V.s.push('orc', 2, 10, 45);
					V.s.push('man', 1, 5, 55);
				break;
				case 6:
					V.s.push('man', 1, 5, 45);
					V.s.push('orc', 1, 25, 35);
				break;
				case 7:
					V.s.push('orc', 3, 25, 40);
				break;
				case 8:
					V.s.push('man', 2, 10, 40);
					V.s.push('orc', 4, 20, 35);
				break;
				case 9:
					V.s.push('orc', 5, 25, 25);
					V.s.push('man', 3, 10, 50);
					V.s.push('man', 2, 20, 45);
				break;
				case 10:
					V.s.push('worm', 5, 2, 50);
				break;
				case 11:
					this.animWin();
					document.getElementById("level2").className = "level2";
				break;
			}
			break;

			case 2:
			switch(lvl){
				case 0:
					V.score=200;
					V.lifes=20;
					V.countWaves=15;
				break;
				case 1:
					V.s.push('orc', 1, 10, 25);
				break;
				case 2:
					V.s.push('orc', 1, 20, 25);
					V.s.push('man', 1, 5, 40);
				break;
				case 3:
					V.s.push('orc', 1, 25, 25);
					V.s.push('man', 2, 4, 60);
				break;
				case 4:
					V.s.push('orc', 2, 20, 25);
					V.s.push('man', 1, 10, 40);
					V.s.push('orc', 2, 5, 100);
				break;
				case 5:
					V.s.push('orc', 2, 10, 25);
					V.s.push('orc', 3, 5, 25);
					V.s.push('man', 2, 5, 40);
				break;
				case 6:
					V.s.push('worm', 1, 10, 35);
				break;
				case 7:
					V.s.push('worm', 1, 5, 35);
					V.s.push('orc', 2, 4, 50);
				break;
				case 8:
					V.s.push('orc', 5, 20, 30);
					V.s.push('man', 3, 10, 50);
				break;
				case 9:
					V.s.push('worm', 2, 10, 35);
					V.s.push('man', 4, 10, 40);
				break;
				case 10:
					V.s.push('worm', 5, 3, 80);
				break;
				case 11:
					V.s.push('orc', 4, 25, 30);
					V.s.push('man', 5, 5, 40);
				break;
				case 12:
					V.s.push('orc', 6, 10, 35);
					V.s.push('worm', 5, 10, 50);
					V.s.push('orc', 6, 20, 35);
				break;
				case 13:
					V.s.push('man', 8, 10, 40);
				break;
				case 14:
					V.s.push('orc', 10, 16, 30);
					V.s.push('man', 7, 12, 40);
					V.s.push('worm', 6, 8, 40);
				break;
				case 15:
					V.s.push('man', 12, 4, 100);
					V.s.push('worm', 9, 2, 80);	
					V.s.push('dragon', 6, 1, 150);	
				break;
				case 16:
					this.animWin();
					document.getElementById("level3").className = "level3";
				break;
			}
			break;

			case 3:
			switch(lvl){
				case 0:
					V.score=1000;
					V.lifes=1;
					V.countWaves=10;
				break;
				case 1:
					V.s.push('man', 5, 10, 40);
				break;
				case 2:
					V.s.push('orc', 10, 10, 25);
					V.s.push('man', 6, 10, 40);
				break;
				case 3:
					V.s.push('orc', 10, 10, 25);
					V.s.push('man', 6, 10, 40);
				break;
				case 4:
					V.s.push('worm', 4, 30, 50);
				break;
				case 5:
					V.s.push('dragon', 3, 12, 60);
				break;
				case 6:
					V.s.push('orc', 12, 20, 25);
					V.s.push('man', 8, 10, 40);
				break;
				case 7:
					V.s.push('orc', 12, 30, 25);
					V.s.push('dragon', 4, 10, 50);
				break;
				case 8:
					V.s.push('worm', 6, 30, 50);
				break;
				case 9:
					V.s.push('man', 12, 20, 25);
					V.s.push('dragon', 6, 10, 50);
				break;
				case 10:
					V.s.push('zombie', 8, 2, 100);
				break;
				case 11:
					this.animWin();
					document.getElementById("level4").className = "level4";
				break;
			}
			break;

			case 4:
			switch(lvl){
				case 0:
					V.score=250;
					V.lifes=10;
					V.countWaves=12;
				break;
				case 1:
					V.s.push('orc', 2, 30, 40);
				break;
				case 2:
					V.s.push('orc', 3, 20, 40);
					V.s.push('dragon', 1, 8, 55);
				break;
				case 3:
					V.s.push('zombie', 1, 2, 55);
					V.s.push('orc', 2, 20, 35);
				break;
				case 4:
					V.s.push('worm', 1, 10, 25);
					V.s.push('man', 2, 20, 40);
					V.s.push('dragon', 2, 4, 50);
				break;
				case 5:
					V.s.push('orc', 4, 40, 35);
				break;
				case 6:
					V.s.push('zombie', 2, 2, 45);
					V.s.push('dragon', 2, 10, 50);
					V.score+=250;
				break;
				case 7:
					V.s.push('zombie', 3, 4, 45);
					V.s.push('worm', 4, 15, 40);
					V.s.push('dragon', 3, 10, 55);
				break;
				case 8:
					V.s.push('man', 6, 20, 45);
					V.s.push('zombie', 4, 10, 55);
					V.score+=250;
				break;
				case 9:
					V.s.push('orc', 12, 30, 25);
					V.s.push('dragon', 6, 15, 45);
				break;
				case 10:
					V.s.push('worm', 10, 30, 35);
					V.s.push('zombie', 6, 10, 45);
					V.s.push('dragon', 6, 15, 25);
					V.score+=250;
				break;
				case 11:
					V.s.push('zombie', 10, 20, 65);
				break;
				case 12:
					V.s.push('knight', 12, 4, 150);
				break;
				case 13:
					this.animWin();
					document.getElementById("level5").className = "level5";
				break;
			}
			break;

			case 5:
			switch(lvl){
				case 0:
					V.score=200;
					V.lifes=5;
					V.countWaves=10;
				break;
				case 1:
					V.s.push('man', 1, 10, 35);
					V.s.push('dragon', 1, 2, 55);
					V.s.push('man', 1, 10, 35);
					V.score+=100;
				break;
				case 2:
					V.s.push('zombie', 1, 2, 65);
					V.s.push('dragon', 1, 8, 40);
					V.s.push('zombie', 1, 2, 65);
					V.score+=100;
				break;
				case 3:
					V.s.push('knight', 1, 2, 75);
					V.s.push('dragon', 2, 8, 40);
					V.s.push('knight', 1, 2, 75);
					V.score+=100;
				break;
				case 4:
					V.s.push('worm', 3, 8, 40);
					V.s.push('zombie', 1, 10, 40);
					V.s.push('knight', 1, 2, 75);
					V.score+=100;
				break;
				case 5:
					V.s.push('orc', 10, 30, 25);
					V.s.push('dragon', 4, 10, 40);
					V.s.push('orc', 10, 30, 25);
					V.score+=100;
				break;
				case 6:
					V.s.push('man', 8, 30, 35);
					V.s.push('knight', 4, 2, 250);
					V.score+=100;
				break;
				case 7:
					V.s.push('orc', 14, 30, 25);
					V.s.push('zombie', 4, 10, 45);
					V.s.push('dragon', 5, 20, 35);
					V.s.push('knight', 6, 2, 250);
					V.score+=100;
				break;
				case 8:
					V.s.push('worm', 11, 30, 35);
					V.s.push('man', 10, 15, 140);
					V.s.push('man', 30, 4, 140);
					V.score+=100;
				break;
				case 9:
					V.s.push('orc', 15, 30, 25);
					V.s.push('knight', 5, 8, 45);
					V.s.push('dragon', 8, 10, 40);
					V.score+=100;
				break;
				case 10:
					V.s.push('zombie', 15, 1, 140);
					V.s.push('dragon', 15, 1, 140);
					V.s.push('knight', 15, 1, 140);
					V.score+=500;
				break;
				case 11:
					this.animWin();
					document.getElementById("level6").className = "level6";
				break;
			}
			break;

			case 6:
			switch(lvl){
				case 0:
					V.score=500;
					V.lifes=5;
					V.countWaves=10;
				break;
				case 1:
					V.s.push('orc', 1, 30, 25);
					V.s.push('orc', 5, 5, 55);
				break;
				case 2:
					V.s.push('man', 1, 25, 30);
					V.s.push('man', 5, 5, 60);
					V.score+=100;
				break;
				case 3:
					V.s.push('worm', 1, 20, 35);
					V.s.push('worm', 5, 5, 65);
					V.score+=100;
				break;
				case 4:
					V.s.push('dragon', 1, 15, 45);
					V.s.push('dragon', 5, 5, 70);
					V.score+=100;
				break;
				case 5:
					V.s.push('zombie', 1, 10, 45);
					V.s.push('zombie', 5, 5, 75);
					V.score+=100;
				break;
				case 6:
					V.s.push('knight', 1, 10, 50);
					V.s.push('knight', 5, 5, 80);
					V.score+=100;
				break;
				case 7:
					V.s.push('zombie', 2, 15, 45);
					V.s.push('dragon', 3, 15, 50);
					V.score+=100;
				break;
				case 8:
					V.s.push('knight', 5, 10, 60);
					V.score+=100;
				break;
				case 9:
					V.s.push('orc', 10, 25, 35);
					V.s.push('man', 10, 15, 40);
					V.s.push('worm', 10, 10, 45);
					V.score+=100;
				break;
				case 10:
					V.s.push('orc', 20, 5, 35);
					V.s.push('man', 15, 5, 40);
					V.s.push('worm', 12, 5, 45);
					V.s.push('dragon', 10, 5, 45);
					V.s.push('zombie', 8, 5, 45);
					V.s.push('knight', 6, 5, 45);
					V.score+=500;
				break;
				case 11:
					this.animWin();
					V.ctx_bg.fillStyle = 'red'
					V.ctx_bg.font = 'italic '+12*V.sc+'pt Calibri';
     				V.ctx_bg.fillText('CONGRATULATION!', 10*V.sc, 200*V.sc);
     				V.ctx_bg.fillText('You beat all Levels!', 10*V.sc, 230*V.sc);		
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
					V.fps=40;
					document.getElementById("main-menu").style.display = 'block';
					if(V.timer%V.rand(50,150)==0){
						var n = V.rand(1,4);
						switch(n){
							case 1:
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
					Menu.fireworks(4);
					Board.draw();
				}			
		};
	};
	this.drop = function(what, xx, yy, check) {
		var x = Math.floor(xx / (20 * V.sc));
		var y = Math.floor(yy / (20 * V.sc));
		if(xx>10*V.sc && xx<310*V.sc && yy>10*V.sc && yy<230*V.sc){
			V.ctx_r.clearRect(0,0,V.W, V.H);
			V.ctx_r.beginPath();
			V.ctx_r.arc((x*20+10)*V.sc,(y*20+10)*V.sc,V[what+'R']*V.sc,0,2*Math.PI);
			V.ctx_r.stroke();
		}else{
			V.ctx_r.clearRect(0,0,V.W, V.H);
		}
		return Board.addTower(x, y, what, check, 1);
	};
	this.mouse = function(e){
		var mx = Math.floor(e.offsetX/(20*V.sc));
		var my = Math.floor(e.offsetY/(20*V.sc));
		V.ctx_r.clearRect(0,0,V.W, V.H);
		Menu.upgradeInfo.style.visibility = "hidden";
		if(Board.Towers[mx][my] && V.fps!=0){
			Menu.upgrade(mx, my, Board.Towers[mx][my].type, Board.Towers[mx][my].TLvl);
		}
	};
	this.animWin = function(){
		for(var i=0; i<=30; i++){
			Menu.animWin(i);
		}
	}

	return {
		init: init,
		drop: drop,
	}
})();
