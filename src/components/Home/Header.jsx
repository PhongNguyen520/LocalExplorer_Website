import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import images from "../../assets/images"

const menuItems = [
  { href: "#home", label: "Trang chủ" },
  { href: "#features", label: "Tính năng" },
  { href: "#experiences", label: "Trải nghiệm" },
  { href: "#business", label: "Doanh nghiệp" },
  { href: "#contact", label: "Liên lạc" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState(window.location.hash || "#home")

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || "#home")
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

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

        <nav className="hidden lg:flex gap-6 xl:gap-8 text-gray-800 font-medium">
          {menuItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={
                (activeHash === item.href
                  ? "font-bold border-b-2 border-gray-900 pb-1 "
                  : "hover:underline underline-offset-4 ") +
                "transition-all duration-150"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex gap-4 items-center">
          <Link to="/login" className="text-gray-800 font-medium hover:underline underline-offset-4 transition-colors">
             Đăng nhập
          </Link>
          <Link
            to="/register"
            className="bg-gray-900 text-white px-5 sm:px-7 py-2 rounded-full font-bold shadow hover:scale-105 hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
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
            {menuItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={
                  (activeHash === item.href
                    ? "font-bold border-b-2 border-gray-900 py-2 px-3 rounded-lg transition-all"
                    : "text-gray-800 hover:underline underline-offset-4 py-2 px-3 rounded-lg transition-colors")
                }
                onClick={() => { setIsMenuOpen(false); }}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
              <Link 
                to="/login" 
                className="text-gray-800 font-medium hover:underline underline-offset-4 py-2 px-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-gray-900 text-white px-4 py-3 rounded-full font-bold text-center hover:scale-105 hover:shadow-lg transition-all"
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
