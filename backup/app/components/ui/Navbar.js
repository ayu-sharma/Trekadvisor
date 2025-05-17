"use client"
import { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import Button from '../hero/Button';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  // Array of navigation links with dropdown content
  const navLinks = [
    { 
      name: 'Home', 
      path: '/', 
      hasDropdown: false,
    },
    { 
      name: 'Hidden Gems', 
      path: '/hidden-gems', 
      hasDropdown: false,
    },
  ];
  
  return (
    <div className="relative">
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white py-2' : 'bg-gradient-to-b from-black/40 to-transparent py-4'}`}>
        <div className="flex justify-between w-full px-4">
          <nav className="flex items-center justify-between w-full max-w-7xl">
            {/* Logo with half green and half white text */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-teal-600">Travel</span>
                <span className={scrolled ? "text-teal-600" : "text-white"}>Ease</span>
              </span>
            </Link>
            
            {/* Desktop Navigation with active underline */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <div key={index} className="relative group">
                  {link.hasDropdown ? (
                    <Button
                      onClick={() => toggleDropdown(index)}
                      variant={scrolled ? "text" : "text"}
                      className={`flex items-center space-x-1 font-medium transition duration-300 ${
                        scrolled ? 'text-gray-800 hover:text-teal-600' : 'text-white hover:text-teal-200'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                      />
                    </Button>
                  ) : (
                    <Link
                      href={link.path}
                      className={`flex items-center space-x-1 font-medium transition duration-300 relative 
                        ${scrolled ? 'text-gray-800 hover:text-teal-600' : 'text-white hover:text-teal-200'}
                        ${pathname === link.path ? 'after:absolute after:w-full after:h-0.5 after:bg-teal-500 after:bottom-0 after:left-0' : ''}
                      `}
                    >
                      <span>{link.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              <Button
                variant={scrolled ? "text" : "text"}
                className={`p-2 rounded-full transition duration-300 ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
              >
                <Search size={20} />
              </Button>
              
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant={scrolled ? "text" : "text"}
                className={`p-2 rounded-full ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </nav>
        </div>
          
        {/* Mobile Navigation with slide-in animation from right to left */}
        <div 
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-black/50 transition-opacity duration-300 z-40 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-xl font-bold">
                <span className="text-teal-600">Travel</span>
                <span className="text-teal-600">Ease</span>
              </span>
              <Button
                onClick={() => setIsOpen(false)}
                variant="text"
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </Button>
            </div>
            <div className="flex flex-col w-full py-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.hasDropdown ? (
                    <Button
                      onClick={() => toggleDropdown(index)}
                      variant="text"
                      className="flex items-center justify-between w-full text-gray-800 hover:text-teal-600 font-medium py-3 px-4 border-b border-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{link.name}</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                      />
                    </Button>
                  ) : (
                    <Link
                      href={link.path}
                      className={`flex items-center justify-between w-full font-medium py-3 px-4 border-b border-gray-100 relative
                        ${pathname === link.path ? 'text-teal-600 after:absolute after:w-1 after:h-full after:bg-teal-500 after:left-0 after:top-0' : 'text-gray-800 hover:text-teal-600'}
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center space-x-2 pl-2">
                        <span>{link.name}</span>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;