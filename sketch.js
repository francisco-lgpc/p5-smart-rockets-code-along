var population;
var lifespan = 200;

function setup() {
  createCanvas(400, 300);
  population = new Population();
}

function draw() {
  background(0);
  population.run();
}