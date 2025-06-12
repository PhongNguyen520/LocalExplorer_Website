"use client"

import { useState } from "react"
import { Bell, Send, AlertTriangle, CheckCircle, Plus } from "lucide-react"

const NotificationsManagement = () => {
  const [activeTab, setActiveTab] = useState("send")

  const notifications = [
    {
      id: 1,
      title: "System Maintenance Scheduled",
      message: "Platform will be under maintenance on March 20th from 2:00 AM to 4:00 AM",
      type: "system",
      recipients: "all_users",
      status: "sent",
      sentDate: "2024-03-15 10:00",
      readCount: 15420,
    },
    {
      id: 2,
      title: "New Business Partner Program",
      message: "Introducing enhanced benefits for our business partners",
      type: "promotion",
      recipients: "businesses",
      status: "scheduled",
      sentDate: "2024-03-16 09:00",
      readCount: 0,
    },
    {
      id: 3,
      title: "App Update Available",
      message: "New features and improvements are now available",
      type: "update",
      recipients: "app_users",
      status: "sent",
      sentDate: "2024-03-14 14:30",
      readCount: 8934,
    },
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case "system":
        return "bg-blue-100 text-blue-800"
      case "promotion":
        return "bg-green-100 text-green-800"
      case "update":
        return "bg-orange-100 text-orange-800"
      case "alert":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Send and manage platform notifications</p>
        </div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          <span>Create Notification</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-green-600">+12 today</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">1,247</div>
          <div className="text-sm text-gray-600">Total Sent</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-green-600">89.2%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">24,354</div>
          <div className="text-sm text-gray-600">Total Delivered</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-blue-600">67.3%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">16,398</div>
          <div className="text-sm text-gray-600">Read Rate</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-sm text-yellow-600">3 pending</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600">Scheduled</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("send")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "send"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Send Notification
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "history"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Notification History
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "templates"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Templates
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "send" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
                  <input
                    type="text"
                    placeholder="Enter notification title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="system">System</option>
                    <option value="promotion">Promotion</option>
                    <option value="update">Update</option>
                    <option value="alert">Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Enter your notification message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="all_users">All Users</option>
                    <option value="app_users">App Users Only</option>
                    <option value="businesses">Business Partners</option>
                    <option value="active_users">Active Users</option>
                    <option value="new_users">New Users</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Send Time</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="now">Send Now</option>
                    <option value="schedule">Schedule for Later</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                  Send Notification
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Save as Draft
                </button>
                <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                  Preview
                </button>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notification.type)}`}
                      >
                        {notification.type}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}
                      >
                        {notification.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{notification.sentDate}</div>
                  </div>
                  <p className="text-gray-600 mb-3">{notification.message}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>Recipients: {notification.recipients.replace("_", " ")}</div>
                    <div>Read by {notification.readCount.toLocaleString()} users</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "templates" && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Templates</h3>
              <p className="text-gray-600 mb-6">Create and manage reusable notification templates</p>
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                Create Template
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsManagement
