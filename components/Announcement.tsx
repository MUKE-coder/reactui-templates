"use client";
import React, { useState, useEffect } from "react";
import { X, ChevronRight, Bell } from "lucide-react";
import Link from "next/link";

interface ComponentRelease {
  name: string;
  url: string;
}

interface AnnouncementBannerProps {
  weeklyReleases: ComponentRelease[];
  weekNumber: number;
  releaseDate: string;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  weeklyReleases,
  weekNumber,
  releaseDate,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === weeklyReleases.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [weeklyReleases.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-fadeIn max-w-6xl mx-auto ">
      <div className="bg-gradient-to-r from-indigo-600 rounded-lg to-purple-600 text-white shadow-lg">
        <div className="mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center">
              <span className="flex p-2 rounded-lg bg-indigo-800 mr-3">
                <Bell className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <div className="text-sm font-medium">
                <span className="mr-2 font-bold">
                  Week {weekNumber} • {releaseDate}:
                </span>
                <span className="md:hidden">New components available!</span>
                <span className="hidden md:inline">
                  {weeklyReleases[currentIndex].name} components are now
                  available!
                </span>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:ml-6 md:justify-end">
              <div className="flex transition-all duration-500 space-x-4">
                {weeklyReleases.map((release, index) => (
                  <Link
                    key={index}
                    href={release.url}
                    className={`text-sm font-medium hover:text-indigo-100 transition duration-150 ease-in-out ${
                      index === currentIndex
                        ? "underline font-bold"
                        : "text-indigo-200"
                    }`}
                  >
                    {release.name}
                    <ChevronRight className="inline-block h-4 w-4 ml-1" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="ml-3 flex-shrink-0">
              <button
                type="button"
                className="p-1.5 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white transition duration-150 ease-in-out"
                onClick={() => setIsVisible(false)}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
