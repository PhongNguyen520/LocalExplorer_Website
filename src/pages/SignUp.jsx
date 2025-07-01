import { useState } from "react"
import { Link } from "react-router-dom"
import { Building2, Users, MapPin, Smartphone, CheckCircle, ArrowRight, Eye, EyeOff } from "lucide-react"
import images from "../assets/images"
import { registerApi } from "../api/auth"

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  dob: "",
  gender: "Male",
  role: "Business",
}

const SignUp = () => {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const res = await registerApi(form);
      console.log("Registration response:", res.data);
      
      setSuccess("Đăng ký thành công! Kiểm tra email và xác minh tài khoản.")
      setForm(initialForm)
    } catch (err) {
      console.log("Registration error:", err.response.data.message);
      setError(`${err.response.data.message || "Please try again later."}`)
    }
    setLoading(false)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
             <Link to="/" className="flex items-center space-x-3">
              <img
                src={images.logo}
                alt="LocalExplore Logo"
                className="w-20 h-20 rounded-lg object-cover"/>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LocalExplorer</h1>
                <p className="text-xs text-gray-500">Cổng thông tin đối tác kinh doanh</p>
              </div>
              </Link>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
              <Smartphone className="w-3 h-3 mr-1" />
              Travelers: Download our app
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 mb-4">
                <Building2 className="w-3 h-3 mr-1" />
                Business Registration
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tham Gia Mạng Lưới Đối Tác Kinh Doanh Của Chúng Tôi</h2>
              <p className="text-xm text-gray-600 mb-6">
                Kết nối với du khách và phát triển doanh nghiệp của bạn trên nền tảng khám phá địa phương hàng đầu Việt Nam.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tiếp Cận Nhiều Khách Hàng Hơn</h3>
                  <p className="text-gray-600">
                    Để du khách tìm thấy bạn trong hàng nghìn lượt tìm kiếm trải nghiệm địa phương chân thật tại khu vực của bạn.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Giới Thiệu Doanh Nghiệp Của Bạn</h3>
                  <p className="text-gray-600">
                    Tạo hồ sơ chi tiết với hình ảnh, dịch vụ và lịch trình để thu hút đúng đối tượng khách hàng.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quản Lý Dễ Dàng</h3>
                  <p className="text-gray-600">
                    Theo dõi, cập nhật lịch trình và giao tiếp với khách hàng thông qua bảng điều khiển trực quan.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Dành Cho Du Khách</h4>
              </div>
              <p className="text-blue-800 mb-4">
                Hãy tải ứng dụng di động của chúng tôi để khám phá một cách trọn vẹn nhất!
              </p>
              <button className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                Tải ứng dụng ngay
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="text-center px-6 pt-8 pb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tạo Tài Khoản Doanh Nghiệp</h3>
                <p className="text-gray-600">Tham gia mạng lưới đối tác địa phương uy tín của chúng tôi</p>
              </div>

              <div className="px-6 pb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">

                     <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Họ
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Tên
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      />
                    </div>
                   
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                       Email (Doanh Nghiệp)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="business@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Số Điện Thoại
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="0 xxx xxx xxx"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                        Ngày Sinh
                      </label>
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mật Khẩu
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-600">Gồm 8 ký tự trở lên, chữ hoa (A-Z), chữ thường (a-z), số (0-9) và ký tự đặc biệt (!@#$%^&*)</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Giới Tính</label>
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={form.gender === "Male"}
                          onChange={handleChange}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700">Nam</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={form.gender === "Female"}
                          onChange={handleChange}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700">Nữ</span>
                      </label>
                    </div>
                  </div>

                  <input type="hidden" name="role" value="Business" />

                  <div className="border-t border-gray-200 pt-4">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Tạo Tài Khoản
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-600">{success}</p>
                    </div>
                  )}
                </form>

                <div className="text-center pt-6 border-t border-gray-200 mt-6">
                  <p className="text-sm text-gray-600">
                    Bạn đã có tài khoản doanh nghiệp?{" "}
                    <Link
                      to="/login"
                      className="text-orange-600 font-semibold hover:text-orange-700 hover:underline transition-colors"
                    >
                      Đăng Nhập Ngay
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
