import { Building2, TrendingUp, Users, Star, ArrowRight, CheckCircle } from "lucide-react"
import images from "../../assets/images"

const BusinessSection = () => (
  <section id="business" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            <Building2 className="w-4 h-4 mr-2" />
            For Business Partners
          </div>

          <h2 className="text-4xl font-bold text-gray-900">
            Grow Your Business with
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              {" "}
              LocalExplorer
            </span>
          </h2>

          <p className="text-xl text-gray-600">
            Join Vietnam's leading local discovery platform and connect with thousands of travelers looking for
            authentic experiences in your area.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Increase Visibility</h4>
                <p className="text-gray-600">Get discovered by travelers actively searching for local experiences</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Easy Management</h4>
                <p className="text-gray-600">Manage bookings, availability, and customer communications in one place</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Boost Revenue</h4>
                <p className="text-gray-600">Reach new customers and increase your booking rates</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-pink-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Register Your Business
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content - Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-20 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform Statistics</h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Travelers</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">1K+</div>
                <div className="text-sm text-gray-600">Partner Businesses</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">85%</div>
                <div className="text-sm text-gray-600">Revenue Increase</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <img src={images.avatar} alt="Business owner" className="w-12 h-12 rounded-full" />
              <div>
                <h4 className="font-semibold text-gray-900">Minh Nguyen</h4>
                <p className="text-sm text-gray-600">Saigon Food Tours</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Since joining LocalExplorer, our bookings increased by 200%. The platform makes it easy to reach
              travelers who are genuinely interested in authentic local experiences."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default BusinessSection
