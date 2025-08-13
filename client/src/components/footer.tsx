import { Link } from "wouter";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">AudioBookment</h3>
            <p className="text-gray-400 text-sm">Optimize your audiobook experience</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-home">
              Home
            </Link>
            <Link href="/finished-hour" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-calculators">
              Calculators
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-contact">
              Contact
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">© 2025 AudioBookment · All rights reserved.</p>
          <button 
            onClick={scrollToTop} 
            className="mt-4 text-gray-400 hover:text-white transition-colors"
            data-testid="scroll-to-top"
          >
            <i className="fas fa-chevron-up"></i> Go up
          </button>
        </div>
      </div>
    </footer>
  );
}
