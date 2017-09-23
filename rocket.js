function Rocket(dna) {
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.dna = dna ? dna : new DNA();
	this.fitness = 0;
	this.hitTarget = false;

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		let d = dist(this.pos.x, this.pos.y, target.x, target.y)
		if (d < 10) {
			this.hitTarget = true;
			this.pos = target.copy();
		}

		this.applyForce(this.dna.genes[count]);
		if (!this.hitTarget) {
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);	
		}
	}

	this.show = function() {
		push();
		noStroke();
		fill(255, 150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0, 0, 25, 5);
		pop();
	}

	this.calcFitness = function() {
		let d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = map(d, 0, width, width, 0);
		if (this.hitTarget) {
			this.fitness *= 10;
		}
	}
}