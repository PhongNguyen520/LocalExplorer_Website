import React, { useEffect, useState } from 'react';
import { XCircle, RefreshCw, Home, AlertTriangle, HelpCircle, ArrowLeft } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Business/ui/Card';
import Button from '../../components/Business/ui/Button';
import { Badge } from 'antd';
import { 
  parsePaymentParams, 
  getPaymentStatusInfo, 
  formatDateTime, 
  getErrorCodeDescription 
} from '../../utils/paymentUtils';

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({});
  const [statusInfo, setStatusInfo] = useState({});

  useEffect(() => {
    const params = parsePaymentParams(searchParams);
    const status = getPaymentStatusInfo(params.status, params.code);
    setPaymentData(params);
    setStatusInfo(status);
  }, [searchParams]);

  const handleRetryPayment = () => {
    if (paymentData.businessId) {
      navigate(`/business/${paymentData.businessId}`);
    }
  };

  const handleGoHome = () => {
    navigate('/business');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Error Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{statusInfo.title}</h1>
          <p className="text-gray-600 text-lg">{statusInfo.description}</p>
        </div>

        {/* Error Details Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-6">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Chi tiết giao dịch</CardTitle>
            <CardDescription>Thông tin về giao dịch thanh toán không thành công</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transaction Status */}
            <div className="flex items-center justify-center mb-6">
              <Badge 
                status="error" 
                text={statusInfo.title}
                className="text-lg font-semibold"
              />
            </div>

            {/* Error Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-sm text-red-600">Mã lỗi</p>
                    <p className="font-semibold text-red-800">{paymentData.code || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">#</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                    <p className="font-semibold text-gray-900">{paymentData.orderCode || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">⏰</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Thời gian</p>
                    <p className="font-semibold text-gray-900">
                      {formatDateTime()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ℹ</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <p className="font-semibold text-gray-900">{paymentData.status || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Code Details */}
            {paymentData.code && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800 mb-1">Mã lỗi: {paymentData.code}</p>
                    <p className="text-xs text-red-700">
                      {getErrorCodeDescription(paymentData.code)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Solutions Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50 mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Giải pháp</CardTitle>
            <CardDescription>Những gì bạn có thể làm để khắc phục</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Thử lại thanh toán</p>
                  <p className="text-sm text-gray-600">Thực hiện lại giao dịch thanh toán</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Kiểm tra thông tin</p>
                  <p className="text-sm text-gray-600">Đảm bảo thông tin thanh toán chính xác</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Liên hệ hỗ trợ</p>
                  <p className="text-sm text-gray-600">Nếu vấn đề vẫn tiếp tục xảy ra</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleRetryPayment}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Thử lại thanh toán
          </Button>
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div> */}

        <div className="mt-4">
          <Button
            onClick={handleGoHome}
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-900 py-2"
          >
            <Home className="mr-2 h-4 w-4" />
            Về trang chủ
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Cần hỗ trợ? Liên hệ chúng tôi ngay
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="mailto:support@localexplorer.com" className="text-blue-600 hover:underline">
              support@localexplorer.com
            </a>
            <span className="text-gray-400">|</span>
            <a href="tel:+84123456789" className="text-blue-600 hover:underline">
              +84 123 456 789
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel; 