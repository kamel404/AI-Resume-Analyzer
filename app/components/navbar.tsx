import { Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar relative">
      {/* Main navbar container */}
      <div className="flex items-center justify-between w-full">
        {/* Logo - responsive sizing */}
        <Link to="/" className="flex-shrink-0">
          <p className="text-xl sm:text-2xl font-bold text-gradient">Resumind</p>
        </Link>

        {/* Desktop navigation - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <Link 
            to="/upload" 
            className="primary-button w-fit px-3 py-2 text-sm lg:px-4 lg:py-2 lg:text-base"
          >
            Upload Resume
          </Link>
          <Link 
            to="/wipe" 
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-2 text-sm lg:px-4 lg:py-2 lg:text-base rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg w-fit"
          >
            Wipe Data
          </Link>
        </div>

        {/* Mobile menu button - visible only on mobile */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
          aria-label="Toggle mobile menu"
        >
          <span 
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span 
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu - dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg border-t transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 max-h-40 visible' 
            : 'opacity-0 max-h-0 invisible overflow-hidden'
        }`}
      >
        <div className="flex flex-col gap-2 p-4">
          <Link 
            to="/upload" 
            className="primary-button text-center py-3 text-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Upload Resume
          </Link>
          <Link 
            to="/wipe" 
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 text-sm rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Wipe Data
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;