    // ─── SCROLL PROGRESS BAR ───
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = progress + '%';
    });

    // ─── NAV SCROLL ───
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ─── HAMBURGER MENU ───
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('navMobileMenu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // ─── HERO PARTICLES ───
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'hero-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (6 + Math.random() * 8) + 's';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
        particleContainer.appendChild(p);
      }
    }

    // ─── SCROLL REVEAL (IntersectionObserver) ───
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // ─── PP-HUB MOBILE INTERLEAVE ───
    if (window.innerWidth <= 768) {
      const diagram = document.querySelector('.pp-hub-diagram');
      const leftRows = document.querySelectorAll('.pp-col--left .pp-row');
      const rightRows = document.querySelectorAll('.pp-col--right .pp-row');
      if (diagram && leftRows.length && rightRows.length) {
        // Hide desktop columns & hub
        diagram.querySelectorAll('.pp-col, .pp-hub-center, .pp-hub-lines').forEach(el => el.style.display = 'none');
        // Create interleaved mobile container
        const mobileWrap = document.createElement('div');
        mobileWrap.className = 'pp-mobile-pairs';
        const count = Math.min(leftRows.length, rightRows.length);
        for (let i = 0; i < count; i++) {
          // Problem row - slide from left
          const prob = leftRows[i].cloneNode(true);
          prob.classList.add('pp-slide', 'pp-slide--left');
          mobileWrap.appendChild(prob);
          // Arrow indicator
          const arrow = document.createElement('div');
          arrow.className = 'pp-mobile-arrow';
          arrow.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m0 0l-6-6m6 6l6-6"/></svg>';
          mobileWrap.appendChild(arrow);
          // Solution row - slide from right
          const sol = rightRows[i].cloneNode(true);
          sol.classList.add('pp-slide', 'pp-slide--right');
          mobileWrap.appendChild(sol);
          // Spacer between pairs (except last)
          if (i < count - 1) {
            const spacer = document.createElement('div');
            spacer.className = 'pp-mobile-spacer';
            mobileWrap.appendChild(spacer);
          }
        }
        diagram.appendChild(mobileWrap);
        // Observe each slide element
        const slideObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('pp-slide--visible');
              slideObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
        mobileWrap.querySelectorAll('.pp-slide, .pp-mobile-arrow').forEach(el => slideObserver.observe(el));
      }
    }

    // ─── COUNTUP ANIMATION ───
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const duration = 2000;
          const start = performance.now();
          const isDecimal = target % 1 !== 0;
          const suffix = target >= 1000 ? '+' : '';

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            let current = eased * target;

            if (target >= 1000) {
              el.textContent = Math.floor(current).toLocaleString('en-US') + suffix;
            } else if (isDecimal) {
              el.textContent = current.toFixed(1) + ' triệu';
            } else if (target === 32) {
              el.textContent = Math.floor(current) + ' triệu';
            } else {
              el.textContent = Math.floor(current);
            }

            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => countObserver.observe(el));

    // ─── STICKY BOTTOM CTA ───
    const stickyBottomCta = document.getElementById('stickyBottomCta');
    const heroSection = document.getElementById('hero');
    if (stickyBottomCta && heroSection) {
      const stickyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          stickyBottomCta.classList.toggle('visible', !entry.isIntersecting);
        });
      }, { threshold: 0 });
      stickyObserver.observe(heroSection);
    }

    // ─── BACK TO TOP ───
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── CONTENT TABS (Training & Events) ───
    document.querySelectorAll('.tab[data-tab-target]').forEach(tab => {
      tab.addEventListener('click', () => {
        const section = tab.closest('section');
        // Toggle active tab
        section.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Toggle active carousel
        section.querySelectorAll('.carousel').forEach(c => { c.classList.add('u-hidden'); c.style.display = ''; });
        const target = document.getElementById(tab.dataset.tabTarget);
        if (target) target.classList.remove('u-hidden');
      });
    });

    // ─── FORM TABS ───
    document.querySelectorAll('.form-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const formBox = tab.closest('.form-box');
        formBox.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
        formBox.querySelectorAll('.form-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.formTab;
        formBox.querySelector('#form-' + target)?.classList.add('active');
      });
    });

    // ─── JOURNEY TABS ───
    document.querySelectorAll('[data-journey-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        const section = tab.closest('.journey');
        section.querySelectorAll('.j-tab').forEach(t => t.classList.remove('active'));
        section.querySelectorAll('.journey-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('journey-' + tab.dataset.journeyTab)?.classList.add('active');
      });
    });

    // ─── JOURNEY STEP ACCORDION (with sub-steps) ───
    document.querySelectorAll('.journey-step[data-step]').forEach(step => {
      step.addEventListener('click', (e) => {
        if (e.target.closest('.sub-step')) return;
        const body = step.closest('.journey-body');
        const illustration = body.querySelector('.journey-illustration');
        const phoneMockup = body.querySelector('.phone-mockup');
        const stepNum = step.dataset.step;

        body.querySelectorAll('.journey-step').forEach(s => s.classList.remove('active'));
        step.classList.add('active');

        // Reset all visuals
        body.querySelectorAll('.phone-image').forEach(i => i.classList.remove('active'));
        body.querySelectorAll('.step-photo').forEach(i => i.classList.remove('active'));

        const subSteps = step.querySelectorAll('.sub-step');
        const stepPhoto = body.querySelector('.step-photo[data-illus="' + stepNum + '"]');

        if (subSteps.length > 0) {
          // Has sub-steps: show phone mockup with main image
          if (illustration) { illustration.style.display = ''; illustration.classList.remove('show-photo'); }
          if (phoneMockup) phoneMockup.style.display = '';
          body.classList.remove('no-mockup');
          subSteps.forEach(ss => ss.classList.remove('active'));
          body.querySelector('.phone-image[data-illus="' + stepNum + '"]')?.classList.add('active');
        } else if (stepPhoto) {
          // Has a photo: show illustration with photo, hide phone mockup
          if (illustration) { illustration.style.display = ''; illustration.classList.add('show-photo'); }
          if (phoneMockup) phoneMockup.style.display = 'none';
          body.classList.remove('no-mockup');
          stepPhoto.classList.add('active');
        } else {
          // No sub-steps, no photo: hide illustration
          if (illustration) { illustration.style.display = 'none'; illustration.classList.remove('show-photo'); }
          body.classList.add('no-mockup');
        }
      });
    });

    // ─── SUB-STEP CLICK ───
    document.querySelectorAll('.sub-step[data-substep]').forEach(subStep => {
      subStep.addEventListener('click', (e) => {
        e.stopPropagation();
        const body = subStep.closest('.journey-body');
        const phoneMockup = body.querySelector('.phone-mockup');
        const subKey = subStep.dataset.substep;
        const parent = subStep.closest('.sub-steps');
        parent.querySelectorAll('.sub-step').forEach(ss => ss.classList.remove('active'));
        subStep.classList.add('active');
        // Show phone mockup, hide step photos
        if (phoneMockup) phoneMockup.style.display = '';
        body.querySelectorAll('.step-photo').forEach(i => i.classList.remove('active'));
        body.querySelectorAll('.phone-image').forEach(i => i.classList.remove('active'));
        body.querySelector('.phone-image[data-illus="' + subKey + '"]')?.classList.add('active');
      });
    });

    // ─── EVENTS CAROUSEL (auto-scroll infinite) ───
    (() => {
      const carousel = document.getElementById('eventsCarousel');
      if (!carousel) return;
      // Duplicate cards for seamless loop
      const cards = Array.from(carousel.children);
      cards.forEach(c => carousel.appendChild(c.cloneNode(true)));
      let scrollPos = 0;
      const speed = 0.5; // px per frame — slow
      let rafId;
      function step() {
        scrollPos += speed;
        // When we've scrolled past the original set, jump back
        const half = carousel.scrollWidth / 2;
        if (scrollPos >= half) scrollPos = 0;
        carousel.scrollLeft = scrollPos;
        rafId = requestAnimationFrame(step);
      }
      // Pause on hover
      carousel.addEventListener('mouseenter', () => cancelAnimationFrame(rafId));
      carousel.addEventListener('mouseleave', () => { rafId = requestAnimationFrame(step); });
      // Disable scroll-snap for smooth animation
      carousel.style.scrollSnapType = 'none';
      rafId = requestAnimationFrame(step);
    })();

    // ─── POLICY TABS ───
    document.querySelectorAll('.policy-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const policy = tab.dataset.policy;
        document.querySelectorAll('.policy-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.policy-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`.policy-panel[data-policy="${policy}"]`)?.classList.add('active');
      });
    });

    // ─── FAQ ACCORDION ───
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        document.querySelectorAll('.faq-question').forEach(q => q.setAttribute('aria-expanded', 'false'));
        // Open clicked (if wasn't open)
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });


    // ─── LIFECYCLE: stepper with shared detail panel ───
    const lcData = [
      {
        title: 'Nguồn hàng', sub: 'Nguồn bất động sản đa dạng từ nhiều kênh',
        items: ['Nguồn hàng Sơ cấp: Các đối tác (VD: SHB)', 'Nguồn hàng ngân hàng & đấu giá', 'Nguồn hàng từ Agent listing (CACN)', 'Nguồn hàng Chủ nhà niêm yết'],
        agent: 'Listing Agent',
        icon: '<svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" fill="white"/></svg>'
      },
      {
        title: 'Nguồn khách', sub: 'Khách hàng đến từ nhiều nguồn khác nhau',
        items: ['Khách hàng thẩm định giá', 'Khách hàng vay vốn từ ngân hàng', 'Khách hàng từ Agent Buyer (CACN)', 'Khách hàng trực tiếp từ Citics'],
        agent: 'Buyer Agent',
        icon: '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.05-.9 2.86c.28.09.59.14.91.14zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="white"/></svg>'
      },
      {
        title: 'Nguồn vốn', sub: 'Đến từ các ngân hàng hợp tác chiến lược của Citics',
        items: ['Kết nối 34+ ngân hàng đối tác', 'Tư vấn gói vay phù hợp', 'Hỗ trợ thủ tục giải ngân', 'Lãi suất ưu đãi từ đối tác'],
        agent: 'Mortgages Agent',
        icon: '<svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="white"/></svg>'
      },
      {
        title: 'Đội ngũ thẩm định', sub: 'Đội ngũ thẩm định giá chuyên nghiệp của Citics',
        items: ['Đội ngũ thẩm định giá với kinh nghiệm gần 10 năm', 'Đội ngũ từ các cty thẩm định giá đối tác của Citics', 'Đội ngũ Agent thẩm định đến từ CACN'],
        agent: 'Value Agent',
        icon: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="white"/></svg>'
      },
      {
        title: 'Đội ngũ Pháp lý', sub: 'Hỗ trợ pháp lý toàn diện cho giao dịch',
        items: ['Đội ngũ Pháp lý nội bộ', 'Đội ngũ pháp lý từ các đối tác của Citics'],
        agent: 'Legal Agent',
        icon: '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="white"/></svg>'
      }
    ];

    const lcSteps = document.querySelectorAll('.lc-step');
    const lcFill = document.getElementById('lc-fill');
    const lcDetail = document.getElementById('lc-detail');
    const lcArrow = document.getElementById('lc-arrow');
    let currentLc = 0;

    function setLcStage(idx) {
      if (idx === currentLc && lcSteps[idx].classList.contains('active')) return;
      currentLc = idx;
      const d = lcData[idx];

      lcSteps.forEach((s, i) => {
        s.classList.remove('active', 'done');
        if (i === idx) s.classList.add('active');
        else if (i < idx) s.classList.add('done');
      });

      const pct = idx === 0 ? 0 : (idx / (lcSteps.length - 1)) * 80;
      if (lcFill) lcFill.style.width = pct + '%';

      // Move connector arrow
      if (lcArrow) {
        const stepCount = lcSteps.length;
        const stepPct = (100 / stepCount) * idx + (100 / stepCount / 2);
        lcArrow.style.setProperty('--arrow-pos', stepPct + '%');
      }

      lcDetail.classList.add('fading');
      setTimeout(() => {
        document.getElementById('lc-d-title').textContent = d.title;
        document.getElementById('lc-d-sub').textContent = d.sub;
        document.getElementById('lc-d-list').innerHTML = d.items.map(i => '<li>' + i + '</li>').join('');
        document.getElementById('lc-d-agent').textContent = d.agent;
        document.getElementById('lc-d-icon').innerHTML = d.icon;
        lcDetail.classList.remove('fading');
      }, 200);
    }

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    lcSteps.forEach((step, idx) => {
      step.addEventListener('mouseenter', () => { if (!isMobile()) setLcStage(idx); });
      step.addEventListener('click', () => { if (isMobile()) setLcStage(idx); });
    });

    setLcStage(0);

    // ─── COOPERATION CIRCLE ───
    const coopIcons = {
      listing: '<svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" fill="white"/></svg>',
      buyer: '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.05-.9 2.86c.28.09.59.14.91.14zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="white"/></svg>',
      mortgage: '<svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="white"/></svg>',
      value: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="white"/></svg>',
      legal: '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="white"/></svg>'
    };

    const coopData = {
      listing: { title: 'Listing Agent', sub: 'Agent đầu chủ — Nguồn hàng', items: ['Khảo sát bất động sản', 'Tư vấn giá cho chủ nhà', 'Ký hợp đồng môi giới', 'Quản lý điều kiện giao dịch'] },
      buyer: { title: 'Buyer Agent', sub: 'Agent giao dịch — Khách mua', items: ['Tìm kiếm tài sản phù hợp', 'Dẫn khách xem nhà', 'Tư vấn quy trình mua bán', 'Đàm phán giá'] },
      mortgage: { title: 'Mortgages Agent', sub: 'Agent tín dụng — Vay vốn', items: ['Tìm kiếm gói vay phù hợp', 'Tư vấn thủ tục, chi phí', 'Hoàn tất gói vay', 'Kết nối 34 ngân hàng đối tác'] },
      value: { title: 'Value Agent', sub: 'Agent định giá — Data & Services', items: ['Định giá bất động sản', 'Bảo hiểm tài sản', 'Re-financing', 'Dịch vụ hậu giao dịch'] },
      legal: { title: 'Legal Agent', sub: 'Agent pháp lý — Pháp lý', items: ['Tư vấn pháp lý giao dịch', 'Xử lý thủ tục mua bán', 'Công chứng hợp đồng', 'Hỗ trợ pháp lý liên quan'] }
    };

    const coopKeys = ['listing', 'buyer', 'mortgage', 'value', 'legal'];

    function updateCoopDetail(key) {
      const d = coopData[key];
      if (!d) return;
      document.getElementById('coop-detail-title').textContent = d.title;
      document.getElementById('coop-detail-sub').textContent = d.sub;
      document.getElementById('coop-detail-list').innerHTML = d.items.map(i => '<li>' + i + '</li>').join('');
      const iconEl = document.getElementById('coop-detail-icon');
      if (iconEl && coopIcons[key]) iconEl.innerHTML = coopIcons[key];

      document.querySelectorAll('[data-coop]').forEach(n => n.classList.remove('active'));
      document.querySelector('[data-coop="' + key + '"]')?.classList.add('active');

      document.querySelectorAll('.coop-arrows path[data-arrow], .coop-action-badge').forEach(el => el.classList.remove('active'));
      const arrowLine = document.querySelector('.coop-arrows path[data-arrow="' + key + '"]');
      const arrowLabel = document.querySelector('.coop-action-badge[data-label="' + key + '"]');
      if (arrowLine) arrowLine.classList.add('active');
      if (arrowLabel) arrowLabel.classList.add('active');

      document.getElementById('coop-detail').classList.add('amber-border');
    }

    document.querySelectorAll('[data-coop]').forEach(node => {
      node.addEventListener('mouseenter', () => {
        clearInterval(coopAutoInterval);
        updateCoopDetail(node.dataset.coop);
      });
      node.addEventListener('click', (e) => {
        e.stopPropagation();
        clearInterval(coopAutoInterval);
        updateCoopDetail(node.dataset.coop);
      });
    });

    let coopAutoIdx = 0;
    let coopAutoInterval = setInterval(() => {
      coopAutoIdx = (coopAutoIdx + 1) % coopKeys.length;
      updateCoopDetail(coopKeys[coopAutoIdx]);
    }, 4000);

    let coopIdleTimer;
    document.querySelector('.coop-circle')?.addEventListener('mouseleave', () => {
      clearTimeout(coopIdleTimer);
      coopIdleTimer = setTimeout(() => {
        clearInterval(coopAutoInterval);
        coopAutoInterval = setInterval(() => {
          coopAutoIdx = (coopAutoIdx + 1) % coopKeys.length;
          updateCoopDetail(coopKeys[coopAutoIdx]);
        }, 4000);
      }, 8000);
    });

    updateCoopDetail('listing');

    // ─── E-FORM SUBMISSION ───
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyIgZYO43caXib7fR-4L1TNvK6gSecVad3X87Ibn6n9qDr1b0wStkcJWrNOXIRbhTfY_Q/exec';

    function handleFormSubmit(formEl, type) {
      formEl.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate required fields
        const requiredFields = formEl.querySelectorAll('[required]');
        let isValid = true;
        requiredFields.forEach(field => {
          if (!field.value) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
          } else {
            field.style.borderColor = '';
          }
        });
        if (!isValid) return;

        const btn = formEl.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Đang gửi...';
        btn.disabled = true;

        // Collect form data
        const formData = new FormData(formEl);
        const data = { type };
        formData.forEach((value, key) => { data[key] = value; });
        // Checkbox handling (FormData omits unchecked checkboxes)
        data.courseInterest = formEl.querySelector('[name="courseInterest"]').checked;

        try {
          const res = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(data),
          });

          btn.textContent = 'Đăng ký thành công!';
          btn.style.background = '#40E0D0';
          btn.style.color = '#fff';
          formEl.reset();

          // Show action buttons (web on desktop, app on mobile)
          let actionsDiv = formEl.parentElement.querySelector('.form-success-actions');
          if (!actionsDiv) {
            actionsDiv = document.createElement('div');
            actionsDiv.className = 'form-success-actions';
            actionsDiv.innerHTML =
              '<a href="https://agent.citics.vn/dang-ky" target="_blank" rel="noopener" class="btn btn-secondary form-action-web">Truy cập Web →</a>' +
              '<a href="https://onelink.to/a5ekgf" target="_blank" rel="noopener" class="btn btn-secondary form-action-app">Tải App →</a>';
            formEl.parentElement.appendChild(actionsDiv);
          }
          actionsDiv.classList.add('visible');

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
          }, 3000);
        } catch (err) {
          btn.textContent = 'Lỗi — Thử lại';
          btn.style.background = '#e74c3c';
          btn.disabled = false;

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
          }, 3000);
        }
      });
    }

    handleFormSubmit(document.getElementById('agent-form'), 'agent');
    handleFormSubmit(document.getElementById('store-form'), 'store');

