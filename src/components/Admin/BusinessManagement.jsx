"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Eye, Building2, Download, CheckCircle, XCircle } from "lucide-react"

const BusinessManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const businesses = [
    {
      id: 1,
      name: "Saigon Food Tours",
      owner: "Nguyen Van Minh",
      email: "contact@saigonfoodtours.com",
      phone: "+84 123 456 789",
      category: "Food & Dining",
      status: "approved",
      joinDate: "2024-01-15",
      totalBookings: 245,
      revenue: "$12,450",
      rating: 4.8,
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Mekong Delta Adventures",
      owner: "Tran Thi Lan",
      email: "info@mekongadventures.com",
      phone: "+84 987 654 321",
      category: "Tours & Activities",
      status: "approved",
      joinDate: "2024-02-20",
      totalBookings: 189,
      revenue: "$8,920",
      rating: 4.9,
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Hanoi Street Art Gallery",
      owner: "Le Van Duc",
      email: "gallery@hanoiart.com",
      phone: "+84 555 666 777",
      category: "Arts & Culture",
      status: "pending",
      joinDate: "2024-03-01",
      totalBookings: 0,
      revenue: "$0",
      rating: 0,
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Da Nang Beach Resort",
      owner: "Pham Thi Mai",
      email: "booking@danangresort.com",
      phone: "+84 111 222 333",
      category: "Accommodation",
      status: "suspended",
      joinDate: "2024-01-10",
      totalBookings: 67,
      revenue: "$3,240",
      rating: 4.2,
      logo: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Management</h1>
          <p className="text-gray-600">Manage and monitor all partner businesses</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
            <Building2 className="w-4 h-4" />
            <span>Add Business</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-2xl font-bold text-gray-900">1,234</div>
          <div className="text-sm text-gray-600">Total Businesses</div>
          <div className="text-sm text-green-600 mt-1">+8.2% from last month</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-2xl font-bold text-gray-900">1,156</div>
          <div className="text-sm text-gray-600">Approved</div>
          <div className="text-sm text-green-600 mt-1">+5.1% from last month</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-2xl font-bold text-gray-900">45</div>
          <div className="text-sm text-gray-600">Pending Review</div>
          <div className="text-sm text-yellow-600 mt-1">+12 new applications</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-2xl font-bold text-gray-900">33</div>
          <div className="text-sm text-gray-600">Suspended</div>
          <div className="text-sm text-red-600 mt-1">+3 this week</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option value="all">All Categories</option>
              <option value="food">Food & Dining</option>
              <option value="tours">Tours & Activities</option>
              <option value="accommodation">Accommodation</option>
              <option value="arts">Arts & Culture</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Business Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Business</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Owner</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Performance</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {businesses.map((business) => (
                <tr key={business.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={business.logo || "/placeholder.svg"}
                        alt={business.name}
                        className="w-10 h-10 rounded-lg bg-gray-200"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{business.name}</div>
                        <div className="text-sm text-gray-500">{business.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-gray-900">{business.owner}</div>
                      <div className="text-sm text-gray-500">{business.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{business.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(business.status)}`}
                    >
                      {business.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-gray-900">{business.totalBookings} bookings</div>
                      <div className="text-sm text-gray-500">{business.revenue} revenue</div>
                      {business.rating > 0 && <div className="text-sm text-yellow-600">★ {business.rating}</div>}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing 1 to 4 of 1,234 results</div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">Previous</button>
              <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">2</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">3</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessManagement
