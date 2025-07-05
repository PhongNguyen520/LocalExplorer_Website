import { useState } from "react"
import Dashboard from "../../components/Admin/Dashboard"
import UsersManagement from "../../components/Admin/UsersManagement"
import BusinessManagement from "../../components/Admin/BusinessManagement"
import TransactionsManagement from "../../components/Admin/TransactionsManagement"
import ReportsManagement from "../../components/Admin/ReportsManagement"
import NotificationsManagement from "../../components/Admin/NotificationsManagement"
import Sidebar from "../../components/Admin/Sidebar"


const AdminOverview = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "users":
        return <UsersManagement />
      case "businesses":
        return <BusinessManagement />
      case "transactions":
        return <TransactionsManagement />
      case "reports":
        return <ReportsManagement />
      case "notifications":
        return <NotificationsManagement />
      case "analytics":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
            <p className="text-gray-600">Advanced analytics and reporting features coming soon...</p>
          </div>
        )
      case "settings":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
            <p className="text-gray-600">Platform configuration and settings panel...</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-5 overflow-auto">{renderContent()}</main>
    </div>
  )
}

export default AdminOverview
