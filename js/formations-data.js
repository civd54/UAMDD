// Données complètes des formations UAMDD
const UAMDD_FORMATIONS = [
    // DOMAINE FINANCE (6 formations)
    {
        id: 1,
        titre: "Finance Verte : Maîtriser les Enjeux de la Finance Durable et des Investissements ESG",
        domaine: "finance",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Former des experts capables de comprendre et appliquer les principes de la finance durable et des investissements ESG.",
        popularite: 95,
        certifiant: true
    },
    {
        id: 2,
        titre: "Audit Bancaire et Contrôle Interne : Évaluation des Risques et Conformité",
        domaine: "finance",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Approfondir les compétences en audit bancaire, évaluation des risques et conformité internationale.",
        popularite: 88,
        certifiant: true
    },
    // ... ajouter les 4 autres formations finance
    
    // DOMAINE MANAGEMENT (25 formations)
    {
        id: 7,
        titre: "Management Qualité Laboratoire : Normes, Traçabilité et Excellence Opérationnelle",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Former aux exigences ISO et outils qualité pour laboratoires.",
        popularite: 82,
        certifiant: true
    },
    {
        id: 8,
        titre: "Analyse de Données avec R : De la Statistique à la Décision",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Apprentissage complet de la data science via R.",
        popularite: 94,
        certifiant: true
    },
    {
        id: 32,
        titre: "Leadership Féminin : Prendre Sa Place avec Charisme et Stratégie",
        domaine: "management",
        duree: "32h",
        tarif: "GRATUIT",
        description: "Développer le leadership et la posture stratégique des femmes.",
        popularite: 98,
        certifiant: true
    },
    // ... ajouter les autres formations management
    
    // DOMAINE INGÉNIERIE (18 formations)
    {
        id: 33,
        titre: "Chaînes de Valeur et Valorisation Agroalimentaire",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Valoriser la production agroalimentaire et renforcer la compétitivité.",
        popularite: 85,
        certifiant: true
    },
    // ... ajouter les autres formations ingénierie
];

// Fonction pour charger les formations populaires sur la page d'accueil
function loadPopularCourses() {
    const container = document.getElementById('popular-courses');
    if (!container) return;

    // Trier par popularité et prendre les 6 plus populaires
    const popular = [...UAMDD_FORMATIONS]
        .sort((a, b) => b.popularite - a.popularite)
        .slice(0, 6);

    container.innerHTML = popular.map(course => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="course-card">
                <div class="course-image">
                    <div class="course-category">${course.domaine.toUpperCase()}</div>
                </div>
                <div class="course-content">
                    <h3 class="course-title">${course.titre}</h3>
                    <p class="course-description">${course.description}</p>
                    
                    <div class="course-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${course.duree}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-certificate"></i>
                            <span>Certifiante</span>
                        </div>
                    </div>
                    
                    <div class="course-meta">
                        <div class="course-price">${course.tarif}</div>
                        <div class="course-rating">
                            <i class="fas fa-star"></i> ${(course.popularite/20).toFixed(1)}
                        </div>
                    </div>
                    
                    <a href="formation-detail.html?id=${course.id}" class="btn btn-primary w-100 mt-3">
                        Détails & Inscription
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Charger au démarrage
document.addEventListener('DOMContentLoaded', loadPopularCourses);