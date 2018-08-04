function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	angleMode(DEGREES);
	rectMode(CENTER);
	rocket1 = new rocket(15,30,50,50);
	land1 = new land(windowHeight-windowHeight/2,windowHeight-10,10);
}

function draw() {
	background(255);
	keyPressed();
	rocket1.calcVelocity();
	push();
	rocket1.moveRocket();
	rocket1.showRocket();
	pop();
	land1.showLand();
}
class land {
	constructor(top, bottom, platforms){
			this.gravity = .025;
			this.top = top;
			this.bottom = bottom;
			this.platforms = platforms;
			this.scale = windowWidth/this.platforms+2;
			var points = this.platforms*2;
			this.terrainX = new Array(points);
			this.terrainY = new Array(points);

			this.terrainX[0] = 0;
			this.terrainY[0] = random(top,bottom);
			this.terrainX[points] = windowWidth;
			this.terrainY[points] = random(top,bottom);
			var randX = 0;
			var randX2 = 0;
			var randY = 0;


			for(var i = 1; i <points; i++){
				randX = randX2 + randX + random(rocket1.width,this.scale);
				randX2 = random(rocket1.width,this.scale);
				// print(randX + "    one");
				// print(randX+randX2 + "    two");
				randY = random(this.top,this.bottom);-1
				this.terrainX[i] = randX;
				this.terrainY[i] = randY;
				this.terrainX[i+1] = randX +randX2;
				this.terrainY[i+1] = randY;
				i++;
			}


		}

			showLand(){
				var j =0;
				for(j = 0; j<this.platforms*2; j++){
					strokeWeight(4);
					if(j%2 == 1){
						stroke('rgb(0,255,0)');
					}
					else{
						stroke('#222222');
					}
					line(this.terrainX[j],this.terrainY[j],this.terrainX[j+1],this.terrainY[j+1]);
				}
				line(this.terrainX[j],this.terrainY[j],windowWidth,this.terrainY[0]);


			}


	}

class rocket {

	constructor(width, height, x, y){
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.turnSpeed = 2;
		this.flameSize = 0;
		this.position = [x,y];
		this.velocity = [0,0];
		this.acceleration = [0,0];
		this.engine = .10;
		this.engineOn = false;

	}

	calcVelocity(){
		if(this.engineOn){
			this.velocity[1] = this.velocity[1] + this.engine*cos(this.angle) - land1.gravity; //vertical
			this.velocity[0] = this.velocity[0] + this.engine*sin(this.angle); //horizontal
		} else {
			this.velocity[1] = this.velocity[1] - land1.gravity;


		}
		this.position[0] += this.velocity[0];
		this.position[1] += this.velocity[1];
	}

	moveRocket() {
		translate(this.position[0],-this.position[1]);
	}

	showRocket(){
		stroke('#222222');
		strokeWeight(1);
		translate(this.x,this.y);
		rotate(this.angle);
		rect(0,0,this.width, this.height);
		triangle(this.width-(this.width/2),this.height-(this.height/2),-this.width/2+1,this.height-(this.height/2),0,this.height/2 + this .flameSize);
	}

}

function keyPressed(){
	if(keyIsDown(LEFT_ARROW)){
		rocket1.angle = rocket1.angle -rocket1.turnSpeed;
	}
	if(keyIsDown(RIGHT_ARROW)){
		rocket1.angle = rocket1.angle + rocket1.turnSpeed;
	}
	if(keyIsDown(32)){

		rocket1.engineOn = true;

		rocket1.flameSize = rocket1.flameSize+.75;
		if(rocket1.flameSize>rocket1.height/2){
			rocket1.flameSize = rocket1.height/2 - rocket1.height/8
		}
	}else{
		rocket1.engineOn = false;
		if(rocket1.flameSize>0){
			rocket1.flameSize = rocket1.flameSize - .5;
		}
	}

}
