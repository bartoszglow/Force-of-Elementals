function M(V){

	this.buttons = document.getElementsByClassName("buttons")[0].getElementsByTagName("button");

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

}
M.prototype.fill = function(){
	document.getElementById("money").innerHTML = V.score;
	document.getElementById("lifes").innerHTML = V.lifes;



}