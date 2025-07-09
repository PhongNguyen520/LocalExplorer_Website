import { Smartphone, Download, ArrowRight } from "lucide-react"

const CallToActionSection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-50 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10">
      <div className="absolute top-10 left-4 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full"></div>
      <div className="absolute bottom-10 right-4 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full"></div>
    </div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
      <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
        <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
        Bắt đầu cuộc phiêu lưu của bạn ngay hôm nay
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Bạn đã sẵn sàng khám phá kho báu ẩn giấu của Việt Nam chưa?</h2>

      <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
        Tải xuống ứng dụng của chúng tôi và tham gia cùng hàng ngàn du khách đã khám phá những trải nghiệm địa phương đích thực trên khắp Việt Nam.
        Cuộc phiêu lưu tiếp theo của bạn chỉ cách bạn một cú chạm.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
        <a
          href="https://expo.dev/accounts/phongnguyenthanh04203/projects/LocalExplorer/builds/baee485c-417d-41f7-bbd0-c9bb175634fa"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors min-w-[180px] sm:min-w-[200px] text-sm sm:text-base"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
          <div className="text-left">
            <div className="text-xs opacity-75">Get it on</div>
            <div className="text-xs sm:text-sm font-bold">Android Device</div>
          </div>
        </a>
      </div>

      <div className="text-center">
        <p className="text-xs sm:text-sm opacity-75 mb-3 sm:mb-4">Hoặc quét mã QR bằng camera điện thoại của bạn</p>
        <div className="inline-block bg-white p-3 sm:p-4 rounded-xl shadow-lg border border-gray-200">
          <a
            href="https://expo.dev/accounts/phongnguyenthanh04203/projects/LocalExplorer/builds/baee485c-417d-41f7-bbd0-c9bb175634fa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={require('../../assets/images/qr.png')} alt="QR code" className="w-24 h-24 sm:w-32 sm:h-32 object-contain" />
          </a>
        </div>
      </div>
    </div>
  </section>
)

export default CallToActionSection
