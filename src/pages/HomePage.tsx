import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Car, Shield } from 'lucide-react';
import { supabase, type Room } from '../lib/supabase';
import { RoomCard } from '../components/RoomCard';

export function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    supabase
      .from('rooms')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data }) => { if (data) setRooms(data); });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/WhatsApp_Image_2026-06-09_at_15.42.32_%282%29.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/40 to-charcoal-950/80" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-6xl md:text-8xl font-light text-white leading-none mb-8">
            Heartwood<br />
            <em className="italic text-gold-300">Haven</em>
          </h1>
          <span className="gold-divider" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/rooms" className="btn-gold">
              View Our Rooms
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about" className="btn-outline">
              Discover More
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Property Banner Strip */}
      <section className="grid grid-cols-3 h-40 md:h-56">
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: "url('/WhatsApp_Image_2026-06-09_at_15.42.30.jpeg')" }}
        />
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: "url('/WhatsApp_Image_2026-06-09_at_15.42.31_%281%29.jpeg')" }}
        />
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: "url('/WhatsApp_Image_2026-06-09_at_15.42.31_%282%29.jpeg')" }}
        />
      </section>

      {/* Intro */}
      <section className="py-24 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Welcome</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal-900 mb-6 leading-tight">
              Your Little Haven
            </h2>
            <span className="gold-divider" />
            <p className="text-charcoal-800/60 font-sans text-base leading-relaxed">
              Heartwood Haven offers five beautifully finished rooms in a secure, peaceful setting — three standard rooms and two premium suites. Whether you are visiting for business or leisure, you will find everything you need for a comfortable and memorable stay.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 mt-16">
            {[
              { icon: Wifi,    label: 'Free WiFi' },
              { icon: Car,     label: 'Secure Parking' },
              { icon: Shield,  label: 'Safe & Secure' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 border border-gold-400/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-gold-500" />
                </div>
                <p className="text-xs tracking-widest uppercase font-sans text-charcoal-800/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="section-label mb-3">Accommodation</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal-900">Our Rooms</h2>
            </div>
            <Link to="/rooms" className="btn-outline self-start md:self-auto">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Property Feature */}
      <section className="relative h-[60vh] overflow-hidden flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/WhatsApp_Image_2026-06-09_at_15.42.31_%282%29.jpeg')" }}
        />
        <div className="absolute inset-0 bg-charcoal-950/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center w-full">
          <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-8">
            Secure. Peaceful. Refined.
          </h2>
          <Link to="/rooms" className="btn-gold">
            Reserve Your Room
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Rates Callout */}
      <section className="py-24 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-1">
            <div className="bg-charcoal-900 text-white p-12 md:p-16">
              <p className="section-label text-gold-400 mb-6">Standard Rooms</p>
              <div className="font-serif text-6xl font-light mb-4">R525</div>
              <p className="text-white/50 text-sm font-sans mb-8">per night · Olive, Courtyard &amp; Garden Rooms</p>
              <ul className="space-y-3 text-white/60 text-sm font-sans mb-10">
                <li>En-suite bathroom</li>
                <li>Free WiFi</li>
                <li>Smart TV</li>
                <li>Secure parking</li>
              </ul>
              <Link to="/rooms" className="btn-gold">
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gold-500 text-white p-12 md:p-16">
              <p className="text-xs tracking-widest uppercase font-sans text-white/70 mb-6">The Edgar Suite</p>
              <div className="font-serif text-6xl font-light mb-4">R700</div>
              <p className="text-white/70 text-sm font-sans mb-8">per night · The Edgar Suite &amp; The Marble Suite</p>
              <ul className="space-y-3 text-white/80 text-sm font-sans mb-10">
                <li>Premium en-suite</li>
                <li>55" Smart TV</li>
                <li>Mini fridge · Safe</li>
                <li>Parking</li>
              </ul>
              <Link to="/rooms" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gold-600 text-sm font-medium tracking-widest uppercase hover:bg-charcoal-50 transition-colors">
                View Suites <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
