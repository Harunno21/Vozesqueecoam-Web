// ========================================
// MENU MOBILE (Hamburguer)
// ========================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// ========================================
// SMOOTH SCROLL (Rolagem suave)
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Fecha menu mobile após clicar
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        }
    });
});

// ========================================
// ACTIVE NAV LINK
// Destaca link do menu conforme seção visível
// ========================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ========================================
// LINHA DO TEMPO - NAVEGAÇÃO LATERAL
// ========================================
const yearItems = document.querySelectorAll('.year-item');
const yearsList = document.querySelector('.years-list');
const yearsScrollUp = document.querySelector('.years-scroll.up');
const yearsScrollDown = document.querySelector('.years-scroll.down');
const timelineEvents = document.querySelectorAll('.timeline-event');
const timelineFilters = document.querySelectorAll('.timeline-filters .filter-btn');

// Função para mostrar evento específico
function showEvent(year) {
    // Remove active de todos os anos
    yearItems.forEach(item => item.classList.remove('active'));

    // Remove active de todos os eventos
    timelineEvents.forEach(event => event.classList.remove('active'));

    // Ativa o ano clicado
    const activeYearItem = document.querySelector(`.year-item[data-year="${year}"]`);
    if (activeYearItem) {
        activeYearItem.classList.add('active');
        // Garanta que o ano ativo fique visível no centro da lista
        if (yearsList && typeof activeYearItem.scrollIntoView === 'function') {
            activeYearItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Mostra o evento correspondente
    const activeEvent = document.querySelector(`.timeline-event[data-year="${year}"]`);
    if (activeEvent) {
        activeEvent.classList.add('active');
    }
}

// Click nos anos
yearItems.forEach(item => {
    item.addEventListener('click', () => {
        const year = item.getAttribute('data-year');
        showEvent(year);
    });
});

// Botões de rolagem da lista de anos
if (yearsList && yearsScrollUp && yearsScrollDown) {
    const step = 120;
    yearsScrollUp.addEventListener('click', () => {
        yearsList.scrollBy({ top: -step, behavior: 'smooth' });
    });
    yearsScrollDown.addEventListener('click', () => {
        yearsList.scrollBy({ top: step, behavior: 'smooth' });
    });
}

// Garante que o ano ativo inicial esteja visível
const initialActive = document.querySelector('.year-item.active');
if (initialActive && yearsList) {
    initialActive.scrollIntoView({ behavior: 'auto', block: 'center' });
}

// Navegação Anterior/Próximo dentro dos eventos
document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-arrow')) {
        const currentEvent = document.querySelector('.timeline-event.active');
        if (!currentEvent) return;

        const currentYear = currentEvent.getAttribute('data-year');
        const allVisibleYears = Array.from(yearItems)
            .map(item => item.getAttribute('data-year'));

        const currentIndex = allVisibleYears.indexOf(currentYear);

        if (e.target.classList.contains('prev') && currentIndex > 0) {
            showEvent(allVisibleYears[currentIndex - 1]);
        } else if (e.target.classList.contains('next') && currentIndex < allVisibleYears.length - 1) {
            showEvent(allVisibleYears[currentIndex + 1]);
        }
    }
});

// Filtros da timeline
timelineFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active de todos
        timelineFilters.forEach(b => b.classList.remove('active'));
        // Ativa o clicado
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filtra eventos
        timelineEvents.forEach(event => {
            const category = event.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });

        // Filtra anos correspondentes
        yearItems.forEach(item => {
            const year = item.getAttribute('data-year');
            const event = document.querySelector(`.timeline-event[data-year="${year}"]`);
            if (!event) return;

            const category = event.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Mostra primeiro evento visível
        const firstVisible = document.querySelector('.timeline-event[style*="display: block"], .timeline-event:not([style*="display: none"])');
        if (firstVisible) {
            const year = firstVisible.getAttribute('data-year');
            showEvent(year);
        }
    });
});

// ========================================
// CARROSSEL DE NOTÍCIAS
// Rolagem horizontal com botões
// ========================================
const newsTrack = document.getElementById('newsTrack');
const newsPrevBtn = document.getElementById('newsPrev');
const newsNextBtn = document.getElementById('newsNext');

if (newsTrack && newsPrevBtn && newsNextBtn) {
    const scrollAmount = 370; // Largura do card + gap

    newsPrevBtn.addEventListener('click', () => {
        newsTrack.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    newsNextBtn.addEventListener('click', () => {
        newsTrack.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Filtros de notícias
const newsFilters = document.querySelectorAll('.news-filters .filter-btn');
const newsCards = document.querySelectorAll('.news-card');

newsFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        newsFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        newsCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Volta ao início do carrossel
        newsTrack.scrollTo({ left: 0, behavior: 'smooth' });
    });
});

// ========================================
// ÍCONES
// Mostra todos os ícones ao clicar
// ========================================
const viewMoreBtn = document.getElementById('viewMoreBtn');
const hiddenIcons = document.querySelectorAll('.hidden-icon');

if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
        hiddenIcons.forEach(icon => {
            icon.classList.remove('hidden-icon');
            icon.classList.add('show');
        });

        // Esconde o botão após clicar
        viewMoreBtn.style.display = 'none';

        // Animação suave ao aparecer
        setTimeout(() => {
            hiddenIcons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.opacity = '0';
                    icon.style.transform = 'translateY(20px)';
                    icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                    setTimeout(() => {
                        icon.style.opacity = '1';
                        icon.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
        }, 100);
    });
}

// ========================================
// FILTROS DE ÍCONES
// Nacional / Internacional
// ========================================
const iconsFilters = document.querySelectorAll('.icons-filters .filter-btn');
const iconCards = document.querySelectorAll('.icon-card');

iconsFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        iconsFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        iconCards.forEach(card => {
            const origin = card.getAttribute('data-origin');

            if (filter === 'all') {
                card.style.display = 'block';
            } else if (origin === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ========================================
// SCROLL REVEAL
// Animação ao rolar a página
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa cards para animação
document.querySelectorAll('.icon-card, .news-card, .value-card, .contact-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Header is fixed and should remain visible; no hide-on-scroll behavior
const header = document.querySelector('.header');
if (header) header.style.transform = 'translateY(0)';

// ========================================
// MODAL PARA ÍCONES
// Abre detalhes ao clicar em um ícone
// ========================================
iconCards.forEach(card => {
    card.addEventListener('click', () => {
        const name = card.querySelector('h3').textContent;
        const title = card.querySelector('.icon-title').textContent;
        const meta = card.querySelector('.icon-meta').textContent;
        const description = card.querySelector('.icon-description').textContent;
        const img = card.querySelector('img').src;

        // Cria modal simples
        const modal = document.createElement('div');
        modal.className = 'icon-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 1rem;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 1rem; max-width: 700px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
                <button onclick="this.closest('.icon-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 2rem; cursor: pointer; z-index: 1;">×</button>
                <img src="${img}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 1rem 1rem 0 0;">
                <div style="padding: 2rem;">
                    <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${name}</h2>
                    <p style="color: #D4BAFF; font-weight: 600; margin-bottom: 1rem; font-size: 1.125rem;">${title}</p>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">${meta}</p>
                    <p style="color: #4b5563; line-height: 1.8; font-size: 1.125rem;">${description}</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Fecha ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// ==================
// SUGESTÃO DE ÍCONE
// ==================
const openSuggestBtn = document.getElementById('openSuggestBtn');
const suggestModal = document.getElementById('suggestModal');
const closeSuggestModal = document.getElementById('closeSuggestModal');
const suggestForm = document.getElementById('suggestForm');
const clearSuggest = document.getElementById('clearSuggest');
const suggestThankyou = document.getElementById('suggestThankyou');
const closeThankyou = document.getElementById('closeThankyou');

function showSuggestModal(show = true) {
    if (!suggestModal) return;
    suggestModal.setAttribute('aria-hidden', show ? 'false' : 'true');
    if (show) {
        suggestModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        suggestModal.style.display = 'none';
        document.body.style.overflow = '';

        if (suggestThankyou) suggestThankyou.hidden = true;
        if (suggestForm) suggestForm.hidden = false;
    }
}

if (openSuggestBtn) {
    openSuggestBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSuggestModal(true);
    });
}

if (closeSuggestModal) {
    closeSuggestModal.addEventListener('click', () => showSuggestModal(false));
}

if (suggestModal) {
    suggestModal.addEventListener('click', (e) => {
        if (e.target === suggestModal) showSuggestModal(false);
    });
}

if (clearSuggest) {
    clearSuggest.addEventListener('click', () => {
        if (suggestForm) suggestForm.reset();
    });
}

if (suggestForm) {
    suggestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aqui poderia enviar via fetch para API — por enquanto só mostra agradecimento
        suggestForm.hidden = true;
        if (suggestThankyou) suggestThankyou.hidden = false;
    });
}

if (closeThankyou) {
    closeThankyou.addEventListener('click', () => showSuggestModal(false));
}

// ========================================
// CONSOLE LOG
// ========================================
console.log('🏳️‍🌈 Vozes que Ecoam - Site carregado com sucesso!');
console.log('💜 Preservando a memória LGBTQIA+ brasileira');