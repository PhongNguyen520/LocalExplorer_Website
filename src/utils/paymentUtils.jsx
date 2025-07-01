// Utility functions for payment processing

export const parsePaymentParams = (searchParams) => {
  return {
    orderCode: searchParams.get('orderCode') || '',
    businessId: searchParams.get('id') || searchParams.get('businessId') || '',
    status: searchParams.get('status') || '',
    code: searchParams.get('code') || '',
    cancel: searchParams.get('cancel') || '',
    amount: searchParams.get('amount') || '',
    paymentMethod: searchParams.get('paymentMethod') || 'Online Banking',
    transactionId: searchParams.get('transactionId') || '',
  };
};

export const getPaymentStatusInfo = (status, code) => {
  const statusUpper = status?.toUpperCase();
  const codeUpper = code?.toUpperCase();

  switch (statusUpper) {
    case 'SUCCESS':
    case 'COMPLETED':
      return {
        type: 'success',
        title: 'Thanh toán thành công!',
        description: 'Giao dịch của bạn đã được xử lý thành công',
        icon: 'check-circle',
        color: 'green',
      };
    
    case 'CANCELLED':
      return {
        type: 'cancelled',
        title: 'Giao dịch đã bị hủy',
        description: codeUpper === '00' 
          ? 'Bạn đã hủy giao dịch thanh toán. Business của bạn vẫn chưa được kích hoạt.'
          : 'Giao dịch thanh toán đã bị hủy.',
        icon: 'x-circle',
        color: 'red',
      };
    
    case 'FAILED':
      return {
        type: 'failed',
        title: 'Giao dịch thất bại',
        description: 'Giao dịch thanh toán không thành công do lỗi hệ thống hoặc thông tin không hợp lệ.',
        icon: 'x-circle',
        color: 'red',
      };
    
    case 'EXPIRED':
      return {
        type: 'expired',
        title: 'Giao dịch đã hết hạn',
        description: 'Thời gian thanh toán đã hết hạn. Vui lòng thực hiện lại giao dịch.',
        icon: 'clock',
        color: 'orange',
      };
    
    case 'PENDING':
      return {
        type: 'pending',
        title: 'Giao dịch đang xử lý',
        description: 'Giao dịch của bạn đang được xử lý. Vui lòng chờ trong giây lát.',
        icon: 'loader',
        color: 'blue',
      };
    
    default:
      return {
        type: 'unknown',
        title: 'Giao dịch không thành công',
        description: 'Có lỗi xảy ra trong quá trình xử lý thanh toán. Vui lòng thử lại.',
        icon: 'help-circle',
        color: 'gray',
      };
  }
};

export const formatCurrency = (amount) => {
  if (!amount) return 'N/A';
  const numAmount = parseInt(amount);
  return `${numAmount.toLocaleString()} VNĐ`;
};

export const formatDateTime = (dateString) => {
  if (!dateString) return new Date().toLocaleString('vi-VN');
  return new Date(dateString).toLocaleString('vi-VN');
};

export const getErrorCodeDescription = (code) => {
  const codeMap = {
    '00': 'Giao dịch bị hủy bởi người dùng',
    '01': 'Thông tin thẻ không hợp lệ',
    '02': 'Thẻ bị khóa hoặc hết hạn',
    '03': 'Số dư không đủ',
    '04': 'Lỗi kết nối mạng',
    '05': 'Giao dịch bị từ chối bởi ngân hàng',
    '06': 'Thời gian giao dịch quá lâu',
    '07': 'Lỗi hệ thống thanh toán',
    '08': 'Thông tin đơn hàng không hợp lệ',
    '09': 'Giao dịch đã tồn tại',
    '10': 'Lỗi xác thực',
  };
  
  return codeMap[code] || 'Có lỗi xảy ra trong quá trình xử lý';
}; 