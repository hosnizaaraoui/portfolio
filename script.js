/* =================================================================
   Hyprland-inspired portfolio — interactions
   ================================================================= */

(function () {
  'use strict';
  // Workspace Number.
  const wsTag = document.querySelector('.ws-tag');

  const PROJECTS = window.PROJECTS || {};
  const DOCUMENTS = window.DOCUMENTS || [];

  /* ---------- RENDER PROJECT CARDS ---------- */
  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const cardHTML = Object.values(PROJECTS).map((p) => `
      <article class="project-card" data-project="${p.slug}" tabindex="0" role="button" aria-label="${p.name} details">
        <div class="project-card-bar mono">
          <span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>
          <span class="project-bar-title">${p.slug}://</span>
        </div>
        <div class="project-card-body">
          <span class="status ${p.statusClass}">${p.status}</span>
          <h3>${p.name}</h3>
          <p class="desc">${p.shortDesc}</p>
          <div class="tech-tags">
            ${p.technologies.map((t) => `<span>${t}</span>`).join('')}
          </div>
          <div class="card-footer mono">
            <span class="gh-link">→ open</span>
            <span>details →</span>
          </div>
        </div>
      </article>
    `).join('');

    grid.innerHTML = cardHTML;

    // Rebind interactions now that cards exist
    bindProjectCards();
  }

  /* ---------- DOCS STATE ---------- */
  let docTypeFilter = 'all';
  let docLangFilter = 'all';
  let docQuery = '';

  /* ---------- HIGHLIGHT MATCHES ---------- */
  function escapeHTML(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlight(text, q) {
    const safe = escapeHTML(text);
    if (!q) return safe;
    // Escape regex special chars in the query
    const rx = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return safe.replace(rx, '<mark>$1</mark>');
  }

  /* ---------- RENDER ---------- */
  function renderDocs() {
    const grid = document.getElementById('docsGrid');
    const empty = document.getElementById('docsEmpty');
    const count = document.getElementById('docsCount');
    if (!grid) return;

    const q = docQuery.trim().toLowerCase();

    const items = DOCUMENTS.filter((d) => {
      if (docTypeFilter !== 'all' && d.type !== docTypeFilter) return false;
      if (docLangFilter !== 'all' && d.lang !== docLangFilter) return false;
      if (!q) return true;

      const haystack = [
        d.title,
        d.description,
        d.type,
        d.lang,
        d.date,
        ...(d.tags || [])
      ].join(' ').toLowerCase();

      return haystack.includes(q);
    });

    if (count) count.textContent = items.length + (items.length === 1 ? ' doc' : ' docs');

    if (!items.length) {
      grid.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    grid.innerHTML = items.map((d) => `
    <a class="doc-card" href="${encodeURI(d.pdf)}" target="_blank" rel="noopener"
       aria-label="Open ${escapeHTML(d.title)} (PDF)">
      <div class="doc-thumb">
        <div class="doc-badges">
          <span class="doc-badge doc-type-badge">${escapeHTML(d.type)}</span>
          <span class="doc-badge doc-lang-badge">${escapeHTML(d.lang)}</span>
        </div>
        ${d.thumbnail
        ? `<img src="${encodeURI(d.thumbnail)}" alt="" loading="lazy"
                  onerror="this.outerHTML='<div class=&quot;doc-fallback&quot;>// no preview</div>'">`
        : `<div class="doc-fallback">// no preview</div>`}
      </div>
      <div class="doc-body">
        <h3>${highlight(d.title, q)}</h3>
        <div class="doc-date">${escapeHTML(d.date)}</div>
        <p>${highlight(d.description, q)}</p>
        <div class="doc-footer">
          <span>${escapeHTML(d.lang)} · pdf</span>
          <span class="open-link">open →</span>
        </div>
      </div>
    </a>
  `).join('');
  }

  /* ---------- FILTERS + SEARCH ---------- */
  function initDocFilters() {
    const typeBar = document.getElementById('docsFilter');
    const langBar = document.getElementById('docsLangFilter');
    const search = document.getElementById('docsSearch');
    const clear = document.getElementById('docsSearchClear');

    if (typeBar) {
      typeBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        typeBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        docTypeFilter = btn.getAttribute('data-filter');
        renderDocs();
      });
    }

    if (langBar) {
      langBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        langBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        docLangFilter = btn.getAttribute('data-lang');
        renderDocs();
      });
    }

    if (search) {
      let t;
      search.addEventListener('input', (e) => {
        docQuery = e.target.value || '';
        if (clear) clear.hidden = !docQuery;
        clearTimeout(t);
        t = setTimeout(renderDocs, 120);   // debounce
      });

      // escape to clear
      search.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && docQuery) {
          search.value = '';
          docQuery = '';
          if (clear) clear.hidden = true;
          renderDocs();
        }
      });
    }

    if (clear) {
      clear.addEventListener('click', () => {
        if (search) search.value = '';
        docQuery = '';
        clear.hidden = true;
        renderDocs();
        if (search) search.focus();
      });
    }
  }
  /* ---------- DOM refs ---------- */
  const dockLinks = document.querySelectorAll('.dock-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalStatus = document.getElementById('modalStatus');
  const modalContent = document.getElementById('modalContent');
  const copyEmailBtn = document.getElementById('copyEmail');
  const clockEl = document.getElementById('clock');

  /* ---------- CLOCK ---------- */
  function updateClock() {
    if (!clockEl) return;
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    clockEl.textContent = hh + ':' + mm;
  }
  updateClock();
  setInterval(updateClock, 30000);

  /* ---------- MOBILE NAV ---------- */
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- ACTIVE NAV HIGHLIGHT ---------- */
  const sections = document.querySelectorAll('section[id]');

  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    let currentId = 'home';

    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    });

    dockLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
    mobileLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });

    const activeDock = document.querySelector('.dock-link.active');
    if (wsTag && activeDock) {
      wsTag.textContent = activeDock.getAttribute('data-ws') || '1';
    }
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  window.addEventListener('load', setActiveNav);

  /* ---------- THEME TOGGLE ---------- */
  const THEME_KEY = 'hz-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light');
      if (themeToggle) themeToggle.textContent = '☀️';
      if (themeLabel) themeLabel.textContent = 'LGT';
    } else {
      document.body.classList.remove('light');
      if (themeToggle) themeToggle.textContent = '🌙';
      if (themeLabel) themeLabel.textContent = 'DRK';
    }
  }

  const stored = localStorage.getItem(THEME_KEY);
  applyTheme(stored || 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.body.classList.contains('light') ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---------- PROJECT MODAL ---------- */
  function openProjectModal(projectId) {
    const p = PROJECTS[projectId];
    if (!p) return;

    modalTitle.textContent = p.name;
    modalStatus.innerHTML =
      '<span class="status ' + p.statusClass + '">' + p.status + '</span>';

    let html = '';
    html += '<h4>Description</h4><p>' + p.description + '</p>';
    if (p.problem) html += '<h4>Problem</h4><p>' + p.problem + '</p>';
    if (p.goal) html += '<h4>Goal</h4><p>' + p.goal + '</p>';
    if (p.architecture) html += '<h4>Architecture</h4><p>' + p.architecture + '</p>';

    const techList = p.techFull || p.technologies;
    if (techList && techList.length) {
      html += '<h4>Technologies</h4><div class="tech-tags">';
      techList.forEach((t) => { html += '<span>' + t + '</span>'; });
      html += '</div>';
    }
    if (p.features && p.features.length) {
      html += '<h4>Key Features</h4><ul>';
      p.features.forEach((f) => { html += '<li>' + f + '</li>'; });
      html += '</ul>';
    }
    if (p.learnings) html += '<h4>What I Learned</h4><p>' + p.learnings + '</p>';
    if (p.github) {
      html += '<h4>Repository</h4><p><a href="' + p.github +
        '" target="_blank" rel="noopener">' + p.github + '</a></p>';
    }

    modalContent.innerHTML = html;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeProjectModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------- BIND PROJECT CARDS (called after render) ---------- */
  function bindProjectCards() {
    document.querySelectorAll('.project-card').forEach((card) => {
      const id = card.getAttribute('data-project');
      card.addEventListener('click', () => openProjectModal(id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(id);
        }
      });
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* ---------- LAB EXPAND ---------- */
  document.querySelectorAll('.lab-card').forEach((card) => {
    const header = card.querySelector('.lab-header');
    if (!header) return;

    const toggle = () => {
      const expanded = card.classList.toggle('expanded');
      header.setAttribute('aria-expanded', String(expanded));
      const chev = header.querySelector('.chevron');
      if (chev) chev.textContent = expanded ? '[-]' : '[+]';
    };

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    }
  }

  /* ---------- COPY EMAIL ---------- */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || '';
      const original = copyEmailBtn.innerHTML;

      try {
        await navigator.clipboard.writeText(email);
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.innerHTML = '✓ copied';
        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.innerHTML = original;
        }, 1800);
      } catch (err) {
        const tmp = document.createElement('textarea');
        tmp.value = email;
        document.body.appendChild(tmp);
        tmp.select();
        try {
          document.execCommand('copy');
          copyEmailBtn.innerHTML = '✓ copied';
          setTimeout(() => { copyEmailBtn.innerHTML = original; }, 1800);
        } catch (e) { /* ignore */ }
        document.body.removeChild(tmp);
      }
    });
  }

  /* ---------- DOWNLOAD CV PLACEHOLDER ---------- */
  const downloadCV = document.getElementById('downloadCV');
  if (downloadCV) {
    downloadCV.addEventListener('click', (e) => {
    });
  }

  /* ---------- INIT ---------- */
  renderProjects();
  renderDocs();
  initDocFilters();
  initReveal();

})();