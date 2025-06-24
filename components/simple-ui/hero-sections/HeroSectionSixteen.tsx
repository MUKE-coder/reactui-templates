/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  Heart,
  Sparkles,
  Star,
} from "lucide-react";

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

interface ImageCardProps {
  title: string;
  subtitle: string;
  image: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
  isDark: boolean;
}

interface AvatarProps {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const HeroSectionSixteen: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = (): void => setIsDark(!isDark);
  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);

  // Avatar Component with real images
  const Avatar: React.FC<AvatarProps> = ({ src, name, size = "md" }) => {
    const sizeClasses = {
      sm: "w-10 h-10",
      md: "w-12 h-12",
      lg: "w-16 h-16",
    };

    return (
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-3 ${
          isDark ? "border-gray-700" : "border-gray-300"
        } overflow-hidden shadow-lg bg-gray-200`}
        whileHover={{ scale: 1.1 }}
        title={name}
      >
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder with initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.parentElement!.innerHTML = `
              <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                ${name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            `;
          }}
        />
      </motion.div>
    );
  };

  // Rounded Navigation Component
  const Navigation: React.FC<NavigationProps> = ({ isDark, toggleTheme }) => {
    const navItems = [
      { name: "Pricing", href: "#pricing" },
      { name: "Blog", href: "#blog" },
      { name: "Affiliate Program", href: "#affiliate", badge: "New" },
    ];

    return (
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-4 left-1/4 transform  z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? "bg-gray-900/90 backdrop-blur-2xl border border-gray-700/50 shadow-2xl"
              : "bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-2xl"
            : isDark
            ? "bg-gray-800/60 backdrop-blur-xl border border-gray-700/30"
            : "bg-white/60 backdrop-blur-xl border border-gray-200/30"
        } rounded-3xl px-6 py-3`}
      >
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div
              className={`p-2 rounded-xl ${
                isDark ? "bg-yellow-500/20" : "bg-yellow-100"
              }`}
            >
              <Zap
                className={`w-5 h-5 ${
                  isDark ? "text-yellow-400" : "text-yellow-600"
                }`}
              />
            </div>
            <span
              className={`text-lg font-black ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              StoryShort
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className={`relative font-semibold text-sm transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
                {item.badge && (
                  <span
                    className={`absolute -top-2 -right-6 px-2 py-0.5 text-xs font-bold rounded-full ${
                      isDark
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </motion.a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2.5 font-semibold text-sm rounded-xl transition-all ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Sign in
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 font-bold text-sm rounded-xl transition-all shadow-lg ${
                  isDark
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
              className={`lg:hidden p-2.5 rounded-xl ${
                isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`lg:hidden overflow-hidden ${
            isDark ? "bg-gray-800/80" : "bg-white/80"
          } backdrop-blur-xl rounded-2xl mt-4`}
        >
          <div className="p-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block font-semibold text-sm transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
            <div className="pt-3 space-y-2">
              <button
                className={`w-full px-4 py-2.5 font-semibold text-sm rounded-xl transition-all ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Sign in
              </button>
              <button
                className={`w-full px-4 py-2.5 font-bold text-sm rounded-xl transition-all ${
                  isDark
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    );
  };

  // Image Card Component
  const ImageCard: React.FC<ImageCardProps> = ({
    title,
    subtitle,
    image,
    icon,
    className = "",
    delay = 0,
    isDark,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, duration: 0.8, type: "spring", stiffness: 100 }}
      whileHover={{
        scale: 1.05,
        rotate: 2,
        transition: { duration: 0.3 },
      }}
      className={`relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group ${className}`}
    >
      <div className="aspect-[4/5] relative">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Icon */}
        {icon && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            {icon}
          </motion.div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delay + 0.6 }}
          >
            <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
            <p className="text-white/80 text-sm">{subtitle}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  const bgClass = isDark ? "bg-gray-900" : "bg-gray-50";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";

  // Real avatar data
  const avatars = [
    {
      name: "Sarah Chen",
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b1d6?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Marcus Johnson",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Elena Rodriguez",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "David Kim",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Priya Patel",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div
      className={`min-h-screen ${bgClass} transition-all duration-500 relative overflow-hidden`}
    >
      {/* Navigation */}
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={`w-full h-full ${
            isDark
              ? "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
              : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"
          } bg-[size:60px_60px]`}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 pt-24 lg:pt-32 pb-16 lg:pb-20"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 lg:space-y-8 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className={`inline-flex items-center gap-3 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl border-2 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700 backdrop-blur-xl"
                    : "bg-white/50 border-gray-200 backdrop-blur-xl shadow-lg"
                }`}
              >
                <Sparkles
                  className={`w-4 lg:w-5 h-4 lg:h-5 ${
                    isDark ? "text-yellow-400" : "text-yellow-600"
                  }`}
                />
                <span
                  className={`font-bold text-sm lg:text-base ${
                    isDark ? "text-yellow-400" : "text-yellow-600"
                  }`}
                >
                  Powered by AI
                </span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-2 lg:space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight ${textPrimary}`}
                >
                  Create{" "}
                  <span
                    className={isDark ? "text-yellow-400" : "text-yellow-600"}
                  >
                    viral
                  </span>
                  <br />
                  <span
                    className={isDark ? "text-yellow-400" : "text-yellow-600"}
                  >
                    faceless videos
                  </span>
                  <br />
                  on Auto-Pilot.
                </motion.h1>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`text-lg lg:text-xl xl:text-2xl ${textSecondary} leading-relaxed max-w-lg mx-auto lg:mx-0`}
              >
                Create AI Videos in minutes. Our AI creation tool creates viral
                AI videos for you.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group px-8 lg:px-10 py-4 lg:py-6 font-bold text-base lg:text-lg rounded-2xl transition-all duration-300 shadow-2xl flex items-center gap-3 ${
                    isDark
                      ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-yellow-500/25"
                      : "bg-yellow-500 text-white hover:bg-yellow-600 shadow-yellow-500/25"
                  }`}
                >
                  Get Started
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-center justify-center lg:justify-start gap-4 lg:gap-6 pt-6 lg:pt-8"
              >
                <div className="flex -space-x-2 lg:-space-x-3">
                  {avatars.map((avatar, i) => (
                    <motion.div
                      key={avatar.name}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.3 + i * 0.1 }}
                    >
                      <Avatar src={avatar.src} name={avatar.name} size="md" />
                    </motion.div>
                  ))}
                </div>
                <div className={textSecondary}>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold">
                    Trusted by 50,000+ creators
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Image Cards */}
            <motion.div
              style={{ y: y1 }}
              className="relative flex items-center justify-center mt-12 lg:mt-0"
            >
              <div className="relative w-full max-w-sm lg:max-w-md mx-auto">
                {/* Main Image Card */}
                <ImageCard
                  title="The Cleopatra Effect"
                  subtitle="HAD AN ❤️"
                  image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop"
                  delay={0.5}
                  className="relative z-10"
                  isDark={isDark}
                />

                {/* Secondary Image Card */}
                {/* <ImageCard
                  title="Apollo 11 Landing"
                  subtitle="As the saddest story on the moon"
                  image="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=500&fit=crop"
                  delay={0.8}
                  className="absolute -right-4 lg:-right-8 -top-4 lg:-top-8 w-32 lg:w-48 z-20 rotate-12"
                  icon={
                    <Heart className="w-6 lg:w-8 h-6 lg:h-8 text-red-500 fill-red-500" />
                  }
                  isDark={isDark}
                /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSectionSixteen;
