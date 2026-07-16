/**
 * =============================================
 * LANDING PAGE CLÁSSICA - SCRIPTS
 * Comentários para facilitar a customização.
 * =============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do DOM ---
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopButton = document.querySelector('.back-to-top');
    const faqButtons = document.querySelectorAll('.faq-question');
    const allNavItems = document.querySelectorAll('.nav-list a'); // links dentro do menu

    // --- MENU HAMBURGUER ---
    const toggleMenu = (forceClose = false) => {
        const isActive = navList.classList.contains('active');
        if (forceClose || isActive) {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // desbloqueia rolagem
        } else {
            navList.classList.add('active');
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // evita rolagem ao fundo
        }
    };

    hamburger.addEventListener('click', () => toggleMenu());

    // Fecha menu ao clicar em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggleMenu(true);
            }
        });
    });

    // Fecha menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            toggleMenu(true);
            hamburger.focus();
        }
    });

    // --- SCROLL SUAVE PARA LINKS ÂNCORA ---
    allNavItems.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- ACORDEÃO FAQ ---
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            // Fecha todos os outros (opcional, para comportamento de acordeão único)
            faqButtons.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
                const answer = document.getElementById(btn.getAttribute('aria-controls'));
                if (answer) answer.hidden = true;
            });

            // Abre o clicado se não estava expandido
            if (!expanded) {
                button.setAttribute('aria-expanded', 'true');
                const answer = document.getElementById(button.getAttribute('aria-controls'));
                if (answer) answer.hidden = false;
            }
            // Se já estava expandido, fecha (toggle)
            // Comportamento alternativo: apenas toggle no item clicado
            // Comentamos a linha de fechar todos e fazemos toggle simples:
            /*
            const answer = document.getElementById(button.getAttribute('aria-controls'));
            if (answer) answer.hidden = expanded;
            */
        });
    });

    // --- BOTÃO VOLTAR AO TOPO ---
    const toggleBackToTop = () => {
        if (window.scrollY > 400) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- FECHAR MENU AO REDIMENSIONAR PARA DESKTOP ---
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && navList.classList.contains('active')) {
            toggleMenu(true);
        }
    });

    // --- Inicialização: garante que menu comece fechado ---
    navList.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
});
