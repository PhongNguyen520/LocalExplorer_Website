import { useParams } from "react-router-dom"
import Header from "../../components/Business/Header"
import { Card, CardContent} from "../../components/Business/ui/Card"
import { Upload, Camera, Eye, Edit3, Trash2 } from 'lucide-react'
import Button from "../../components/Business/ui/Button"

// Mock data
const mockImages = [
  { id: "1", imageUrl: "/placeholder.svg?height=200&width=300", title: "Không gian nhà hàng", type: "gallery" },
  { id: "2", imageUrl: "/placeholder.svg?height=200&width=300", title: "Món ăn đặc sản", type: "menu" },
  { id: "3", imageUrl: "/placeholder.svg?height=200&width=300", title: "Đội ngũ nhân viên", type: "gallery" },
  { id: "4", imageUrl: "/placeholder.svg?height=200&width=300", title: "Bên ngoài cửa hàng", type: "cover" },
  { id: "5", imageUrl: "/placeholder.svg?height=200&width=300", title: "Khu vực VIP", type: "gallery" },
  { id: "6", imageUrl: "/placeholder.svg?height=200&width=300", title: "Menu đặc biệt", type: "menu" },
]

const BusinessImages = () => {
  const { businessId } = useParams()

  const getTypeText = (type) => {
    switch (type) {
      case "logo":
        return "Logo"
      case "cover":
        return "Ảnh bìa"
      case "gallery":
        return "Thư viện"
      case "menu":
        return "Menu"
      default:
        return type
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "logo":
        return "bg-blue-100 text-blue-800"
      case "cover":
        return "bg-green-100 text-green-800"
      case "gallery":
        return "bg-purple-100 text-purple-800"
      case "menu":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <Header
        title="Quản lý Hình ảnh"
        description="Upload và quản lý hình ảnh cho business của bạn"
        breadcrumbs={[
          { label: "Businesses", href: "/businesses" },
          { label: "Nhà hàng Hương Việt", href: `/business/${businessId}` },
          { label: "Hình ảnh" },
        ]}
        actions={
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Tải lên hình ảnh
          </Button>
        }
      />

      {/* Images Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {mockImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              <img
                src={image.imageUrl || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(image.type)}`}>
                  {getTypeText(image.type)}
                </span>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900 mb-3">{image.title}</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-1 h-4 w-4" />
                  Xem
                </Button>
                <Button variant="outline" size="sm">
                  <Edit3 className="mr-1 h-4 w-4" />
                  Sửa
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="mr-1 h-4 w-4" />
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Area */}
      <Card className="mt-6">
        <CardContent className="p-8">
          <div className="text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Thêm hình ảnh mới</h4>
            <p className="text-gray-600 mb-4">Kéo thả hoặc click để tải lên hình ảnh</p>
            <Button>Chọn file</Button>
            <p className="text-xs text-gray-500 mt-2">Hỗ trợ: JPG, PNG, GIF (tối đa 5MB)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BusinessImages
