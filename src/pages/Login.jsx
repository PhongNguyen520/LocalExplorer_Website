import React, { useContext, useState } from "react";
import images from "../assets/images";
import config from "../config";
import { Link } from "react-router-dom";
import { loginApi, getGoogleLoginUrlApi } from "../api/auth";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../providers/AuthProvider";
import { startNotificationHub } from "../hubs/notificationHub";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginApi(form);
      const data = res.data.data;

      Cookies.set("access_token", data.accessToken, {
        expires: 1/96, // 15 minutes
      });

      // Lưu refresh token
      if (data.refreshToken) {
        Cookies.set("refresh_token", data.refreshToken, {
          expires: 7,
        });
      }


      let token = Cookies.get("access_token");
      const decodedToken = jwtDecode(token);

      setAuth({
        isLoggedIn: true,
        userId: decodedToken.nameid,
        roleName: decodedToken.role,
        email: decodedToken.email,
        avatar: decodedToken.Avatar,
        fullName: decodedToken.unique_name,
      });

      startNotificationHub(data.accessToken, (message) => {
      });

    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setError(err.response.data.message);
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-50 items-center justify-center p-6 sm:p-8">
          <img
            src={images.hero}
            alt="login"
            className="max-h-80 sm:max-h-96 object-contain"
          />
        </div>
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-8">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <img src={images.logo} alt="logo" className="w-16 h-16 sm:w-20 sm:h-20" />
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 mt-4">
              Đừng chỉ tưởng tượng về thiên đường,
              hãy trải nghiệm nó!
            </h2>
            <p className="text-gray-500 text-center mb-4 text-sm sm:text-base">
              Chúng tôi sẽ giúp bạn lên kế hoạch cho chuyến đi trong mơ của mình.
            </p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm sm:text-base"
                required
              />
            </div>
            
            <div className="space-y-2">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm sm:text-base"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-orange-500 w-4 h-4" /> 
                <span>Nhớ tôi</span>
              </label>
              <Link
                to={config.routes.forgotPassword}
                className="text-orange-500 hover:underline font-medium"
              >
                Quên mật khẩu?
              </Link>
            </div>
            
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Đăng nhập...
                </div>
              ) : (
                "Đăng nhập"
              )}
            </button>
            
            {/* Google Login Button (commented out) */}
            {/* <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
              onClick={handleGoogleLogin}
            >
              <img src={images.map} alt="Google" className="h-4 w-4 sm:h-5 sm:w-5" />
              Đăng nhập với Google
            </button> */}
          </form>
          
          <div className="text-center text-xs sm:text-sm text-gray-500 mt-6">
            <p>
              Bạn chưa có tài khoản?{" "}
              <Link
                to={config.routes.register}
                className="text-orange-600 font-semibold hover:underline"
              >
                Đăng ký!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
