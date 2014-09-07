function M(V){

	this.buttons = document.getElementsByClassName("buttons")[0].getElementsByTagName("button");
	this.wavesInfo = document.getElementById("waves").getElementsByTagName("p");
	this.upgradeInfo = document.getElementById("upgrade");

	var fps = V.fps;

	//Array for fireworks
	this.all = [];
	this.visible = [];
	
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

		if(V.timer<=0){
			for(var i=0, j=1; i<16; i+=4, j++){	
				V.spawn.length<=i ? this.wavesInfo[j].innerHTML = ' ' : this.wavesInfo[j].innerHTML = V.spawn[i] + ' (' + V.spawn[i+1] + ') ' + V.spawn[i+2];
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
M.prototype.fireworks = function(){

//@@
//console.log('a')	//TUTAJ PRZEROBILEM TO NA JAKIS NIBY DESZCZ

					this.visible.length = 0;
					for (var i=0; i<1; i++) {
							this.all.push({
							x:V.W*V.rand(1,10)/10,
							y:V.H*V.rand(1,10)/10,// Żródło kwadratów zostaje przesunięte do gory.
							h:V.rand(2,6),// Trochę mniejsze kwadraty będą lepiej wyglądały.
							speedX:V.rand(-500,500)/100,
							speedY:V.rand(-500,500)/100,
							r:55,
							g:V.rand(0,100),
							b:V.rand(200,255)
						});
					}
					for (var i=0; i<this.all.length; i++) {
						var kwadrat = this.all[i];
						//
						V.ctx.fillStyle = 'rgba('+kwadrat.r+','+kwadrat.g+','+kwadrat.b+',1)';
						//
						kwadrat.x += kwadrat.speedX;
						kwadrat.y += kwadrat.speedY;
						// Stopniowe zwiększanie prędkości w kierunku dolnej krawędzie ekranu da nam efekt grawitacji.
						kwadrat.speedY = kwadrat.speedY+0.06;

						// Stopniowo zmieniamy też kolor kwadratów. Będą się stawały coraz bielsze. Stosując Math.min upewniem się, że wartość pojedynczego kanału nie przekroczy 255.
						kwadrat.r = Math.min(255, kwadrat.r+2);
						kwadrat.g = Math.min(255, kwadrat.g+2);
						kwadrat.b = Math.min(255, kwadrat.b+2);
						//
						V.ctx.fillRect(kwadrat.x-kwadrat.h/2 ,kwadrat.y-kwadrat.h/2, kwadrat.h, kwadrat.h);
						// Jeśli kwadrat jest widoczny wrzuć go do tablicy z widocznymi kwadratami.
						// Sprawdzam dwa czynniki. Położenie oraz kolor (całkiem białe kwadraty są również eliminowane)
						if((kwadrat.x+kwadrat.h/2>0 && kwadrat.x-kwadrat.h/2<V.W && kwadrat.y+kwadrat.h/2>0 && kwadrat.y-kwadrat.h/2<V.H) && (kwadrat.r!=255 || kwadrat.g!=255 || kwadrat.b!=255)){
							// widoczne są wrzucane do tablicy
							this.visible.push(kwadrat)
						}
					}
					// Przypisz kopię tablicy „this.visible” do „this.all”. Gdybyśmy nie przypisali kopii tylko oryginalną tablicę, to zmieniając tablicę „visible” zmienialibyśmy również tablicę „this.all” bo te dwie zmienne wskazywałyby na tą samą tablicę.
					this.all = this.visible.concat();

					//@@@@@@@@@@@@@@@@@@@@@@@ TU SA TE FAJERWERKI odkomentuj jak chcesz zobaaczyc

					// this.visible.length = 0;
					// for (var i=0; i<15; i++) {
					// 		this.all.push({
					// 		x:V.W/2,
					// 		y:V.H/4,// Żródło kwadratów zostaje przesunięte do gory.
					// 		h:V.rand(2,6),// Trochę mniejsze kwadraty będą lepiej wyglądały.
					// 		speedX:V.rand(-500,500)/100,
					// 		speedY:V.rand(-500,500)/100,
					// 		r:255,// Ustawiam czerony na maksa dla wszystkich kwadratów.
					// 		g:V.rand(0,240),
					// 		b:V.rand(0,100)
					// 	});
					// }
					// for (var i=0; i<this.all.length; i++) {
					// 	var kwadrat = this.all[i];
					// 	//
					// 	V.ctx_bg.fillStyle = 'rgba('+kwadrat.r+','+kwadrat.g+','+kwadrat.b+',1)';
					// 	//
					// 	kwadrat.x += kwadrat.speedX;
					// 	kwadrat.y += kwadrat.speedY;
					// 	// Stopniowe zwiększanie prędkości w kierunku dolnej krawędzie ekranu da nam efekt grawitacji.
					// 	kwadrat.speedY = kwadrat.speedY+0.06;

					// 	// Stopniowo zmieniamy też kolor kwadratów. Będą się stawały coraz bielsze. Stosując Math.min upewniem się, że wartość pojedynczego kanału nie przekroczy 255.
					// 	kwadrat.r = Math.min(255, kwadrat.r+2);
					// 	kwadrat.g = Math.min(255, kwadrat.g+2);
					// 	kwadrat.b = Math.min(255, kwadrat.b+2);
					// 	//
					// 	V.ctx_bg.fillRect(kwadrat.x-kwadrat.h/2 ,kwadrat.y-kwadrat.h/2, kwadrat.h, kwadrat.h);
					// 	// Jeśli kwadrat jest widoczny wrzuć go do tablicy z widocznymi kwadratami.
					// 	// Sprawdzam dwa czynniki. Położenie oraz kolor (całkiem białe kwadraty są również eliminowane)
					// 	if((kwadrat.x+kwadrat.h/2>0 && kwadrat.x-kwadrat.h/2<V.W && kwadrat.y+kwadrat.h/2>0 && kwadrat.y-kwadrat.h/2<V.H) && (kwadrat.r!=255 || kwadrat.g!=255 || kwadrat.b!=255)){
					// 		// widoczne są wrzucane do tablicy
					// 		this.visible.push(kwadrat)
					// 	}
					// }
					// // Przypisz kopię tablicy „this.visible” do „this.all”. Gdybyśmy nie przypisali kopii tylko oryginalną tablicę, to zmieniając tablicę „visible” zmienialibyśmy również tablicę „this.all” bo te dwie zmienne wskazywałyby na tą samą tablicę.
					// this.all = this.visible.concat();
	

}