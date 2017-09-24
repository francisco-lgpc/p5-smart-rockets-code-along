var population;
var lifespan = 400;
var count    = 0;
var lifeP;
var obstacles = [];
var target;
var maxForce = 0.2;

function setup() {
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP(count);
  generationP = createP(population.generationCount);
  target = createVector(width/2, 50);
  obstacles.push(new Obstacle(100, 150, 200, 10));
  obstacles.push(new Obstacle(100, 150, 200, 10));
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);
  generationP.html(population.generationCount);
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