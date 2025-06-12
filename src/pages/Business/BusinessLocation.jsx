import { useParams } from "react-router-dom"
import Header from "../../components/Business/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Business/ui/Card"
import { Edit3 } from 'lucide-react'
import Button from "../../components/Business/ui/Button"

const BusinessLocation = () => {
  const { businessId } = useParams()

  return (
    <div className="p-6">
      <Header
        title="Quản lý Địa điểm"
        description="Cập nhật thông tin địa điểm của business"
        breadcrumbs={[
          { label: "Businesses", href: "/businesses" },
          { label: "Nhà hàng Hương Việt", href: `/business/${businessId}` },
          { label: "Địa điểm" },
        ]}
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Thông tin Địa điểm</CardTitle>
          <CardDescription>Chi tiết về vị trí của business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quốc gia</label>
                <input
                  type="text"
                  value="Việt Nam"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
                <input
                  type="text"
                  value="TP. Hồ Chí Minh"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
                <input
                  type="text"
                  value="Quận 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã</label>
                <input
                  type="text"
                  value="Phường Bến Nghé"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ chi tiết</label>
                <textarea
                  rows={3}
                  value="123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button>
              <Edit3 className="mr-2 h-4 w-4" />
              Chỉnh sửa địa điểm
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BusinessLocation
