import { Smartphone, Building2, MapPin, Star, Users, Calendar, Shield, Zap } from "lucide-react"

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
          <Zap className="w-4 h-4 mr-2" />
          What We Offer
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Two Platforms, One Vision</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting travelers with authentic local experiences through our mobile app, while empowering businesses to
          reach new customers through our web platform.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* For Travelers */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">For Travelers</h3>
              <p className="text-blue-600 font-medium">Mobile App Experience</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Discover Hidden Gems</h4>
                <p className="text-gray-600 text-sm">
                  Find authentic local experiences and off-the-beaten-path destinations
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Smart Itinerary Planning</h4>
                <p className="text-gray-600 text-sm">
                  AI-powered recommendations based on your preferences and location
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Verified Reviews</h4>
                <p className="text-gray-600 text-sm">
                  Real reviews from fellow travelers to help you make informed decisions
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-200">
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Download Mobile App
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8 border border-orange-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">For Businesses</h3>
              <p className="text-orange-600 font-medium">Web Platform Management</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Reach More Customers</h4>
                <p className="text-gray-600 text-sm">
                  Connect with thousands of travelers looking for authentic experiences
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Easy Management</h4>
                <p className="text-gray-600 text-sm">Manage bookings, update availability, and track performance</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Zap className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Boost Revenue</h4>
                <p className="text-gray-600 text-sm">
                  Increase visibility and attract more customers to grow your business
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-orange-200">
            <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Register Your Business
            </button>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Local Discovery</h4>
          <p className="text-gray-600 text-sm">Find unique local experiences and hidden gems</p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Smart Planning</h4>
          <p className="text-gray-600 text-sm">AI-powered itinerary suggestions</p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-orange-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
          <p className="text-gray-600 text-sm">Connect with fellow travelers and locals</p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Trusted</h4>
          <p className="text-gray-600 text-sm">Verified businesses and authentic reviews</p>
        </div>
      </div>
    </div>
  </section>
)

export default FeaturesSection
