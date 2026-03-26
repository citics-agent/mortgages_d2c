export default function Painpoints() {
  return (
    <section className="section painpoints" id="painpoints">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <h2 className="section-title section-title--white">Họ đang gặp khó khăn khi tìm khoản vay</h2>
        </div>

        <div className="pain-grid">
          <div className="pain-card reveal reveal-delay-1">
            <span className="pain-num">01</span>

            <p className="pain-desc">Lần đầu đi vay, không biết vay được bao nhiêu, quy trình thế nào, trả lãi ra sao,...</p>
          </div>

          <div className="pain-card reveal reveal-delay-2">
            <span className="pain-num">02</span>

            <p className="pain-desc">Nhu cầu vốn cao nhưng lại chọn ngân hàng giải ngân hạn mức thấp hơn</p>
          </div>

          <div className="pain-card reveal reveal-delay-3">
            <span className="pain-num">03</span>

            <p className="pain-desc">Thuộc nhóm đặc biệt, được hỗ trợ gói vay tốt nhưng lại chọn gói vay tiêu chuẩn</p>
          </div>

          <div className="pain-card reveal reveal-delay-4">
            <span className="pain-num">04</span>

            <p className="pain-desc">Cần vốn nhanh nhưng hồ sơ bị từ chối liên tục, giải ngân chậm</p>
          </div>

          <div className="pain-card pain-card--full reveal reveal-delay-5">
            <span className="pain-num">05</span>

            <p className="pain-desc">Có dư nợ và chưa tìm được ngân hàng nào hỗ trợ tốt để tái cấu trúc</p>
          </div>
        </div>
      </div>
    </section>
  );
}
