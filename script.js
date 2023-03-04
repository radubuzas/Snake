/*Script*/

const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");

let ground = new Image();
ground.src = "ground.png";

const box = 32;

let headColor = '#0066cc';
let headOutline = 'black';

let bodyColor = 'white';
let bodyOutline = 'black';

var snk_x = [];
var snk_y = [];

snk_x[0] = 5 * box;
snk_y[0] = 10 * box;

var apple_x = 11 * box;
var apple_y = 10 * box;

var dx = 0;
var dy = 0;

var fin = false;
let cnt = 0;
let cd = 0;

var score = 0;

function draw()
{	
	if (fin == true && cnt == 0) {alert('GAME OVER!'); cnt++}

	ctx.drawImage(ground,0,0); //harta

	function apple_position(){//17x15
		apple_x = box + Math.floor(Math.random() * 17)*box;
		apple_y = 3*box + Math.floor(Math.random() * 15)*box;
	}

	if (snk_x[0] == apple_x && snk_y[0] == apple_y) {//gasire mar
		score++;
		console.log(score);
		apple_position();
	}
	else{
		ctx.fillStyle = 'red';
		ctx.fillRect(apple_x, apple_y, box, box);}

	for(var i=score+1; i > 0; i--){
		snk_x[i] = snk_x[i-1];
		snk_y[i] = snk_y[i-1];
		ctx.fillStyle = bodyColor;// desenare corp
		ctx.fillRect(snk_x[i], snk_y[i], box, box);
		ctx.fillStyle = bodyOutline;
		ctx.strokeRect(snk_x[i], snk_y[i], box, box);
		if(apple_x == snk_x[i] && apple_y == snk_y[i]){
			apple_position();
			console.log('Spawn corect');
		}
		if(snk_x[i] == snk_x[0] && snk_y[i] == snk_y[0] && i != 1){
			fin = true;
		}
	}

	ctx.fillStyle = headColor;// desenare cap
	ctx.fillRect(snk_x[0], snk_y[0], box, box);
	ctx.fillStyle = headOutline;
	ctx.strokeRect(snk_x[0], snk_y[0], box, box);

	document.onkeydown = checkKey;

	function checkKey(e) { // directii

		    e = e || window.event;

		    if (e.keyCode == '38' && dy != -1 && cd == 0) {
		        // up arrow
		        dy = 1;
		        dx = 0;
		        cd++;
		    }
		    else if (e.keyCode == '40' && dy != 1 && cd == 0) {
		        // down arrow
		        dy = -1;
		        dx = 0;
		        cd++;
		    }
		    else if (e.keyCode == '37' && dx != 1 && cd == 0) {
		       	// left arrow
		       	dx = -1;
		       	dy = 0;
		       	cd++;
		    }
		    else if (e.keyCode == '39' && dx != -1 && cd == 0) {
		       // right arrow
		       dx = 1;
		       dy = 0;
		       cd++;
	    	}

	}

	//oprire
	if (snk_x[0] == 17 * box && dx == 1) {
		fin = true;
	}
	else if (snk_x[0] == box && dx == -1) {
		fin = true;
	}
	else if (snk_y[0] == 3 * box && dy == 1) {
		fin = true;
	}
	else if (snk_y[0] == 17 * box && dy == -1) {
		fin = true;
	}
	else if (fin == false){
		snk_x[0] += dx * box;
		snk_y[0] -= dy * box;
		cd = 0;
	}

}

let game = setInterval(draw,100);

