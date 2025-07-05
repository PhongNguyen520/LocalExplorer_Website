"use client"
import { useState, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  MessageSquare,
  Package,
  MapPin,
  Calendar,
  Globe,
  LogOut,
  User,
} from "lucide-react"
import images from "../../assets/images"
import { AuthContext } from "../../providers/AuthProvider"
import { cn } from "../../utils/cn"

const menuGroups = [
  {
    label: "Tổng quan",
    items: [
      { to: "/dashboard", label: "Thống kê", icon: LayoutDashboard },
      { to: "/analytics", label: "Phân tích", icon: BarChart3 },
    ],
  },
  {
    label: "Quản lý người dùng",
    items: [
      { to: "/users", label: "Người dùng", icon: Users },
      { to: "/businesses", label: "Doanh nghiệp", icon: Building2 },
      { to: "/events", label: "Sự kiện ", icon: Calendar },

    ],
  },
  // {
  //   label: "Nội dung & Dịch vụ",
  //   items: [
  //     // { to: "/activities", label: "Hoạt động", icon: Package },
  //     { to: "/services", label: "Dịch vụ", icon: Globe },
  //     { to: "/locations", label: "Địa điểm", icon: MapPin },
  //     // { to: "/schedules", label: "Lịch trình", icon: Calendar },
  //   ],
  // },
  {
    label: "Tài chính & Báo cáo",
    items: [
      { to: "/transactions", label: "Giao dịch", icon: CreditCard },
      { to: "/reports", label: "Báo cáo", icon: FileText },
      { to: "/feedbacks", label: "Đánh giá", icon: MessageSquare },
    ],
  },
  {
    label: "Hệ thống",
    items: [
      { to: "/notifications", label: "Thông báo", icon: Bell },
      { to: "/settings", label: "Cài đặt", icon: Settings },
    ],
  },
]

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  return (
    <aside
      className={cn(
        "bg-white border-r transition-all duration-300 min-h-screen flex flex-col relative",
        isCollapsed ? "w-16" : "w-50",
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={images.logo || "/placeholder.svg"} alt="Logo" className="w-10 h-10 rounded-xl shadow-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h1 className="font-bold text-lg">LocalExplorer</h1>
              <p className="text-xs text-slate-400">Admin Dashboard</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-white"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 p-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        <div className="space-y-6">
          {menuGroups.map((group) => (
            <div key={group.label}>
              {!isCollapsed && (
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
                  {group.label}
                </div>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.to
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={cn(
                          "group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                          isActive
                            ? "bg-teal-500 text-white shadow-lg shadow-emerald-500/25"
                            : "text-slate-600 hover:bg-slate-300/20 ",
                          isCollapsed ? "justify-center" : "justify-start",
                        )}
                      >
                        <Icon
                          className={cn(
                            "flex-shrink-0 transition-transform group-hover:scale-110",
                            isActive ? "w-5 h-5" : "w-5 h-5",
                          )}
                        />
                        {!isCollapsed && <span className="ml-3 font-medium text-sm">{item.label}</span>}
                        {isActive && !isCollapsed && (
                          <div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>
                        )}
                        {isCollapsed && (
                          <span className="absolute left-full ml-4 w-max bg-slate-800 text-white text-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-slate-600 shadow-xl">
                            {item.label}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>

  )
}

export default Sidebar
