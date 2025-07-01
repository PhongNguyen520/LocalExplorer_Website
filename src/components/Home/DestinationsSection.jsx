import { MapPin, Star, Clock, ArrowRight } from "lucide-react"
import images from "../../assets/images"

const destinations = [
  {
    id: 1,
    name: "Ho Chi Minh City",
    description: "Vibrant street food, historic landmarks, and bustling markets",
    image: "/placeholder.svg?height=300&width=400",
    experiences: 245,
    rating: 4.8,
    duration: "2-3 days",
    featured: true,
  },
  {
    id: 2,
    name: "Hanoi Old Quarter",
    description: "Ancient streets, traditional architecture, and local culture",
    image: "/placeholder.svg?height=300&width=400",
    experiences: 189,
    rating: 4.9,
    duration: "1-2 days",
    featured: true,
  },
  {
    id: 3,
    name: "Hoi An Ancient Town",
    description: "UNESCO heritage site with lantern-lit streets and tailors",
    image: "/placeholder.svg?height=300&width=400",
    experiences: 156,
    rating: 4.7,
    duration: "2-3 days",
    featured: false,
  },
  {
    id: 4,
    name: "Da Nang Beaches",
    description: "Beautiful coastline, modern bridges, and beachfront dining",
    image: "/placeholder.svg?height=300&width=400",
    experiences: 98,
    rating: 4.6,
    duration: "1-2 days",
    featured: false,
  },
]

const DestinationsSection = () => (
  <section id="destinations" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          Điểm đến hàng đầu
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Khám phá những điều tuyệt vời nhất của Việt Nam</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Khám phá những điểm đến và trải nghiệm phổ biến nhất được tuyển chọn bởi các chuyên gia địa phương và du khách đồng hành của chúng tôi.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="relative">
              <img
                src={images.place1 || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {destination.featured && (
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Nổi bật
                </div>
              )}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-medium">{destination.rating}</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{destination.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{destination.experiences} người</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{destination.duration}</span>
                </div>
              </div>

              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-pink-500 hover:text-white transition-colors duration-200 group">
                Khám phá ứng dụng
                <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      {/* <div className="text-center">
        <p className="text-gray-600 mb-6">Ready to explore these amazing destinations?</p>
        <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
          Download App to Start Exploring
        </button>
      </div> */}
    </div>
  </section>
)

export default DestinationsSection
