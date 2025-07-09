import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import images from "../../assets/images";


const Footer = () => (
  <footer className="py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Company Info */}
        <div className="sm:col-span-2">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
            <img
              src={images.logo}
              alt="LocalExplorer Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg sm:text-xl">LocalExplorer</h3>
              <p className="text-xs sm:text-sm text-gray-400">Khám phá Vietnam</p>
            </div>
          </div>
          <p className="text-gray-500 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
            Nền tảng khám phá địa phương hàng đầu Việt Nam kết nối du khách với
            những trải nghiệm đích thực và trao quyền cho các doanh nghiệp địa
            phương tiếp cận khách hàng mới.
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>District 9, Ho Chi Minh City, Vietnam</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>hello@localexplorer.vn</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>+84 123 456 789</span>
            </div>
          </div>
        </div>

        {/* For Travelers */}
        <div>
          <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">For Travelers</h4>
          <ul className="space-y-2 text-gray-500 text-sm sm:text-base">
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Download App
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Làm việc
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Điểm đến
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Hướng dẫn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Hỗ trợ
              </a>  
            </li>
          </ul>
        </div>

        {/* For Businesses */}
        <div>
          <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">For Businesses</h4>
          <ul className="space-y-2 text-gray-500 text-sm sm:text-base">
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Doanh nghiệp
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Đối tác
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Thành công
              </a>
            </li>
             <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Hợp tác
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Hỗ trợ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Business Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* App Download Section */}
      <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
        <div className="text-center">
          <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Tải ứng dụng LocalExplorer</h4>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Khám phá những viên ngọc ẩn giấu của Việt Nam
          </p>
         
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-gray-800">
        <div className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-0">
          © 2025 LocalExplorer. All rights reserved.
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
