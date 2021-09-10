var path,rCar,bCar,wCar
var pathImg,wCarImg,rCarImg,bCarImg
var distance = 0;
var bCarG,rCarG
var end, endImg

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  rCarImg=loadImage("red car.png")
  bCarImg=loadImage("blue car.png")
  wCarImg=loadImage("white car.png")
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(windowWidth/2,windowHeight);
path.addImage(pathImg);
path.velocityY = 15;

end=createSprite(windowWidth/2,windowHeight/2)
end.addImage("Game Over", endImg)
end.visible=false


//creating boy running
wCar = createSprite(windowWidth/2,520,20,20);
wCar.addImage(wCarImg)
wCar.scale=0.12;
  
  

rCarG=new Group();
bCarG=new Group();
wCar.setCollider("rectangle",0,0, 400, 700)


wCar.debug=true
rCarG.debug= true
bCarG.debug= true
}

function draw() {
  
  if(gameState===PLAY){
  background(0);
 distance= distance+ Math.round(frameCount/60)
  if(keyDown(LEFT_ARROW)){
    wCar.x=wCar.x-5
  }
  if(keyDown(RIGHT_ARROW)){
    wCar.x=wCar.x+5
  }
  if(keyDown(UP_ARROW)){
    wCar.y=wCar.y-5
  }
  if(keyDown(DOWN_ARROW)){
    wCar.y=wCar.y+5
  }

  edges= createEdgeSprites();
  if (wCar.isTouching(edges)){
    gameState=END
  }
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createRed();
    createBlue();
    

    if (rCarG.isTouching(wCar)) {
      rCarG.destroyEach();
      gameState=END
    }
    else if (bCarG.isTouching(wCar)) {
      bCarG.destroyEach();
      gameState=END
    }
      
    
}else if(gameState===END){
  text ("Press UP arrow to restart", 500,50)
  bCarG.setVelocityEach(0)
  rCarG.setVelocityEach(0)
  path.setVelocity(0)
  end.visible=true
  if(keyIsDown(UP_ARROW)){
      reset();
}
}
  

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,150,30);

  

}

function createRed() {
  if (World.frameCount % 110 == 0) {
  rCar = createSprite(Math.round(random(50, windowWidth),windowHeight, 10, 10));
  rCar.addImage(rCarImg);
  rCar.scale=0.12;
  rCar.velocityY = 3;
  rCar.lifetime = 170;
  rCarG.add(rCar);
  }
}

function createBlue() {
  if (World.frameCount % 160 == 0) {
  bCar = createSprite(Math.round(random(50, windowWidth),windowHeight, 10, 10));
  bCar.addImage(bCarImg);
  bCar.scale=0.12;
  bCar.velocityY = 3;
  bCar.lifetime = 170;
  bCarG.add(bCar);
  }
}

function reset(){
  gameState=PLAY
  rCarG.destroyEach()
  bCarG.destroyEach()
  distance=0
  gameOver.visible=false
}