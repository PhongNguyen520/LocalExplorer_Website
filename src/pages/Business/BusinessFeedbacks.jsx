import { useParams } from "react-router-dom";
import { Star, MessageSquare } from "lucide-react";
import Header from "../../components/Business/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Business/ui/Card";
import Badge from "../../components/Business/ui/Badge";
import Button from "../../components/Business/ui/Button";

// Mock data
const mockFeedbacks = [
  {
    id: "1",
    businessId: "1",
    userId: "1",
    title: "Dịch vụ tuyệt vời!",
    content:
      "Tôi rất hài lòng với chất lượng món ăn và dịch vụ của nhà hàng. Nhân viên rất thân thiện và chu đáo.",
    rating: 5,
    response:
      "Cảm ơn bạn đã ủng hộ! Chúng tôi sẽ tiếp tục cải thiện để phục vụ bạn tốt hơn.",
    status: "replied",
    customerName: "Nguyễn Văn A",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    businessId: "1",
    userId: "2",
    title: "Cần cải thiện thời gian phục vụ",
    content:
      "Món ăn ngon nhưng thời gian chờ hơi lâu, mong nhà hàng cải thiện.",
    rating: 3,
    response: null,
    status: "pending",
    customerName: "Trần Thị B",
    createdAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "3",
    businessId: "1",
    userId: "3",
    title: "Rất tuyệt vời!",
    content: "Không gian đẹp, món ăn ngon, giá cả hợp lý. Sẽ quay lại lần sau.",
    rating: 5,
    response: "Cảm ơn bạn rất nhiều! Chúng tôi luôn chào đón bạn quay lại.",
    status: "replied",
    customerName: "Lê Văn C",
    createdAt: "2024-01-13T09:20:00Z",
  },
];

const BusinessFeedbacks = ({ value = [] }) => {
  console.log("value", value);

  const avgRating = 4.8;
  const totalFeedbacks = value.length;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6 mt-6">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-500 h-5 w-5" />
          <span className="font-bold text-xl">{avgRating}</span>
          <span className="text-gray-600">({totalFeedbacks} đánh giá)</span>
        </div>
      </div>

      {/* Feedbacks List */}
      <div className="space-y-4">
        {value &&
          value.map((feedback) => (
            <Card key={feedback.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{feedback.title}</CardTitle>
                    <CardDescription>
                      Bởi {feedback.userName ?? "Anonimous"} •{" "}
                      {new Date(feedback.createdAt).toLocaleDateString("vi-VN")}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-1">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {feedback.rating}/5
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      feedback.status === "replied" ? "success" : "warning"
                    }
                  >
                    {feedback.status === "replied"
                      ? "Đã phản hồi"
                      : "Chờ phản hồi"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-h-48 overflow-hidden">
                  {feedback.images && feedback.images.length > 0 && (
                    <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-hide">
                      {feedback.images.map((image, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 relative group rounded-lg overflow-hidden"
                          style={{ width: "120px", height: "120px" }}
                        >
                          <img
                            src={image}
                            alt={`Feedback ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Hiệu ứng phóng to khi hover */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm mb-4">{feedback.content}</p>

                {feedback.response ? (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Phản hồi của bạn:
                    </p>
                    <p className="text-sm text-blue-800">{feedback.response}</p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Trả lời feedback
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default BusinessFeedbacks;
