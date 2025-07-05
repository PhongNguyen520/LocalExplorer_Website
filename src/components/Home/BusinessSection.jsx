
import {
  Building2,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import images from "../../assets/images";

const BusinessSection = () => (
  <section id="business" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            <Building2 className="w-4 h-4 mr-2" />
            Đối với đối tác kinh doanh
          </div>

          <h2 className="text-4xl font-bold text-gray-900">
            Phát triển doanh nghiệp của bạn với

            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              {" "}
              LocalExplorer
            </span>
          </h2>

          <p className="text-xl text-gray-600">
            Tham gia nền tảng khám phá địa phương hàng đầu Việt Nam và kết nối
            với hàng nghìn du khách đang tìm kiếm những trải nghiệm đích thực
            tại khu vực của bạn.

          </p>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Tăng khả năng hiển thị
                </h4>
                <p className="text-gray-600">
                  Được phát hiện bởi những du khách đang tích cực tìm kiếm trải
                  nghiệm địa phương.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Quản lý dễ dàng</h4>
                <p className="text-gray-600">
                  Quản lý tình trạng phòng trống và thông tin liên lạc với khách
                  hàng tại một nơi
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Tăng doanh thu</h4>
                <p className="text-gray-600">
                  Tiếp cận khách hàng mới và tăng tỷ lệ đặt phòng của bạn
                </p>

              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-pink-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Đăng ký doanh nghiệp
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Xem thêm

            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-20 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Platform Statistics
            </h3>


            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Khách du lịch</div>

              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">1K+</div>
                <div className="text-sm text-gray-600">
                  Đối tác doanh nghiệp
                </div>

              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">85%</div>
                <div className="text-sm text-gray-600">Tăng doanh thu</div>

              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Đánh giá trung bình</div>

              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={images.avatar}
                alt="Business owner"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Minh Nguyen</h4>
                <p className="text-sm text-gray-600">Tour ẩm thực Sài Gòn</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Kể từ khi tham gia LocalExplorer, lượng đặt phòng của chúng tôi
              đã tăng 200%. Nền tảng này giúp dễ dàng tiếp cận những du khách
              thực sự quan tâm đến những trải nghiệm địa phương đích thực."

            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

);

export default BusinessSection;

