import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const statusConfig = {
  success: {
    icon: (
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    ),
    title: 'Xác thực email thành công!',
    description: 'Email của bạn đã được xác thực thành công. Bây giờ bạn có thể đăng nhập và sử dụng tất cả tính năng của hệ thống.',
    button: 'Đăng nhập ngay',
    gradient: 'from-green-400 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
  },
  fail: {
    icon: (
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    ),
    title: 'Xác thực không thành công',
    description: 'Bạn đã xác thực lỗi hoặc email xác thực đã hết hạn. Vui lòng kiểm tra lại email hoặc yêu cầu gửi lại liên kết xác thực.',
    button: 'Quay lại đăng nhập',
    gradient: 'from-red-400 to-pink-500',
    bgGradient: 'from-red-50 to-pink-50',
  },
  error: {
    icon: (
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    ),
    title: 'Lỗi hệ thống',
    description: 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau vài phút hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục.',
    button: 'Quay lại đăng nhập',
    gradient: 'from-yellow-400 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
  },
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmailConfirmed = () => {
  const query = useQuery();
  const status = query.get('status') || 'error';
  const navigate = useNavigate();
  const config = statusConfig[status] || statusConfig.error;


  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${config.bgGradient} px-3 sm:px-4 py-4 sm:py-8`}>
      <div className="relative w-full max-w-sm sm:max-w-md">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30 rounded-2xl sm:rounded-3xl blur-xl"></div>
        
        {/* Main card */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 w-full flex flex-col items-center border border-white/20">
          {/* Status icon */}
          <div className="mb-4 sm:mb-6">
            {config.icon}
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-3 sm:mb-4 leading-tight px-2 normal-case">
            {config.title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 leading-relaxed px-2 normal-case">
            {config.description}
          </p>

          {/* Action button */}
          <button
            className={`w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r ${config.gradient} text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-current text-sm sm:text-base normal-case`}
            onClick={() => navigate('/login')}
          >
            {config.button}
          </button>

          {/* Additional info for success */}
          {status === 'success' && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200 w-full">
              <div className="flex items-center text-xs sm:text-sm text-green-700 normal-case">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Tài khoản của bạn đã sẵn sàng sử dụng</span>
              </div>
            </div>
          )}

          {/* Additional info for fail */}
          {status === 'fail' && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 rounded-xl border border-red-200 w-full">
              <div className="flex items-center text-xs sm:text-sm text-red-700 normal-case">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Kiểm tra lại email hoặc yêu cầu gửi lại liên kết xác thực</span>
              </div>
            </div>
          )}

          {/* Additional info for error */}
          {status === 'error' && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 rounded-xl border border-yellow-200 w-full">
              <div className="flex items-center text-xs sm:text-sm text-yellow-700 normal-case">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Cần hỗ trợ? Liên hệ chúng tôi</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 sm:mt-8 text-center px-4">
        <p className="text-xs sm:text-sm text-gray-500 normal-case">
          © 2025 LocalExplorer. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmed; 