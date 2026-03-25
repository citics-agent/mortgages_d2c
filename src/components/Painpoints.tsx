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
            <h3 className="pain-title">Không biết mình vay được bao nhiêu</h3>
            <p className="pain-desc">Khó xác định hạn mức vay thực tế mà không có chuyên gia hỗ trợ phân tích.</p>
          </div>

          <div className="pain-card reveal reveal-delay-2">
            <span className="pain-num">02</span>
            <h3 className="pain-title">Không biết ngân hàng nào phù hợp</h3>
            <p className="pain-desc">Hơn 30 ngân hàng với tiêu chí khác nhau — rất khó tự đánh giá mà không có dữ liệu.</p>
          </div>

          <div className="pain-card reveal reveal-delay-3">
            <span className="pain-num">03</span>
            <h3 className="pain-title">Hồ sơ chuẩn bị kỹ nhưng vẫn bị từ chối</h3>
            <p className="pain-desc">Thiếu hiểu biết về điều kiện cho vay dẫn đến hồ sơ không đáp ứng yêu cầu.</p>
          </div>

          <div className="pain-card reveal reveal-delay-4">
            <span className="pain-num">04</span>
            <h3 className="pain-title">Thủ tục vay phức tạp và mất thời gian</h3>
            <p className="pain-desc">Quy trình ngân hàng nhiều bước, mỗi ngân hàng lại yêu cầu hồ sơ khác nhau.</p>
          </div>

          <div className="pain-card pain-card--full reveal reveal-delay-5">
            <span className="pain-num">05</span>
            <h3 className="pain-title">Mất nhiều chi phí ẩn để có thể vay được vốn</h3>
            <p className="pain-desc">Phí thẩm định, phí môi giới và các chi phí ẩn khác làm tăng tổng chi phí vay vốn lên đáng kể.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
