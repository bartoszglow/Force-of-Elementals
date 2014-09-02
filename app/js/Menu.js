function M(V){

	this.buttons = document.getElementsByClassName("buttons")[0].getElementsByTagName("button");
	this.wavesInfo = document.getElementById("waves").getElementsByTagName("p");

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
	document.getElementById("waves").getElementsByTagName("button")[0].onclick = function(){

		V.timer < 0 ? V.timer=0 : V.timer;
	}

}
M.prototype.fill = function(){
	document.getElementById("money").innerHTML = V.score;
	document.getElementById("lifes").innerHTML = V.lifes;


	//Counter time, info about enemies in waves
	if(V.timer%60==0 && V.timer <= 0){
		this.wavesInfo[0].innerHTML = '(' + -V.timer/60 + ')';

		if(V.timer<0){
			for(var i=0, j=1; i<V.spawn.length; i+=4, j++){	
				this.wavesInfo[j].innerHTML = V.spawn[i] + '.... lvl: ' + V.spawn[i+1];
				
			}
		}
	}
}