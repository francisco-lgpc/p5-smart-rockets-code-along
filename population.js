function Population() {
	this.rockets = []
	this.popSize = 100;
	this.matingPool = [];
	this.generationCount = 1;
	this.maxFitGlobal = { fit: 0, generation: 0};

	for (var i = 0; i < this.popSize; i++) {
		this.rockets[i] = new Rocket();
	}

	this.run = function() {
		for (var i = 0; i < this.popSize; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}

	this.evaluate = function() {
		let maxFit = 0;
		for (var i = 0; i < this.popSize; i++) {
			this.rockets[i].calcFitness();
			if (this.rockets[i].fitness > maxFit) {
				maxFit = this.rockets[i].fitness;
			}
		}

		if (maxFit > this.maxFitGlobal.fit) {
			this.maxFitGlobal.fit        = maxFit;
			this.maxFitGlobal.generation = this.generationCount;
		}

		maxFitP.html(
			'Max Fitness: ' + round(this.maxFitGlobal.fit).toString() + 
			' Generation: '  + this.maxFitGlobal.generation.toString()
		)

		for (var i = 0; i < this.popSize; i++) {
			this.rockets[i].fitnessNormalized = this.rockets[i].fitness / maxFit;
		}

		this.matingPool = [];
		for (var i = 0; i < this.popSize; i++) {
			let n = this.rockets[i].fitnessNormalized * 100;
			if (n > 0.3) {
				for (var j = 0; j < 1.1**n; j++) {
					this.matingPool.push(this.rockets[i]);
				}
			}
		}
	}

	this.selection = function() {
		newRockets = [];

		for (var i = 0; i < this.rockets.length; i++) {
			let parentA  = random(this.matingPool).dna;
			let parentB  = random(this.matingPool).dna;
			let childDNA = parentA.crossover(parentB);
			childDNA.mutation();
			newRockets[i] = new Rocket(childDNA);
		}
		this.rockets = newRockets;
		this.generationCount++;
	}
}