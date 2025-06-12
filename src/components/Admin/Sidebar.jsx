"use client"
import { useState } from "react"
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
  Shield,
  LogOut,
} from "lucide-react"
import images from "../../assets/images"
import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"


const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "businesses", label: "Businesses", icon: Building2 },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div
      className={`bg-white transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} min-h-screen flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
             <img src={images.logo} alt="Logo" className="w-12 h-12 rounded-full" />
              <div>
                <h1 className="font-bold text-lg">LocalExplorer</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-200 "
                  } ${isCollapsed ? "justify-center" : "justify-start"}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@localexplorer.vn</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button onClick={() => logout()} className="w-full mt-3 flex items-center space-x-2 px-3 py-2 text-red-700 hover:bg-red-700 hover:text-white rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Sidebar
