import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSidebar } from "../../contexts/SidebarContext"
import { Building2, Home, Users, Calendar, MessageSquare, FileText, Settings, Bell, CreditCard, BarChart3, MapPin, ImageIcon, Plus, ChevronRight, Menu, X } from 'lucide-react'
import images from "../../assets/images"
import { getListBusinessApi } from "../../api/ListBusiness"

// const userBusinesses = [ ... ] // XÓA MOCK DATA


const mainMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Doanh Nghiệp", url: "/businesses", icon: Building2 },
]

const businessMenuItems = [
  { title: "Tổng quan", url: "/overview", icon: BarChart3 },
  { title: "Feedback", url: "/feedbacks", icon: MessageSquare },
  { title: "Sự kiện", url: "/events", icon: Calendar },
  { title: "Dịch vụ", url: "/services", icon: Users },
  { title: "Hình ảnh", url: "/images", icon: ImageIcon },
  { title: "Địa điểm", url: "/location", icon: MapPin },
  { title: "Báo cáo", url: "/reports", icon: FileText },
]

const settingsItems = [
  { title: "Gói cước", url: "/pricing", icon: CreditCard },
  { title: "Thông báo", url: "/notifications", icon: Bell },
  { title: "Cài đặt", url: "/settings", icon: Settings },
]

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar()
  const location = useLocation()
  const [expandedBusiness, setExpandedBusiness] = useState(null)
  const [userBusinesses, setUserBusinesses] = useState([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await getListBusinessApi(1, 20);
        setUserBusinesses(res.data.data.items || []);
      } catch (err) {
        setUserBusinesses([]);
      }
    };
    fetchBusinesses();
  }, []);

  const isActive = (path) => location.pathname === path

  const toggleBusinessMenu = (businessId) => {
    setExpandedBusiness(expandedBusiness === businessId ? null : businessId)
  }

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const closeMobileSidebar = () => {
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={handleMobileToggle}
          className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 sidebar-transition z-50 ${
          isCollapsed ? "w-16" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-screen overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            {!isCollapsed && (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img
                    src={images.logo}
                    alt="Logo"
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                </div>
                <div className="ml-2">
                  <h1 className="font-semibold text-gray-900 text-sm sm:text-base">LocalExplorer</h1>
                  <p className="text-xs text-gray-500">Quản lý doanh nghiệp</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSidebar}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isCollapsed ? (
                  <Menu className="w-4 h-4" />
                ) : (
                  <X className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={closeMobileSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Menu */}
          <div className="p-3 sm:p-4">
            {!isCollapsed && (
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Mục chính
              </h2>
            )}
            <nav className="space-y-1">
              {mainMenuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    onClick={closeMobileSidebar}
                    className={`flex items-center px-2 sm:px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.url)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    } ${isCollapsed ? "justify-center" : "gap-3"}`}
                    title={item.title}
                  >
                    <span className="flex items-center justify-center w-6 h-6">
                      <IconComponent className="w-5 h-5" />
                    </span>
                    {!isCollapsed && <span className="truncate text-sm">{item.title}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Businesses */}
          <div className="p-3 sm:p-4">
            {!isCollapsed && (
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Doanh nghiệp
              </h2>
            )}
            <nav className="space-y-1">
              {userBusinesses.map((business) => (
                <div key={business.id}>
                  <Link
                    key={business.id}
                    to={`/business/${business.id}`}
                    onClick={closeMobileSidebar}
                    className={`w-full flex items-center gap-3 px-2 sm:px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isCollapsed ? "justify-center" : "justify-between"
                    } ${
                      isActive(`/business/${business.id}`)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`flex items-center gap-2 sm:gap-3 min-w-0 ${isCollapsed ? "justify-center w-full" : ""}`}>
                      {/* Business logo */}
                      {business.logo ? (
                        business.logo.startsWith("http") ? (
                          <img src={business.logo} alt={business.name} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
                        ) : (
                          <span className="text-base sm:text-lg">{business.logo}</span>
                        )
                      ) : (
                        <span className="text-base sm:text-lg">🏢</span>
                      )}
                      {/* Chỉ hiển thị tên khi không collapsed */}
                      {!isCollapsed && (
                        <span className="truncate text-sm">{business.name}</span>
                      )}
                    </div>
                  </Link>
                </div>
              ))}

              <Link
                to="/business/create"
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3 px-2 sm:px-3 py-2 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                title={isCollapsed ? "Tạo Business mới" : ""}
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                {!isCollapsed && <span className="text-sm">Tạo Doanh Nghiệp</span>}
              </Link>
            </nav>
          </div>

          {/* Settings */}
          <div className="p-3 sm:p-4">
            {!isCollapsed && (
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Cài đặt
              </h2>
            )}
            <nav className="space-y-1">
              {settingsItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    onClick={closeMobileSidebar}
                    className={`flex items-center px-2 sm:px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.url)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    } ${isCollapsed ? "justify-center" : "gap-3"}`}
                    title={item.title}
                  >
                    <span className="flex items-center justify-center w-6 h-6">
                      <IconComponent className="w-5 h-5" />
                    </span>
                    {!isCollapsed && <span className="truncate text-sm">{item.title}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar
     
