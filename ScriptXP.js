window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".demarrage").classList.add("hidden");
        document.querySelector("main").classList.add("visible");
    }, 4000);
});


/*function openWindow(id) {
  const windowEl = document.getElementById(id);
  if (windowEl) {
    windowEl.hidden = false;
    windowEl.style.zIndex = 1000; // ou plus si plusieurs fenêtres ouvertes
  }
}

function closeWindow(id) {
  const windowEl = document.getElementById(id);
  if (windowEl) {
    windowEl.hidden = true;
  }
}*/
