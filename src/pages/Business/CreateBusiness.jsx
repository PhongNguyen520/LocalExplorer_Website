import Header from "../../components/Business/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Business/ui/Card";
import { Save, X, Plus, Trash2 } from "lucide-react";
import Button from "../../components/Business/ui/Button";
import { useEffect, useState } from "react";
import { getPricingPlanApi } from "../../api/business/PricingPlan";
import { getBusinessType } from "../../api/business/BusinessType";
import { createBusinessApi } from "../../api/ListBusiness";
import { getProvinces, getDistricts, getWards } from "../../api/business/LocationAPI";
import { SpinnerOverlay } from "../../components/Business/ui/SpinnerOverlay";
import { Modal } from "../../components/Business/ui/Modal";


const defaultLocation = {
  countryName: "Việt Nam",
  countryCode: "VN",
  provinceName: "",
  provinceCode: "",
  districtName: "",
  districtCode: "",
  wardName: "",
  wardCode: "",
  addressDetail: "",
  latitude: undefined,
  longitude: undefined,
};

const CreateBusiness = () => {
  const [form, setForm] = useState({
    name: "",
    introduction: "",
    description: "",
    website: "",
    hightlight: [""],
    openTime: "",
    closeTime: "",
    pricingPlanId: "",
    services: [],
    location: { ...defaultLocation },
  });
  const [pricingPlans, setPricingPlans] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAllServices, setShowAllServices] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");

  // Địa chỉ hành chính Việt Nam
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdBusinessId, setCreatedBusinessId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pricingRes, serviceRes] = await Promise.all([
          getPricingPlanApi(),
          getBusinessType(),
        ]);
        setPricingPlans(pricingRes.data.data || []);
        setServices(serviceRes.data.data || []);
      } catch (err) {
        setError("Không thể tải dữ liệu gói cước hoặc dịch vụ!");
      }
    };
    fetchData();
  }, []);

  // Lấy danh sách tỉnh/thành khi vào trang
  useEffect(() => {
    setLoadingProvinces(true);
    getProvinces()
      .then(data => {
        if (Array.isArray(data)) {
          setProvinces(data);
        } else {
          console.error('Invalid provinces data:', data);
          setProvinces([]);
        }
      })
      .catch(err => {
        console.error('Error fetching provinces:', err);
        setProvinces([]);
      })
      .finally(() => setLoadingProvinces(false));
  }, []);

  // Khi chọn tỉnh, load quận/huyện
  useEffect(() => {
    if (!form.location.provinceCode) {
      setDistricts([]);
      setWards([]);
      return;
    }
    setLoadingDistricts(true);
    getDistricts(form.location.provinceCode)
      .then(data => {
        if (data && Array.isArray(data.districts)) {
          setDistricts(data.districts);
        } else {
          console.error('Invalid districts data:', data);
          setDistricts([]);
        }
      })
      .catch(err => {
        console.error('Error fetching districts:', err);
        setDistricts([]);
      })
      .finally(() => setLoadingDistricts(false));
  }, [form.location.provinceCode]);

  // Khi chọn quận, load phường/xã
  useEffect(() => {
    if (!form.location.districtCode) {
      setWards([]);
      return;
    }
    setLoadingWards(true);
    getWards(form.location.districtCode)
      .then(data => {
        if (data && Array.isArray(data.wards)) {
          setWards(data.wards);
        } else {
          console.error('Invalid wards data:', data);
          setWards([]);
        }
      })
      .catch(err => {
        console.error('Error fetching wards:', err);
        setWards([]);
      })
      .finally(() => setLoadingWards(false));
  }, [form.location.districtCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHighlightChange = (idx, value) => {
    setForm((prev) => {
      const newHL = [...prev.hightlight];
      newHL[idx] = value;
      return { ...prev, hightlight: newHL };
    });
  };

  const addHighlight = () =>
    setForm((prev) => ({ ...prev, hightlight: [...prev.hightlight, ""] }));

  const removeHighlight = (idx) =>
    setForm((prev) => ({
      ...prev,
      hightlight: prev.hightlight.filter((_, i) => i !== idx),
    }));

  const handleServiceChange = (id) => {
    setForm((prev) => {
      const exists = prev.services.includes(id);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== id)
          : [...prev.services, id],
      };
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };

  const handlePricingPlanSelect = (id) => {
    console.log("Selecting pricing plan with ID:", id);
    setForm((prev) => {
      const newForm = { ...prev, pricingPlanId: id };
      console.log("New form state:", newForm);
      return newForm;
    });
  };

  console.log("Current form state:", form);

  const handleSubmit = async (e) => {
    console.log("Submitting form data:", form);
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (
        !form.name ||
        !form.introduction ||
        !form.pricingPlanId ||
        !form.services.length
      ) {
        setError("Vui lòng điền đầy đủ các trường bắt buộc!");
        setLoading(false);
        return;
      }
      const submitData = {
        ...form,
        hightlight: form.hightlight.filter((h) => h.trim()),
        location: {
          ...form.location,
          latitude: form.location.latitude
            ? Number(form.location.latitude)
            : undefined,
          longitude: form.location.longitude
            ? Number(form.location.longitude)
            : undefined,
        },
      };
      const res = await createBusinessApi(submitData);
      // Lấy businessId từ response
      const businessId = res?.data?.data?.id || res?.data?.data?.businessId;
      setCreatedBusinessId(businessId);
      setSuccess("Tạo business thành công!");
      setShowSuccessModal(true);
      setForm({
        name: "",
        introduction: "",
        description: "",
        website: "",
        hightlight: [""],
        openTime: "",
        closeTime: "",
        pricingPlanId: "",
        services: [],
        location: { ...defaultLocation },
      });
    } catch (err) {
      setError("Tạo business thất bại!");
    }
    setLoading(false);
  };

  // Filtered services for search
  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    s.description.toLowerCase().includes(serviceSearch.toLowerCase())
  );
  const servicesToShow = showAllServices ? filteredServices : filteredServices.slice(0, 9);


  return (
    <div className="p-6 flex justify-center">
      {/* Overlay loading spinner */}
      <SpinnerOverlay show={loading} />
      {/* Modal popup thành công */}
      <Modal show={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-2">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-green-700 text-center">Tạo doanh nghiệp thành công!</h2>
          <p className="text-gray-700 text-center">Vui lòng thanh toán gói cước để kích hoạt doanh nghiệp của bạn.</p>
        </div>
      </Modal>
      <div className="w-full">
        <Header
          breadcrumbs={[
            { label: "Doanh nghiệp", href: "/businesses" },
            { label: "Tạo mới", href: "/businesses" },
          ]}
        />
        <form className="space-y-8 mt-6" onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Doanh Nghiệp</CardTitle>
              <CardDescription>
                Điền thông tin chi tiết về doanh nghiệp của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tên Doanh Nghiệp *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Nhập tên business"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Giới thiệu ngắn *
                  </label>
                  <input
                    name="introduction"
                    value={form.introduction}
                    onChange={handleChange}
                    required
                    placeholder="Mô tả ngắn gọn về business"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mô tả chi tiết
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mô tả chi tiết về business của bạn"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://website.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Điểm nổi bật
                </label>
                <div className="space-y-2">
                  {form.hightlight.map((hl, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        value={hl}
                        onChange={(e) =>
                          handleHighlightChange(idx, e.target.value)
                        }
                        placeholder={`Điểm nổi bật #${idx + 1}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {form.hightlight.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHighlight(idx)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="flex items-center gap-1 text-blue-600 hover:underline mt-1"
                  >
                    <Plus size={16} /> Thêm điểm nổi bật
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Giờ mở cửa
                  </label>
                  <input
                    name="openTime"
                    value={form.openTime}
                    onChange={handleChange}
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Giờ đóng cửa
                  </label>
                  <input
                    name="closeTime"
                    value={form.closeTime}
                    onChange={handleChange}
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chọn dịch vụ */}
          <Card>
            <CardHeader>
              <CardTitle>Chọn dịch vụ *</CardTitle>
              <CardDescription>
                Chọn các loại hình dịch vụ phù hợp với doanh nghiệp của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ..."
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {servicesToShow.map((service) => {
                  const selected = form.services.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      className={`flex flex-col items-start gap-2 p-4 rounded-lg border cursor-pointer transition-all shadow-sm hover:shadow-md h-full min-h-[120px] ${
                        selected
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 bg-white"
                      }`}
                      onClick={() => handleServiceChange(service.id)}
                    >
                      <div className="flex items-center gap-3">
                        <i
                          className={`fas ${service.icon} text-2xl ${
                            selected ? "text-blue-600" : "text-gray-500"
                          }`}
                        ></i>
                        <span
                          className={`font-semibold text-base ${
                            selected ? "text-blue-700" : "text-gray-800"
                          }`}
                        >
                          {service.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {service.description}
                      </span>
                    </div>
                  );
                })}
              </div>
              {filteredServices.length > 9 && (
                <div className="flex justify-center mt-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => setShowAllServices((v) => !v)}
                  >
                    {showAllServices ? "Ẩn bớt" : "Xem thêm dịch vụ..."}
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Địa chỉ</CardTitle>
              <CardDescription>
                Nhập thông tin địa chỉ chi tiết cho doanh nghiệp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
           
              {/* Địa chỉ hành chính */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Tỉnh/Thành phố</label>
                <select
                  name="provinceCode"
                  value={form.location.provinceCode}
                  onChange={e => {
                    const code = e.target.value;
                    const province = provinces.find(p => String(p.code) === code);
                    setForm(prev => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        provinceCode: code,
                        provinceName: province ? province.name : "",
                        districtCode: "",
                        districtName: "",
                        wardCode: "",
                        wardName: "",
                      },
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {Array.isArray(provinces) && provinces.map(p => (
                    <option key={p.code} value={p.code}>{p.name}</option>
                  ))}
                </select>
                {loadingProvinces && <div className="text-xs text-gray-400 mt-1">Đang tải...</div>}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Quận/Huyện</label>
                <select
                  name="districtCode"
                  value={form.location.districtCode}
                  onChange={e => {
                    const code = e.target.value;
                    const district = districts.find(d => String(d.code) === code);
                    setForm(prev => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        districtCode: code,
                        districtName: district ? district.name : "",
                        wardCode: "",
                        wardName: "",
                      },
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!form.location.provinceCode}
                >
                  <option value="">Chọn quận/huyện</option>
                  {Array.isArray(districts) && districts.map(d => (
                    <option key={d.code} value={d.code}>{d.name}</option>
                  ))}
                </select>
                {loadingDistricts && <div className="text-xs text-gray-400 mt-1">Đang tải...</div>}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phường/Xã</label>
                <select
                  name="wardCode"
                  value={form.location.wardCode}
                  onChange={e => {
                    const code = e.target.value;
                    const ward = wards.find(w => String(w.code) === code);
                    setForm(prev => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        wardCode: code,
                        wardName: ward ? ward.name : "",
                      },
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!form.location.districtCode}
                >
                  <option value="">Chọn phường/xã</option>
                  {Array.isArray(wards) && wards.map(w => (
                    <option key={w.code} value={w.code}>{w.name}</option>
                  ))}
                </select>
                {loadingWards && <div className="text-xs text-gray-400 mt-1">Đang tải...</div>}
              </div>

                 {/* Địa chỉ chi tiết */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Số nhà, Tên đường...
                </label>
                <input
                  name="addressDetail"
                  value={form.location.addressDetail}
                  onChange={handleLocationChange}
                  placeholder="Nhập địa chỉ chi tiết"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Vĩ độ, Kinh độ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Vĩ độ (latitude)</label>
                  <input name="latitude" value={form.location.latitude || ""} onChange={handleLocationChange} placeholder="Vĩ độ (không bắt buộc)" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Kinh độ (longitude)</label>
                  <input name="longitude" value={form.location.longitude || ""} onChange={handleLocationChange} placeholder="Kinh độ (không bắt buộc)" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chọn gói cước *</CardTitle>
              <CardDescription>
                Chọn gói cước phù hợp cho doanh nghiệp của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingPlans.map((plan) => {
                  const isSelected = String(form.pricingPlanId) === String(plan.id);
                  console.log(`Plan ${plan.id} is selected:`, isSelected);
                  return (
                    <Card
                      key={plan.id}
                      className={`cursor-pointer border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                      onClick={() => handlePricingPlanSelect(plan.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          {isSelected && (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mt-2">
                          {plan.fee ? plan.fee.toLocaleString() : ""}{" "}
                          <span className="text-sm font-normal text-gray-600">
                            VNĐ/tháng
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-3">
                          <li className="flex items-start gap-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                              isSelected ? "bg-blue-100" : "bg-green-100"
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${
                                isSelected ? "bg-blue-600" : "bg-green-600"
                              }`}></div>
                            </div>
                            <span className="text-sm text-gray-700">
                              {plan.features}
                            </span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {error && (
                <div className="text-red-600 font-semibold">{error}</div>
              )}

          <div className="flex gap-4 pt-6 justify-end">
            <Button variant="outline" to="/businesses" type="button">
              <X className="mr-2 h-4 w-4" />
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Đang tạo..." : "Tạo Business"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBusiness;
