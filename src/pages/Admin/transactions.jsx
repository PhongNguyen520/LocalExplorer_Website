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
    <div>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsArr.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>{stat.change}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            )
          })}
        </div>
        <CardContent>
          <div className="rounded-md border mt-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã GD</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thời gian thanh toán</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Tiền tệ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.orderCode}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={transaction.avatar || defaultAvatar} alt={transaction.userName} className="w-8 h-8 rounded-full object-cover border" />
                        <span>{transaction.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{formatCurrency(transaction.amount, transaction.currency)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.status === "Completed" ? "default" : transaction.status === "Pending" ? "outline" : "destructive"}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(transaction.paidAt)}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.currency || "VND"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm" disabled={pageIndex === 1} onClick={() => setPageIndex(pageIndex - 1)}>
              Previous
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button key={i} variant={pageIndex === i + 1 ? 'default' : 'outline'} size="sm" onClick={() => setPageIndex(i + 1)}>{i + 1}</Button>
            ))}
            <Button variant="outline" size="sm" disabled={pageIndex === totalPages} onClick={() => setPageIndex(pageIndex + 1)}>
              Next
            </Button>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPageIndex(1); }} className="ml-4 border rounded px-2 py-1">
              {[10, 20, 50].map(size => <option key={size} value={size}>{size}/trang</option>)}
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
