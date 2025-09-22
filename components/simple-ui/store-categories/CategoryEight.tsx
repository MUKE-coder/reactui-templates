"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Car,
  Home,
  Smartphone,
  Monitor,
  Sofa,
  Sparkles,
  Shirt,
  TreePine,
  Bus,
  Construction,
  Bike,
  Truck,
  Settings,
  Ship,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface SubCategory {
  name: string;
  count: number;
  icon: React.ComponentType<any>;
}

interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ComponentType<any>;
  subcategories?: SubCategory[];
}

const categories: Category[] = [
  {
    id: "vehicles",
    name: "Vehicles",
    count: 56143,
    icon: Car,
    subcategories: [
      { name: "Cars", count: 11876, icon: Car },
      { name: "Buses & Microbuses", count: 398, icon: Bus },
      {
        name: "Construction & Heavy Machinery",
        count: 225,
        icon: Construction,
      },
      { name: "Motorcycles & Scooters", count: 7704, icon: Bike },
      { name: "Trucks & Trailers", count: 1006, icon: Truck },
      { name: "Vehicle Parts & Accessories", count: 34867, icon: Settings },
      { name: "Watercraft & Boats", count: 67, icon: Ship },
    ],
  },
  {
    id: "property",
    name: "Property",
    count: 18290,
    icon: Home,
    subcategories: [
      { name: "Houses for Sale", count: 8450, icon: Home },
      { name: "Apartments for Rent", count: 5200, icon: Home },
      { name: "Commercial Property", count: 2890, icon: Home },
      { name: "Land for Sale", count: 1750, icon: Home },
    ],
  },
  {
    id: "mobile",
    name: "Mobile Phones & Tablets",
    count: 48941,
    icon: Smartphone,
    subcategories: [
      { name: "Mobile Phones", count: 32450, icon: Smartphone },
      { name: "Tablets", count: 8920, icon: Smartphone },
      { name: "Phone Accessories", count: 5871, icon: Smartphone },
      { name: "Smart Watches", count: 1700, icon: Smartphone },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    count: 117919,
    icon: Monitor,
    subcategories: [
      { name: "Computers & Laptops", count: 45200, icon: Monitor },
      { name: "Gaming Consoles", count: 12890, icon: Monitor },
      { name: "Audio & Video", count: 28450, icon: Monitor },
      { name: "Cameras", count: 15679, icon: Monitor },
      { name: "Smart Home", count: 15700, icon: Monitor },
    ],
  },
  {
    id: "home",
    name: "Home, Furniture & Appliances",
    count: 294785,
    icon: Sofa,
    subcategories: [
      { name: "Furniture", count: 89450, icon: Sofa },
      { name: "Kitchen Appliances", count: 45200, icon: Sofa },
      { name: "Home Decor", count: 67890, icon: Sofa },
      { name: "Garden & Outdoor", count: 34560, icon: Sofa },
      { name: "Tools & Hardware", count: 57685, icon: Sofa },
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    count: 32505,
    icon: Sparkles,
    subcategories: [
      { name: "Skincare", count: 12890, icon: Sparkles },
      { name: "Makeup", count: 8760, icon: Sparkles },
      { name: "Hair Care", count: 6755, icon: Sparkles },
      { name: "Fragrances", count: 4100, icon: Sparkles },
    ],
  },
  {
    id: "fashion",
    name: "Fashion",
    count: 85516,
    icon: Shirt,
    subcategories: [
      { name: "Women's Clothing", count: 34890, icon: Shirt },
      { name: "Men's Clothing", count: 28760, icon: Shirt },
      { name: "Shoes", count: 15200, icon: Shirt },
      { name: "Accessories", count: 6666, icon: Shirt },
    ],
  },
  {
    id: "leisure",
    name: "Leisure & Activities",
    count: 41637,
    icon: TreePine,
    subcategories: [
      { name: "Sports & Fitness", count: 18900, icon: TreePine },
      { name: "Musical Instruments", count: 8950, icon: TreePine },
      { name: "Books & Media", count: 7890, icon: TreePine },
      { name: "Hobbies & Crafts", count: 5897, icon: TreePine },
    ],
  },
];

const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

interface CategoryItemProps {
  category: Category;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  isExpanded,
  onToggle,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const IconComponent = category.icon;

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors rounded-lg group"
        onClick={onToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-8 h-8 flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-foreground">{category.name}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <div className="text-sm text-muted-foreground">
            {formatNumber(category.count)} ads
          </div>
        </div>
      </div>

      {/* Submenu - Fixed positioning */}
      {isHovered && category.subcategories && (
        <div
          className="absolute left-full top-0 w-80 bg-background border border-border rounded-lg shadow-xl p-2"
          style={{
            marginLeft: "4px",
            zIndex: 9999,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {category.subcategories.map((subcategory, index) => {
            const SubIconComponent = subcategory.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors rounded-lg"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <SubIconComponent className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-foreground">{subcategory.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatNumber(subcategory.count)} ads
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const CategoryList: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="w-full max-w-md bg-background border border-border rounded-lg overflow-visible relative">
      <div className="divide-y divide-border">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isExpanded={expandedCategory === category.id}
            onToggle={() => toggleCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default function CategoryEight() {
  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-center">Categories</h1>
        <div className="flex justify-center">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}
