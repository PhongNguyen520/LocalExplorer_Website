"use client"

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
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Star,
  Clock,
  DollarSign,
  Package,
  Tag,
  CheckCircle,
  XCircle,
} from "lucide-react"
import CountUp from "react-countup"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../components/Admin/ui/sheet"

const ServicesPage = () => {
  const [services, setServices] = useState([])
  const [serviceTypes, setServiceTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showCreateTypeModal, setShowCreateTypeModal] = useState(false)
  const [openFilterSheet, setOpenFilterSheet] = useState(false)

  const mockServices = [
    {
      id: 1,
      name: "Massage thư giãn toàn thân",
      description: "Dịch vụ massage chuyên nghiệp giúp thư giãn và giảm stress",
      price: 500000,
      discount: 10,
      availability: true,
      duration: 90,
      inclusions: ["Tinh dầu thảo dược", "Khăn nóng", "Trà thảo mộc"],
      exclusions: ["Không bao gồm tip"],
      condition: "Khách hàng cần đặt trước 24h",
      status: "active",
      businessId: 123,
      businessName: "Spa ABC",
      serviceTypeId: 1,
      serviceTypeName: "Spa & Wellness",
      rating: 4.8,
      bookingCount: 156,
      createdTime: "2024-01-10T10:30:00",
    },
    {
      id: 2,
      name: "Tour du lịch Đà Lạt 3N2Đ",
      description: "Tour trọn gói khám phá thành phố ngàn hoa",
      price: 2500000,
      discount: 15,
      availability: true,
      duration: 4320, // 3 days in minutes
      inclusions: ["Khách sạn 4 sao", "Xe đưa đón", "Bữa ăn", "Hướng dẫn viên"],
      exclusions: ["Vé máy bay", "Chi phí cá nhân"],
      condition: "Tối thiểu 4 người",
      status: "active",
      businessId: 456,
      businessName: "Du lịch XYZ",
      serviceTypeId: 2,
      serviceTypeName: "Du lịch",
      rating: 4.6,
      bookingCount: 89,
      createdTime: "2024-01-08T14:20:00",
    },
    {
      id: 3,
      name: "Khóa học Yoga cơ bản",
      description: "Khóa học Yoga 8 buổi cho người mới bắt đầu",
      price: 800000,
      discount: 0,
      availability: false,
      duration: 60,
      inclusions: ["Thảm yoga", "Nước uống", "Tài liệu hướng dẫn"],
      exclusions: ["Trang phục yoga"],
      condition: "Lớp tối đa 15 người",
      status: "inactive",
      businessId: 789,
      businessName: "Yoga Center DEF",
      serviceTypeId: 3,
      serviceTypeName: "Thể thao & Sức khỏe",
      rating: 4.9,
      bookingCount: 234,
      createdTime: "2024-01-05T09:15:00",
    },
  ]

  const mockServiceTypes = [
    {
      id: 1,
      name: "Spa & Wellness",
      icon: "🧘",
      description: "Dịch vụ chăm sóc sức khỏe và làm đẹp",
      status: "active",
      lastUpdatedBy: "admin",
      deletedBy: null,
      createdTime: "2024-01-01T00:00:00",
      lastUpdatedTime: "2024-01-10T10:00:00",
      deletedTime: null,
    },
    {
      id: 2,
      name: "Du lịch",
      icon: "✈️",
      description: "Dịch vụ du lịch và nghỉ dưỡng",
      status: "inactive",
      lastUpdatedBy: "mod1",
      deletedBy: null,
      createdTime: "2024-01-01T00:00:00",
      lastUpdatedTime: "2024-01-08T14:00:00",
      deletedTime: null,
    },
    {
      id: 3,
      name: "Thể thao & Sức khỏe",
      icon: "💪",
      description: "Dịch vụ thể thao và chăm sóc sức khỏe",
      status: "active",
      lastUpdatedBy: "admin",
      deletedBy: null,
      createdTime: "2024-01-01T00:00:00",
      lastUpdatedTime: "2024-01-05T09:00:00",
      deletedTime: null,
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServices(mockServices)
      setServiceTypes(mockServiceTypes)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Hoạt động", color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
      inactive: { label: "Tạm dừng", color: "bg-red-100 text-red-800", icon: XCircle },
      pending: { label: "Chờ duyệt", color: "bg-yellow-100 text-yellow-800", icon: Clock },
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const formatDuration = (minutes) => {
    if (minutes >= 1440) {
      const days = Math.floor(minutes / 1440)
      return `${days} ngày`
    } else if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      return `${hours} giờ`
    } else {
      return `${minutes} phút`
    }
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.businessName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || service.status === statusFilter
    const matchesType = typeFilter === "all" || service.serviceTypeId.toString() === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const filteredServiceTypes = serviceTypes.filter((type) => {
    const matchesSearch =
      type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || type.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats
  const statsArr = [
    {
      title: "Tổng dịch vụ",
      value: serviceTypes.length,
      icon: Package,
      color: "pink",
    },
    {
      title: "Đang hoạt động",
      value: serviceTypes.filter((s) => s.status === "active").length,
      icon: CheckCircle,
      color: "emerald",
    },
    {
      title: "Tạm dừng",
      value: serviceTypes.filter((s) => s.status === "inactive").length,
      icon: XCircle,
      color: "red",
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      pink: "bg-pink-500 text-white",
      emerald: "bg-emerald-500 text-white",
      red: "bg-red-500 text-white",
    }
    return colors[color] || colors.pink
  }
  const getColorBg = (color) => {
    const colors = {
      pink: "bg-pink-50 border-pink-200",
      emerald: "bg-emerald-50 border-emerald-200",
      red: "bg-red-50 border-red-200",
    }
    return colors[color] || colors.pink
  }

  const stats = {
    totalServices: services.length,
    activeServices: services.filter((s) => s.status === "active").length,
    inactiveServices: services.filter((s) => s.status === "inactive").length,
    totalBookings: services.reduce((sum, s) => sum + s.bookingCount, 0),
    avgRating: services.reduce((sum, s) => sum + s.rating, 0) / services.length || 0,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-pink-700">Quản lý loại dịch vụ</h1>
          <p className="text-pink-500 mt-1">Quản lý tất cả loại dịch vụ trong hệ thống</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={() => setShowCreateTypeModal(true)} className="bg-pink-500 hover:bg-pink-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Thêm loại dịch vụ
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsArr.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className={`border-0 shadow-lg ${getColorBg(stat.color)} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColorClasses(stat.color)} shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">
                    <CountUp end={stat.value} duration={1.2} separator="," />
                  </h3>
                  <p className="text-pink-700 text-sm font-medium mb-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-10">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm loại dịch vụ..."
                  className="w-80 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue placeholder="Lọc theo trạng thái">Tất cả trạng thái</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Tạm dừng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setOpenFilterSheet(true)}>
                <Search className="w-4 h-4 mr-2" />
                Bộ lọc nâng cao
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Danh sách loại dịch vụ</CardTitle>
          <CardDescription>
            Hiển thị {filteredServiceTypes.length} trên tổng số {serviceTypes.length} loại dịch vụ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServiceTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.name}</TableCell>
                    <TableCell className="text-2xl">{type.icon}</TableCell>
                    <TableCell>{type.description}</TableCell>
                    <TableCell>{getStatusBadge(type.status)}</TableCell>
                    <TableCell>{type.createdTime ? new Date(type.createdTime).toLocaleDateString("vi-VN") : '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Sheet filter nâng cao */}
      <Sheet open={openFilterSheet} onOpenChange={setOpenFilterSheet}>
        <SheetContent side="right" className="w-full sm:max-w-sm md:max-w-md lg:w-[400px] p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 sm:p-6 border-b">
              <SheetTitle className="text-lg sm:text-xl font-semibold">
                Bộ lọc nâng cao
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Lọc loại dịch vụ theo nhiều tiêu chí chi tiết hơn.
              </SheetDescription>
            </SheetHeader>
            <form className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 space-y-8">
              <div>
                <label className="text-sm text-pink-600">Tìm kiếm</label>
                <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Tìm kiếm..." />
              </div>
              <div>
                <label className="text-sm text-pink-600">Trạng thái</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Tạm dừng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t">
              <Button
                variant="outline"
                className="w-full sm:w-1/2 rounded-md text-sm"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("");
                }}
              >
                Đặt lại
              </Button>
              <Button
                className="w-full sm:w-1/2 rounded-md text-sm bg-pink-500 hover:bg-pink-600 text-white"
                onClick={() => setOpenFilterSheet(false)}
              >
                Áp dụng lọc
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Create Service Type Modal */}
      {showCreateTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Tạo loại dịch vụ mới</CardTitle>
              <CardDescription>Thêm loại dịch vụ mới vào hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="typeName">Tên loại dịch vụ</Label>
                <Input id="typeName" placeholder="Nhập tên loại dịch vụ" />
              </div>
              <div>
                <Label htmlFor="typeIcon">Icon (Emoji)</Label>
                <Input id="typeIcon" placeholder="🎯" />
              </div>
              <div>
                <Label htmlFor="typeDescription">Mô tả</Label>
                <Textarea id="typeDescription" placeholder="Mô tả về loại dịch vụ này" rows={3} />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateTypeModal(false)}>
                  Hủy
                </Button>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white">Tạo loại dịch vụ</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ServicesPage
