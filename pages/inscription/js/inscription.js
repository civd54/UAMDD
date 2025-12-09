// Variables globales
let currentStep = 1;
let selectedFormations = [];
let userData = {};
let orderData = {};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initInscription();
    loadFormationsForSelection();
    setupEventListeners();
    updateProgressBar();
});

// Initialiser l'inscription
function initInscription() {
    // Récupérer l'ID de la formation depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');
    
    if (courseId) {
        // Pré-sélectionner la formation
        const course = UAMDD_FORMATIONS.find(c => c.id == courseId);
        if (course) {
            selectedFormations = [course];
            updateCart();
        }
    }
}

// Charger les formations pour la sélection
function loadFormationsForSelection() {
    const container = document.getElementById('formationSelection');
    if (!container) return;
    
    container.innerHTML = UAMDD_FORMATIONS.map(course => `
        <div class="formation-item" data-course-id="${course.id}">
            <div class="formation-info">
                <h5>${course.titre}</h5>
                <div class="formation-meta">
                    <span><i class="fas fa-clock"></i> ${course.duree}</span>
                    <span><i class="fas fa-certificate"></i> Certifiante</span>
                    <span><i class="fas fa-star text-warning"></i> ${(course.popularite/20).toFixed(1)}</span>
                </div>
            </div>
            <div class="add-to-cart">
                <span class="formation-price">${course.tarif}</span>
                <button type="button" class="btn btn-outline-primary btn-sm add-to-cart-btn" 
                        data-course-id="${course.id}">
                    <i class="fas fa-cart-plus"></i> Ajouter
                </button>
            </div>
        </div>
    `).join('');
    
    // Ajouter les écouteurs d'événements
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.courseId);
            addToCart(courseId);
        });
    });
    
    document.querySelectorAll('.formation-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.add-to-cart-btn')) {
                const courseId = parseInt(this.dataset.courseId);
                toggleFormationSelection(courseId);
            }
        });
    });
}

// Mettre en place les écouteurs d'événements
function setupEventListeners() {
    // Navigation entre les étapes
    document.getElementById('nextToStep2').addEventListener('click', validateStep1);
    document.getElementById('nextToStep3').addEventListener('click', validateStep2);
    document.getElementById('proceedToPayment').addEventListener('click', processPayment);
    
    document.getElementById('backToStep1').addEventListener('click', () => goToStep(1));
    document.getElementById('backToStep2').addEventListener('click', () => goToStep(2));
    
    // Toggle mot de passe
    document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);
    
    // Validation en temps réel
    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('confirmPassword').addEventListener('input', validatePasswordConfirmation);
    
    // Sélection méthode de paiement
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updatePaymentMethod(this.value);
        });
    });
}

// Valider l'étape 1
function validateStep1() {
    const form = document.getElementById('personalInfoForm');
    
    // Validation des champs requis
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'country', 'password', 'confirmPassword'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    // Validation spécifique email
    const emailField = document.getElementById('email');
    if (!isValidEmail(emailField.value)) {
        emailField.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validation spécifique mot de passe
    if (!validatePassword()) {
        isValid = false;
    }
    
    // Validation conditions
    if (!document.getElementById('terms').checked) {
        document.getElementById('terms').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('terms').classList.remove('is-invalid');
    }
    
    if (isValid) {
        // Sauvegarder les données utilisateur
        saveUserData();
        goToStep(2);
    } else {
        // Afficher un message d'erreur
        showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
    }
}

// Sauvegarder les données utilisateur
function saveUserData() {
    userData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('countryCode').value + document.getElementById('phone').value.trim(),
        country: document.getElementById('country').value,
        city: document.getElementById('city').value.trim(),
        profession: document.getElementById('profession').value.trim(),
        newsletter: document.getElementById('newsletter').checked,
        terms: document.getElementById('terms').checked
    };
}

// Valider l'étape 2
function validateStep2() {
    if (selectedFormations.length === 0) {
        showNotification('Veuillez sélectionner au moins une formation', 'error');
        return;
    }
    
    // Mettre à jour les données de commande
    orderData = {
        formations: selectedFormations,
        totalAmount: calculateTotal(),
        date: new Date().toISOString()
    };
    
    // Mettre à jour le récapitulatif de commande
    updateOrderSummary();
    goToStep(3);
}

// Ajouter au panier
function addToCart(courseId) {
    const course = UAMDD_FORMATIONS.find(c => c.id === courseId);
    if (!course) return;
    
    // Vérifier si déjà dans le panier
    const existingIndex = selectedFormations.findIndex(c => c.id === courseId);
    
    if (existingIndex === -1) {
        selectedFormations.push(course);
        showNotification(`"${course.titre}" ajoutée au panier`, 'success');
    } else {
        selectedFormations.splice(existingIndex, 1);
        showNotification(`"${course.titre}" retirée du panier`, 'info');
    }
    
    updateCart();
    updateFormationItem(courseId, existingIndex === -1);
}

// Basculer la sélection d'une formation
function toggleFormationSelection(courseId) {
    const course = UAMDD_FORMATIONS.find(c => c.id === courseId);
    if (!course) return;
    
    const existingIndex = selectedFormations.findIndex(c => c.id === courseId);
    
    if (existingIndex === -1) {
        selectedFormations.push(course);
    } else {
        selectedFormations.splice(existingIndex, 1);
    }
    
    updateCart();
    updateFormationItem(courseId, existingIndex === -1);
}

// Mettre à jour l'affichage de l'item formation
function updateFormationItem(courseId, isSelected) {
    const item = document.querySelector(`.formation-item[data-course-id="${courseId}"]`);
    const btn = item?.querySelector('.add-to-cart-btn');
    
    if (item && btn) {
        if (isSelected) {
            item.classList.add('selected');
            btn.innerHTML = '<i class="fas fa-check"></i> Ajoutée';
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-success');
        } else {
            item.classList.remove('selected');
            btn.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter';
            btn.classList.remove('btn-success');
            btn.classList.add('btn-outline-primary');
        }
    }
}

// Mettre à jour le panier
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    
    if (!cartItems) return;
    
    if (selectedFormations.length === 0) {
        cartItems.innerHTML = '<div class="text-center text-muted p-3">Aucune formation sélectionnée</div>';
        totalAmount.textContent = '0 MAD';
        return;
    }
    
    cartItems.innerHTML = selectedFormations.map(course => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h6 class="mb-1">${course.titre}</h6>
                <small class="text-muted">${course.duree} • Certifiante</small>
            </div>
            <div class="cart-item-actions">
                <span class="me-3">${course.tarif}</span>
                <button type="button" class="btn btn-sm btn-outline-danger btn-remove" 
                        data-course-id="${course.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Calculer le total
    const total = calculateTotal();
    totalAmount.textContent = `${total.toLocaleString()} MAD`;
    
    // Ajouter les écouteurs pour supprimer
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.courseId);
            removeFromCart(courseId);
        });
    });
}

// Retirer du panier
function removeFromCart(courseId) {
    selectedFormations = selectedFormations.filter(c => c.id !== courseId);
    updateCart();
    updateFormationItem(courseId, false);
    showNotification('Formation retirée du panier', 'info');
}

// Calculer le total
function calculateTotal() {
    return selectedFormations.reduce((total, course) => {
        const price = parseFloat(course.tarif.replace(/[^0-9]/g, '')) || 0;
        return total + price;
    }, 0);
}

// Mettre à jour le récapitulatif de commande
function updateOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderTotal = document.getElementById('orderTotal');
    
    if (orderItems) {
        orderItems.textContent = selectedFormations.length;
    }
    
    const total = calculateTotal();
    if (orderSubtotal) {
        orderSubtotal.textContent = `${total.toLocaleString()} MAD`;
    }
    
    if (orderTotal) {
        orderTotal.textContent = `${total.toLocaleString()} MAD`;
    }
}

// Traiter le paiement
function processPayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Validation des données utilisateur
    if (!userData.email || !userData.firstName) {
        showNotification('Veuillez compléter vos informations personnelles', 'error');
        goToStep(1);
        return;
    }
    
    // Validation du panier
    if (selectedFormations.length === 0) {
        showNotification('Veuillez sélectionner une formation', 'error');
        goToStep(2);
        return;
    }
    
    // Préparer la commande
    const order = {
        user: userData,
        formations: selectedFormations,
        total: calculateTotal(),
        currency: 'MAD',
        paymentMethod: paymentMethod,
        orderId: generateOrderId()
    };
    
    // Sauvegarder la commande dans le localStorage (simulation)
    localStorage.setItem('uamdd_order', JSON.stringify(order));
    
    // Traiter selon la méthode de paiement
    switch (paymentMethod) {
        case 'fadapay':
            processFadapayPayment(order);
            break;
        case 'paypal':
            processPaypalPayment(order);
            break;
        case 'bank':
            processBankTransfer(order);
            break;
        default:
            showNotification('Méthode de paiement non supportée', 'error');
    }
}

// Traiter paiement Fadapay
function processFadapayPayment(order) {
    // Récupérer l'email de l'utilisateur
    const customerEmail = userData.email;
    
    // Préparer les données pour Fadapay
    const fadapayData = {
        amount: order.total,
        currency: order.currency,
        description: `Formation(s) UAMDD - ${order.formations.length} cours`,
        customer_email: customerEmail,
        order_id: order.orderId,
        callback_url: `${window.location.origin}/pages/inscription/confirmation.html`,
        cancel_url: `${window.location.origin}/pages/inscription/index.html`,
        metadata: {
            formations: order.formations.map(f => f.id),
            user_name: `${userData.firstName} ${userData.lastName}`
        }
    };
    
    // Afficher la simulation de chargement
    showLoading('Redirection vers Fadapay...');
    
    // Simuler un délai avant redirection
    setTimeout(() => {
        // En production, vous utiliserez l'API Fadapay
        // window.location.href = `https://api.fadapay.com/checkout?data=${encodeURIComponent(JSON.stringify(fadapayData))}`;
        
        // Simulation de succès
        completeInscription(order);
    }, 2000);
}

// Traiter paiement PayPal
function processPaypalPayment(order) {
    showNotification('Intégration PayPal en cours de développement', 'info');
    // Intégration PayPal à implémenter
}

// Traiter virement bancaire
function processBankTransfer(order) {
    // Afficher les informations de virement
    const transferInfo = `
        <div class="alert alert-info">
            <h5><i class="fas fa-university me-2"></i>Informations pour virement bancaire</h5>
            <p><strong>Banque :</strong> UAMDD Bank</p>
            <p><strong>IBAN :</strong> SN08 SN123 45678 9012345678901</p>
            <p><strong>BIC/SWIFT :</strong> UAMDDSND</p>
            <p><strong>Montant :</strong> ${order.total} MAD</p>
            <p><strong>Référence :</strong> UAMDD-${order.orderId}</p>
            <hr>
            <p class="mb-2"><strong>Important :</strong></p>
            <ul class="mb-0">
                <li>Utilisez la référence ci-dessus dans l'objet du virement</li>
                <li>Envoyez-nous une copie du virement à paiement@uamdd.org</li>
                <li>Votre accès sera activé sous 24-48h après réception</li>
            </ul>
        </div>
    `;
    
    showModal('Virement Bancaire', transferInfo);
    
    // Simuler la confirmation manuelle
    setTimeout(() => {
        completeInscription(order);
    }, 3000);
}

// Compléter l'inscription
function completeInscription(order) {
    // Sauvegarder l'utilisateur (simulation)
    const user = {
        ...userData,
        id: generateUserId(),
        createdAt: new Date().toISOString(),
        status: 'active',
        formations: order.formations.map(f => ({ id: f.id, progress: 0 }))
    };
    
    localStorage.setItem('uamdd_user', JSON.stringify(user));
    
    // Mettre à jour l'affichage de confirmation
    document.getElementById('confirmationEmail').textContent = user.email;
    document.getElementById('confirmationDate').textContent = new Date().toLocaleDateString('fr-FR');
    
    const confirmationFormation = document.getElementById('confirmationFormation');
    confirmationFormation.innerHTML = order.formations.map(course => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span>${course.titre}</span>
            <span class="badge bg-primary">${course.tarif}</span>
        </div>
    `).join('');
    
    // Aller à l'étape de confirmation
    goToStep(4);
    
    // Envoyer l'email de confirmation (simulation)
    sendConfirmationEmail(user, order);
}

// Générer un ID de commande
function generateOrderId() {
    return 'UAMDD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Générer un ID utilisateur
function generateUserId() {
    return 'USER-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Envoyer l'email de confirmation
function sendConfirmationEmail(user, order) {
    // En production, envoi via API
    console.log('Email envoyé à:', user.email);
    console.log('Commande:', order);
}

// Navigation entre les étapes
function goToStep(step) {
    // Masquer toutes les étapes
    document.querySelectorAll('.inscription-step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Afficher l'étape courante
    const stepElement = document.getElementById(`step${step}`);
    if (stepElement) {
        stepElement.classList.add('active');
        currentStep = step;
        updateProgressBar();
        
        // Scroller en haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Mettre à jour la barre de progression
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const steps = document.querySelectorAll('.step');
    
    // Calculer la progression
    const progress = ((currentStep - 1) / 3) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Mettre à jour les étapes
    steps.forEach(step => {
        const stepNumber = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

// Valider l'email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Valider le mot de passe
function validatePassword() {
    const password = document.getElementById('password');
    const passwordValue = password.value;
    
    // Règles de validation
    const hasMinLength = passwordValue.length >= 8;
    const hasUpperCase = /[A-Z]/.test(passwordValue);
    const hasLowerCase = /[a-z]/.test(passwordValue);
    const hasNumbers = /\d/.test(passwordValue);
    
    const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumbers;
    
    if (!isValid && passwordValue) {
        password.classList.add('is-invalid');
        return false;
    } else {
        password.classList.remove('is-invalid');
        return true;
    }
}

// Valider la confirmation du mot de passe
function validatePasswordConfirmation() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (confirmPassword.value && confirmPassword.value !== password.value) {
        confirmPassword.classList.add('is-invalid');
        return false;
    } else {
        confirmPassword.classList.remove('is-invalid');
        return true;
    }
}

// Basculer la visibilité du mot de passe
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordField.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Mettre à jour la méthode de paiement
function updatePaymentMethod(method) {
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('active');
    });
    
    const selectedOption = document.querySelector(`.payment-option[data-method="${method}"]`);
    if (selectedOption) {
        selectedOption.classList.add('active');
    }
}

// Afficher une notification
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '300px';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Afficher un chargement
function showLoading(message) {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
            </div>
            <p class="mt-3">${message}</p>
        </div>
    `;
    
    document.body.appendChild(loading);
    
    // Retourner l'élément pour pouvoir le supprimer
    return loading;
}

// Afficher une modal
function showModal(title, content) {
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'customModal';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialiser et afficher la modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Supprimer après fermeture
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// Styles supplémentaires pour les composants
const style = document.createElement('style');
style.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    
    .loading-content {
        text-align: center;
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
    }
`;
document.head.appendChild(style);