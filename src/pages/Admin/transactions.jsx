import { useState, useEffect } from "react"
import { getAdminTransactionsApi } from "../../api/admin/transactions"
import { CreditCard, DollarSign, RefreshCw, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Admin/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/Admin/ui/table"
import { Button } from "../../components/Admin/ui/button"
import { Input } from "../../components/Admin/ui/input"
import { Badge } from "../../components/Admin/ui/badge"

const defaultAvatar = "https://png.pngtree.com/png-vector/20220628/ourmid/pngtree-user-profile-avatar-vector-admin-png-image_5289693.png"

function formatCurrency(amount, currency) {
  if (amount == null) return "-";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: currency || "VND" }).format(amount)
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return "-";
  return d.toLocaleString("vi-VN");
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ cartOne: {}, cartTwo: {}, cartThree: {}, cartFour: {} })
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    getAdminTransactionsApi({ PageIndex: pageIndex, PageSize: pageSize })
      .then(res => {
        const data = res.data.data
        setStats(data.stats)
        setTransactions(data.transactions.items)
        setTotalPages(data.transactions.totalPages)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [pageIndex, pageSize])

  const statsArr = [
    {
      title: "Tổng giao dịch",
      value: stats.cartOne.value || 0,
      icon: DollarSign,
      color: "green",
      change: stats.cartOne.change,
      trend: stats.cartOne.trend,
    },
    {
      title: "Giao dịch thất bại",
      value: stats.cartTwo.value || 0,
      icon: RefreshCw,
      color: "red",
      change: stats.cartTwo.change,
      trend: stats.cartTwo.trend,
    },
    {
      title: "Giao dịch hoàn tiền",
      value: stats.cartThree.value || 0,
      icon: TrendingUp,
      color: "orange",
      change: stats.cartThree.change,
      trend: stats.cartThree.trend,
    },
    {
      title: "Giao dịch thành công",
      value: stats.cartFour.value || 0,
      icon: CreditCard,
      color: "blue",
      change: stats.cartFour.change,
      trend: stats.cartFour.trend,
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Quản lý giao dịch</h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">Theo dõi và quản lý tất cả giao dịch trong hệ thống</p>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {statsArr.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-600`} />
                    </div>
                    <div className={`text-xs sm:text-sm ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>{stat.change}</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
                </div>
              )
            })}
          </div>
          
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Mã GD</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell">Người dùng</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Mô tả</TableHead>
                  <TableHead className="text-xs sm:text-sm">Số tiền</TableHead>
                  <TableHead className="text-xs sm:text-sm">Trạng thái</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Thời gian thanh toán</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell">Loại</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Tiền tệ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium text-xs sm:text-sm">
                      <div className="min-w-0">
                        <div className="truncate">{transaction.orderCode}</div>
                        <div className="text-xs text-slate-500 md:hidden">
                          {transaction.userName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <img src={transaction.avatar || defaultAvatar} alt={transaction.userName} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border" />
                        <span className="text-xs sm:text-sm truncate">{transaction.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs sm:text-sm">
                      <div className="max-w-xs truncate">{transaction.description}</div>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm font-medium">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.status === "Completed" ? "default" : transaction.status === "Pending" ? "outline" : "destructive"}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs sm:text-sm">
                      {formatDate(transaction.paidAt)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                      {transaction.type}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs sm:text-sm">
                      {transaction.currency || "VND"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2 py-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled={pageIndex === 1} onClick={() => setPageIndex(pageIndex - 1)} className="text-xs">
                Trước
              </Button>
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button 
                      key={i} 
                      variant={pageIndex === pageNum ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setPageIndex(pageNum)}
                      className="text-xs w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <span className="text-xs text-slate-500 px-2">...</span>
                )}
              </div>
              <Button variant="outline" size="sm" disabled={pageIndex === totalPages} onClick={() => setPageIndex(pageIndex + 1)} className="text-xs">
                Sau
              </Button>
            </div>
            <select 
              value={pageSize} 
              onChange={e => { setPageSize(Number(e.target.value)); setPageIndex(1); }} 
              className="border rounded px-2 py-1 text-xs sm:text-sm"
            >
              {[10, 20, 50].map(size => <option key={size} value={size}>{size}/trang</option>)}
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
