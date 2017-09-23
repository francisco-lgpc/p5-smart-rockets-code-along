function Rocket() {
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.dna = new DNA();
	this.count = 0;

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		this.applyForce(this.dna.genes[this.count]);
		this.count++;

		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);	
	}

	this.show =function() {
		push();
		noStroke();
		fill(255, 150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0, 0, 25, 5);
		pop();
	}
}