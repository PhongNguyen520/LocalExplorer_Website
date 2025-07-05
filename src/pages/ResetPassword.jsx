import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { resetPasswordApi } from "../api/auth";
import config from "../config";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";

// Hàm lấy giá trị param mà không decode
function getRawParam(param, rawQuery) {
  const match = rawQuery.match(new RegExp(`[?&]${param}=([^&]*)`));
  return match ? match[1] : "";
}

const ResetPassword = () => {
  const location = useLocation();
  const rawQuery = location.search;
  const email = getRawParam("Email", rawQuery);
  const token = getRawParam("Token", rawQuery);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!newPassword || newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setLoading(true);
    try {
      await resetPasswordApi({ token, email, newPassword });
      setMessage("Đặt lại mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới.");
      setNewPassword("");
      setConfirmPassword("");
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
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center mb-6 shadow-lg">
          <Lock className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-purple-700 mb-2 text-center drop-shadow-sm">
          Đặt lại mật khẩu
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Nhập mật khẩu mới cho tài khoản <span className="font-semibold text-blue-700">{decodeURIComponent(email)}</span>
        </p>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <input
            name="newPassword"
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-base transition"
            required
            minLength={6}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-base transition"
            required
            minLength={6}
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
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200 mt-2"
            disabled={loading}
          >
            {loading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
          </button>
        </form>
        <Link
          to={config.routes.login}
          className="mt-8 text-purple-600 hover:underline font-semibold text-sm transition"
        >
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword; 