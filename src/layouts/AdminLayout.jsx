import Sidebar from "../components/Admin/Sidebar"
import Header from "../components/Admin/Header"

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
export default AdminLayout
