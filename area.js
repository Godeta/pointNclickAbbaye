/**
 * Represents a clickable area on the canvas.
 * The area can respond to mouse hover and click events.
 */
class ClickableArea {
      /**
   * Creates an instance of ClickableArea.
   * @param {number} x - The x-coordinate of the top-left corner of the area.
   * @param {number} y - The y-coordinate of the top-left corner of the area.
   * @param {number} width - The width of the area.
   * @param {number} height - The height of the area.
   * @param {function} onClick - The function to call when the area is clicked.
   */
  constructor(x, y, width, height, onClick) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.onClick = onClick;
    this.isHovered = false;
  }

    /**
   * Draws the clickable area on the canvas.
   * If the area is hovered, it draws a glowing rectangle.
   */
  draw() {
    if (this.isHovered) {
      fill(225, 225, 225, 127);
      noStroke()
      rect(this.x, this.y, this.width, this.height);
      noFill()
    }
    else{
        noFill()
    }
  }

    /**
   * Checks if the mouse is currently over the clickable area.
   * Updates the isHovered property accordingly.
   */
  checkHover() {
    const isMouseOver = mouseX > this.x && mouseX < this.x + this.width &&
                        mouseY > this.y && mouseY < this.y + this.height;
    this.isHovered = isMouseOver;
  }

    /**
   * Handles the click event for the clickable area.
   * Calls the onClick function if the area is hovered.
   */
  handleClick() {
    if (this.isHovered) {
      this.onClick();
    }
  }
}