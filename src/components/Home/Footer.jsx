
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react"
import images from "../../assets/images"

const Footer = () => (
  <footer className=" py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        {/* Company Info */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <img src={images.logo} alt="LocalExplorer Logo" className="w-20 h-20 rounded-lg" />
            <div>
              <h3 className="font-bold text-xl">LocalExplorer</h3>
              <p className="text-sm text-gray-400">Discover Vietnam</p>
            </div>
          </div>
          <p className="text-gray-500 mb-6 max-w-md">
            Vietnam's leading local discovery platform connecting travelers with authentic experiences and empowering
            local businesses to reach new customers.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>District 9, Ho Chi Minh City, Vietnam</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>hello@localexplorer.vn</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+84 123 456 789</span>
            </div>
          </div>
        </div>

        {/* For Travelers */}
        <div>
          <h4 className="font-semibold text-lg mb-4">For Travelers</h4>
          <ul className="space-y-2 text-gray-500">
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Download App
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Top Destinations
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Travel Guides
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* For Businesses */}
        <div>
          <h4 className="font-semibold text-lg mb-4">For Businesses</h4>
          <ul className="space-y-2 text-gray-500">
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Register Business
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Business Login
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Partner Benefits
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Success Stories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500 transition-colors">
                Business Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* App Download Section */}
      <div className="bg-gray-100 rounded-2xl p-8 mb-8">
        <div className="text-center">
          <h4 className="text-2xl font-bold mb-4">Get the LocalExplorer App</h4>
          <p className="text-gray-600 mb-6">Download now and start discovering Vietnam's hidden gems</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
              Download for iOS
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Download for Android
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
        <div className="text-gray-600 text-sm mb-4 md:mb-0">© 2025 LocalExplorer. All rights reserved.</div>

        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
