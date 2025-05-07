import React from "react";
import { ArrowRight } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const HeroSectionFourteen: React.FC = () => {
  return (
    <div className="relative w-full bg-emerald-500 overflow-hidden min-h-screen">
      {/* Clip path background - carefully crafted to match the design */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-emerald-600"></div>
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0% 45%, 100% 25%, 100% 100%, 0% 100%)",
            backgroundColor: "#fff", // emerald-600 equivalent
          }}
        ></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <h1
              className="text-white text-3xl font-bold italic"
              style={{ fontFamily: "cursive, serif" }}
            >
              Sheety
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-white font-medium">
            <a href="#" className="hover:text-white/80 transition-colors">
              Templates
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Learn
            </a>
            <a
              href="#"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              Dashboard <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Hero content */}
        <div className="flex flex-col lg:flex-row items-center pt-12 lg:pt-20 pb-24">
          <div className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              <span className="block">APIs</span>
              <span className="block">from sheets</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl">
              Thousands of people are using Sheety to turn their spreadsheets
              into powerful APIs to rapidly develop prototypes, websites, apps
              and more.
            </p>
            <button className="bg-emerald-600 text-gray-100 hover:bg-emerald-700 transition-colors px-6 py-4 rounded-full flex items-center font-medium shadow-lg">
              <div className=" rounded-full mr-3 flex items-center justify-center">
                <FaGoogle size={24} />
              </div>
              Connect Google Sheet
            </button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md transform translate-y-0 lg:translate-y-8">
              {/* Phone frame with shadow and content */}
              <div className="relative mx-auto" style={{ maxWidth: "320px" }}>
                <div className="absolute inset-0 -m-4 bg-gray-200 rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  {/* Phone status bar */}
                  <div className="bg-gray-100 flex justify-between items-center px-4 py-2 text-xs text-gray-500">
                    <span>5:35</span>
                    <div className="flex items-center">
                      <svg
                        className="h-3 w-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5z"></path>
                        <path d="M8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7z"></path>
                        <path d="M14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                      </svg>
                      <svg
                        className="h-3 w-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  {/* Restaurant App Content */}
                  <div className="flex flex-col items-center pt-6 pb-6 bg-white h-full">
                    {/* Restaurant Logo */}
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="h-10 w-10 text-amber-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6C8.68 6 6 8.68 6 12h12c0-3.32-2.68-6-6-6z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 13a1 1 0 100-2 1 1 0 000 2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 16H8a4 4 0 01-4-4"
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-amber-600 font-bold text-3xl mb-2"
                      style={{ fontFamily: "cursive, serif" }}
                    >
                      Clucker!
                    </h3>
                    <p className="text-gray-600 text-xs text-center px-6 mb-6">
                      Our British chicken is fresh, never frozen and marinated
                      in-PERi-PERi for 24 hours before being flame-grilled.
                    </p>

                    {/* Starters Section */}
                    <div className="w-full px-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        Starters
                      </h4>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-gray-700">
                              Spicy Mixed Olives
                            </span>
                            <div className="h-2 w-2 bg-green-500 rounded-full ml-2"></div>
                          </div>
                          <span className="text-gray-700">£3.25</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-gray-700">
                              Peri-Peri Nuts
                            </span>
                            <div className="h-2 w-2 bg-yellow-500 rounded-full ml-2"></div>
                          </div>
                          <span className="text-gray-700">£3.25</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-gray-700">
                              Halloumi Sticks & Dip
                            </span>
                            <div className="h-2 w-2 bg-green-500 rounded-full ml-2"></div>
                          </div>
                          <span className="text-gray-700">£3.45</span>
                        </div>
                      </div>

                      {/* Mains Section */}
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        Mains
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">1/4 Chicken Leg</span>
                          <span className="text-gray-700">£3.7</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">1/2 Chicken</span>
                          <span className="text-gray-700">£6.75</span>
                        </div>
                      </div>
                    </div>

                    {/* Phone Navigation */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center py-4 px-12 border-t border-gray-200">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Sheets overlay frame */}
              <div className="absolute -top-4 -right-4 bg-white shadow-lg rounded-md p-1 transform -rotate-3">
                <div className="flex items-center space-x-1 border-b border-gray-200 pb-1">
                  <div className="flex space-x-1">
                    <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex space-x-1 text-gray-500 text-xs">
                    <span>◀</span>
                    <span>▶</span>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center mb-2">
                    <div className="h-5 w-5 bg-green-100 rounded-sm flex items-center justify-center mr-2">
                      <svg
                        className="h-4 w-4 text-green-700"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M9,17H6.5v-7h2v7H9z M13.5,17h-2v-4h2V17z M13.5,11.5h-2v-1.5h2V11.5z M18,17h-2v-3.5h2V17z M18,12h-2v-2h2V12z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-800 text-sm font-medium">
                      Restaurant Template
                    </span>
                    <span className="ml-1 text-gray-400">⭐</span>
                  </div>
                  <div className="text-xs text-gray-500 flex space-x-3 mb-1">
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Insert</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>100%</span>
                      <span>$</span>
                      <span>%</span>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="p-1 border-r border-gray-200 text-center">
                            A
                          </th>
                          <th className="p-1 text-center">B</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-200">
                          <td className="p-1 border-r border-gray-200">Item</td>
                          <td className="p-1">Price</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                          <td className="p-1 border-r border-gray-200">
                            Spicy Mixed Olives
                          </td>
                          <td className="p-1">3.25</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                          <td className="p-1 border-r border-gray-200">
                            Peri-Peri Nuts
                          </td>
                          <td className="p-1">3.25</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionFourteen;
