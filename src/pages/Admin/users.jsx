"use client"

import { useState, useEffect } from "react"
import {
  Download,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserCheck,
  UserX,
  Eye,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Admin/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/Admin/ui/table"
import { Button } from "../../components/Admin/ui/button"
import { Input } from "../../components/Admin/ui/input"
import { Badge } from "../../components/Admin/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Admin/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/Admin/ui/select"
import images from "../../assets/images"
import CountUp from "react-countup"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../components/Admin/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/Admin/ui/dialog"
import { getAdminUsersApi } from "../../api/admin/users"

export default function UsersPage() {
  // Query/filter state
  const [query, setQuery] = useState({
    PageIndex: 1,
    PageSize: 10,
    Search: "",
    SortBy: "",
    IsAscending: true,
    Role: "",
    Status: "",
    CreatedFrom: "",
    CreatedTo: "",
    LastLoginFrom: "",
    LastLoginTo: "",
  });
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openFilterSheet, setOpenFilterSheet] = useState(false)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [modalUser, setModalUser] = useState(null)

  const statsData = stats;

  const statsArr = [
    {
      title: "Tổng người dùng",
      value: statsData?.cartOne?.value ?? 0,
      change: statsData?.cartOne?.change ?? "0%",
      trend: statsData?.cartOne?.trend ?? "neutral",
      icon: UserCheck,
      color: "blue",
      description: `Thay đổi: ${statsData?.cartOne?.difference ?? 0}`,
    },
    {
      title: "Người dùng hoạt động",
      value: statsData?.cartTwo?.value ?? 0,
      change: statsData?.cartTwo?.change ?? "0%",
      trend: statsData?.cartTwo?.trend ?? "neutral",
      icon: UserCheck,
      color: "emerald",
      description: `Thay đổi: ${statsData?.cartTwo?.difference ?? 0}`,
    },
    {
      title: "Tài khoản chưa xác thực",
      value: statsData?.cartThree?.value ?? 0,
      change: statsData?.cartThree?.change ?? "0%",
      trend: statsData?.cartThree?.trend ?? "neutral",
      icon: Shield,
      color: "purple",
      description: `Thay đổi: ${statsData?.cartThree?.difference ?? 0}`,
    },
    {
      title: "Tài khoản bị khóa",
      value: statsData?.cartFour?.value ?? 0,
      change: statsData?.cartFour?.change ?? "0%",
      trend: statsData?.cartFour?.trend ?? "neutral",
      icon: UserX,
      color: "orange",
      description: `Thay đổi: ${statsData?.cartFour?.difference ?? 0}`,
    },
  ];

  useEffect(() => {
    setLoading(true);
    getAdminUsersApi(query)
      .then(res => {
        const data = res.data.data;
        
        setStats(data.stats);
        setUsers(data.users.items);
        setTotalItems(data.users.totalItems);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const handleSearch = (e) => {
    setQuery(q => ({ ...q, Search: e.target.value, PageIndex: 1 }));
  };
  const handleStatusChange = (value) => {
    setQuery(q => ({ ...q, Status: value, PageIndex: 1 }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRoleChange = (value) => setQuery(q => ({ ...q, Role: value, PageIndex: 1 }));
  const handleSortByChange = (value) => setQuery(q => ({ ...q, SortBy: value, PageIndex: 1 }));
  const handleIsAscendingChange = (value) => setQuery(q => ({ ...q, IsAscending: value === "true", PageIndex: 1 }));
  const handleCreatedFromChange = (e) => setQuery(q => ({ ...q, CreatedFrom: e.target.value, PageIndex: 1 }));
  const handleCreatedToChange = (e) => setQuery(q => ({ ...q, CreatedTo: e.target.value, PageIndex: 1 }));
  const handleLastLoginFromChange = (e) => setQuery(q => ({ ...q, LastLoginFrom: e.target.value, PageIndex: 1 }));
  const handleLastLoginToChange = (e) => setQuery(q => ({ ...q, LastLoginTo: e.target.value, PageIndex: 1 }));
  const handlePageSizeChange = (value) => setQuery(q => ({ ...q, PageSize: Number(value), PageIndex: 1 }));

  const totalPages = Math.ceil(totalItems / query.PageSize) || 1;

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Quản lý người dùng
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Quản lý tất cả người dùng trong hệ thống
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="border-slate-200 hover:bg-slate-50 text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Thêm người dùng
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {statsArr.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`border-0 shadow-lg bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center bg-${stat.color}-500 text-white shadow-lg`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-xs sm:text-sm font-semibold ${
                      stat.trend === "up"
                        ? "text-emerald-600"
                        : stat.trend === "down"
                        ? "text-red-600"
                        : "text-slate-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : stat.trend === "down" ? (
                      <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                    <CountUp end={stat.value} duration={1.2} separator="," />
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-xs text-slate-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm người dùng..."
                  className="w-full sm:w-80 pl-10 text-sm"
                  value={query.Search}
                  onChange={handleSearch}
                />
              </div>
              <Select value={query.Status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full sm:w-50 bg-white text-sm">
                  <SelectValue placeholder="Lọc theo trạng thái">
                    Tất cả trạng thái
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>{" "}
                    Hoạt động
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>{" "}
                    Không hoạt động
                  </SelectItem>
                  <SelectItem value="pending">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>{" "}
                    Chờ xác thực
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenFilterSheet(true)}
                className="text-sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc nâng cao
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl">Danh sách người dùng</CardTitle>
          <CardDescription className="text-sm">
            Hiển thị {users.length} trong tổng số {totalItems} người dùng
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Người dùng</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell">Thông tin liên hệ</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Thông tin cá nhân</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Bảo mật</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell">Hoạt động</TableHead>
                  <TableHead className="text-xs sm:text-sm">Trạng thái</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                          <AvatarImage
                            src={user.avatar || images.avatar}
                            alt={`${user.fullName}`}
                          />
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900 text-sm sm:text-base truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-slate-500 truncate md:hidden">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                          <span className="text-xs sm:text-sm truncate">{user.email}</span>
                          {user.emailConfirmed && (
                            <Badge variant="outline" className="text-xs">
                              Đã xác thực
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                          <span className="text-xs sm:text-sm">{user.phoneNumber}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                          <span className="text-xs sm:text-sm">
                            {user.age} tuổi,{" "}
                            {user.gender === "Male" ? "Nam" : "Nữ"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                          {user.twoFactorEnabled ? (
                            <Badge variant="default" className="text-xs">
                              2FA Bật
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              2FA Tắt
                            </Badge>
                          )}
                        </div>
                        {user.accessFailedCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {user.accessFailedCount} lần đăng nhập sai
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-medium">
                          {user.scheduleCount} lịch trình
                        </p>
                        <p className="text-xs text-slate-500">
                          Cập nhật:{" "}
                          {new Date(user.lastUpdatedTime).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(user.status)} text-xs`}>
                        {user.status === "Active"
                          ? "Hoạt động"
                          : "Không hoạt động"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setModalUser(user);
                            setOpenUserModal(true);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2 py-4">
            <div className="text-xs sm:text-sm text-slate-500">
              Hiển thị {users.length} trong tổng số {totalItems} người dùng
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={query.PageIndex === 1}
                onClick={() =>
                  setQuery((q) => ({ ...q, PageIndex: q.PageIndex - 1 }))
                }
                className="text-xs"
              >
                Trước
              </Button>
              <span className="text-xs sm:text-sm">
                Trang {query.PageIndex} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={query.PageIndex === totalPages}
                onClick={() =>
                  setQuery((q) => ({ ...q, PageIndex: q.PageIndex + 1 }))
                }
                className="text-xs"
              >
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Sheet open={openFilterSheet} onOpenChange={setOpenFilterSheet}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-sm md:max-w-md lg:w-[400px] p-0"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 sm:p-6 border-b">
              <SheetTitle className="text-lg sm:text-xl font-semibold">
                Bộ lọc nâng cao
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Lọc người dùng theo nhiều tiêu chí chi tiết hơn.
              </SheetDescription>
            </SheetHeader>

            <form className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 space-y-8">
              {/* Trạng thái tài khoản */}
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-3">
                  Trạng thái tài khoản
                </h3>
                <div className="space-y-2">
                  <label className="text-sm text-slate-600">Trạng thái</label>
                  <Select
                    value={query.Status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-full rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tất cả</SelectItem>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Không hoạt động</SelectItem>
                      <SelectItem value="pending">Chờ xác thực</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Vai trò */}
              <div>
                <label className="text-sm text-slate-600">Vai trò</label>
                <Select value={query.Role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-full rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sắp xếp */}
              <div>
                <label className="text-sm text-slate-600">Sắp xếp theo</label>
                <Select value={query.SortBy} onValueChange={handleSortByChange}>
                  <SelectTrigger className="w-full rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Chọn trường sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Mặc định</SelectItem>
                    <SelectItem value="fullName">Tên</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="createdTime">Ngày tạo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Thứ tự</label>
                <Select
                  value={String(query.IsAscending)}
                  onValueChange={handleIsAscendingChange}
                >
                  <SelectTrigger className="w-full rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Chọn thứ tự" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Tăng dần</SelectItem>
                    <SelectItem value="false">Giảm dần</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ngày tạo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600">Ngày tạo từ</label>
                  <Input
                    type="date"
                    value={query.CreatedFrom}
                    onChange={handleCreatedFromChange}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Ngày tạo đến</label>
                  <Input
                    type="date"
                    value={query.CreatedTo}
                    onChange={handleCreatedToChange}
                  />
                </div>
              </div>

              {/* Đăng nhập gần nhất */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600">
                    Đăng nhập gần nhất từ
                  </label>
                  <Input
                    type="date"
                    value={query.LastLoginFrom}
                    onChange={handleLastLoginFromChange}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">
                    Đăng nhập gần nhất đến
                  </label>
                  <Input
                    type="date"
                    value={query.LastLoginTo}
                    onChange={handleLastLoginToChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600">Số dòng/trang</label>
                <Select
                  value={String(query.PageSize)}
                  onValueChange={handlePageSizeChange}
                >
                  <SelectTrigger className="w-full rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500">
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
                    PageIndex: 1,
                    PageSize: 10,
                    Search: "",
                    SortBy: "",
                    IsAscending: true,
                    Role: "",
                    Status: "",
                    CreatedFrom: "",
                    CreatedTo: "",
                    LastLoginFrom: "",
                    LastLoginTo: "",
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

      <Dialog open={openUserModal} onOpenChange={setOpenUserModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Thông tin người dùng</DialogTitle>
            <DialogDescription>
              Xem chi tiết và thao tác với người dùng.
            </DialogDescription>
          </DialogHeader>
          {modalUser && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={modalUser.avatar || images.avatar}
                    alt={modalUser.fullName}
                  />
                  <AvatarFallback>{modalUser.fullName}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-lg">{modalUser.fullName}</div>
                  <div className="text-slate-500 text-sm">
                    {modalUser.email}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <b>Điện thoại:</b> {modalUser.phoneNumber}
                </div>
                <div>
                  <b>Giới tính:</b> {modalUser.gender === "Male" ? "Nam" : "Nữ"}
                </div>
                <div>
                  <b>Ngày sinh:</b> {modalUser.dob}
                </div>
                <div>
                  <b>Trạng thái:</b> {modalUser.status}
                </div>
                <div>
                  <b>Lịch trình:</b> {modalUser.scheduleCount}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="destructive">Khoá tài khoản</Button>
                <Button variant="outline">Xoá</Button>
                <Button variant="default">Xác thực Email</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
