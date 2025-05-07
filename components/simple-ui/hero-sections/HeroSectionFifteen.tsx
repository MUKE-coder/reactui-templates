import React from "react";

const HeroSectionFifteen: React.FC = () => {
  return (
    <div className="w-full bg-green-950 min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-start justify-between gap-12">
        {/* Left content - Text */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-emerald-400 text-lg font-medium mb-3">
            Fully Restful JSON API
          </h3>
          <h2 className="text-white text-5xl font-bold mb-6 leading-tight">
            Easy for Novices.
            <br />
            Powerful for Pros.
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-xl">
            Sheety turns your spreadsheet into a Restful JSON API, meaning you
            can get data in and out of your spreadsheet using simple HTTP
            requests and URLs. It also means that Sheety can work with pretty
            much anything you like: if it connects to the Internet, it works
            with Sheety.
          </p>
          <a
            href="#"
            className="inline-block bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Read the docs
          </a>
        </div>

        {/* Right content - JSON code */}
        <div className="w-full lg:w-1/2">
          <div className="bg-transparent rounded-xl border border-green-800/70 p-6 overflow-hidden">
            <pre className="text-white font-mono text-sm whitespace-pre overflow-x-auto">
              {`{
  "menus": [
    {
      "item": "Spicy Mixed Olives",
      "price": 3.25,
      "category": "Starters",
      "isVegetarian": `}
              <span className="text-emerald-400">true</span>
              {`,
      "id": 2
    },
    {
      "item": "Peri-Peri Nuts",
      "price": 3.25,
      "category": "Starters",
      "isVegetarian": `}
              <span className="text-emerald-400">true</span>
              {`,
      "id": 3
    },
    {
      "item": "Halloumi Sticks",
      "price": 3.45,
      "category": "Starters",
      "isVegetarian": `}
              <span className="text-emerald-400">true</span>
              {`,
      "id": 4
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionFifteen;
