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

const observer = new IntersectionObserver(function(afficher) {
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
const animTransi = document.querySelector("div.indicateur");
const conteneurMenu = document.querySelector(".conteneur-menu");
console.log("Sections observées :", sections);
let currentActiveLink = null;

const seuil = window.innerHeight < 800 ? 0.5 : 0.2;

const observerSection = new IntersectionObserver(function(entries) {


    const sectionsVisibles = [];

    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            
           /*const distanceFromTop = entries[i].boundingClientRect.top;
            if (distanceFromTop >= 0 && distanceFromTop < top) {
                top = distanceFromTop;
                targetLink = entries[i].target;
            }*/
           sectionsVisibles.push(entries[i]);

        }
    }

    sectionsVisibles.sort(function(a ,b) {
        return a.boundingClientRect.top - b.boundingClientRect.top;
    });

    if (sectionsVisibles.length > 0) {

        const targetLink = sectionsVisibles[0].target;

        const id = targetLink.id;

        if (id === currentActiveLink) {
            return;
        }


        currentActiveLink = id;

        // On enlève la classe active de tous les liens
        const liens = document.querySelectorAll('#menu a')

        for (let j = 0; j < liens.length; j++) {
                liens[j].classList.remove("active");
        }


        const lienActif = document.querySelector('#menu a[href="#' + id + '"]');
        

        if (lienActif) {
            
            lienActif.classList.add("active");
                
                
            const posLien = lienActif.getBoundingClientRect();
            const posMenu = conteneurMenu.getBoundingClientRect();

            const relativeTop = posLien.top - posMenu.top;
            const relativeLeft = posLien.left - posMenu.left;
                

            animTransi.style.width = posLien.width + "px";
            animTransi.style.height = posLien.height + "px";

            animTransi.classList.add("etirement");

            animTransi.style.top = relativeTop + "px";
            animTransi.style.left = relativeLeft + "px";
                
                
            setTimeout(function(){
                animTransi.classList.remove("etirement");
            }, 300);
        }
            
        
    }
}, {
    threshold: seuil
});

for (let i = 0; i < sections.length; i++) {
    observerSection.observe(sections[i]);
}