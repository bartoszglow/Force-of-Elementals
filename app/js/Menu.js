function M(V){

	this.buttons = document.getElementsByClassName("buttons")[0].getElementsByTagName("button");
	this.wavesInfo = document.getElementById("waves").getElementsByTagName("p");
	this.upgradeInfo = document.getElementById("upgrade");

	var fps = V.fps;
	
	//Speed up button
	this.buttons[0].onclick = function(){
		if(V.fps == fps){
			V.fps = 2*fps;
			
		}else{
			V.fps = fps;
		}
	};

	//Pause button
	this.buttons[1].onclick = function(){
		if(V.fps>0){
			V.ctx.fillStyle = 'rgba(0,0,0,0.2)';
			V.ctx.fillRect(0,0,V.W,V.H);
			V.fps = 0;
		}else{
			V.fps=fps;
		}
	};

	//Exit button
	this.buttons[2].onclick = function(){
		V.mainmenu=1;
	};

	//Start next wave button
	document.getElementById("waves").getElementsByTagName("button")[0].onclick = function(){

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

		if(V.timer<0){
			for(var i=0, j=1; i<16; i+=4, j++){	
				V.spawn.length<=i ? this.wavesInfo[j].innerHTML = ' ' : this.wavesInfo[j].innerHTML = V.spawn[i] + ' '+ V.spawn[i+2];
				
			}
		}
	}
}
M.prototype.upgrade = function(x, y, type, lvl){
	var Tlvl = lvl + 1;
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
			Menu.upgradeInfo.style.visibility = "hidden";
		}
	}
	//Sell button
	this.upgradeInfo.getElementsByTagName("button")[1].onclick = function(){
		if(V.fps!=0){
			delete Board.Towers[x][y];
			Board.clearBlock(x,y);
			V.score+=(lvl*V[type]);
			Menu.upgradeInfo.style.visibility = "hidden";
		}
	}
}