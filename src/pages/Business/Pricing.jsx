import { useEffect, useState } from "react";
import Header from "../../components/Business/Header";
import Button from "../../components/Business/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Business/ui/Card";
import { getPricingPlanApi } from "../../api/business/PricingPlan";

const pricingPlans = [
  {
    name: "Basic",
    price: "299,000",
    features: [
      "Tối đa 5 hình ảnh",
      "Thông tin cơ bản",
      "Hỗ trợ email",
      "1 sự kiện/tháng",
    ],
    current: false,
  },
  {
    name: "Standard",
    price: "599,000",
    features: [
      "Tối đa 15 hình ảnh",
      "Thông tin chi tiết",
      "Hỗ trợ 24/7",
      "5 sự kiện/tháng",
      "Phân tích cơ bản",
    ],
    current: false,
  },
  {
    name: "Premium",
    price: "999,000",
    features: [
      "Không giới hạn hình ảnh",
      "Tất cả tính năng",
      "Hỗ trợ ưu tiên",
      "Không giới hạn sự kiện",
      "Phân tích nâng cao",
      "API access",
    ],
    current: true,
  },
];

const Pricing = () => {
  const [pricingPlans, setPricingPlans] = useState();

  useEffect( () => async () => {
      try {
        const response = await getPricingPlanApi();
        console.log("response", response.data.data);
        setPricingPlans(response.data.data);
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      }
    }, []);

  return (
    <div className="p-6">
      <Header
        title="Quản lý Gói cước"
        description="Xem và nâng cấp gói dịch vụ của bạn"
        breadcrumbs={[{ label: "Gói cước" }]}
      />

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {pricingPlans && pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`${
              plan.current ? "border-blue-500 ring-2 ring-blue-100" : ""
            }`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold text-blue-600">
                  {plan.fee}
                </span>
                <span className="text-gray-600"> VNĐ/tháng</span>
              </div>
              {/* {plan.current && (
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Recommended
                </span>
              )} */}
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {/* {plan.features.map((feature, index) => ( */}
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">{plan.features}</span>
                  </li>
                {/* ))} */}
              </ul>

              {/* <Button variant={plan.current ? "outline" : "primary"} className="w-full" disabled={plan.current}>
                {plan.current ? "Đang sử dụng" : "Nâng cấp"}
              </Button> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 bg-yellow-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs">!</span>
            </div>
            <div>
              <h4 className="font-medium text-yellow-800">
                Lưu ý về nâng cấp gói
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                Khi nâng cấp gói, bạn sẽ được tính phí theo tỷ lệ thời gian còn
                lại trong tháng. Các tính năng mới sẽ có hiệu lực ngay lập tức.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;
