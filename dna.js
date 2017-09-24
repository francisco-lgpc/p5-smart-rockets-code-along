function DNA(genes) {
	let randomGenes = function() {
		let genes = [];
		for (var i = 0; i < lifespan; i++) {
			genes[i] = p5.Vector.random2D();
			genes[i].setMag(maxForce);
		}
		return genes;
	}

	this.genes = genes ? genes : randomGenes();

	this.crossover = function(partner) {
		let newGenes = [];
		let midPoint = floor(random(this.genes.length));
		for (var i = 0; i < this.genes.length; i++) {
			if (i > midPoint) {
				newGenes[i] = this.genes[i];
			} else {
				newGenes[i] = partner.genes[i];
			}
		}
		return new DNA(newGenes);
	}

	this.mutation = function() {
		for (var i = 0; i < this.genes.length; i++) {
			if (random(1) < mutationRate) {
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(maxForce);
			}
		}
	}
}