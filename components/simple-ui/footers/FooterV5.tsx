import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
const FooterV5: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">ShopCo</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium quality products delivered worldwide. Your satisfaction is
              our priority.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
              Shop
            </h4>
            <ul className="space-y-2">
              {[
                "New Arrivals",
                "Best Sellers",
                "Sale",
                "Gift Cards",
                "Collections",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
              Support
            </h4>
            <ul className="space-y-2">
              {["Contact Us", "FAQ", "Size Guide", "Returns", "Shipping"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">hello@shopco.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © 2024 ShopCo. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <CreditCard className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-500">Secure payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV5;
