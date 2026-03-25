'use client';

import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    // ── SCROLL PROGRESS BAR ──
    const scrollProgress = document.getElementById('scrollProgress');
    function updateScrollProgress() {
      if (!scrollProgress) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }

    // ── BACK TO TOP ──
    const backToTop = document.getElementById('backToTop');
    function updateBackToTop() {
      if (!backToTop) return;
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
    function handleBackToTopClick() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    backToTop?.addEventListener('click', handleBackToTopClick);

    // ── STICKY MOBILE CTA ──
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.getElementById('hero');
    function updateStickyCta() {
      if (!heroSection || !stickyCta) return;
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      stickyCta.classList.toggle('visible', heroBottom < 0);
    }

    // ── COMBINED SCROLL HANDLER ──
    function onScroll() {
      updateScrollProgress();
      updateBackToTop();
      updateStickyCta();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount
    onScroll();

    // ── HERO PARTICLES ──
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

    // ── SCROLL REVEAL ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    // ── COUNTUP ANIMATION ──
    function easeOutQuart(t: number) {
      return 1 - Math.pow(1 - t, 4);
    }
    function animateCountup(el: Element) {
      const htmlEl = el as HTMLElement;
      const target = parseInt(htmlEl.dataset.count || '0', 10);
      const suffix = htmlEl.dataset.suffix || '';
      const duration = target > 1000 ? 2200 : 1400;
      const startTime = performance.now();
      function update(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.round(easedProgress * target);
        htmlEl.textContent = current.toLocaleString('vi-VN') + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
    const countupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCountup(entry.target);
            countupObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.countup').forEach((el) => countupObserver.observe(el));

    // ── MAZE (PAINPOINTS) ──
    const mazeWrapper = document.getElementById('mazeWrapper');
    const spineFill = document.getElementById('mazeSpineFill');
    const mazeRows = document.querySelectorAll('[data-maze-row]');
    let rowObserver: IntersectionObserver | null = null;

    function updateMazeSpine() {
      if (!mazeWrapper || !spineFill) return;
      const rect = mazeWrapper.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (-rect.top + window.innerHeight * 0.7) / rect.height)
      );
      spineFill.style.height = progress * 100 + '%';
    }

    if (mazeWrapper && spineFill) {
      rowObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('active');
          });
        },
        { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
      );
      mazeRows.forEach((row) => rowObserver!.observe(row));
      window.addEventListener('scroll', updateMazeSpine, { passive: true });
      updateMazeSpine();
    }

    // ── SMOOTH SCROLL FOR NAV LINKS ──
    function handleAnchorClick(e: Event) {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
          10
        ) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // ── CLEANUP ──
    return () => {
      window.removeEventListener('scroll', onScroll);
      backToTop?.removeEventListener('click', handleBackToTopClick);
      revealObserver.disconnect();
      countupObserver.disconnect();
      if (rowObserver) rowObserver.disconnect();
      if (mazeWrapper && spineFill) {
        window.removeEventListener('scroll', updateMazeSpine);
      }
      anchorLinks.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      // Remove particles on unmount
      if (particleContainer) {
        particleContainer.querySelectorAll('.hero-particle').forEach((p) => p.remove());
      }
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" id="scrollProgress"></div>

      <button
        type="button"
        className="back-to-top"
        id="backToTop"
        aria-label="Về đầu trang"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 12l5-5 5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="sticky-cta" id="stickyCta">
        <a href="#form1" className="btn btn-amber btn-full">
          Nhận tư vấn miễn phí
        </a>
      </div>
    </>
  );
}
