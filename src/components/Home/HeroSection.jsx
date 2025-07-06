import { Smartphone, Star, Users, MapPin, Download } from "lucide-react"
import images from "../../assets/images"

const HeroSection = () => (
  <section
    id="home"
    className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 min-h-screen flex items-center"
  >
    <div className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-xs sm:text-sm font-medium">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="hidden sm:inline">Vietnam's #1 Local Discovery Platform</span>
            <span className="sm:hidden">#1 Discovery Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Discover Vietnam's
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              {" "}
              Hidden Gems
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            Kết nối với những trải nghiệm địa phương đích thực, khám phá những điểm đến độc đáo và tạo nên những kỷ niệm khó quên. Cuộc phiêu lưu của bạn bắt đầu với ứng dụng di động của chúng tôi.
          </p>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Khách du lịch</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Tải ứng dụng di động của chúng tôi để khám phá các điểm đến, lập kế hoạch hành trình và đặt trải nghiệm.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="flex items-center justify-center bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Download for iOS</span>
                <span className="sm:hidden">iOS</span>
              </button>
              <button className="flex items-center justify-center bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Download for Android</span>
                <span className="sm:hidden">Android</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              <h3 className="text-base sm:text-lg font-semibold">Doanh nghiệp</h3>
            </div>
            <p className="mb-3 sm:mb-4 opacity-90 text-sm sm:text-base">Tham gia mạng lưới doanh nghiệp địa phương của chúng tôi và tiếp cận hàng ngàn du khách.</p>
            <button className="bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm sm:text-base">
              Đăng ký doanh nghiệp
            </button>
          </div>
        </div>

        <div className="relative order-first lg:order-last">
          <div className="relative z-10">
            <img
              src={images.hero4}
              alt="Travel companion with mobile app"
              className="w-full h-auto max-w-md mx-auto lg:max-w-none"
            />
          </div>

          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 z-20">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <div>
                <div className="text-xs sm:text-sm font-semibold">Ho Chi Minh City</div>
                <div className="text-xs text-gray-500">245 experiences</div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-2 right-4 sm:-bottom-4 sm:right-10 bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 z-20">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1 sm:-space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold">2.5K+ Reviews</div>
                <div className="text-xs text-gray-500">This month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default HeroSection
