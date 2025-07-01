import { useEffect, useState } from "react";
import {
  Bell,
  Send,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Eye,
  Trash2,
  Users,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Admin/ui/card";
import { Input } from "../../components/Admin/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Admin/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Admin/ui/table";
import { Badge } from "../../components/Admin/ui/badge";
import { Button } from "../../components/Admin/ui/button";
import { getAdminNotificationsApi } from "../../api/admin/notifications";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("send");

  const getTypeColor = (type) => {
    switch (type) {
      case "system":
        return "bg-blue-100 text-blue-800";
      case "promotion":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-orange-100 text-orange-800";
      case "alert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getAdminNotificationsApi({ intdex: pageIndex, pageSize })
      .then(res => {
        const data = res.data.data;
        setNotifications(data.items);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pageIndex, pageSize]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      sent: {
        label: "Đã gửi",
        variant: "default",
        color: "bg-green-100 text-green-800",
      },
      scheduled: {
        label: "Đã lên lịch",
        variant: "secondary",
        color: "bg-blue-100 text-blue-800",
      },
      draft: {
        label: "Bản nháp",
        variant: "outline",
        color: "bg-gray-100 text-gray-800",
      },
      failed: {
        label: "Thất bại",
        variant: "destructive",
        color: "bg-red-100 text-red-800",
      },
    };
    const config = statusConfig[status] || statusConfig.draft;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      welcome: {
        label: "Chào mừng",
        icon: Users,
        color: "bg-purple-100 text-purple-800",
      },
      system: {
        label: "Hệ thống",
        icon: AlertCircle,
        color: "bg-orange-100 text-orange-800",
      },
      payment: {
        label: "Thanh toán",
        icon: CheckCircle,
        color: "bg-green-100 text-green-800",
      },
      promotion: {
        label: "Khuyến mãi",
        icon: MessageSquare,
        color: "bg-pink-100 text-pink-800",
      },
    };
    const config = typeConfig[type] || typeConfig.system;
    const Icon = config.icon;
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || notification.status === statusFilter;
    const matchesType =
      typeFilter === "all" || notification.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: notifications.length,
    sent: notifications.filter((n) => n.status === "sent").length,
    scheduled: notifications.filter((n) => n.status === "scheduled").length,
    draft: notifications.filter((n) => n.status === "draft").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-end">
        <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          <span>Create Notification</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-green-600">+12 today</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">1,247</div>
          <div className="text-sm text-gray-600">Total Sent</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-green-600">89.2%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">24,354</div>
          <div className="text-sm text-gray-600">Total Delivered</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-blue-600">67.3%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">16,398</div>
          <div className="text-sm text-gray-600">Read Rate</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-sm text-yellow-600">3 pending</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600">Scheduled</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("send")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "send"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Send Notification
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "history"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Notification History
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "templates"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Templates
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "send" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter notification title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="system">System</option>
                    <option value="promotion">Promotion</option>
                    <option value="update">Update</option>
                    <option value="alert">Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter your notification message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="all_users">All Users</option>
                    <option value="app_users">App Users Only</option>
                    <option value="businesses">Business Partners</option>
                    <option value="active_users">Active Users</option>
                    <option value="new_users">New Users</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send Time
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="now">Send Now</option>
                    <option value="schedule">Schedule for Later</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                  Send Notification
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Save as Draft
                </button>
                <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                  Preview
                </button>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Tìm kiếm thông báo..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                        <SelectItem value="sent">Đã gửi</SelectItem>
                        <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                        <SelectItem value="draft">Bản nháp</SelectItem>
                        <SelectItem value="failed">Thất bại</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Loại thông báo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả loại</SelectItem>
                        <SelectItem value="welcome">Chào mừng</SelectItem>
                        <SelectItem value="system">Hệ thống</SelectItem>
                        <SelectItem value="payment">Thanh toán</SelectItem>
                        <SelectItem value="promotion">Khuyến mãi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách Thông báo</CardTitle>
                  <CardDescription>
                    Hiển thị {filteredNotifications.length} trên tổng số{" "}
                    {notifications.length} thông báo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tiêu đề</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead>Người nhận</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead>Đã gửi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNotifications.map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 truncate max-w-xs">
                                {notification.content}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getTypeBadge(notification.type)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">
                                {notification.userName}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(notification.status)}
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">
                              {new Date(
                                notification.createdTime
                              ).toLocaleDateString("vi-VN")}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(
                                notification.createdTime
                              ).toLocaleTimeString("vi-VN")}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {notification.sentCount}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "templates" && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Notification Templates
              </h3>
              <p className="text-gray-600 mb-6">
                Create and manage reusable notification templates
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                Create Template
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
