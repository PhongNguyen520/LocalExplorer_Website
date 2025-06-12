"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, RefreshCw, DollarSign, TrendingUp, CreditCard } from "lucide-react"

const TransactionsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const transactions = [
    {
      id: "TXN-001234",
      user: "Nguyen Van A",
      business: "Saigon Food Tours",
      amount: "$125.00",
      status: "completed",
      method: "Credit Card",
      date: "2024-03-15 14:30",
      commission: "$12.50",
    },
    {
      id: "TXN-001235",
      user: "Tran Thi B",
      business: "Mekong Delta Adventures",
      amount: "$89.00",
      status: "completed",
      method: "PayPal",
      date: "2024-03-15 12:15",
      commission: "$8.90",
    },
    {
      id: "TXN-001236",
      user: "Le Van C",
      business: "Da Nang Beach Resort",
      amount: "$250.00",
      status: "pending",
      method: "Bank Transfer",
      date: "2024-03-15 10:45",
      commission: "$25.00",
    },
    {
      id: "TXN-001237",
      user: "Pham Thi D",
      business: "Hanoi Street Art Gallery",
      amount: "$45.00",
      status: "failed",
      method: "Credit Card",
      date: "2024-03-15 09:20",
      commission: "$0.00",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Monitor and manage all platform transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-green-600">+15.3%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">$89,432</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-green-600">+8.7%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">2,847</div>
          <div className="text-sm text-gray-600">Total Transactions</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-green-600">+12.1%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">$8,943</div>
          <div className="text-sm text-gray-600">Commission Earned</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-sm text-red-600">+2.3%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">45</div>
          <div className="text-sm text-gray-600">Failed Transactions</div>
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
                placeholder="Search transactions..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Transaction ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Business</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Method</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-mono text-sm text-gray-900">{transaction.id}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{transaction.user}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{transaction.business}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-900">{transaction.amount}</div>
                      <div className="text-sm text-gray-500">Commission: {transaction.commission}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{transaction.method}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{transaction.date}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <RefreshCw className="w-4 h-4" />
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
            <div className="text-sm text-gray-600">Showing 1 to 4 of 2,847 results</div>
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

export default TransactionsManagement
