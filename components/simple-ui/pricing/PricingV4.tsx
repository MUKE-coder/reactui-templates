"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Zap,
  Crown,
  Moon,
  Sun,
  Users,
  Shield,
  Rocket,
  Building2,
  Sparkles,
  Star,
} from "lucide-react";

// Type definitions
interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: React.ReactNode;
  features: string[];
  popular: boolean;
  cta: string;
  color: "blue" | "purple" | "emerald";
  gradient: string;
}

interface Avatar {
  name: string;
  role: string;
}

interface CustomToggleProps {
  isOn: boolean;
  onToggle: () => void;
  label1: string;
  label2: string;
}

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const PricingV4: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isYearly, setIsYearly] = useState<boolean>(false);

  // Custom Toggle Component
  const CustomToggle: React.FC<CustomToggleProps> = ({
    isOn,
    onToggle,
    label1,
    label2,
  }) => (
    <div className="flex items-center gap-6">
      <span
        className={`text-base font-semibold transition-colors ${
          !isOn
            ? isDark
              ? "text-white"
              : "text-gray-900"
            : isDark
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        {label1}
      </span>
      <motion.button
        onClick={onToggle}
        className={`relative w-16 h-8 rounded-full border-2 transition-colors duration-300 ${
          isDark ? "bg-gray-800 border-gray-600" : "bg-gray-100 border-gray-300"
        }`}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className={`absolute top-0.5 w-6 h-6 rounded-full shadow-lg ${
            isDark ? "bg-white" : "bg-gray-900"
          }`}
          animate={{ x: isOn ? 36 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isOn
              ? "0 0 20px rgba(59, 130, 246, 0.5)"
              : "0 0 0px rgba(59, 130, 246, 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      <div className="flex items-center gap-2">
        <span
          className={`text-base font-semibold transition-colors ${
            isOn
              ? isDark
                ? "text-white"
                : "text-gray-900"
              : isDark
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {label2}
        </span>
        {isOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
              isDark
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-emerald-100 text-emerald-700 border border-emerald-200"
            }`}
          >
            <Sparkles size={12} />
            SAVE 20%
          </motion.div>
        )}
      </div>
    </div>
  );

  // Custom Theme Toggle
  const ThemeToggle: React.FC = () => (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className={`relative p-3 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
        isDark
          ? "bg-gray-800/80 border-gray-600 text-yellow-400 shadow-lg shadow-yellow-400/10"
          : "bg-white/80 border-gray-200 text-gray-600 shadow-lg shadow-gray-900/10"
      }`}
      whileHover={{ scale: 1.05, rotate: 180 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 360 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </motion.button>
  );

  // Avatar Component
  const Avatar: React.FC<AvatarProps> = ({ src, name, size = "md" }) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
    };

    const gradients = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-emerald-500 to-emerald-600",
      "bg-gradient-to-br from-orange-500 to-orange-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
    ];

    return (
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-2 ${
          isDark ? "border-gray-600/30" : "border-white/70"
        } overflow-hidden`}
        whileHover={{ scale: 1.1 }}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-white font-bold text-sm ${
              gradients[Math.floor(Math.random() * gradients.length)]
            }`}
          >
            {name.charAt(0)}
          </div>
        )}
      </motion.div>
    );
  };

  const plans: Plan[] = [
    {
      name: "Starter",
      description:
        "Perfect for individuals and small teams just getting started",
      monthlyPrice: 29,
      yearlyPrice: 24,
      icon: <Users className="w-8 h-8" />,
      features: [
        "Up to 5 team members",
        "10GB secure storage",
        "Basic analytics dashboard",
        "Email support",
        "Core integrations",
        "Mobile app access",
      ],
      popular: false,
      cta: "Start Free Trial",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Professional",
      description:
        "Advanced features and priority support for growing businesses",
      monthlyPrice: 79,
      yearlyPrice: 65,
      icon: <Rocket className="w-8 h-8" />,
      features: [
        "Up to 25 team members",
        "100GB secure storage",
        "Advanced analytics & reports",
        "Priority support",
        "All integrations included",
        "Custom workflows",
        "API access",
        "Advanced security features",
      ],
      popular: true,
      cta: "Start Free Trial",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      name: "Enterprise",
      description:
        "Custom solutions with dedicated support for large organizations",
      monthlyPrice: 199,
      yearlyPrice: 165,
      icon: <Building2 className="w-8 h-8" />,
      features: [
        "Unlimited team members",
        "Unlimited secure storage",
        "Custom analytics dashboard",
        "24/7 dedicated support",
        "Custom integrations",
        "Advanced automation",
        "Full API access",
        "Enterprise security",
        "Custom onboarding",
        "SLA guarantee",
      ],
      popular: false,
      cta: "Contact Sales",
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
    },
  ];

  const avatars: Avatar[] = [
    { name: "Sarah Chen", role: "CTO" },
    { name: "Marcus Johnson", role: "Founder" },
    { name: "Elena Rodriguez", role: "Designer" },
    { name: "David Kim", role: "Developer" },
    { name: "Priya Patel", role: "Product Manager" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const bgClass = isDark
    ? "bg-gray-900"
    : "bg-gradient-to-br from-gray-50 to-white";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";
  const cardBg = isDark ? "bg-gray-800/50" : "bg-white/70";

  return (
    <div
      className={`min-h-screen ${bgClass} transition-all duration-500 relative overflow-hidden`}
    >
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className={`w-full h-full ${
            isDark
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05)_0%,transparent_50%),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"
          } bg-[size:60px_60px,40px_40px,40px_40px]`}
        />
      </div>

      {/* Enhanced Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="float"
        className={`absolute top-20 left-20 w-32 h-32 rounded-3xl backdrop-blur-xl border ${
          isDark
            ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20"
            : "bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/10"
        } shadow-xl`}
      />
      <motion.div
        variants={{
          ...floatingVariants,
          float: {
            ...floatingVariants.float,
            transition: { ...floatingVariants.float.transition, delay: 2 },
          },
        }}
        animate="float"
        className={`absolute top-40 right-32 w-24 h-24 rounded-2xl backdrop-blur-xl border ${
          isDark
            ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20"
            : "bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/10"
        } shadow-xl`}
      />
      <motion.div
        variants={{
          ...floatingVariants,
          float: {
            ...floatingVariants.float,
            transition: { ...floatingVariants.float.transition, delay: 4 },
          },
        }}
        animate="float"
        className={`absolute bottom-40 left-40 w-20 h-20 rounded-xl backdrop-blur-xl border ${
          isDark
            ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
            : "bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/10"
        } shadow-xl`}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-12">
            <ThemeToggle />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-sm mb-8 ${
              isDark
                ? "bg-gray-800/50 border-gray-600/50 shadow-lg shadow-blue-500/10"
                : "bg-white/70 border-gray-200/50 shadow-lg shadow-gray-900/5"
            }`}
          >
            <Shield
              className={`w-5 h-5 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <span
              className={`font-semibold ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Enterprise-Grade Security
            </span>
          </motion.div>

          <h1
            className={`text-6xl md:text-8xl font-black ${textPrimary} mb-8 tracking-tight leading-none`}
          >
            Simple.
            <br />
            <span
              className={`bg-gradient-to-r ${
                isDark
                  ? "from-blue-400 to-purple-400"
                  : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              Powerful.
            </span>
            <br />
            Pricing.
          </h1>

          <p
            className={`text-xl md:text-2xl ${textSecondary} max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            Choose the perfect plan for your team. No hidden fees, no surprises.
            <br />
            Scale as you grow with confidence.
          </p>

          {/* Enhanced Avatar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center items-center gap-4 mb-12"
          >
            <div className="flex -space-x-3">
              {avatars.slice(0, 5).map((avatar, index) => (
                <motion.div
                  key={avatar.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Avatar name={avatar.name} />
                </motion.div>
              ))}
            </div>
            <div className={`ml-4 text-left ${textSecondary}`}>
              <div className="flex items-center gap-1 mb-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold ml-1">4.9/5</span>
              </div>
              <p className="text-sm font-semibold">Trusted by 25,000+ teams</p>
              <p className="text-xs">From startups to Fortune 500</p>
            </div>
          </motion.div>

          {/* Custom Pricing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <CustomToggle
              isOn={isYearly}
              onToggle={() => setIsYearly(!isYearly)}
              label1="Monthly"
              label2="Yearly"
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              className={`relative rounded-3xl ${cardBg} backdrop-blur-xl border shadow-xl hover:shadow-2xl transition-all duration-500 p-8 ${
                plan.popular
                  ? isDark
                    ? "border-purple-500/50 shadow-purple-500/20"
                    : "border-purple-500/30 shadow-purple-500/10"
                  : isDark
                  ? "border-gray-700/50"
                  : "border-gray-200/50"
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                >
                  <div
                    className={`px-6 py-3 rounded-2xl text-white font-bold shadow-lg flex items-center gap-2 bg-gradient-to-r ${
                      isDark
                        ? "from-purple-600 to-purple-500"
                        : "from-purple-500 to-purple-600"
                    }`}
                  >
                    <Crown size={18} />
                    Most Popular
                  </div>
                </motion.div>
              )}

              <div className="mb-8">
                <div
                  className={`inline-flex p-4 rounded-2xl mb-6 ${
                    plan.color === "blue"
                      ? isDark
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-blue-100 text-blue-600"
                      : plan.color === "purple"
                      ? isDark
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-purple-100 text-purple-600"
                      : isDark
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {plan.icon}
                </div>

                <h3 className={`text-3xl font-black ${textPrimary} mb-3`}>
                  {plan.name}
                </h3>
                <p
                  className={`${textSecondary} text-base mb-8 leading-relaxed`}
                >
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-6xl font-black ${textPrimary}`}>
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <div className={textSecondary}>
                    <span className="text-lg font-semibold">/month</span>
                    {isYearly && <p className="text-sm">billed annually</p>}
                  </div>
                </div>
                {isYearly && (
                  <div className="text-sm text-emerald-500 font-semibold">
                    Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`mt-1 p-1.5 rounded-full ${
                        isDark ? "bg-emerald-500/20" : "bg-emerald-100"
                      }`}
                    >
                      <Check
                        size={14}
                        className={`${
                          isDark ? "text-emerald-400" : "text-emerald-600"
                        }`}
                      />
                    </div>
                    <span className={`${textSecondary} leading-relaxed`}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl`
                    : isDark
                    ? "bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 border-2 border-gray-600/50 backdrop-blur-sm"
                    : "bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 border-2 border-gray-200/50 backdrop-blur-sm"
                }`}
              >
                <Zap size={20} />
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div
            className={`inline-flex items-center gap-4 px-8 py-4 rounded-2xl backdrop-blur-sm ${
              isDark
                ? "bg-gray-800/50 border-2 border-gray-700/50 shadow-lg"
                : "bg-white/70 border-2 border-gray-200/50 shadow-lg"
            }`}
          >
            <div className="flex -space-x-2">
              {avatars.slice(0, 3).map((avatar, index) => (
                <Avatar key={avatar.name} name={avatar.name} size="sm" />
              ))}
            </div>
            <div className={`text-left ${textSecondary}`}>
              <p className="font-bold">Join 25,000+ happy customers</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span>4.9/5 rating</span>
                <span>•</span>
                <span>No setup fees</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingV4;
