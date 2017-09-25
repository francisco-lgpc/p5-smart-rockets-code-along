let population;
let lifeP;
let target;
let obstacles = [];
let count     = 0;
let newObstacle;

const targetSize    = 16;
const lifespan      = 400;
const popSize       = 50;
const maxForce      = 0.2;
const mutationRate  = 0.01;



function setup() {
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP('Frame Elapsed: ' + count);
  generationP = createP('Generation: ' + population.generationCount);
  target = createVector(width/2, 50);
  //obstacles.push(new Obstacle(100, 150, 200, 10));
  maxFitP = createP('')
}

function draw() {
  background(0);
  population.run();
  lifeP.html('Frame Elapsed: ' + count);
  generationP.html('Generation: ' + population.generationCount);
  count++;

  if (count === lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].show(mouseX, mouseY);
  }

  ellipse(target.x, target.y, targetSize, targetSize)

  if (newObstacle) {
    rect(newObstacle.x, newObstacle.y, newObstacle.w, newObstacle.h)
  }
}

function mousePressed() {
  newObstacle = new Obstacle(mouseX, mouseY, 0, 0)
  for (var i = obstacles.length - 1; i >= 0; i--) {
    let clikedObstacle = !(
      mouseX < obstacles[i].x                  ||
      mouseX > obstacles[i].x + obstacles[i].w ||
      mouseY < obstacles[i].y                  ||
      mouseY > obstacles[i].y + obstacles[i].h
    )

    if (clikedObstacle) {
      obstacles.splice(i, 1);
    }  
  }
}

function mouseDragged() {
  newObstacle.w = mouseX - newObstacle.x;
  newObstacle.h = mouseY - newObstacle.y;
  // prevent default
  return false;
}

function mouseReleased() {
  obstacles.push(newObstacle);
  newObstacle = null;
}