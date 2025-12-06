import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { NavChild } from '../types';
import Logo from './Logo';

const solutions: NavChild[] = [
  { label: 'Brand Identity', description: 'Logo, typography, visual systems', path: '/solutions/brand-identity' },
  { label: 'Web Design', description: 'Landing pages, marketing sites', path: '/solutions/web-design' },
  { label: 'Web App Development', description: 'Full-stack React/TS apps', path: '/solutions/web-app-development' },
  { label: 'App Development', description: 'iOS/Android native & cross-platform', path: '/solutions/app-development' },
  { label: 'Custom AI Platform', description: 'AI for any use case', path: '/solutions/custom-ai-platform' },
  { label: 'AI Integrations', description: 'Automation, workflows, chatbots', path: '/solutions/ai-integrations' },
  { label: 'Fractional Talent', description: 'On-demand engineering & AI experts', path: '/solutions/fractional-talent' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleMobileLinkClick = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-primary/95 backdrop-blur-md border-b border-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => {
              window.scrollTo(0, 0);
              setIsOpen(false);
            }}
          >
            <Logo className="w-10 h-10 group-hover:scale-105 transition-transform duration-300" />
            <span className="font-montserrat font-bold text-2xl tracking-tight text-white group-hover:text-white/90 transition-colors">Neural Method</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center text-neutral-light/80 hover:text-accent transition-colors text-sm font-medium">
              <Phone className="w-4 h-4 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>

            {/* Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center font-medium transition-colors ${dropdownOpen ? 'text-accent' : 'text-neutral-light hover:text-accent'}`}
              >
                Solutions
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-secondary rounded-xl shadow-2xl border border-white/5 overflow-hidden animate-fade-in-down p-2">
                  <div className="grid gap-1">
                    {solutions.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="block px-4 py-3 rounded-lg hover:bg-primary/50 group transition-colors"
                      >
                        <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                          {item.label}
                        </p>
                        <p className="text-xs text-neutral-light/60 mt-0.5">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="text-neutral-light hover:text-accent font-medium transition-colors">
              About
            </Link>

            <Link to="/contact" className="group">
              <span className="px-5 py-2.5 rounded-full border border-accent text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 font-semibold text-sm">
                Contact
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-light hover:text-accent p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-secondary h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 pt-4 pb-12 space-y-2">
             <div className="flex items-center text-accent px-3 py-3 text-sm font-medium border-b border-white/5 mb-4">
              <Phone className="w-4 h-4 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full text-left px-3 py-3 text-neutral-light hover:text-accent font-medium flex justify-between items-center rounded-lg hover:bg-white/5 transition-colors"
              >
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="pl-4 space-y-1 bg-white/5 rounded-lg my-2 py-2">
                  {solutions.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={handleMobileLinkClick}
                      className="block px-3 py-2.5 text-sm text-neutral-light/90 hover:text-accent border-l-2 border-transparent hover:border-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              onClick={handleMobileLinkClick}
              className="block px-3 py-3 text-neutral-light hover:text-accent font-medium rounded-lg hover:bg-white/5 transition-colors"
            >
              About
            </Link>
            
            <div className="pt-4">
              <Link
                to="/contact"
                onClick={handleMobileLinkClick}
                className="block w-full text-center px-4 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
