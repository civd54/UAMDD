// Configuration
const COURSES_PER_PAGE = 9;
let currentPage = 1;
let totalPages = 1;
let currentView = 'grid'; // 'grid' ou 'list'
let selectedCourses = []; // Pour le comparateur
let allCourses = []; // Toutes les formations
let filteredCourses = []; // Formations filtrées

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Charger toutes les formations
    allCourses = UAMDD_FORMATIONS;
    filteredCourses = [...allCourses];
    
    // Initialiser l'affichage
    updateCoursesDisplay();
    setupEventListeners();
    updatePagination();
    checkURLParams();
    
    // Mettre à jour le compteur
    updateResultsCount();
});

// Vérifier les paramètres URL
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        // Décocher toutes les catégories
        document.querySelectorAll('.domain-filter').forEach(cb => {
            cb.checked = false;
        });
        
        // Cocher la catégorie sélectionnée
        const filter = document.getElementById(`filter-${category}`);
        if (filter) {
            filter.checked = true;
            applyFilters();
        }
    }
}

// Mettre en place les écouteurs d'événements
function setupEventListeners() {
    // Recherche
    document.getElementById('searchBtn').addEventListener('click', applyFilters);
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') applyFilters();
    });
    
    // Filtres
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    document.getElementById('resetAllFilters').addEventListener('click', resetFilters);
    
    // Tri
    document.getElementById('sortSelect').addEventListener('change', applySorting);
    
    // Vue
    document.getElementById('gridView').addEventListener('click', () => switchView('grid'));
    document.getElementById('listView').addEventListener('click', () => switchView('list'));
    
    // Comparateur
    document.getElementById('compareBtn').addEventListener('click', openComparisonModal);
    document.getElementById('sendComparison').addEventListener('click', sendComparison);
}

// Appliquer les filtres
function applyFilters() {
    currentPage = 1;
    
    // Récupérer les valeurs des filtres
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedDomains = getSelectedCheckboxes('.domain-filter');
    const selectedDurations = getSelectedCheckboxes('.duration-filter');
    const selectedPrices = getSelectedCheckboxes('.price-filter');
    const selectedCerts = getSelectedCheckboxes('.cert-filter');
    
    // Filtrer les formations
    filteredCourses = allCourses.filter(course => {
        // Filtre recherche
        if (searchTerm && !course.titre.toLowerCase().includes(searchTerm) && 
            !course.description.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Filtre domaine
        if (selectedDomains.length > 0 && !selectedDomains.includes(course.domaine)) {
            return false;
        }
        
        // Filtre durée
        if (selectedDurations.length > 0) {
            const durationMatch = selectedDurations.some(d => {
                if (d === '20') return course.duree === '20h';
                if (d === '32') return course.duree === '32h';
                if (d === '60') return course.duree === '2 mois (~32 h)' || course.duree === '2 mois';
                return false;
            });
            if (!durationMatch) return false;
        }
        
        // Filtre prix
        if (selectedPrices.length > 0) {
            const price = parseFloat(course.tarif.replace(/[^0-9]/g, ''));
            let priceMatch = false;
            
            selectedPrices.forEach(p => {
                if (p === 'gratuit' && course.tarif === 'GRATUIT') priceMatch = true;
                if (p === '3000-5900' && price >= 3000 && price <= 5900) priceMatch = true;
                if (p === '6000' && price === 6000) priceMatch = true;
            });
            
            if (!priceMatch) return false;
        }
        
        // Filtre certification
        if (selectedCerts.length > 0) {
            if (selectedCerts.includes('preparation') && 
                course.titre.toLowerCase().includes('préparation')) {
                return true;
            }
            if (selectedCerts.includes('certifiante') && course.certifiant) {
                return true;
            }
            return false;
        }
        
        return true;
    });
    
    // Appliquer le tri
    applySorting();
    updateResultsCount();
    updatePagination();
    updateCoursesDisplay();
}

// Récupérer les cases cochées
function getSelectedCheckboxes(selector) {
    const checkboxes = document.querySelectorAll(`${selector}:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

// Réinitialiser les filtres
function resetFilters() {
    // Réinitialiser la recherche
    document.getElementById('searchInput').value = '';
    
    // Réinitialiser tous les checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.classList.contains('domain-filter')) {
            cb.checked = true;
        } else if (cb.classList.contains('duration-filter')) {
            cb.checked = (cb.value === '32');
        } else if (cb.classList.contains('price-filter')) {
            cb.checked = (cb.value === '3000-5900');
        } else if (cb.classList.contains('cert-filter')) {
            cb.checked = (cb.value === 'certifiante');
        }
    });
    
    // Réinitialiser le tri
    document.getElementById('sortSelect').value = 'popularite';
    
    // Appliquer
    applyFilters();
}

// Appliquer le tri
function applySorting() {
    const sortBy = document.getElementById('sortSelect').value;
    
    filteredCourses.sort((a, b) => {
        switch (sortBy) {
            case 'tarif-croissant':
                const priceA = parseFloat(a.tarif.replace(/[^0-9]/g, '')) || 0;
                const priceB = parseFloat(b.tarif.replace(/[^0-9]/g, '')) || 0;
                return priceA - priceB;
                
            case 'tarif-dec':
                const priceADec = parseFloat(a.tarif.replace(/[^0-9]/g, '')) || 0;
                const priceBDec = parseFloat(b.tarif.replace(/[^0-9]/g, '')) || 0;
                return priceBDec - priceADec;
                
            case 'duree':
                const durationA = parseInt(a.duree) || 0;
                const durationB = parseInt(b.duree) || 0;
                return durationA - durationB;
                
            case 'alphabetique':
                return a.titre.localeCompare(b.titre);
                
            case 'popularite':
            default:
                return b.popularite - a.popularite;
        }
    });
    
    updateCoursesDisplay();
}

// Changer la vue
function switchView(view) {
    currentView = view;
    
    // Mettre à jour les boutons
    document.getElementById('gridView').classList.toggle('active', view === 'grid');
    document.getElementById('listView').classList.toggle('active', view === 'list');
    
    // Mettre à jour l'affichage
    updateCoursesDisplay();
}

// Mettre à jour l'affichage des formations
function updateCoursesDisplay() {
    const container = document.getElementById('formationsGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredCourses.length === 0) {
        container.innerHTML = '';
        noResults.classList.remove('d-none');
        return;
    }
    
    noResults.classList.add('d-none');
    
    // Calculer les formations à afficher pour la page actuelle
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const endIndex = startIndex + COURSES_PER_PAGE;
    const coursesToShow = filteredCourses.slice(startIndex, endIndex);
    
    // Générer le HTML
    container.innerHTML = coursesToShow.map(course => {
        const isSelected = selectedCourses.includes(course.id);
        const viewClass = currentView === 'list' ? 'list-view' : 'grid-view';
        
        return `
            <div class="${currentView === 'grid' ? 'col-lg-4 col-md-6' : 'col-12'} mb-4">
                <div class="formation-card ${viewClass} ${isSelected ? 'compared' : ''}">
                    <!-- Badge Comparateur -->
                    <div class="formation-badge">
                        <div class="form-check">
                            <input class="form-check-input compare-checkbox" 
                                   type="checkbox" 
                                   data-course-id="${course.id}"
                                   ${isSelected ? 'checked' : ''}>
                            <label class="form-check-label small">Comparer</label>
                        </div>
                    </div>
                    
                    <!-- Image -->
                    <div class="formation-image">
                        <img src="../assets/images/courses/${course.domaine}.jpg" alt="${course.titre}">
                        <div class="formation-overlay"></div>
                        <div class="formation-category">
                            ${getDomainLabel(course.domaine)}
                        </div>
                    </div>
                    
                    <!-- Contenu -->
                    <div class="formation-content">
                        <h3 class="formation-title">${course.titre}</h3>
                        <p class="formation-description">${course.description}</p>
                        
                        <!-- Détails -->
                        <div class="formation-details">
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span>${course.duree}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-certificate"></i>
                                <span>Certifiante</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-user-graduate"></i>
                                <span>${course.popularite}% réussite</span>
                            </div>
                        </div>
                        
                        <!-- Meta -->
                        <div class="formation-meta">
                            <div class="formation-price">${course.tarif}</div>
                            <div class="formation-rating">
                                <i class="fas fa-star"></i> ${(course.popularite/20).toFixed(1)}
                            </div>
                        </div>
                        
                        <!-- Actions -->
                        <div class="formation-actions">
                            <button class="btn btn-outline-primary btn-sm details-btn" 
                                    data-course-id="${course.id}">
                                <i class="fas fa-info-circle me-1"></i>Détails
                            </button>
                            <button class="btn btn-primary btn-sm inscription-btn" 
                                    data-course-id="${course.id}">
                                <i class="fas fa-cart-plus me-1"></i>S'inscrire
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Ajouter les écouteurs d'événements aux nouveaux éléments
    setupCourseEventListeners();
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

// Mettre en place les écouteurs d'événements des formations
function setupCourseEventListeners() {
    // Checkboxes comparateur
    document.querySelectorAll('.compare-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const courseId = parseInt(this.dataset.courseId);
            toggleCourseComparison(courseId, this.checked);
        });
    });
    
    // Boutons détails
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.courseId);
            viewCourseDetails(courseId);
        });
    });
    
    // Boutons inscription
    document.querySelectorAll('.inscription-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.courseId);
            startInscription(courseId);
        });
    });
}

// Basculer la comparaison d'une formation
function toggleCourseComparison(courseId, isSelected) {
    if (isSelected) {
        if (selectedCourses.length >= 3) {
            alert('Vous ne pouvez comparer que 3 formations maximum');
            document.querySelector(`[data-course-id="${courseId}"]`).checked = false;
            return;
        }
        selectedCourses.push(courseId);
    } else {
        const index = selectedCourses.indexOf(courseId);
        if (index > -1) selectedCourses.splice(index, 1);
    }
    
    // Mettre à jour l'affichage
    updateComparisonDisplay();
    updateCoursesDisplay();
}

// Mettre à jour l'affichage du comparateur
function updateComparisonDisplay() {
    const comparatorList = document.getElementById('comparatorList');
    const compareBtn = document.getElementById('compareBtn');
    
    // Vider la liste
    comparatorList.innerHTML = '';
    
    // Ajouter les formations sélectionnées
    selectedCourses.forEach(courseId => {
        const course = allCourses.find(c => c.id === courseId);
        if (course) {
            const item = document.createElement('div');
            item.className = 'comparator-item';
            item.innerHTML = `
                <span class="text-truncate" style="max-width: 150px;">${course.titre}</span>
                <button type="button" class="btn-close btn-close-sm" data-course-id="${courseId}"></button>
            `;
            comparatorList.appendChild(item);
            
            // Ajouter l'écouteur pour supprimer
            item.querySelector('.btn-close').addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.courseId);
                toggleCourseComparison(id, false);
            });
        }
    });
    
    // Mettre à jour le bouton
    compareBtn.disabled = selectedCourses.length < 2;
    compareBtn.innerHTML = `<i class="fas fa-chart-bar me-1"></i>Comparer (${selectedCourses.length})`;
    
    // Mettre à jour le compteur dans la barre de contrôle
    const selectedCount = document.getElementById('selectedCount');
    if (selectedCourses.length > 0) {
        selectedCount.textContent = `${selectedCourses.length} sélectionnée(s)`;
        selectedCount.classList.remove('d-none');
    } else {
        selectedCount.classList.add('d-none');
    }
}

// Ouvrir la modal de comparaison
function openComparisonModal() {
    if (selectedCourses.length < 2) return;
    
    const modalContent = document.getElementById('comparisonContent');
    const selectedFormations = allCourses.filter(c => selectedCourses.includes(c.id));
    
    // Générer le tableau de comparaison
    let html = `
        <div class="table-responsive">
            <table class="comparison-table">
                <tr>
                    <th>Caractéristique</th>
                    ${selectedFormations.map(course => `
                        <td class="comparison-col">
                            <h6>${course.titre}</h6>
                            <span class="badge bg-primary">${getDomainLabel(course.domaine)}</span>
                        </td>
                    `).join('')}
                </tr>
                <tr>
                    <th>Durée</th>
                    ${selectedFormations.map(course => `
                        <td>${course.duree}</td>
                    `).join('')}
                </tr>
                <tr>
                    <th>Tarif</th>
                    ${selectedFormations.map(course => `
                        <td><strong class="text-primary">${course.tarif}</strong></td>
                    `).join('')}
                </tr>
                <tr>
                    <th>Certification</th>
                    ${selectedFormations.map(course => `
                        <td>
                            <i class="fas fa-check text-success me-1"></i>
                            ${course.certifiant ? 'Certifiante' : 'Non certifiante'}
                        </td>
                    `).join('')}
                </tr>
                <tr>
                    <th>Taux de réussite</th>
                    ${selectedFormations.map(course => `
                        <td>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-success" style="width: ${course.popularite}%"></div>
                            </div>
                            <small>${course.popularite}%</small>
                        </td>
                    `).join('')}
                </tr>
                <tr>
                    <th>Description</th>
                    ${selectedFormations.map(course => `
                        <td><small>${course.description}</small></td>
                    `).join('')}
                </tr>
                <tr>
                    <th>Actions</th>
                    ${selectedFormations.map(course => `
                        <td>
                            <button class="btn btn-sm btn-primary w-100 mb-1" 
                                    onclick="startInscription(${course.id})">
                                <i class="fas fa-cart-plus me-1"></i>S'inscrire
                            </button>
                            <button class="btn btn-sm btn-outline-primary w-100" 
                                    onclick="viewCourseDetails(${course.id})">
                                <i class="fas fa-info-circle me-1"></i>Détails
                            </button>
                        </td>
                    `).join('')}
                </tr>
            </table>
        </div>
    `;
    
    modalContent.innerHTML = html;
    
    // Ouvrir la modal
    const modal = new bootstrap.Modal(document.getElementById('comparisonModal'));
    modal.show();
}

// Envoyer la comparaison par email
function sendComparison() {
    const email = prompt('Entrez votre adresse email pour recevoir cette comparaison :');
    if (email && validateEmail(email)) {
        // Simuler l'envoi
        alert(`La comparaison a été envoyée à ${email}`);
        const modal = bootstrap.Modal.getInstance(document.getElementById('comparisonModal'));
        modal.hide();
    } else if (email) {
        alert('Veuillez entrer une adresse email valide');
    }
}

// Valider l'email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Voir les détails d'une formation
function viewCourseDetails(courseId) {
    // Rediriger vers la page de détail
    window.location.href = `formation-detail.html?id=${courseId}`;
}

// Commencer l'inscription
function startInscription(courseId) {
    // Rediriger vers la page d'inscription
    window.location.href = `inscription.html?course=${courseId}`;
}

// Mettre à jour la pagination
function updatePagination() {
    totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Bouton précédent
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Précédent</a>
        </li>
    `;
    
    // Pages
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }
    
    // Bouton suivant
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Suivant</a>
        </li>
    `;
    
    pagination.innerHTML = html;
    
    // Ajouter les écouteurs d'événements
    pagination.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = parseInt(this.dataset.page);
            if (page >= 1 && page <= totalPages && page !== currentPage) {
                currentPage = page;
                updateCoursesDisplay();
                updatePagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// Mettre à jour le compteur de résultats
function updateResultsCount() {
    document.getElementById('resultsCount').textContent = filteredCourses.length;
}

// Exposer les fonctions globales
window.startInscription = startInscription;
window.viewCourseDetails = viewCourseDetails;