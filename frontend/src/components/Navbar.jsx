import React, { useState, useEffect } from "react";
import { Menu, X, Github, Code2 } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Code2 className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                WebSynth
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                How It Works
              </a>

              <a
                href="#pricing"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Pricing
              </a>
              <a
                href="https://github.com/priyanjal1234/WebSynth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Github className="h-5 w-5 inline" />
              </a>
              {/* <a
                href="#get-started"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-indigo-500/20"
              >
                Get Started
              </a> */}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/90 backdrop-blur-lg">
          <a
            href="#features"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            How It Works
          </a>
          <a
            href="#examples"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Examples
          </a>
          <a
            href="#pricing"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Pricing
          </a>
          <a
            href="#get-started"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
