var population;
var lifespan = 200;
var count    = 0;
var lifeP;

function setup() {
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP(count);
  target = createVector(width/2, 50);
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);
  count++;

  if (count == lifespan) {
    population = new Population();
    count = 0;
  }

  ellipse(target.x, target.y, 16, 16)
}