import { useEffect, useState } from 'react';
import { supabase, type Room } from '../lib/supabase';
import { RoomCard } from '../components/RoomCard';

export function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('rooms')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data) setRooms(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Page Header */}
      <section className="relative h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/WhatsApp_Image_2026-06-09_at_15.42.30.jpeg')" }}
        />
        <div className="absolute inset-0 bg-charcoal-950/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-12">
          <p className="section-label text-gold-400 mb-3">Accommodation</p>
          <h1 className="font-serif text-5xl font-light text-white">Our Rooms</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-charcoal-800/60 font-sans text-sm leading-relaxed max-w-2xl">
            Five carefully appointed rooms — three standard rooms at R525 per night and two premium suites at R700. All include marble en-suite bathrooms, air conditioning, free WiFi, and secure parking. Payment is settled at check-in.
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-96 bg-charcoal-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Strip */}
      <section className="bg-charcoal-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Check-in',  value: '14:00' },
              { label: 'Check-out', value: '10:00' },
              { label: 'Payment',   value: 'At Check-in' },
              { label: 'Parking',   value: 'Secure & Free' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-widest uppercase text-gold-400 font-sans mb-2">{label}</p>
                <p className="font-serif text-xl text-white font-light">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
