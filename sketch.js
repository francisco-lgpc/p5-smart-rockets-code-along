var population;
var lifespan = 200;
var count    = 0;
var lifeP;

function setup() {
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP(count);
}

function draw() {
  background(0);
  population.run();

  lifeP.html(count);
  count++;
}