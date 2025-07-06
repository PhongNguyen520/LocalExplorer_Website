import Sidebar from "../components/Business/Sidebar"
import { useSidebar } from "../contexts/SidebarContext"

const BusinessLayout = ({ children }) => {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay for sidebar */}
      <div className="lg:hidden">
        <Sidebar />
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${
        isCollapsed ? "lg:ml-16" : "lg:ml-64"
      }`}>
        {children}
      </main>
    </div>
  )
}

export default BusinessLayout
