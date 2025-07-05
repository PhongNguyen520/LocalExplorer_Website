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
  console.log("Auth context:", auth);
  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("API URL:", process.env.REACT_APP_URL_API);
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

      // Start notification hub after successful login
      startNotificationHub(data.accessToken, (message) => {
        console.log("New notification received:", message);
        // You can add a toast notification here
      });

    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setError(err.response.data.message);
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

    }
    console.log("Login form submitted:", form);
    setLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex overflow-hidden">
        <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center p-8">
          <img
            src={images.hero}
            alt="login"
            className="max-h-96 object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <div className="flex flex-col items-center mb-8">
            <img src={images.logo} alt="logo" className="w-20 h-20" />
            <h2 className="text-2xl font-bold text-center mb-2">

              Đừng chỉ tưởng tượng về thiên đường,
              hãy trải nghiệm nó!
            </h2>
            <p className="text-gray-500 text-center mb-4">
              Chúng tôi sẽ giúp bạn lên kế hoạch cho chuyến đi trong mơ của mình.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-orange-500" /> Nhớ tôi
              </label>
              <Link
                to={config.routes.forgotPassword}
                className="text-orange-500 hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition"
              disabled={loading}
            >
              {loading ? "Đăng nhập..." : "Đăng nhập"}
            </button>
            {/* <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition"
              onClick={handleGoogleLogin}
            >
              <img src={images.map} alt="Google" className="h-5 w-5" />
              Đăng nhập với Google
            </button> */}
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
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
  );
};

export default Login;
