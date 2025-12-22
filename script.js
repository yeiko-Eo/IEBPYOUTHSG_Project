// Botón de scroll al inicio
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animaciones de entrada para elementos
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

// Observar elementos para animaciones
document.querySelectorAll('.gallery-item, .course-card, .game-card, .website-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Efecto suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        const menuCheckbox = document.getElementById('menu-toggle');
        if (menuCheckbox.checked) {
            menuCheckbox.checked = false;
        }
    });
});

// Efecto hover para tarjetas de juegos
document.querySelectorAll('.game-card, .website-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('disabled')) {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Función para mostrar modal de "próximamente"
function showComingSoonModal(title, message) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: slideUp 0.4s ease;
        ">
            <i class="fas fa-clock" style="font-size: 3rem; color: #2c5282; margin-bottom: 20px;"></i>
            <h3 style="color: #2c5282; margin-bottom: 15px;">${title}</h3>
            <p style="margin-bottom: 25px;">${message}</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="closeModal" style="
                    background: linear-gradient(135deg, #2c5282, #38b2ac);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 30px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Cerrar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Agregar estilos para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Cerrar modal
    modal.querySelector('#closeModal').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.querySelector('#closeModal').click();
        }
    });
}

// Manejar botones de juegos
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const gameCard = this.closest('.game-card');
        
        if (!gameCard.classList.contains('available')) {
            e.preventDefault();
            e.stopPropagation();
            
            const gameTitle = gameCard.querySelector('h3').textContent;
            showComingSoonModal(
                gameTitle,
                '¡Este juego estará disponible próximamente! Mientras tanto, puedes disfrutar de nuestros otros juegos bíblicos disponibles.'
            );
        }
    });
});

// Manejar botones de websites
document.querySelectorAll('.visit-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const websiteCard = this.closest('.website-card');
        
        if (!websiteCard.classList.contains('available')) {
            e.preventDefault();
            e.stopPropagation();
            
            const websiteTitle = websiteCard.querySelector('h3').textContent;
            showComingSoonModal(
                websiteTitle,
                '¡Esta página web estará disponible próximamente! Estamos trabajando para ofrecerte los mejores recursos digitales.'
            );
        }
    });
});

// Añadir clase de animación a elementos cuando están en vista
window.addEventListener('scroll', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const triggerBottom = window.innerHeight * 0.8;
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < triggerBottom) {
            item.classList.add('animated');
        }
    });
});

// Funciones para la sección de horarios
function toggleAdditionalInfo(infoId) {
    const infoElement = document.getElementById(infoId);
    infoElement.classList.toggle('active');
    
    // Cambiar el texto del botón
    const button = infoElement.previousElementSibling;
    if (infoElement.classList.contains('active')) {
        button.innerHTML = '<i class="fas fa-times-circle"></i> Ocultar Información';
    } else {
        button.innerHTML = '<i class="fas fa-info-circle"></i> Información Especial';
    }
}

// Función para obtener el próximo primer domingo
function getNextFirstSunday() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Buscar el primer domingo del mes actual
    let firstSunday = new Date(currentYear, currentMonth, 1);
    
    // Avanzar hasta encontrar un domingo (0 = domingo)
    while (firstSunday.getDay() !== 0) {
        firstSunday.setDate(firstSunday.getDate() + 1);
    }
    
    // Si el primer domingo ya pasó este mes, buscar en el próximo mes
    if (firstSunday < today) {
        firstSunday = new Date(currentYear, currentMonth + 1, 1);
        while (firstSunday.getDay() !== 0) {
            firstSunday.setDate(firstSunday.getDate() + 1);
        }
    }
    
    return firstSunday;
}

// Función para formatear fecha en español
function formatDateSpanish(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
}

// Función para actualizar la información de fecha
function updateDateInfo() {
    const now = new Date();
    const currentDateElement = document.getElementById('current-date');
    const nextFirstSundayElement = document.getElementById('next-first-sunday');
    
    // Actualizar fecha actual
    currentDateElement.textContent = formatDateSpanish(now);
    
    // Calcular y actualizar próximo primer domingo
    const nextFirstSunday = getNextFirstSunday();
    nextFirstSundayElement.textContent = formatDateSpanish(nextFirstSunday);
    
    // Verificar si hoy es primer domingo
    const isFirstSunday = now.getDate() <= 7 && now.getDay() === 0;
    
    // Resaltar si hoy es primer domingo
    if (isFirstSunday) {
        nextFirstSundayElement.innerHTML = '<strong>¡HOY ES EL PRIMER DOMINGO!</strong>';
        nextFirstSundayElement.style.color = '#d69e2e';
        nextFirstSundayElement.style.animation = 'pulse 1s infinite';
    }
}

// Inicialización de animaciones en carga
document.addEventListener('DOMContentLoaded', () => {
    // Añadir retraso de animación a los elementos de navegación
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Añadir retraso de animación a los elementos de galería
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Marcar juegos no disponibles como deshabilitados
    document.querySelectorAll('.game-card:not(.available)').forEach(card => {
        card.classList.add('disabled');
    });
    
    // Marcar websites no disponibles como deshabilitados
    document.querySelectorAll('.website-card:not(.available)').forEach(card => {
        card.classList.add('disabled');
    });
    
    // Inicializar botones de información en horarios
    const infoButtons = document.querySelectorAll('.info-btn');
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const infoId = this.getAttribute('data-info');
            toggleAdditionalInfo(`info-${infoId}`);
        });
    });
    
    // Inicializar información de fecha
    updateDateInfo();
    
    // Actualizar la información de fecha cada minuto (opcional)
    setInterval(updateDateInfo, 60000);
});