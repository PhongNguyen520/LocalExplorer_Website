export const getProvinces = () => fetch('http://provinces.open-api.vn/api/p/').then(res => res.json());
export const getDistricts = (provinceCode) => fetch(`http://provinces.open-api.vn/api/p/${provinceCode}?depth=2`).then(res => res.json());
export const getWards = (districtCode) => fetch(`http://provinces.open-api.vn/api/d/${districtCode}?depth=2`).then(res => res.json()); 