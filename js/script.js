document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile - Lógica para abrir/fechar o menu em telas pequenas
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // Rolagem Suave (Smooth Scrolling) ao clicar nos links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Fecha o menu mobile se estiver aberto
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('open');
                }
            }
        });
    });

    // Efeito de Sombra no Header ao rolar a página
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none'; // Remove a sombra no topo
        }
    });

    // Abas do Menu (Alternar entre Menu Fixo e Semanal)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões e conteúdos
            tabBtns.forEach(b => b.classList.remove('active'));
            menuContents.forEach(c => c.classList.remove('active'));

            // Adiciona a classe 'active' no botão clicado
            btn.classList.add('active');

            // Mostra o conteúdo correspondente
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Scroll arrows: hide/show based on scroll position, click to scroll
    const menuTabs = document.getElementById('menu-category-tabs');
    const tabsArrow = document.getElementById('menu-tabs-arrow');
    const tabsArrowLeft = document.getElementById('menu-tabs-arrow-left');

    function updateTabsArrow() {
        if (!menuTabs) return;
        const atEnd = menuTabs.scrollLeft + menuTabs.clientWidth >= menuTabs.scrollWidth - 4;
        const atStart = menuTabs.scrollLeft <= 4;
        if (tabsArrow) tabsArrow.classList.toggle('hidden', atEnd);
        if (tabsArrowLeft) tabsArrowLeft.classList.toggle('hidden', atStart);
    }

    if (menuTabs) {
        menuTabs.addEventListener('scroll', updateTabsArrow, { passive: true });
        updateTabsArrow();
        window.addEventListener('resize', updateTabsArrow);
    }

    // Right arrow click → scroll right
    if (tabsArrow && menuTabs) {
        tabsArrow.addEventListener('click', () => {
            menuTabs.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }

    // Left arrow click → scroll left
    if (tabsArrowLeft && menuTabs) {
        tabsArrowLeft.addEventListener('click', () => {
            menuTabs.scrollBy({ left: -200, behavior: 'smooth' });
        });
    }

    // Modais Legais: Impressum & Datenschutz
    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    document.getElementById('btn-impressum')?.addEventListener('click', () => openModal('modal-impressum'));
    document.getElementById('btn-datenschutz')?.addEventListener('click', () => openModal('modal-datenschutz'));

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.legal-modal').forEach(m => m.classList.remove('open'));
            document.body.style.overflow = '';
        });
    });

    // Fecha ao clicar fora do modal (no backdrop)
    document.querySelectorAll('.legal-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Fecha com tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.legal-modal').forEach(m => m.classList.remove('open'));
            closeEventPopup();
            document.body.style.overflow = '';
        }
    });

    // ===== EVENT POPUP: Sizilianische Tage =====
    const eventPopup = document.getElementById('event-popup');

    function openEventPopup() {
        eventPopup.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeEventPopup() {
        if (!eventPopup) return;
        eventPopup.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Show popup after 800ms on every visit
    setTimeout(openEventPopup, 800);

    document.getElementById('event-popup-close')?.addEventListener('click', closeEventPopup);
    document.getElementById('event-popup-skip')?.addEventListener('click', closeEventPopup);

    // Close on backdrop click
    eventPopup?.addEventListener('click', (e) => {
        if (e.target === eventPopup) closeEventPopup();
    });
});

