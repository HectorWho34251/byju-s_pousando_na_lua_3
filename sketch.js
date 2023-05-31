var bg_img, lander_img;
var lander, ground, thrust, leftThrust, rightThrust, crash;
var g = 0.05;
var vx = 0;
var vy = 0;
var fuel = 100;

function preload() {
 bg_img = loadImage("assets/misc/bg_sur.png");
 lander_img = loadImage("assets/nave/normal.png");
 thrust = loadAnimation("assets/nave/b_thrust_1.png", "assets/nave/b_thrust_2.png", "assets/nave/b_thrust_3.png");
 leftThrust = loadAnimation("assets/nave/left_thruster_1.png", "assets/nave/left_thruster_2.png");
 rightThrust = loadAnimation("assets/nave/right_thruster_1.png", "assets/nave/right_thruster_2.png");
 crash = loadAnimation("assets/nave/crash1.png", "assets/nave/crash2.png", "assets/nave/crash3.png");

 thrust.playing = true;
 thrust.looping = false;
 leftThrust.looping = false;
 rightThrust.looping = false;
}

function setup() {
  createCanvas(1000, 700);

  frameRate(80);

  timer = 1500;

  thrust.frameDelay = 5;
  leftThrust.frameDelay = 5;
  rightThrust.frameDelay = 5;

  //criando o personagem
  lander = createSprite(100, 50, 30, 30);
  lander.addImage(lander_img);
  lander.scale = 0.2;
  lander.setCollider("rectangle", 0, 0, 200, 200);

  //adicionando as animações
  lander.addAnimation("thrusting", thrust);
  lander.addAnimation("left", leftThrust);
  lander.addAnimation("right", rightThrust);
  lander.addAnimation("normal", lander_img);

  //adicionando o solo
  ground = createSprite(500, 690, 1000, 30);

  rectMode(CENTER);
  textSize(15);

}

function draw() {
  background(51);
  image(bg_img, 0, 0);

  //configurações do texto
  push();
  fill(255);
  text("Velocidade Vertical: "+round(vy), 800, 75);
  text("Combustível: "+fuel, 800, 25);
  text("Velocidade Horizontal: "+round(vx, 2), 800, 50);
  pop();

  //descida
  vy += g;
  lander.position.y += vy;
  lander.position.x += vx;

  drawSprites();
}

function keyPressed() {
  if(keyCode == UP_ARROW && fuel>0) {
    //impulso para cima
    upwardThrust();
    lander.changeAnimation("thrusting");
    thrust.nextFrame();
  }
  if(keyCode == RIGHT_ARROW && fuel>0) {
    //impulso para direita
    rightThrusting();
    lander.changeAnimation("right");
  }
  if(keyCode == LEFT_ARROW && fuel>0) {
    //impulso para direita
    lander.changeAnimation("left");
    leftThrusting();
  }
}


function upwardThrust() {
  vy = -1;
  fuel -= 1;
}

function rightThrusting() {
  vx += 0.2;
  fuel -= 1;
}

function leftThrusting() {
  vx -= 0.2;
  fuel -= 1;
}