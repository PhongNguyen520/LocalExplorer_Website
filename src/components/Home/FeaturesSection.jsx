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
  <section id="features" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
          <Zap className="w-4 h-4 mr-2" />
          Những gì chúng tôi cung cấp
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Hai nền tảng, Một tầm nhìn
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Kết nối du khách với những trải nghiệm địa phương đích thực thông qua
          ứng dụng di động của chúng tôi, đồng thời trao quyền cho các doanh
          nghiệp tiếp cận khách hàng mới thông qua nền tảng web của chúng tôi.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* For Travelers */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Khách du lịch
              </h3>
              <p className="text-blue-600 font-medium">
                Trải nghiệm ứng dụng di động
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Khám phá những viên ngọc ẩn
                </h4>
                <p className="text-gray-600 text-sm">
                  Tìm những trải nghiệm địa phương đích thực và những điểm đến
                  ít người biết đến.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Lập kế hoạch hành trình thông minh
                </h4>
                <p className="text-gray-600 text-sm">
                  Các đề xuất do AI cung cấp dựa trên sở thích và vị trí của bạn
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Đánh giá đã xác minh
                </h4>
                <p className="text-gray-600 text-sm">
                  Đánh giá thực tế từ những người bạn đồng hành giúp bạn đưa ra
                  quyết định sáng suốt.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-200">
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Download Mobile App
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8 border border-orange-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Doanh nghiệp</h3>
              <p className="text-orange-600 font-medium">
                Quản lý nền tảng web
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Tiếp cận nhiều khách hàng hơn
                </h4>
                <p className="text-gray-600 text-sm">
                  Kết nối với hàng ngàn du khách đang tìm kiếm những trải nghiệm
                  đích thực.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Quản lý dễ dàng</h4>
                <p className="text-gray-600 text-sm">
                  Quản lý, cập nhật tính khả dụng và theo dõi hiệu suất
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Zap className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Tăng doanh thu</h4>
                <p className="text-gray-600 text-sm">
                  Tăng khả năng hiển thị và thu hút nhiều khách hàng hơn để phát
                  triển doanh nghiệp của bạn
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-orange-200">
            <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Đăng ký doanh nghiệp
            </button>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Khám phá địa phương</h4>
          <p className="text-gray-600 text-sm">
            Tìm những trải nghiệm địa phương độc đáo và những viên ngọc ẩn giấu
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Kế hoạch thông minh</h4>
          <p className="text-gray-600 text-sm">
            Gợi ý hành trình được hỗ trợ bởi AI
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-orange-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Cộng đồng</h4>
          <p className="text-gray-600 text-sm">
            Kết nối với những du khách khác và người dân địa phương
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Đáng tin cậy</h4>
          <p className="text-gray-600 text-sm">
            Các doanh nghiệp đã được xác minh và đánh giá xác thực
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
