import { Smartphone, Star, Users, MapPin, Download } from "lucide-react"
import images from "../../assets/images"

const HeroSection = () => (
  <section
    id="home"
    className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 min-h-screen flex items-center"
  >
    <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            <Star className="w-4 h-4 mr-2" />
            Vietnam's #1 Local Discovery Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Discover Vietnam's
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              {" "}
              Hidden Gems
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            Kết nối với những trải nghiệm địa phương đích thực, khám phá những điểm đến độc đáo và tạo nên những kỷ niệm khó quên. Cuộc phiêu lưu của bạn bắt đầu với ứng dụng di động của chúng tôi.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Smartphone className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Khách du lịch</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Tải ứng dụng di động của chúng tôi để khám phá các điểm đến, lập kế hoạch hành trình và đặt trải nghiệm.

            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                <Download className="w-5 h-5 mr-2" />
                Download for iOS
              </button>
              <button className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                <Download className="w-5 h-5 mr-2" />
                Download for Android
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-red-200 rounded-2xl p-6 ">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6" />

              <h3 className="text-lg font-semibold">Doanh nghiệp</h3>
            </div>
            <p className="mb-4 opacity-90">Tham gia mạng lưới doanh nghiệp địa phương của chúng tôi và tiếp cận hàng ngàn du khách.</p>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Đăng ký doanh nghiệp

            </button>
          </div>
        </div>

        <div className="relative">
          <div className="relative z-10">
            <img
              src={images.hero4}
              alt="Travel companion with mobile app"
              className="w-full h-auto "
            />
          </div>

          <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 z-20">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-sm font-semibold">Ho Chi Minh City</div>
                <div className="text-xs text-gray-500">245 experiences</div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 right-10 bg-white rounded-xl shadow-lg p-4 z-20">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="text-sm font-semibold">2.5K+ Reviews</div>
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
