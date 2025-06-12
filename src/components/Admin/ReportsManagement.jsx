"use client"

import { useState } from "react"
import { Search, Filter, Eye, MessageSquare, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react"

const ReportsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const reports = [
    {
      id: "RPT-001",
      reporter: "Nguyen Van A",
      reportedUser: "Tran Thi B",
      reportedBusiness: "Saigon Food Tours",
      type: "Inappropriate Content",
      status: "pending",
      priority: "high",
      description: "User posted inappropriate photos in review",
      date: "2024-03-15 14:30",
      category: "content",
    },
    {
      id: "RPT-002",
      reporter: "Le Van C",
      reportedUser: null,
      reportedBusiness: "Fake Tour Company",
      type: "Fraudulent Business",
      status: "investigating",
      priority: "critical",
      description: "Business is not operating at listed address",
      date: "2024-03-15 12:15",
      category: "fraud",
    },
    {
      id: "RPT-003",
      reporter: "Pham Thi D",
      reportedUser: "Hoang Van E",
      reportedBusiness: null,
      type: "Harassment",
      status: "resolved",
      priority: "medium",
      description: "User sending inappropriate messages",
      date: "2024-03-14 16:45",
      category: "behavior",
    },
    {
      id: "RPT-004",
      reporter: "Vo Thi F",
      reportedUser: null,
      reportedBusiness: "Overpriced Restaurant",
      type: "Pricing Issues",
      status: "dismissed",
      priority: "low",
      description: "Prices higher than advertised",
      date: "2024-03-14 10:20",
      category: "pricing",
    },
  ]

  const getStatusColor = (status ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "investigating":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "dismissed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports Management</h1>
          <p className="text-gray-600">Review and manage user reports and complaints</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Export Reports
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
            Generate Summary
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-sm text-yellow-600">+5 today</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">23</div>
          <div className="text-sm text-gray-600">Pending Reports</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-blue-600">+8 today</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-600">Under Investigation</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-green-600">+15 this week</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">156</div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-sm text-red-600">3 critical</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600">High Priority</div>
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
                placeholder="Search reports..."
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
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option value="all">All Types</option>
              <option value="content">Inappropriate Content</option>
              <option value="fraud">Fraud</option>
              <option value="behavior">Harassment</option>
              <option value="pricing">Pricing Issues</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Report ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Reporter</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Reported</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Type</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Priority</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-mono text-sm text-gray-900">{report.id}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{report.reporter}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      {report.reportedUser && <div className="text-gray-900">User: {report.reportedUser}</div>}
                      {report.reportedBusiness && (
                        <div className="text-gray-900">Business: {report.reportedBusiness}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{report.type}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}
                    >
                      {report.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{report.date}</div>
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
                        <MessageSquare className="w-4 h-4" />
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
            <div className="text-sm text-gray-600">Showing 1 to 4 of 199 results</div>
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

export default ReportsManagement
