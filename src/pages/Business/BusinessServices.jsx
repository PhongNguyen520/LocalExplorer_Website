import { useParams } from "react-router-dom"
import Header from "../../components/Business/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Business/ui/Card"
import Badge from "../../components/Business/ui/Badge"
import { PlusCircle, Edit3, Trash2, Clock } from 'lucide-react'
import Button from "../../components/Business/ui/Button"


const BusinessServices = ({value = []}) => {
console.log("value", value);

  return (
    <div >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {value && value.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="max-w-[70%]">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="mt-1">{service.description}</CardDescription>
                </div>
                <Badge variant={service.status === "True" ? "success" : "secondary"}>
                  {service.status === "True" ? "Hoạt động" : "Tạm dừng"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Giá:</span>
                  <div className="text-right">
                    {service.discount > 0 ? (
                      <div>
                        <span className="text-sm line-through text-gray-500">{service.price.toLocaleString()} VNĐ</span>
                        <div className="font-medium text-green-600">
                          {(service.price * (1 - service.discount / 100)).toLocaleString()} VNĐ
                        </div>
                      </div>
                    ) : (
                      <span className="font-medium">{service.price.toLocaleString()} VNĐ</span>
                    )}
                  </div>
                </div>

                {service.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{service.duration} phút</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trạng thái:</span>
                  <Badge variant={service.availability ? "success" : "error"}>
                    {service.availability ? "Có sẵn" : "Hết hàng"}
                  </Badge>
                </div>

                {service.inclusions && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Bao gồm:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {/* {service.inclusions.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))} */}

                      {service.inclusions}
                    </ul>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Sửa
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BusinessServices
