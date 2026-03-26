'use client';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    badge: 'Bước 01',
    title: 'Khách hàng đăng ký thông tin vay',
    details: [
      '1. Thông tin cá nhân',
      '2. Thông tin liên lạc',
      '3. Nhu cầu & BĐS',
    ],
  },
  {
    badge: 'Bước 02',
    title: 'Citics Mortgages phân tích hồ sơ',
    details: [
      '1. Chuyên viên tư vấn liên hệ trực tiếp',
      '2. Xác nhận nhu cầu & hồ sơ',
      '3. Phân tích mức độ phù hợp với điều kiện các ngân hàng đối tác của Citics',
      '4. Các chính sách & ưu đãi ngân hàng hiện tại',
      '5. Bổ sung hồ sơ (nếu cần)',
    ],
  },
  {
    badge: 'Bước 03',
    title: 'Kết nối ngân hàng phù hợp',
    details: [
      'Gửi hồ sơ qua ngân hàng phù hợp',
    ],
  },
  {
    badge: 'Bước 04',
    title: 'Ngân hàng tư vấn và thẩm định hồ sơ',
    details: [
      '1. Chuyên viên ngân hàng liên hệ',
      '2. Xác nhận các thông tin lần cuối',
      '3. Thẩm định giá & hoàn thành hồ sơ',
    ],
  },
  {
    badge: 'Bước 05',
    title: 'Phê duyệt khoản vay',
    details: [
      'Trả kết quả duyệt vay cho khách hàng theo điều kiện phù hợp',
    ],
  },
  {
    badge: 'Bước 06',
    title: 'Giải ngân',
    details: [
      'Nhận vốn vay',
    ],
  },
];

export default function FlowDiagram() {
  const [activeStep, setActiveStep] = useState(0);
  const isClickScrolling = useRef(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const stepListRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layoutRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.flowPanel
            );
            if (!isNaN(index) && !isClickScrolling.current) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        root: layoutRef.current,
        rootMargin: '-10% 0px -40% 0px',
        threshold: 0,
      }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => {
      panels.forEach((panel) => observer.unobserve(panel));
    };
  }, []);

  // Position step nodes at vertical center of each panel
  useEffect(() => {
    const positionNodes = () => {
      const stepList = stepListRef.current;
      const fill = fillRef.current;
      const cursor = cursorRef.current;
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!stepList || !fill || !cursor || panels.length === 0) return;

      const stepDots = stepList.querySelectorAll<HTMLElement>('.flow-step');
      const sidebarRect = stepList.parentElement?.getBoundingClientRect();
      if (!sidebarRect || stepDots.length === 0) return;

      panels.forEach((panel, i) => {
        if (!stepDots[i]) return;
        const panelRect = panel.getBoundingClientRect();
        const panelCenter = panelRect.top + panelRect.height / 2 - sidebarRect.top;
        stepDots[i].style.top = `${panelCenter}px`;
      });

      const firstDot = stepDots[0];
      const activeDot = stepDots[activeStep];
      if (!firstDot || !activeDot) return;

      const firstTop = parseFloat(firstDot.style.top) || 0;
      const activeTop = parseFloat(activeDot.style.top) || 0;

      fill.style.height = `${activeTop - firstTop}px`;
      fill.style.top = `${firstTop}px`;
      cursor.style.top = `${activeTop}px`;
    };

    positionNodes();
    const layout = layoutRef.current;
    if (layout) {
      layout.addEventListener('scroll', positionNodes, { passive: true });
    }
    window.addEventListener('resize', positionNodes);
    return () => {
      if (layout) {
        layout.removeEventListener('scroll', positionNodes);
      }
      window.removeEventListener('resize', positionNodes);
    };
  }, [activeStep]);

  // Auto-scroll active tab into view in overview
  useEffect(() => {
    const tab = tabRefs.current[activeStep];
    const overview = overviewRef.current;
    if (tab && overview) {
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const overviewWidth = overview.offsetWidth;
      const scrollLeft = tabLeft - overviewWidth / 2 + tabWidth / 2;
      overview.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeStep]);

  return (
    <section className="section flow" id="flow">
      <div className="container">
        <div className="flow-sticky-header">
          <div className="section-header">
            <h2 className="section-title">
              Hành trình vay thế chấp cùng Citics Mortgages
            </h2>
          </div>

          <div className="flow-overview" ref={overviewRef}>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { tabRefs.current[i] = el; }}
                className={`flow-overview-step${i === activeStep ? ' active' : ''}${i < activeStep ? ' done' : ''}`}
                onClick={() => {
                  const panel = panelRefs.current[i];
                  const layout = layoutRef.current;
                  if (!panel || !layout) return;
                  isClickScrolling.current = true;
                  setActiveStep(i);
                  let offset = 0;
                  let el: HTMLElement | null = panel;
                  while (el && el !== layout) {
                    offset += el.offsetTop;
                    el = el.offsetParent as HTMLElement | null;
                  }
                  layout.scrollTo({ top: offset, behavior: 'smooth' });
                  setTimeout(() => { isClickScrolling.current = false; }, 800);
                }}
              >
                <div className="flow-overview-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="flow-overview-title">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flow-layout" ref={layoutRef}>
          <div className="flow-sidebar" id="flowSidebar">
            <div className="flow-sidebar-spine">
              <div
                className="flow-sidebar-fill"
                id="flowSidebarFill"
                ref={fillRef}
              />
            </div>
            <div
              className="flow-step-list"
              id="flowStepList"
              ref={stepListRef}
            >
              <div
                className="flow-cursor"
                id="flowCursor"
                ref={cursorRef}
              />
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`flow-step${i === activeStep ? ' active' : ''}${i < activeStep ? ' done' : ''}`}
                  data-flow-step={i}
                >
                  <div className="flow-step-dot">
                    <div className="flow-step-dot-inner" />
                  </div>
                  <span className="flow-step-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flow-panels" id="flowPanels">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flow-panel${i === activeStep ? ' active' : ''}`}
                data-flow-panel={i}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
              >
                <div className="flow-panel-head">
                  <span className="flow-panel-badge">{step.badge}</span>
                  <h3 className="flow-panel-title">{step.title}</h3>
                  {/* sub removed */}
                </div>
                <ul className="flow-panel-details">
                  {step.details.map((detail, j) => (
                    <li key={j}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
