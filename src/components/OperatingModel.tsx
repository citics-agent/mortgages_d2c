export default function OperatingModel() {
  return (
    <section className="section opmodel" id="opmodel">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title">Citics Mortgages hoạt động ra sao?</h2>
          <p className="section-subtitle opmodel-sub">Mô hình hoạt động</p>
        </div>
        <div className="opmodel-placeholder reveal">
          {/* Desktop: 1920×1200 */}
          <div className="asset-ph asset-ph--opmodel asset-ph--desktop">
            <div className="asset-ph-icon">📋</div>
            <div className="asset-ph-file">opmodel-desktop.png / .jpg</div>
            <div className="asset-ph-size">1920 × 1200px</div>
            <div className="asset-ph-desc">Infographic mô hình hoạt động Citics Mortgages (3 bước)</div>
          </div>
          {/* Mobile: 1080×1080 */}
          <div className="asset-ph asset-ph--opmodel asset-ph--mobile">
            <div className="asset-ph-icon">📋</div>
            <div className="asset-ph-file">opmodel-mobile.png / .jpg</div>
            <div className="asset-ph-size">1080 × 1080px</div>
            <div className="asset-ph-desc">Infographic mô hình hoạt động (mobile)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
