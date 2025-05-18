const dragHandle = document.getElementById("dragHandle");
const draggableWindow = document.getElementById("draggableWindow");

const path = document.querySelector("#infiniPath");

const pathLength = path.getTotalLength();

let progress = 0;
let speed = 0.001;

function animate() {
    const point = path.getPointAtLength(progress * pathLength);
    draggableWindow.style.transform = `translate(calc(-50% + ${point.x}px), calc(-50% + ${point.y}px))`;

    progress += speed;
    if (progress > 1) progress = 0;

    requestAnimationFrame(animate);
  }

animate();



let isDragging = false;
let offsetX, offsetY;

draggableWindow.classList.add('flotter');

dragHandle.addEventListener("mousedown", (e) => {
  isDragging = true;

  draggableWindow.classList.remove('flotter');

    // Calculer la position du curseur par rapport à la fenêtre
  offsetX = e.clientX - draggableWindow.offsetLeft;
  offsetY = e.clientY - draggableWindow.offsetTop;
  draggableWindow.style.transition = 'none';
  document.body.style.userSelect = 'none'; // éviter la sélection de texte
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    draggableWindow.style.left = `${x}px`;
    draggableWindow.style.top = `${y}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = ""; // rétablir la sélection de texte
});

