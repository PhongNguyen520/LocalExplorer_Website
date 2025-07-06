// Sử dụng API thay thế cho địa chỉ hành chính Việt Nam
// API: https://api.mysupership.vn/v1/partner/areas/province
// API: https://api.mysupership.vn/v1/partner/areas/district?province={provinceCode}
// API: https://api.mysupership.vn/v1/partner/areas/commune?district={districtCode}

export const getProvinces = async () => {
  try {
    const response = await fetch('https://api.mysupership.vn/v1/partner/areas/province');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching provinces:', error);
    // Fallback data nếu API không khả dụng
    return [
      { code: '01', name: 'Hà Nội' },
      { code: '79', name: 'TP. Hồ Chí Minh' },
      { code: '48', name: 'Đà Nẵng' },
      { code: '92', name: 'Cần Thơ' },
      { code: '95', name: 'Bạc Liêu' },
      { code: '27', name: 'Bắc Ninh' },
      { code: '24', name: 'Bắc Giang' },
      { code: '06', name: 'Bắc Kạn' },
      { code: '83', name: 'Bến Tre' },
      { code: '52', name: 'Bình Định' },
      { code: '74', name: 'Bình Dương' },
      { code: '70', name: 'Bình Phước' },
      { code: '60', name: 'Bình Thuận' },
      { code: '96', name: 'Cà Mau' },
      { code: '04', name: 'Cao Bằng' },
      { code: '66', name: 'Đắk Lắk' },
      { code: '67', name: 'Đắk Nông' },
      { code: '11', name: 'Điện Biên' },
      { code: '75', name: 'Đồng Nai' },
      { code: '87', name: 'Đồng Tháp' },
      { code: '64', name: 'Gia Lai' },
      { code: '02', name: 'Hà Giang' },
      { code: '35', name: 'Hà Nam' },
      { code: '42', name: 'Hà Tĩnh' },
      { code: '30', name: 'Hải Dương' },
      { code: '31', name: 'Hải Phòng' },
      { code: '93', name: 'Hậu Giang' },
      { code: '17', name: 'Hoà Bình' },
      { code: '33', name: 'Hưng Yên' },
      { code: '56', name: 'Khánh Hòa' },
      { code: '91', name: 'Kiên Giang' },
      { code: '62', name: 'Kon Tum' },
      { code: '12', name: 'Lai Châu' },
      { code: '68', name: 'Lâm Đồng' },
      { code: '20', name: 'Lạng Sơn' },
      { code: '10', name: 'Lào Cai' },
      { code: '80', name: 'Long An' },
      { code: '36', name: 'Nam Định' },
      { code: '40', name: 'Nghệ An' },
      { code: '37', name: 'Ninh Bình' },
      { code: '58', name: 'Ninh Thuận' },
      { code: '25', name: 'Phú Thọ' },
      { code: '54', name: 'Phú Yên' },
      { code: '44', name: 'Quảng Bình' },
      { code: '49', name: 'Quảng Nam' },
      { code: '51', name: 'Quảng Ngãi' },
      { code: '22', name: 'Quảng Ninh' },
      { code: '45', name: 'Quảng Trị' },
      { code: '94', name: 'Sóc Trăng' },
      { code: '14', name: 'Sơn La' },
      { code: '72', name: 'Tây Ninh' },
      { code: '34', name: 'Thái Bình' },
      { code: '19', name: 'Thái Nguyên' },
      { code: '38', name: 'Thanh Hóa' },
      { code: '46', name: 'Thừa Thiên Huế' },
      { code: '82', name: 'Tiền Giang' },
      { code: '84', name: 'Trà Vinh' },
      { code: '08', name: 'Tuyên Quang' },
      { code: '86', name: 'Vĩnh Long' },
      { code: '26', name: 'Vĩnh Phúc' },
      { code: '77', name: 'Vũng Tàu' },
      { code: '15', name: 'Yên Bái' }
    ];
  }
};

export const getDistricts = async (provinceCode) => {
  try {
    const response = await fetch(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceCode}`);
    const data = await response.json();
    return { districts: data.results || [] };
  } catch (error) {
    console.error('Error fetching districts:', error);
    // Fallback data cho một số tỉnh chính
    const fallbackDistricts = {
      '01': [ // Hà Nội
        { code: '001', name: 'Ba Đình' },
        { code: '002', name: 'Hoàn Kiếm' },
        { code: '003', name: 'Tây Hồ' },
        { code: '004', name: 'Long Biên' },
        { code: '005', name: 'Cầu Giấy' },
        { code: '006', name: 'Đống Đa' },
        { code: '007', name: 'Hai Bà Trưng' },
        { code: '008', name: 'Hoàng Mai' },
        { code: '009', name: 'Thanh Xuân' },
        { code: '016', name: 'Sóc Sơn' },
        { code: '017', name: 'Đông Anh' },
        { code: '018', name: 'Gia Lâm' },
        { code: '019', name: 'Nam Từ Liêm' },
        { code: '020', name: 'Thanh Trì' },
        { code: '021', name: 'Bắc Từ Liêm' },
        { code: '250', name: 'Mê Linh' },
        { code: '268', name: 'Hà Đông' },
        { code: '269', name: 'Sơn Tây' },
        { code: '271', name: 'Ba Vì' },
        { code: '272', name: 'Phúc Thọ' },
        { code: '273', name: 'Đan Phượng' },
        { code: '274', name: 'Hoài Đức' },
        { code: '275', name: 'Quốc Oai' },
        { code: '276', name: 'Thạch Thất' },
        { code: '277', name: 'Chương Mỹ' },
        { code: '278', name: 'Thanh Oai' },
        { code: '279', name: 'Thường Tín' },
        { code: '280', name: 'Phú Xuyên' },
        { code: '281', name: 'Ứng Hòa' },
        { code: '282', name: 'Mỹ Đức' }
      ],
      '79': [ // TP. Hồ Chí Minh
        { code: '760', name: 'Quận 1' },
        { code: '761', name: 'Quận 12' },
        { code: '762', name: 'Quận Thủ Đức' },
        { code: '763', name: 'Quận 9' },
        { code: '764', name: 'Quận Gò Vấp' },
        { code: '765', name: 'Quận Bình Thạnh' },
        { code: '766', name: 'Quận Tân Bình' },
        { code: '767', name: 'Quận Tân Phú' },
        { code: '768', name: 'Quận Phú Nhuận' },
        { code: '769', name: 'Quận 2' },
        { code: '770', name: 'Quận 3' },
        { code: '771', name: 'Quận 10' },
        { code: '772', name: 'Quận 11' },
        { code: '773', name: 'Quận 4' },
        { code: '774', name: 'Quận 5' },
        { code: '775', name: 'Quận 6' },
        { code: '776', name: 'Quận 8' },
        { code: '777', name: 'Quận Bình Tân' },
        { code: '778', name: 'Quận 7' },
        { code: '783', name: 'Huyện Củ Chi' },
        { code: '784', name: 'Huyện Hóc Môn' },
        { code: '785', name: 'Huyện Bình Chánh' },
        { code: '786', name: 'Huyện Nhà Bè' },
        { code: '787', name: 'Huyện Cần Giờ' }
      ]
    };
    return { districts: fallbackDistricts[provinceCode] || [] };
  }
};

export const getWards = async (districtCode) => {
  try {
    const response = await fetch(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtCode}`);
    const data = await response.json();
    return { wards: data.results || [] };
  } catch (error) {
    console.error('Error fetching wards:', error);
    // Fallback data cho một số quận/huyện chính
    const fallbackWards = {
      '001': [ // Ba Đình - Hà Nội
        { code: '00001', name: 'Phúc Xá' },
        { code: '00004', name: 'Trúc Bạch' },
        { code: '00006', name: 'Vĩnh Phúc' },
        { code: '00007', name: 'Cống Vị' },
        { code: '00008', name: 'Liễu Giai' },
        { code: '00010', name: 'Nguyễn Trung Trực' },
        { code: '00013', name: 'Quán Thánh' },
        { code: '00016', name: 'Ngọc Hà' },
        { code: '00019', name: 'Điện Biên' },
        { code: '00022', name: 'Đội Cấn' },
        { code: '00025', name: 'Ngọc Khánh' },
        { code: '00028', name: 'Kim Mã' },
        { code: '00031', name: 'Giảng Võ' },
        { code: '00034', name: 'Thành Công' }
      ],
      '760': [ // Quận 1 - TP.HCM
        { code: '26734', name: 'Phường Tân Định' },
        { code: '26737', name: 'Phường Đa Kao' },
        { code: '26740', name: 'Phường Bến Nghé' },
        { code: '26743', name: 'Phường Bến Thành' },
        { code: '26746', name: 'Phường Nguyễn Thái Bình' },
        { code: '26749', name: 'Phường Phạm Ngũ Lão' },
        { code: '26752', name: 'Phường Cầu Ông Lãnh' },
        { code: '26755', name: 'Phường Cô Giang' },
        { code: '26758', name: 'Phường Nguyễn Cư Trinh' },
        { code: '26761', name: 'Phường Cầu Kho' }
      ]
    };
    return { wards: fallbackWards[districtCode] || [] };
  }
};

export const getCoordinates = async (address) => {
  try {
    
    let cleanAddress = address;
    
    if (cleanAddress.includes(', Vietnam')) {
      cleanAddress = cleanAddress.replace(', Vietnam', '');
    }
    
    cleanAddress = cleanAddress + ', Vietnam';
    
    const encodedAddress = cleanAddress
      .replace(/\s+/g, '%20')  
      .replace(/,/g, '%2C')    
      .replace(/\(/g, '%28')   
      .replace(/\)/g, '%29'); 
    
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&countrycodes=vn`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

export const getCoordinatesFromAddress = async (location) => {
  try {
    const { provinceName, districtName, wardName, addressDetail } = location;
    let fullAddress = '';
    if (addressDetail) fullAddress += addressDetail + ', ';
    if (wardName) fullAddress += wardName + ', ';
    if (districtName) fullAddress += districtName + ', ';
    if (provinceName) fullAddress += provinceName + ', ';
    fullAddress += 'Vietnam';
    return await getCoordinates(fullAddress);
  } catch (error) {
    return null;
  }
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

// Hàm lấy địa chỉ từ tọa độ (reverse geocoding)
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    if (data && data.address) {
      return {
        address: data.display_name,
        provinceName: data.address.state || data.address.province,
        districtName: data.address.county || data.address.district,
        wardName: data.address.city || data.address.town || data.address.village,
        addressDetail: data.address.road || data.address.house_number
      };
    }
    
    return null;
  } catch (error) {
    return null;
  }
}; 