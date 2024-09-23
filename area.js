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
  constructor(x, y, width, height, onClick, image = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.onClick = onClick;
    this.isHovered = false;
    this.image = image; // Store the image
  }

    /**
   * Draws the clickable area on the canvas.
   * If the area is hovered, it draws a glowing rectangle.
   */
  draw() {
    if (this.isHovered && this.image) {
      // Calculate the zoomed-in size
      const zoomFactor = 2; // Adjust zoom factor as needed
      const zoomedWidth = this.width * zoomFactor;
      const zoomedHeight = this.height * zoomFactor;

      // Draw the zoomed-in rectangle of the image with a glow effect
      push(); // Save the current drawing state
      noFill();
      stroke(255, 204, 0, 150); // Glow color
      strokeWeight(10); // Glow thickness
      rect(this.x - (zoomedWidth - this.width) / 2, this.y - (zoomedHeight - this.height) / 2, zoomedWidth, zoomedHeight, 10); // Rounded corners
      pop(); // Restore the previous drawing state

      // Draw the zoomed-in image
      image(this.image, this.x - (zoomedWidth - this.width) / 2, this.y - (zoomedHeight - this.height) / 2, zoomedWidth, zoomedHeight, 
            this.x, this.y, this.width, this.height);
  } else if (this.isHovered) {
      // Draw the default rectangle with a slight scale effect
      push(); // Save the current drawing state
      fill(225, 225, 225, 127);
      noStroke();
      rect(this.x, this.y, this.width, this.height, 10); // Rounded corners
      pop(); // Restore the previous drawing state
  } else {
      noFill();
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