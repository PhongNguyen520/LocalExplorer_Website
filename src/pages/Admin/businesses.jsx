"use client"

import { useState, useEffect } from "react"
import {
  Download,
  Filter,
  Plus,
  Search,
  MoreHorizontal,
  MapPin,
  Star,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Building2,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Admin/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/Admin/ui/table"
import { Button } from "../../components/Admin/ui/button"
import { Input } from "../../components/Admin/ui/input"
import { Badge } from "../../components/Admin/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Admin/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/Admin/ui/select"
import CountUp from "react-countup"
import { getAdminBusinessesApi } from "../../api/admin/businesses"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../components/Admin/ui/sheet"
import images from "../../assets/images"

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "suspended":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPlanColor = (plan) => {
  if (!plan) return "bg-gray-100 text-gray-800";
  const p = plan.toLowerCase();
  if (p.includes("premium")) return "bg-purple-100 text-purple-800";
  if (p.includes("standard")) return "bg-blue-100 text-blue-800";
  if (p.includes("basic")) return "bg-gray-100 text-gray-800";
  return "bg-gray-100 text-gray-800";
};

export default function BusinessesPage() {
  const [query, setQuery] = useState({
    Search: "",
    PageIndex: 1,
    PageSize: 10,
    SortBy: "",
    IsDescending: false,
    FilterBy: "",
    FilterValue: "",
    Status: "",
    StartDate: "",
    EndDate: "",
  });
  const [businesses, setBusinesses] = useState([]);
  const [stats, setStats] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openFilterSheet, setOpenFilterSheet] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAdminBusinessesApi(query)
      .then(res => {
        const data = res.data.data;
        setStats(data.stats);
        setBusinesses(data.businesses.items);
        setTotalItems(data.businesses.totalItems);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const totalPages = Math.ceil(totalItems / query.PageSize) || 1;

  // Handler cho filter nâng cao
  const handleSearch = (e) => setQuery(q => ({ ...q, Search: e.target.value, PageIndex: 1 }));
  const handleStatusChange = (value) => setQuery(q => ({ ...q, Status: value, PageIndex: 1 }));
  const handleSortByChange = (value) => setQuery(q => ({ ...q, SortBy: value, PageIndex: 1 }));
  const handleIsDescendingChange = (value) => setQuery(q => ({ ...q, IsDescending: value === "true", PageIndex: 1 }));
  const handleFilterByChange = (value) => setQuery(q => ({ ...q, FilterBy: value, PageIndex: 1 }));
  const handleFilterValueChange = (e) => setQuery(q => ({ ...q, FilterValue: e.target.value, PageIndex: 1 }));
  const handleStartDateChange = (e) => setQuery(q => ({ ...q, StartDate: e.target.value, PageIndex: 1 }));
  const handleEndDateChange = (e) => setQuery(q => ({ ...q, EndDate: e.target.value, PageIndex: 1 }));
  const handlePageSizeChange = (value) => setQuery(q => ({ ...q, PageSize: Number(value), PageIndex: 1 }));

  const statsArr = [
    {
      title: "Tổng doanh nghiệp",
      value: stats?.cartOne?.value ?? 0,
      change: stats?.cartOne?.change ?? "0%",
      trend: stats?.cartOne?.trend ?? "neutral",
      icon: Building2,
      color: "emerald",
      description: `Thay đổi: ${stats?.cartOne?.difference ?? 0}`,
    },
    {
      title: "Đang hoạt động",
      value: stats?.cartTwo?.value ?? 0,
      change: stats?.cartTwo?.change ?? "0%",
      trend: stats?.cartTwo?.trend ?? "neutral",
      icon: TrendingUp,
      color: "blue",
      description: `Thay đổi: ${stats?.cartTwo?.difference ?? 0}`,
    },
    {
      title: "Tạm ngưng",
      value: stats?.cartThree?.value ?? 0,
      change: stats?.cartThree?.change ?? "0%",
      trend: stats?.cartThree?.trend ?? "neutral",
      icon: Users,
      color: "yellow",
      description: `Thay đổi: ${stats?.cartThree?.difference ?? 0}`,
    },
    {
      title: "Chờ thanh toán",
      value: stats?.cartFour?.value ?? 0,
      change: stats?.cartFour?.change ?? "0%",
      trend: stats?.cartFour?.trend ?? "neutral",
      icon: DollarSign,
      color: "orange",
      description: `Thay đổi: ${stats?.cartFour?.difference ?? 0}`,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Quản lý doanh nghiệp</h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">Quản lý tất cả doanh nghiệp đối tác trong hệ thống</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" className="border-slate-200 hover:bg-slate-50 text-sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Thêm doanh nghiệp
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {statsArr.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className={`border-0 shadow-lg bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className={`text-${stat.color}-600 text-xs sm:text-sm font-medium truncate`}>{stat.title}</p>
                    <p className={`text-2xl sm:text-3xl font-bold text-${stat.color}-900`}><CountUp end={stat.value} duration={1.2} separator="," /></p>
                    <p className={`text-${stat.color}-600 text-xs mt-1 truncate`}>{stat.change} ({stat.description})</p>
                  </div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${stat.color}-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ml-3`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <form className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm doanh nghiệp..."
                  className="w-full sm:w-80 pl-10 text-sm"
                  value={query.Search}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setOpenFilterSheet(true)} className="text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc nâng cao
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Danh sách doanh nghiệp</CardTitle>
          <CardDescription>
            Hiển thị {businesses.length} trong tổng số {totalItems} doanh nghiệp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doanh nghiệp</TableHead>
                  <TableHead>Địa điểm</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Gói dịch vụ</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map((business) => (
                  <TableRow key={business.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 rounded-lg">
                          <AvatarImage src={business.logo || images.noImage} alt={business.name} />
                          <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg">
                            {business.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900">{business.name}</p>
                          <p className="text-sm text-slate-500">{business.introduction}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-500">
                              {business.openTime} - {business.closeTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{business.location}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{business.avgRating}</span>
                        </div>
                        <span className="text-sm text-slate-500">({business.totalFeedback})</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{business.favoriteCount ?? 0} yêu thích</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                      <Badge className={getPlanColor(business.pricingPlan)}>{business.pricingPlan}</Badge>
                      </div>

                      <p className="text-xs text-slate-500 mt-1">
                        Hết hạn: {business.expiredTime ? new Date(business.expiredTime).toLocaleDateString("vi-VN") : "-"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">₫{business.cost ? business.cost.toLocaleString() : 0}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(business.status)}>{business.status === "Active"
                        ? "Hoạt động"
                        : business.status === "Pending"
                        ? "Chờ thanh toán"
                        : business.status === "Suspended"
                        ? "Tạm ngưng"
                        : business.status}
                      </Badge>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-slate-500">
              Hiển thị {businesses.length} trong tổng số {totalItems} doanh nghiệp
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={query.PageIndex === 1}
                onClick={() => setQuery(q => ({ ...q, PageIndex: q.PageIndex - 1 }))}
              >
                Trước
              </Button>
              <span>Trang {query.PageIndex} / {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                disabled={query.PageIndex === totalPages}
                onClick={() => setQuery(q => ({ ...q, PageIndex: q.PageIndex + 1 }))}
              >
                Sau
              </Button>
            </div>
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
                Lọc doanh nghiệp theo nhiều tiêu chí chi tiết hơn.
              </SheetDescription>
            </SheetHeader>
            <form className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 space-y-8">
              <div>
                <label className="text-sm text-slate-600">Tìm kiếm</label>
                <Input value={query.Search} onChange={handleSearch} placeholder="Tìm kiếm..." />
              </div>
              <div>
                <label className="text-sm text-slate-600">Trạng thái</label>
                <Select value={query.Status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="Active">Hoạt động</SelectItem>
                    <SelectItem value="Pending">Chờ thanh toán</SelectItem>
                    <SelectItem value="Suspended">Tạm ngưng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Gói dịch vụ</label>
                <Select value={query.FilterValue} onValueChange={handleFilterValueChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn gói" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Sắp xếp theo</label>
                <Select value={query.SortBy} onValueChange={handleSortByChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Mặc định</SelectItem>
                    <SelectItem value="name">Tên</SelectItem>
                    <SelectItem value="createdTime">Ngày tạo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Thứ tự</label>
                <Select value={String(query.IsDescending)} onValueChange={handleIsDescendingChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Thứ tự" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Tăng dần</SelectItem>
                    <SelectItem value="true">Giảm dần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600">Từ ngày</label>
                  <Input type="date" value={query.StartDate} onChange={handleStartDateChange} />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Đến ngày</label>
                  <Input type="date" value={query.EndDate} onChange={handleEndDateChange} />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600">Số dòng/trang</label>
                <Select value={String(query.PageSize)} onValueChange={handlePageSizeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Số dòng/trang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t">
              <Button
                variant="outline"
                className="w-full sm:w-1/2 rounded-md text-sm"
                onClick={() =>
                  setQuery({
                    Search: "",
                    PageIndex: 1,
                    PageSize: 10,
                    SortBy: "",
                    IsDescending: false,
                    FilterBy: "",
                    FilterValue: "",
                    Status: "",
                    StartDate: "",
                    EndDate: "",
                  })
                }
              >
                Đặt lại
              </Button>
              <Button
                className="w-full sm:w-1/2 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setOpenFilterSheet(false)}
              >
                Áp dụng lọc
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
