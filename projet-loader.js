document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Récupérer l'ID du projet dans l'URL (ex: ?id=heol)
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // 2. Vérifier si le projet existe dans notre base de données
    if (!projectId || !projectsData[projectId]) {
        // Si pas de projet trouvé, redirection vers l'accueil ou message d'erreur
        document.querySelector('.sketch-layout').innerHTML = "<h1>Projet introuvable... <a href='index.html'>Retour</a></h1>";
        return;
    }

    // 3. Charger les données du projet
    const data = projectsData[projectId];

    // --- REMPLISSAGE DU HEADER & INTRO ---
    document.title = `Projet ${data.meta.title} - Anaïs`;
    document.getElementById('p-date').textContent = data.meta.date;
    document.getElementById('p-title').textContent = data.meta.title;
    document.getElementById('p-subtitle').textContent = data.meta.subtitle;
    document.getElementById('p-intro-text').textContent = data.meta.intro_text;
    
    // Images Intro
// NOUVEAU CODE : Gestion Vidéo ou Image
    const heroContainer = document.querySelector('.intro-visual-main');
    const heroSrc = data.images.hero;
    
    // On nettoie le conteneur (pour enlever l'ancienne image par défaut)
    heroContainer.innerHTML = '';

    // On vérifie si c'est une vidéo (extension .mov ou .mp4)
    if (heroSrc.endsWith('.mov') || heroSrc.endsWith('.mp4')) {
        // Création de la balise vidéo
        const video = document.createElement('video');
        video.src = heroSrc;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;      // Obligatoire pour l'autoplay sur navigateurs modernes
        video.playsInline = true; // Pour bien marcher sur mobile
        
        // On applique le style pour que ça ressemble exactement à vos images
        video.style.width = "100%";
        video.style.height = "500px"; // Hauteur fixe comme défini dans votre CSS
        video.style.objectFit = "cover";
        video.style.borderRadius = "15px";
        video.style.border = "none";
        video.style.boxShadow = "10px 10px 20px rgba(0,0,0,0.1)";
        
        heroContainer.appendChild(video);
    } else {
        // Sinon, on crée une image classique
        const img = document.createElement('img');
        img.id = 'p-hero-img';
        img.src = heroSrc;
        img.alt = 'Hero Visual';
        heroContainer.appendChild(img);
    }

    document.getElementById('p-intro-small-img').src = data.images.intro_small;    document.getElementById('p-intro-small-img').src = data.images.intro_small;

    // --- DESCRIPTION & VISUEL PRINCIPAL ---
    document.getElementById('p-description').innerHTML = data.content.description; // innerHTML pour garder les <br>
    document.getElementById('p-main-visual').src = data.images.main_visual;

    // Palette (Boucle sur les logos)
    const paletteContainer = document.getElementById('p-palette-container');
    data.images.palette.forEach(imgSrc => {
        const div = document.createElement('div');
        div.className = 'color-swatch';
        div.innerHTML = `<img src="${imgSrc}" alt="Outil">`;
        paletteContainer.appendChild(div);
    });

    // --- ÉTAPES (STEPS) ---
    const stepsContainer = document.getElementById('p-steps-container');
    stepsContainer.innerHTML = ""; 

    data.content.steps.forEach(step => {
        const stepHTML = `
            <div class="step-card" style="background-image: url('${step.img}');">
                <div class="step-content">
                    <h3>${step.title}</h3>
                    <p>${step.desc}</p>
                </div>
            </div>
        `;
        stepsContainer.innerHTML += stepHTML;
    });

    // --- SKILLS ---
    const softList = document.getElementById('p-soft-skills');
    data.content.soft_skills.forEach(skill => {
        softList.innerHTML += `<li>${skill}</li>`;
    });

    const hardList = document.getElementById('p-hard-skills');
    data.content.hard_skills.forEach(skill => {
        hardList.innerHTML += `<li>${skill}</li>`;
    });

    // --- RÉSULTATS (GRID) ---
    const resultsGrid = document.getElementById('p-results-grid');
    data.results.forEach(res => {
        const resHTML = `
            <div class="res-item ${res.type}">
                <img src="${res.src}" alt="Résultat projet">
            </div>
        `;
        resultsGrid.innerHTML += resHTML;
    });

    // --- LIEN SUIVANT ---
    document.getElementById('p-next-name').textContent = data.next_project.name;
    document.getElementById('p-next-link').href = data.next_project.link;

    console.log(`Projet ${projectId} chargé avec succès ! 🚀`);
});