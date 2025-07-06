import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Business/Header";
import { Card, CardContent } from "../../components/Business/ui/Card";
import Button from "../../components/Business/ui/Button";
import Badge from "../../components/Business/ui/Badge";
import { Modal } from "../../components/Business/ui/Modal";
import {
  Star,
  Heart,
  Clock,
  Globe,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Camera,
  Info,
  Edit3,
  ExternalLink,
  Award,
  Coffee,
  Plus,
  ArrowRight,
  CheckCircle,
  Trash2,
  AlertCircle,

} from "lucide-react";
import { getBusinessDetailApi } from "../../api/ListBusiness";

import { FeedbackAPI } from "../../api/business/FeedbackAPI";
import config from "../../config";
import {
  updateBusinessProfileApi,
  updateBusinessLogoApi,
  updateBusinessBackgroundApi,
  deleteBusinessImagesApi,
  uploadBusinessImagesApi,
} from "../../api/business/BusinessProfileAPI";
import {
  createEventApi,
  updateEventApi,
  deleteEventApi,
} from "../../api/business/EventAPI";
import {
  createBusinessServiceApi,
  updateBusinessServiceApi,
  deleteBusinessServiceApi,
} from "../../api/business/ServiceAPI";
import images from "../../assets/images";


const BusinessOverview = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [editLoading, setEditLoading] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success"); // 'success' or 'error'
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventEdit, setEventEdit] = useState(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [eventForm, setEventForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    image: null,
  });

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceEdit, setServiceEdit] = useState(null);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    price: 0,
    discount: 0,
    availability: true,
    duration: "",
    inclusions: "",
    exclustions: "",
    condition: "",
  });

  // Function to show modal
  const showNotificationModal = (type, title, message) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Auto close modal for success messages
  useEffect(() => {
    if (showModal && modalType === "success") {
      const timer = setTimeout(() => {
        closeModal();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal, modalType]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [businessResponse, feedbackResponse] = await Promise.all([
          getBusinessDetailApi(businessId),
          FeedbackAPI.getFeedbackListByBusinessId(businessId),
        ]);

        const businessData = businessResponse.data.data;
        setBusiness(businessData);
        setFeedbacks(feedbackResponse.data?.items || []);
        setServices(businessData.services || []);
        setEvents(businessData.events || []);

      } catch (error) {
        console.error("Error fetching business details:", error);
        setError("Không thể tải thông tin business");
      } finally {
        setLoading(false);

      }
    };

    fetchData();
  }, [businessId]);


  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatPriceInput = (value) => {
    // Kiểm tra nếu value là null, undefined hoặc không phải string
    if (!value && value !== 0) return '0';
    
    // Chuyển đổi thành string
    const stringValue = String(value);
    // Loại bỏ tất cả ký tự không phải số
    const numericValue = stringValue.replace(/[^\d]/g, '');
    // Format với dấu chấm ngăn cách
    return new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue || 0);
  };

  const parsePriceInput = (value) => {
    // Kiểm tra nếu value là null, undefined
    if (!value && value !== 0) return 0;
    
    // Chuyển đổi thành string
    const stringValue = String(value);
    // Loại bỏ tất cả ký tự không phải số để lấy giá trị số
    return parseInt(stringValue.replace(/[^\d]/g, '')) || 0;
  };

  const getBusinessTypeIcon = (typeName) => {
    const iconMap = {
      "Đồ uống": Coffee,
      "Ăn uống": Users,
      "Spa & Chăm sóc sức khỏe": Heart,
      "Thời trang & Phụ kiện": Award,
    };
    return iconMap[typeName] || Users;
  };

  const handleEditToggle = () => {
    if (!editMode) {
      setEditProfile({
        name: business.name,
        introduction: business.introduction,
        description: business.description,
        website: business.website,
        highlight: business.hightlight || [],
        openTime: business.openTime,
        closeTime: business.closeTime,
        cost: business.cost,
      });
      setLogoPreview(business.logo);
      setBackgroundPreview(business.background);
    }
    setEditMode(!editMode);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    
    // Xử lý đặc biệt cho trường cost (giá trung bình)
    if (name === 'cost') {
      const numericValue = parsePriceInput(value);
      setEditProfile((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setEditProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleHighlightChange = (idx, value) => {
    setEditProfile((prev) => {
      const arr = [...prev.highlight];
      arr[idx] = value;
      return { ...prev, highlight: arr };
    });
  };

  const handleAddHighlight = () =>
    setEditProfile((prev) => ({ ...prev, highlight: [...prev.highlight, ""] }));

  const handleRemoveHighlight = (idx) =>
    setEditProfile((prev) => {
      const arr = [...prev.highlight];
      arr.splice(idx, 1);
      return { ...prev, highlight: arr };
    });



  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      // Chỉ gửi các trường được phép cập nhật
      const updateData = {
        name: editProfile.name,
        introduction: editProfile.introduction,
        description: editProfile.description,
        website: editProfile.website,
        hightlight: editProfile.highlight,
        openTime: editProfile.openTime,
        closeTime: editProfile.closeTime,
        cost: editProfile.cost,
      };
      
      await updateBusinessProfileApi(businessId, updateData);
      showNotificationModal("success", "Cập nhật thông tin thành công!", "");
      setEditMode(false);
      window.location.reload();
    } catch {
      showNotificationModal(
        "error",
        "Cập nhật thất bại!",
        "Đã xảy ra lỗi khi cập nhật thông tin business"
      );
    }
    setEditLoading(false);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleLogoSubmit = async (e) => {
    e.preventDefault();
    if (!logoFile) return;
    setEditLoading(true);
    try {
      await updateBusinessLogoApi(businessId, logoFile);
      showNotificationModal("success", "Cập nhật logo thành công!", "");
      window.location.reload();
    } catch {
      showNotificationModal(
        "error",
        "Cập nhật logo thất bại!",
        "Đã xảy ra lỗi khi cập nhật logo business"
      );
    }
    setEditLoading(false);
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    setBackgroundFile(file);
    setBackgroundPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleBackgroundSubmit = async (e) => {
    e.preventDefault();
    if (!backgroundFile) return;
    setEditLoading(true);
    try {
      await updateBusinessBackgroundApi(businessId, backgroundFile);
      showNotificationModal("success", "Cập nhật background thành công!", "");
      window.location.reload();
    } catch {
      showNotificationModal(
        "error",
        "Cập nhật background thất bại!",
        "Đã xảy ra lỗi khi cập nhật background business"
      );
    }
    setEditLoading(false);
  };

  const handleImagesAdd = (e) => setImagesToAdd([...e.target.files]);

  const handleImagesAddSubmit = async (e) => {
    e.preventDefault();
    if (!imagesToAdd.length) return;
    setEditLoading(true);
    try {
      await uploadBusinessImagesApi(businessId, imagesToAdd);
      showNotificationModal("success", "Thêm hình ảnh thành công!", "");
      setImagesToAdd([]);
      window.location.reload();
    } catch {
      showNotificationModal(
        "error",
        "Thêm hình ảnh thất bại!",
        "Đã xảy ra lỗi khi thêm hình ảnh business"
      );
    }
    setEditLoading(false);
  };

  const openCreateEvent = () => {
    setEventEdit(null);
    setEventForm({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      image: null,
    });
    setShowEventModal(true);
  };
  const openEditEvent = (event) => {
    setEventEdit(event);
    setEventForm({
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      image: null,
    });
    setShowEventModal(true);
  };
  const handleEventFormChange = (e) => {
    const { name, value, files } = e.target;
    setEventForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setEventLoading(true);
    try {
      if (eventEdit) {
        await updateEventApi({
          id: eventEdit.id,
          name: eventForm.name,
          description: eventForm.description,
          startDate: eventForm.startDate,
          endDate: eventForm.endDate,
          status: eventEdit.status || "active",
          image: eventForm.image,
        });
        showNotificationModal("success", "Cập nhật sự kiện thành công!");
      } else {
        await createEventApi({
          name: eventForm.name,
          description: eventForm.description,
          startDate: eventForm.startDate,
          endDate: eventForm.endDate,
          image: eventForm.image,
          businessId,
        });
        showNotificationModal("success", "Tạo sự kiện thành công!");
      }
      setShowEventModal(false);
      // Reload events
      const businessResponse = await getBusinessDetailApi(businessId);
      setEvents(businessResponse.data.data.events || []);
    } catch {
      showNotificationModal(
        "error",
        "Lưu sự kiện thất bại!",
        "Vui lòng kiểm tra lại dữ liệu."
      );
    }
    setEventLoading(false);
  };
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sự kiện này?")) return;
    setEventLoading(true);
    try {
      await deleteEventApi(id);
      showNotificationModal("success", "Xóa sự kiện thành công!");
      // Reload events
      const businessResponse = await getBusinessDetailApi(businessId);
      setEvents(businessResponse.data.data.events || []);
    } catch {
      showNotificationModal("error", "Xóa sự kiện thất bại!");
    }
    setEventLoading(false);
  };

  const openCreateService = () => {
    setServiceEdit(null);
    setServiceForm({
      name: "",
      description: "",
      price: 0,
      discount: 0,
      availability: true,
      duration: "",
      inclusions: "",
      exclustions: "",
      condition: "",
    });
    setShowServiceModal(true);
  };
  const openEditService = (service) => {
    setServiceEdit(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      price: service.price,
      discount: service.discount,
      availability: service.availability,
      duration: service.duration,
      inclusions: service.inclusions,
      exclustions: service.exclustions,
      condition: service.condition,
      status: service.status || "",
    });
    setShowServiceModal(true);
  };
  const handleServiceFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleServiceSubmit = async (e) => {

    
    e.preventDefault();
    setServiceLoading(true);
    try {
      if (serviceEdit) {
        await updateBusinessServiceApi({
          id: serviceEdit.id,
          ...serviceForm,
        });
        showNotificationModal("success", "Cập nhật dịch vụ thành công!");
      } else {
        await createBusinessServiceApi({
          ...serviceForm,
          businessId,
        });
        showNotificationModal("success", "Tạo dịch vụ thành công!");
      }
      setShowServiceModal(false);
      // Reload services
      const businessResponse = await getBusinessDetailApi(businessId);
      setServices(businessResponse.data.data.services || []);
    } catch(error) {
      showNotificationModal(
        "error",
        "Lưu dịch vụ thất bại!",
        "Vui lòng kiểm tra lại dữ liệu."
      );
      console.error("Error saving service:", error);
    }
    setServiceLoading(false);
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) return;
    setServiceLoading(true);
    try {
      await deleteBusinessServiceApi(id);
      showNotificationModal("success", "Xóa dịch vụ thành công!");
      // Reload services
      const businessResponse = await getBusinessDetailApi(businessId);
      setServices(businessResponse.data.data.services || []);
    } catch {
      showNotificationModal("error", "Xóa dịch vụ thất bại!");
    }
    setServiceLoading(false);
  };

  const renderOverviewContent = () => {
    return (
      <div className="space-y-8">
        {/* Business Introduction with Modern Design */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-blue-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>

          <CardContent className="relative p-8">
            <div className="flex items-start gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Info className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Giới thiệu
                </h3>
                <div className="space-y-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h4 className="text-lg font-semibold text-slate-800 mb-3">
                      Tổng quan
                    </h4>
                    <p className="text-base text-slate-700 leading-relaxed">
                      {business.introduction}
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h4 className="text-lg font-semibold text-slate-800 mb-3">
                      Chi tiết
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {business.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Highlights Section with Modern Cards */}
        {business.highlight && business.highlight.length > 0 && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-3xl"></div>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="relative p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Điểm nổi bật
                    </h3>
                    <p className="text-slate-600">
                      Những ưu điểm vượt trội của chúng tôi
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {business.highlight.map((highlight, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-xl transition-all duration-500 hover:scale-105"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -translate-y-8 translate-x-8"></div>
                      <div className="relative p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mt-2 flex-shrink-0 shadow-md"></div>
                          <span className="text-green-800 font-semibold leading-relaxed">
                            {highlight}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Business Information Grid with Modern Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Operating Hours */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full -translate-y-10 translate-x-10"></div>
            <CardContent className="relative p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Giờ hoạt động
                  </h3>
                  <p className="text-slate-600">Thời gian phục vụ khách hàng</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-orange-800 font-semibold">Mở cửa</span>
                  <span className="text-orange-900 font-bold text-xl">

                    {business.openTime} - {business.closeTime}
                  </span>
                </div>
              </div>

            </CardContent>
          </div>

          {/* Website */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -translate-y-10 translate-x-10"></div>
            <CardContent className="relative p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Website</h3>
                  <p className="text-slate-600">Trang web chính thức</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold transition-colors group-hover:scale-105"
                >
                  <span>{business.website}</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </CardContent>
          </div>

          {/* Location */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-10 translate-x-10"></div>
            <CardContent className="relative p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Địa chỉ</h3>
                  <p className="text-slate-600">Vị trí doanh nghiệp</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-purple-800 font-semibold">
                  {business.location}
                </p>
              </div>
            </CardContent>
          </div>

          {/* Business Type */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-200 hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full -translate-y-10 translate-x-10"></div>
            <CardContent className="relative p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  {business.types?.[0] &&
                    React.createElement(
                      getBusinessTypeIcon(business.types[0].name),
                      {
                        className: "w-8 h-8 text-white",
                      }
                    )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Loại hình
                  </h3>
                  <p className="text-slate-600">Phân loại doanh nghiệp</p>
                </div>
              </div>
              {business.types?.[0] && (
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <p className="text-indigo-800 font-semibold">
                    {business.types[0].name}
                  </p>
                  <p className="text-indigo-600 mt-2">
                    {business.types[0].description}
                  </p>
                </div>
              )}
            </CardContent>
          </div>
        </div>

        {/* Services Section with Modern Cards */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-3xl"></div>
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="relative p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Dịch vụ
                    </h3>
                    <p className="text-slate-600">
                      {services.length} dịch vụ hiện có
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setActiveTab("services")}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 hover:from-emerald-600 hover:to-teal-700 shadow-lg"
                >
                  Xem tất cả
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.slice(0, 6).map((service) => (
                  <div
                    key={service.id}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-200 hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -translate-y-6 translate-x-6"></div>
                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                            {service.name}
                          </h4>
                          <p className="text-sm text-slate-600 line-clamp-2 mt-2">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-emerald-600">
                            {formatPrice(service.price)}
                          </span>
                          {service.discount > 0 && (
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              -{service.discount}%
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section with Modern Design */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-3xl"></div>
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="relative p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Đánh giá
                    </h3>
                    <p className="text-slate-600">
                      {feedbacks.length} đánh giá từ khách hàng
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setActiveTab("reviews")}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 hover:from-amber-600 hover:to-orange-700 shadow-lg"
                >
                  Xem tất cả
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="space-y-6">
                {feedbacks.slice(0, 2).map((feedback) => (
                  <div
                    key={feedback.id}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-amber-50 border border-amber-200 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -translate-y-4 translate-x-4"></div>
                    <div className="relative p-4 md:p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img
                            src={feedback.userAvatar || "/placeholder.svg"}
                            alt={feedback.userName}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-slate-900">
                              {feedback.userName}
                            </h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < feedback.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <h5 className="font-semibold text-slate-800 mb-2">
                            {feedback.title}
                          </h5>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {feedback.content}
                          </p>
                          {/* Hiển thị hình ảnh feedback nếu có */}
                          {feedback.images && feedback.images.length > 0 && (
                            <div className="flex gap-3 mt-2">
                              {feedback.images
                                .slice(0, 3)
                                .map((image, index) => (
                                  <div
                                    key={index}
                                    className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md"
                                  >
                                    <img
                                      src={image}
                                      alt={`Review image ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              {feedback.images.length > 3 && (
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-white shadow-md flex items-center justify-center">
                                  <span className="text-sm font-bold text-amber-800">
                                    +{feedback.images.length - 3}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
     

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4 text-lg">
            {error || "Không tìm thấy thông tin business"}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Header
          title={business.name}
          description="Thông tin chi tiết và quản lý business"
          breadcrumbs={[
            { label: "Doanh Nghiệp", href: config.routes.business },
            { label: business.name },
          ]}
        />

        {business && (
          <div className="space-y-8">
            {/* Hero Section with Enhanced Design */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">
              <div className="relative h-[400px] md:h-[500px]">
                                    <img
                      src={
                        backgroundPreview ||
                        business.background ||
                        images.noImage
                      }
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                {/* Nút chỉnh sửa background */}
                <label
                  htmlFor="background-upload"
                  className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow cursor-pointer hover:bg-purple-100 transition-opacity opacity-80 hover:opacity-100 border border-purple-200 z-20"
                >
                  <Edit3 className="w-5 h-5 text-purple-600" />
                  <input
                    id="background-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundChange}
                    className="hidden"
                  />
                </label>
                {/* Nếu có file mới, hiện nút xác nhận cập nhật background */}
                {backgroundFile && (
                  <form
                    onSubmit={handleBackgroundSubmit}
                    className="absolute top-20 right-4 z-30 flex flex-col items-end gap-2"
                  >
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={editLoading}
                    >
                      {editLoading ? "Đang lưu..." : "Cập nhật nền"}
                    </Button>
                  </form>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Logo + nút chỉnh sửa logo */}
                <div className="absolute top-8 left-8 group">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white relative">
                    <img
                      src={logoPreview || business.logo || images.noImage}
                      alt={`${business.name} logo`}
                      className="w-full h-full object-cover"
                    />
                    {/* Nút chỉnh sửa logo */}
                    <label
                      htmlFor="logo-upload"
                      className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow cursor-pointer hover:bg-blue-100 transition-opacity opacity-80 group-hover:opacity-100 border border-blue-200"
                    >
                      <Edit3 className="w-5 h-5 text-blue-600" />
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {/* Nếu có file mới, hiện nút xác nhận cập nhật */}
                  {logoFile && (
                    <form
                      onSubmit={handleLogoSubmit}
                      className="flex flex-col items-center mt-2"
                    >
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                        disabled={editLoading}
                      >
                        {editLoading ? "Đang lưu..." : "Cập nhật logo"}
                      </Button>
                    </form>
                  )}
                </div>

                {/* Business Info Overlay */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-4xl font-bold mb-4">
                        {business.name}
                      </h1>
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-bold">
                            {business.avgRating}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-6 h-6 ${
                                  i < Math.floor(business.avgRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-lg opacity-90">
                            ({business.totalFeedback.toLocaleString()} đánh giá)
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5" />
                          <span className="text-lg opacity-90">
                            {business.location}
                          </span>
                        </div>

                      </div>
                    </div>

                    <div className="text-right">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <p className="text-lg opacity-90">Giá trung bình</p>
                        <p className="text-2xl font-bold">
                          {formatPrice(business.cost)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full -translate-y-6 translate-x-6"></div>
                <div className="relative">
                  <div className="text-2xl font-bold mb-2">
                    {business.totalFeedback}
                  </div>
                  <div className="text-blue-100 font-medium">Đánh giá</div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full -translate-y-6 translate-x-6"></div>
                <div className="relative">
                  <div className="text-2xl font-bold mb-2">{events.length}</div>
                  <div className="text-green-100 font-medium">Sự kiện</div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full -translate-y-6 translate-x-6"></div>
                <div className="relative">
                  <div className="text-2xl font-bold mb-2">
                    {services.length}
                  </div>
                  <div className="text-purple-100 font-medium">Dịch vụ</div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full -translate-y-6 translate-x-6"></div>
                <div className="relative">
                  <div className="text-2xl font-bold mb-2">
                    {business.images?.length || 0}
                  </div>
                  <div className="text-orange-100 font-medium">Hình ảnh</div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Business Introduction */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Info className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                          Giới thiệu
                        </h3>
                        <p className="text-slate-600">
                          Thông tin tổng quan về business
                        </p>
                      </div>
                      <div className="absolute top-10 right-8 flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="lg"
                          className={`backdrop-blur-sm ${
                            editMode 
                              ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100" 
                              : "bg-white/90 border-blue-200 text-slate-800 hover:bg-gray-50"
                          }`}
                          onClick={handleEditToggle}
                        >
                          {editMode ? (
                            <>
                              <AlertCircle className="w-5 h-5 mr-2" />
                              Thoát chỉnh sửa
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-5 h-5 mr-2" />
                              Chỉnh sửa
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {editMode ? (
                        <form onSubmit={handleProfileSubmit}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Tên doanh nghiệp
                              </label>
                              <input
                                name="name"
                                value={editProfile?.name || ""}
                                onChange={handleProfileChange}
                                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-400"
                                placeholder="Nhập tên doanh nghiệp..."
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Giới thiệu ngắn
                              </label>
                              <textarea
                                name="introduction"
                                value={editProfile?.introduction || ""}
                                onChange={handleProfileChange}
                                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-400 resize-none"
                                rows={3}
                                placeholder="Nhập giới thiệu ngắn gọn..."
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Mô tả chi tiết
                              </label>
                              <textarea
                                name="description"
                                value={editProfile?.description || ""}
                                onChange={handleProfileChange}
                                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-400 resize-none"
                                rows={4}
                                placeholder="Nhập mô tả chi tiết..."
                                required
                              />
                            </div>

                            <div className="flex justify-end gap-4">
                              <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={handleEditToggle}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold"
                              >
                                Hủy
                              </Button>
                              <Button
                                type="submit"
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                disabled={editLoading}
                              >
                                {editLoading ? "Đang lưu..." : "Lưu thay đổi"}
                              </Button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">
                              Tổng quan
                            </h4>
                            <p className="text-base text-slate-700 leading-relaxed">
                              {business.introduction}
                            </p>
                          </div>
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">
                              Chi tiết
                            </h4>
                            <p className="text-slate-600 leading-relaxed">
                              {business.description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
                {/* Highlights Section */}
                {business.hightlight && business.hightlight.length > 0 && (
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                            Điểm nổi bật
                          </h3>
                          <p className="text-slate-600">
                            Những ưu điểm vượt trội
                          </p>
                        </div>
                      </div>
                      {editMode ? (
                        <div className="space-y-3">
                          {editProfile?.highlight?.map((hl, idx) => (
                            <div key={idx} className="flex gap-3">
                              <input
                                type="text"
                                value={hl}
                                onChange={(e) =>
                                  handleHighlightChange(idx, e.target.value)
                                }
                                className="flex-1 border-2 border-green-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-green-400"
                                placeholder="Nhập điểm nổi bật..."
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveHighlight(idx)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddHighlight}
                            className="border-green-200 text-green-600 hover:bg-green-50"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm điểm nổi bật
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {business.hightlight && business.hightlight.length > 0 ? (
                            business.hightlight.map((highlight, index) => (
                              <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-xl transition-all duration-500 hover:scale-105"
                              >
                                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -translate-y-6 translate-x-6"></div>
                                <div className="relative p-4 md:p-6">
                                  <div className="flex items-start gap-3">
                                    <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mt-2 flex-shrink-0 shadow-md"></div>
                                    <span className="text-green-800 font-semibold leading-relaxed">
                                      {highlight}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-2 flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-dashed border-green-200">
                              <Award className="w-16 h-16 text-green-400 mb-4" />
                              <h3 className="text-lg font-semibold text-green-800 mb-2">
                                Chưa có điểm nổi bật
                              </h3>
                              <p className="text-green-600 text-center mb-4">
                                Thêm những điểm nổi bật để khách hàng hiểu rõ hơn về ưu điểm của bạn
                              </p>
                              <Button
                                onClick={handleAddHighlight}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm điểm nổi bật đầu tiên
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                {/* Services Section */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Users className="w-6 h-6 text-emerald-500" /> Dịch vụ
                      </h3>
                      <Button
                        onClick={openCreateService}
                        size="sm"
                        className="bg-emerald-600 text-white"
                      >
                        + Thêm dịch vụ
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.length > 0 ? (
                        services.map((service) => (
                          <div
                            key={service.id}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                {service.name}
                              </h4>
                              {service.discount > 0 && (
                                <Badge className="bg-red-100 text-red-800 border-red-200">
                                  -{service.discount}%
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-bold text-emerald-600">
                                {formatPrice(service.price)}
                              </span>
                              <span className="text-xs text-slate-500">
                                {service.duration}
                              </span>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEditService(service)}
                              >
                                <Edit3 className="w-4 h-4 mr-1" /> Sửa
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteService(service.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-1" /> Xóa
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-2 border-dashed border-emerald-200">
                          <Users className="w-16 h-16 text-emerald-400 mb-4" />
                          <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                            Chưa có dịch vụ nào
                          </h3>
                          <p className="text-emerald-600 text-center mb-4">
                            Hãy thêm dịch vụ đầu tiên để khách hàng biết đến những gì bạn cung cấp
                          </p>
                         
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Section: Sự kiện (Events) */}
                {events && (
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                          <Calendar className="w-6 h-6 text-purple-500" /> Sự
                          kiện nổi bật
                        </h3>
                        <Button
                          onClick={openCreateEvent}
                          size="sm"
                          className="bg-purple-600 text-white"
                        >
                          + Thêm sự kiện
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {events && events.length > 0 ? (
                          events.map((event) => (
                            <div
                              key={event.id}
                              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-purple-50 border border-purple-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 p-4 flex flex-col md:flex-row gap-4"
                            >
                              <img
                                src={event.image || images.noImage}
                                alt={event.name}
                                className="w-full md:w-32 h-32 object-cover rounded-xl border-2 border-purple-200 flex-shrink-0"
                              />
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors text-lg mb-1">
                                    {event.name}
                                  </h4>
                                  <p className="text-xs text-slate-500 mb-2">
                                    {event.startDate} - {event.endDate}
                                  </p>
                                  <p className="text-sm text-slate-600 line-clamp-3">
                                    {event.description}
                                  </p>
                                </div>
                                <div className="flex gap-2 mt-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEditEvent(event)}
                                  >
                                    <Edit3 className="w-4 h-4 mr-1" /> Sửa
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeleteEvent(event.id)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-1" /> Xóa
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-purple-200">
                            <Calendar className="w-16 h-16 text-purple-400 mb-4" />
                            <h3 className="text-lg font-semibold text-purple-800 mb-2">
                              Chưa có sự kiện nào
                            </h3>
                            <p className="text-purple-600 text-center mb-4">
                              Tạo sự kiện để thu hút khách hàng và tăng doanh thu
                            </p>
                            
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
                {/* Reviews Section */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                            Đánh giá
                          </h3>
                          <p className="text-slate-600">
                            {feedbacks.length} đánh giá từ khách hàng
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {feedbacks.length > 0 ? (
                        feedbacks.slice(0, 2).map((feedback) => (
                          <div
                            key={feedback.id}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-amber-50 border border-amber-200 hover:shadow-xl transition-all duration-500"
                          >
                            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -translate-y-4 translate-x-4"></div>
                            <div className="relative p-4 md:p-6">
                              <div className="flex items-start gap-4">
                                <div className="relative">
                                  <img
                                    src={
                                      feedback.userAvatar || images.noImage
                                    }
                                    alt={feedback.userName}
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                                  />
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-slate-900">
                                      {feedback.userName}
                                    </h4>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < feedback.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <h5 className="font-semibold text-slate-800 mb-2">
                                    {feedback.title}
                                  </h5>
                                  <p className="text-slate-600 leading-relaxed text-sm">
                                    {feedback.content}
                                  </p>
                                  {/* Hiển thị hình ảnh feedback nếu có */}
                                  {feedback.images &&
                                    feedback.images.length > 0 && (
                                      <div className="flex gap-3 mt-2">
                                        {feedback.images
                                          .slice(0, 3)
                                          .map((image, index) => (
                                            <div
                                              key={index}
                                              className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md"
                                            >
                                              <img
                                                src={image}
                                                alt={`Review image ${index + 1}`}
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                          ))}
                                        {feedback.images.length > 3 && (
                                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-white shadow-md flex items-center justify-center">
                                            <span className="text-sm font-bold text-amber-800">
                                              +{feedback.images.length - 3}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-dashed border-amber-200">
                          <MessageSquare className="w-16 h-16 text-amber-400 mb-4" />
                          <h3 className="text-lg font-semibold text-amber-800 mb-2">
                            Chưa có đánh giá nào
                          </h3>
                          <p className="text-amber-600 text-center mb-4">
                            Khách hàng sẽ đánh giá và chia sẻ trải nghiệm của họ tại đây
                          </p>
                          <div className="flex items-center gap-2 text-amber-600">
                            <Star className="w-5 h-5" />
                            <span className="text-sm">Chưa có đánh giá</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Right Column - Sidebar Info */}
              <div className="space-y-6">
                {/* Business Information */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Thông tin
                        </h3>
                        <p className="text-slate-600">Chi tiết business</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <div className="flex-1">
                          <p className="text-sm text-orange-600 font-medium">
                            Giờ hoạt động
                          </p>
                          <p className="text-orange-900 font-bold">
                            {editMode ? (
                              <div className="flex gap-2 mt-1">
                                <input
                                  type="time"
                                  name="openTime"
                                  value={editProfile?.openTime || ""}
                                  onChange={handleProfileChange}
                                  className="border border-orange-300 rounded-lg px-2 py-1 text-sm"
                                />
                                <span className="text-orange-600">-</span>
                                <input
                                  type="time"
                                  name="closeTime"
                                  value={editProfile?.closeTime || ""}
                                  onChange={handleProfileChange}
                                  className="border border-orange-300 rounded-lg px-2 py-1 text-sm"
                                />
                              </div>
                            ) : (
                              `${business.openTime} - ${business.closeTime}`
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm text-blue-600 font-medium">
                            Website
                          </p>
                          {editMode ? (
                            <input
                              type="text"
                              name="website"
                              value={editProfile?.website || ""}
                              onChange={handleProfileChange}
                              className="w-full border border-blue-300 rounded-lg px-2 py-1 text-sm mt-1"
                              placeholder="Nhập website..."
                            />
                          ) : (
                            <a
                              href={business.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                            >
                              {business.website}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                        <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">₫</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-orange-600 font-medium">
                            Giá trung bình
                          </p>
                          {editMode ? (
                            <input
                              name="cost"
                              value={formatPriceInput(editProfile?.cost || 0)}
                              onChange={handleProfileChange}
                              className="w-full border border-orange-300 rounded-lg px-2 py-1 text-sm mt-1"
                              placeholder="0"
                            />
                          ) : (
                            <p className="text-orange-900 font-bold">
                              {formatPrice(business.cost)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <div className="flex-1">
                          <p className="text-sm text-purple-600 font-medium">
                            Địa chỉ
                          </p>
                          <p className="text-purple-900 font-semibold">
                            {business.location}
                          </p>
                        </div>
                      </div>
                      {business.types?.[0] && (
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-xl border border-indigo-200">
                          <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                            {React.createElement(
                              getBusinessTypeIcon(business.types[0].name),
                              { className: "w-3 h-3 text-white" }
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-indigo-600 font-medium">
                              Loại hình
                            </p>
                            <p className="text-indigo-900 font-semibold">
                              {business.types[0].name}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                {/* Image Management */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            Hình ảnh
                          </h3>
                          <p className="text-slate-600">
                            {business.images?.length || 0} hình ảnh
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <label
                          htmlFor="images-upload"
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                        >
                          <Plus className="w-4 h-4 mr-2 inline" />
                          Thêm ảnh
                        </label>
                        <input
                          id="images-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImagesAdd}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Preview images to add */}
                    {imagesToAdd.length > 0 && (
                      <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-3">Ảnh sẽ thêm:</h4>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          {imagesToAdd.map((file, index) => (
                            <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <form onSubmit={handleImagesAddSubmit} className="flex gap-2">
                          <Button
                            type="submit"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={editLoading}
                          >
                            {editLoading ? "Đang thêm..." : "Xác nhận thêm"}
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setImagesToAdd([])}
                            className="border-green-200 text-green-600 hover:bg-green-50"
                          >
                            Hủy
                          </Button>
                        </form>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      {business.images && business.images.length > 0 ? (
                        business.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative group aspect-square overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300"
                          >
                            <img
                              src={image || images.noImage}
                              alt={`${business.name} - Hình ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-dashed border-green-200">
                          <Camera className="w-16 h-16 text-green-400 mb-4" />
                          <h3 className="text-lg font-semibold text-green-800 mb-2">
                            Chưa có hình ảnh nào
                          </h3>
                          <p className="text-green-600 text-center mb-4">
                            Thêm hình ảnh để khách hàng có thể thấy rõ hơn về business của bạn
                          </p>
                        </div>
                      )}
                    </div>

                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification Modal */}
      <Modal show={showModal} onClose={closeModal}>
        <div className="flex flex-col items-center gap-6">
          {/* Icon */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              modalType === "success" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {modalType === "success" ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <AlertCircle className="w-12 h-12 text-red-600" />
            )}
          </div>

          {/* Title */}
          <div className="text-center">
            <h3
              className={`text-2xl font-bold mb-2 ${
                modalType === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {modalTitle}
            </h3>
            {modalMessage && (
              <p className="text-gray-600 text-base leading-relaxed">
                {modalMessage}
              </p>
            )}
            {modalType === "success" && (
              <p className="text-sm text-gray-500 mt-2">
                Modal sẽ tự động đóng sau 3 giây
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full">
            {modalType === "success" ? (
              <>
                <Button
                  onClick={closeModal}
                  variant="outline"
                  className="flex-1 py-3 text-lg font-semibold border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Đóng
                </Button>
                <Button
                  onClick={() => {
                    closeModal();
                    // Có thể thêm logic chuyển hướng hoặc reload trang
                  }}
                  className="flex-1 py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white"
                >
                  Tiếp tục
                </Button>
              </>
            ) : (
              <Button
                onClick={closeModal}
                className="w-full py-3 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white"
              >
                Đóng
              </Button>
            )}
          </div>
        </div>
      </Modal>
      <Modal show={showEventModal} onClose={() => setShowEventModal(false)}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {eventEdit ? "Chỉnh sửa sự kiện" : "Tạo sự kiện mới"}
            </h3>
            <p className="text-slate-600 mt-2">
              {eventEdit ? "Cập nhật thông tin sự kiện" : "Tạo sự kiện mới để thu hút khách hàng"}
            </p>
          </div>

          <form onSubmit={handleEventSubmit} className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Thông tin sự kiện
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-purple-700 mb-2">
                    Tên sự kiện *
                  </label>
                  <input
                    name="name"
                    value={eventForm.name}
                    onChange={handleEventFormChange}
                    placeholder="Nhập tên sự kiện..."
                    className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-purple-700 mb-2">
                    Mô tả sự kiện *
                  </label>
                  <textarea
                    name="description"
                    value={eventForm.description}
                    onChange={handleEventFormChange}
                    placeholder="Mô tả chi tiết về sự kiện, chương trình khuyến mãi..."
                    rows={4}
                    className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Thời gian diễn ra */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Thời gian diễn ra
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2">
                    Ngày bắt đầu *
                  </label>
                  <input
                    name="startDate"
                    value={eventForm.startDate}
                    onChange={handleEventFormChange}
                    type="date"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    required
                  />
                  <p className="text-xs text-blue-600 mt-1">Chọn ngày bắt đầu sự kiện</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2">
                    Ngày kết thúc *
                  </label>
                  <input
                    name="endDate"
                    value={eventForm.endDate}
                    onChange={handleEventFormChange}
                    type="date"
                    min={eventForm.startDate}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    required
                  />
                  <p className="text-xs text-blue-600 mt-1">Chọn ngày kết thúc sự kiện</p>
                </div>
              </div>
            </div>

            {/* Hình ảnh sự kiện */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Hình ảnh sự kiện
              </h4>
              
              <div>
                <label className="block text-sm font-semibold text-green-700 mb-2">
                  Ảnh đại diện sự kiện
                </label>
                <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors">
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleEventFormChange}
                    className="hidden"
                    id="event-image-upload"
                  />
                  <label htmlFor="event-image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Camera className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-green-800 font-semibold">Chọn hình ảnh</p>
                        <p className="text-sm text-green-600">PNG, JPG hoặc JPEG (tối đa 5MB)</p>
                      </div>
                    </div>
                  </label>
                </div>
                {eventForm.image && (
                  <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm font-semibold text-green-800 mb-2">Ảnh đã chọn:</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={URL.createObjectURL(eventForm.image)}
                        alt="Preview"
                        className="w-16 h-16 rounded-lg object-cover border border-green-200"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">{eventForm.image.name}</p>
                        <p className="text-xs text-green-600">
                          {(eventForm.image.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setEventForm(prev => ({ ...prev, image: null }))}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEventModal(false)}
                className="flex-1 py-3 text-lg font-semibold border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={eventLoading}
                className="flex-1 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {eventLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang lưu...
                  </div>
                ) : (
                  eventEdit ? "Cập nhật sự kiện" : "Tạo sự kiện mới"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal show={showServiceModal} onClose={() => setShowServiceModal(false)}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {serviceEdit ? "Chỉnh sửa dịch vụ" : "Tạo dịch vụ mới"}
            </h3>
            <p className="text-slate-600 mt-2">
              {serviceEdit ? "Cập nhật thông tin dịch vụ" : "Thêm dịch vụ mới cho business"}
            </p>
          </div>

          <form onSubmit={handleServiceSubmit} className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <h4 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Thông tin cơ bản
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-emerald-700 mb-2">
                    Tên dịch vụ *
                  </label>
                  <input
                    name="name"
                    value={serviceForm.name}
                    onChange={handleServiceFormChange}
                    placeholder="Nhập tên dịch vụ..."
                    className="w-full border-2 border-emerald-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-700 mb-2">
                    Mô tả dịch vụ *
                  </label>
                  <textarea
                    name="description"
                    value={serviceForm.description}
                    onChange={handleServiceFormChange}
                    placeholder="Mô tả chi tiết về dịch vụ..."
                    rows={3}
                    className="w-full border-2 border-emerald-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Giá cả và khuyến mãi */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
              <h4 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">₫</span>
                </div>
                Giá cả và khuyến mãi
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-orange-700 mb-2">
                    Giá dịch vụ (VNĐ) *
                  </label>
                  <input
                    name="price"
                    value={formatPriceInput(serviceForm.price)}
                    onChange={(e) => {
                      const numericValue = parsePriceInput(e.target.value);
                      setServiceForm(prev => ({ ...prev, price: numericValue }));
                    }}
                    placeholder="0"
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-orange-700 mb-2">
                    Giảm giá (%)
                  </label>
                  <input
                    name="discount"
                    value={serviceForm.discount}
                    onChange={handleServiceFormChange}
                    type="number"
                    step="0.1"
                    min="0"
                    max="9.9"
                    placeholder="0.0"
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                  />
                  <p className="text-xs text-orange-600 mt-1">Cho phép số thập phân, tối đa 9.9% (ví dụ: 5.5%)</p>
                </div>
              </div>
            </div>

            {/* Thời gian và điều kiện */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Thời gian và điều kiện
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2">
                    Thời lượng dịch vụ *
                  </label>
                  <input
                    name="duration"
                    value={serviceForm.duration}
                    onChange={handleServiceFormChange}
                    type="time"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    required
                  />
                  <p className="text-xs text-blue-600 mt-1">Chọn thời gian thực hiện dịch vụ</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2">
                    Bao gồm
                  </label>
                  <textarea
                    name="inclusions"
                    value={serviceForm.inclusions}
                    onChange={handleServiceFormChange}
                    placeholder="Những gì được bao gồm trong dịch vụ..."
                    rows={2}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2">
                    Không bao gồm
                  </label>
                  <textarea
                    name="exclustions"
                    value={serviceForm.exclustions}
                    onChange={handleServiceFormChange}
                    placeholder="Những gì không được bao gồm..."
                    rows={2}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2">
                    Điều kiện áp dụng
                  </label>
                  <textarea
                    name="condition"
                    value={serviceForm.condition}
                    onChange={handleServiceFormChange}
                    placeholder="Các điều kiện và lưu ý khi sử dụng dịch vụ..."
                    rows={2}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Trạng thái */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Trạng thái dịch vụ
              </h4>
              
              <label className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-purple-200 hover:bg-white/80 transition-colors cursor-pointer">
                <input
                  name="availability"
                  type="checkbox"
                  checked={serviceForm.availability}
                  onChange={handleServiceFormChange}
                  className="w-5 h-5 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                />
                <div>
                  <span className="font-semibold text-purple-800">Dịch vụ có sẵn</span>
                  <p className="text-sm text-purple-600">Khách hàng có thể đặt dịch vụ này</p>
                </div>
              </label>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowServiceModal(false)}
                className="flex-1 py-3 text-lg font-semibold border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={serviceLoading}
                className="flex-1 py-3 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {serviceLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang lưu...
                  </div>
                ) : (
                  serviceEdit ? "Cập nhật dịch vụ" : "Tạo dịch vụ mới"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

    </div>
  );
};

export default BusinessOverview;
