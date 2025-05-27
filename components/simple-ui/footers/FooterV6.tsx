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
const FooterV6: React.FC = () => {
  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
    { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: Shield, title: "Secure Payment", desc: "100% protected" },
    { icon: Phone, title: "24/7 Support", desc: "Always here to help" },
  ];

  return (
    <footer className="bg-gray-50">
      {/* Features Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <feature.icon className="w-8 h-8 text-gray-700 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to get special offers, free giveaways, and exclusive
              deals.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              />
              <button className="px-6 py-2 bg-gray-900 text-white rounded-r-md hover:bg-gray-800 transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                {["About Us", "Careers", "Press", "Blog"].map((item) => (
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
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Help</h4>
              <ul className="space-y-2">
                {[
                  "Customer Service",
                  "My Account",
                  "Find a Store",
                  "Legal & Privacy",
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
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Connect
              </h4>
              <div className="flex space-x-3">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Your Store. All rights reserved. | Privacy Policy | Terms of
            Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterV6;
