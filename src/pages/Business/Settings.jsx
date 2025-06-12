
import { Save } from 'lucide-react'
import Header from '../../components/Business/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Business/ui/Card'
import Button from '../../components/Business/ui/Button'

const Settings = () => {
  return (
    <div className="p-6">
      <Header
        title="Cài đặt"
        description="Quản lý cài đặt tài khoản và hệ thống"
        breadcrumbs={[{ label: "Cài đặt" }]}
      />

      <div className="space-y-6 mt-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>Cập nhật thông tin tài khoản của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <input
                    type="text"
                    defaultValue="Gustavo Xavier"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="gustavo@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    defaultValue="0901234567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                  <input
                    type="date"
                    defaultValue="1990-01-01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Lưu thay đổi
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt thông báo</CardTitle>
            <CardDescription>Quản lý các loại thông báo bạn muốn nhận</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Feedback mới</p>
                  <p className="text-sm text-gray-600">Nhận thông báo khi có feedback mới</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sự kiện sắp diễn ra</p>
                  <p className="text-sm text-gray-600">Nhận thông báo về các sự kiện sắp tới</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Báo cáo doanh thu</p>
                  <p className="text-sm text-gray-600">Nhận báo cáo doanh thu hàng tháng</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cảnh báo hệ thống</p>
                  <p className="text-sm text-gray-600">Nhận cảnh báo về vấn đề hệ thống</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Bảo mật</CardTitle>
            <CardDescription>Cài đặt bảo mật tài khoản</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button>Đổi mật khẩu</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings
