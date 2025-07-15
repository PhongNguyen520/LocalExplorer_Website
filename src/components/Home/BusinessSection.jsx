import {
  Building2,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import images from "../../assets/images";
import { Link } from "react-router-dom";

const BusinessSection = () => (
  <section id="business" className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
    {/* Animated background blobs */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-orange-100 rounded-full opacity-10 blur-2xl pointer-events-none select-none"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-100 rounded-full opacity-10 blur-2xl pointer-events-none select-none"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-7 sm:space-y-10">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold shadow">
            <Building2 className="w-4 h-4 mr-2" />
            Đối với đối tác kinh doanh
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
            Phát triển doanh nghiệp của bạn với
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg">
              {" "}
              LocalExplorer
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-2">
            Tham gia nền tảng khám phá địa phương hàng đầu Việt Nam và kết nối với hàng nghìn du khách đang tìm kiếm những trải nghiệm đích thực tại khu vực của bạn.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4 bg-white/80 border-l-4 border-green-400 rounded-xl p-3 shadow-sm">
              <CheckCircle className="w-7 h-7 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Tăng khả năng hiển thị</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Được phát hiện bởi những du khách đang tích cực tìm kiếm trải nghiệm địa phương.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white/80 border-l-4 border-blue-400 rounded-xl p-3 shadow-sm">
              <CheckCircle className="w-7 h-7 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Quản lý dễ dàng</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Quản lý tình trạng phòng trống và thông tin liên lạc với khách hàng tại một nơi.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white/80 border-l-4 border-pink-400 rounded-xl p-3 shadow-sm">
              <CheckCircle className="w-7 h-7 text-pink-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Tăng doanh thu</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Tiếp cận khách hàng mới và tăng tỷ lệ đặt phòng của bạn.</p>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end items-end mt-4">
            <Link to="/register">
              <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-transform flex items-center">
                Đăng ký doanh nghiệp
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
            </Link>
          </div> */}
        </div>

        {/* Right Content */}
        <div className="space-y-6 sm:space-y-8 order-first lg:order-last">
          <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-xl flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-10 tracking-tight">Platform Statistics</h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-10 w-full">
              {[
                { value: "1000+", label: "Khách du lịch" },
                { value: "100+", label: "Đối tác doanh nghiệp" },
                { value: "85%", label: "Tăng doanh thu" },
                { value: "4.8", label: "Đánh giá trung bình" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center group transition-all duration-200"
                >
                  <div className="text-3xl sm:text-3xl font-extrabold text-gray-900 mb-1 drop-shadow-sm">{item.value}</div>
                  <div className="text-sm sm:text-base text-gray-700 text-center">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border-2 border-pink-100">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={images.avatar}
                alt="Business owner"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md border-2 border-white"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">Minh Nguyen</h4>
                <p className="text-xs sm:text-sm text-gray-600">Tour ẩm thực Sài Gòn</p>
              </div>
            </div>
            <p className="text-gray-700 italic text-sm sm:text-base font-medium">
              "Kể từ khi tham gia LocalExplorer, lượng đặt phòng của chúng tôi đã tăng 200%. Nền tảng này giúp dễ dàng tiếp cận những du khách thực sự quan tâm đến những trải nghiệm địa phương đích thực."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BusinessSection;

