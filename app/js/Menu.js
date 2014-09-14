function M(V){

	this.buttons = document.getElementsByClassName("buttons")[0].getElementsByTagName("button");
	this.wavesInfo = document.getElementById("waves").getElementsByTagName("p");
	this.upgradeInfo = document.getElementById("upgrade");
	this.startButton = document.getElementById("waves").getElementsByTagName("button")[0];

	var fps = V.fps;
	this.fps = fps;

	//Array for fireworks
	this.all = [];
	this.visible = [];
	
	//Speed up button
	this.buttons[0].onclick = function(){
		if(V.fps == fps){
			V.fps = 2*fps;
			Menu.buttons[0].style.background= '#d4745b';
			
		}else if(V.fps != 0){
			V.fps = fps;
			Menu.buttons[0].style.background= '#88d98a';
		}
	};

	//Pause button
	this.buttons[1].onclick = function(){
		if(V.fps>0){
			Menu.buttons[0].style.background= '#88d98a';
			Menu.buttons[1].style.background= '#d4745b';
			Menu.upgradeInfo.style.visibility = "hidden";
			V.ctx.fillStyle = 'rgba(0,0,0,0.2)';
			V.ctx.fillRect(0,0,V.W,V.H);
			V.fps = 0;
		}else{
			V.fps=fps;
			Menu.buttons[1].style.background= '#88d98a';
		}
	};

	//Exit button
	this.buttons[2].onclick = function(){
		if(V.fps!=0){
			Menu.buttons[0].style.background= '#88d98a';
			Menu.upgradeInfo.style.visibility = "hidden";
			document.getElementById("waves").style.visibility = "hidden";
			V.ctx_r.clearRect(0,0,V.W, V.H);
			V.mainmenu=1;
		}
	};

	//Start next wave button
	this.startButton.onclick = function(){
		V.timer < -0 ? V.timer=-0 : V.timer;
	}

}
M.prototype.fill = function(){
	document.getElementById("money").innerHTML = V.score+'$';
	document.getElementById("lifes").innerHTML = V.lifes;


	//Counter time, info about enemies in waves
	if(V.timer%30==0 && V.timer <= 0){
		var waves;
		Board.waves > V.countWaves ? waves = V.countWaves : waves = Board.waves;
		if(-V.timer/30!=0){
			this.wavesInfo[0].innerHTML = '('+waves +' of '+V.countWaves+')' + ' ' + -V.timer/30 ;
		}else{
			this.wavesInfo[0].innerHTML = '('+waves +' of '+V.countWaves+')' + ' ';
		}

		if(V.timer<=0){
			for(var i=0, j=1; i<16; i+=4, j++){	
				V.s.length<=i ? this.wavesInfo[j].innerHTML = ' ' : this.wavesInfo[j].innerHTML = V.s[i] + ' (' + V.s[i+1] + ') ' + V.s[i+2];
			}
		}
	}
}
M.prototype.upgrade = function(x, y, type, lvl){
	var Tlvl = lvl + 1;
	//Draw tower distance
	V.ctx_r.beginPath();
	V.ctx_r.arc((x*20+10)*V.sc,(y*20+10)*V.sc,V[type+'R']*V.sc,0,2*Math.PI);
	V.ctx_r.stroke();

	this.upgradeInfo.getElementsByTagName("button")[0].style.background = '#88d98a';
	this.upgradeInfo.getElementsByTagName("button")[1].style.background = '#d4745b';
	this.upgradeInfo.getElementsByTagName("p")[0].innerHTML = type + ' element';
	this.upgradeInfo.getElementsByTagName("p")[1].innerHTML = 'Lvl ' + (lvl+1) + ' cost ' + (lvl+1)*V[type] + '$';
	lvl == 5 ? this.upgradeInfo.getElementsByTagName("p")[1].innerHTML = 'MAX' : lvl;
	this.upgradeInfo.getElementsByTagName("p")[2].innerHTML = '&nbsp Return ' + lvl*V[type] +'$ &nbsp';
	this.upgradeInfo.style.visibility = "visible";

	//Upgrade button
	this.upgradeInfo.getElementsByTagName("button")[0].onclick = function(){

		if(V.score>=(lvl+1)*V[type] && lvl<5 && V.fps!=0){
			delete Board.Towers[x][y];
			Board.addTower(x, y, type, 0, (lvl+1));
			V.ctx_r.clearRect(0,0,V.W, V.H);
			Menu.upgradeInfo.style.visibility = "hidden";
			Menu.upgrade(x, y, type, lvl+1);
		}
	}
	//Sell button
	this.upgradeInfo.getElementsByTagName("button")[1].onclick = function(){
		if(V.fps!=0){
			delete Board.Towers[x][y];
			Board.clearBlock(x,y);
			V.score+=(lvl*V[type]);
			V.ctx_r.clearRect(0,0,V.W, V.H);
			Menu.upgradeInfo.style.visibility = "hidden";
		}
	}
}
//fireworks animation playing on menu
M.prototype.fireworks = function(n){
	this.visible.length = 0;
	for (var i=0; i<n; i++) {		//count of participle per frame
			this.all.push({
			x:V.W*V.rand(5,95)/100,	//start x
			y:V.H/10,				//start y
			h:V.rand(2,3),			//size participle
			speedX:V.rand(-100,100)/100,	//speed x
			speedY:V.rand(0,300)/100,		//speed y
			r:V.rand(0,255),		//red
			g:V.rand(0,55),			//green
			b:V.rand(0,55)			//blue
		});
			
		
	}
	for (var i=0; i<this.all.length; i++) {
		var part = this.all[i];
		//
		part.x += part.speedX;
		part.y += part.speedY;
		
		V.ctx.fillStyle = 'rgba('+part.r+','+part.g+','+part.b+',1)';
		
	
		part.speedY = part.speedY+0.06;

		part.r = Math.min(255, part.r+2);
		part.g = Math.min(255, part.g+2);
		part.b = Math.min(255, part.b+2);
		//
		V.ctx.fillRect(part.x-part.h/2 ,part.y-part.h/2, part.h, part.h);
		if((part.x+part.h/2>0 && part.x-part.h/2<V.W && part.y+part.h/2>0 && part.y-part.h/2<V.H) && (part.r!=255 || part.g!=255 || part.b!=255)){
			this.visible.push(part)
		}
	}

	this.all = this.visible.concat();
}
//animation lunch on creating lvl
M.prototype.animCreating = function(i){
	var i = i;
	setTimeout(function(){
			V.ctx_bg.fillStyle = 'rgba(203,229,225,0.1)'
			V.ctx_bg.fillRect(0,0,V.W,V.H/20*i);
			V.timer=-1801;
			if(i>30){
				document.getElementById("waves").style.visibility = "visible";
				V.ctx_bg.clearRect(0,0,V.W,V.H);
				V.ctx_r.clearRect(0,0,V.W, V.H);
				Board.drawBg();
				Board.addGold();
				V.timer=-1801;
				if(V.mainmenu==0){	
				document.getElementById("main-menu").style.display = 'none';
				}					
			}
	}, 40*i);		
}
//animation launch if win
M.prototype.animWin = function(i){
	var i = i;
	setTimeout(function(){
			V.ctx_bg.fillStyle = 'rgba(183,209,255,'+(1-i/30)+')'
			V.ctx_bg.fillRect(0,V.H/29*i,V.W,V.H/29);
			V.ctx_r.clearRect(0,0,V.W, V.H);

				V.mainmenu=1;
				if(i==1){
					document.getElementById("waves").style.visibility = "hidden";
					Menu.upgradeInfo.style.visibility = "hidden";
					Menu.buttons[0].style.background= '#88d98a';
					Menu.buttons[1].style.background= '#88d98a';
				}
	}, 40*i);		
}