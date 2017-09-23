function Population() {
	this.rockets = []
	this.popSize = 100;

	for (var i = 0; i < this.popSize; i++) {
		this.rockets[i] = new Rocket();
	}

	this.run = function() {
		for (var i = 0; i < this.popSize; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}
}