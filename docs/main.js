'use strict';

const GOOGLE_SCRIPT_URL = '';

// ─── SCROLL PROGRESS BAR ───
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
}

// ─── NAV SCROLL STATE ───
const nav = document.getElementById('nav');
function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}

// ─── BACK TO TOP ───
const backToTop = document.getElementById('backToTop');
function updateBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── STICKY MOBILE CTA ───
const stickyCta = document.getElementById('stickyCta');
const heroSection = document.getElementById('hero');
function updateStickyCta() {
  if (!heroSection) return;
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  stickyCta.classList.toggle('visible', heroBottom < 0);
}

// ─── CONSOLIDATED SCROLL HANDLER ───
window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateNav();
  updateBackToTop();
  updateStickyCta();
}, { passive: true });

// Initial calls
updateScrollProgress();
updateNav();
updateBackToTop();
updateStickyCta();

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobileMenu');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});


// ─── HERO PARTICLES ───
const particleContainer = document.getElementById('heroParticles');
if (particleContainer) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `animation-duration:${6 + Math.random() * 10}s`,
      `animation-delay:${Math.random() * 8}s`,
      `width:${2 + Math.random() * 4}px`,
      `height:${2 + Math.random() * 4}px`,
    ].join(';');
    fragment.appendChild(p);
  }
  particleContainer.appendChild(fragment);
}

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── COUNTUP ANIMATION ───
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCountup(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = target > 1000 ? 2200 : 1400;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const current = Math.round(easedProgress * target);
    el.textContent = current.toLocaleString('vi-VN') + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

const countupObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCountup(entry.target);
      countupObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.countup').forEach(el => countupObserver.observe(el));

// ─── MAZE (PAINPOINTS) ───
(function () {
  const wrapper = document.getElementById('mazeWrapper');
  const spineFill = document.getElementById('mazeSpineFill');
  const mazeRows = document.querySelectorAll('[data-maze-row]');
  if (!wrapper || !spineFill) return;

  function updateMazeSpine() {
    const rect = wrapper.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (-rect.top + window.innerHeight * 0.7) / rect.height));
    spineFill.style.height = (progress * 100) + '%';
  }

  const rowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' });

  mazeRows.forEach(row => rowObserver.observe(row));
  window.addEventListener('scroll', updateMazeSpine, { passive: true });
  updateMazeSpine();
})();

// ─── FLOW PROGRESSIVE ───
(function () {
  const spineFill = document.getElementById('flowSidebarFill');
  const panels = document.querySelectorAll('[data-flow-panel]');
  const steps = document.querySelectorAll('[data-flow-step]');
  const cursor = document.getElementById('flowCursor');
  const stepListEl = document.getElementById('flowStepList');
  const panelsEl = document.getElementById('flowPanels');
  if (!panels.length || !steps.length) return;

  let activeIdx = -1;

  function setActive(idx) {
    if (idx === activeIdx) return;
    activeIdx = idx;
    panels.forEach((p, i) => p.classList.toggle('active', i <= idx));
    steps.forEach((s, i) => s.classList.toggle('active', i <= idx));
    if (spineFill) {
      const pct = panels.length > 1 ? (idx / (panels.length - 1)) * 100 : 0;
      spineFill.style.height = pct + '%';
    }
  }

  // Cursor: continuously tracks scroll progress through all panels
  function updateCursor() {
    if (!cursor || !panelsEl || !stepListEl) return;
    const stepsArr = Array.from(steps);
    const firstDot = stepsArr[0].querySelector('.flow-step-dot');
    const lastDot = stepsArr[stepsArr.length - 1].querySelector('.flow-step-dot');
    const listRect = stepListEl.getBoundingClientRect();
    const firstDotRect = firstDot.getBoundingClientRect();
    const lastDotRect = lastDot.getBoundingClientRect();
    const firstY = firstDotRect.top + firstDotRect.height / 2 - listRect.top;
    const lastY = lastDotRect.top + lastDotRect.height / 2 - listRect.top;

    const panelsRect = panelsEl.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
      (-panelsRect.top + window.innerHeight * 0.4) / panelsRect.height
    ));

    cursor.style.top = (firstY + (lastY - firstY) * progress) + 'px';
  }

  const panelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(parseInt(entry.target.dataset.flowPanel, 10));
      }
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -20% 0px' });

  panels.forEach(panel => panelObserver.observe(panel));
  setActive(0);

  window.addEventListener('scroll', updateCursor, { passive: true });
  updateCursor();
})();

// ─── FORM SUBMISSION ───
function buildFormPayload(form) {
  const data = new FormData(form);
  const payload = {};
  data.forEach((value, key) => { payload[key] = value; });
  payload.source = 'mortgages-lp';
  payload.timestamp = new Date().toISOString();
  return payload;
}

function showFormSuccess(formEl, successEl) {
  formEl.classList.add('hidden');
  formEl.style.display = 'none';
  successEl.classList.remove('hidden');
  successEl.style.display = 'flex';
  successEl.style.flexDirection = 'column';
  successEl.style.alignItems = 'center';
}

function handleFormSubmit(formId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const successEl = successId ? document.getElementById(successId) : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const inputs = form.querySelectorAll('input[required], select[required]');
    let valid = true;
    inputs.forEach(input => {
      input.style.borderColor = '';
      if (!input.value.trim()) {
        input.style.borderColor = '#EF4444';
        valid = false;
      }
    });
    if (!valid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Đang gửi...';
    }

    const payload = buildFormPayload(form);

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      // Show success
      if (successEl) {
        showFormSuccess(form, successEl);
      } else {
        // Compact forms: replace with inline message
        const wrap = form.closest('.eform-compact-inner') || form.closest('.eform-cta-inner');
        if (wrap) {
          const successMsg = document.createElement('div');
          successMsg.className = 'form-success';
          successMsg.style.cssText = 'display:flex;flex-direction:column;align-items:center;padding:32px 0;';
          successMsg.innerHTML = `
            <div class="success-icon">✦</div>
            <h3 style="font-size:20px;font-weight:700;color:var(--blue);margin-bottom:8px;">Cảm ơn bạn!</h3>
            <p style="color:var(--gray-600);font-size:14px;">Đội ngũ Citics Mortgages sẽ liên hệ bạn trong 24 giờ làm việc.</p>
          `;
          form.replaceWith(successMsg);
        }
      }
    } catch (err) {
      // On error, show toast and re-enable submit
      showToast('Có lỗi xảy ra. Vui lòng thử lại sau.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
}

// ─── TOAST NOTIFICATION ───
function showToast(message) {
  const existing = document.getElementById('toastMsg');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toastMsg';
  toast.style.cssText = `
    position:fixed;
    bottom:80px;
    left:50%;
    transform:translateX(-50%) translateY(20px);
    background:#1F2937;
    color:white;
    padding:12px 24px;
    border-radius:50px;
    font-size:14px;
    font-weight:500;
    z-index:9000;
    opacity:0;
    transition:opacity 0.3s ease, transform 0.3s ease;
    white-space:nowrap;
    font-family:var(--font);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Register all forms
handleFormSubmit('mortgageForm1', 'formSuccess1');
handleFormSubmit('mortgageForm2', null);
handleFormSubmit('mortgageForm3', null);
handleFormSubmit('mortgageForm4', null);

// ─── SMOOTH SCROLL FOR NAV LINKS ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
