const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;


var engine, world;
var santa, santaSprite, santaAnimation;
var k=0;
var backgroundImg;
var land1, land2;

var woods = [];

function preload(){
	santaAnimation = loadAnimation("images/tile000.png", "images/tile001.png", "images/tile002.png", "images/tile003.png",
  "images/tile004.png","images/tile005.png", "images/tile006.png", "images/tile007.png", "images/tile008.png", "images/tile009.png",
  "images/tile010.png", "images/tile011.png", "images/tile012.png", "images/tile013.png", "images/tile014.png", "images/tile015.png");
   

}

function setup(){
	createCanvas(windowWidth,windowHeight);

	engine = Engine.create();
	world = engine.world;

	for (var j = 280;  j<width-250; j = j+180){
		woods.push(new Wood(j,height/2));
	}

	santa = new Santa(20,300,40,50);
	santaSprite = createSprite(20,300,40,50);
	santaSprite.addAnimation("santa",santaAnimation);

	land1 = new Land(100,height/2-20);
	land2 = new Land(width-100,height/2-20);

	
}

function draw(){
	background(0);
	
	Engine.update(engine);

	
	
	for(var i = 0; i<woods.length; i++){
		woods[i].display();
	}


	if (frameCount%80 === 0){
		Matter.Body.setStatic(woods[k].body,false);
		k=k+1;
	}

	santaSprite.x = santa.body.position.x;
	santaSprite.y = santa.body.position.y;

	land1.display();
	land2.display();

	if(santa.body.position.y>height){
		textSize(25);
		fill("yellow");
		text("GAME OVER",width/2,height/2);
	}

	if(santa.body.position.x>width-250 && santa.body.position.y<height){
		textSize(25);
		fill("yellow");
		text("YOU WIN",width/2,height/2);
	}
	 
	drawSprites();
	
	
}

function keyPressed(){
	if(keyCode === RIGHT_ARROW){
		santa.body.position.x = santa.body.position.x+5;
	}

	if(keyCode === 32){
		santa.body.position.y = santa.body.position.y-5 ;
	}
}

