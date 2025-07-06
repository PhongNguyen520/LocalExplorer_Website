import { useRef, useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import {
  ChevronRight,
  Search,
  Bell,
  Calendar,
  Settings,
  Moon,
  Sun,
  MessageSquare,
  LogOut,
  Users,
  Filter,
  Plus,
  Download,
  Menu,
  X,
} from "lucide-react"
import images from "../../assets/images"
import { AuthContext } from "../../providers/AuthProvider"
import config from "../../config"

const Header = ({ breadcrumbs, onMenuClick }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const avatarRef = useRef(null)
  const menuRef = useRef(null)
  const { auth, logout } = useContext(AuthContext)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setOpenMenu(false)
      }
    }
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openMenu])

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors mr-3"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          {breadcrumbs && (
            <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-500 mb-1 sm:mb-2 overflow-hidden">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center flex-shrink-0">
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-slate-700 transition-colors font-medium truncate">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-900 font-semibold truncate">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-slate-400 flex-shrink-0" />}
                </div>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 truncate">
                Xin chào, {auth?.fullName || "Admin"} 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">Chào mừng trở lại với bảng điều khiển quản trị</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Desktop dark mode button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="hidden sm:flex p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-slate-600" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Mobile dark mode button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="sm:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-slate-600" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          <Link
            to={config.routes.adminNotifications}
            className="relative p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white">
              3
            </span>
          </Link>

          {/* Desktop date */}
          <div className="hidden xl:flex items-center space-x-2 text-slate-600 bg-slate-100 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              {new Date().toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="relative">
            <button
              ref={avatarRef}
              className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg sm:rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setOpenMenu((v) => !v)}
            >
              <img
                src={auth?.avatar || images.avatar}
                alt={auth?.fullName || "User"}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-cover border-2 border-emerald-500/30"
              />
              <div className="hidden md:block text-left min-w-0">
                <div className="text-sm font-semibold text-slate-900 truncate">{auth?.fullName || "Admin User"}</div>
                <div className="text-xs text-slate-500 truncate">{auth?.email || "admin@localexplorer.vn"}</div>
              </div>
            </button>

            {openMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 top-14 sm:top-16 z-50 w-72 sm:w-80 bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="p-3 sm:p-4 border-b">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={auth?.avatar || images.avatar}
                      alt={auth?.fullName || "avatar"}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover border-3 border-white/30"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm sm:text-base truncate">{auth?.fullName || "Admin User"}</div>
                      <div className="text-xs sm:text-sm text-slate-500 truncate">{auth?.email || "admin@localexplorer.vn"}</div>
                    </div>
                  </div>
                </div>

                <div className="p-2 sm:p-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-slate-50 rounded-lg sm:rounded-xl transition-colors text-slate-700"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm sm:text-base">Trang cá nhân</div>
                      <div className="text-xs text-slate-500">Xem và chỉnh sửa thông tin</div>
                    </div>
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-slate-50 rounded-lg sm:rounded-xl transition-colors text-slate-700"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm sm:text-base">Cài đặt</div>
                      <div className="text-xs text-slate-500">Tùy chỉnh hệ thống</div>
                    </div>
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-slate-50 rounded-lg sm:rounded-xl transition-colors text-slate-700"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm sm:text-base">Trợ giúp</div>
                      <div className="text-xs text-slate-500">Hướng dẫn sử dụng</div>
                    </div>
                  </Link>

                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-red-50 rounded-lg sm:rounded-xl transition-colors text-red-600"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base">Đăng xuất</div>
                        <div className="text-xs text-red-500">Thoát khỏi hệ thống</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
