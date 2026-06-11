import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Header */}
      <section className="relative h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/WhatsApp_Image_2026-06-09_at_15.42.31_%281%29.jpeg')" }}
        />
        <div className="absolute inset-0 bg-charcoal-950/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-12">
          <p className="section-label text-gold-400 mb-3">Our Story</p>
          <h1 className="font-serif text-5xl font-light text-white">About Us</h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">Heartwood Haven</p>
              <h2 className="font-serif text-4xl font-light text-charcoal-900 mb-8 leading-tight">
                A Thoughtfully Created<br />
                <em className="italic">Retreat in Boksburg</em>
              </h2>
              <span className="gold-divider-left" />
              <div className="space-y-5 text-charcoal-800/60 font-sans text-sm leading-relaxed">
                <p>
                  Heartwood Haven was created with one purpose: to offer guests a clean, comfortable, and beautifully finished space to call home during their time in Boksburg. At 137 Edgar Road, we have built a sanctuary that balances modern comfort with warm, personal hospitality.
                </p>
                <p>
                  The name Heartwood reflects the core of what we believe in. The heartwood of a tree is its strongest, most enduring part — and at the heart of everything we do is a genuine care for our guests.
                </p>
                <p>
                  With five rooms — three standard rooms at R525 per night and two premium suites (The Edgar Suite and The Marble Suite) at R700 — we cater to business travellers, couples, and individuals who value quality and simplicity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <img
                  src="/WhatsApp_Image_2026-06-09_at_15.42.32_%282%29.jpeg"
                  alt="Heartwood Haven at night"
                  className="w-full h-56 object-cover"
                />
              </div>
              <img
                src="/WhatsApp_Image_2026-06-09_at_15.42.30.jpeg"
                alt="Property entrance"
                className="w-full h-40 object-cover"
              />
              <img
                src="/WhatsApp_Image_2026-06-09_at_15.42.31_%281%29.jpeg"
                alt="Garden"
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5',      label: 'Rooms' },
              { value: '24/7',   label: 'Security' },
              { value: '10 min', label: 'To OR Tambo' },
              { value: 'R525',   label: 'From per night' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-serif text-4xl font-light text-gold-400 mb-2">{value}</div>
                <div className="text-[10px] tracking-widest uppercase text-white/40 font-sans">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Location</p>
              <h2 className="font-serif text-4xl font-light text-charcoal-900 mb-8">
                Conveniently Situated
              </h2>
              <span className="gold-divider-left" />
              <ul className="space-y-4 text-sm font-sans text-charcoal-800/60">
                {[
                  '10 minutes from OR Tambo International Airport',
                  '5 minutes from East Rand Mall',
                  '15 minutes from Johannesburg CBD',
                  'Close to major business districts',
                  'Secure, gated property with ample parking',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-gold-500 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-charcoal-50 p-12 flex flex-col justify-center">
              <p className="text-[10px] tracking-widest uppercase text-gold-500 font-sans mb-3">Address</p>
              <p className="font-serif text-3xl font-light text-charcoal-900 mb-1">137 Edgar Road</p>
              <p className="text-charcoal-800/50 font-sans text-sm">Boksburg, South Africa</p>

              <div className="mt-8 pt-8 border-t border-charcoal-200 space-y-2 text-sm font-sans text-charcoal-800/60">
                <p><a href="tel:+27723106330" className="hover:text-gold-500 transition-colors">072 310 6330</a></p>
                <p><a href="tel:+27780638115" className="hover:text-gold-500 transition-colors">078 063 8115</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/WhatsApp_Image_2026-06-09_at_15.42.31_%282%29.jpeg')" }}
        />
        <div className="absolute inset-0 bg-charcoal-950/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-8">
            Ready to Experience<br />
            <em className="italic text-gold-300">Heartwood Haven?</em>
          </h2>
          <Link to="/rooms" className="btn-gold">
            Book Your Room <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
