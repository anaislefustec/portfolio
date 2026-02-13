document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid-target");
    const pageTitle = document.querySelector(".sketch-title");
    const pageIntro = document.querySelector(".sketch-intro-text");

    if (typeof projectsData === 'undefined') {
        console.error("Erreur : Variable 'projectsData' introuvable.");
        return;
    }

    // 1. On regarde si l'URL contient un ID (ex: ?id=roold)
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    gridContainer.innerHTML = "";

    // SCÉNARIO A : On affiche le CONTENU d'un projet spécifique (ex: Roold)
    if (projectId && projectsData[projectId]) {
        const currentProject = projectsData[projectId];
        
        // Mise à jour du titre de la page avec le nom du projet
        if(pageTitle) pageTitle.innerText = currentProject.meta.title;
        if(pageIntro) pageIntro.innerText = currentProject.meta.intro_text;

        // On vérifie s'il y a une galerie définie
        if (currentProject.gallery && currentProject.gallery.length > 0) {
            currentProject.gallery.forEach(item => {
                const article = document.createElement("article");
                article.className = "grid-item";

                // Note : Ici le lien est inactif (#) ou peut ouvrir une image en grand (lightbox)
                article.innerHTML = `
                    <div class="grid-image-wrapper">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="grid-infos">
                        <h3>${item.title}</h3>
                        <p class="grid-desc">${item.subtitle}</p>
                    </div>
                `;
                gridContainer.appendChild(article);
            });
        } else {
            gridContainer.innerHTML = "<p>Aucune image dans la galerie de ce projet.</p>";
        }

    } 
    // SCÉNARIO B : Pas d'ID, on affiche la LISTE de tous les projets (Portfolio général)
    else {
        if(pageTitle) pageTitle.innerText = "Expérimentations & Créations";
        
        Object.entries(projectsData).forEach(([id, data]) => {
            // Pour Roold, on veut que le lien mène vers CETTE page grille avec l'ID
            // Pour les autres, on garde le lien vers la page détail classique
            let linkUrl = "projets.html?id=" + id;
            
            // Si c'est le projet "roold" (ou un autre type galerie), on reste sur la page grille
            if (id === "roold") {
                linkUrl = "projets-grid.html?id=" + id;
            }

            const article = document.createElement("article");
            article.className = "grid-item";
            article.innerHTML = `
                <a href="${linkUrl}" style="text-decoration: none; color: inherit;">
                    <div class="grid-image-wrapper">
                        <img src="${data.images.hero}" alt="${data.meta.title}">
                    </div>
                    <div class="grid-infos">
                        <h3>${data.meta.title}</h3>
                        <p class="grid-desc">${data.meta.subtitle || "Voir le projet"}</p>
                    </div>
                </a>
            `;
            gridContainer.appendChild(article);
        });
    }
});