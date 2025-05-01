const nom = "Bastien Goumy";
let index = 0;
const anim = document.getElementById("nomEcriture");
        
function ecrire() {
    if (index < nom.length) {
        anim.textContent += nom.charAt(index);
        index++;
        setTimeout(ecrire, 150);
    } else {
        setTimeout(clignoterCurseur, 500);
    }
}

function clignoterCurseur() {
    anim.style.animation = "blink 0.8s step-start infinite"; 
}

ecrire();

const contenu = document.getElementById("contenu");
const menu = document.getElementById("menu");


var observer = new IntersectionObserver(function(afficher) {
    for (let i = 0; i < afficher.length; i++) {
        if (afficher[i].isIntersecting) {
            menu.classList.remove("hidden");
        } else {
            menu.classList.add("hidden");
        }
    }
}, {
    threshold: 0.7
});



observer.observe(contenu);