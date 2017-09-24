function Rocket(dna) {
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.dna = dna ? dna : new DNA();
	this.fitness = 0;
	this.fitnessNormalized;
	this.hitTarget = false;
	this.timeTaken = null;

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		let d = dist(this.pos.x, this.pos.y, target.x, target.y)
		if (d < 10 && !this.hitTarget) {
			this.hitTarget = true;
			this.pos = target.copy();
			this.timeTaken = count;
		}
		this.checkObstacles();
		this.checkEdges();

		this.applyForce(this.dna.genes[count]);
		if (!this.hitTarget && !this.crashed) {
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.vel.limit(4);
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
		this.fitness = Math.E**map(d, 0, width, 5, 0);
		if (this.hitTarget) {
			this.fitness *= 2000 / this.timeTaken;
		}
		
		if (this.crashed) {
			this.fitness /= 10;
		}
	}

	let checkObstacle = function(rocket, obstacle) {
		return !(
			rocket.pos.x < obstacle.x              ||
			rocket.pos.x > obstacle.x + obstacle.w ||
			rocket.pos.y < obstacle.y              ||
			rocket.pos.y > obstacle.y + obstacle.h
		);		
	}

	this.checkObstacles = function() {
		for (var i = 0; i < obstacles.length; i++) {
			if (checkObstacle(this, obstacles[i])) {
				this.crashed = true;
			}
		}
	}

	this.checkEdges = function() {
		let hitEdge = (
			this.pos.x > width  || 
			this.pos.x < 0      ||
			this.pos.y > height || 
			this.pos.y < 0
		)
		if (hitEdge) {
			this.crashed = true;
		}
	}
}