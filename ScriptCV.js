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



//Animation apparition et disparition menu
const contenu = document.getElementById("contenu");
const menu = document.getElementById("menu");
const intro = document.getElementById("intro");

var observer = new IntersectionObserver(function(afficher) {
    for (let i = 0; i < afficher.length; i++) {
        if (afficher[i].isIntersecting) {
            menu.classList.add("disappear");
            void menu.offsetWidth;
            menu.classList.remove("appear");
        } else {
            menu.classList.add("appear");
            void menu.offsetWidth;
            menu.classList.remove("disappear");
        }
    }
}, {
    threshold: 0.1
});

observer.observe(intro);




//Animation élément menu actif
const sections = document.querySelectorAll("div.texte");

var observerSection = new IntersectionObserver(function(entries) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            var id = entries[i].target.id;
            var lien = document.querySelectorAll('#menu a');

            for (let j = 0; j < lien.length; j++) {
                lien[j].classList.remove("active");
                lien[j].classList.remove("animate");
            }

            
            var lienActif = document.querySelector('#menu a[href="#' + id + '"]');
            void lienActif.offsetWidth;

            if (lienActif) {
                lienActif.classList.add("active");
                lienActif.classList.add("animate");
            }
            
        }
    }
}, {
    threshold: 0.51
});

for (let i = 0; i < sections.length; i++) {
    observerSection.observe(sections[i]);
}

