import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Search,
  Bell,
  Calendar,
  Settings,
  HelpCircle,
  Moon,
  MessageSquare,
  LogOut,
  Users,
  Menu,
  X,
} from "lucide-react";
import config from "../../config";
import images from "../../assets/images";
import { AuthContext } from "../../providers/AuthProvider";

const Header = ({ title, description, breadcrumbs, actions, user }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const avatarRef = useRef(null);
  const menuRef = useRef(null);
  const {auth, logout} = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setOpenMenu(false);
      }
    };
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  return (
    <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1 sm:mb-2">
            <h1 className="text-lg sm:text-xl font-medium text-gray-900 truncate">
              Xin Chào, {auth?.fullName}
            </h1>
            <span className="text-lg sm:text-xl">👋</span>
          </div>
          {breadcrumbs && (
            <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 overflow-hidden">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center flex-shrink-0">
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-gray-700 truncate">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-medium truncate">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 flex-shrink-0" />
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              to={config.routes.notifications}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Link>

            <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 relative">
            <div
              ref={avatarRef}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:cursor-pointer"
              onClick={() => setOpenMenu((v) => !v)}
            >
              <img
                src={auth.avatar || images.avatar}
                alt={user?.name || "User"}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="text-white text-xs sm:text-sm font-medium hidden">
                {(user?.name || "V").charAt(0)}
              </span>
            </div>

            {openMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 top-12 sm:top-14 z-50 w-72 sm:w-80 bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 p-3 sm:p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={auth?.avatar || images.avatar}
                    alt={"avatar"}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {auth.fullName || "User"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                  </div>
                </div>
                <Link
                  to={config.routes.settings}
                  className="block w-full text-center bg-gray-100 hover:bg-gray-200 rounded-lg py-2 font-medium text-gray-700 mb-3 text-sm"
                >
                  <Users className="inline w-4 h-4 mr-1" />
                  Xem trang cá nhân
                </Link>
                <div className="divide-y divide-gray-100">
                  <button className="flex items-center w-full gap-3 py-2 sm:py-3 px-2 hover:bg-gray-50 rounded-lg text-gray-700 text-sm">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Trợ giúp & hỗ trợ
                  </button>
                  <button className="flex items-center w-full gap-3 py-2 sm:py-3 px-2 hover:bg-gray-50 rounded-lg text-gray-700 text-sm">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    Đóng góp ý kiến
                  </button>
                  <button
                    onClick={() => logout()}
                    className="flex items-center w-full gap-3 py-2 sm:py-3 px-2 hover:bg-gray-50 rounded-lg text-red-600 font-semibold text-sm"
                  >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {openMobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setOpenMobileMenu(false)} />
      )}

      {/* Mobile menu */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        openMobileMenu ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button 
              onClick={() => setOpenMobileMenu(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <button className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5" />
            <span>Tìm kiếm</span>
          </button>
          
          <Link
            to={config.routes.notifications}
            onClick={() => setOpenMobileMenu(false)}
            className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span>Thông báo</span>
            <span className="ml-auto w-3 h-3 bg-red-500 rounded-full"></span>
          </Link>

          <div className="w-full flex items-center gap-3 p-3 text-gray-600 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
