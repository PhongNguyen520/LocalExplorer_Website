import Header from "../../components/Business/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Business/ui/Card";
import Badge from "../../components/Business/ui/Badge";
import {
  Plus,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";
import Button from "../../components/Business/ui/Button";
import { useEffect, useState } from "react";
import { getListBusinessApi } from "../../api/ListBusiness";
import config from "../../config";

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListBusinessApi();
        console.log("Businesses data:", res.data.data.items);

        setBusinesses(res.data.data.items);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <Header
        title="Businesses"
        description="Quản lý tất cả businesses của bạn"
        breadcrumbs={[{ label: "Businesses" }]}
        actions={
          <Button to="/business/create">
            <Plus className="mr-2 h-4 w-4" />
            Tạo Business mới
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {businesses.map((business) => (
          <Card
            key={business.id}
            hover
            className="overflow-hidden rounded-xl shadow-md bg-white"
          >
            {business.background && (
              <div className="relative h-60 w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-t-xl"
                  style={{ backgroundImage: `url(${business.background})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-xl" />
              </div>
            )}
            <CardHeader className="pb-2 pt-4">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-xl font-bold text-gray-900 truncate">
                  {business.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 line-clamp-2 truncate">
                  {business.introduction}
                </CardDescription>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge
                  variant={business.status === "Active" ? "success" : "warning"}
                >
                  {business.status === "Active" ? "Hoạt động" : "Chưa thanh toán"}
                </Badge>
                <Badge variant="outline">{business.pricingPlan}</Badge>
                <Badge variant="secondary">HSD: {business.expiredTime}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-red-500 h-4 w-4" />
                <span className="text-sm text-gray-700 truncate">
                  {business.location}
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 h-4 w-4" />
                  <span className="text-base font-semibold text-gray-800">
                    {business.avgRating}
                  </span>
                  <span className="text-xs text-gray-500">/5</span>
                </div>
                <span className="text-xs text-gray-500">
                  ({business.totalFeedback} đánh giá)
                </span>
              </div>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  to={`${config.routes.business}/${business.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
                >
                  Xem chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Businesses;
