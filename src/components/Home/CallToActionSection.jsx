import { Smartphone, Download, ArrowRight } from "lucide-react"

const CallToActionSection = () => (
  <section className="py-20 bg-gradient-to-r from-blue-50  relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10">
      <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
    </div>

    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
        <Smartphone className="w-4 h-4 mr-2" />
        Start Your Adventure Today
      </div>

      <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Discover Vietnam's Hidden Treasures?</h2>

      <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
        Download our app and join thousands of travelers who have discovered authentic local experiences across Vietnam.
        Your next adventure is just a tap away.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <button className="flex items-center bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors min-w-[200px]">
          <Download className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="text-xs opacity-75">Download on the</div>
            <div className="text-sm font-bold">IOS Device</div>
          </div>
        </button>

        <button className="flex items-center bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors min-w-[200px]">
          <Download className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="text-xs opacity-75">Get it on</div>
            <div className="text-sm font-bold">Android Device</div>
          </div>
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm opacity-75 mb-4">Or scan QR code with your phone camera</p>
        <div className="inline-block bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-xs">QR Code</span>
          </div>
        </div>
      </div>

      
    </div>
  </section>
)

export default CallToActionSection
