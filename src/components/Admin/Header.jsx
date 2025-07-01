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
} from "lucide-react"
import images from "../../assets/images"
import { AuthContext } from "../../providers/AuthProvider"
import config from "../../config"

const Header = ({ breadcrumbs }) => {
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
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          {breadcrumbs && (
            <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-slate-700 transition-colors font-medium">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-900 font-semibold">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />}
                </div>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Xin chào, {auth?.fullName || "Admin"} 👋</h1>
              <p className="text-sm text-slate-600">Chào mừng trở lại với bảng điều khiển quản trị</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-slate-600" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          <Link
            to={config.routes.adminNotifications}
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white">
              3
            </span>
          </Link>

          <div className="hidden xl:flex items-center space-x-2 text-slate-600 bg-slate-100 px-4 py-2.5 rounded-xl">
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
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setOpenMenu((v) => !v)}
            >
              <img
                src={auth?.avatar || images.avatar}
                alt={auth?.fullName || "User"}
                className="w-10 h-10 rounded-xl object-cover border-2 border-emerald-500/30"
              />
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-slate-900">{auth?.fullName || "Admin User"}</div>
                <div className="text-xs text-slate-500">{auth?.email || "admin@localexplorer.vn"}</div>
              </div>
            </button>

            {openMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 top-16 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="p-2 border-b">
                  <div className="flex items-center gap-4">
                    <img
                      src={auth?.avatar || images.avatar}
                      alt={auth?.fullName || "avatar"}
                      className="w-16 h-16 rounded-2xl object-cover border-3 border-white/30"
                    />
                    <div>
                      <div className="font-bold text-lm">{auth?.fullName || "Admin User"}</div>
                      <div className="text-sm text-slate-500">{auth?.email || "admin@localexplorer.vn"}</div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors text-slate-700"
                  >
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium">Trang cá nhân</div>
                      <div className="text-xs text-slate-500">Xem và chỉnh sửa thông tin</div>
                    </div>
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors text-slate-700"
                  >
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium">Cài đặt</div>
                      <div className="text-xs text-slate-500">Tùy chỉnh hệ thống</div>
                    </div>
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors text-slate-700"
                  >
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium">Trợ giúp</div>
                      <div className="text-xs text-slate-500">Hướng dẫn sử dụng</div>
                    </div>
                  </Link>

                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors text-red-600"
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                        <LogOut className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">Đăng xuất</div>
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
