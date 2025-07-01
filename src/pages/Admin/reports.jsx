
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Admin/ui/card"
import { Button } from "../../components/Admin/ui/button"
import { Input } from "../../components/Admin/ui/input"
import { Badge } from "../../components/Admin/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/Admin/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/Admin/ui/select"
import { Textarea } from "../../components/Admin/ui/textarea"
import { Label } from "../../components/Admin/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/Admin/ui/tabs"
import {
  FileText,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  TrendingUp,
  Users,
  Building,
  AlertTriangle,
} from "lucide-react"

const ReportsPage = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState(null)

  const mockReports = [
    {
      id: 1,
      reason: "Dịch vụ không đúng mô tả",
      adminNote: "Đã xác minh và xử lý vi phạm",
      status: "resolved",
      userId: 123,
      userName: "Nguyễn Văn A",
      businessId: 456,
      businessName: "Nhà hàng ABC",
      reportType: "service",
      description: "Dịch vụ được quảng cáo không khớp với thực tế, chất lượng kém",
      evidence: ["image1.jpg", "image2.jpg"],
      createdTime: "2024-01-15T10:30:00",
      resolvedTime: "2024-01-16T14:20:00",
      priority: "high",
    },
    {
      id: 2,
      reason: "Thái độ phục vụ không tốt",
      adminNote: "",
      status: "pending",
      userId: 789,
      userName: "Trần Thị B",
      businessId: 321,
      businessName: "Spa XYZ",
      reportType: "behavior",
      description: "Nhân viên có thái độ không thân thiện, không chuyên nghiệp",
      evidence: [],
      createdTime: "2024-01-14T16:45:00",
      resolvedTime: null,
      priority: "medium",
    },
    {
      id: 3,
      reason: "Lừa đảo thanh toán",
      adminNote: "Báo cáo không có căn cứ, đã bác bỏ",
      status: "rejected",
      userId: 654,
      userName: "Lê Văn C",
      businessId: 987,
      businessName: "Khách sạn DEF",
      reportType: "fraud",
      description: "Bị tính phí không rõ ràng, không có hóa đơn",
      evidence: ["receipt.pdf"],
      createdTime: "2024-01-13T09:15:00",
      resolvedTime: "2024-01-13T15:30:00",
      priority: "high",
    },
  ]

  const mockStats = {
    totalReports: 156,
    pendingReports: 23,
    resolvedReports: 98,
    rejectedReports: 35,
    avgResolutionTime: 2.5, // days
    topReportTypes: [
      { type: "service", count: 45, label: "Dịch vụ" },
      { type: "behavior", count: 32, label: "Thái độ" },
      { type: "fraud", count: 28, label: "Lừa đảo" },
      { type: "quality", count: 25, label: "Chất lượng" },
      { type: "other", count: 26, label: "Khác" },
    ],
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      resolved: { label: "Đã giải quyết", color: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { label: "Đã từ chối", color: "bg-red-100 text-red-800", icon: XCircle },
      investigating: { label: "Đang điều tra", color: "bg-blue-100 text-blue-800", icon: Eye },
    }
    const config = statusConfig[status] || statusConfig.pending
    const Icon = config.icon
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: "Cao", color: "bg-red-100 text-red-800" },
      medium: { label: "Trung bình", color: "bg-yellow-100 text-yellow-800" },
      low: { label: "Thấp", color: "bg-green-100 text-green-800" },
    }
    const config = priorityConfig[priority] || priorityConfig.medium
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getReportTypeLabel = (type) => {
    const typeLabels = {
      service: "Dịch vụ",
      behavior: "Thái độ",
      fraud: "Lừa đảo",
      quality: "Chất lượng",
      other: "Khác",
    }
    return typeLabels[type] || "Khác"
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.businessName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.reportType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6  p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Khiếu nại</h1>
          <p className="text-gray-600 mt-1">Quản lý và xử lý các báo cáo từ người dùng</p>
        </div>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">Danh sách Báo cáo</TabsTrigger>
          <TabsTrigger value="analytics">Thống kê</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-sm text-yellow-600">+5 today</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-sm text-gray-600">Pending Reports</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-sm text-blue-600">+8 today</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Under Investigation</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-sm text-green-600">+15 this week</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-sm text-red-600">3 critical</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm báo cáo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="investigating">Đang điều tra</SelectItem>
                    <SelectItem value="resolved">Đã giải quyết</SelectItem>
                    <SelectItem value="rejected">Đã từ chối</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Loại báo cáo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="service">Dịch vụ</SelectItem>
                    <SelectItem value="behavior">Thái độ</SelectItem>
                    <SelectItem value="fraud">Lừa đảo</SelectItem>
                    <SelectItem value="quality">Chất lượng</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách Báo cáo</CardTitle>
              <CardDescription>
                Hiển thị {filteredReports.length} trên tổng số {reports.length} báo cáo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Báo cáo</TableHead>
                    <TableHead>Người báo cáo</TableHead>
                    <TableHead>Doanh nghiệp</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Mức độ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{report.reason}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{report.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{report.userName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{report.businessName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getReportTypeLabel(report.reportType)}</Badge>
                      </TableCell>
                      <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <p className="text-sm">{new Date(report.createdTime).toLocaleDateString("vi-VN")}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(report.createdTime).toLocaleTimeString("vi-VN")}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tỷ lệ giải quyết</p>
                    <p className="text-2xl font-bold text-green-600">
                      {Math.round((mockStats.resolvedReports / mockStats.totalReports) * 100)}%
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Báo cáo trong tuần</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-xs text-green-600">+15% so với tuần trước</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Doanh nghiệp bị báo cáo</p>
                    <p className="text-2xl font-bold text-orange-600">45</p>
                  </div>
                  <Building className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Người dùng báo cáo</p>
                    <p className="text-2xl font-bold text-purple-600">89</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Report Types */}
          <Card>
            <CardHeader>
              <CardTitle>Loại báo cáo phổ biến</CardTitle>
              <CardDescription>Thống kê các loại báo cáo được gửi nhiều nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStats.topReportTypes.map((item, index) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(item.count / mockStats.totalReports) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Chi tiết Báo cáo #{selectedReport.id}</CardTitle>
              <CardDescription>Thông tin chi tiết về báo cáo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Lý do báo cáo</Label>
                    <p className="text-sm font-medium mt-1">{selectedReport.reason}</p>
                  </div>
                  <div>
                    <Label>Mô tả chi tiết</Label>
                    <p className="text-sm mt-1">{selectedReport.description}</p>
                  </div>
                  <div>
                    <Label>Người báo cáo</Label>
                    <p className="text-sm mt-1">
                      {selectedReport.userName} (ID: {selectedReport.userId})
                    </p>
                  </div>
                  <div>
                    <Label>Doanh nghiệp bị báo cáo</Label>
                    <p className="text-sm mt-1">
                      {selectedReport.businessName} (ID: {selectedReport.businessId})
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Trạng thái</Label>
                    <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
                  </div>
                  <div>
                    <Label>Mức độ ưu tiên</Label>
                    <div className="mt-1">{getPriorityBadge(selectedReport.priority)}</div>
                  </div>
                  <div>
                    <Label>Ngày tạo</Label>
                    <p className="text-sm mt-1">{new Date(selectedReport.createdTime).toLocaleString("vi-VN")}</p>
                  </div>
                  {selectedReport.resolvedTime && (
                    <div>
                      <Label>Ngày giải quyết</Label>
                      <p className="text-sm mt-1">{new Date(selectedReport.resolvedTime).toLocaleString("vi-VN")}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedReport.adminNote && (
                <div>
                  <Label>Ghi chú của Admin</Label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">{selectedReport.adminNote}</p>
                </div>
              )}

              <div>
                <Label>Phản hồi của Admin</Label>
                <Textarea placeholder="Nhập phản hồi hoặc ghi chú xử lý..." rows={3} />
              </div>

              <div>
                <Label>Cập nhật trạng thái</Label>
                <Select defaultValue={selectedReport.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="investigating">Đang điều tra</SelectItem>
                    <SelectItem value="resolved">Đã giải quyết</SelectItem>
                    <SelectItem value="rejected">Đã từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedReport(null)}>
                  Đóng
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Cập nhật</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ReportsPage
