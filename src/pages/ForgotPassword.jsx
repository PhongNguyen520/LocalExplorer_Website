import React, { useState } from "react";
import { forgotPasswordApi } from "../api/auth";
import { Link } from "react-router-dom";
import config from "../config";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await forgotPasswordApi(email);
      setMessage("Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi!");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-white py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-6 shadow-lg">
          <Mail className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow-sm">
          Quên mật khẩu?
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.<br/>
          Chúng tôi sẽ gửi liên kết đặt lại nếu email hợp lệ.
        </p>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition"
            required
          />
          {message && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
              <CheckCircle className="w-5 h-5" />
              {message}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200 mt-2"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi hướng dẫn"}
          </button>
        </form>
        <Link
          to={config.routes.login}
          className="mt-8 text-blue-600 hover:underline font-semibold text-sm transition"
        >
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword; 