import { MapPin, Plus, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Admin/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Admin/ui/table";
import { Button } from "../../components/Admin/ui/button";
import { Input } from "../../components/Admin/ui/input";
import CountUp from "react-countup";
import { Badge } from "../../components/Admin/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/Admin/ui/select";
import { useState, useEffect } from "react";

const mockLocations = [
  {
    id: 1,
    countryName: "Vietnam",
    countryCode: "VN",
    provinceName: "Hà Nội",
    provinceCode: "01",
    districtName: "Hoàn Kiếm",
    districtCode: "001",
    wardName: "Hàng Đào",
    wardCode: "00001",
    addressDetail: "36 Hàng Đào",
    latitude: 21.033,
    longitude: 105.85,
    status: "active",
    businessId: 24,
    lastUpdatedBy: "admin",
    deletedBy: null,
    createdTime: "2024-01-01T10:00:00",
    lastUpdatedTime: "2024-01-10T10:00:00",
    deletedTime: null,
  },
  {
    id: 2,
    countryName: "Vietnam",
    countryCode: "VN",
    provinceName: "Hồ Chí Minh",
    provinceCode: "79",
    districtName: "Quận 1",
    districtCode: "760",
    wardName: "Bến Nghé",
    wardCode: "26734",
    addressDetail: "23 Lê Lợi",
    latitude: 10.776,
    longitude: 106.7,
    status: "inactive",
    businessId: 32,
    lastUpdatedBy: "mod1",
    deletedBy: null,
    createdTime: "2024-01-02T11:00:00",
    lastUpdatedTime: "2024-01-12T09:00:00",
    deletedTime: null,
  },
];

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLocations(mockLocations);
      setLoading(false);
    }, 500);
  }, []);

  const filteredLocations = locations.filter((loc) => {
    const matchesSearch =
      loc.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.provinceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.districtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.wardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.addressDetail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || loc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statsArr = [
    {
      title: "Tổng địa điểm",
      value: locations.length,
      color: "blue",
    },
    {
      title: "Đang hoạt động",
      value: locations.filter((l) => l.status === "active").length,
      color: "emerald",
    },
    {
      title: "Đã xóa",
      value: locations.filter((l) => l.deletedTime).length,
      color: "red",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500 text-white",
      emerald: "bg-emerald-500 text-white",
      red: "bg-red-500 text-white",
    };
    return colors[color] || colors.blue;
  };

  const getColorBg = (color) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200",
      emerald: "bg-emerald-50 border-emerald-200",
      red: "bg-red-50 border-red-200",
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Hoạt động", color: "bg-emerald-100 text-emerald-800" },
      inactive: { label: "Tạm dừng", color: "bg-red-100 text-red-800" },
      deleted: { label: "Đã xóa", color: "bg-gray-100 text-gray-800" },
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Quản lý Địa điểm</h1>
          <p className="text-blue-500 mt-1">Quản lý tất cả địa điểm trong hệ thống</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Thêm địa điểm
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsArr.map((stat, idx) => (
          <Card key={idx} className={`border-0 shadow-lg ${getColorBg(stat.color)} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColorClasses(stat.color)} shadow-lg`}>
                  {/* Icon can be added here if needed */}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">
                  <CountUp end={stat.value} duration={1.2} separator="," />
                </h3>
                <p className="text-blue-700 text-sm font-medium mb-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-10">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm địa điểm..."
                  className="w-80 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue placeholder="Lọc theo trạng thái">Tất cả trạng thái</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Tạm dừng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Danh sách Địa điểm</CardTitle>
          <CardDescription>
            Hiển thị {filteredLocations.length} trên tổng số {locations.length} địa điểm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quốc gia</TableHead>
                  <TableHead>Mã QG</TableHead>
                  <TableHead>Tỉnh/TP</TableHead>
                  <TableHead>Mã Tỉnh</TableHead>
                  <TableHead>Quận/Huyện</TableHead>
                  <TableHead>Mã Quận</TableHead>
                  <TableHead>Phường/Xã</TableHead>
                  <TableHead>Mã Phường</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Vĩ độ</TableHead>
                  <TableHead>Kinh độ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((loc) => (
                  <TableRow key={loc.id}>
                    <TableCell>{loc.countryName}</TableCell>
                    <TableCell>{loc.countryCode}</TableCell>
                    <TableCell>{loc.provinceName}</TableCell>
                    <TableCell>{loc.provinceCode}</TableCell>
                    <TableCell>{loc.districtName}</TableCell>
                    <TableCell>{loc.districtCode}</TableCell>
                    <TableCell>{loc.wardName}</TableCell>
                    <TableCell>{loc.wardCode}</TableCell>
                    <TableCell>{loc.addressDetail}</TableCell>
                    <TableCell>{loc.latitude}</TableCell>
                    <TableCell>{loc.longitude}</TableCell>
                    <TableCell>{getStatusBadge(loc.status)}</TableCell>
                    <TableCell>{loc.createdTime ? new Date(loc.createdTime).toLocaleDateString("vi-VN") : '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Sửa
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
