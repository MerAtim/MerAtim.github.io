/* =========================================================
   Portafolio · Maria Mercedes Atim
   ========================================================= */
(function () {
  'use strict';

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tema claro / oscuro ---------- */
  function initTheme() {
    const btn = $('#themeToggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const current = root.getAttribute('data-theme');
      let next;

      if (current === 'light') {
        next = 'dark';
      } else if (current === 'dark') {
        next = 'light';
      } else {
        // Sin elección previa: invertimos lo que muestra el sistema.
        const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        next = systemLight ? 'dark' : 'light';
      }

      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* modo privado */ }
    });
  }

  /* ---------- Navegación ---------- */
  function initNav() {
    const nav = $('#nav');
    const links = $('.rail__nav');
    const burger = $('#hamburger');

    if (burger && links) {
      burger.addEventListener('click', () => {
        const open = links.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', String(open));
        burger.innerHTML = open
          ? '<i class="fas fa-xmark"></i>'
          : '<i class="fas fa-bars"></i>';
      });

      $$('#navLinks a').forEach((a) => {
        a.addEventListener('click', () => {
          links.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
          burger.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });
    }

    const sections = $$('main section[id]');
    const navAnchors = $$('#navLinks a');

    function onScroll() {
      const y = window.scrollY;

      if (nav) nav.classList.toggle('is-stuck', y > 12);

      const toTop = $('#toTop');
      if (toTop) toTop.classList.toggle('is-visible', y > 600);

      // Tomamos como referencia un punto al 35% de la ventana, no el borde
      // superior: así la sección activa coincide con lo que se está mirando.
      const probe = y + window.innerHeight * 0.35;
      let currentId = sections.length ? sections[0].id : '';
      sections.forEach((sec) => {
        if (probe >= sec.offsetTop) currentId = sec.id;
      });

      // Al final de la página gana la última sección, que nunca llega a cruzar
      // el punto de referencia por sí sola.
      const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length) currentId = sections[sections.length - 1].id;

      navAnchors.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + currentId);
      });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    }, { passive: true });

    onScroll();
  }

  /* ---------- Aparición al hacer scroll ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        setTimeout(() => el.classList.add('is-in'), Math.min(i * 70, 280));
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el) => io.observe(el));
  }

  /* ---------- Máquina de escribir del hero ---------- */
  let twFrase = 0;
  let twChars = 0;
  let twBorrando = false;
  let twArrancado = false;

  function reiniciarTypewriter() {
    const target = $('#typedText');
    if (!target) return;
    twFrase = 0;
    twChars = 0;
    twBorrando = false;
    if (reduceMotion) target.textContent = FRASES[LANG][0];
  }

  function initTypewriter() {
    const target = $('#typedText');
    if (!target || twArrancado) return;

    if (reduceMotion) {
      target.textContent = FRASES[LANG][0];
      return;
    }

    twArrancado = true;

    function tick() {
      const lista = FRASES[LANG] || FRASES.es;
      const full = lista[twFrase % lista.length];
      twChars += twBorrando ? -1 : 1;
      if (twChars < 0) twChars = 0;
      target.textContent = full.slice(0, twChars);

      let delay = twBorrando ? 35 : 65;

      if (!twBorrando && twChars >= full.length) {
        delay = 1900;
        twBorrando = true;
      } else if (twBorrando && twChars === 0) {
        twBorrando = false;
        twFrase = (twFrase + 1) % lista.length;
        delay = 350;
      }

      setTimeout(tick, delay);
    }

    tick();
  }


  /* ---------- Idioma (español / inglés) ---------- */
  // El español vive en el HTML; el inglés en js/i18n.js.
  // Guardamos el original en memoria para poder volver sin recargar.
  const DICT = (window.I18N && window.I18N.en) || {};
  const ORIG = new WeakMap();
  const ORIG_ATTR = new WeakMap();
  // [ selector, atributo a escribir, propiedad en dataset ]
  const ATTRS = [
    ['[data-i18n-ph]',   'placeholder', 'i18nPh'],
    ['[data-i18n-aria]', 'aria-label',  'i18nAria'],
    ['[data-i18n-alt]',  'alt',         'i18nAlt'],
    ['[data-i18n-href]', 'href',        'i18nHref']
  ];

  let LANG = 'es';
  const DOC = { title: null, desc: null };

  const FRASES = {
    es: ['Desarrolladora Full Stack', 'Backend con Java y Spring Boot',
         'Frontend con Vue 3 y React', 'Testing y arquitectura limpia'],
    en: ['Full Stack Developer', 'Backend with Java and Spring Boot',
         'Frontend with Vue 3 and React', 'Testing and clean architecture']
  };

  function traducir(raiz, lang) {
    raiz.querySelectorAll('[data-i18n]').forEach((el) => {
      if (!ORIG.has(el)) ORIG.set(el, el.innerHTML);
      const en = DICT[el.dataset.i18n];
      el.innerHTML = (lang === 'en' && en != null) ? en : ORIG.get(el);
    });

    ATTRS.forEach(([sel, attr, prop]) => {
      raiz.querySelectorAll(sel).forEach((el) => {
        const clave = el.dataset[prop];
        if (!clave) return;
        if (!ORIG_ATTR.has(el)) ORIG_ATTR.set(el, {});
        const guardado = ORIG_ATTR.get(el);
        if (!(attr in guardado)) guardado[attr] = el.getAttribute(attr);
        const en = DICT[clave];
        el.setAttribute(attr, (lang === 'en' && en != null) ? en : guardado[attr]);
      });
    });
  }

  function aplicarIdioma(lang) {
    LANG = lang;
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;

    traducir(document, lang);

    // Guardamos el título y la descripción originales para poder volver al español.
    const meta = document.querySelector('meta[name="description"]');
    if (DOC.title == null) {
      DOC.title = document.title;
      DOC.desc = meta ? meta.getAttribute('content') : null;
    }
    document.title = (lang === 'en' && DICT['doc.title']) ? DICT['doc.title'] : DOC.title;
    if (meta) {
      meta.setAttribute('content',
        (lang === 'en' && DICT['doc.desc']) ? DICT['doc.desc'] : DOC.desc);
    }

    const btn = document.getElementById('langToggle');
    if (btn) {
      const aIngles = lang !== 'en';
      btn.setAttribute('aria-label', aIngles ? 'Switch to English' : 'Cambiar a español');
      btn.setAttribute('title', aIngles ? 'English' : 'Español');
    }

    reiniciarTypewriter();
  }

  function initIdioma() {
    let guardado = null;
    try { guardado = localStorage.getItem('lang'); } catch (e) { /* modo privado */ }

    // Sin elección previa: si el navegador no está en español, mostramos inglés.
    const inicial = (guardado === 'es' || guardado === 'en')
      ? guardado
      : ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');

    aplicarIdioma(inicial);

    const btn = document.getElementById('langToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const siguiente = LANG === 'en' ? 'es' : 'en';
      aplicarIdioma(siguiente);
      try { localStorage.setItem('lang', siguiente); } catch (e) { /* modo privado */ }
    });
  }

  /* ---------- Modales ---------- */
  let lastFocused = null;

  function openModal(modal) {
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const closeBtn = $('.modal__close', modal);
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function initModals() {
    const projectModal = $('#projectModal');
    const projectBody = $('#projectModalBody');
    const imageModal = $('#imageModal');
    const imageEl = $('#imageModalImg');

    // Detalle de proyecto
    $$('.js-project').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tpl = document.getElementById('pd-' + btn.dataset.project);
        if (!tpl || !projectModal || !projectBody) return;
        projectBody.innerHTML = '';
        projectBody.appendChild(tpl.content.cloneNode(true));
        traducir(projectBody, LANG);   // el contenido de <template> no se traduce solo
        projectModal.scrollTop = 0;
        const panel = $('.modal__panel', projectModal);
        if (panel) panel.scrollTop = 0;
        openModal(projectModal);
      });
    });

    // Diplomas
    $$('.js-image').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!imageModal || !imageEl) return;
        imageEl.src = btn.dataset.src;
        imageEl.alt = btn.dataset.alt || 'Diploma';
        openModal(imageModal);
      });
    });

    // Cierre por botón, por fondo y por Escape
    $$('.modal').forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('[data-close]')) closeModal(modal);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const open = $('.modal.is-open');
      if (open) closeModal(open);
    });
  }

  /* ---------- Contadores de las métricas ---------- */
  function initCounters() {
    const nums = $$('[data-count]');
    if (!nums.length || reduceMotion || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.textContent.replace(/[0-9]/g, '');
        let value = 0;

        const step = () => {
          value += Math.max(1, Math.ceil(target / 22));
          if (value >= target) value = target;
          el.textContent = value + suffix;
          if (value < target) requestAnimationFrame(step);
        };

        el.textContent = '0' + suffix;
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    nums.forEach((el) => io.observe(el));
  }

  /* ---------- Formulario de contacto ---------- */
  function initForm() {
    const form = $('#contactForm');
    const status = $('#formStatus');
    if (!form || !status) return;

    function show(kind, message) {
      status.hidden = false;
      status.className = 'form__status form__status--' + kind;
      status.innerHTML =
        '<i class="fas ' +
        (kind === 'ok' ? 'fa-circle-check' : 'fa-triangle-exclamation') +
        '"></i><span>' + message + '</span>';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = $('button[type="submit"]', form);
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      status.hidden = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          form.reset();
          show('ok', 'Mensaje enviado. Te respondo a la brevedad.');
        } else {
          show('err', 'No se pudo enviar. Escribime a mariamercedesatim@gmail.com.');
        }
      } catch (err) {
        show('err', 'Hubo un problema de conexión. Probá de nuevo o escribime por email.');
      } finally {
        btn.disabled = false;
        btn.innerHTML = original;
      }
    });
  }


  /* ---------- Elegir el idioma del CV al descargarlo ---------- */
  function initCV() {
    const btn = $('#cvBtn');
    const menu = $('#cvMenu');
    if (!btn || !menu) return;

    function abrir(si) {
      menu.hidden = !si;
      btn.setAttribute('aria-expanded', String(si));
      const caret = $('.cv-pick__caret', btn);
      if (caret) caret.style.transform = si ? 'rotate(180deg)' : '';
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      abrir(menu.hidden);
    });

    // Al elegir un idioma, cerramos el menú
    $$('a', menu).forEach((a) => a.addEventListener('click', () => abrir(false)));

    document.addEventListener('click', (e) => {
      if (!menu.hidden && !e.target.closest('.cv-pick')) abrir(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) {
        abrir(false);
        btn.focus();
      }
    });
  }

  /* ---------- Año del footer ---------- */
  function initYear() {
    const el = $('#year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Arranque ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initIdioma();
    initNav();
    initReveal();
    initTypewriter();
    initModals();
    initCounters();
    initForm();
    initCV();
    initYear();
  });
})();
