"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalNavigationSlider() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Define sections for different pages
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Only track sections on homepage
      if (pathname !== '/') {
        setActiveSection('');
        return;
      }

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, pathname]);

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the homepage
    if (pathname === "/") {
      // We're on homepage, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // We're on another page, navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  // Don't render on mobile or if no sections available
  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      {/* Background container with subtle backdrop */}
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-4 shadow-lg border border-gray-200/50">
        <div className="flex flex-col items-center space-y-3">
          {sections.map((section, index) => (
            <div key={section.id} className="relative group">
              {/* Dot */}
              <button
                onClick={() => scrollToSection(section.id)}
                className={`
                  relative w-3 h-3 rounded-full transition-all duration-300 ease-in-out
                  ${
                    activeSection === section.id
                      ? "bg-indigo-600 scale-125 shadow-md shadow-indigo-500/50"
                      : "bg-gray-400 hover:bg-indigo-500 hover:scale-110"
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                `}
                aria-label={`Navigate to ${section.label}`}
              >
                {/* Active pulse effect */}
                {activeSection === section.id && (
                  <div className="absolute inset-0 rounded-full bg-indigo-600 animate-ping opacity-75"></div>
                )}
              </button>

              {/* Label tooltip */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-x-2 group-hover:translate-x-0">
                <div className="bg-gray-900/90 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                  {section.label}
                  {/* Arrow */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900/90"></div>
                </div>
              </div>

              {/* Connecting line (except for last item) */}
              {index < sections.length - 1 && (
                <div
                  className={`
                  absolute top-full left-1/2 -translate-x-1/2 w-px h-3 transition-colors duration-300
                  ${
                    activeSection === section.id ||
                    activeSection === sections[index + 1]?.id
                      ? "bg-indigo-400"
                      : "bg-gray-300"
                  }
                `}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}