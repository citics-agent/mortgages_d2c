import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import USP from '@/components/USP';
import EForm from '@/components/EForm';
import Personas from '@/components/Personas';
import Painpoints from '@/components/Painpoints';
import Solutions from '@/components/Solutions';
import OperatingModel from '@/components/OperatingModel';
import FlowDiagram from '@/components/FlowDiagram';
import Policies from '@/components/Policies';
import Banks from '@/components/Banks';
import News from '@/components/News';
import Footer from '@/components/Footer';
import ClientEffects from '@/components/ClientEffects';

export default function Home() {
  return (
    <>
      <ClientEffects />
      <Nav />

      {/* Hero + EForm seamless wrapper */}
      <div className="hero-eform-wrap">
        <Hero />
        <div className="glass-divider" />
        <EForm
          variant="primary"
          id="form1"
          formId="mortgageForm1"
          title="Nhận tư vấn <span class='highlight-free'>miễn phí</span><br/>ngay hôm nay"
          subtitle="Điền thông tin để nhận tư vấn. Đội ngũ Citics Mortgages sẽ liên hệ bạn trong 24 giờ làm việc."
          buttonText="Nhận tư vấn miễn phí"
          stat="5.000+"
          statLabel="hồ sơ đã được duyệt vay trong vòng 1 năm"
        />
      </div>

      {/* 5. Personas */}
      <Personas />

      {/* 6. Painpoints */}
      <Painpoints />

{/* 7. Solutions */}
      <Solutions />

      {/* 8. EForm #2 - CTA */}
      <EForm
        variant="cta"
        id="form2"
        formId="mortgageForm2"
        title="Nhận tư vấn vay thế chấp <span class='highlight-free'>miễn phí</span> ngay hôm nay"
        buttonText="Nhận tư vấn"
      />

      {/* 9. Operating Model */}
      <OperatingModel />

      {/* 10. Flow Diagram */}
      <FlowDiagram />

      {/* 11. Policies + EForm #3 */}
      <Policies />

      {/* 13. Banks */}
      <Banks />

      {/* 14. News */}
      <News />

      {/* 15. EForm #4 - CTA */}
      <EForm
        variant="cta"
        id="form4"
        formId="mortgageForm4"
        title="Bắt đầu hành trình vay thế chấp thông minh"
        subtitle="Điền thông tin để nhận tư vấn. Đội ngũ Citics Mortgages sẽ liên hệ bạn trong 24 giờ."
        buttonText="Nhận tư vấn miễn phí"
      />

      {/* 16. Footer */}
      <Footer />
    </>
  );
}
