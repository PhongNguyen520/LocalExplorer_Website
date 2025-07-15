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

const Pricing = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPricingPlanApi();
        if (response.data && response.data.data) {
          // Transform API data to match expected structure
          const transformedPlans = response.data.data.map(plan => ({
            ...plan,
            features: Array.isArray(plan.features) ? plan.features : [plan.features || 'Không có mô tả'],
            fee: plan.fee || plan.price || '0'
          }));
          setPricingPlans(transformedPlans);
        } else {
          setPricingPlans([]);
        }
      } catch (error) {
        setError(error.message || 'Có lỗi khi tải dữ liệu gói cước');
        setPricingPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <Header
          title="Quản lý Gói cước"
          description="Xem và nâng cấp gói dịch vụ của bạn"
          breadcrumbs={[{ label: "Gói cước" }]}
        />
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải gói cước...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Header
        title="Quản lý Gói cước"
        description="Xem và nâng cấp gói dịch vụ của bạn"
        breadcrumbs={[{ label: "Gói cước" }]}
      />

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            {error}
          </p>
        </div>
      )}

      {!loading && !error && pricingPlans.length === 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700 text-sm">
            Không có gói cước nào được tìm thấy.
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {pricingPlans && pricingPlans.map((plan, index) => (
          <Card
            key={plan.name || index}
            className={`${
              plan.current ? "border-blue-500 ring-2 ring-blue-100" : ""
            }`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold text-blue-600">
                  {plan.fee || plan.price}
                </span>
                <span className="text-gray-600"> VNĐ/tháng</span>
              </div>
              {plan.current && (
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Đang sử dụng
                </span>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {Array.isArray(plan.features) ? (
                  plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">{plan.features || 'Không có mô tả'}</span>
                  </li>
                )}
              </ul>

              
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border border-gray-200 bg-white shadow-sm rounded-xl">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-yellow-600 text-lg font-bold">!</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              Lưu ý về nâng cấp gói
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Khi nâng cấp gói, các tính năng của gói mới sẽ được kích hoạt ngay sau khi thanh toán hoàn tất. Khi gói hiện tại hết hạn, bạn cần thực hiện gia hạn hoặc lựa chọn nâng cấp lên gói cao hơn.<br />
              Nếu gặp vấn đề trong quá trình thanh toán hoặc gia hạn, vui lòng liên hệ với chúng tôi qua email.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;
