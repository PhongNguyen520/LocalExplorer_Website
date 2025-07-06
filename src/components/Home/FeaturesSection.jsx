import {
  Smartphone,
  Building2,
  MapPin,
  Star,
  Users,
  Calendar,
  Shield,
  Zap,
} from "lucide-react";


const FeaturesSection = () => (
  <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Những gì chúng tôi cung cấp
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Hai nền tảng, Một tầm nhìn
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Kết nối du khách với những trải nghiệm địa phương đích thực thông qua
          ứng dụng di động của chúng tôi, đồng thời trao quyền cho các doanh
          nghiệp tiếp cận khách hàng mới thông qua nền tảng web của chúng tôi.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20">
        {/* For Travelers */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Khách du lịch
              </h3>
              <p className="text-blue-600 font-medium text-sm sm:text-base">
                Trải nghiệm ứng dụng di động
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Khám phá những viên ngọc ẩn
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Tìm những trải nghiệm địa phương đích thực và những điểm đến
                  ít người biết đến.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Lập kế hoạch hành trình thông minh
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Các đề xuất do AI cung cấp dựa trên sở thích và vị trí của bạn
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Đánh giá đã xác minh
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Đánh giá thực tế từ những người bạn đồng hành giúp bạn đưa ra
                  quyết định sáng suốt.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-200">
            <button className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm sm:text-base">
              Download Mobile App
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-orange-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Doanh nghiệp</h3>
              <p className="text-orange-600 font-medium text-sm sm:text-base">
                Quản lý nền tảng web
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Tiếp cận nhiều khách hàng hơn
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Kết nối với hàng ngàn du khách đang tìm kiếm những trải nghiệm
                  đích thực.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Quản lý dễ dàng</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Quản lý, cập nhật tính khả dụng và theo dõi hiệu suất
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Tăng doanh thu</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Tăng khả năng hiển thị và thu hút nhiều khách hàng hơn để phát
                  triển doanh nghiệp của bạn
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-orange-200">
            <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base">
              Đăng ký doanh nghiệp
            </button>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="text-center p-4 sm:p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Khám phá địa phương</h4>
          <p className="text-gray-600 text-xs sm:text-sm">
            Tìm những trải nghiệm địa phương độc đáo và những viên ngọc ẩn giấu
          </p>
        </div>

        <div className="text-center p-4 sm:p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Kế hoạch thông minh</h4>
          <p className="text-gray-600 text-xs sm:text-sm">
            Gợi ý hành trình được hỗ trợ bởi AI
          </p>
        </div>

        <div className="text-center p-4 sm:p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Cộng đồng</h4>
          <p className="text-gray-600 text-xs sm:text-sm">
            Kết nối với những du khách khác và người dân địa phương
          </p>
        </div>

        <div className="text-center p-4 sm:p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Đánh giá thực</h4>
          <p className="text-gray-600 text-xs sm:text-sm">
            Đánh giá xác thực từ cộng đồng du lịch
          </p>
        </div>
      </div>
    </div>
  </section>
)

export default FeaturesSection


