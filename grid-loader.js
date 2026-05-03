document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid-target");
    const pageTitle = document.querySelector(".sketch-title");
    const pageIntro = document.querySelector(".sketch-intro-text");

    if (typeof projectsData === 'undefined') {
        console.error("Erreur : Variable 'projectsData' introuvable.");
        return;
    }

    // --- LIGHTBOX ---
    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    const lightboxImg = document.createElement("img");
    lightboxImg.alt = "";

    const closeBtn = document.createElement("button");
    closeBtn.className = "lightbox-close";
    closeBtn.innerHTML = "&times;";
    closeBtn.setAttribute("aria-label", "Fermer");

    overlay.appendChild(closeBtn);
    overlay.appendChild(lightboxImg);
    document.body.appendChild(overlay);

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || "";
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
    });

    // --- CHARGEMENT DE LA GRILLE ---

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

                // Normalise : item.images (tableau) ou item.image (string)
                const imgList = item.images
                    ? item.images
                    : (item.image ? [item.image] : []);

                // Construit le bloc image(s)
                let imageBlock;
                if (imgList.length > 1) {
                    // Plusieurs images → groupe côte à côte
                    imageBlock = document.createElement("div");
                    imageBlock.className = `grid-images-group count-${Math.min(imgList.length, 3)}`;

                    imgList.slice(0, 3).forEach((src) => {
                        const wrapper = document.createElement("div");
                        wrapper.className = "grid-image-wrapper";
                        const img = document.createElement("img");
                        img.src = src;
                        img.alt = item.title;
                        wrapper.appendChild(img);
                        wrapper.addEventListener("click", () => openLightbox(img.src, img.alt));
                        imageBlock.appendChild(wrapper);
                    });
                } else {
                    // Image unique
                    imageBlock = document.createElement("div");
                    imageBlock.className = "grid-image-wrapper";
                    const img = document.createElement("img");
                    img.src = imgList[0] || "";
                    img.alt = item.title;
                    imageBlock.appendChild(img);
                    imageBlock.addEventListener("click", () => openLightbox(img.src, img.alt));
                }

                const infos = document.createElement("div");
                infos.className = "grid-infos";
                infos.innerHTML = `<h3>${item.title}</h3><p class="grid-desc">${item.subtitle}</p>`;
                
                const linkHtml = item.link ? '<a class="grid-link" href="' + item.link + '" target="_blank" rel="noopener noreferrer">↗ Voir le projet</a>' : "";
                infos.innerHTML = "<h3>" + item.title + "</h3><p class=\"grid-desc\">" + item.subtitle + "</p>" + linkHtml;

                article.appendChild(imageBlock);
                article.appendChild(infos);
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
            let linkUrl = "projets.html?id=" + id;
            
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

            // Zoom au clic sur l'image (empêche la navigation, juste pour le zoom)
            const wrapper = article.querySelector(".grid-image-wrapper");
            const img = wrapper.querySelector("img");
            wrapper.addEventListener("click", (e) => {
                e.preventDefault();
                openLightbox(img.src, img.alt);
            });

            gridContainer.appendChild(article);
        });
    }
});
