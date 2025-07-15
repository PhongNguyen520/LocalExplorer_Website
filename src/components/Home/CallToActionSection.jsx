import { Link } from "react-router-dom"
import images from "../../assets/images"

const CallToActionSection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
        Doanh nghiệp của bạn đã sẵn sàng bứt phá cùng LocalExplorer?
      </h2>
      <p className="text-base sm:text-lg mb-10 text-gray-700 max-w-2xl mx-auto">
        Tham gia LocalExplorer để tiếp cận hàng ngàn khách hàng mới, tăng doanh thu, quảng bá thương hiệu và đồng hành cùng sự phát triển du lịch địa phương.
      </p>
      <div className="mb-10">
        <Link
          to="/register"
          className="inline-block bg-gray-900 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow hover:opacity-90 transition-opacity"

        >
          Đăng ký doanh nghiệp ngay
        </Link>
      </div>
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto items-center">
        {/* Line for desktop */}
        <div className="hidden sm:block absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 z-0" style={{transform: 'translateY(-50%)'}}></div>
        {/* Step 1 */}
        <div className="bg-gray-50 rounded-xl p-6 shadow text-center relative z-10">
          <div className="text-2xl font-bold text-gray-900 mb-2">1</div>
          <div className="font-semibold text-gray-900 mb-1">Đăng ký</div>
          <div className="text-gray-700 text-base">Tạo tài khoản doanh nghiệp miễn phí trên LocalExplorer.</div>
        </div>
        {/* Step 2 */}
        <div className="bg-gray-50 rounded-xl p-6 shadow text-center relative z-10">
          <div className="text-2xl font-bold text-gray-900 mb-2">2</div>
          <div className="font-semibold text-gray-900 mb-1">Tạo hồ sơ</div>
          <div className="text-gray-700 text-base">Cập nhật thông tin, hình ảnh, dịch vụ nổi bật của doanh nghiệp bạn.</div>
        </div>
        {/* Step 3 */}
        <div className="bg-gray-50 rounded-xl p-6 shadow text-center relative z-10">
          <div className="text-2xl font-bold text-gray-900 mb-2">3</div>
          <div className="font-semibold text-gray-900 mb-1">Kết nối khách hàng</div>
          <div className="text-gray-700 text-base">Tiếp cận khách hàng tiềm năng và phát triển kinh doanh hiệu quả.</div>
        </div>
      </div>
    </div>
  </section>
)

export default CallToActionSection
