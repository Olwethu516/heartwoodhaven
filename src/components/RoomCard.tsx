import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import type { Room } from '../lib/supabase';

const roomImages: Record<string, string> = {
  'the-olive-room':     '/Standard_R525_2%20copy%20copy.jpeg',
  'the-courtyard-room': '/Standard_R525_5%20copy.jpeg',
  'the-garden-room':    '/Standard_R525_3.jpeg',
  'the-edgar-suite':    '/Premium_R700_2.jpeg',
  'the-marble-suite':   '/Premium_R700_2.jpeg',
};

const fallback = '/Standard_R525_3.jpeg';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const img = roomImages[room.slug] || fallback;
  const isSuite = room.slug === 'the-edgar-suite' || room.slug === 'the-marble-suite';

  return (
    <div className="group relative bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      {isSuite && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gold-500 text-white text-[10px] tracking-widest uppercase font-sans">
          Suite
        </div>
      )}

      <div className="relative h-64 overflow-hidden">
        <img
          src={img}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-charcoal-950/20 group-hover:bg-charcoal-950/10 transition-colors duration-500" />
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-serif text-2xl font-light text-charcoal-900">{room.name}</h3>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <span className="font-serif text-3xl text-charcoal-900">R{Number(room.price_per_night).toLocaleString()}</span>
            <span className="text-charcoal-200 text-xs font-sans block">per night</span>
          </div>
        </div>

        <p className="text-charcoal-800/60 text-sm leading-relaxed font-sans mb-6 line-clamp-2">
          {room.short_description}
        </p>

        <div className="flex items-center justify-between pt-5 border-t border-charcoal-100">
          <div className="flex items-center gap-1.5 text-charcoal-800/40 text-xs font-sans">
            <Users className="w-3.5 h-3.5" />
            <span>Up to {room.capacity} guests</span>
          </div>
          <Link
            to={`/rooms/${room.slug}`}
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-gold-500 font-sans hover:text-gold-600 transition-colors group/link"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
