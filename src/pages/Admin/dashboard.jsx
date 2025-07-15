import {
  Users,
  Building2,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Eye,
  Download,
  Star,
  MapPin,
  Activity,
  DollarSign,
  GitCommitVertical,
  Inbox,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../components/Admin/ui/card";
import { Button } from "../../components/Admin/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import { useState, useEffect } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/Admin/ui/chart";
import CountUp from "react-countup";
import { getAdminOverViewApi } from "../../api/admin/dashboard";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const DashboardPage = () => {
  const [filterDays, setFilterDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getAdminOverViewApi();
        setDashboardData(response.data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getRevenueChartData = (days = 7) => {
    if (!dashboardData?.charts) return [];
    
    const today = dayjs();
    const start = today.subtract(days - 1, "day");
    const dateArr = Array.from({ length: days }, (_, i) =>
      start.add(i, "day").format("YYYY-MM-DD")
    );

    const revenueByDate = {};
    dashboardData.charts.forEach((tx) => {
      const date = dayjs(tx.paidAt).format("YYYY-MM-DD");
      revenueByDate[date] = (revenueByDate[date] || 0) + tx.amount;
    });

    return dateArr.map((date) => ({
      date,
      amount: revenueByDate[date] || 0,
    }));
  };

  const chartConfig = {
    amount: {
      label: "Doanh thu",
      color: "var(--chart-1)",
    },
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4" />;
      case "down":
        return <ArrowDown className="w-4 h-4" />;
      case "neutral":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "text-emerald-600";
      case "down":
        return "text-red-600";
      case "neutral":
        return "text-slate-600";
      default:
        return "text-slate-600";
    }
  };

  const stats = dashboardData ? [
    {
      title: "Tổng người dùng",
      value: dashboardData.stats.cartOne.value,
      change: dashboardData.stats.cartOne.change,
      trend: dashboardData.stats.cartOne.trend,
      icon: Users,
      color: "emerald",
      description: `Tăng ${dashboardData.stats.cartOne.difference} người trong tháng`,
    },
    {
      title: "Doanh nghiệp hoạt động",
      value: dashboardData.stats.cartTwo.value,
      change: dashboardData.stats.cartTwo.change,
      trend: dashboardData.stats.cartTwo.trend,
      icon: Building2,
      color: "blue",
      description: `${dashboardData.stats.cartTwo.difference} doanh nghiệp mới tham gia`,
    },
    {
      title: "Doanh thu tháng",
      value: dashboardData.stats.cartThree.value,
      change: dashboardData.stats.cartThree.change,
      trend: dashboardData.stats.cartThree.trend,
      icon: DollarSign,
      color: "violet",
      description: `Tăng ₫${dashboardData.stats.cartThree.difference.toLocaleString()} so với tháng trước`,
    },
    {
      title: "Lượt tải ứng dụng",
      value: dashboardData.stats.cartFour.value,
      change: dashboardData.stats.cartFour.change,
      trend: dashboardData.stats.cartFour.trend,
      icon: Download,
      color: "orange",
      description: `Tăng ${dashboardData.stats.cartFour.difference} lượt tải trong tuần`,
    },
  ] : [];

  const topDestinations = dashboardData?.topBusinesses.map((business) => ({
    id: business.id,
    name: business.name,
    logo: business.logo,
    background: business.background,
    rating: business.avgRating || 0,
    feedback: business.totalFeedback || 0,
    location: business.location,
  })) || [];

  const recentActivities = dashboardData?.notifications.map((notification) => ({
    id: notification.id,
    title: notification.title,
    content: notification.content,
    time: dayjs(notification.createdTime).fromNow(),
    userName: notification.userName,
    avatar: notification.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format",
  })) || [];

  const getColorClasses = (color) => {
    const colors = {
      emerald: "bg-emerald-500 text-white",
      blue: "bg-blue-500 text-white",
      violet: "bg-violet-500 text-white",
      orange: "bg-orange-500 text-white",
      red: "bg-red-500 text-white",
    };
    return colors[color] || colors.emerald;
  };

  const getColorBg = (color) => {
    const colors = {
      emerald: "bg-emerald-50 border-emerald-200",
      blue: "bg-blue-50 border-blue-200",
      violet: "bg-violet-50 border-violet-200",
      orange: "bg-orange-50 border-orange-200",
      red: "bg-red-50 border-red-200",
    };
    return colors[color] || colors.emerald;
  };

  const formatChartDate = (date) => {
    const d = dayjs(date);
    const month = d.format('MMM');
    const day = d.format('DD');
    return `${month} ${day}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6 bg-slate-50/50 min-h-screen">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-slate-600">Tổng quan về hoạt động hệ thống</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="border-slate-200 hover:bg-slate-50 text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 text-sm">
            <Activity className="w-4 h-4 mr-2" />
            Tạo báo cáo
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`border-0 shadow-lg ${getColorBg(
                stat.color
              )} hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${getColorClasses(
                      stat.color
                    )} shadow-lg`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-xs sm:text-sm font-semibold ${
                      getTrendColor(stat.trend)
                    }`}
                  >
                    {getTrendIcon(stat.trend)}
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-lg sm:text-xl">Biểu đồ doanh thu</CardTitle>
                <CardDescription className="text-sm">
              {filterDays === 7 && "7 ngày gần nhất"}
              {filterDays === 30 && "30 ngày gần nhất"}
              {filterDays === 90 && "90 ngày gần nhất"}
            </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant={filterDays === 7 ? "default" : "outline"} size="sm" onClick={() => setFilterDays(7)} className="text-xs">
                7 ngày
              </Button>
                <Button variant={filterDays === 30 ? "default" : "outline"} size="sm" onClick={() => setFilterDays(30)} className="text-xs">
                30 ngày
              </Button>
                <Button variant={filterDays === 90 ? "default" : "outline"} size="sm" onClick={() => setFilterDays(90)} className="text-xs">
                90 ngày
              </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="w-full h-[250px] sm:h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getRevenueChartData(filterDays)}
                    margin={{ left: 12, right: 12, top: 20, bottom: 20 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={formatChartDate}
                      fontSize={12}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={12}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />} />
                <Line
                  dataKey="amount"
                  type="monotone"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={({ cx, cy, payload }) => {
                        const r = 6;
                    return (
                      <GitCommitVertical
                        key={payload.date}
                        x={cx - r / 2}
                        y={cy - r / 2}
                        width={r}
                        height={r}
                        fill="hsl(var(--background))"
                        stroke="var(--chart-1)"
                      />
                    );
                  }}
                      activeDot={{ r: 6, fill: "#fff", stroke: "var(--chart-1)", strokeWidth: 2 }}
                />
              </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-xs sm:text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Doanh thu tăng 5.2% tháng này <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Tổng doanh thu {filterDays} ngày gần nhất
            </div>
          </CardFooter>
        </Card>

        {/* Top Destinations */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl font-bold text-slate-900">
              Doanh nghiệp hàng đầu
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              Các doanh nghiệp được yêu thích nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {topDestinations.map((business) => (
                <div
                  key={business.id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg sm:rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
                      {business.logo ? (
                        <img
                          src={business.logo}
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                          <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                        {business.name}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 truncate">
                        {business.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">
                        {business.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {business.feedback} đánh giá
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-lg sm:text-xl font-bold text-slate-900">
                Hoạt động gần đây
              </CardTitle>
              <CardDescription className="text-sm text-slate-600">
                Các thông báo và cập nhật mới nhất
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-sm"
            >
              Xem tất cả
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentActivities.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 hover:bg-slate-50 rounded-lg sm:rounded-xl transition-all duration-200 group"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={activity.avatar}
                      alt={activity.userName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover border-2 border-white shadow-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-1">
                      <p className="text-slate-900 font-medium text-sm sm:text-base truncate">
                        {activity.userName}
                      </p>
                      <span className="hidden sm:inline text-slate-500">•</span>
                      <p className="text-slate-500 text-xs sm:text-sm">{activity.time}</p>
                    </div>
                    <p className="text-slate-600 mt-1 text-sm">
                      <span className="font-medium">{activity.title}:</span>{" "}
                      {activity.content}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Inbox className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                Chưa có thông báo nào
              </h3>
              <p className="text-slate-500 max-w-sm text-sm">
                Các thông báo mới sẽ xuất hiện ở đây khi có hoạt động trong hệ thống
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
