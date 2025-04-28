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