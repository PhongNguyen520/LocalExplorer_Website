import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSidebar } from "../../contexts/SidebarContext"
import { Building2, Home, Users, Calendar, MessageSquare, FileText, Settings, Bell, CreditCard, BarChart3, MapPin, ImageIcon, Plus, ChevronRight, Menu, X } from 'lucide-react'
import images from "../../assets/images"

// Mock data
const userBusinesses = [
  { id: "4fcc3f44-7d42-4f78-96a7-173e6b491dd4", name: "Nhà hàng Hương Việt", logo: "🍜" },
  { id: "2", name: "Spa Thư Giãn", logo: "💆" },
  { id: "3", name: "Cửa hàng thời trang", logo: "👕" },
]

const mainMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Doanh Nghiệp", url: "/businesses", icon: Building2 },
  { title: "Phân Tích", url: "/analytics", icon: BarChart3 },
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

  const isActive = (path) => location.pathname === path

  const toggleBusinessMenu = (businessId) => {
    setExpandedBusiness(expandedBusiness === businessId ? null : businessId)
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 sidebar-transition z-50 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center ">
            <div className="w-15 h-10 rounded-lg flex items-center justify-center">
              <img
                src={images.logo}
                alt="Logo"
                className="w-20 h-20"
              />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">LocalExplorer</h1>
              <p className="text-xs text-gray-500">Quản lý doanh nghiệp</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <Menu className="w-4 h-4" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Main Menu */}
        <div className="p-4">
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
                  className={`flex items-center gap-3 px-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.url)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.title : ""}
                >
                  <IconComponent className="w-5 h-5" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Businesses */}
        <div className="p-4">
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              BUSINESSES
            </h2>
          )}
          <nav className="space-y-1">
            {userBusinesses.map((business) => (
              <div key={business.id}>
                 <Link
                          key={business.id}
                          to={`/business/${business.id}`}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${
                     isCollapsed ? "justify-center" : "justify-between"
                   } ${
                            isActive(`/business/${business.id}`)
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                // <button
                //   onClick={() =>
                //     !isCollapsed && toggleBusinessMenu(business.id)
                //   }
                //   className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${
                //     isCollapsed ? "justify-center" : "justify-between"
                //   }`}
                //   title={isCollapsed ? business.name : ""}
                // >
                        >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{business.logo}</span>
                    {!isCollapsed && (
                      <span className="truncate">{business.name}</span>
                    )}
                  </div>
                  {/* {!isCollapsed && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        expandedBusiness === business.id ? "rotate-90" : ""
                      }`}
                    />
                  )} */}
                {/* </button> */}
                 </Link>

                {/* {!isCollapsed && expandedBusiness === business.id && (
                  <div className="ml-6 mt-1 space-y-1">
                    {businessMenuItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.title}
                          to={`/business/${business.id}`}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive(`/business/${business.id}`)
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )} */}
              </div>
            ))}

            <Link
              to="/business/create"
              className={`flex items-center gap-3 px-1 py-2 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${
                isCollapsed ? "justify-center" : ""
              }`}
              title={isCollapsed ? "Tạo Business mới" : ""}
            >
              <Plus className="w-5 h-5" />
              {!isCollapsed && <span>Tạo Doanh Nghiệp</span>}
            </Link>
          </nav>
        </div>

        {/* Settings */}
        <div className="p-4 mt-auto mb-auto">
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              SETTINGS
            </h2>
          )}
          <nav className="space-y-1">
            {settingsItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-3 px-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.url)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.title : ""}
                >
                  <IconComponent className="w-5 h-5" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">GX</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Gustavo Xavier
                </p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar
