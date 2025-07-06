import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import images from "../../assets/images"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img src={images.logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg" />
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg sm:text-xl text-gray-900">LocalExplorer</h1>
            <p className="text-xs text-gray-500">Khám phá Vietnam</p>
          </div>
          <div className="sm:hidden">
            <h1 className="font-bold text-base text-gray-900">LocalExplorer</h1>
          </div>
        </div>

        <nav className="hidden lg:flex gap-6 xl:gap-8 text-gray-700 font-medium">
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

        <div className="hidden lg:flex gap-4 items-center">
          <Link to="/login" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">
             Đăng nhập
          </Link>
          <Link
            to="/register"
            className="bg-gradient-to-r from-pink-500 to-pink-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
          >
            Đăng ký
          </Link>
        </div>

        <button 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 px-4 sm:px-6">
            <a 
              href="#home" 
              className="text-pink-600 font-medium py-2 px-3 rounded-lg hover:bg-pink-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </a>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-pink-500 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tính năng
            </a>
            <a 
              href="#destinations" 
              className="text-gray-700 hover:text-pink-500 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Địa điểm
            </a>
            <a 
              href="#business" 
              className="text-gray-700 hover:text-pink-500 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Doanh nghiệp
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-pink-500 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Liên lạc
            </a>
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
              <Link 
                to="/login" 
                className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-pink-500 to-pink-500 text-white px-4 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng ký
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
