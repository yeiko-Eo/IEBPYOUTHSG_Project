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
document.querySelectorAll('.gallery-item, .course-card, .game-card, .timeline-item').forEach(el => {
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
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('disabled')) {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Solo mostrar modal para juegos que no están disponibles
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Verificar si el juego tiene la clase "available"
        const gameCard = this.closest('.game-card');
        
        if (!gameCard.classList.contains('available')) {
            e.preventDefault();
            e.stopPropagation();
            
            const gameTitle = gameCard.querySelector('h3').textContent;
            
            // Crear modal de demostración
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
                    <h3 style="color: #2c5282; margin-bottom: 15px;">${gameTitle}</h3>
                    <p style="margin-bottom: 25px;">¡Este juego estará disponible próximamente! Mientras tanto, puedes disfrutar de nuestros otros juegos bíblicos disponibles.</p>
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
                        <button id="viewAvailableGames" style="
                            background: transparent;
                            color: #2c5282;
                            border: 2px solid #2c5282;
                            padding: 12px 30px;
                            border-radius: 30px;
                            font-size: 1rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">Ver Juegos Disponibles</button>
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
            
            // Ver juegos disponibles
            modal.querySelector('#viewAvailableGames').addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                    // Hacer scroll a la sección de juegos
                    document.querySelector('#actividades').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.querySelector('#closeModal').click();
                }
            });
        }
        // Si el juego tiene la clase "available", no se hace nada (ya se abrirá en nueva pestaña)
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
});