// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Charger les formations populaires
    loadPopularCourses();

    // Gestion du formulaire newsletter
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeNewsletter(email);
        });
    }

    // Animation au scroll
    initScrollAnimations();
});

// Charger les formations populaires
function loadPopularCourses() {
    const container = document.getElementById('popular-courses');
    if (!container) return;

    // Données temporaires (seront remplacées par API)
    const courses = [
        {
            id: 1,
            title: "Gestion de Projets Agile",
            description: "Maîtrisez les méthodologies Agile pour une gestion de projets efficace.",
            category: "Management",
            price: "89,000 FCFA",
            rating: 4.8,
            image: "assets/images/course1.jpg"
        },
        {
            id: 2,
            title: "Finance d'Entreprise",
            description: "Apprenez les fondamentaux de la finance d'entreprise.",
            category: "Finance",
            price: "75,000 FCFA",
            rating: 4.7,
            image: "assets/images/course2.jpg"
        },
        {
            id: 3,
            title: "Développement Web FullStack",
            description: "Devenez développeur fullstack avec les technologies modernes.",
            category: "Ingénierie",
            price: "120,000 FCFA",
            rating: 4.9,
            image: "assets/images/course3.jpg"
        }
    ];

    container.innerHTML = courses.map(course => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="course-card">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-content">
                    <span class="course-category">${course.category}</span>
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <div class="course-price">${course.price}</div>
                        <div class="course-rating">
                            <i class="fas fa-star"></i> ${course.rating}
                        </div>
                    </div>
                    <a href="formation-detail.html?id=${course.id}" class="btn btn-primary w-100 mt-3">
                        Voir la formation
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// S'abonner à la newsletter
function subscribeNewsletter(email) {
    if (!validateEmail(email)) {
        showNotification('Veuillez entrer un email valide', 'error');
        return;
    }

    // Simulation d'envoi
    showNotification('Inscription à la newsletter réussie !', 'success');
    
    // Ici, tu feras un appel API
    // fetch('/api/newsletter/subscribe', {
    //     method: 'POST',
    //     body: JSON.stringify({ email })
    // })
}

// Valider l'email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Afficher les notifications
function showNotification(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Ajouter au début du body
    document.body.prepend(alert);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Animations au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.category-card, .course-card, .about-item').forEach(el => {
        observer.observe(el);
    });
}

// Gestion du mode sombre (pour futur)
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Charger le thème sauvegardé
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialiser le thème au chargement
loadTheme();