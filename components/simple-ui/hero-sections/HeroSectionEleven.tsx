"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const specialties = [
  "Doctor",
  "Dermatologist",
  "Dentist",
  "Psychiatrist",
  "Pediatrician",
];

export default function HeroSectionEleven() {
  const [specialty, setSpecialty] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpecialty((prev) => (prev + 1) % specialties.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.webp')",
          filter: "brightness(0.7)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
        >
          Find the right{" "}
          <span className="text-blue-500">{specialties[specialty]}</span>
          <br />
          right now
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
        >
          AskDoc connects you with top healthcare professionals. Book
          appointments instantly and take control of your health journey.
        </motion.p>
        <SearchBarV1 />
      </div>
    </div>
  );
}

function SearchBarV1() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search?query=${query}`);
    setQuery("");
  }
  return (
    <form className="" onSubmit={handleSearch}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center"
      >
        <div className="relative max-w-xl w-full">
          <input
            type="text"
            placeholder="Search for doctors..."
            className="w-full px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-300">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </form>
  );
}
