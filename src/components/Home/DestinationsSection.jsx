import { Utensils, Mountain, Landmark, PartyPopper, Hotel, Compass, Camera, ShoppingBag } from "lucide-react"
import images from "../../assets/images"

const experiences = [
  {
    key: "food",
    title: "Ẩm thực",
    description: "Khám phá tinh hoa ẩm thực Việt Nam từ đường phố đến nhà hàng sang trọng.",
    icon: Utensils,
    image: images.amthuc,
    color: "bg-pink-100 text-pink-700",
  },
  {
    key: "nature",
    title: "Thiên nhiên",
    description: "Chinh phục núi rừng, biển đảo và những kỳ quan thiên nhiên tuyệt đẹp.",
    icon: Mountain,
    image: images.thiennhien,
    color: "bg-green-100 text-green-700",
  },
  {
    key: "culture",
    title: "Văn hóa",
    description: "Trải nghiệm lễ hội, di tích lịch sử và nét đẹp truyền thống khắp ba miền.",
    icon: Landmark,
    image: images.vanhoa,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    key: "festival",
    title: "Lễ hội",
    description: "Hòa mình vào không khí sôi động của các lễ hội đặc sắc quanh năm.",
    icon: PartyPopper,
    image: images.lehoi,
    color: "bg-orange-100 text-orange-700",
  },
  {
    key: "resort",
    title: "Nghỉ dưỡng",
    description: "Thư giãn tại resort ven biển, homestay giữa thiên nhiên hoặc khách sạn sang trọng, tận hưởng dịch vụ đẳng cấp và không gian yên bình.",
    icon: Hotel,
    image: images.nghiduong,
    color: "bg-blue-100 text-blue-700",
  },
  {
    key: "adventure",
    title: "Phiêu lưu",
    description: "Khám phá cảm giác mạnh với trekking, leo núi, lặn biển, dù lượn, zipline và những hành trình đầy thử thách.",
    icon: Compass,
    image: images.phieuluu,
    color: "bg-purple-100 text-purple-700",
  },
  {
    key: "checkin",
    title: "Check-in sống ảo",
    description: "Săn lùng các địa điểm hot trend, background độc đáo, góc chụp đẹp để lưu giữ khoảnh khắc và chia sẻ trên mạng xã hội.",
    icon: Camera,
    image: images.checkin,
    color: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    key: "shopping",
    title: "Mua sắm",
    description: "Thỏa sức mua sắm tại chợ truyền thống, trung tâm thương mại, phố đi bộ, lựa chọn đặc sản và quà lưu niệm độc đáo.",
    icon: ShoppingBag,
    image: images.muasam,
    color: "bg-emerald-100 text-emerald-700",
  },
]

const DestinationsSection = () => (
  <section id="experiences" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium mb-4">
          <Compass className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Khám phá trải nghiệm nổi bật
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Khơi nguồn cảm hứng cho chuyến đi của bạn</h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Lựa chọn trải nghiệm phù hợp với sở thích, phong cách và khám phá Việt Nam theo cách riêng của bạn.
        </p>
      </div>
      {/* Grid 2 hàng 4 cột trên desktop, 4 hàng 2 cột trên tablet, 8 hàng 1 cột trên mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((exp) => {
          const Icon = exp.icon
          return (
            <div
              key={exp.key}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col items-stretch h-[340px] sm:h-[360px] lg:h-[380px]"
            >
              <div className="relative" style={{height: '220px'}}>
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover object-center rounded-t-xl"
                  style={{height: '220px', minHeight: '220px', maxHeight: '240px'}}
                />
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${exp.color} shadow-sm flex items-center gap-1`}>
                  <Icon className="w-4 h-4 mr-1" />
                  {exp.title}
                </div>
              </div>
              <div className="flex-1 flex flex-col p-3">
                <h2 className="font-bold text-base text-gray-900 mb-1">{exp.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2 flex-1">{exp.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

export default DestinationsSection
