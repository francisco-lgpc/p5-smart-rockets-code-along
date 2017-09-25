function Obstacle(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.show = function(mouseX, mouseY) {
    push()

    let offset = 0.01; // avoids immediate hover state upon creation.
    let hoveredObstacle = !(
      mouseX < this.x + offset          ||
      mouseX > this.x + this.w - offset ||
      mouseY < this.y + offset          ||
      mouseY > this.y + this.h - offset
    )
    let rectColor  = hoveredObstacle ? color(255, 0, 0)    : color(255);
    let deleteText = hoveredObstacle ? '[Click to Delete]' : '';

    fill(rectColor)
		rect(this.x, this.y, this.w, this.h);

  	fill(255)
  	textStyle(BOLD)
    text(deleteText, this.x + (this.w - textWidth(deleteText))/ 2, this.y + this.h / 2 + 3)

		pop()
	}
}
