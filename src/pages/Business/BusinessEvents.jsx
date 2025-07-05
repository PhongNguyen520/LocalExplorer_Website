import { useParams } from "react-router-dom"
import { PlusCircle, Edit3, Trash2 } from 'lucide-react'
import Header from "../../components/Business/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Business/ui/Card"
import Button from "../../components/Business/ui/Button"
import Badge from "../../components/Business/ui/Badge"
import { format, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { createEventApi, updateEventApi, deleteEventApi } from '../../api/business/EventAPI';


// Mock data
const mockEvents = [
  {
    id: "1",
    businessId: "1",
    name: "Khuyến mãi cuối tuần",
    description: "Giảm giá 20% tất cả món ăn vào cuối tuần",
    startDate: "2024-06-01",
    endDate: "2024-06-02",
    ticketPrice: 0,
    status: "active",
    createdAt: "2024-05-25T10:00:00Z",
  },
  {
    id: "2",
    businessId: "1",
    name: "Lễ hội ẩm thực",
    description: "Giới thiệu món ăn mới và văn hóa ẩm thực Việt Nam",
    startDate: "2024-06-15",
    endDate: "2024-06-15",
    ticketPrice: 100000,
    status: "draft",
    createdAt: "2024-05-20T14:30:00Z",
  },
  {
    id: "3",
    businessId: "1",
    name: "Đêm nhạc acoustic",
    description: "Thưởng thức âm nhạc trong không gian ấm cúng",
    startDate: "2024-05-20",
    endDate: "2024-05-20",
    ticketPrice: 150000,
    status: "ended",
    createdAt: "2024-05-10T09:15:00Z",
  },

  {
    id: "4",
    businessId: "1",
    name: "Đêm nhạc acoustic",
    description: "Thưởng thức âm nhạc trong không gian ấm cúng",
    startDate: "2024-05-20",
    endDate: "2024-05-20",
    ticketPrice: 150000,
    status: "ended",
    createdAt: "2024-05-10T09:15:00Z",
  },

  {
    id: "5",
    businessId: "1",
    name: "Đêm nhạc acoustic",
    description: "Thưởng thức âm nhạc trong không gian ấm cúng",
    startDate: "2024-05-20",
    endDate: "2024-05-20",
    ticketPrice: 150000,
    status: "ended",
    createdAt: "2024-05-10T09:15:00Z",
  },
]

const BusinessEvents = ({value = []}) => {
console.log("value", value);

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "success"
      case "draft":
        return "warning"
      case "ended":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang diễn ra"
      case "draft":
        return "Nháp"
      case "ended":
        return "Đã kết thúc"
      default:
        return status
    }
  }

  const formatDate = (dateString) => {
    try {
      // Handle DD-MM-YYYY format from API
      if (dateString && dateString.includes('-')) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
          // If it's DD-MM-YYYY format
          if (parts[0].length === 2 && parts[1].length === 2) {
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            const date = parse(`${day}-${month}-${year}`, 'dd-MM-yyyy', new Date());
            return format(date, "d 'tháng' M, yyyy", { locale: vi });
          }
          // If it's YYYY-MM-DD format
          else if (parts[0].length === 4) {
            const date = new Date(dateString);
            return format(date, "d 'tháng' M, yyyy", { locale: vi });
          }
        }
      }
      // Fallback to standard date parsing
      const date = new Date(dateString);
      return format(date, "d 'tháng' M, yyyy", { locale: vi });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return dateString; // Return original string if parsing fails
    }
  }


  return (
    <div >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {value && value.map((event) => (
          <Card key={event.id}>
            <div className="flex justify-between items-center mb-4">
               <img src={event.image} alt="" className="w-full h-60 rounded-md" />
            </div>
          
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  <CardDescription className="mt-1">{event.description}</CardDescription>
                </div>
                <Badge variant={getStatusVariant(event.status)}>{getStatusText(event.status)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Ngày bắt đầu:</p>
                  <p className="font-medium">{formatDate(event.startDate)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Ngày kết thúc:</p>
                  <p className="font-medium">{formatDate(event.endDate)}</p>

                </div>
                {/* <div>
                  <p className="text-gray-600">Giá vé:</p>
                  <p className="font-medium">
                    {event.ticketPrice === 0 ? "Miễn phí" : `${event.ticketPrice} VNĐ`}
                  </p>
                </div> */}
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BusinessEvents
