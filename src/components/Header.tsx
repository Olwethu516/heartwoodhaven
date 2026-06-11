import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/rooms', label: 'Rooms' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif text-xl font-light tracking-widest text-charcoal-900">
              HEARTWOOD
            </span>
            <span className="text-[10px] tracking-[0.35em] text-gold-500 uppercase font-sans font-medium">
              Haven
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs tracking-widest uppercase font-sans transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-gold-500'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/rooms"
              className="text-xs tracking-widest uppercase font-sans px-6 py-2.5 border border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white transition-all duration-300"
            >
              Book a Room
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal-900"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-charcoal-950 border-t border-white/10">
          <nav className="flex flex-col py-6 px-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-3 text-xs tracking-widest uppercase text-white/70 hover:text-gold-400 transition-colors font-sans"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/rooms"
              className="mt-4 py-3 text-xs tracking-widest uppercase text-center border border-gold-500/60 text-gold-400 hover:bg-gold-500 hover:text-white transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Room
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
