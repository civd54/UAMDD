// Données complètes des 60 formations UAMDD
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
    {
        id: 3,
        titre: "Techniques Bancaires Essentielles : Comptes, Paiements et Relation Client",
        domaine: "finance",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser les opérations bancaires de base, les moyens de paiement et la relation client.",
        popularite: 82,
        certifiant: true
    },
    {
        id: 4,
        titre: "Maîtrise des Normes IFRS : Comptabilité et Conformité Internationale",
        domaine: "finance",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Comprendre et appliquer les normes IFRS pour lire et analyser les états financiers internationaux.",
        popularite: 91,
        certifiant: true
    },
    {
        id: 5,
        titre: "Maîtrise Totale de l'Audit Financier et Comptable",
        domaine: "finance",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Approfondir les normes et pratiques internationales d'audit financier et comptable.",
        popularite: 87,
        certifiant: true
    },
    {
        id: 6,
        titre: "Gestion Budgétaire Intelligente : Optimisez vos Ressources",
        domaine: "finance",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Renforcer la maîtrise des outils de gestion budgétaire et du contrôle financier.",
        popularite: 84,
        certifiant: true
    },

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
        id: 9,
        titre: "Primavera P6 : Planification et Suivi de Projets Complexes",
        domaine: "management",
        duree: "2 mois (~32 h)",
        tarif: "5,900 MAD",
        description: "Maîtriser la planification et le suivi de projets avec Primavera P6.",
        popularite: 89,
        certifiant: true
    },
    {
        id: 10,
        titre: "Stratégies RSE et Impact Durable : De l'Engagement à la Création de Valeur",
        domaine: "management",
        duree: "2 mois",
        tarif: "5,900 MAD",
        description: "Développer des stratégies RSE à fort impact économique et social.",
        popularite: 92,
        certifiant: true
    },
    {
        id: 11,
        titre: "Préparation PMP : Gestion de Projet Stratégique et Leadership",
        domaine: "management",
        duree: "2 mois",
        tarif: "6,000 MAD",
        description: "Préparer la certification PMP® en gestion de projet.",
        popularite: 96,
        certifiant: true
    },
    {
        id: 12,
        titre: "Leadership Territorial : Gouvernance Inclusive et Développement Durable",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Développer les compétences de gouvernance et de pilotage territorial.",
        popularite: 85,
        certifiant: true
    },
    {
        id: 13,
        titre: "Leadership Stratégique : Du Visionnaire au Décideur Performant",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Transformer la vision stratégique en actions concrètes.",
        popularite: 90,
        certifiant: true
    },
    {
        id: 14,
        titre: "Optimisation Industrielle & Réduction des Pertes (Lean, Six Sigma)",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Améliorer la performance industrielle via les méthodes modernes.",
        popularite: 88,
        certifiant: true
    },
    {
        id: 15,
        titre: "Gestion Stratégique et Inclusive des Ressources Humaines",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Anticiper et fidéliser les talents dans un contexte RH moderne.",
        popularite: 86,
        certifiant: true
    },
    {
        id: 16,
        titre: "Leadership Digital & Stratégie des Systèmes d'Information",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Piloter la transformation numérique et la stratégie digitale.",
        popularite: 93,
        certifiant: true
    },
    {
        id: 17,
        titre: "Préparation Physique & Coaching Sportif",
        domaine: "management",
        duree: "20h",
        tarif: "3,000 MAD",
        description: "Former à la performance physique et à l'encadrement sportif.",
        popularite: 79,
        certifiant: true
    },
    {
        id: 18,
        titre: "Management Stratégique du Sport",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser la gouvernance et le marketing du sport.",
        popularite: 81,
        certifiant: true
    },
    {
        id: 19,
        titre: "Aménagement Territorial et Urbanisme",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Appliquer des approches durables à l'aménagement du territoire.",
        popularite: 83,
        certifiant: true
    },
    {
        id: 20,
        titre: "Gouvernance Publique et Décentralisation",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Étudier les modèles de gouvernance locale et la décentralisation.",
        popularite: 84,
        certifiant: true
    },
    {
        id: 21,
        titre: "Coopératives Performantes : Gouvernance et Impact Collectif",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Optimiser la gestion et l'impact des coopératives locales.",
        popularite: 82,
        certifiant: true
    },
    {
        id: 22,
        titre: "Transformation Digitale et ERP",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Implémenter efficacement un ERP dans les organisations.",
        popularite: 91,
        certifiant: true
    },
    {
        id: 23,
        titre: "Tourisme Durable & Territoires",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Promouvoir un tourisme inclusif et durable.",
        popularite: 85,
        certifiant: true
    },
    {
        id: 24,
        titre: "Chaîne de Valeur Agricole : Connecter le Champ au Marché",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Développer des chaînes agricoles performantes et durables.",
        popularite: 87,
        certifiant: true
    },
    {
        id: 25,
        titre: "Leadership Féminin : Prendre Sa Place avec Charisme et Stratégie",
        domaine: "management",
        duree: "32h",
        tarif: "GRATUIT",
        description: "Développer le leadership et la posture stratégique des femmes.",
        popularite: 98,
        certifiant: true
    },
    {
        id: 26,
        titre: "Expert en Audit Interne : Préparation Certification CIA",
        domaine: "management",
        duree: "32h",
        tarif: "6,000 MAD",
        description: "Préparer la certification CIA et maîtriser l'audit interne.",
        popularite: 90,
        certifiant: true
    },
    {
        id: 27,
        titre: "Logistique et Supply Chain",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser la gestion logistique et de la chaîne d'approvisionnement.",
        popularite: 88,
        certifiant: true
    },
    {
        id: 28,
        titre: "Ressources Humaines, Audit Social et Analyse Opérationnelle",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Approfondir la gestion RH et les audits sociaux.",
        popularite: 84,
        certifiant: true
    },
    {
        id: 29,
        titre: "Gestion Intégrée QHSE : Excellence et Conformité selon ISO",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Renforcer la gestion qualité, sécurité et environnement.",
        popularite: 86,
        certifiant: true
    },
    {
        id: 30,
        titre: "Gestion de Projet et Leadership (Préparation PMP®)",
        domaine: "management",
        duree: "32h",
        tarif: "6,000 MAD",
        description: "Formation complète à la gestion de projet et certification PMP®.",
        popularite: 95,
        certifiant: true
    },
    {
        id: 31,
        titre: "Analyse de Données Décisionnelle avec Excel, Power BI et SPSS",
        domaine: "management",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Former à la data analyse et business intelligence.",
        popularite: 93,
        certifiant: true
    },

    // DOMAINE INGÉNIERIE (18 formations)
    {
        id: 32,
        titre: "Chaînes de Valeur et Valorisation Agroalimentaire",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Valoriser la production agroalimentaire et renforcer la compétitivité.",
        popularite: 85,
        certifiant: true
    },
    {
        id: 33,
        titre: "Géophysique & Ressources Naturelles",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser les outils modernes d'exploration géophysique.",
        popularite: 82,
        certifiant: true
    },
    {
        id: 34,
        titre: "SIG et Télédétection : Vulnérabilité aux Risques d'Inondation",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Utiliser SIG et données satellites pour prévention des inondations.",
        popularite: 87,
        certifiant: true
    },
    {
        id: 35,
        titre: "SIG pour l'Aménagement du Territoire",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Appliquer les SIG à la planification urbaine et rurale.",
        popularite: 89,
        certifiant: true
    },
    {
        id: 36,
        titre: "SIG Avancés pour l'Industrie Minière",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Utiliser SIG pour optimiser la prospection et l'exploitation minière.",
        popularite: 86,
        certifiant: true
    },
    {
        id: 37,
        titre: "SIG et Modélisation Hydrique",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser la gestion durable de l'eau via modélisation SIG.",
        popularite: 88,
        certifiant: true
    },
    {
        id: 38,
        titre: "Gestion Durable des Eaux Usées",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Concevoir des systèmes de traitement et valorisation de l'eau.",
        popularite: 84,
        certifiant: true
    },
    {
        id: 39,
        titre: "Compostage et Économie Circulaire",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Monter des projets de compostage et de gestion durable des déchets.",
        popularite: 83,
        certifiant: true
    },
    {
        id: 40,
        titre: "Valorisation des Produits Agroalimentaires",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Développer la transformation et exportation agroalimentaire.",
        popularite: 85,
        certifiant: true
    },
    {
        id: 41,
        titre: "Leadership Minier : Gestion et Rentabilité",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Piloter les opérations minières de manière stratégique.",
        popularite: 86,
        certifiant: true
    },
    {
        id: 42,
        titre: "Superviseur Minier : Sécurité et Excellence Opérationnelle",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Gérer les équipes minières avec leadership et sécurité.",
        popularite: 84,
        certifiant: true
    },
    {
        id: 43,
        titre: "Techniques de Forage et Dynamitage en Mine Souterraine",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser les techniques de forage et dynamitage sécurisées.",
        popularite: 82,
        certifiant: true
    },
    {
        id: 44,
        titre: "Topographie et Géomorphologie avec QGIS, ArcGIS, MapInfo",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser la cartographie et la modélisation géologique.",
        popularite: 87,
        certifiant: true
    },
    {
        id: 45,
        titre: "Expert en Assainissement : Conception et Gestion des Systèmes",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Gérer la conception et maintenance des systèmes d'assainissement.",
        popularite: 83,
        certifiant: true
    },
    {
        id: 46,
        titre: "Expertise CVC Certifiée : Climatisation et Ventilation",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser les systèmes CVC et technologies de ventilation modernes.",
        popularite: 85,
        certifiant: true
    },
    {
        id: 47,
        titre: "Gestion Intégrée des Projets Miniers",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Superviser l'ensemble du cycle de vie des projets miniers.",
        popularite: 86,
        certifiant: true
    },
    {
        id: 48,
        titre: "Dimensionnement Électrique : Charge, Distribution, Protection",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser le calcul et la sécurité des installations électriques.",
        popularite: 88,
        certifiant: true
    },
    {
        id: 49,
        titre: "Audit des Systèmes d'Information : Préparation CISA",
        domaine: "ingenierie",
        duree: "32h",
        tarif: "6,000 MAD",
        description: "Formation double certifiante à la gestion des risques informatiques.",
        popularite: 91,
        certifiant: true
    },

    // DOMAINE DÉVELOPPEMENT DURABLE (11 formations - regroupement des formations DD des autres domaines)
    {
        id: 50,
        titre: "Stratégies RSE et Impact Durable",
        domaine: "dd",
        duree: "2 mois",
        tarif: "5,900 MAD",
        description: "Développer des stratégies RSE à fort impact économique et social.",
        popularite: 92,
        certifiant: true
    },
    {
        id: 51,
        titre: "Leadership Territorial : Gouvernance Inclusive et DD",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Développer les compétences de gouvernance et de pilotage territorial durable.",
        popularite: 85,
        certifiant: true
    },
    {
        id: 52,
        titre: "Tourisme Durable & Territoires",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Promouvoir un tourisme inclusif et durable.",
        popularite: 85,
        certifiant: true
    },
    {
        id: 53,
        titre: "Chaîne de Valeur Agricole Durable",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Développer des chaînes agricoles performantes et durables.",
        popularite: 87,
        certifiant: true
    },
    {
        id: 54,
        titre: "Gestion Intégrée QHSE : Excellence et Conformité",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Renforcer la gestion qualité, sécurité et environnement.",
        popularite: 86,
        certifiant: true
    },
    {
        id: 55,
        titre: "Finance Verte et Investissements ESG",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser les principes de la finance durable et des investissements ESG.",
        popularite: 95,
        certifiant: true
    },
    {
        id: 56,
        titre: "Gestion Durable des Eaux Usées",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Concevoir des systèmes de traitement et valorisation de l'eau.",
        popularite: 84,
        certifiant: true
    },
    {
        id: 57,
        titre: "Compostage et Économie Circulaire",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Monter des projets de compostage et de gestion durable des déchets.",
        popularite: 83,
        certifiant: true
    },
    {
        id: 58,
        titre: "SIG et Modélisation Hydrique Durable",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Maîtriser la gestion durable de l'eau via modélisation SIG.",
        popularite: 88,
        certifiant: true
    },
    {
        id: 59,
        titre: "Aménagement Territorial et Urbanisme Durable",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Appliquer des approches durables à l'aménagement du territoire.",
        popularite: 83,
        certifiant: true
    },
    {
        id: 60,
        titre: "Coopératives Performantes : Impact Collectif et Durabilité",
        domaine: "dd",
        duree: "32h",
        tarif: "5,900 MAD",
        description: "Optimiser la gestion et l'impact durable des coopératives locales.",
        popularite: 82,
        certifiant: true
    }
];

// Fonction pour charger les formations populaires sur l'accueil
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
                    <img src="../assets/images/courses/${course.domaine}.jpg" alt="${course.titre}">
                    <div class="course-category">${getDomainLabel(course.domaine)}</div>
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
                    
                    <a href="pages/formation-detail.html?id=${course.id}" class="btn btn-primary w-100 mt-3">
                        Détails & Inscription
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Obtenir le label d'un domaine
function getDomainLabel(domain) {
    const labels = {
        'finance': 'Finance & Comptabilité',
        'management': 'Management & Leadership',
        'ingenierie': 'Ingénierie & Technologie',
        'dd': 'Développement Durable'
    };
    return labels[domain] || domain;
}

// Charger au démarrage si sur la page d'accueil
if (document.getElementById('popular-courses')) {
    document.addEventListener('DOMContentLoaded', loadPopularCourses);
}