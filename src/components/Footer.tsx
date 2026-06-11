import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-charcoal-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          <div>
            <div className="mb-6">
              <span className="font-serif text-2xl font-light tracking-widest text-white">HEARTWOOD</span>
              <span className="block text-[10px] tracking-[0.35em] text-gold-400 uppercase font-sans mt-0.5">Haven</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-sans">
              A refined guesthouse at 137 Edgar Road, Boksburg. Five elegantly appointed rooms for the discerning traveller.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold-400 font-sans mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/rooms', 'Rooms'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/50 hover:text-gold-400 text-sm font-sans transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold-400 font-sans mb-6">Contact</h4>
            <address className="not-italic space-y-3 text-sm text-white/50 font-sans">
              <p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=137+Edgar+Road+Boksburg+South+Africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400 transition-colors"
                >
                  137 Edgar Road<br />Boksburg, South Africa
                </a>
              </p>
              <p>
                <a href="tel:+27723106330" className="hover:text-gold-400 transition-colors">072 310 6330</a>
                <br />
                <a href="tel:+27780638115" className="hover:text-gold-400 transition-colors">078 063 8115</a>
              </p>
              <p>
                <a href="mailto:Heartwoodgava@gmail.com" className="hover:text-gold-400 transition-colors">Heartwoodgava@gmail.com</a>
              </p>
              <p>
                <span className="block">Check-in: 14:00</span>
                <span className="block">Check-out: 10:00</span>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-8 flex justify-center items-center">
          <p className="text-white/30 text-xs font-sans">
            &copy; {new Date().getFullYear()} Heartwood Haven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
