import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Home, Receipt, Calendar, CreditCard } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Business/ui/Card';
import Button from '../../components/Business/ui/Button';
import { Badge } from 'antd';
import { parsePaymentParams, formatCurrency, formatDateTime } from '../../utils/paymentUtils';
import config from '../../config';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    const params = parsePaymentParams(searchParams);
    setPaymentData(params);
  }, [searchParams]);

  const handleViewBusiness = () => {
    if (paymentData.businessId) {
      navigate(`/business/${paymentData.businessId}`);
    }
  };

  const handleGoHome = () => {
    navigate(config.routes.businesses);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h1>
          <p className="text-gray-600 text-lg">Giao dịch của bạn đã được xử lý thành công</p>
        </div>

        {/* Payment Details Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-6">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Chi tiết giao dịch</CardTitle>
            <CardDescription>Thông tin về giao dịch thanh toán của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transaction Status */}
            <div className="flex items-center justify-center mb-6">
              <Badge 
                status="success" 
                text="Giao dịch thành công"
                className="text-lg font-semibold"
              />
            </div>

            {/* Payment Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                    <p className="font-semibold text-gray-900">{paymentData.orderCode || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Phương thức thanh toán</p>
                    <p className="font-semibold text-gray-900">{paymentData.paymentMethod}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Thời gian</p>
                    <p className="font-semibold text-gray-900">
                      {formatDateTime()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">₫</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số tiền</p>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(paymentData.amount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction ID */}
            {paymentData.transactionId && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Mã giao dịch:</span> {paymentData.transactionId}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50 mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Bước tiếp theo</CardTitle>
            <CardDescription>Những gì bạn có thể làm ngay bây giờ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Business đã được kích hoạt</p>
                  <p className="text-sm text-gray-600">Business của bạn giờ đã có thể hoạt động bình thường</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Quản lý business</p>
                  <p className="text-sm text-gray-600">Truy cập vào dashboard để quản lý business</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Nhận thông báo</p>
                  <p className="text-sm text-gray-600">Chúng tôi sẽ gửi email xác nhận chi tiết</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* <Button
            onClick={handleViewBusiness}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Xem Business
          </Button> */}
          <Button
            onClick={handleGoHome}
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-semibold"
          >
            <Home className="mr-2 h-4 w-4" />
            Quay về danh sách
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ{' '}
            <a href="mailto:support@localexplorer.com" className="text-blue-600 hover:underline">
              support@localexplorer.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 