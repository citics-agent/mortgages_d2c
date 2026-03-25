'use client';

import { useState, useEffect, useRef } from 'react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const navSections = ['usp', 'flow', 'policies', 'banks', 'news'];

  {/* Scroll state + active section tracking */}
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const offset = 120;
      let current = '';
      for (const id of navSections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= offset) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  {/* Close menu on outside click */}
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="container nav-inner">
          <a href="#" className="nav-brand">
            <img src="/assets/logo-mortgages-w.png" alt="Citics Mortgages" className="nav-logo" />
          </a>
          <div className="nav-links">
            <a href="#usp" className={activeSection === 'usp' ? 'active' : ''}>Lợi ích</a>
            <a href="#flow" className={activeSection === 'flow' ? 'active' : ''}>Hành trình</a>
            <a href="#policies" className={activeSection === 'policies' ? 'active' : ''}>Chính sách</a>
            <a href="#banks" className={activeSection === 'banks' ? 'active' : ''}>Ngân hàng</a>
            <a href="#news" className={activeSection === 'news' ? 'active' : ''}>Tin tức</a>
            <a href="#form1" className="btn btn-amber nav-cta">Nhận tư vấn</a>
          </div>
          <button
            ref={hamburgerRef}
            type="button"
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <a href="#usp" className={activeSection === 'usp' ? 'active' : ''} onClick={closeMenu}>Lợi ích</a>
        <a href="#flow" className={activeSection === 'flow' ? 'active' : ''} onClick={closeMenu}>Hành trình</a>
        <a href="#policies" className={activeSection === 'policies' ? 'active' : ''} onClick={closeMenu}>Chính sách</a>
        <a href="#banks" className={activeSection === 'banks' ? 'active' : ''} onClick={closeMenu}>Ngân hàng</a>
        <a href="#news" className={activeSection === 'news' ? 'active' : ''} onClick={closeMenu}>Tin tức</a>
        <a href="#form1" className="btn btn-amber" onClick={closeMenu}>Nhận tư vấn</a>
      </div>
    </>
  );
}
