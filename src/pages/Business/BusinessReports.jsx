import { useParams } from "react-router-dom"
import Header from "../../components/Business/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Business/ui/Card"
import Badge from "../../components/Business/ui/Badge"

// Mock data
const mockReports = [
  {
    id: "1",
    userId: "user1",
    businessId: "1",
    reason: "Spam content",
    adminNote: "Đã xử lý và cảnh báo người dùng",
    status: "resolved",
    createdAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "2",
    userId: "user2",
    businessId: "1",
    reason: "Thông tin sai lệch",
    adminNote: null,
    status: "pending",
    createdAt: "2024-01-15T09:20:00Z",
  },
  {
    id: "3",
    userId: "user3",
    businessId: "1",
    reason: "Nội dung không phù hợp",
    adminNote: "Báo cáo không có căn cứ",
    status: "rejected",
    createdAt: "2024-01-08T16:45:00Z",
  },
]

const BusinessReports = () => {
  const { businessId } = useParams()

  const getStatusVariant = (status) => {
    switch (status) {
      case "resolved":
        return "success"
      case "pending":
        return "warning"
      case "rejected":
        return "error"
      default:
        return "default"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "resolved":
        return "Đã xử lý"
      case "pending":
        return "Đang xử lý"
      case "rejected":
        return "Từ chối"
      default:
        return status
    }
  }

  return (
    <div className="p-6">
      <Header
        title="Báo cáo từ Admin"
        description="Xem các báo cáo và phản hồi từ hệ thống"
        breadcrumbs={[
          { label: "Businesses", href: "/businesses" },
          { label: "Nhà hàng Hương Việt", href: `/business/${businessId}` },
          { label: "Báo cáo" },
        ]}
      />

      {/* Reports List */}
      <div className="space-y-4 mt-6">
        {mockReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Báo cáo #{report.id}</CardTitle>
                  <CardDescription>
                    {new Date(report.createdAt).toLocaleDateString("vi-VN")} • Lý do: {report.reason}
                  </CardDescription>
                </div>
                <Badge variant={getStatusVariant(report.status)}>{getStatusText(report.status)}</Badge>
              </div>
            </CardHeader>
            {report.adminNote && (
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Ghi chú từ Admin:</p>
                  <p className="text-sm text-gray-900">{report.adminNote}</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {mockReports.length === 0 && (
        <Card className="mt-6">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Chưa có báo cáo nào từ admin</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default BusinessReports
