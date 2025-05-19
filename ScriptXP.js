if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

let arret = false; 

const dragHandle = document.getElementById("dragHandle");
const draggableWindow = document.getElementById("draggableWindow");


const path = document.querySelector("#infiniPath");
const pathLength = path.getTotalLength();

let t = 0.5; // le temps
let animationId = null;
const amplitude = 0.02; // 5% de l’échelle du SVG




function animate() {


  if (arret) return;
  // Sinus pour un mouvement fluide en boucle (périodique)
  const progress = (Math.sin(t) + 1) / 2; 
  const point = path.getPointAtLength(progress * pathLength);

   

  draggableWindow.style.transform = `
    translate(
      calc(-50% + ${point.x * amplitude}px),
      calc(-50% + ${point.y * amplitude}px)
    )
  `;
  t += 0.005; // plus petit = plus lent = plus smooth

  animationId = requestAnimationFrame(animate);
}


if (!arret){
  setTimeout(() => {
  animate();
  }, 2000);
}




let isDragging = false;
let offsetX, offsetY;



dragHandle.addEventListener("mousedown", (e) => {
  isDragging = true;
  arret = true;

  if (animationId) {
    cancelAnimationFrame(animationId); // on arrête l'animation proprement
    animationId = null;
  }

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
  arret = false;
  document.body.style.userSelect = ""; // rétablir la sélection de texte

  if (!animationId) {
    setTimeout(() => {
      if (!arret) {
        animate();
       }
    }, 2000); 
   }

});



const startButton = document.getElementById("startButton");
const intro = document.querySelector(".intro");

startButton.addEventListener("click", () => {
  intro.classList.add("slide-out");

  intro.addEventListener('transitionend', () => {
    document.body.classList.remove('no-scroll');
    document.body.classList.add('revealed');
    
  }, { once: true });
});