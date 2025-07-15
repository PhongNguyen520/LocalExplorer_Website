

const FeaturesSection = () => (
  <section id="features" className="py-14 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-gray-700 rounded-full text-sm font-semibold mb-4">
          Những gì chúng tôi cung cấp
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Hai nền tảng, Một tầm nhìn
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kết nối du khách với trải nghiệm địa phương đích thực qua app di động, trao quyền cho doanh nghiệp qua nền tảng web.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-14">
        {/* Traveler */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow p-8 flex flex-col gap-6 justify-center h-full">
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Khách du lịch</h3>
            <p className="text-gray-700 font-medium">Trải nghiệm ứng dụng di động</p>
          </div>
          <ul className="space-y-5 ml-2">
            <li className="flex items-start gap-4">
              <span className="mt-2 w-3 h-3 bg-blue-400 rounded-full inline-block flex-shrink-0"></span>
              <div>
                <h4 className="font-semibold text-gray-900 text-base mb-1">Khám phá những viên ngọc ẩn</h4>
                <p className="text-gray-600 text-sm">Tìm những trải nghiệm địa phương đích thực và những điểm đến ít người biết đến.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 w-3 h-3 bg-blue-400 rounded-full inline-block flex-shrink-0"></span>
              <div>
                <h4 className="font-semibold text-gray-900 text-base mb-1">Lập kế hoạch hành trình thông minh</h4>
                <p className="text-gray-600 text-sm">Đề xuất AI dựa trên sở thích và vị trí của bạn.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 w-3 h-3 bg-blue-400 rounded-full inline-block flex-shrink-0"></span>
              <div>
                <h4 className="font-semibold text-gray-900 text-base mb-1">Đánh giá đã xác minh</h4>
                <p className="text-gray-600 text-sm">Đánh giá thực tế từ cộng đồng giúp bạn quyết định sáng suốt.</p>
              </div>
            </li>
          </ul>
        </div>
        {/* Business */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow p-8 flex flex-col gap-6 justify-center h-full">
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Doanh nghiệp</h3>
            <p className="text-gray-700 font-medium">Quản lý nền tảng web</p>
          </div>
          <ul className="space-y-5 ml-2">
            <li className="flex items-start gap-4">
              <span className="mt-2 w-3 h-3 bg-orange-400 rounded-full inline-block flex-shrink-0"></span>
              <div>
                <h4 className="font-semibold text-gray-900 text-base mb-1">Tiếp cận nhiều khách hàng hơn</h4>
                <p className="text-gray-600 text-sm">Kết nối với hàng ngàn du khách đang tìm kiếm trải nghiệm đích thực.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 w-3 h-3 bg-orange-400 rounded-full inline-block flex-shrink-0"></span>
              <div>
                <h4 className="font-semibold text-gray-900 text-base mb-1">Quản lý dễ dàng</h4>
                <p className="text-gray-600 text-sm">Quản lý, cập nhật tính khả dụng và theo dõi hiệu suất.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 w-3 h-3 bg-orange-400 rounded-full inline-block flex-shrink-0"></span>
              <div>
                <h4 className="font-semibold text-gray-900 text-base mb-1">Tăng doanh thu</h4>
                <p className="text-gray-600 text-sm">Tăng khả năng hiển thị và thu hút nhiều khách hàng hơn để phát triển doanh nghiệp.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
)

export default FeaturesSection


