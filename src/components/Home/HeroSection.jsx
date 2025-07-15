import { Smartphone, Star, Users, MapPin, Download } from "lucide-react"
import images from "../../assets/images"

const HeroSection = () => (
  <section
    id="home"
    className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 min-h-screen flex items-center"
  >
    {/* Animated background blobs */}
    <div className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 bg-orange-200 rounded-full opacity-20 animate-pulse blur-2xl"></div>
    <div className="absolute bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000 blur-2xl"></div>
    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-100 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT */}
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-xs sm:text-sm font-medium shadow-sm">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="hidden sm:inline">Vietnam's #1 Local Discovery Platform</span>
            <span className="sm:hidden">#1 Discovery Platform</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
            Discover Vietnam's Hidden Gems
          </h1>
          <div className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
            Trải nghiệm địa phương đích thực, khám phá độc đáo, kỷ niệm khó quên.
          </div>
        

          {/* Download App Box */}
          <div className="bg-white/90 rounded-2xl border-2 border-green-200 p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Khách du lịch</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                Tải app để khám phá, đặt trải nghiệm, nhận ưu đãi độc quyền!
              </p>
              <a
                href="https://expo.dev/accounts/phongnguyenthanh04203/projects/LocalExplorer/builds/baee485c-417d-41f7-bbd0-c9bb175634fa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg font-bold text-base shadow-lg hover:scale-105 transition-transform"
              >
                <Download className="w-5 h-5 mr-2" />
                Tải app Android
              </a>
            </div>
            {/* QR code nếu có */}
            {images.qr && (
              <div className="flex flex-col items-center">
                <img src={images.qr} alt="QR code download" className="w-20 h-20 rounded-lg border border-gray-200 shadow-sm" />
                <span className="text-xs text-gray-500 mt-1">Quét QR để tải app</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative order-first lg:order-last flex justify-center items-center">
          <div className="relative z-10">
            <img
              src={images.hero4}
              alt="Travel companion with mobile app"
              className="w-full h-auto max-w-md mx-auto lg:max-w-none rounded-3xl  hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-2xl shadow-2xl p-3 sm:p-4 z-20 border border-orange-100">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <div>
                <div className="text-xs sm:text-sm font-bold">Ho Chi Minh City</div>
                <div className="text-xs text-gray-500">245 experiences</div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-2 right-4 sm:-bottom-4 sm:right-10 bg-white rounded-2xl shadow-2xl p-3 sm:p-4 z-20 border border-pink-100">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1 sm:-space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold">2.5K+ Reviews</div>
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
