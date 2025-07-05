import Header from "../../components/Business/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Business/ui/Card";
import Badge from "../../components/Business/ui/Badge";
import NoImagePlaceholder from "../../components/Business/ui/NoImagePlaceholder";
import { Plus, Star, MapPin } from "lucide-react";

import Button from "../../components/Business/ui/Button";
import { useEffect, useState } from "react";
import { getListBusinessApi } from "../../api/ListBusiness";
import config from "../../config";
import { payOSApi } from "../../api/business/PaymentAPI";
import { Pagination, Spin, Empty } from "antd";

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchBusinesses = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const res = await getListBusinessApi(page, pageSize);
      console.log("Businesses data:", res.data.data);

      const { items, totalItems, currentPage, totalPages } = res.data.data;
      setBusinesses(items);
      setPagination({
        current: currentPage,
        pageSize,
        total: totalItems,
      });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handlePageChange = (page, pageSize) => {
    fetchBusinesses(page, pageSize);
  };

  const handlePayment = async (pricingPlanId, businessId) => {
    if (!businessId || !pricingPlanId) return;
    try {
      const res = await payOSApi(pricingPlanId, businessId);
      
      if (res) {
        window.open(res.data, "_blank");
      }
    } catch (err) {
      alert("Không thể tạo link thanh toán!");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Active: { label: "Hoạt động", variant: "success" },
      Pending: { label: "Chờ thanh toán", variant: "warning" },
      Inactive: { label: "Không hoạt động", variant: "secondary" },
    };
    return statusConfig[status] || statusConfig.Pending;
  };

  const getPricingPlanBadge = (plan) => {
    const planConfig = {
      "Premium Business": { color: "bg-purple-100 text-purple-800 border-purple-200" },
      "Basic Business": { color: "bg-blue-100 text-blue-800 border-blue-200" },
      "Standard Business": { color: "bg-green-100 text-green-800 border-green-200" },
    };
    return planConfig[plan] || planConfig["Basic Business"];
  };

  if (loading) {
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
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
        </div>
      </div>
    );
  }


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


      {businesses.length === 0 ? (
        <div className="mt-6">
          <Empty
            description="Chưa có business nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button to="/business/create" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Tạo Business đầu tiên
            </Button>
          </Empty>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {businesses.map((business) => (
              <Card
                key={business.id}
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-0"
              >
                {/* Background Image Section */}
                <div className="relative h-60 w-full">
                  {business.background ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center rounded-t-xl"
                      style={{ backgroundImage: `url(${business.background})` }}
                    />
                  ) : (
                    <NoImagePlaceholder />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-xl" />
                  
                  {/* Status Badge Overlay */}
                  <div className="absolute top-4 right-4">
                    <Badge variant={getStatusBadge(business.status).variant}>
                      {getStatusBadge(business.status).label}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2 pt-4">
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1">
                      {business.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {business.introduction}
                    </CardDescription>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge className={`${getPricingPlanBadge(business.pricingPlan).color} border`}>
                      {business.pricingPlan}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      HSD: {business.expiredTime}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="text-red-500 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-gray-700 line-clamp-1">
                      {business.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 h-4 w-4" />
                      <span className="text-base font-semibold text-gray-800">
                        {business.avgRating || 0}
                      </span>
                      <span className="text-xs text-gray-500">/5</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({business.totalFeedback || 0} đánh giá)
                    </span>
                  </div>

                  <div className="flex justify-end gap-2">
                    {business.status !== "Active" && (
                      <Button
                        size="sm"
                        onClick={() => handlePayment("22222222-4444-4444-4444-444444444444", business.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
                      >
                        Thanh toán
                      </Button>
                    )}
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

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePageChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} của ${total} business`
              }
              pageSizeOptions={['5', '10', '20', '50']}
              className="custom-pagination"
            />
          </div>
        </>
      )}

    </div>
  );
};

export default Businesses;
