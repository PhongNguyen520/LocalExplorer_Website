import Sidebar from "../components/Business/Sidebar"
import { useSidebar } from "../contexts/SidebarContext"

const BusinessLayout = ({ children }) => {
  const { isCollapsed } = useSidebar()

  return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>{children}</main>
      </div>
  )
}

export default BusinessLayout
