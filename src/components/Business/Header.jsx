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
} from "lucide-react";
import config from "../../config";
import images from "../../assets/images";
import { AuthContext } from "../../providers/AuthProvider";

const Header = ({ title, description, breadcrumbs, actions, user }) => {
  const [openMenu, setOpenMenu] = useState(false);
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
    <div className="bg-white border-b border-gray-200 px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-xl font-medium text-gray-900">
              Xin Chào, {auth?.fullName}
            </h1>
            <span className="text-xl">👋</span>
          </div>
          {breadcrumbs && (
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-gray-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-medium"></span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-4 h-4 mx-2" />
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
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

          <div className="flex items-center space-x-3 relative">
            <div
              ref={avatarRef}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:cursor-pointer"
              onClick={() => setOpenMenu((v) => !v)}
            >
              <img
                src={auth.avatar || images.avatar}
                alt={user?.name || "User"}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="text-white text-sm font-medium hidden">
                {(user?.name || "V").charAt(0)}
              </span>
            </div>

            {openMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 top-14 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={auth?.avatar || images.avatar}
                    alt={"avatar"}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {auth.fullName || "User"}
                    </div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block w-50 text-center bg-gray-100 hover:bg-gray-200 rounded-lg py-2 font-medium text-gray-700 mb-3"
                >
                  <Users className="inline w-4 h-4 mr-1" />
                  Xem trang cá nhân
                </Link>
                <div className="divide-y divide-gray-100">
                  <button className="flex items-center w-full gap-3 py-3 px-2 hover:bg-gray-50 rounded-lg text-gray-700">
                    <HelpCircle className="w-5 h-5" />
                    Trợ giúp & hỗ trợ
                  </button>
                  <button className="flex items-center w-full gap-3 py-3 px-2 hover:bg-gray-50 rounded-lg text-gray-700">
                    <MessageSquare className="w-5 h-5" />
                    Đóng góp ý kiến
                  </button>
                  <button
                    onClick={() => logout()}
                    className="flex items-center w-full gap-3 py-3 px-2 hover:bg-gray-50 rounded-lg text-red-600 font-semibold"
                  >
                    <LogOut className="w-5 h-5" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
