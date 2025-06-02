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
const amplitude = 0.02; 




function animate() {


  if (arret) return;
 
  const progress = (Math.sin(t) + 1) / 2; 
  const point = path.getPointAtLength(progress * pathLength);

   

  draggableWindow.style.transform = `
    translate(
      calc(-50% + ${point.x * amplitude}px),
      calc(-50% + ${point.y * amplitude}px)
    )
  `;
  t += 0.005; 

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
    cancelAnimationFrame(animationId); 
    animationId = null;
  }

    
  offsetX = e.clientX - draggableWindow.offsetLeft;
  offsetY = e.clientY - draggableWindow.offsetTop;
  draggableWindow.style.transition = 'none';
  document.body.style.userSelect = 'none'; 
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
  document.body.style.userSelect = ""; 

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






const screenWidth = window.innerWidth;

let threshold;
if (screenWidth < 600) {
  threshold = 0.1; // sur petits écrans 
} else if (screenWidth < 1024) {
  threshold = 0.5; // tablettes
} else {
  threshold = 0.6; // écrans larges
}


const categorie = document.querySelectorAll(".categorie");
const categorieObserver = new IntersectionObserver(function(entries) {

  for(let i = 0; i < entries.length; i++){
    if(entries[i].isIntersecting && !entries[i].target.classList.contains("has-animated")){

      

      const items = Array.from(entries[i].target.querySelectorAll('li'));

      

      const randomized = items
        .map(item => ({ el: item, delay: Math.random() * 0.5 + 0.1 })) 
        .sort(() => Math.random() - 0.5); 

      randomized.forEach(({ el, delay }) => {
        el.style.animationDelay = `${delay}s`;
        
        el.classList.add("float-in");

        setTimeout(() => {
            el.classList.remove("float-in");
            el.classList.remove('hidden');
            el.style.animationDelay = ""; 
            el.classList.add("gentle-float");
          }, (delay + 0.6) * 1000); 
       
        
      });

      const maxDelay = Math.max(...randomized.map((r) => r.delay));
      
      setTimeout(() => {
          entries[i].target.classList.add("has-animated");
      }, (maxDelay + 0.6) * 1000); 
      
    }
  }
}, { threshold });



for(let i = 0; i < categorie.length; i++) {
  categorieObserver.observe(categorie[i]);
}
