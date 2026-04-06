'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const personas = [
  {
    title: 'Người mua nhà lần đầu',
    text: 'Cần được tư vấn & xác định khả năng vay phù hợp với thu nhập thực tế',
    image: `${bp}/assets/persona-firstbuyer.png`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <path d="M4 13.5L14 5l10 8.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12V24h5v-5.5a2 2 0 0 1 4 0V24h5V12" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="17.5" y="13.5" width="3.5" height="3.5" rx="0.75" stroke="white" strokeWidth="1.25" opacity="0.65" />
      </svg>
    ),
  },
  {
    title: 'Người nâng cấp nhà',
    text: 'Người nâng cấp nhà chọn gói vay tốt',
    image: `${bp}/assets/persona-upgrade.jpg`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <path d="M4 13.5L14 5l10 8.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12V24H21V12" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 22v-9" stroke="#FFBF01" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M11.5 16l2.5-3 2.5 3" stroke="#FFBF01" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Nhà đầu tư BĐS',
    text: 'Muốn xoay dòng tiền thông minh',
    image: `${bp}/assets/persona-investor.png`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <path d="M2 24V16H8V24" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 24V8H17V24" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 24V12H26V24" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="1" y1="24" x2="27" y2="24" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Chủ doanh nghiệp SMEs',
    text: 'Cần xoay vòng vốn kinh doanh',
    image: `${bp}/assets/persona-sme.png`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="10" width="22" height="14" rx="2.5" stroke="white" strokeWidth="1.75" />
        <path d="M10.5 10V8a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 17.5 8v2" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="3" y1="17" x2="25" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="14" y1="14.5" x2="14" y2="19.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Người tái cấu trúc khoản vay',
    text: 'Để tối ưu chi phí',
    image: `${bp}/assets/persona-restructure.jpg`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="1.75" />
        <line x1="9.5" y1="18.5" x2="18.5" y2="9.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="10.5" cy="10.5" r="2" stroke="white" strokeWidth="1.5" />
        <circle cx="17.5" cy="17.5" r="2" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const ROTATION_INTERVAL = 5000;

export default function Personas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const switchTo = useCallback((index: number) => {
    if (index === activeIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsFading(false);
    }, 200);
  }, [activeIndex]);

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate) return;

    intervalRef.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % personas.length);
        setIsFading(false);
      }, 200);
    }, ROTATION_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRotate]);

  function handleTabClick(index: number) {
    setAutoRotate(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    switchTo(index);
  }

  const current = personas[activeIndex];

  return (
    <section className="section personas" id="personas">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">Trong đó, họ là ....</h2>
        </div>

        <div className="personas-layout reveal">
          <div className="persona-tabs" id="personaTabs">
            {personas.map((persona, index) => (
              <div
                key={index}
                className={`persona-tab${index === activeIndex ? ' active' : ''}`}
                data-index={index}
                onClick={() => handleTabClick(index)}
              >
                <div className="persona-tab-icon">{persona.icon}</div>
                <div className="persona-tab-info">
                  <div className="persona-tab-title">{persona.title}</div>
                  <div className="persona-tab-desc">{persona.text}</div>
                </div>
                <div className="persona-tab-progress"></div>
                {/* Mobile inline expand */}
                <div className="persona-tab-expand">
                  <div className="persona-tab-expand-inner">
                    <div className="persona-tab-expand-img">
                      <img src={persona.image} alt={persona.title} />
                    </div>
                    <p className="persona-tab-expand-text">{persona.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="persona-detail">
            <div
              className={`persona-detail-visual${isFading ? ' fading' : ''}`}
              id="personaDetailVisual"
              data-persona={activeIndex}
            >
              <img
                src={current.image}
                alt={current.title}
                className="persona-detail-img"
              />
            </div>
            <div
              className={`persona-detail-body${isFading ? ' fading' : ''}`}
              id="personaDetailBody"
            >
              <h3 className="persona-detail-name" id="personaDetailName">
                {current.title}
              </h3>
              <p className="persona-detail-text" id="personaDetailText">
                {current.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
