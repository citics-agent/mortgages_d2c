'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzH-5eCdrnG47vixrH184BjHtDUneTl3wbClas-FhXA87kpBZ1WniHYnSKbkReZSaKr/exec';

type EFormProps = {
  variant: 'primary' | 'compact' | 'cta';
  id: string;
  formId: string;
  title: string;
  subtitle?: string;
  buttonText: string;
  stat?: string;
  statLabel?: string;
  inline?: boolean;
};

function CountUp({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  const formatted = count.toLocaleString('de-DE');

  return <span ref={ref}>{formatted}{suffix}</span>;
}

function showToast(message: string, type: 'success' | 'error' = 'success') {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function buildFormPayload(form: HTMLFormElement) {
  const data = new FormData(form);
  const payload: Record<string, string> = {};
  data.forEach((value, key) => {
    payload[key] = value as string;
  });
  payload.source = 'mortgages-lp';
  payload.timestamp = new Date().toISOString();
  return payload;
}

export default function EForm({ variant, id, formId, title, subtitle, buttonText, stat, statLabel, inline }: EFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  function validatePhone(value: string): boolean {
    const cleaned = value.replace(/\s/g, '');
    if (!/^(03|05|07|08|09)\d{8}$/.test(cleaned)) {
      setPhoneError('Số điện thoại không hợp lệ (VD: 0901 234 567)');
      return false;
    }
    setPhoneError('');
    return true;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]');

    if (phoneInput && !validatePhone(phoneInput.value)) {
      phoneInput.focus();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = buildFormPayload(form);

      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setIsSuccess(true);
      showToast('Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm.', 'success');
      form.reset();
    } catch {
      showToast('Có lỗi xảy ra. Vui lòng thử lại.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  // === PRIMARY VARIANT ===
  if (variant === 'primary') {
    return (
      <section className="section eform eform-primary" id={id}>
        <div className="eform-bg-gradient"></div>
        <div className="container eform-inner">
          <div className="eform-content reveal">
            <h2
              className="section-title section-title--white"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {subtitle && <p className="eform-sub">{subtitle}</p>}

            <div className="form-wrap" id={`formWrap${formId}`}>
              {!isSuccess ? (
                <form
                  className="mortgage-form"
                  id={`mortgageForm${formId}`}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`name${formId}`}>Họ &amp; tên</label>
                      <input
                        type="text"
                        id={`name${formId}`}
                        name="name"
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`year${formId}`}>Năm sinh</label>
                      <input
                        type="number"
                        id={`year${formId}`}
                        name="year"
                        placeholder="1990"
                        min={1940}
                        max={2005}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`phone${formId}`}>Số điện thoại</label>
                      <input
                        type="tel"
                        id={`phone${formId}`}
                        name="phone"
                        placeholder="0901 234 567"
                        required
                        className={phoneError ? 'input-error' : ''}
                        onChange={() => phoneError && setPhoneError('')}
                      />
                      {phoneError && <span className="form-error">{phoneError}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor={`need${formId}`}>Nhu cầu vay</label>
                      <select id={`need${formId}`} name="need" required defaultValue="">
                        <option value="" disabled>Chọn nhu cầu vay</option>
                        <option value="mua-nha">Vay mua nhà</option>
                        <option value="xay-sua">Vay xây sửa nhà</option>
                        <option value="kinh-doanh">Vay kinh doanh</option>
                        <option value="tieu-dung">Vay tiêu dùng</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row form-row--single">
                    <div className="form-group">
                      <label htmlFor={`area${formId}`}>Khu vực BĐS thế chấp</label>
                      <select id={`area${formId}`} name="area" required defaultValue="">
                        <option value="" disabled>Chọn khu vực</option>
                        <option value="hcm">Hồ Chí Minh</option>
                        <option value="hn">Hà Nội</option>
                        <option value="dn">Đà Nẵng</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-amber btn-lg btn-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang gửi...' : buttonText}
                  </button>
                </form>
              ) : (
                <div className="form-success" id={`formSuccess${formId}`}>
                  <div className="success-icon"></div>
                  <h3>Cảm ơn bạn đã đăng ký!</h3>
                  <p>Đội ngũ Citics Mortgages sẽ liên hệ bạn trong 24 giờ làm việc.</p>
                </div>
              )}
            </div>

            {isSuccess && (
              <div className="app-cta-row">
                <a href="#" className="btn btn-ghost btn-lg app-cta-desktop">Trải nghiệm hệ thống</a>
                <a href="https://onelink.to/a5ekgf" className="btn btn-ghost btn-lg app-cta-mobile">Tải app</a>
              </div>
            )}

            {stat && (
              <div className="eform-stat">
                <span className="eform-stat-number">
                  <CountUp target={5000} suffix="+" duration={2000} />
                </span>
                <span className="eform-stat-label">{statLabel}</span>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // === CTA VARIANT ===
  if (variant === 'cta') {
    return (
      <section className="section eform eform-cta" id={id}>
        <div className="container eform-cta-inner reveal">
          <h2
            className="section-title section-title--white"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {subtitle && <p className="eform-cta-sub">{subtitle}</p>}

          <a href="#form1" className="btn btn-amber btn-lg">
            {buttonText}
          </a>
        </div>
      </section>
    );
  }

  // === COMPACT VARIANT (default) ===
  const compactContent = (
    <div className="eform-compact-inner reveal">
      <h2 className="eform-compact-title">{title}</h2>
      <a href="#form1" className="btn btn-amber btn-lg">
        {buttonText}
      </a>
    </div>
  );

  if (inline) {
    return compactContent;
  }

  return (
    <section className="section eform eform-compact" id={id}>
      <div className="container">
        {compactContent}
      </div>
    </section>
  );
}
