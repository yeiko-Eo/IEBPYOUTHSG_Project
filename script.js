// Scroll-to-top button + timeline reveal on scroll
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', y > 300);
    }

    const triggerBottom = window.innerHeight * 0.8;
    document.querySelectorAll('.timeline-item').forEach(item => {
        if (item.getBoundingClientRect().top < triggerBottom) item.classList.add('animated');
    });
});
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Intersection Observer for entry animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animated');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.gallery-item, .course-card, .game-card, .website-card').forEach(el => {
    observer.observe(el);
});

// Smooth internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
        }
    });
});

// Close mobile menu on link click
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        const menuCheckbox = document.getElementById('menu-toggle');
        if (menuCheckbox && menuCheckbox.checked) menuCheckbox.checked = false;
    });
});

// Hover effect for game/website cards
document.querySelectorAll('.game-card, .website-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('disabled')) card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Modal for "coming soon"
function showComingSoonModal(title, message) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;justify-content:center;align-items:center;z-index:10000;
    `;
    modal.innerHTML = `
        <div style="background:#fff;padding:32px;border-radius:16px;max-width:500px;width:90%;text-align:center;">
            <i class="fas fa-clock" style="font-size:2.5rem;color:#2c5282;margin-bottom:16px;display:block;"></i>
            <h3 style="color:#2c5282;margin:0 0 12px;">${title}</h3>
            <p style="margin:0 0 20px;">${message}</p>
            <button id="closeModal" style="background:linear-gradient(135deg,#2c5282,#38b2ac);color:#fff;border:none;padding:10px 24px;border-radius:24px;cursor:pointer;">Cerrar</button>
        </div>
    `;
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}
        div[style*="inset:0"]{animation:fadeIn .25s ease}
        div[style*="max-width:500px"]{animation:slideUp .3s ease}
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);

    modal.querySelector('#closeModal').addEventListener('click', () => {
        modal.style.animation = 'fadeOut .25s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 250);
    });
    modal.addEventListener('click', e => { if (e.target === modal) modal.querySelector('#closeModal').click(); });
}

// Play / Visit buttons
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const card = this.closest('.game-card');
        if (card && !card.classList.contains('available')) {
            e.preventDefault();
            const title = (card.querySelector('h3') || {}).textContent || 'Juego';
            showComingSoonModal(title, '¡Este juego estará disponible próximamente!');
        }
    });
});
document.querySelectorAll('.visit-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const card = this.closest('.website-card');
        if (card && !card.classList.contains('available')) {
            e.preventDefault();
            const title = (card.querySelector('h3') || {}).textContent || 'Sitio';
            showComingSoonModal(title, '¡Esta página web estará disponible próximamente!');
        }
    });
});

// Toggle additional info (schedules)
function toggleAdditionalInfo(infoId) {
    const info = document.getElementById(infoId);
    if (!info) return;
    info.classList.toggle('active');
    const button = info.previousElementSibling;
    if (button) {
        button.innerHTML = info.classList.contains('active')
            ? '<i class="fas fa-times-circle"></i> Ocultar Información'
            : '<i class="fas fa-info-circle"></i> Información Especial';
    }
}

// Date utilities for "next first Sunday"
function getNextFirstSunday() {
    const today = new Date();
    let d = new Date(today.getFullYear(), today.getMonth(), 1);
    while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
    if (d < today) {
        d = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
    }
    return d;
}
function formatDateSpanish(date) {
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
function updateDateInfo() {
    const now = new Date();
    const cur = document.getElementById('current-date');
    const next = document.getElementById('next-first-sunday');
    if (cur) cur.textContent = formatDateSpanish(now);
    if (next) {
        const n = getNextFirstSunday();
        const isFirstSunday = now.getDate() <= 7 && now.getDay() === 0;
        if (isFirstSunday) {
            next.innerHTML = '<strong>¡HOY ES EL PRIMER DOMINGO!</strong>';
            next.style.color = '#d69e2e';
            next.style.animation = 'pulse 1s infinite';
        } else {
            next.textContent = formatDateSpanish(n);
            next.style.color = '';
            next.style.animation = '';
        }
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-item').forEach((item, i) => item.style.animationDelay = `${i * 0.1}s`);
    document.querySelectorAll('.gallery-item').forEach((item, i) => item.style.animationDelay = `${i * 0.15}s`);
    document.querySelectorAll('.game-card:not(.available), .website-card:not(.available)').forEach(card => card.classList.add('disabled'));
    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', function () {
            const infoId = this.getAttribute('data-info');
            if (infoId) toggleAdditionalInfo(`info-${infoId}`);
        });
    });
    updateDateInfo();
    setInterval(updateDateInfo, 60000);
    if (typeof setupPDFDownloads === 'function') setupPDFDownloads();
});
