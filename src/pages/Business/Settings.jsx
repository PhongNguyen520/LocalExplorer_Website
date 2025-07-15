import React, { useEffect, useState, useRef, useContext } from 'react';
import { Save, Upload, Eye, EyeOff, User, Shield, Settings as SettingsIcon, Camera } from 'lucide-react';
import Header from '../../components/Business/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Business/ui/Card';
import Button from '../../components/Business/ui/Button';
import { getProfileApi, updateProfileApi, changePasswordApi } from '../../api/user';
import { notification, Divider, Badge } from 'antd';
import { AuthContext } from '../../providers/AuthProvider';

const genderOptions = [
  { label: 'Nam', value: 'Male' },
  { label: 'Nữ', value: 'Female' },
  { label: 'Khác', value: 'Other' },
];

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    avatar: null,
    phoneNumber: '',
    email: '',
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef();
  const { setAuth, auth } = useContext(AuthContext);

  useEffect(() => {
    setLoadingProfile(true);
    getProfileApi()
      .then(res => {
        const data = res.data.data;
        setProfile({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          dob: data.dob ? data.dob.split('-').reverse().join('-') : '', // convert dd-mm-yyyy to yyyy-mm-dd
          gender: data.gender || '',
          avatar: data.avatar,
          phoneNumber: data.phoneNumber || '',
          email: data.email || '',
        });
        setAvatarPreview(data.avatar);
      })
      .catch(() => notification.error({ message: 'Không thể tải thông tin cá nhân' }))
      .finally(() => setLoadingProfile(false));
  }, []);

  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      setProfile(prev => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async e => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (key === 'dob' && value) {
          // convert yyyy-mm-dd to dd-mm-yyyy
          const [y, m, d] = value.split('-');
          formData.append('DOB', `${d}-${m}-${y}`);
        } else if (key === 'avatar' && value instanceof File) {
          formData.append('Avatar', value);
        } else if (key === 'avatar') {
          // skip if not file
        } else {
          formData.append(
            key.charAt(0).toUpperCase() + key.slice(1),
            value || ''
          );
        }
      });
      await updateProfileApi(formData);
      // Lấy lại profile mới nhất để cập nhật avatar và tên
      const res = await getProfileApi();
      const data = res.data.data;
      setAuth(prev => ({
        ...prev,
        avatar: data.avatar,
        fullName: (data.firstName || '') + ' ' + (data.lastName || ''),
      }));
      notification.success({ 
        message: 'Thành công!', 
        description: 'Thông tin cá nhân đã được cập nhật',
        placement: 'topRight'
      });
    } catch (err) {
      notification.error({ 
        message: 'Lỗi!', 
        description: 'Không thể cập nhật thông tin',
        placement: 'topRight'
      });
    }
    setLoadingUpdate(false);
  };

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    setLoadingPassword(true);
    setPasswordError("");
    setPasswordSuccess("");
    try {
      await changePasswordApi(passwordForm);
      setPasswordSuccess("Đổi mật khẩu thành công!");
      notification.success({ 
        message: 'Thành công!', 
        description: 'Mật khẩu đã được thay đổi',
        placement: 'topRight'
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      setPasswordError(err?.response?.data?.message || "Không thể thay đổi mật khẩu");
      notification.error({ 
        message: 'Lỗi!', 
        description: err?.response?.data?.message || 'Không thể thay đổi mật khẩu',
        placement: 'topRight'
      });
    }
    setLoadingPassword(false);
  };

  const tabs = [
    { key: 'profile', label: 'Thông tin cá nhân', icon: User },
    { key: 'security', label: 'Bảo mật', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="md:p-8">
        <Header
          title="Cài đặt tài khoản"
          description="Quản lý thông tin cá nhân và bảo mật tài khoản"
          breadcrumbs={[{ label: 'Cài đặt' }]}
        />

        {/* Tab Navigation */}
        <div className="mt-8 mb-6">
          <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm border">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Thông tin cá nhân</CardTitle>
                  <CardDescription className="text-gray-600">Cập nhật thông tin tài khoản của bạn</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-8" onSubmit={handleProfileSubmit}>
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <User className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                      onClick={() => fileInputRef.current.click()}
                      title="Đổi ảnh đại diện"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">Ảnh đại diện</p>
                    <p className="text-xs text-gray-500">JPG, PNG hoặc GIF. Tối đa 2MB</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Họ</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Nhập họ của bạn"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Tên</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Nhập tên của bạn"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Ngày sinh</label>
                    <input
                      type="date"
                      name="dob"
                      value={profile.dob}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Giới tính</label>
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    >
                      <option value="">Chọn giới tính</option>
                      {genderOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed"
                        disabled
                      />
                      <Badge 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        status="success" 
                        text="Đã xác thực"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Email không thể thay đổi sau khi đăng ký</p>
                  </div>
                </div>

                <Divider />

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={loadingUpdate || loadingProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {loadingUpdate ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Bảo mật tài khoản</CardTitle>
                  <CardDescription className="text-gray-600">Thay đổi mật khẩu và bảo vệ tài khoản</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handlePasswordSubmit}>
                <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Đổi mật khẩu</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Mật khẩu hiện tại</label>
                      <div className="relative">
                        <input
                          type={showPassword.current ? 'text' : 'password'}
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="Nhập mật khẩu hiện tại"
                          required
                        />
                        <button 
                          type="button" 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                          onClick={() => setShowPassword(p => ({ ...p, current: !p.current }))}
                        >
                          {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Mật khẩu mới</label>
                      <div className="relative">
                        <input
                          type={showPassword.new ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="Nhập mật khẩu mới"
                          required
                        />
                        <button 
                          type="button" 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                          onClick={() => setShowPassword(p => ({ ...p, new: !p.new }))}
                        >
                          {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Xác nhận mật khẩu mới</label>
                      <div className="relative">
                        <input
                          type={showPassword.confirm ? 'text' : 'password'}
                          name="confirmNewPassword"
                          value={passwordForm.confirmNewPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="Nhập lại mật khẩu mới"
                          required
                        />
                        <button 
                          type="button" 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                          onClick={() => setShowPassword(p => ({ ...p, confirm: !p.confirm }))}
                        >
                          {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Lưu ý bảo mật:</h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Mật khẩu phải có ít nhất 8 ký tự</li>
                      <li>• Bao gồm chữ hoa, chữ thường và số</li>
                      <li>• Không sử dụng thông tin cá nhân</li>
                    </ul>
                  </div>
                </div>

                {passwordSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md mb-2">
                    <p className="text-sm text-green-700 font-semibold">{passwordSuccess}</p>
                  </div>
                )}
                {passwordError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-2">
                    <p className="text-sm text-red-600">{passwordError}</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={loadingPassword}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loadingPassword ? 'Đang đổi...' : 'Đổi mật khẩu'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;
