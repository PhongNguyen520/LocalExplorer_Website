import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Business/Header";
import { Card, CardContent } from "../../components/Business/ui/Card";
import Button from "../../components/Business/ui/Button";
import Badge from "../../components/Business/ui/Badge";
import {
  Star,
  Heart,
  Share,
  Clock,
  Globe,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Camera,
  Info,
  Edit3,
} from "lucide-react";
import BusinessEvents from "./BusinessEvents";
import BusinessServices from "./BusinessServices";
import BusinessFeedbacks from "./BusinessFeedbacks";
import { getBusinessDetailApi } from "../../api/ListBusiness";
import config from "../../config";

const BusinessOverview = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: Info },
    { id: "photos", label: "Hình ảnh", icon: Camera },
    { id: "events", label: "Sự kiện", icon: Calendar },
    { id: "services", label: "Dịch vụ", icon: Users },
    { id: "reviews", label: "Đánh giá", icon: MessageSquare },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBusinessDetailApi(businessId);
        const business = response.data.data;
        setBusiness(business);
        setFeedbacks(business.feedbacks);
        setServices(business.services);
        setEvents(business.events);
        console.log("Business Data:", business);
        
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    fetchData();
  }, [businessId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Giới thiệu</h3>
              <p className="text-gray-700 leading-relaxed">
                {business.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Điểm nổi bật</h3>
              <div className="grid grid-cols-2 gap-3">
                {business.hightlight && business.hightlight.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-green-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-800">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Giờ hoạt động</h3>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5" />
                  <span>
                    {business.openTime} - {business.closeTime}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Website</h3>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <a
                    href={business.website}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {business.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case "photos":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {business.images && business.images.map((image, index) =>
              index !== 0 ? (
                <div key={index} className="aspect-square">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`image${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="col-span-2 row-span-2">
                  <img
                    src={image}
                    alt="Background"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )
            )}
          </div>
        );

      case "events":
        return <BusinessEvents value={events}/>;

      case "services":
        return <BusinessServices value={services}/>;

      case "reviews":
        return <BusinessFeedbacks value={feedbacks}/>;

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <Header
        title="Quản lý Sự kiện"
        description="Tạo và quản lý các sự kiện cho business của bạn"
        breadcrumbs={[
          { label: "Doanh Nghiệp", href: config.routes.business },
          {
            label: business?.name ?? "Business Overview",
            href: `${config.routes.business}/${businessId}`,
          },
          { label: "Sự kiện" },
        ]}
      />
      {business && (
        <div className="mt-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {business.name}
              </h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                <Edit3 className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>
               
                {/* <Button
                  variant={isSaved ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`}
                  />
                  {isSaved ? "Đã lưu" : "Lưu"}
                </Button> */}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{business.avgRating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(business.avgRating)
                          ? "fill-green-500 text-green-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  ({business.totalFeedback.toLocaleString()} đánh giá)
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <Badge variant="default">{business.pricingPlan}</Badge>
                <span>Hoạt động {business.activeTime}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{business.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div
              className="grid gap-1 w-full h-fit"
              style={{
                aspectRatio: "25 / 9",
                gridTemplateAreas: '"left top" "left bottom"',
                gridTemplateColumns: "64% 36%",
                gridTemplateRows: "minmax(0, 405px) minmax(0, 405px)",
                height: "fit-content",
              }}
            >
              <div
                className="relative overflow-hidden rounded-lg"
                style={{ gridArea: "left" }}
              >
                <img
                  src={business.background || "/placeholder.svg"}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  {business.images.length + 1}
                </div>
              </div>

              <div
                className="relative overflow-hidden rounded-lg"
                style={{ gridArea: "top" }}
              >
                <img
                  src={business.images[0] || "/placeholder.svg"}
                  alt="imagesub"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="relative overflow-hidden rounded-lg"
                style={{ gridArea: "bottom" }}
              >
                <img
                  src={business.images[1] || "/placeholder.svg"}
                  alt="imagesub"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="min-h-96">{renderTabContent()}</div>
        </div>
      )}
    </div>
  );
};

export default BusinessOverview;
