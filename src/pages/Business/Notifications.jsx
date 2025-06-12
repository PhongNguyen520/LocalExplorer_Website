import { MessageSquare, Calendar, TrendingUp, AlertCircle } from 'lucide-react'
import Header from '../../components/Business/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Business/ui/Card'
import Badge from '../../components/Business/ui/Badge'
import { getListNotificationApi } from '../../api/business/NotificationAPI'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import { startNotificationHub } from '../../hubs/notificationHub'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const { accessToken } = useContext(AuthContext)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getListNotificationApi()
        if (response.data?.data?.items) {
          setNotifications(response.data.data.items)
        }
      } catch (error) {
        console.error('Error fetching notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
 
  }, [])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'system':
        return AlertCircle
      case 'payment':
        return TrendingUp
      case 'business':
        return MessageSquare
      default:
        return AlertCircle
    }
  }

  const getNotificationStyle = (type) => {
    switch (type?.toLowerCase()) {
      case 'system':
        return "bg-red-100 text-red-600"
      case 'payment':
        return "bg-green-100 text-green-600"
      case 'business':
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="p-6">
      <Header
        title="Thông báo"
        description={`Bạn có ${unreadCount} thông báo chưa đọc`}
        breadcrumbs={[{ label: "Thông báo" }]}
      />

      {loading ? (
        <Card className="mt-6">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Đang tải thông báo...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 mt-6">
          {notifications.map((notification) => {
            const IconComponent = getNotificationIcon(notification.relateName)
            return (
              <Card key={notification.id} className={`${!notification.isRead ? "border-blue-200 bg-blue-50" : ""}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getNotificationStyle(notification.relateName)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {notification.relateName} • {new Date(notification.createdAt).toLocaleDateString("vi-VN")}
                        </CardDescription>
                      </div>
                    </div>
                    {!notification.isRead && <Badge variant="default">Mới</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{notification.content}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {!loading && notifications.length === 0 && (
        <Card className="mt-6">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Bạn chưa có thông báo nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Notifications
