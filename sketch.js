//Dawsen Richins
//8/5/2018
//lunar lander game where you have a certain amount of gas and must land on green platforms softly
//game is not finished as you can still go off the map and through the mountain sides



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
	push();
	rocket1.detectCollision();
	if(!rocket1.landed){
	rocket1.calcVelocity();
	rocket1.moveRocket();
}

	rocket1.showRocket();
	pop();
	land1.showLand();
	rocket1.drawFuel();
}

//land object that creates a randomly generated terrainX
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
				randY = random(this.top,this.bottom);-1
				this.terrainX[i] = randX;
				this.terrainY[i] = randY;
				this.terrainX[i+1] = randX +randX2;
				this.terrainY[i+1] = randY;
				i++;
			}


		}
			//function for displaying the land and making the platforms green and the mountain side black
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

//rocket class that controls many attributes of the rocket
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
		this.engineOn = false
		this.landed = false;
		this.crashed = false;
		this.fuel = 100;

	}

//calculates the velocity of the rocket which in this program correlates to where the rocket is drawn
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

	consumeFuel(){
		this.fuel = this.fuel-.4;
	}
	drawFuel(){
		fill('rgb(0,0,0)');
		stroke('rgb(0,0,0)');
		rect(windowWidth-windowWidth/10,110,20,100);
		fill('rgb(255,255,255)');
		if(this.fuel>=0){
			rect(windowWidth-windowWidth/10,110-this.fuel/2,20,100-this.fuel);
		}else{
			rect(windowWidth-windowWidth/10,110,20,100);
		}

	}

	showRocket(){
		if(this.crashed){
			fill('rgb(255,0,0)');
			stroke('rgb(255,0,0)');
		}else if (this.landed){
			fill('rgb(0,255,0)');
			stroke('rgb(0,255,0)');

		}
		else{
			stroke('#222222');
		}
		strokeWeight(1);
		translate(this.x,this.y);
		rotate(this.angle);
		rect(0,0,this.width, this.height);
		triangle(this.width-(this.width/2),this.height-(this.height/2),-this.width/2+1,this.height-(this.height/2),0,this.height/2 + this .flameSize);
	}

//only detects collision with green markers at this point but will be changed in the future
//to incorporate mountainside terrain
	detectCollision(){
		for(var i = 1;i<=land1.platforms*2;i++){
			if(this.position[0]+50>=land1.terrainX[i] && this.position[0]+50 <= land1.terrainX[i+1] && abs(this.position[1]-50 -rocket1.height/2) >= land1.terrainY[i]){

					this.landed = true;
					translate(this.position[0],-this.position[1]);
					if(abs(this.velocity[0])>.6 || abs(this.velocity[1])>.6){
						this.crashed = true;
					}

				//print(abs(this.position[1])+ "   " + land1.terrainY[i]);
				//print(this.position[0] + "  " + land1.terrainX[i] + "  " + land1.terrainX[i+1]);
			}
			i++ ;
		}
	}

}

function keyPressed(){
	if(keyIsDown(LEFT_ARROW)){
		rocket1.angle = rocket1.angle -rocket1.turnSpeed;
	}
	if(keyIsDown(RIGHT_ARROW)){
		rocket1.angle = rocket1.angle + rocket1.turnSpeed;
	}
	if(keyIsDown(32) && rocket1.fuel>0){
		rocket1.consumeFuel();
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
