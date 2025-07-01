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
import { Calendar, MapPin, Users, Eye, Edit, Trash2, Plus, Search, Clock, Star, ImageIcon } from "lucide-react"
import CountUp from "react-countup"
import images from "../../assets/images"
import { getAdminEventsApi } from "../../api/admin/events"

// Hàm parse ngày dd-MM-yyyy
function parseVNDate(dateStr) {
  if (!dateStr) return null;
  // Nếu có dạng dd-MM-yyyy
  const [d, m, y] = dateStr.split("-");
  if (d && m && y && y.length === 4) {
    return new Date(`${y}-${m}-${d}`);
  }
  return new Date(dateStr); // fallback
}

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ cartOne: {}, cartTwo: {}, cartThree: {}, cartFour: {} })
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  // Bộ lọc tạm thời (chỉ cập nhật khi bấm Lọc hoặc Enter)
  const [pendingFilter, setPendingFilter] = useState({
    search: "",
    status: "all",
    startDate: "",
    endDate: ""
  })
  // Bộ lọc thực tế dùng để call API
  const [filter, setFilter] = useState({
    search: "",
    status: "all",
    startDate: "",
    endDate: ""
  })

  // Gọi API khi filter hoặc paging thay đổi
  useEffect(() => {
    setLoading(true)
    getAdminEventsApi({
      Search: filter.search,
      Status: filter.status === 'all' ? undefined : filter.status,
      PageIndex: pageIndex,
      PageSize: pageSize,
      StartDate: filter.startDate || undefined,
      EndDate: filter.endDate || undefined,
    })
      .then(res => {
        const data = res.data.data
        setStats(data.stats)
        setEvents(data.events.items)
        setTotalPages(data.events.totalPages)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [filter, pageIndex, pageSize])

  // Khi bấm Lọc hoặc Enter search, cập nhật filter và reset pageIndex
  const handleApplyFilter = () => {
    setFilter({ ...pendingFilter })
    setPageIndex(1)
  }
  // Khi nhấn Enter trong ô search
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilter()
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Đang diễn ra", color: "bg-green-100 text-green-800" },
      pending: { label: "Chờ duyệt", color: "bg-yellow-100 text-yellow-800" },
      completed: { label: "Đã kết thúc", color: "bg-gray-100 text-gray-800" },
      cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
      upcoming: { label: "Sắp diễn ra", color: "bg-blue-100 text-blue-800" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const formatPrice = (price) => {
    if (price === 0) return "Miễn phí"
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("vi-VN"),
      time: date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const filteredEvents = events

  const statsArr = [
    {
      title: "Tổng sự kiện",
      value: stats.cartOne.value || 0,
      icon: Calendar,
      color: "blue",
      change: stats.cartOne.change,
      trend: stats.cartOne.trend,
    },
    {
      title: "Đang diễn ra",
      value: stats.cartTwo.value || 0,
      icon: Clock,
      color: "emerald",
      change: stats.cartTwo.change,
      trend: stats.cartTwo.trend,
    },
    {
      title: "Chờ duyệt",
      value: stats.cartThree.value || 0,
      icon: Star,
      color: "yellow",
      change: stats.cartThree.change,
      trend: stats.cartThree.trend,
    },
    {
      title: "Đã kết thúc",
      value: stats.cartFour.value || 0,
      icon: Calendar,
      color: "gray",
      change: stats.cartFour.change,
      trend: stats.cartFour.trend,
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500 text-white",
      emerald: "bg-emerald-500 text-white",
      yellow: "bg-yellow-500 text-white",
      gray: "bg-gray-500 text-white",
    }
    return colors[color] || colors.blue
  }
  const getColorBg = (color) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200",
      emerald: "bg-emerald-50 border-emerald-200",
      yellow: "bg-yellow-50 border-yellow-200",
      gray: "bg-gray-50 border-gray-200",
    }
    return colors[color] || colors.blue
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Quản lý Sự kiện</h1>
          <p className="text-blue-500 mt-1">Quản lý và theo dõi các sự kiện trên hệ thống</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  <p className="text-blue-700 text-sm font-medium mb-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-10">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm sự kiện..."
                  className="w-80 pl-10"
                  value={pendingFilter.search}
                  onChange={(e) => setPendingFilter(f => ({ ...f, search: e.target.value }))}
                  onKeyDown={handleSearchKeyDown}
                />
              </div>
              <Select value={pendingFilter.status} onValueChange={(v) => setPendingFilter(f => ({ ...f, status: v }))} className="w-48 bg-white">
                <SelectTrigger>
                  <SelectValue placeholder="Lọc theo trạng thái">Tất cả trạng thái</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Đang diễn ra</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="upcoming">Sắp diễn ra</SelectItem>
                  <SelectItem value="completed">Đã kết thúc</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-10">
              <div className="relative">
                <Input type="date" value={pendingFilter.startDate} onChange={(e) => setPendingFilter(f => ({ ...f, startDate: e.target.value }))} />
              </div>
              <div className="relative">
                <Input type="date" value={pendingFilter.endDate} onChange={(e) => setPendingFilter(f => ({ ...f, endDate: e.target.value }))} />
              </div>
            </div>
            <Button onClick={handleApplyFilter}>Lọc</Button>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Danh sách Sự kiện</CardTitle>
          <CardDescription>
            Hiển thị {filteredEvents.length} trên tổng số {stats.cartOne.value || 0} sự kiện
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sự kiện</TableHead>
                  <TableHead>Ngày bắt đầu</TableHead>
                  <TableHead>Ngày kết thúc</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={event.image || images.noImage} alt={event.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-slate-900">{event.name}</p>
                          <p className="text-sm text-slate-500 truncate max-w-xs">{event.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{event.startDate ? (parseVNDate(event.startDate)?.toLocaleString("vi-VN") || '-') : '-'}</TableCell>
                    <TableCell>{event.endDate ? (parseVNDate(event.endDate)?.toLocaleString("vi-VN") || '-') : '-'}</TableCell>
                    <TableCell>{getStatusBadge(event.status)}</TableCell>
                    <TableCell>{event.createdTime ? (new Date(event.createdTime).toLocaleDateString("vi-VN")) : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button disabled={pageIndex === 1} onClick={() => setPageIndex(pageIndex - 1)}>Trước</Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button key={i} variant={pageIndex === i + 1 ? 'default' : 'outline'} onClick={() => setPageIndex(i + 1)}>{i + 1}</Button>
            ))}
            <Button disabled={pageIndex === totalPages} onClick={() => setPageIndex(pageIndex + 1)}>Sau</Button>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPageIndex(1); }} className="ml-4 border rounded px-2 py-1">
              {[10, 20, 50].map(size => <option key={size} value={size}>{size}/trang</option>)}
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EventsPage
