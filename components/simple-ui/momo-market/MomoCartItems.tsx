"use client";

import { useState } from "react";
import { Trash2, ArrowLeft, Plus, Minus, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  quantity: number;
  inStock: boolean;
}

interface CartPageProps {
  items?: CartItem[];
}

const sampleCartItems: CartItem[] = [
  {
    id: "zte-k04-phone",
    title: "ZTE K04 Button Phone Kabiriti - Black",
    image: "/images/momo/products/3.jpg",
    currentPrice: 28500,
    originalPrice: 40000,
    quantity: 1,
    inStock: true,
  },
];

export default function MomoCartItems({
  items = sampleCartItems,
}: CartPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  const formatPrice = (price: number) => {
    return `UGX ${price.toLocaleString()}`;
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.currentPrice * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-light text-slate-800 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-slate-600 mb-8">
              Add some products to get started
            </p>
            <Link
              href="/"
              className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200">
        <div className="px-4 py-4">
          <h1 className="text-xl font-medium text-slate-900">Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            {/* Desktop Title */}
            <div className="hidden lg:block mb-8">
              <h1 className="text-3xl font-light text-slate-900 tracking-wide">
                CART
              </h1>
            </div>

            {/* Desktop Table Header */}
            <div className="hidden lg:block bg-slate-200 rounded-t-2xl">
              <div className="grid grid-cols-12 gap-4 px-6 py-4">
                <div className="col-span-6">
                  <span className="text-sm font-medium text-slate-700 tracking-wide">
                    PRODUCTS
                  </span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-sm font-medium text-slate-700 tracking-wide">
                    QUANTITY
                  </span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="text-sm font-medium text-slate-700 tracking-wide">
                    PRICE
                  </span>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white rounded-2xl lg:rounded-t-none shadow-sm border border-slate-100 overflow-hidden">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center px-6 py-6">
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 mb-1">
                          {item.title}
                        </h3>
                        {item.originalPrice && (
                          <p className="text-sm text-slate-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3 flex items-center justify-center">
                      <div className="flex items-center border border-slate-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-2 hover:bg-slate-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-slate-300 min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-2 hover:bg-slate-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-3 text-right">
                      <p className="text-lg font-semibold text-slate-900">
                        {formatPrice(item.currentPrice)}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-medium text-slate-900 text-sm leading-tight">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-semibold text-slate-900">
                              {formatPrice(item.currentPrice)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-slate-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>

                          <div className="flex items-center border border-slate-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 hover:bg-slate-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 border-x border-slate-300 min-w-[50px] text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 hover:bg-slate-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Delete Button */}
                  <div className="hidden lg:block px-6 pb-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      DELETE
                    </button>
                  </div>

                  {index < cartItems.length - 1 && (
                    <div className="border-t border-slate-100" />
                  )}
                </div>
              ))}
            </div>

            {/* Continue Shopping - Desktop */}
            <div className="hidden lg:block mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 rounded-xl font-medium tracking-wide transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                CONTINUE SHOPPING
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="hidden lg:block mt-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Placing a product on the cart does not reserve that product or
                price. We only reserve the product once payment is received
              </p>
            </div>
          </div>

          {/* Order Summary - Desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-8">
              <h2 className="text-xl font-medium text-slate-900 mb-6">
                Order summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Items price</span>
                  <span className="font-medium text-slate-900">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-900">Total</span>
                    <span className="font-semibold text-slate-900 text-lg">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                PROCEED TO CHECKOUT ({getTotalItems()} ITEM
                {getTotalItems() !== 1 ? "S" : ""})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Checkout */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-800 text-white p-4 shadow-lg">
        <button
          onClick={handleCheckout}
          className="w-full flex items-center justify-between"
        >
          <div className="text-left">
            <div className="text-sm opacity-90">{getTotalItems()} Items</div>
            <div className="font-medium">{formatPrice(getTotalPrice())}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Checkout</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
}
