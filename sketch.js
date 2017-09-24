var population;
var lifeP;
var target;
var obstacles = [];
var count     = 0;

var lifespan      = 400;
var popSize       = 50;
var maxForce      = 0.2;
var mutationRate  = 0.01;


function setup() {
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP('Frame Elapsed: ' + count);
  generationP = createP('Generation: ' + population.generationCount);
  target = createVector(width/2, 50);
  obstacles.push(new Obstacle(100, 150, 200, 10));
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

  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }

  ellipse(target.x, target.y, 16, 16)
}