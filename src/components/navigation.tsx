import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const calculators = [
    { href: "/finished-hour", label: "Finished Hour Calculator" },
    { href: "/time-left", label: "Time Left Calculator" },
    { href: "/price", label: "Price Calculator" },
    { href: "/time-per-day", label: "Time Per Day Calculator" },
    { href: "/time-to-page", label: "Time To Page Calculator" },
    { href: "/percentage", label: "Percentage Calculator" },
    { href: "/length", label: "Length Calculator" },
    { href: "/speed", label: "Speed Calculator" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" data-testid="logo-link">
              <h1 className="text-2xl font-bold text-primary">AudioBookment</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`nav-link px-3 py-2 rounded-md text-sm font-medium ${location === '/' ? 'text-primary' : ''}`}
              data-testid="nav-home"
            >
              Home
            </Link>
            
            <div className="relative group">
              <button className="nav-link px-3 py-2 rounded-md text-sm font-medium flex items-center" data-testid="nav-calculators">
                Calculators <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-2 grid grid-cols-1 gap-1">
                  {calculators.map((calc) => (
                    <Link 
                      key={calc.href} 
                      href={calc.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 hover:text-primary"
                      data-testid={`nav-${calc.href.slice(1)}`}
                    >
                      {calc.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link 
              href="/contact" 
              className={`nav-link px-3 py-2 rounded-md text-sm font-medium ${location === '/contact' ? 'text-primary' : ''}`}
              data-testid="nav-contact"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:text-primary rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-home"
              >
                Home
              </Link>
              {calculators.map((calc) => (
                <Link 
                  key={calc.href}
                  href={calc.href}
                  className="block px-3 py-2 text-gray-700 hover:text-primary rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${calc.href.slice(1)}`}
                >
                  {calc.label}
                </Link>
              ))}
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-gray-700 hover:text-primary rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-contact"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
