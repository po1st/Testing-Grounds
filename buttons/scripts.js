const colorCanvas = document.getElementById("color-canvas");
const selectorDot = document.getElementById("selector-dot");
const rInput = document.getElementById("r-input");
const gInput = document.getElementById("g-input");
const bInput = document.getElementById("b-input");
const toggleModeButton = document.getElementById("toggle-mode");
const ctx = colorCanvas.getContext("2d");
let mode = "RGB";

// Draw the color gradient on the canvas
function drawColorCanvas() {
  const width = colorCanvas.width;
  const height = colorCanvas.height;

  // Create a gradient from left to right (color spectrum)
  const gradientX = ctx.createLinearGradient(0, 0, width, 0);
  gradientX.addColorStop(0, "red");
  gradientX.addColorStop(0.17, "yellow");
  gradientX.addColorStop(0.34, "green");
  gradientX.addColorStop(0.51, "cyan");
  gradientX.addColorStop(0.68, "blue");
  gradientX.addColorStop(0.85, "magenta");
  gradientX.addColorStop(1, "red");
  ctx.fillStyle = gradientX;
  ctx.fillRect(0, 0, width, height);

  // Create a gradient from top to bottom (white to black)
  const gradientY = ctx.createLinearGradient(0, 0, 0, height);
  gradientY.addColorStop(0, "white");
  gradientY.addColorStop(1, "black");
  ctx.fillStyle = gradientY;
  ctx.fillRect(0, 0, width, height);
}

// Move the selector dot and get the selected color
let isDragging = false;

colorCanvas.addEventListener("mousedown", (event) => {
  isDragging = true;
  moveDot(event);
  colorCanvas.addEventListener("mousemove", moveDot);
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  colorCanvas.removeEventListener("mousemove", moveDot);
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) moveDot(event);
});

function moveDot(event) {
    const rect = colorCanvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
  
    // Constrain x and y within the canvas boundaries
    x = Math.max(0, Math.min(colorCanvas.width, x));
    y = Math.max(0, Math.min(colorCanvas.height, y));
  
    // Adjust the dot's position to account for its size
    selectorDot.style.left = `${x}px`;
    selectorDot.style.top = `${y}px`;
  
    // Get the color from the canvas
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = imageData;
    rInput.value = r;
    gInput.value = g;
    bInput.value = b;
  }

  // Adjust canvas for high-DPI displays if needed
const scale = window.devicePixelRatio || 1;
colorCanvas.width = 300 * scale;
colorCanvas.height = 200 * scale;
ctx.scale(scale, scale);


toggleModeButton.addEventListener("click", () => {
  if (mode === "RGB") {
    mode = "HSL";
    toggleModeButton.textContent = "RGB";
    // Convert RGB to HSL and update inputs (you can add a conversion function here)
  } else {
    mode = "RGB";
    toggleModeButton.textContent = "HSL";
    // Convert HSL to RGB and update inputs (you can add a conversion function here)
  }
});

// Initial drawing of the color canvas
drawColorCanvas();
