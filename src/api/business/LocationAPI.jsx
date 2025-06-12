export const getProvinces = () => fetch('https://provinces.open-api.vn/api/p/').then(res => res.json());
export const getDistricts = (provinceCode) => fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`).then(res => res.json());
export const getWards = (districtCode) => fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`).then(res => res.json()); 