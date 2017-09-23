function Obstacle(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.show = function() {
		rect(x, y, w, h);
	}
}
