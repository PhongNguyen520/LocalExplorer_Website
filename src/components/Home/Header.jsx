import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import images from "../../assets/images"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <img src={images.logo} alt="Logo" className="w-20 h-20 rounded-lg" />
          <div>
            <h1 className="font-bold text-xl text-gray-900">LocalExplorer</h1>
            <p className="text-xs text-gray-500">Khám phá Vietnam</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a
            href="#home"
            className="relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-pink-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left transition-colors duration-200 text-pink-500"
          >
            Trang chủ
          </a>
          <a href="#features" className="hover:text-pink-500 transition-colors">
            Tính năng
          </a>
          <a href="#destinations" className="hover:text-pink-500 transition-colors">
            Địa điểm
          </a>
          <a href="#business" className="hover:text-pink-500 transition-colors">
            Doanh nghiệp
          </a>
          <a href="#contact" className="hover:text-pink-500 transition-colors">
            Liên lạc

          </a>
        </nav>

        <div className="hidden md:flex gap-4 items-center">
          <Link to="/login" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">
             Đăng nhập
          </Link>
          <Link
            to="/register"
            className="bg-gradient-to-r from-pink-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Đăng ký
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <nav className="flex flex-col space-y-4 px-6">
            <a href="#home" className="text-orange-600 font-medium">
              Home
            </a>
            <a href="#features" className="text-gray-700 hover:text-orange-500">
              Features
            </a>
            <a href="#destinations" className="text-gray-700 hover:text-orange-500">
              Destinations
            </a>
            <a href="#business" className="text-gray-700 hover:text-orange-500">
              For Business
            </a>
            <a href="#contact" className="text-gray-700 hover:text-orange-500">
              Contact
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              <Link to="/login" className="text-gray-700 font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-pink-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold text-center"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
