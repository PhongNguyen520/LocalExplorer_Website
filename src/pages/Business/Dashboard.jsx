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
} from "lucide-react";
import Button from "../../components/Business/ui/Button";
import StatsCard from "../../components/Business/ui/StatsCard";

// Mock data
const stats = [
  {
    title: "Tổng Businesses",
    value: 3,
    description: "2 đang hoạt động",
    icon: Building2,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Doanh thu tháng",
    value: "45.2M",
    description: "VNĐ",
    icon: DollarSign,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Feedback mới",
    value: 24,
    description: "Trong tuần",
    icon: MessageSquare,
    trend: { value: 15, isPositive: true },
  },
  {
    title: "Sự kiện sắp tới",
    value: 5,
    description: "Trong tháng",
    icon: Calendar,
    trend: { value: 2, isPositive: true },
  },
];

const recentBusinesses = [
  {
    id: "1",
    name: "Nhà hàng Hương Việt",
    logo: "🍜",
    image:
      "https://hotel84.com/hotel84-images/news/img1/huong-viet-706-lac-long-quan.jpg",
    status: "active",
    rating: 4.8,
    feedbacks: 156,
    revenue: "15.2M",
    location: "QUẬN 1, TP.HCM",
    category: "Nhà hàng & Ẩm thực",
    duration: "Mở cửa 12h",
    description:
      "Trải nghiệm hương vị đậm đà của ẩm thực Việt Nam tại nhà hàng với không gian ấm cúng và thực đơn phong phú. Chúng tôi phục vụ các món ăn truyền thống được chế biến từ nguyên liệu tươi ngon...",
  },
  {
    id: "2",
    name: "Spa Thư Giãn",
    logo: "💆",
    image:
      "https://fujispacenter.vn/wp-content/uploads/2024/07/massage_body_co_tac_dung_gi_nhung_luu_y_khi_thuc_hien_5_354cc25b70.jpg.webp",
    status: "active",
    rating: 4.6,
    feedbacks: 89,
    revenue: "12.8M",
    location: "QUẬN 3, TP.HCM",
    category: "Spa & Chăm sóc sức khỏe",
    duration: "Dịch vụ 90 phút",
    description:
      "Thư giãn và tái tạo năng lượng với các liệu pháp spa chuyên nghiệp. Đội ngũ kỹ thuật viên giàu kinh nghiệm sẽ mang đến cho bạn những phút giây thư giãn tuyệt vời nhất...",
  },
  {
    id: "3",
    name: "Cửa hàng thời trang",
    logo: "👕",
    image:
      "https://file.hstatic.net/1000253775/file/luong-cao-duoc-gioi-cong-so-yeu-thich_1dc9b8eca8954b999991de645a88e3f8.jpg",
    status: "pending",
    rating: 4.3,
    feedbacks: 67,
    revenue: "8.5M",
    location: "QUẬN 7, TP.HCM",
    category: "Thời trang & Phụ kiện",
    duration: "Mở cửa 10h",
    description:
      "Khám phá bộ sưu tập thời trang hiện đại với những thiết kế độc đáo và chất lượng cao. Từ trang phục công sở đến casual wear, chúng tôi có đầy đủ các lựa chọn cho mọi phong cách...",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <Header
        title="Dashboard"
        description="Tổng quan về tất cả businesses của bạn"
        breadcrumbs={[{ label: "Dashboard" }]}
        actions={<Button to="/business/create">Tạo Business mới</Button>}
      />

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        {/* Recent Businesses */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {recentBusinesses.map((business) => (
              <Card
                key={business.id}
                className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex">
                  {/* Image Section */}
                  <div className=" w-80 h-100 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">

                    <div className="">
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        {business.location}
                      </div>

                    {/* Status Badge */}

                      <div className="absolute bottom-3 left-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            business.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {business.status === "active"
                            ? "Hoạt động"
                            : "Chờ duyệt"}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {business.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-gray-900">
                          {business.rating}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(business.rating)
                                  ? "text-green-500 fill-green-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({business.feedbacks.toLocaleString()})
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{business.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{business.duration}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                      {business.description}
                    </p>

                    {/* Tags */}
                    {/* <div className="flex flex-wrap gap-2 mb-4">
                      {business.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div> */}

                    {/* Revenue & Action */}
                    <div className="flex items-center justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        to={`/business/${business.id}/overview`}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>
              Các thông báo và cập nhật mới nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                <MessageSquare className="h-4 w-4 mt-1 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Feedback mới từ khách hàng
                  </p>
                  <p className="text-xs text-gray-500">
                    Nhà hàng Hương Việt - 5 phút trước
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                <Calendar className="h-4 w-4 mt-1 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Sự kiện mới được tạo
                  </p>
                  <p className="text-xs text-gray-500">
                    Spa Thư Giãn - 1 giờ trước
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                <TrendingUp className="h-4 w-4 mt-1 text-purple-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Doanh thu tăng 15%
                  </p>
                  <p className="text-xs text-gray-500">So với tuần trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
