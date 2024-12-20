(function () {
  const doc = document
  const rootEl = doc.documentElement
  const body = doc.body
  const lightSwitch = doc.getElementById('lights-toggle')
  /* global ScrollReveal */
  const sr = window.sr = ScrollReveal()

  rootEl.classList.remove('no-js')
  rootEl.classList.add('js')

  window.addEventListener('load', function () {
    body.classList.add('is-loaded')
  })

  // Reveal animations
  function revealAnimations () {
    sr.reveal('.feature', {
      duration: 600,
      distance: '20px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      origin: 'right',
      viewFactor: 0.2
    })
  }

  if (body.classList.contains('has-animations')) {
    window.addEventListener('load', revealAnimations)
  }

  // Light switcher
  if (lightSwitch) {
    window.addEventListener('load', checkLights)
    lightSwitch.addEventListener('change', checkLights)
  }

  function checkLights () {
    let labelText = lightSwitch.parentNode.querySelector('.label-text')
    if (lightSwitch.checked) {
      body.classList.remove('lights-off')
      if (labelText) {
        labelText.innerHTML = 'dark'
      }
    } else {
      body.classList.add('lights-off')
      if (labelText) {
        labelText.innerHTML = 'light'
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    console.log("Le DOM est prêt !");
    const openDialogButton = document.querySelectorAll(".open-dialog");
    const closeDialogButton = document.getElementById("close-dialog");
    const dialog = document.getElementById("email-dialog");

    // Ouvrir le dialogue
    openDialogButton.forEach((button) => {
      button.addEventListener("click", () => {
        console.log("Ouverture du dialogue");
        dialog.showModal();
      });
    });

    // Fermer le dialogue
    closeDialogButton.addEventListener("click", () => {
        dialog.close();
    });

    // Fermer la modale si l'utilisateur clique en dehors de la fenêtre de la modale
    dialog.addEventListener("click", function(event) {
      if (event.target === dialog) { // Vérifier si l'utilisateur a cliqué en dehors du contenu de la modale
          dialog.close();
      }
    });

    // Gérer la soumission du formulaire
    const emailForm = document.getElementById("email-form");
    emailForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
    
        fetch('http://localhost:3000/api/save-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Réponse du serveur :", data);
            dialog.close(); // Fermer le dialogue après envoi
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi de l'email :", error);
        });
    });

    const fadeInElements = document.querySelectorAll('.fadein-left');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    });

    fadeInElements.forEach(el => observer.observe(el));
});

}())
