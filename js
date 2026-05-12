// ==================== FUNCIONALIDAD DE LOGIN ====================

const CONTRASENA_CORRECTA = 'paisajes2024';

let accesoPermitido = false;

// Manejar el formulario de login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        const successDiv = document.getElementById('loginSuccess');

        if (password === CONTRASENA_CORRECTA) {
            accesoPermitido = true;
            errorDiv.style.display = 'none';
            successDiv.style.display = 'block';
            iniciarAutoSlide();
            document.getElementById('password').value = '';
        } else {
            successDiv.style.display = 'none';
            errorDiv.textContent = 'Contraseña incorrecta';
            errorDiv.style.display = 'block';
            document.getElementById('password').value = '';
        }
    });
}

// ==================== FUNCIONALIDAD DEL CARRUSEL ====================

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

// Función para mostrar una diapositiva específica
function mostrarSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[n].classList.add('active');
    dots[n].classList.add('active');
}

// Función para ir al siguiente slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    mostrarSlide(currentSlide);
}

// Función para ir al slide anterior
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    mostrarSlide(currentSlide);
}

// Event listeners para los botones del carrusel
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        intentarAcceso(() => {
            nextSlide();
            detenerAutoSlide();
            iniciarAutoSlide();
        });
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        intentarAcceso(() => {
            prevSlide();
            detenerAutoSlide();
            iniciarAutoSlide();
        });
    });
}

// Event listeners para los puntos (dots)
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        intentarAcceso(() => {
            currentSlide = parseInt(this.getAttribute('data-index'));
            mostrarSlide(currentSlide);
            detenerAutoSlide();
            iniciarAutoSlide();
        });
    });
});

// Auto-avance cada 5 segundos
let autoSlideInterval;

function iniciarAutoSlide() {
    if (slides.length > 0 && accesoPermitido) {
        mostrarSlide(0);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
}

function detenerAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    mostrarSlide(0);
});
