import { Users, Building2, CreditCard, TrendingUp, ArrowUp, ArrowDown, Eye, Download, Star, MapPin } from "lucide-react"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "52,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Businesses",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Building2,
      color: "green",
    },
    {
      title: "Monthly Revenue",
      value: "$89,432",
      change: "+15.3%",
      trend: "up",
      icon: CreditCard,
      color: "orange",
    },
    {
      title: "App Downloads",
      value: "25,891",
      change: "-2.1%",
      trend: "down",
      icon: Download,
      color: "purple",
    },
  ]

  const recentActivities = [
    { id: 1, type: "user", message: "New user registered: Nguyen Van A", time: "2 minutes ago" },
    { id: 2, type: "business", message: "Business approved: Saigon Food Tours", time: "15 minutes ago" },
    { id: 3, type: "transaction", message: "Payment completed: $125.00", time: "1 hour ago" },
    { id: 4, type: "report", message: "New report submitted for review", time: "2 hours ago" },
    { id: 5, type: "user", message: "User verification completed", time: "3 hours ago" },
  ]

  const topDestinations = [
    { name: "Ho Chi Minh City", bookings: 1247, rating: 4.8 },
    { name: "Hanoi Old Quarter", bookings: 986, rating: 4.9 },
    { name: "Hoi An Ancient Town", bookings: 743, rating: 4.7 },
    { name: "Da Nang Beaches", bookings: 521, rating: 4.6 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Export Data
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === "blue"
                      ? "bg-blue-100"
                      : stat.color === "green"
                        ? "bg-green-100"
                        : stat.color === "orange"
                          ? "bg-orange-100"
                          : "bg-purple-100"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      stat.color === "blue"
                        ? "text-blue-600"
                        : stat.color === "green"
                          ? "text-green-600"
                          : stat.color === "orange"
                            ? "text-orange-600"
                            : "text-purple-600"
                    }`}
                  />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span className="font-medium">{stat.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-lg">7 Days</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">30 Days</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">90 Days</button>
            </div>
          </div>

          {/* Simple Chart Placeholder */}
          <div className="h-64 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <p className="text-gray-600">Revenue chart visualization</p>
              <p className="text-sm text-gray-500">Integration with chart library needed</p>
            </div>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Destinations</h2>
          <div className="space-y-4">
            {topDestinations.map((destination, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{destination.name}</p>
                    <p className="text-sm text-gray-500">{destination.bookings} bookings</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
          <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">View All</button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.type === "user"
                    ? "bg-blue-500"
                    : activity.type === "business"
                      ? "bg-green-500"
                      : activity.type === "transaction"
                        ? "bg-orange-500"
                        : "bg-red-500"
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard