import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { supabase, type Room, type Booking } from '../lib/supabase';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import BookingForm from '../components/BookingForm';

const STANDARD_IMAGES = [
  '/Standard_R525_3.jpeg',
  '/Standard_R525_1.jpeg',
  '/Standard_R525_2.jpeg',
];

const OLIVE_IMAGES = [
  '/Standard_R525_2%20copy%20copy.jpeg',
];

const COURTYARD_IMAGES = [
  '/Standard_R525_5%20copy.jpeg',
  '/Standard_R525_2.jpeg',
];

const PREMIUM_IMAGES = [
  '/Premium_R700_2.jpeg',
  '/Premium_R700_1.jpeg',
  '/Premium_R700_3.jpeg',
];

const roomImages: Record<string, string[]> = {
  'the-olive-room':     OLIVE_IMAGES,
  'the-courtyard-room': COURTYARD_IMAGES,
  'the-garden-room':    STANDARD_IMAGES,
  'the-edgar-suite':    PREMIUM_IMAGES,
  'the-marble-suite':   PREMIUM_IMAGES,
};

const fallback = STANDARD_IMAGES;

export default function RoomDetailPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingComplete, setBookingComplete] = useState<Booking | null>(null);

  const prefillDates = {
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
  };

  useEffect(() => {
    supabase
      .from('rooms')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
      .then(({ data }) => {
        if (data) {
          setRoom(data);
          if (prefillDates.checkIn && prefillDates.checkOut) setShowBookingForm(true);
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-charcoal-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-charcoal-200 mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-charcoal-900 mb-2">Room Not Found</h1>
          <Link to="/rooms" className="text-gold-500 text-sm hover:text-gold-600 flex items-center gap-1 justify-center mt-4">
            <ArrowLeft className="w-4 h-4" /> Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const images = roomImages[room.slug] || fallback;

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-charcoal-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white p-10 shadow-sm">
          <div className="w-16 h-16 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-8">
            <Check className="w-7 h-7 text-gold-500" />
          </div>
          <h1 className="font-serif text-3xl font-light text-charcoal-900 text-center mb-2">Booking Confirmed</h1>
          <p className="text-center text-charcoal-800/50 text-sm font-sans mb-8">
            Reference:{' '}
            <span className="font-mono font-semibold text-gold-600">{bookingComplete.booking_reference}</span>
          </p>

          <div className="border border-charcoal-100 divide-y divide-charcoal-100 mb-8">
            {[
              ['Room', room.name],
              ['Check-in', new Date(bookingComplete.check_in_date).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })],
              ['Check-out', new Date(bookingComplete.check_out_date).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })],
              ['Guests', String(bookingComplete.number_of_guests)],
              ['Total Due at Check-in', `R${Number(bookingComplete.total_amount).toLocaleString()}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-3.5 px-5 text-sm font-sans">
                <span className="text-charcoal-800/50">{label}</span>
                <span className="font-medium text-charcoal-900">{value}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-charcoal-800/40 text-xs font-sans mb-8">
            A confirmation has been sent to {bookingComplete.guest_email}
          </p>

          <Link to="/" className="btn-gold w-full justify-center">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-50">
      <div className="bg-charcoal-950 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/rooms" className="inline-flex items-center gap-2 text-white/50 hover:text-gold-400 text-xs tracking-widest uppercase font-sans transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            All Rooms
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: images + details */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden mb-3">
              <img
                src={images[selectedImage]}
                alt={room.name}
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`overflow-hidden transition-all ${
                    selectedImage === idx ? 'ring-2 ring-gold-500' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-10">
              <p className="section-label mb-3">
                Up to {room.capacity} guests
              </p>
              <h1 className="font-serif text-4xl font-light text-charcoal-900 mb-6">{room.name}</h1>
              <span className="gold-divider-left" />
              <p className="text-charcoal-800/60 font-sans text-sm leading-relaxed mb-10">
                {room.description}
              </p>

              <h3 className="text-xs tracking-widest uppercase font-sans text-charcoal-800/40 mb-5">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-charcoal-800/70 font-sans">
                    <div className="w-1 h-1 bg-gold-500 flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking panel */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm sticky top-24">
              <div className="bg-charcoal-900 px-8 py-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-light text-white">
                    R{Number(room.price_per_night).toLocaleString()}
                  </span>
                  <span className="text-white/50 font-sans text-sm">per night</span>
                </div>
                <p className="text-white/40 font-sans text-xs mt-1">Pay at check-in · No deposit required</p>
              </div>

              <div className="p-8">
                {!showBookingForm ? (
                  <>
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="btn-gold w-full justify-center mb-6"
                    >
                      Reserve This Room
                    </button>
                    <div className="space-y-3 text-sm font-sans border-t border-charcoal-100 pt-6">
                      {[
                        ['Check-in',  '14:00'],
                        ['Check-out', '10:00'],
                        ['Parking',   'Free & secure'],
                        ['WiFi',      'Complimentary'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-charcoal-800/40">{k}</span>
                          <span className="font-medium text-charcoal-900">{v}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <BookingForm
                    room={room}
                    prefillDates={prefillDates}
                    onComplete={setBookingComplete}
                    onCancel={() => setShowBookingForm(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
