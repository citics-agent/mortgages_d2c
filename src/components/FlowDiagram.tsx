'use client';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    badge: 'Bước 01',
    title: 'Khách hàng đăng ký thông tin vay',
    sub: 'Thông tin cá nhân, liên lạc, tài chính',
    details: [
      'Điền thông tin cá nhân: họ tên, ngày sinh, CMND/CCCD',
      'Cung cấp thông tin thu nhập và nghề nghiệp',
      'Mô tả tài sản thế chấp và nhu cầu vay vốn',
      'Chọn mục đích vay: mua nhà, xây sửa, kinh doanh, tái cấu trúc',
    ],
  },
  {
    badge: 'Bước 02',
    title: 'Citics phân tích hồ sơ',
    sub: 'Chuyên viên liên hệ và phân tích phù hợp với ngân hàng đối tác',
    details: [
      'Chuyên viên Citics liên hệ trong vòng 24 giờ làm việc',
      'Xác nhận nhu cầu vay và thông tin tài sản thế chấp',
      'Phân tích hồ sơ phù hợp với các ngân hàng đối tác',
      'Tư vấn bổ sung hồ sơ nếu cần thiết',
    ],
  },
  {
    badge: 'Bước 03',
    title: 'Kết nối ngân hàng phù hợp',
    sub: 'Gửi hồ sơ qua ngân hàng phù hợp',
    details: [
      'Đối chiếu tiêu chí ngân hàng với hồ sơ khách hàng',
      'Chọn ngân hàng tối ưu theo mục tiêu: lãi suất, hạn mức, tốc độ',
      'Gửi hồ sơ chính thức đến ngân hàng đối tác',
    ],
  },
  {
    badge: 'Bước 04',
    title: 'Ngân hàng tư vấn và thẩm định hồ sơ',
    sub: 'Chuyên viên ngân hàng liên hệ, thẩm định giá & hoàn thành hồ sơ',
    details: [
      'Chuyên viên ngân hàng liên hệ trực tiếp với khách hàng',
      'Xác nhận và bổ sung thông tin cần thiết',
      'Thẩm định giá tài sản thế chấp qua đơn vị định giá độc lập',
      'Hoàn thiện hồ sơ pháp lý theo yêu cầu ngân hàng',
    ],
  },
  {
    badge: 'Bước 05',
    title: 'Phê duyệt khoản vay',
    sub: 'Trả kết quả duyệt vay cho khách hàng theo điều kiện phù hợp',
    details: [
      'Ngân hàng ra quyết định phê duyệt khoản vay',
      'Thông báo kết quả: hạn mức vay, lãi suất, kỳ hạn',
      'Ký kết hợp đồng vay vốn và thế chấp tài sản',
    ],
  },
  {
    badge: 'Bước 06',
    title: 'Giải ngân',
    sub: 'Nhận vốn vay',
    details: [
      'Hoàn tất thủ tục công chứng hợp đồng thế chấp',
      'Ngân hàng thực hiện giải ngân theo điều khoản hợp đồng',
      'Khách hàng nhận vốn vay và bắt đầu sử dụng',
      'Citics hỗ trợ theo dõi sau giải ngân nếu cần',
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
                  <p className="flow-panel-sub">{step.sub}</p>
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
