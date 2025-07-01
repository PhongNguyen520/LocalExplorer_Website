import { useState } from "react"
import {
  Download,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Eye,
  Edit,
  Trash2,
  Image as ImageIcon,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Admin/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/Admin/ui/table"
import { Button } from "../../components/Admin/ui/button"
import { Input } from "../../components/Admin/ui/input"
import { Badge } from "../../components/Admin/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Admin/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/Admin/ui/select"
import CountUp from "react-countup"
import images from "../../assets/images"

// Mock data dựa trên DB
const feedbacks = [
  {
    id: 1,
    title: "Amazing experience!",
    content: "The tour guide was very knowledgeable and friendly. Highly recommend!",
    rating: 5,
    response: "Thank you for your feedback!",
    status: "Published",
    business: "Hanoi Food Tour",
    user: "Minh Nguyen",
    createdTime: "2023-06-10",
    images: [
      { id: 1, imageUrl: "/placeholder.svg?height=40&width=40", status: "Active" },
    ],
  },
  {
    id: 2,
    title: "Good but could be better",
    content: "The tour was good overall, but the transportation was delayed.",
    rating: 4,
    response: "We will improve our service.",
    status: "Published",
    business: "Saigon City Tour",
    user: "Linh Tran",
    createdTime: "2023-06-08",
    images: [],
  },
  {
    id: 3,
    title: "Disappointing service",
    content: "The tour was overpriced and the guide was not very helpful.",
    rating: 2,
    response: "Sorry for your experience.",
    status: "Pending",
    business: "Hue Imperial City Tour",
    user: "Huy Pham",
    createdTime: "2023-06-05",
    images: [
      { id: 2, imageUrl: "/placeholder.svg?height=40&width=40", status: "Active" },
      { id: 3, imageUrl: "/placeholder.svg?height=40&width=40", status: "Active" },
    ],
  },
]

export default function FeedbacksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRating, setFilterRating] = useState("all")

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesSearch =
      fb.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.business.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || fb.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesRating = filterRating === "all" || fb.rating === Number(filterRating)
    return matchesSearch && matchesStatus && matchesRating
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "deleted":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý đánh giá</h1>
          <p className="text-slate-600 mt-1">Quản lý tất cả feedback của người dùng về doanh nghiệp</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Tổng feedback</p>
                <p className="text-3xl font-bold text-emerald-900"><CountUp end={feedbacks.length} duration={1.2} separator="," /></p>
                <p className="text-emerald-600 text-xs mt-1">+5 mới tuần này</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Chờ duyệt</p>
                <p className="text-3xl font-bold text-yellow-900"><CountUp end={feedbacks.filter(fb => fb.status === "Pending").length} duration={1.2} separator="," /></p>
                <p className="text-yellow-600 text-xs mt-1">+2 mới</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Đã đăng</p>
                <p className="text-3xl font-bold text-blue-900"><CountUp end={feedbacks.filter(fb => fb.status === "Published").length} duration={1.2} separator="," /></p>
                <p className="text-blue-600 text-xs mt-1">+3 mới</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm feedback..."
                  className="w-80 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Published">Đã đăng</SelectItem>
                  <SelectItem value="Pending">Chờ duyệt</SelectItem>
                  <SelectItem value="Deleted">Đã xóa</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Lọc theo đánh giá" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả đánh giá</SelectItem>
                  {[5,4,3,2,1].map(r => (
                    <SelectItem key={r} value={String(r)}>{r} sao</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc nâng cao
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedbacks Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Danh sách feedback</CardTitle>
          <CardDescription>
            Hiển thị {filteredFeedbacks.length} trong tổng số {feedbacks.length} feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Doanh nghiệp</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Ảnh</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedbacks.map((fb) => (
                  <TableRow key={fb.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="font-medium text-slate-900">{fb.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-2 max-w-xs">{fb.content}</div>
                    </TableCell>
                    <TableCell>{fb.business}</TableCell>
                    <TableCell>{fb.user}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{fb.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {fb.images && fb.images.length > 0 ? (
                          fb.images.map(img => (
                            <img
                              key={img.id}
                              src={images.noImage}
                              alt="feedback-img"
                              className="w-8 h-8 rounded object-cover border"
                            />
                          ))
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{fb.createdTime}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(fb.status)}>{fb.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" title="Xem chi tiết">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Chỉnh sửa">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Xóa">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-slate-500">
              Hiển thị {filteredFeedbacks.length} trong tổng số {feedbacks.length} feedback
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Trước
              </Button>
              <Button variant="outline" size="sm">
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
