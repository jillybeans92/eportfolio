/* =========================================================
   main.js
   Jill Hayhurst | CMHC e-Portfolio

   The SITE list below builds the side menu on every page.
   To add, rename, or reorder a page, change it here once.
   ========================================================= */

const SITE = [
  { title: 'Home', href: 'index.html' },
  {
    title: 'Professional Development',
    href: 'professional-development/index.html',
    pages: [
      { title: 'Philosophy of Counseling', href: 'professional-development/philosophy.html' },
      { title: 'Clinical Skills and Theory', href: 'professional-development/clinical-skills.html' },
      { title: 'Research and Scholarship', href: 'professional-development/research.html' },
      { title: 'Service, Leadership, and Advocacy', href: 'professional-development/service.html' },
      { title: 'Mentorship', href: 'professional-development/mentorship.html' },
      { title: 'Wellness and Self-Care', href: 'professional-development/wellness.html' }
    ]
  },
  {
    title: 'Counselor Identity',
    href: 'counselor-identity/index.html',
    pages: [
      { title: 'Psychological Fitness', href: 'counselor-identity/psychological-fitness.html' },
      { title: 'Cultural Diversity', href: 'counselor-identity/cultural-diversity.html' },
      { title: 'Genuineness', href: 'counselor-identity/genuineness.html' },
      { title: 'Flexibility', href: 'counselor-identity/flexibility.html' },
      { title: 'Self-Awareness', href: 'counselor-identity/self-awareness.html' },
      { title: 'Patience', href: 'counselor-identity/patience.html' },
      { title: 'Empathy', href: 'counselor-identity/empathy.html' },
      { title: 'Amiability', href: 'counselor-identity/amiability.html' },
      { title: 'Acceptance', href: 'counselor-identity/acceptance.html' },
      { title: 'Professional Identity', href: 'counselor-identity/professional-identity.html' }
    ]
  }
];

/* Each page's <body> has data-root: "" on top-level pages, "../" inside folders */
const ROOT = document.body.dataset.root || '';
const HERE = document.body.dataset.page || 'index.html';

/* ---------- Side menu ---------- */
(function buildNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  SITE.forEach((group) => {
    const wrap = document.createElement('div');
    wrap.className = 'nav-group';

    const top = document.createElement('a');
    top.href = ROOT + group.href;
    top.textContent = group.title;
    if (group.href === HERE) top.setAttribute('aria-current', 'page');
    wrap.appendChild(top);

    if (group.pages) {
      const list = document.createElement('ul');
      list.className = 'nav-sub';
      group.pages.forEach((page) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = ROOT + page.href;
        a.textContent = page.title;
        if (page.href === HERE) a.setAttribute('aria-current', 'page');
        li.appendChild(a);
        list.appendChild(li);
      });
      wrap.appendChild(list);
    }
    nav.appendChild(wrap);
  });

  const button = document.querySelector('.menu-button');
  if (button) {
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      button.textContent = open ? 'Close' : 'Menu';
    });
  }
})();

/* ---------- Next and previous links inside each section ---------- */
(function buildPager() {
  const pager = document.querySelector('.pager');
  if (!pager) return;

  SITE.forEach((group) => {
    if (!group.pages) return;
    const order = [{ title: group.title + ' Overview', href: group.href }].concat(group.pages);
    const i = order.findIndex((p) => p.href === HERE);
    if (i === -1) return;

    const make = (page, dir) => {
      const a = document.createElement('a');
      a.href = ROOT + page.href;
      a.innerHTML = '<span class="pager-dir">' + dir + '</span><span class="pager-name"></span>';
      a.querySelector('.pager-name').textContent = page.title;
      pager.appendChild(a);
    };
    if (i > 0) make(order[i - 1], 'Previous');
    if (i < order.length - 1) make(order[i + 1], 'Next');
  });
})();

/* ---------- Artifacts ----------
   Each artifact panel has data-file.
   Empty:  data-file=""                                -> shows the "to be added" message
   Filled: data-file="artifacts/cnl-500-theories.pdf"  -> shows the document on the page
   Always write the path starting with artifacts/ (no ../ needed).
   ------------------------------------------------ */
const DOC_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>';

(function setupArtifacts() {
  const panels = document.querySelectorAll('.artifact');
  let added = 0;

  panels.forEach((panel) => {
    const view = panel.querySelector('.artifact-view');
    if (!view) return;
    const file = (panel.dataset.file || '').trim();
    const course = panel.dataset.course || '';

    if (!file) {
      view.innerHTML = '<div class="artifact-empty">' + DOC_ICON + '<span></span></div>';
      view.querySelector('span').textContent = course
        ? 'To be added from ' + course + '.'
        : 'To be added.';
      return;
    }

    added += 1;
    const src = ROOT + file;
    const ext = file.split('.').pop().toLowerCase();

    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = panel.querySelector('.artifact-title')?.textContent || 'Artifact';
      view.appendChild(img);
    } else if (ext === 'pdf') {
      const frame = document.createElement('iframe');
      frame.src = src;
      frame.title = panel.querySelector('.artifact-title')?.textContent || 'Artifact';
      view.appendChild(frame);
    }

    const open = document.createElement('div');
    open.className = 'artifact-open';
    open.innerHTML = '<a target="_blank" rel="noopener">Open in a new tab</a>';
    open.querySelector('a').href = src;
    panel.appendChild(open);
  });

  /* Reflections: show a message until paragraphs are added */
  document.querySelectorAll('.reflection').forEach((box) => {
    if (!box.querySelector('p')) {
      const note = document.createElement('div');
      note.className = 'reflection-empty';
      note.textContent = 'Reflective narrative to be added in ' + (box.dataset.course || 'CNL-664B') + '.';
      box.appendChild(note);
    } else {
      added += 1;
    }
  });

  /* Progress line under the title */
  const total = panels.length + document.querySelectorAll('.reflection').length;
  const label = document.querySelector('.progress-label');
  const fill = document.querySelector('.progress-fill');
  if (label && fill && total) {
    label.textContent = added + ' of ' + total + ' added';
    requestAnimationFrame(() => { fill.style.width = Math.round((added / total) * 100) + '%'; });
  }
})();

/* ---------- Year in the sidebar ---------- */
(function setYear() {
  const year = document.querySelector('.year');
  if (year) year.textContent = new Date().getFullYear();
})();
