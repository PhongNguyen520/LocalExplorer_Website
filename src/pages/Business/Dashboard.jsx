import { useState, useEffect } from "react";
import Header from "../../components/Business/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Business/ui/Card";
import {
  Building2,
  TrendingUp,
  MessageSquare,
  Calendar,
  DollarSign,
  Star,
  Heart,
  Clock,
  MapPin,
  Users,
  Eye,
  Edit,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Button from "../../components/Business/ui/Button";
import StatsCard from "../../components/Business/ui/StatsCard";
import { BusinessOverviewAPI } from "../../api/business/BusinessOverview";
import config from "../../config";
import images from "../../assets/images";

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBusinessOverview();
  }, []);

  const fetchBusinessOverview = async () => {
    try {
      setLoading(true);
      const response = await BusinessOverviewAPI.getBusinessOverview();
      setOverviewData(response.data);
    } catch (err) {
      setError("Không thể tải dữ liệu dashboard");
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Tổng Businesses",
      value: overviewData?.business || 0,
      description: "Doanh nghiệp",
      icon: Building2,
      color: "blue",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Sự kiện",
      value: overviewData?.events || 0,
      description: "Sự kiện đang diễn ra",
      icon: Calendar,
      color: "green",
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Feedback",
      value: overviewData?.feedbacks || 0,
      description: "Đánh giá từ khách hàng",
      icon: MessageSquare,
      color: "purple",
      trend: { value: 15, isPositive: true },
    },
    {
      title: "Yêu thích",
      value: overviewData?.favorites || 0,
      description: "Lượt yêu thích",
      icon: Heart,
      color: "red",
      trend: { value: 5, isPositive: false },
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      Active: { label: "Hoạt động", color: "bg-green-100 text-green-800" },
      Pending: { label: "Chờ duyệt", color: "bg-yellow-100 text-yellow-800" },
      Inactive: { label: "Không hoạt động", color: "bg-gray-100 text-gray-800" },
    };
    const config = statusConfig[status] || statusConfig.Pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500 text-white",
      green: "bg-green-500 text-white",
      purple: "bg-purple-500 text-white",
      red: "bg-red-500 text-white",
    };
    return colors[color] || colors.blue;
  };

  const getColorBg = (color) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200",
      green: "bg-green-50 border-green-200",
      purple: "bg-purple-50 border-purple-200",
      red: "bg-red-50 border-red-200",
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchBusinessOverview}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Header
        title="Dashboard"
        description="Tổng quan về tất cả businesses của bạn"
        breadcrumbs={[{ label: "Dashboard" }]}
        actions={<Button to="/business/create">Tạo Business mới</Button>}
      />

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className={`border-0 shadow-lg ${getColorBg(stat.color)} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColorClasses(stat.color)} shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.trend.isPositive ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${stat.trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.trend.value}%
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">
                    {stat.value.toLocaleString()}
                  </h3>
                  <p className="text-slate-700 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-slate-500 text-xs">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Businesses */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Businesses Nổi Bật</CardTitle>
                  <CardDescription>Những doanh nghiệp có hiệu suất tốt nhất</CardDescription>
                </div>
                <Button variant="outline" size="sm" to={config.routes.businesses}>
                  Xem tất cả
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overviewData?.businessTop?.map((business) => (
                  <div key={business.id} className="group relative overflow-hidden rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex">
                      {/* Image Section */}
                      <div className="w-32 h-24 flex-shrink-0">
                        <img
                          src={business.background || images.noImage}
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                              {business.name}
                            </h3>
                            <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                              {business.introduction}
                            </p>
                          </div>
                          {/* <div className="ml-4 flex items-center gap-2">
                            <Button variant="ghost" size="sm" title="Xem chi tiết">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Chỉnh sửa">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div> */}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            {/* Rating */}
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="font-medium">{business.avgRating || 0}</span>
                              <span className="text-slate-500">({business.totalFeedback})</span>
                            </div>

                            {/* Business Type */}
                            {business.types?.[0] && (
                              <div className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                <span>{business.types[0].name}</span>
                              </div>
                            )}

                            {/* Open Time */}
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{business.openTime}</span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-2">
                            {getStatusBadge(business.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {(!overviewData?.businessTop || overviewData.businessTop.length === 0) && (
                  <div className="text-center py-8">
                    <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">Chưa có business nào</p>
                    <Button className="mt-4" to="/business/create">
                      <Plus className="w-4 h-4 mr-2" />
                      Tạo business đầu tiên
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          {/* <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900">Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" to="/business/create">
                <Plus className="w-4 h-4 mr-3" />
                Tạo Business mới
              </Button>
              <Button variant="outline" className="w-full justify-start" to="/business/events">
                <Calendar className="w-4 h-4 mr-3" />
                Quản lý Sự kiện
              </Button>
              <Button variant="outline" className="w-full justify-start" to="/business/feedbacks">
                <MessageSquare className="w-4 h-4 mr-3" />
                Xem Feedback
              </Button>
              <Button variant="outline" className="w-full justify-start" to="/business/reports">
                <TrendingUp className="w-4 h-4 mr-3" />
                Báo cáo
              </Button>
            </CardContent>
          </Card> */}

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900">Hoạt động gần đây</CardTitle>
              <CardDescription>Các thông báo và cập nhật mới nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <MessageSquare className="h-4 w-4 mt-1 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      Feedback mới từ khách hàng
                    </p>
                    <p className="text-xs text-slate-500">
                      Bánh Căn Nhà Chung - 5 phút trước
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Calendar className="h-4 w-4 mt-1 text-green-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      Sự kiện mới được tạo
                    </p>
                    <p className="text-xs text-slate-500">
                      Sushi Tokyo – 1 giờ trước
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <TrendingUp className="h-4 w-4 mt-1 text-purple-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      Doanh thu tăng 15%
                    </p>
                    <p className="text-xs text-slate-500">So với tuần trước</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
