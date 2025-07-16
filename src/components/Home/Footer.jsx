import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
} from "lucide-react";
import images from "../../assets/images";

const androidAppUrl = "https://expo.dev/accounts/phongnguyenthanh04203/projects/LocalExplorer/builds/ef31aba0-11cf-4ee4-9389-077e11bfe2ea";

const travelerLinks = [
  { label: "Download App", href: androidAppUrl },
  { label: "Làm việc", href: "#" },
  { label: "Điểm đến", href: "#" },
  { label: "Hướng dẫn", href: "#" },
];
const businessLinks = [
  { label: "Doanh nghiệp", href: "#" },
  { label: "Đối tác", href: "#" },
  { label: "Thành công", href: "#" },
  { label: "Hợp tác", href: "#" },
];

const Footer = () => (
  <footer id="contact" className="py-8 sm:py-10 md:py-12 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
        {/* Company Info */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={images.logo}
              alt="LocalExplorer Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
            />
            <div>
              <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900">LocalExplorer</h3>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">Khám phá Vietnam</p>
            </div>
          </div>
          <p className="text-gray-500 mb-4 md:mb-6 max-w-md text-xs sm:text-sm md:text-base">
            Nền tảng khám phá địa phương hàng đầu Việt Nam kết nối du khách với những trải nghiệm đích thực và trao quyền cho các doanh nghiệp địa phương tiếp cận khách hàng mới.
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>District 9, Ho Chi Minh City, Vietnam</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>localexplorer2025@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>+84 338 377 334</span>
            </div>
          </div>
        </div>

        {/* For Travelers */}
        <div>
          <h4 className="font-semibold text-base sm:text-lg mb-4 text-gray-900">For Travelers</h4>
          <ul className="space-y-2 text-gray-800 text-sm sm:text-base">
            {travelerLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:underline transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* For Businesses */}
        <div>
          <h4 className="font-semibold text-base sm:text-lg mb-4 text-gray-900">For Businesses</h4>
          <ul className="space-y-2 text-gray-800 text-sm sm:text-base">
            {businessLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:underline transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* App Download Section */}
      <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden gap-6 md:gap-0">
        <div className="flex-1 flex flex-col items-center md:items-start z-10 text-center md:text-left">
          <h4 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-900">Tải ứng dụng LocalExplorer</h4>
          <p className="text-gray-700 mb-4 text-sm sm:text-base md:text-lg font-medium">Khám phá những viên ngọc ẩn giấu của Việt Nam ngay trên điện thoại của bạn!</p>
          <a
            href={androidAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-800 text-white font-bold rounded-xl shadow hover:opacity-90 transition-opacity text-base sm:text-lg mb-2"
          >
            Tải ngay cho Android
          </a>
        </div>
        <div className="flex flex-col items-center z-10 mt-4 md:mt-0">
          <img
            src={images.qr}
            alt="QR code download app"
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl border-4 border-white shadow bg-white"
          />
          <span className="text-xs text-gray-500 mt-2">Quét QR để tải app</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 border-t border-gray-200 gap-4 md:gap-0">
        <div className="text-gray-600 text-xs sm:text-sm mb-2 md:mb-0 text-center md:text-left">
          © 2025 LocalExplorer. All rights reserved. <span className="ml-2">Made with <span className="text-gray-700">❤️</span> in Vietnam</span>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a
            href="https://www.facebook.com/profile.php?id=61560017073626"
            className="text-gray-400 hover:opacity-70 transition-opacity bg-white rounded-full p-2 sm:p-2.5 md:p-3 shadow-md border border-gray-100"
            target="_blank" rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
          <a
            href="https://www.instagram.com/local_explorer1/"
            className="text-gray-400 hover:opacity-70 transition-opacity bg-white rounded-full p-2 sm:p-2.5 md:p-3 shadow-md border border-gray-100"
            target="_blank" rel="noopener noreferrer"
          >
            <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
