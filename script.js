(() => {
  const LANG_KEY = 'antichi-aromi-lang';
  const getLang = () => (localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'de');
  const video = document.querySelector('#hero-video');
  const loader = document.querySelector('.loader');
  const loaderBar = loader.querySelector('i');
  const loaderPercent = loader.querySelector('b');
  const nav = document.querySelector('.nav');
  const sommerpauseModal = document.getElementById('sommerpause');
  const sommerpauseEnds = new Date('2026-08-18T00:00:00').getTime();
  const shouldShowSommerpause = () => Boolean(sommerpauseModal) && Date.now() < sommerpauseEnds;
  const openModal = modal => { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); modal.querySelector('.modal-close').focus(); };
  const source = 'assets/video/restaurant.mp4';
  const weeklySection = document.querySelector('#weekly-menu');

  const renderWeeklyMenu = lang => {
    const items = window.WEEKLY_MENU[lang];
    weeklySection.hidden = !items.length;
    weeklySection.querySelector('.weekly-items').innerHTML = items.map(item => `<article><h4>${item.name}</h4><p>${item.description}</p><b>${item.price}</b></article>`).join('');
  };

  const renderFallbackMenu = lang => {
    const menu = document.querySelector('.menu-list');
    const fragments = window.MENU_FALLBACK[lang].map(category => {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.append(category.title, Object.assign(document.createElement('span'), { textContent: '+' }));
      const items = document.createElement('div');
      items.className = 'menu-items';
      category.items.forEach(item => {
        const row = document.createElement('p');
        const itemName = document.createElement('b'); itemName.textContent = item.name;
        const itemPrice = document.createElement('span'); itemPrice.textContent = item.price;
        const itemDesc = document.createElement('small'); itemDesc.textContent = item.desc;
        row.append(itemName, itemPrice, itemDesc);
        items.append(row);
      });
      details.append(summary, items);
      return details;
    });
    fragments[0].open = true;
    menu.replaceChildren(...fragments);
  };

  const applyTranslations = lang => {
    document.documentElement.lang = lang;
    const dict = window.I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => { const val = dict[el.dataset.i18n]; if (val !== undefined) el.innerHTML = val; });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split(':');
        const val = dict[key];
        if (val !== undefined) el.setAttribute(attr, val);
      });
    });
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
    renderWeeklyMenu(lang);
    renderFallbackMenu(lang);
  };

  let menuRequestId = 0;
  const loadFullMenu = async lang => {
    const requestId = ++menuRequestId;
    try {
      const response = await fetch(lang === 'en' ? 'assets/menu-source.en.html' : 'assets/menu-source.html');
      if (!response.ok) throw new Error('menu source unavailable');
      if (requestId !== menuRequestId) return;
      const source = new DOMParser().parseFromString(await response.text(), 'text/html');
      const menu = document.querySelector('.menu-list');
      const tabLabels = new Map([...source.querySelectorAll('.tab-btn')].map(tab => [tab.dataset.target, tab.textContent.replace('⭐', '').trim()]));
      const excludedCategories = ['cat-empfehlung', 'cat-bambini', 'cat-caffe', 'cat-getraenke', 'cat-vini'];
      const fragments = [];
      source.querySelectorAll('#menu .menu-content').forEach(content => {
        if (excludedCategories.includes(content.id)) return;
        const groups = [...content.querySelectorAll(':scope > .menu-category')];
        groups.forEach((group, index) => {
          const entries = [...group.querySelectorAll('.menu-item, .empfehlung-item')];
          if (!entries.length) return;
          const title = group.querySelector(':scope > h3')?.textContent.trim() || (index === 0 ? tabLabels.get(content.id) : `${tabLabels.get(content.id)} – Auswahl`);
          const details = document.createElement('details');
          const summary = document.createElement('summary');
          summary.append(title, Object.assign(document.createElement('span'), { textContent: '+' }));
          const items = document.createElement('div');
          items.className = 'menu-items';
          entries.forEach(entry => {
            const row = document.createElement('p');
            const name = entry.querySelector('.item-name')?.textContent.trim();
            const price = entry.querySelector('.item-price')?.textContent.trim();
            const description = entry.querySelector('.item-desc')?.textContent.trim();
            if (!name || !price) return;
            const itemName = document.createElement('b'); itemName.textContent = name;
            const itemPrice = document.createElement('span'); itemPrice.textContent = price;
            row.append(itemName, itemPrice);
            if (description) { const itemDescription = document.createElement('small'); itemDescription.textContent = description; row.append(itemDescription); }
            items.append(row);
          });
          if (items.children.length) { details.append(summary, items); fragments.push(details); }
        });
      });
      if (fragments.length) { fragments[0].open = true; menu.replaceChildren(...fragments); }
    } catch { /* The curated menu in the HTML remains available as a fallback. */ }
  };

  let currentLang = getLang();
  applyTranslations(currentLang);
  loadFullMenu(currentLang);

  document.querySelectorAll('.lang-toggle button').forEach(button => button.addEventListener('click', () => {
    const lang = button.dataset.lang;
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations(lang);
    loadFullMenu(lang);
  }));

  const removeLoader = () => {
    if (!loader) return;
    gsap.to(loader, { autoAlpha: 0, duration: .45, onComplete: () => loader.remove() });
  };

  const loadVideo = async () => {
    try {
      const response = await fetch(source);
      const total = Number(response.headers.get('Content-Length')) || 0;
      if (!response.body || !total) throw new Error('stream unavailable');
      const reader = response.body.getReader();
      const chunks = [];
      let loaded = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value); loaded += value.length;
        const pct = Math.min(100, Math.round((loaded / total) * 100));
        loaderBar.style.width = `${pct}%`; loaderPercent.textContent = pct;
      }
      video.src = URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' }));
    } catch {
      video.src = source;
    }
    video.addEventListener('loadedmetadata', init, { once: true });
    video.load();
  };

  const init = () => {
    loaderBar.style.width = '100%'; loaderPercent.textContent = '100';
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: .09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    gsap.set(nav, { yPercent: -100, y: 0, autoAlpha: 0 });
    gsap.set('.scene', { autoAlpha: 0 });
    removeLoader();
    setTimeout(() => { if (!sommerpauseModal || !sommerpauseModal.classList.contains('open')) lenis.start(); }, 450);

    let seeking = false, desiredTime = 0, lastSeek = 0;
    const seek = () => {
      if (seeking || Math.abs(video.currentTime - desiredTime) < .034) return;
      seeking = true; lastSeek = performance.now(); video.currentTime = desiredTime;
      setTimeout(() => { if (seeking && performance.now() - lastSeek >= 250) { seeking = false; seek(); } }, 255);
    };
    video.addEventListener('seeked', () => { seeking = false; seek(); });
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: '#stage', pin: true, anticipatePin: 1, scrub: .6, start: 'top top', end: '+=460%', onUpdate(self) { desiredTime = Math.min(self.progress / .88, 1) * video.duration; seek(); } }
    });
    timeline.to('.hero-copy', { autoAlpha: 0, y: -35, duration: .13 }, 0)
      .to('.scene-one', { autoAlpha: 1, duration: .06 }, .16).to('.scene-one', { autoAlpha: 0, duration: .06 }, .29)
      .to('.scene-two', { autoAlpha: 1, duration: .06 }, .34).to('.scene-two', { autoAlpha: 0, duration: .06 }, .48)
      .to('.scene-three', { autoAlpha: 1, duration: .06 }, .54).to('.scene-three', { autoAlpha: 0, duration: .06 }, .68)
      .to('.scene-four', { autoAlpha: 1, duration: .08 }, .78)
      .set({}, {}, 1);
    ScrollTrigger.create({ trigger: '#stage', start: 'bottom bottom', onEnter: () => gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: .4, overwrite: 'auto' }), onLeaveBack: () => gsap.to(nav, { yPercent: -100, autoAlpha: 0, duration: .3, overwrite: 'auto' }) });
    gsap.utils.toArray('.dish-card').forEach((card, index) => gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 88%' }, autoAlpha: 0, y: 50, filter: 'blur(8px)', duration: .8, delay: index % 2 * .08, ease: 'power3.out' }));
    document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => { const target = document.querySelector(link.getAttribute('href')); if (target) { event.preventDefault(); lenis.scrollTo(target); } }));
    const closeModal = modal => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); lenis.start(); };
    document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => { const modal = document.getElementById(button.dataset.modal); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); lenis.stop(); modal.querySelector('.modal-close').focus(); }));
    document.querySelectorAll('.modal').forEach(modal => { modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal)); modal.addEventListener('click', event => { if (event.target === modal) closeModal(modal); }); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal); });
    if (shouldShowSommerpause()) { openModal(sommerpauseModal); lenis.stop(); }
    document.querySelectorAll('.reserve').forEach(button => button.addEventListener('pointermove', event => { const box = button.getBoundingClientRect(); gsap.to(button, { x: (event.clientX - box.left - box.width / 2) * .15, y: (event.clientY - box.top - box.height / 2) * .15, duration: .25 }); }));
    document.querySelectorAll('.reserve').forEach(button => button.addEventListener('pointerleave', () => gsap.to(button, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.35)' })));
    window.addEventListener('pointerdown', () => video.play().then(() => video.pause()).catch(() => {}), { once: true });
  };
  loadVideo();
})();
